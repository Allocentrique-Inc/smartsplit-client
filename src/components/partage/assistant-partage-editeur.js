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
            user: null
        }
    }

    componentWillMount() {        

        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})

            axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.propositionId}`)
            .then(res=>{
                let proposition = res.data.Item
                this.setState({proposition: proposition}, ()=>{
                    this.recupererOeuvre()
                })
            })
            
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
        console.log("Soumettre le partage avec l'éditeur", values)
        
        if(this.state.user) {

            // À faire

        }
    }

    render() {

        if(this.state.media) { // S'il y a un média, il y a forcément une proposition ( voir componentWillMount() )
            return (
                <Translation>
                    {
                        (t, i18n)=>
                            <div className="ui grid" style={{padding: "10px"}}>
                                <EntetePartage enregistrer={
                                    (cb)=>{
                                        //this.soumettre(this.state.assistant.props.values, cb)
                                    }} media={this.state.media} user={this.state.user} />
                                <div className="ui row">                                    
                                    <div className="ui sixteen wide column">
                                        <Progress percent="10" size='tiny' indicating/>
                                    </div>                                    
                                </div>                                
                                <div className="ui row">
                                <div className="ui two wide column" />
                                    <div className="ui twelve wide column">
                                        <Wizard                                           
                                            initialValues={{                                                                                                
                                                editeur: "", // uuid: ..., pourcent: Float
                                                song: this.state.media.title,
                                                proposition: this.state.proposition
                                            }}
                                            buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                            debug={false}
                                            onSubmit={this.soumettre.bind(this)}                                            
                                            >                                            
            
                                            <Wizard.Page>
                                                <PageAssistantPartageEditeurChoix i18n={i18n} />
                                            </Wizard.Page>
            
                                            <Wizard.Page>
                                                <PageAssistantPartageEditeurPart i18n={i18n} />
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

export default AssistantPartageEditeur