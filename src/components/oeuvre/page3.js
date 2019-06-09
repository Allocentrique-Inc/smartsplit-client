/**
 * Saisie des paroles de l'oeuvre
 */

import React from "react"
import { Translation } from "react-i18next"
import { ChampTexteLongAssistant } from "../formulaires/champ-texte"
import { ChampListeAssistant } from "../formulaires/champ-liste"

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

                    <ChampTexteLongAssistant 
                        etiquette={t('oeuvre.attribut.etiquette.paroles')} indication={t('oeuvre.attribut.indication.paroles')}
                        modele="oeuvre.paroles.texte" requis={true} autoFocus={true} />

                    <ChampListeAssistant
                        etiquette={t('oeuvre.attribut.etiquette.langueParoles')} indication={t('oeuvre.attribut.indication.langueParoles')}
                        modele="oeuvre.paroles.langue" requis={true} fluid={true} multiple={true} recherche={true} selection={true} autoFocus={true}
                        options={languesOptions} />

                </React.Fragment>
        }
    </Translation>
    
)

export default Page