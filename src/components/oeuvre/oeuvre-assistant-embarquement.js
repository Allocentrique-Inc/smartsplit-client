/** 
 * Assistant de saisie de la description d'une oeuvre
 */
import './oeuvre.css'
import React from 'react'
import { Wizard } from "semantic-ui-react-formik"

// Pages de l'assistant
import Page1 from './page1-embarquement'

const AssistantOeuvreEmbarquement = ({onSubmit}) => (
    <Wizard
        initialValues={{
            titre: "",
            fichierUUID: "",
            collaborateurs: "",
            paroles: "",
            liensWeb: "",
            genres: "",
            liensCommerciaux: "",
            iswc: "",
            isrc: ""
        }}
        onSubmit={onSubmit}
    >
        <Wizard.Page>
            <Page1 />
        </Wizard.Page>
  </Wizard>
)

export default AssistantOeuvreEmbarquement