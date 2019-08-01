import React, {Component} from 'react'

// Assistant
import { Wizard } from "semantic-ui-react-formik"

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

class AssistantPartage extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            mediaId: this.props.mediaId       
        }
    }

    soumettre(values) {
        console.log('Soumettre le partage', values)

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

            let body = {
                uuid: "",
                mediaId: parseInt(`${this.state.mediaId}`),
                initiator: {
                    "name": `${_association[Object.keys(_association)[0]].firstName} ${_association[Object.keys(_association)[0]].lastName}`, // TEMPORAIRE EN ATTENDANT IDENTITÉ
                    "id": _association[Object.keys(_association)[0]].rightHolderId
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
            body.comments.push({ rightHolderId: _association[Object.keys(_association)[0]].rightHolderId, comment: "Initiateur du split"})
            console.log('Envoi', body)
            // 3. Soumettre la nouvelle proposition
            axios.post('http://api.smartsplit.org:8080/v1/proposal', body)
            .then(res=>{
                toast.success(`Biquette#${res.data}`)
                // 4. Rediriger vers la page sommaire de la proposition
                setTimeout(()=>{
                    window.location.href = `/approuver-proposition/${res.data}`
                }, 3500)
            })
            .catch(err=>{                
                toast.error(err.message)
            })
        })
        .catch(err=>{
            toast.error(err)
        })
        
    }

    render() {

        return (
            <Translation>
                {
                    (t, i18n)=>
                        <div>
                            <EntetePartage mediaId={this.state.mediaId} />
                            <Wizard
                                initialValues={{
                                    droitAuteur: [],
                                    droitInterpretation : [],
                                    droitEnregistrement: [],
                                    collaborateur: []
                                }}
                                buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                debug={true}
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
                }
            </Translation>                                
        )
    }
}

export default AssistantPartage