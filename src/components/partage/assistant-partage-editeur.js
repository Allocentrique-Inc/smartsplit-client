import {config, AyantsDroit, Identite} from '../../utils/application'
import React, {Component} from 'react'
import { Wizard } from "../formulaires/assistant"
import { withTranslation } from 'react-i18next'
import PageAssistantPartageEditeurChoix from './partage-editeur-selection'
import PageAssistantPartageEditeurPart from './partage-editeur-part'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

class AssistantPartageEditeur extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            version: this.props.version,
            propositionId: this.props.propositionId,
            sansentete: this.props.sansentete,
            user: null
        }
        this.charger = this.charger.bind(this)
    }

    charger(user) {
        this.setState({user: user})
        this.setState({ayantsDroit: AyantsDroit.ayantsDroit})
        this.setState({uaD: AyantsDroit.ayantsDroit[user.username]})
        axios.get(`${config.API_URL}proposal/${this.state.propositionId}`)
        .then(res=>{
            let proposition = res.data.Item            
            let trouve = false
            proposition.rightsSplits.workCopyrightSplit.lyrics.forEach(elem=>{
                if(elem.rightHolder.rightHolderId === user.username) {
                    trouve = true
                }
            })
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

        if(Identite.usager) {
            this.charger(Identite.usager)
        } else {
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
        }    
    }

    recupererOeuvre() {
        // Récupérer le média
        axios.get(`${config.API_URL}media/${this.state.proposition.mediaId}`)
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
                proposalId: `${this.state.propositionId}`,
                version: this.state.version
            }

            axios.post(`${config.API_URL}editorsplitshare`, body)
            .then(res=>{
                body = {
                    rightHolder: {nom: values.ayantDroit.nom, uuid: values.ayantDroit.rightHolderId},
                    shareeId: values.editeur.ayantDroit.rightHolderId,
                    proposalId: this.state.propositionId,
                    mediaId: this.state.media.mediaId,
                    version: this.state.version
                }
                axios.post(`${config.API_URL}editorsplitshare/invite`, body)
                .then(()=>{
                    this.props.soumettre()
                })
            })
            .catch(err=>{
                toast.error(err.message)
            })
        }
    }

    render() {

        if(this.state.media && this.state.ayantsDroit) {
            let t = this.props.t
            return (                
                <>
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
                                ButtonsWrapper={(props) => <div style={{
                                    position: "fixed",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    paddingTop: "15px",
                                    background: "#fff",
                                    boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                                    pochette: this.state.pochette
                                }}>
                                    <div className="ui grid">
                                        <div className="ui row">
                                            <div className="ui eight wide column">{props.children}</div>
                                        </div>
                                    </div>
                                </div>}
                                buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                debug={false}
                                onSubmit={this.soumettre.bind(this)}
                                >                                            

                                <Wizard.Page>
                                    <PageAssistantPartageEditeurChoix />
                                </Wizard.Page>

                                <Wizard.Page>
                                    <PageAssistantPartageEditeurPart ayantsDroit={this.state.ayantsDroit} />
                                </Wizard.Page>                                            

                            </Wizard>
                        )
                    }                                                                                                        
                </>                   
            )
        } else {
            return (
                <div></div>
            )
        }
        
    }
}

export default withTranslation()(AssistantPartageEditeur)