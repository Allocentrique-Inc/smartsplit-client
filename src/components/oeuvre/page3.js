/**
 * Saisie des paroles de l'oeuvre
 */

import React from "react"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'
import { Form } from "semantic-ui-react";
import { Translation } from "react-i18next"

const languesOptions = [
    {key: 'L1', text: 'Français', value: 'LO1'},
    {key: 'L2', text: 'Anglais', value: 'LO2'},
    {key: 'L3', text: 'Espagnol', value: 'LO3'},
    {key: 'L4', text: 'Instrumental', value: 'LO4'}
]

const Page = (props) => (

    <Translation>
        {
            (t) => 
                <React.Fragment>

                    <h2>{t('flot.paroles.titre')}</h2> 

                    <p>{t('flot.paroles.preambule')}</p>

                    <Wizard.Field
                    name="oeuvre.paroles.texte"
                    component={Form.TextArea}
                    componentProps={{
                        label: t('oeuvre.attribut.etiquette.paroles'),
                        placeholder: t('oeuvre.attribut.indication.paroles'),
                        required: true,
                        autoFocus: true
                    }}
                    validate={required}
                    />

                    <Wizard.Field
                    name="oeuvre.paroles.langues"
                    component={Form.Dropdown}
                    componentProps={{
                        label: t('oeuvre.attribut.etiquette.langueParoles'),
                        placeholder: t('oeuvre.attribut.indication.langueParoles'),
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
        }
    </Translation>
    
)

export default Page