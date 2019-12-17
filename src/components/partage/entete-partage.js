/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react";
import { Translation } from "react-i18next";
import { Progress } from "semantic-ui-react";

import axios from 'axios'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'

import MenuProfil from "../entete/menu-profil";

class EntetePartage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: this.props.media,
      user: this.props.user
    };
    //this.enregistrerEtQuitter = this.enregistrerEtQuitter.bind(this)
    this.soumettre = this.soumettre.bind(this)
  }

  soumettre(t, values, etat, cb) {

    if (this.state.user) {
      let _association = {} // Associera le nom de l'ayant-droit avec son identitifiant unique

      // 1. Récupérer la liste des ayant-droits
      axios.get(`http://dev.api.smartsplit.org:8080/v1/rightHolders`)
        .then(res => {
          res.data.forEach(elem => {
            //let nom = `${elem.firstName || ""} ${elem.lastName || ""} ${elem.artistName ? `(${elem.artistName})` : ""}`
            _association[elem.rightHolderId] = elem
          })
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
              }
              )
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
              }
              )
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
              //roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a42"] = "studio"
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
              initiator: {
                "name": `${this.state.user.attributes.given_name} ${this.state.user.attributes.family_name}`,
                "id": this.state.user.username
              },
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
              axios.put(`http://dev.api.smartsplit.org:8080/v1/proposal/${body.uuid}`, body)
                .then(res => {
                  //toast.success(`${res.data}`)
                  // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
                  if (typeof cb === "function") {
                    cb()
                  } else {
                    this.modaleFin()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              // 3b. Soumettre la nouvelle proposition en POST
              axios.post('http://dev.api.smartsplit.org:8080/v1/proposal', body)
                .then(res => {
                  // toast.success(`${res.data}`)
                  // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
                  if (typeof cb === "function") {
                    cb()
                  } else {
                    this.modaleFin()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }
          }

        })
        .catch(err => {
          console.log(err)
          if (typeof cb === "function") {
            setTimeout(() => {
              cb()
            }, 1000)
          }
        })
    }
  }

  /* enregistrerEtQuitter(t, valeurs) {
    consolel.log("Enregistrer et quitter", valeurs)
    this.soumettre(t, valeurs, "BROUILLON", () => {
      Auth.signOut()
        .then(data => {
          //toast.success("Déconnexion réussie")
          setTimeout(() => {
            window.location.href = '/accueil'
          }, 1000)
        })
        .catch(error => console.log(error))
    })
  } */

  getProgressPercent = () => {
    switch (this.props.currentPage) {
      case 0:
        return 20
      case 1:
        return 50
      case 2:
        return 85
    }
  }

  render() {
    return (
      <Translation>
        {t => (
          <React.Fragment>
            <div
              className="fixed-top"
              style={{
                background: "#ffff",
                height: "4.4em"
              }}
            >
              <span className="menu-droite" style={{ display: "inline-flex" }}>
                <i className="file image outline icon huge grey"></i>
                {this.state.media && (
                  <span
                    style={{ marginLeft: "15px", lineHeight: "40px" }}
                    className="medium-400 titre"
                  >
                    {this.state.media.title}
                  </span>
                )}
                <div className="heading4" style={{ marginLeft: "50px" }}>
                  {t("flot.split.documente-ton-oeuvre.etape.partage-titre")}

                  <div
                    className="ui button negative"
                    style={{
                      top: 0,
                      position: "relative",
                      left: "430px",
                      width: "200px"
                    }}
                    onClick={() => {
                      this.props.enregistrerEtQuitter(t, this.props.values);
                    }}
                  >
                    {t(
                      "flot.split.documente-ton-oeuvre.etape.enregistrerEtQuitter"
                    )}
                  </div>
                </div>
                <div
                  className="menuWrapper"
                  style={{
                    position: "absolute",
                    right: "220px"
                  }}
                >
                  <MenuProfil
                    onRef={menu => {
                      this.setState({ menu: menu });
                    }}
                    user={this.state.user}
                  />
                </div>
              </span>
              <br />
              <Progress percent={this.getProgressPercent()} size="tiny" indicating />
            </div>
            <div className="ui six wide column">
              <span
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "200px"
                }}
                className="entete--partage"
              ></span>
            </div>
          </React.Fragment>
        )}
      </Translation>
    );
  }
}

export default EntetePartage;
