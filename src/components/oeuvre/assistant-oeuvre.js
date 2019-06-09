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

const AssistantOeuvre = ({onSubmit}) => (
    <Translation>
        {
            (t) =>
                <Wizard        
                        onSubmit={onSubmit}
                        buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
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
