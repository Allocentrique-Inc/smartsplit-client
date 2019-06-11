/** 
 * Assistant de saisie de la description d'une oeuvre
 */
import './oeuvre.css'
import React from 'react'
import { Wizard } from "semantic-ui-react-formik"

// Pages de l'assistant
import Embarquement from './assistant-oeuvre-embarquement'
import { Translation } from 'react-i18next';

const AssistantOeuvreEmbarquement = ({onSubmit}) => (
    <Translation>
        {
            (t) =>
                <Wizard
                        initialValues={{}}
                        onSubmit={onSubmit}
                        debug={false}
                        buttonLabels={{submit: t('navigation.envoi')}}
                    >
                        <Wizard.Page>
                            <Embarquement />
                        </Wizard.Page>
                </Wizard>
        }
    </Translation>    
)

export default AssistantOeuvreEmbarquement