import React from "react"
import { Translation } from "react-i18next"
import Page from "../page-assistant/page"
import FileCircleOrange from "../../assets/svg/icons/file-circle-orange.svg"
import FileCircleGreen from "../../assets/svg/icons/file-circle-green.svg"
import Colonne from "../page-assistant/colonne"
import Entete from "../page-assistant/entete"
import ChampTeleversement from "../page-assistant/champ-televersement"
import { SauvegardeAutomatiqueMedia } from "./SauvegardeAutomatique"
import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit"
import RightHolderOptions from "../page-assistant/right-holder-options";
import InfoBulle from "../partage/InfoBulle"
import { toast } from 'react-toastify'

import * as roles from "../../assets/listes/role-uuids.json"

import axios from 'axios'

import {
  addRightHolderIfMissing,
  getRightHolderIdsByRole,
  hasRoles,
  updateRole
} from "../page-assistant/right-holder-helpers";

export default class PageFichiers extends React.Component {
  icon() {
    return this.props.pochette ? FileCircleOrange : FileCircleGreen
  }

  constructor(props) {
    super(props);

    this.state = {
      graphists: getRightHolderIdsByRole(
        roles.graphist,
        props.values.rightHolders
      ),
      open: props.open,
      terms: "Y"
    }

    this.televerser = this.televerser.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.graphists !== prevState.graphists
    ) {

      const creationRightHolderIds = this.state.graphists

      const updatedRightHolders = creationRightHolderIds
        .reduce(addRightHolderIfMissing, [...this.props.values.rightHolders])
        .map(this.getUpdatedRightHolder)
        .filter(hasRoles);

      this.props.setFieldValue("rightHolders", updatedRightHolders);
    }
  }

  getUpdatedRightHolder = rightHolder => {
    const rightHolderRoles = rightHolder.roles || [];
    const id = rightHolder.id || null;

    const graphistsRoles = updateRole(
      roles.graphist,
      this.state.graphists,
      id,
      rightHolderRoles
    );

    return Object.assign({}, rightHolder, { roles: graphistsRoles });
  };

  rightHolderOptions() {
    return RightHolderOptions(this.props.rightHolders);
  }

  televerser(value, chemin) {
    if (value) {
      this.setState({ patience: true })
      let fichier = value
      let fd = new FormData()
      fd.append('file', fichier)                    
      let mediaId = this.props.values.mediaId                  
      fd.append('mediaId', mediaId)
      axios.post(`http://envoi.smartsplit.org:3033/${chemin}`, fd)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
          if (err) {
              console.log(err)                                
          }
      })
      .finally(() => {
          this.setState({ patience: false })
      })
    }
  }  

  idsSiUUID(ids) {
    // Protéger la liste des valeurs non-uuid
    let _ids = []
    const UUID_REGEXP = new RegExp("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")
    if (ids) {
      ids.forEach(id => {
        if (UUID_REGEXP.test(id)) {
          _ids.push(id)
        }
      })
      return _ids
    }
  }

  render() {
    const { terms } = this.state;
    return (
      <Translation>
        {(t, i18n) => (
          <Page pochette={this.props.pochette}>
             {
              this.state.patience &&
              (
                <div className="container ui active dimmer">
                  <div className="ui text loader">{t("televersement.encours")}</div>
                </div>
              )
            }
            <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={10000} />
            <Colonne>
              <Entete
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.fichier"
                )}
                question={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre4"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre4-description"
                )}
              />

              <div className="entete-section">
                <h3 className="section-title with-description">
                  {t("flot.split.documente-ton-oeuvre.documenter.titre8")}
                  <InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre8-description")} />
                </h3>
              </div>

              <ChampSelectionMultipleAyantDroit
                label={t("flot.split.documente-ton-oeuvre.documenter.graphiste")}
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.graphiste-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.graphiste-placeholder"
                )}
                value={this.state.graphists}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({ graphists: _ids })
                }}
                fn={(nouveau) => {
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.graphist)
                }}
              />
              <br />

              <ChampTeleversement
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre8-etape1"
                )}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre8-etape2")} />}
                file={this.props.values.files && this.props.values.files.cover && this.props.values.files.cover.file}
                access={(this.props.values.files && this.props.values.files.cover && this.props.values.files.cover.access) || "public"}
                onFileChange={value => {
                  let nom = value.name.replace(/ /g,'_') 
                  this.props.setFieldValue("files.cover.file", nom)
                  if(!this.props.values.files.cover || !this.props.values.files.cover.access) {
                    this.props.setFieldValue("files.cover.access", 'public')
                  }
                  this.televerser(value, 'uploadCoverArt')
                }}
                onAccessChange={value =>
                  this.props.setFieldValue("files.cover.access", value)
                }
              />

              <div className={"section-divider"}></div>

              <div className="entete-section">
                <h3 className="section-title with-description">
                  {t("flot.split.documente-ton-oeuvre.documenter.titre9")}
                  <InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre9-description")} />
                </h3>
              </div>

              <ChampTeleversement
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre9-etape1"
                )}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre9-etape2")} />}
                access={(this.props.values.files && this.props.values.files.audio && this.props.values.files.audio.access) || "public"}
                onFileChange={value => {
                  let nom = value.name.replace(/ /g,'_') 
                  this.props.setFieldValue("files.audio.file", nom)
                  if(!this.props.values.files.audio || !this.props.values.files.audio.access) {
                    this.props.setFieldValue("files.audio.access", 'public')
                  }
                  this.televerser(value, 'upload')
                }}
                onAccessChange={value =>
                  this.props.setFieldValue("files.audio.access", value)
                }
              />

              <div className={"section-divider"}></div>

              <div className="entete-section">
                <h3 className="section-title with-description">
                  {t("flot.split.documente-ton-oeuvre.documenter.autre")}
                  <InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.autre-description")} />
                </h3>
              </div>

              <ChampTeleversement
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.autre-etape2")} />}
                access={(this.props.values.files && this.props.values.files.score && this.props.values.files.score.access) || "public"}
                onFileChange={value => {
                  let nom = value.name.replace(/ /g,'_') 
                  this.props.setFieldValue("files.score.file", nom)
                  if(!this.props.values.files.score || !this.props.values.files.score.access) {
                    this.props.setFieldValue("files.score.access", 'public')
                  }
                  this.televerser(value, 'uploadScore')
                }}
                onAccessChange={value =>
                  this.props.setFieldValue("files.score.access", value)
                }
                label={t("flot.split.documente-ton-oeuvre.documenter.autre-etape1")
                }
                key={terms}
                value={this.state.terms}
              />
              <ChampTeleversement
                extraStyle={{ marginTop: "70px" }}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.autre-etape3"
                )}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.autre-etape4")} />}
                access={(this.props.values.files && this.props.values.files.midi && this.props.values.files.midi.access) || "public"}
                onFileChange={value => {
                  let nom = value.name.replace(/ /g,'_') 
                  this.props.setFieldValue("files.midi.file", nom)
                  if(!this.props.values.files.midi || !this.props.values.files.midi.access) {
                    this.props.setFieldValue("files.midi.access", 'public')
                  }
                  this.televerser(value, 'uploadMidi')
                }}
                onAccessChange={value =>
                  this.props.setFieldValue("files.midi.access", value)
                }
              />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}
