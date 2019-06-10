/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React from "react"
import { Translation } from 'react-i18next'
import { ChampTexteAssistant } from "../formulaires/champ-texte";

const Page = (props) => (

    <Translation>
        {
            (t) =>
                <React.Fragment>

                    <h2>{t('flot.pro.titre')}</h2>
                    <p>{t('flot.pro.preambule')}</p>

                    <ChampTexteAssistant
                        etiquette={t('oeuvre.attribut.etiquette.upc')} indication={t('oeuvre.attribut.indication.upc')} 
                        modele="upc" requis={false} autoFocus={false} />
                    <ChampTexteAssistant 
                        etiquette={t('oeuvre.attribut.etiquette.isrc')} indication={t('oeuvre.attribut.indication.isrc')} 
                        modele="isrc" requis={false} autoFocus={true} />

                </React.Fragment>
        }
    </Translation>    
)

export default Page