/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React from "react"
import { FormField } from "semantic-ui-react-ext"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'
import { Form } from "semantic-ui-react"
import { Translation } from 'react-i18next'

const rolesOptions = [
    {key: 'R1', text: 'Compositeur', value: 'RO1'},
    {key: 'R2', text: 'Chanteur', value: 'RO2'},
    {key: 'R3', text: 'Instrumentiste', value: 'RO3'}
]

const Page = (props) => (

    <Translation>
        {
            (t) =>
                <React.Fragment>

                    <h2>{t('flot.collaborateurs.titre')}</h2>

                    <p>{t('flot.collaborateurs.preambule')}</p>

                    <Wizard.Field
                        name="collaborateur.nom"
                        component={FormField}
                        componentProps={{
                            label: t('collaborateur.attribut.etiquette.nom'),
                            placeholder: t('collaborateur.attribut.indication.nom'),
                            required: true,
                            autoFocus: true
                        }}
                        validate={required}
                    />

                    <Wizard.Field
                        name="collaborateur.prenom"
                        component={FormField}
                        componentProps={{
                            label: t('collaborateur.attribut.etiquette.prenom'),
                            placeholder: t('collaborateur.attribut.indication.prenom'),
                            required: true,
                            autoFocus: false
                        }}
                        validate={required}
                    />

                    <Wizard.Field
                        name="collaborateur.artiste"
                        component={FormField}
                        componentProps={{
                            label: t('collaborateur.attribut.etiquette.artiste'),
                            placeholder: t('collaborateur.attribut.indication.artiste'),
                            required: false,
                            autoFocus: false
                        }}
                    />

                    <p>{t('flot.collaborateurs.role')}</p>

                    <Wizard.Field
                        name="collaborateur.role"
                        component={Form.Dropdown}
                        componentProps={{
                            label: t('collaborateur.attribut.etiquette.role'),
                            placeholder: t('collaborateur.attribut.indication.role'),
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
        }
    </Translation>    
)

export default Page