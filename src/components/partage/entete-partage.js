import {config, AyantsDroit, journal} from '../../utils/application'
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Progress } from "semantic-ui-react";
import axios from 'axios'
import { toast } from 'react-toastify'
import placeholder from '../../assets/images/placeholder.png'
import './entete-partage.css'

const NOM = "EntetePartage"

class EntetePartage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: this.props.media,
      user: this.props.user
    }
    this.soumettre = this.soumettre.bind(this)
  }

  soumettre(t, values, etat, cb) {
    if (this.state.user) {
      // 1. Récupérer la liste des ayant-droits
      let _association = AyantsDroit.ayantsDroit
      // 2. Générer la structure à envoyer à Dynamo
      let droitEnregistrement = [];
      let droitInterpretePrincipal = [];
      let droitInterpreteAccompagnement = [];
      let droitAuteurMusique = [];
      let droitAuteurParoles = [];
      values.droitAuteur.forEach(elem => {
        let _rH = _association[elem.ayantDroit.rightHolderId]
        let uuid = _rH.rightHolderId
        if (elem.arrangeur || elem.compositeur) {
          let roles = {}
          if (elem.compositeur) {
            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a31"] = "composer"
          }
          if (elem.arrangeur) {
            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a32"] = "remixer"
          }
          droitAuteurMusique.push({
            "rightHolder": {
              "name": elem.nom,
              "rightHolderId": uuid,
              "color": elem.color
            },
            "voteStatus": "active",
            "contributorRole": roles,
            "splitPct": `${elem.pourcentMusique}`
          })
        }
        if (elem.auteur) {
          let roles = { "45745c60-7b1a-11e8-9c9c-2d42b21b1a33": "songwriter" }
          droitAuteurParoles.push({
            "rightHolder": {
              "name": elem.nom,
              "rightHolderId": uuid,
              "color": elem.color
            },
            "voteStatus": "active",
            "contributorRole": roles,
            "splitPct": `${elem.pourcentParoles}`
          })
        }
      })
      values.droitInterpretation.forEach(elem => {
        let _rH = _association[elem.ayantDroit.rightHolderId]
        let uuid = _rH.rightHolderId
        if (elem.principal) {
          let roles = { "45745c60-7b1a-11e8-9c9c-2d42b21b1a38": "principal" }
          if (elem.chanteur) {
            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a35"] = "singer"
          }
          if (elem.musicien) {
            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a36"] = "musician"
          }
          droitInterpretePrincipal.push({
            "rightHolder": {
              "name": elem.nom,
              "rightHolderId": uuid,
              "color": elem.color
            },
            "voteStatus": "active",
            "contributorRole": roles,
            "splitPct": `${elem.pourcent}`
          })
        } else {
          let roles = { "45745c60-7b1a-11e8-9c9c-2d42b21b1a37": "accompaniment" }
          if (elem.chanteur) {
            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a35"] = "singer"
          }
          if (elem.musicien) {
            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a36"] = "musician"
          }
          droitInterpreteAccompagnement.push({
            "rightHolder": {
              "name": elem.nom,
              "rightHolderId": uuid,
              "color": elem.color
            },
            "voteStatus": "active",
            "contributorRole": roles,
            "splitPct": `${elem.pourcent}`
          })
        }
      })
      values.droitEnregistrement.forEach(elem => {
        let _rH = _association[elem.ayantDroit.rightHolderId]
        let uuid = _rH.rightHolderId
        let roles = {}
        if (elem.producteur) {
          roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a40"] = "producer"
        }
        if (elem.realisateur) {
          roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a41"] = "director"
        }
        if (elem.studio) {
          roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a42"] = "studio"
        }
        if (elem.graphiste) {
          roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a43"] = "graphist"
        }
        droitEnregistrement.push({
          "rightHolder": {
            "name": elem.nom,
            "rightHolderId": uuid,
            "color": elem.color
          },
          "voteStatus": "active",
          "contributorRole": roles,
          "splitPct": `${elem.pourcent}`
        })
      })
      if (values.droitAuteur.length + values.droitInterpretation.length + values.droitEnregistrement.length === 0) {
        toast.warn(t('info.partage.vide'))
      } else {
        let body = {
          uuid: "",
          mediaId: parseInt(`${this.state.mediaId}`),              
          initiatorUuid: this.state.user.username,
          initiatorName: `${this.state.user.attributes.given_name} ${this.state.user.attributes.family_name}`,
          rightsSplits: {
            "workCopyrightSplit": {
              "lyrics": droitAuteurParoles,
              "music": droitAuteurMusique
            },
            "performanceNeighboringRightSplit": {
              "principal": droitInterpretePrincipal,
              "accompaniment": droitInterpreteAccompagnement
            },
            "masterNeighboringRightSplit": {
              "split": droitEnregistrement
            }
          },
          "comments": [],
          "etat": etat
        }
        body.comments.push({ rightHolderId: this.state.user.username, comment: "Initiateur du split" })
        if (values.uuid && values.uuid !== "") {
          // Reprise d'une proposition existante
          // 3a. Soumettre la nouvelle proposition en PUT
          body.uuid = values.uuid
          axios.put(`${config.API_URL}proposal/${body.uuid}`, body)
            .then(res => {
              // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
              if (typeof cb === "function") {
                cb()
              } else {
                this.modaleFin()
              }
            })
            .catch(err => {
              journal.error(NOM, err)
            })
        } else {
          // 3b. Soumettre la nouvelle proposition en POST
          axios.post(`${config.API_URL}proposal`, body)
            .then(res => {
              // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
              if (typeof cb === "function") {
                cb()
              } else {
                this.modaleFin()
              }
            })
            .catch(err => {
              journal.error(NOM, err)
            })
        }
      }       
      if (typeof cb === "function") {
        setTimeout(() => {
          cb()
        }, 1000)
      }       
    }
  }

  getProgressPercent = () => {
    /** 
     * Partage © (avec données documentées ou bouton «Plus tard» cliqué) =20%
      Si l’utilisateur sort immédiatement 
      Partage ✪ (avec données documentées) =40%
      Partage ℗ (avec données documentées) =60%
      Sommaire = 70%
      Sommaire envoyé aux invités 80%
      Sommaire envoyé aux invités approbation = 20% résiduel divisé par le nombre d’approbation attendues. Si 5 collabos, chaque collabo qui a approuvé vaut 4%.
      Approuvé = 100% (bouton «Continuer» devient «Voir le sommaire») 
    */   

    let donnees = this.props.values,
        pct = 0

    if(donnees.droitAuteur.length > 0) {
      pct += 20
    }
    if(donnees.droitInterpretation.length > 0) {
      pct += 20
    }
    if(donnees.droitEnregistrement.length > 0) {
      pct += 20
    }

    return pct

  }

  render() {
    let t = this.props.t
    let imageSrc = placeholder
    if(this.state.media) {
        let elem = this.state.media        
        if(elem.files && elem.files.cover && elem.files.cover.files && elem.files.cover.files.length > 0) {
            elem.files.cover.files.forEach(e=>{
                if(e.access === 'public') {
                    imageSrc = `${config.IMAGE_SRV_ARTISTES_URL}${elem.mediaId}/cover/${e.file}`
                }
            })
        }
    }
    return (      
      <React.Fragment>
        <div
          className="fixed-top"
          style={{
            background: "#ffff",
            height: "4.4em",
            left: "0px"
          }}
        >
          <div className="ui sixteen column grid">
            <div className="ui row entete">
              <div className="ui one wide column">
                <img className="cliquable" onClick={()=>this.props.enregistrerEtAllerAuSommaire(t, this.props.values, this.state.media.mediaId)} alt="Vignette" src={imageSrc} style={{width: "40px", height: "40px"}} />
              </div>
              <div className="ui eight wide column">                    
                {this.state.media && (
                  <span
                    className="medium-400 titre"
                  >
                    {this.state.media.title}
                  </span>
                )}
                <div className="heading4 titre">
                  {t("flot.split.documente-ton-oeuvre.etape.partage-titre")}
                </div>
              </div>
              <div className="ui seven wide column">
                <div
                  className="ui button negative enregistrer"
                  onClick={() => this.props.enregistrerEtAllerAuSommaire(t, this.props.values, this.state.media.mediaId)}
                >
                  {t(
                    "flot.split.documente-ton-oeuvre.etape.enregistrerEtQuitter"
                  )}
                </div>
              </div>                  
              <span className="menu-droite" >                                                                            
                <div
                  className="menuWrapper"
                  style={{
                    position: "absolute",
                    right: "220px"
                  }}
                >                      
                </div>
              </span>
            </div>
          </div>              
          <Progress percent={this.getProgressPercent()} size="tiny" success />
        </div>
        <div className="ui six wide column">
          <span
            className="entete--partage"
          ></span>
        </div>
      </React.Fragment>        
    )
  }
}

export default withTranslation()(EntetePartage)
