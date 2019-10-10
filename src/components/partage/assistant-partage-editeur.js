import React, {Component} from 'react'

// Assistant
import { Wizard } from "semantic-ui-react-formik"

// Traduction
import { Translation } from 'react-i18next'

// Composantes
import EntetePartage from './entete-partage'

// Pages de l'assistant
import PageAssistantPartageEditeurChoix from './partage-editeur-selection'
import PageAssistantPartageEditeurPart from './partage-editeur-part'

import axios from 'axios'
import { toast } from 'react-toastify'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'
import { Progress } from 'semantic-ui-react';

class AssistantPartageEditeur extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            propositionId: this.props.propositionId,
            sansentete: this.props.sansentete,
            user: null
        }
        this.charger = this.charger.bind(this)
    }

    charger(user) {
        this.setState({user: user})

        // Récupère tous les ayant-droits
        axios.get(`http://api.smartsplit.org:8080/v1/rightholders`)
        .then(res=>{
            let _rHs = {} 
            res.data.forEach(rh=>_rHs[rh.rightHolderId] = rh)
            this.setState({ayantsDroit: _rHs})
        })

        axios.get(`http://api.smartsplit.org:8080/v1/rightHolders/${user.username}`)
        .then(_r=>{
            if(_r.data.Item) {
                this.setState({uaD: _r.data.Item})
            }
        })

        axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.propositionId}`)
        .then(res=>{
            let proposition = res.data.Item

            // Si l'utilisateur ne fait pas partie de la liste des ayant-droits on retourne une erreur
            let trouve = false
            // Paroles ...
            proposition.rightsSplits.workCopyrightSplit.lyrics.forEach(elem=>{
                if(elem.rightHolder.rightHolderId === user.username) {
                    trouve = true
                }
            })
            // Musique ...
            proposition.rightsSplits.workCopyrightSplit.music.forEach(elem=>{
                if(elem.rightHolder.rightHolderId === user.username) {
                    trouve = true
                }
            })

            if(trouve) {
                this.setState({proposition: proposition}, ()=>{
                    this.recupererOeuvre()
                })
            } else {
                toast.error(`Tu ne posséde aucun droit d'auteur dans la proposition ${proposition.uuid}`)                
            }           
        })
    }

    componentWillMount() {        

        Auth.currentAuthenticatedUser()
        .then(res=>{            
            this.charger(res)
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: ``,
                message: ``,
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
                            this.charger(user)
                        }} />
                </div>
            })
        })
    }

    recupererOeuvre() {
        // Récupérer le média
        axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.proposition.mediaId}`)
        .then(res=>{
            let media = res.data.Item
            this.setState({media: media})
        })
        .catch((error) => {
            toast.error(error)            
        })
    }

    soumettre(values, cb) {

        if(this.state.user) {            

            let body = {
                rightHolderId: `${values.ayantDroit.rightHolderId}`,
                shareeId: `${values.editeur.ayantDroit.rightHolderId}`,
                rightHolderPct: `${values.ayantDroit.pourcent}`,
                shareePct: `${values.editeur.pourcent}`,
                proposalId: `${this.state.propositionId}`
            }

            axios.post(`http://api.smartsplit.org:8080/v1/editorsplitshare`, body)
            .then(res=>{
                toast.success(res.data)
                body = {
                    rightHolder: {nom: values.ayantDroit.nom, uuid: values.ayantDroit.rightHolderId},
                    shareeId: values.editeur.ayantDroit.rightHolderId,
                    proposalId: this.state.propositionId,
                    mediaId: this.state.media.mediaId
                }
                axios.post(`http://api.smartsplit.org:8080/v1/editorsplitshare/invite`, body)
                .then(()=>{
                    window.location.reload()
                })
            })
            .catch(err=>{
                toast.error(err.message)
            })
        }
    }

    render() {

        if(this.state.media && this.state.ayantsDroit) { // S'il y a un média, il y a forcément une proposition ( voir componentWillMount() ) et un utilisateur connecté

            return (
                <Translation>
                    {
                        (t, i18n)=>
                            <div className="ui grid" style={{padding: "10px"}}>
                                {!this.state.sansentete && 
                                    <EntetePartage enregistrer={
                                        (cb)=>{
                                            //this.soumettre(this.state.assistant.props.values, cb)
                                        }} media={this.state.media} user={this.state.user} />}
                                {!this.state.sansentete && 
                                <div className="ui row">                                    
                                    <div className="ui sixteen wide column">
                                        <Progress percent="10" size='tiny' indicating/>
                                    </div>
                                </div>
                                }
                                <div className="ui row">
                                    <div className="ui two wide column" />
                                    <div className="ui twelve wide column">
                                        {
                                            this.state.uaD && (
                                                <Wizard
                                                    initialValues={{                                                                                                
                                                        editeur: {},
                                                        editeurListe: "",
                                                        song: this.state.media.title,
                                                        parts: this.state.proposition.rightsSplits.workCopyrightSplit,
                                                        ayantDroit: {rightHolderId: this.state.user.username, pourcent: undefined, aD: this.state.uaD}
                                                    }}
                                                    buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                                    debug={false}
                                                    onSubmit={this.soumettre.bind(this)}                                            
                                                    >                                            
                    
                                                    <Wizard.Page>
                                                        <PageAssistantPartageEditeurChoix i18n={i18n} />
                                                    </Wizard.Page>
                    
                                                    <Wizard.Page>
                                                        <PageAssistantPartageEditeurPart ayantsDroit={this.state.ayantsDroit} i18n={i18n} />
                                                    </Wizard.Page>                                            
                    
                                                </Wizard>
                                            )
                                        }                                        
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

export default AssistantPartageEditeur