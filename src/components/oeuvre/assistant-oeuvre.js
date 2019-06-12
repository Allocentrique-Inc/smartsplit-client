/** 
 * Assistant de saisie de la description d'une oeuvre
 */
import './oeuvre.css'
import React from 'react'
import { Wizard } from "semantic-ui-react-formik"
import axios from 'axios'

// Pages de l'assistant
import PageDescription from './assistant-oeuvre-description'
import PageParoles from './assistant-oeuvre-paroles'
import PageGenres from './assistant-oeuvre-genres'
import PagePro from './assistant-oeuvre-pro'

// Alertes
import { toast } from 'react-toastify'

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
                                rightHolders: [],
                                jurisdiction: "",
                                rightsType: {},
                                genre: "",
                                secondaryGenre: "",
                                lyrics: "",
                                inLanguages: null,
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
                            })                            
                            .catch((error) => {
                                throw(error)
                            })
                            .finally(()=>{                                
                            })

                        }}
                        onPageChanged={(page)=>{}}
                        buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}                        
                        debug={true}
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
