/**
 * Saisie du genre de l'oeuvre
 */

import React from "react"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'
import { Form } from "semantic-ui-react";

const genreOptions = [
    {key: 'G1', text: 'Punk', value: 'G01'},
    {key: 'G2', text: 'Rock', value: 'GO2'},
    {key: 'G3', text: 'Pop', value: 'GO3'},
    {key: 'G4', text: 'Classique et instrumental', value: 'GO4'}
]

const Page = (props) => (
    <React.Fragment>

        <h2>Quel est le genre de ton oeuvre ?</h2> 

        <p>Genre, style, comme ... ?</p>

        <Wizard.Field
        name="oeuvre.genre1"
        component={Form.Dropdown}
        componentProps={{
            label: "Le genre primaire",
            placeholder: "Recherche et sélectionne le genre principal de ton oeuvre",
            required: true,
            autoFocus: true,
            fluid: true,            
            search: true,
            options: genreOptions
        }}
        validate={required}
        />

        <Wizard.Field
        name="oeuvre.genre2"
        component={Form.Dropdown}
        componentProps={{
            label: "Le genre secondaire",
            placeholder: "Recherche et sélectionne le genre secondaire de ton oeuvre",
            required: false,
            autoFocus: false,
            fluid: true,            
            search: true,
            options: genreOptions
        }}
        />

    </React.Fragment>
)

export default Page