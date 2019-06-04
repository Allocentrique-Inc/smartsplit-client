/** 
 * Assistant de saisie de la description d'une oeuvre
 */
import './oeuvre.css'
import React from 'react'
import { Wizard } from "semantic-ui-react-formik"

// Pages de l'assistant
import Page2 from './page2'
import Page3 from './page3'
import Page4 from './page4'

const AssistantOeuvreDescription = ({onSubmit}) => (
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
            <Page2 />
        </Wizard.Page>
        <Wizard.Page>
            <Page3 />
        </Wizard.Page>
        <Wizard.Page>
            <Page4 />
        </Wizard.Page>
  </Wizard>
)

export default AssistantOeuvreDescription
