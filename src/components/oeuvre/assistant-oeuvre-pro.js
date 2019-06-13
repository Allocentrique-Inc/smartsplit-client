/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React from "react"
import { Translation } from 'react-i18next'
import { ChampTexteAssistant } from "../formulaires/champ-texte";

// Progression
import { Progress } from 'semantic-ui-react'

const Page = (props) => (

    <Translation>
        {
            (t) =>
                <React.Fragment>
                    <Progress percent={80} indicating></Progress>
                    <h2>{t('flot.pro.titre')}</h2>
                    <p>{t('flot.pro.preambule')}</p>

                    <ChampTexteAssistant 
                        etiquette={t('oeuvre.attribut.etiquette.editeur')} indication={t('oeuvre.attribut.indication.editeur')} 
                        modele="publisher" requis={false} autoFocus={true} />

                    <ChampTexteAssistant 
                        etiquette={t('oeuvre.attribut.etiquette.isrc')} indication={t('oeuvre.attribut.indication.isrc')} 
                        modele="isrc" requis={false} autoFocus={false} />

                    <ChampTexteAssistant
                        etiquette={t('oeuvre.attribut.etiquette.upc')} indication={t('oeuvre.attribut.indication.upc')} 
                        modele="upc" requis={false} autoFocus={false} />                    

                </React.Fragment>
        }
    </Translation>    
)

export default Page