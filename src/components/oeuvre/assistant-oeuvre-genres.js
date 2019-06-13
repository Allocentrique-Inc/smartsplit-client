/**
 * Saisie du genre de l'oeuvre
 */

import React from "react"
import { Translation } from "react-i18next"
import { ChampListeAssistant } from "../formulaires/champ-liste"

// Progression
import { Progress } from 'semantic-ui-react'

const listeGenres = require('../../assets/listes/genres.json')

function genererGenres(secondaire = false) { // secondaire est booléen
    return listeGenres.map(elem=>{
        let prefixe = secondaire ? 'GS' : 'G'
        return {
            key: `${prefixe}${elem.genre_id}`,
            text: elem.value,
            value: `${prefixe}${elem.genre_id}`
        }
    })
}

const genreOptions = genererGenres()
const genreSecondaireOptions = genererGenres(true)

const Page = (props) => (

    <Translation>
        {
            (t) =>
                <React.Fragment>
                    <Progress percent={60} indicating></Progress>
                    <h2>{t('flot.genre.titre')}</h2>            
                    <p>{t('flot.genre.preambule')}</p>

                    <ChampListeAssistant
                        etiquette={t('oeuvre.attribut.etiquette.genre')} indication={t('oeuvre.attribut.indication.genre')}
                        modele="genre" requis={true} fluid={true} multiple={false} recherche={true} selection={true} autoFocus={true}
                        options={genreOptions} />

                    <ChampListeAssistant
                        etiquette={t('oeuvre.attribut.etiquette.genre2')} indication={t('oeuvre.attribut.indication.genre2')}
                        modele="secondaryGenre" requis={false} fluid={true} multiple={false} recherche={true} selection={true} autoFocus={false}
                        options={genreSecondaireOptions} />                           
            
                </React.Fragment>
        }
    </Translation>
)

export default Page