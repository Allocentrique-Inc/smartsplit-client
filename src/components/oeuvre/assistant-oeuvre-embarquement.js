/**
 * Saisie du titre et de l'image de l'oeuvre.
 * 
 * Cet écran apparaît sans progression au-dessus.
 */

import React, { Component } from 'react'
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

class PageAssistantOeuvreEmbarquement extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      pctProgression: props.pctProgression
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.pctProgression !== nextProps.pctProgression) {
        this.setState({pctProgression: nextProps.pctProgression})
    }
  }
  
  render (){
    
    return (
      <React.Fragment>
        <Progress percent={this.state.pctProgression} indicating></Progress>
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
                      modele="title" requis={true} autoFocus={true} info={true} />

                    <br/>
            
                    <ChampInterrupteurAssistant modele="cover" etiquette={t('oeuvre.attribut.etiquette.reprise')} changement={ (a) => {
                      this.props.setFieldValue('cover', `${a}`, false)
                    }}/>                

                    <h2>{t('composant.televersement.titre')}</h2>

                    <p>
                      {t('composant.televersement.preambule')}
                    </p>

                    <ChampTeleversement values={this.props.values} indication={t('composant.televersement.indication')} 
                      chargement={ (f) => {
                        this.props.setFieldValue('fichiers', f, false)                        
                        this.props.setFieldValue('title', f[0].path, false)
                      }}
                      apres={ (f) => {
                        this.props.setFieldValue('fichiers', f, false)

                        if(f){
                          let analyse = f.music[0] // Il peut y avoir plus d'un résultat

                          if(this.props.values.title !== analyse.title) {
                            confirmAlert({
                              title: `Un résultat d'enregistrement est détecté pour ton œuvre!`,
                              message: `Veux-tu que je remplisse tous les champs, pour voir ce que ça donne ?`,
                              buttons: [
                                {
                                  label: 'Oui, je le veux !!',
                                  onClick: () => {
                                    this.props.setFieldValue('title', analyse.title, false)
                                    this.props.setFieldValue('publisher', analyse.label, false)
                                    this.props.setFieldValue('artist', analyse.artist[0].name, false)
                                    this.props.setFieldValue('album', analyse.album.name, false)
                                    this.props.setFieldValue('durationMs', `${analyse.duration_ms}`, false)
                                    this.props.setFieldValue('isrc', analyse.external_ids.isrc, false)
                                    this.props.setFieldValue('upc', analyse.external_ids.upc, false)
                                    this.props.setFieldValue('publishDate', analyse.release_date, false)
                                  }
                                },
                                {
                                  label: 'Non, je vais les remplir moi-même.',
                                  onClick: () => {
                                  }
                                }
                              ]
                            })
                          }
                        }
                      }                  
                    }
                  />
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
  }
}

export default PageAssistantOeuvreEmbarquement