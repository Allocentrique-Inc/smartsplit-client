/**
 * Saisie des paroles de l'oeuvre
 */

import React from "react"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'
import { Form } from "semantic-ui-react";

const languesOptions = [
    {key: 'L1', text: 'Français', value: 'LO1'},
    {key: 'L2', text: 'Anglais', value: 'LO2'},
    {key: 'L3', text: 'Espagnol', value: 'LO3'},
    {key: 'L4', text: 'Instrumental', value: 'LO4'}
]

const Page = (props) => (
    <React.Fragment>

        <h2>Inscrivez les paroles (lyrics) de votre oeuvre musicale </h2> 

        <p>Lorem ipsium, on explique ici l'importance d'un point de vu copyright ainsi que SEO de mettre les paroles afin de permettre la découvrabilité.</p>

        <Wizard.Field
        name="oeuvre.paroles.texte"
        component={Form.TextArea}
        componentProps={{
            label: "Les paroles de ton oeuvre",
            placeholder: "Écris ici les paroles de ta chanson",
            required: true,
            autoFocus: true
        }}
        validate={required}
        />

        <Wizard.Field
        name="oeuvre.paroles.langues"
        component={Form.Dropdown}
        componentProps={{
            label: "La langue de tes paroles",
            placeholder: "Quelles langues dans ton oeuvre ?",
            required: true,
            autoFocus: true,
            fluid: true,
            multiple: true,
            search: true,
            selection: true,
            options: languesOptions
        }}
        validate={required}
        />        

    </React.Fragment>
)

export default Page