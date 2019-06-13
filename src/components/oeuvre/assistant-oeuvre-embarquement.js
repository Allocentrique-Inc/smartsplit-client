/**
 * Saisie du titre et de l'image de l'oeuvre.
 * 
 * Cet écran apparaît sans progression au-dessus.
 */

import React from 'react'
import { confirmAlert } from 'react-confirm-alert'

// Traduction
import { Translation } from 'react-i18next'

// Progression
import { Progress } from 'semantic-ui-react'

// Champs de formulaire
import { ChampTexteAssistant } from '../formulaires/champ-texte'
import { ChampTeleversement } from '../formulaires/champ-televersement'
import { ChampInterrupteurAssistant } from '../formulaires/champ-interrupteur';

// Image de méditation
import image from '../../assets/images/meditation-ecouteurs-femme.jpg'

// CSS
import 'react-confirm-alert/src/react-confirm-alert.css'

const Page = (props) => (
  <React.Fragment>
    <Progress percent={0} indicating></Progress>
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

                <br/>
        
                <ChampInterrupteurAssistant modele="cover" etiquette={t('oeuvre.attribut.etiquette.reprise')} changement={ (a) => {
                  props.setFieldValue('cover', `${a}`, false)
                }}/>                

                <h2>{t('composant.televersement.titre')}</h2>

                <p>
                  {t('composant.televersement.preambule')}
                </p>

                <ChampTeleversement indication={t('composant.televersement.indication')} apres={ (f) => {
                  props.setFieldValue('fichier', f, false)

                  let analyse = f.music[0] // Il peut y avoir plus d'un résultat

                  if(props.values.title !== analyse.title) {
                    confirmAlert({
                      title: `Un résultat d'enregistrement est détecté pour votre œuvre!`,
                      message: `Voulez-vous remplir les champs avec les valeurs découvertes?`,
                      buttons: [
                        {
                          label: 'Oui, je le veux',
                          onClick: () => {
                            props.setFieldValue('title', analyse.title, false)
                            props.setFieldValue('publisher', analyse.label, false)
                            props.setFieldValue('artist', analyse.artist[0].name, false)
                            props.setFieldValue('album', analyse.album.name, false)
                            props.setFieldValue('durationMs', `${analyse.duration_ms}`, false)
                            props.setFieldValue('isrc', analyse.external_ids.isrc, false)
                            props.setFieldValue('upc', analyse.external_ids.upc, false)
                            props.setFieldValue('publishDate', analyse.release_date, false)
                          }
                        },
                        {
                          label: 'Non, je le ferai moi-même',
                          onClick: () => {
                          }
                        }
                      ]
                    })
                  }

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