/**
 * Saisie du titre et de l'image de l'oeuvre.
 * 
 * Cet écran apparaît sans progression au-dessus.
 */

import React from 'react'

// Traduction
import { Translation } from 'react-i18next'

// Champs de formulaire
import { ChampTexteAssistant } from '../formulaires/champ-texte'
import { ChampTeleversement } from '../formulaires/champ-televersement'

// Image de méditation
import image from '../../assets/images/meditation-ecouteurs-femme.jpg'

const Page = (props) => (
  <React.Fragment>
    <Translation>
      {
        (t) =>
          <table>
          <tbody>
            <tr>
              <td>
                <div>
                  {t('flot.documente-ton-oeuvre.preambule')}
                </div>

                <h1>
                  {t('flot.documente-ton-oeuvre.titre')}
                </h1>

                <ChampTexteAssistant 
                  etiquette={t('oeuvre.attribut.etiquette.titre')} indication={t('oeuvre.attribut.indication.titre')} 
                  modele="title" requis={true} autoFocus={true} />

                <h2>{t('composant.televersement.titre')}</h2>

                <p>
                  {t('composant.televersement.preambule')}
                </p>

                <ChampTeleversement indication={t('composant.televersement.indication')} apres={ (f) => {
                  props.setFieldValue('fichier', f, false)
                  props.setFieldTouched('fichier', false, false)
                }}/>
          
              </td>
              <td>
                <img src={image} alt={t('image.embarquement.alt')} />
              </td>
            </tr>
          </tbody>      
        </table>
      }      
    </Translation>    
  </React.Fragment>
)

export default Page