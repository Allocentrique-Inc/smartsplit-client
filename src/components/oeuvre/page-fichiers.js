import React from "react"
import { Translation } from "react-i18next"
import Page from "../page-assistant/page"
import FileCircleOrange from "../../assets/svg/icons/file-circle-orange.svg"
import FileCircleGreen from "../../assets/svg/icons/file-circle-green.svg"
import Colonne from "../page-assistant/colonne"
import Entete from "../page-assistant/entete"
import ChampTeleversement from "../page-assistant/champ-televersement"
import {SauvegardeAutomatiqueMedia} from "./SauvegardeAutomatique"
import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit"
import RightHolderOptions from "../page-assistant/right-holder-options";
import InfoBulle from "../partage/InfoBulle"

import * as roles from "../../assets/listes/role-uuids.json";

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
    };
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

  render() {
    const { terms } = this.state;
    return (
      <Translation>
        {(t, i18n) => (
          <Page pochette={this.props.pochette}>
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
                </h3>

                <p className="description">
                  {t(
                    "flot.split.documente-ton-oeuvre.documenter.titre8-description"
                  )}{" "}
                  <br />
                  <span>
                    {t(
                      "flot.split.documente-ton-oeuvre.documenter.titre8-plus"
                    )}
                  </span>
                </p>
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
                onChange={ids => this.setState({ graphists: ids })}
              />
              <br />

              <ChampTeleversement
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre8-etape1"
                )}
                undertext={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre8-etape2"
                )}
                file={this.props.values.files && this.props.values.files.cover && this.props.values.files.cover.file}
                access={(this.props.values.files && this.props.values.files.cover && this.props.values.files.cover.access) || "public"}
                onFileChange={value =>
                  this.props.setFieldValue("files.cover.file", value)
                }
                onAccessChange={value =>
                  this.props.setFieldValue("files.cover.access", value)
                }
              />

              <div className={"section-divider"}></div>

              <div className="entete-section">
                <h3 className="section-title with-description">
                  {t("flot.split.documente-ton-oeuvre.documenter.titre9")}
                </h3>

                <p className="description">
                  {t(
                    "flot.split.documente-ton-oeuvre.documenter.titre9-description"
                  )}
                </p>
              </div>

              <ChampTeleversement
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre9-etape1"
                )}
                undertext={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre9-etape2"
                )}
                access={(this.props.values.files && this.props.values.files.audio && this.props.values.files.audio.access) || "on-invite"}
                onFileChange={value =>
                  this.props.setFieldValue("files.audio.file", value)
                }
                onAccessChange={value =>
                  this.props.setFieldValue("files.audio.access", value)
                }
              />

              <div className={"section-divider"}></div>

              <div className="entete-section">
                <h3 className="section-title with-description">
                  {t("flot.split.documente-ton-oeuvre.documenter.autre")}
                </h3>

                <p className="description">
                  {t(
                    "flot.split.documente-ton-oeuvre.documenter.autre-description"
                  )}
                </p>
              </div>

              <ChampTeleversement                
                undertext={t(
                  "flot.split.documente-ton-oeuvre.documenter.autre-etape2"
                )} //Mette ça en toolkit
                access={(this.props.values.files && this.props.values.files.score && this.props.values.files.score.access) || "on-invite"}
                onFileChange={value =>
                  this.props.setFieldValue("files.score.file", value)
                }
                onAccessChange={value =>
                  this.props.setFieldValue("files.score.access", value)
                }
                label={
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      i18n.lng &&
                      (i18n.lng.substring(0, 2) === "en"
                        ? "https://en.wikipedia.org/wiki/Graphic_notation_(music)"
                        : "https://fr.wikipedia.org/wiki/Partition_graphique")
                    }
                    style={{ color: this.props.pochette ? "#F2724A": "#2DA84F" }}
                  >
                    {t("flot.split.documente-ton-oeuvre.documenter.autre-plus")}
                  </a>
                }
                key={terms}
                value={this.state.terms}
              />

              <ChampTeleversement
                extraStyle={{marginTop: "70px"}}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.autre-etape3"
                )}
                undertext={t(
                  "flot.split.documente-ton-oeuvre.documenter.autre-etape4"
                )}
                access={(this.props.values.files && this.props.values.files.midi && this.props.values.files.midi.access) || "on-invite"}
                onFileChange={value =>
                  this.props.setFieldValue("files.midi.file", value)
                }
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
