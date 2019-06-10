/**
 * Saisie du genre de l'oeuvre
 */

import React from "react"
import { Translation } from "react-i18next"
import { ChampListeAssistant } from "../formulaires/champ-liste"

const genreOptions = [
    {key: 'G1', text: 'Punk', value: 'G01'},
    {key: 'G2', text: 'Rock', value: 'GO2'},
    {key: 'G3', text: 'Pop', value: 'GO3'},
    {key: 'G4', text: 'Classique et instrumental', value: 'GO4'}
]

const genreSecondaireOptions = [
    {key: 'GS1', text: 'Punk', value: 'GS01'},
    {key: 'GS2', text: 'Rock', value: 'GSO2'},
    {key: 'GS3', text: 'Pop', value: 'GSO3'},
    {key: 'GS4', text: 'Classique et instrumental', value: 'GSO4'}
]

const Page = (props) => (

    <Translation>
        {
            (t) =>
                <React.Fragment>

                    <h2>{t('flot.genre.titre')}</h2>            
                    <p>{t('flot.genre.preambule')}</p>

                    <ChampListeAssistant
                        etiquette={t('oeuvre.attribut.etiquette.genre')} indication={t('oeuvre.attribut.indication.genre')}
                        modele="genre" requis={true} fluid={true} multiple={false} recherche={true} selection={false} autoFocus={true}
                        options={genreOptions} />

                    <ChampListeAssistant
                        etiquette={t('oeuvre.attribut.etiquette.genre2')} indication={t('oeuvre.attribut.indication.genre2')}
                        modele="secondaryGenre" requis={false} fluid={true} multiple={false} recherche={true} selection={false} autoFocus={false}
                        options={genreSecondaireOptions} />                           
            
                </React.Fragment>
        }
    </Translation>
)

export default Page