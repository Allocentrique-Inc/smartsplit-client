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

    componentWillMount() {
       
    }

    soumettre(values) {
        console.log('Soumettre le partage', values)        

        let _data = {

        }
        /*
        axios.post('http://api.smartsplit.org:8080/v1/proposal', _data)
        .then(res=>{
            toast.success("Biquette#Proposition soumise !")
        })
        .catch(err=>{
            toast.error(err)
        })
        */
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
                }
            </Translation>                                
        )
    }
}

export default AssistantPartage