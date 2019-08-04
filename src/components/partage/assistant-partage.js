import React, {Component} from 'react'

// Assistant
import { Wizard } from "semantic-ui-react-formik"
import { Effect } from "formik-effect"

// Traduction
import { Translation } from 'react-i18next'

// Composantes
import EntetePartage from './entete-partage'

// Pages de l'assistant
import PageAssistantPartageDroitAuteur from './assistant-partage-auteur'
import PageAssistantPartageDroitInterpretation from './assistant-partage-interpretation'
import PageAssistantPartageDroitEnregistrement from './assistant-partage-enregistrement'

import axios from 'axios'
import { toast } from 'react-toastify'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'
import { Progress } from 'semantic-ui-react';

class AssistantPartage extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            mediaId: this.props.mediaId,
            user: null     
        }
        this.refAssistant = this.refAssistant.bind(this)
    }

    componentWillMount() {        

        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
            this.recupererOeuvre()            
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: `Connexion obligatoire`,
                message: `Tu dois être connecté pour accéder au tableau de bord`,
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <div>
                        <Login message="Connecte-toi pour accéder au tableau de bord" fn={(user)=>{
                            onClose()
                            this.setState({user: user}, ()=>{
                                this.recupererOeuvre()
                            })
                        }} />
                </div>
            })
        })
    }

    recupererOeuvre() {
        // Récupérer le média
        axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
        .then(res=>{
            let media = res.data.Item
            this.setState({media: media})
        })
        .catch((error) => {
            toast.error(error)            
        })
    }

    refAssistant(assistant) {
        this.setState({assistant: assistant})
    }

    soumettre(values, cb) {
        console.log('Soumettre le partage', values)
        
        if(this.state.user) {
            let _association = {} // Associera le nom de l'ayant-droit avec son identitifiant unique

            // 1. Récupérer la liste des ayant-droits
            axios.get(`http://api.smartsplit.org:8080/v1/rightHolders`)
            .then(res=>{                                    
                res.data.forEach(elem=>{
                    _association[`${elem.firstName} '${elem.artistName}' ${elem.lastName}`] = elem
                })                        
                // 2. Générer la structure à envoyer à Dynamo

                let droitEnregistrement = []
                let droitInterpretePrincipal = []
                let droitInterpreteAccompagnement = []
                let droitAuteurMusique = []
                let droitAuteurParoles = []

                values.droitAuteur.forEach(elem=>{

                    let _rH = _association[elem.nom]
                    let nom = `${_rH.firstName} ${_rH.lastName}`
                    let uuid = _rH.rightHolderId

                    if(elem.arrangeur || elem.compositeur) {
                        let roles = {}
                        if(elem.compositeur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a3i"] = "composer"
                        }
                        if(elem.arrangeur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a32"] = "remixer"
                        }
                        droitAuteurMusique.push({
                            "rightHolder": {
                                "name": nom,
                                "rightHolderId": uuid
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcentMusique}`
                            }
                        )
                    }

                    if(elem.auteur) {
                        let roles = {"45745c60-7b1a-11e8-9c9c-2d42b21b1a33": "songwriter"}
                        droitAuteurParoles.push({
                            "rightHolder": {
                                "name": nom,
                                "rightHolderId": uuid
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcentParoles}`
                            }
                        )
                    }
                })

                values.droitInterpretation.forEach(elem=>{
                    
                    let _rH = _association[elem.nom]
                    let nom = `${_rH.firstName} ${_rH.lastName}`
                    let uuid = _rH.rightHolderId

                    if(elem.principal) {
                        let roles = {}
                        if(elem.chanteur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a35"] = "singer"
                        }
                        if(elem.musicien) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a36"] = "musician"
                        }
                        droitInterpretePrincipal.push({
                            "rightHolder": {
                                "name": nom,
                                "rightHolderId": uuid
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcent}`
                            })
                    } else {
                        let roles = {"45745c60-7b1a-11e8-9c9c-2d42b21b1a36": "accompaniment"}
                        droitInterpreteAccompagnement.push({
                            "rightHolder": {
                                "name": nom,
                                "rightHolderId": uuid
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcent}`
                            })
                    }

                })

                values.droitEnregistrement.forEach(elem=>{
                    let _rH = _association[elem.nom]
                    let nom = `${_rH.firstName} ${_rH.lastName}`
                    let uuid = _rH.rightHolderId
                    let roles = {}
                        if(elem.producteur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a40"] = "producer"
                        }
                        if(elem.realisateur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a41"] = "director"
                        }
                        if(elem.studio) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a42"] = "studio"
                        }
                        if(elem.graphiste) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a43"] = "graphist"
                        }
                    droitEnregistrement.push({
                        "rightHolder": {
                            "name": nom,
                            "rightHolderId": uuid
                        },
                        "voteStatus": "active",
                        "contributorRole": roles,
                        "splitPct": `${elem.pourcent}`
                    })
                })

                console.log('profil', this.state.user)

                let body = {
                    uuid: "",
                    mediaId: parseInt(`${this.state.mediaId}`),
                    initiator: {
                        "name": `${this.state.user.attributes.name} ${this.state.user.attributes.family_name}`,
                        "id": this.state.user.username
                    },
                    rightsSplits: {
                        "performanceNeighboringRightSplit": {
                            "principal": droitInterpretePrincipal,
                            "accompaniment": droitInterpreteAccompagnement
                        },
                        "workCopyrightSplit": {
                            "lyrics": droitAuteurParoles,
                            "music": droitAuteurMusique
                        },
                        "masterNeighboringRightSplit": {
                            "split": droitEnregistrement
                        }
                    },
                    "comments": []
                }
                body.comments.push({ rightHolderId: this.state.user.username, comment: "Initiateur du split"})
                console.log('Envoi', body)
                // 3. Soumettre la nouvelle proposition
                axios.post('http://api.smartsplit.org:8080/v1/proposal', body)
                .then(res=>{
                    toast.success(`${res.data}`)
                    // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
                    if(typeof cb === "function") {                    
                        cb()
                    } else {
                        setTimeout(()=>{
                            window.location.href = `/approuver-proposition/${res.data}`
                        }, 3000)
                    }
                })
                .catch(err=>{                
                    toast.error(err.message)
                })
            })
            .catch(err=>{
                toast.error(err.message)
                if (typeof cb === "function") {
                    setTimeout(()=>{
                        cb()
                    }, 1000)
                }                
            })
        }
    }

    render() {

        if(this.state.media) {
            return (
                <Translation>
                    {
                        (t, i18n)=>
                            <div className="ui grid" style={{padding: "10px"}}>
                                <EntetePartage enregistrer={
                                    (cb)=>{
                                        this.soumettre(this.state.assistant.props.values, cb)
                                    }} media={this.state.media} user={this.state.user} />
                                <div className="ui row">                                    
                                    <div className="ui sixteen wide column">
                                        <Progress percent="10" indicating/>
                                    </div>                                    
                                </div>                                
                                <div className="ui row">
                                <div className="ui two wide column" />
                                    <div className="ui twelve wide column">
                                        <Wizard
                                            ref={(assistant)=>{
                                                if(!this.state.assistant)
                                                    this.refAssistant(assistant)
                                            }}
                                            initialValues={{
                                                droitAuteur: [],
                                                droitInterpretation : [],
                                                droitEnregistrement: [],
                                                collaborateur: []
                                            }}
                                            buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                            debug={false}
                                            onSubmit={this.soumettre.bind(this)}                                            
                                            >                                            
            
                                            <Wizard.Page>
                                                <PageAssistantPartageDroitAuteur />
                                            </Wizard.Page>
            
                                            <Wizard.Page>
                                                <PageAssistantPartageDroitInterpretation />
                                            </Wizard.Page>
            
                                            <Wizard.Page>
                                                <PageAssistantPartageDroitEnregistrement />
                                            </Wizard.Page>
            
                                        </Wizard>
                                    </div>
                                </div>                                
                            </div>
                    }
                </Translation>                                
            )
        } else {
            return (
                <div></div>
            )
        }
        
    }
}

export default AssistantPartage