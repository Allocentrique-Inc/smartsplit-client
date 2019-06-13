/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React from "react"
import { Translation } from 'react-i18next'
import { ChampTexteAssistant } from "../formulaires/champ-texte";
import { ChampListeAssistant } from "../formulaires/champ-liste";

// Progression
import { Progress } from 'semantic-ui-react'

import { FieldArray } from 'formik'

const rolesOptions = require('../../assets/listes/roles.json')

const Page = (props) => (

    <Translation>
        {
            (t) =>
                <React.Fragment>
                    <Progress percent={20} indicating></Progress>
                    <h2>{t('flot.collaborateurs.titre')}</h2>                    

                    <FieldArray
                        name="rightHolders"
                        render={arrayHelpers => (
                        <div>                            

                            {props.values.rightHolders && props.values.rightHolders.length > 0 ? (
                            props.values.rightHolders.map((collaborateur, index) => (

                                <div key={`collaborateur.${index}`}>                                    

                                    <ChampTexteAssistant 
                                        etiquette={t('collaborateur.attribut.etiquette.prenom')} indication={t('collaborateur.attribut.indication.prenom')} 
                                        modele={`rightHolders[${index}].prenom`} requis={true} autoFocus={true} />

                                    <ChampTexteAssistant 
                                        etiquette={t('collaborateur.attribut.etiquette.nom')} indication={t('collaborateur.attribut.indication.nom')} 
                                        modele={`rightHolders[${index}].nom`} requis={true} autoFocus={false} />

                                    <ChampTexteAssistant 
                                        etiquette={t('collaborateur.attribut.etiquette.artiste')} indication={t('collaborateur.attribut.indication.artiste')} 
                                        modele={`rightHolders[${index}].artiste`} requis={false} autoFocus={false} />

                                    <p>{t('flot.collaborateurs.role')}</p>
                                    <ChampListeAssistant
                                        etiquette={t('collaborateur.attribut.etiquette.role')} indication={t('collaborateur.attribut.indication.role')}
                                        modele={`rightHolders[${index}].role`} requis={true} fluid={true} multiple={true} recherche={true} selection={true} autoFocus={true}
                                        options={rolesOptions} />

                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.insert(index, {})}
                                    >
                                        +
                                    </button>
                                
                                </div>
                            ))
                            ) : (
                            <button type="button" onClick={() => arrayHelpers.push('')}>
                                {t('flot.collaborateurs.preambule')}
                            </button>
                            )}                            
                        </div>
                        )}
                    />                    

                </React.Fragment>
        }
    </Translation>    
)

export default Page