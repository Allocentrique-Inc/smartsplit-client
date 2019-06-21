/** 
 * Assistant de saisie de la description d'une oeuvre
 */
import './oeuvre.css'
import React from 'react'
import { Wizard } from "semantic-ui-react-formik"

// Pages de l'assistant
import PageDescription from './assistant-oeuvre-description'
import PageParoles from './assistant-oeuvre-paroles'
import PageGenres from './assistant-oeuvre-genres'
import PagePro from './assistant-oeuvre-pro'

// Traduction
import { Translation } from 'react-i18next'

// Modèle
import Oeuvre from '../../model/oeuvre/oeuvre'

const AssistantOeuvre = () => (
    <Translation>
        {
            (t) =>
                <Wizard      
                        initialValues={
                            {
                                // mediaId: 0,
                                title: "",
                                album: "",
                                artist: "",
                                cover: false,
                                genre: "",
                                secondaryGenre: "",
                                lyrics: "",
                                inLanguages: [],
                                isrc: "",
                                upc: "",
                                msDuration: "",
                                socialMediaLinks: {},
                                streamingServiceLinks: {},
                                pressArticleLinks: {},
                                playlistLinks: {},
                                creationDate: "",
                                modificationDate: "",
                                publishDate: "",
                                publisher: "",
                            }
                        }  
                        onSubmit={(values, actions) => {
                            
                            console.log("Envoi des champs à l'API", values)
                            let oeuvre = new Oeuvre(values)

                            // Transmettre à l'API
                            const options = {
                                method: 'POST',
                                data: oeuvre.get(),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }

                            fetch('http://api.smartsplit.org:8080/v1/media', options).then((response) => {
                                return response.json()
                            })
                            .then((jsonObject) => {            
                                actions.setSubmitting(false)
                            })
                            .catch((error) => {
                                throw(error)
                            })

                        }}
                        onPageChanged={(page)=>{
                            console.log("# page", page)
                        }}
                        buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}                        
                        debug={false}
                    >
                        <Wizard.Page>            
                            <PageDescription /> 
                        </Wizard.Page>
                        <Wizard.Page>
                            <PageParoles />
                        </Wizard.Page>
                        <Wizard.Page>
                            <PageGenres />
                        </Wizard.Page>
                        <Wizard.Page>
                            <PagePro />
                        </Wizard.Page>
                                
                </Wizard>
        }
    </Translation>    
)

export default AssistantOeuvre
