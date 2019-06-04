/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React from "react"
import { FormField } from "semantic-ui-react-ext"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'
import { Form } from "semantic-ui-react";

const rolesOptions = [
    {key: 'R1', text: 'Compositeur', value: 'RO1'},
    {key: 'R2', text: 'Chanteur', value: 'RO2'},
    {key: 'R3', text: 'Instrumentiste', value: 'RO3'}
]

const Page = (props) => (
    <React.Fragment>

        <h2>Qui sont les créateur et collaborateurs de votre oeuvre musicale? </h2> 

        <p>Commencez par vous</p>

        <Wizard.Field
        name="collaborateur.nom"
        component={FormField}
        componentProps={{
            label: "Ton nom de famille",
            placeholder: "Ton nom de famille",
            required: true,
            autoFocus: true
        }}
        validate={required}
        />

        <Wizard.Field
        name="collaborateur.prenom"
        component={FormField}
        componentProps={{
            label: "Ton prénom",
            placeholder: "Ton prénom",
            required: true,
            autoFocus: false
        }}
        validate={required}
        />

        <Wizard.Field
        name="collaborateur.artiste"
        component={FormField}
        componentProps={{
            label: "Ton nom d'artiste",
            placeholder: "Ton nom d'artiste",
            required: false,
            autoFocus: false
        }}
        />

        <p>Joe, définissez votre rôle ?</p>

        <Wizard.Field
        name="collaborateur.role"
        component={Form.Dropdown}
        componentProps={{
            label: "Ton rôle dans cette oeuvre",
            placeholder: "Choisis 1 ou plusieurs rôles",
            required: true,
            autoFocus: true,
            fluid: true,
            multiple: true,
            search: true,
            selection: true,
            options: rolesOptions
        }} 
        validate={required}
        />            

    </React.Fragment>
)

export default Page