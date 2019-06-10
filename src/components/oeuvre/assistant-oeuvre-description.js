/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React from "react"
import { Translation } from 'react-i18next'
import { ChampTexteAssistant } from "../formulaires/champ-texte";
import { ChampListeAssistant } from "../formulaires/champ-liste";

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

                    <ChampTexteAssistant 
                        etiquette={t('collaborateur.attribut.etiquette.nom')} indication={t('collaborateur.attribut.indication.nom')} 
                        modele="rightHolders[0].nom" requis={true} autoFocus={true} />

                    <ChampTexteAssistant 
                        etiquette={t('collaborateur.attribut.etiquette.prenom')} indication={t('collaborateur.attribut.indication.prenom')} 
                        modele="rightHolders[0].prenom" requis={true} autoFocus={false} />

                    <ChampTexteAssistant 
                        etiquette={t('collaborateur.attribut.etiquette.artiste')} indication={t('collaborateur.attribut.indication.artiste')} 
                        modele="rightHolders[0].artiste" requis={false} autoFocus={false} />

                    <p>{t('flot.collaborateurs.role')}</p>
                    <ChampListeAssistant
                        etiquette={t('collaborateur.attribut.etiquette.role')} indication={t('collaborateur.attribut.indication.role')}
                        modele="rightHolders[0].role" requis={true} fluid={true} multiple={true} recherche={true} selection={true} autoFocus={true}
                        options={rolesOptions} />

                </React.Fragment>
        }
    </Translation>    
)

export default Page