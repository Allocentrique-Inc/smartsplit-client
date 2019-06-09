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

const AssistantOeuvre = ({onSubmit}) => (
    <Wizard        
        onSubmit={onSubmit}
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
)

export default AssistantOeuvre
