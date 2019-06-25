/** 
 * Assistant de saisie de la description d'une oeuvre
 */
import './oeuvre.css'
import React, { Component } from 'react'
import { Wizard } from "semantic-ui-react-formik"
import axios from 'axios'

// Pages de l'assistant
import Embarquement from './assistant-oeuvre-embarquement'
import PageCollaborateurs from './assistant-oeuvre-collaborateurs'
import PageParoles from './assistant-oeuvre-paroles'
import PageGenres from './assistant-oeuvre-genres'
import PagePro from './assistant-oeuvre-pro'
import PageLiens from './assistant-oeuvre-liens'
import AudioLecture from './audio-lecture'

// Alertes
import { toast } from 'react-toastify'

// Traduction
import { Translation } from 'react-i18next'

// Modèle
import Oeuvre from '../../model/oeuvre/oeuvre'

class AssistantOeuvre extends Component {

    constructor(props){
        super(props)
        this.state = {
            pctProgression: 0
        }        
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.audio !== nextProps.audio) {
            this.setState({audio: nextProps.audio})
        }
    }

    render(){

        return (                
            <Translation>                
                {
                    (t, i18n) =>
                        <div>
                            <Wizard
                                    initialValues={
                                        {
                                            // mediaId: 0,
                                            title: "",
                                            album: "",
                                            artist: "",
                                            cover: "false",
                                            rightHolders: [{}],
                                            jurisdiction: "",
                                            rightsType: [],
                                            genre: "",
                                            secondaryGenre: "",
                                            lyrics: "",
                                            inLanguages: [],
                                            isrc: "",
                                            upc: "",
                                            msDuration: "",
                                            socialMediaLinks: [],
                                            streamingServiceLinks: [],
                                            pressArticleLinks: [],
                                            playlistLinks: [],
                                            creationDate: "",
                                            modificationDate: "",
                                            publishDate: "",
                                            publisher: "",
                                            rightsSplit: {}
                                        }
                                    }  
                                    onSubmit={(values, actions) => {
                                                        
                                        let oeuvre = new Oeuvre(values)
                                        let body = oeuvre.get()

                                        axios.post('http://api.smartsplit.org:8080/v1/media',body)
                                        .then((response) => {                                
                                            actions.setSubmitting(false)
                                            toast(t('flot.envoi.reussi'))
                                            setTimeout(()=>{
                                                window.location.href = '/liste-oeuvres'
                                            }, 4000)                                
                                        })                            
                                        .catch((error) => {
                                            throw(error)
                                        })
                                        .finally(()=>{
                                        })

                                    }}
                                    onPageChanged={(page)=>{                                   
                                    }}
                                    buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}                        
                                    debug={false}
                                >                            

                                    <Wizard.Page>
                                        <Embarquement audio={this.state.audio} i18n={i18n} pctProgression={5} />
                                    </Wizard.Page>
                                    <Wizard.Page>
                                        <PageCollaborateurs i18n={i18n} pctProgression={15} /> 
                                    </Wizard.Page>
                                    <Wizard.Page>
                                        <PageParoles i18n={i18n} pctProgression={55} />
                                    </Wizard.Page>
                                    <Wizard.Page>
                                        <PageGenres pctProgression={75} />
                                    </Wizard.Page>
                                    <Wizard.Page>
                                        <PagePro pctProgression={85} />
                                    </Wizard.Page>
                                    <Wizard.Page>
                                        <PageLiens pctProgression={97} />
                                    </Wizard.Page>

                            </Wizard>
                            <AudioLecture onRef={
                                (audio)=>{ this.setState({audio: audio}) }
                            } />
                        </div>
                }
            </Translation>                    
        )
    }
}

export default AssistantOeuvre
