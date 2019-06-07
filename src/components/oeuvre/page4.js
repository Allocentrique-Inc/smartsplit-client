/**
 * Saisie du genre de l'oeuvre
 */

import React from "react"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'
import { Form } from "semantic-ui-react"
import { Translation } from "react-i18next"

const genreOptions = [
    {key: 'G1', text: 'Punk', value: 'G01'},
    {key: 'G2', text: 'Rock', value: 'GO2'},
    {key: 'G3', text: 'Pop', value: 'GO3'},
    {key: 'G4', text: 'Classique et instrumental', value: 'GO4'}
]

const Page = (props) => (

    <Translation>
        {
            (t) =>
                <React.Fragment>

                    <h2>{t('flot.genre.titre')}</h2> 
            
                    <p>{t('flot.genre.preambule')}</p>
            
                    <Wizard.Field
                    name="oeuvre.genre1"
                    component={Form.Dropdown}
                    componentProps={{
                        label: t('oeuvre.attribut.etiquette.genre'),
                        placeholder: t('oeuvre.attribut.indication.genre'),
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
                        label: t('oeuvre.attribut.etiquette.genre2'),
                        placeholder: t('oeuvre.attribut.indication.genre2'),
                        required: false,
                        autoFocus: false,
                        fluid: true,            
                        search: true,
                        options: genreOptions
                    }}
                    />
            
                </React.Fragment>
        }
    </Translation>
)

export default Page