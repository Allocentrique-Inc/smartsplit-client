import React from "react";
import { Translation } from "react-i18next";
import Page from "../page-assistant/page";
import MusicCircleOrange from "../../assets/svg/icons/music-circle-orange.svg";
import MusicCircleGreen from "../../assets/svg/icons/music-circle-green.svg";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampDuree from "../page-assistant/champ-duree";
import ChampTexte from "../page-assistant/champ-texte";
import ChampSelection from "../page-assistant/champ-selection";
import ChampSelectionMultiple from "../page-assistant/champ-selection-multiple";
import SelectOption from "../../model/select-option/select-option";
import { SauvegardeAutomatiqueMedia } from "./SauvegardeAutomatique";
import InfoBulle from "../partage/InfoBulle";

export default class PageInformationsGenerales extends React.Component {
  constructor(props) {
    super(props);

    let langue = props.i18n.lng.substring(0, 2);
    let genres = require(`../../assets/listes/${langue}/genres`).genres;

    // Épuration de la liste des instruments pour éviter les doublons
    let _genres = {};
    this.genres = [];

    genres.forEach(i => {
      if (!_genres[i.nom]) _genres[i.nom] = i;
    });

    Object.keys(_genres).forEach(_g => {
      let g = _genres[_g];
      this.genres.push({
        key: g.nom,
        value: g.nom,
        text: g.nom
      });
    });
  }

  genreOptions() {
    return this.genres.map(genre => new SelectOption(genre));
  }

  icon() {
    return this.props.pochette ? MusicCircleOrange : MusicCircleGreen;
  }

  render() {
    return (
      <Translation>
        {t => (
          <Page pochette={this.props.pochette}>
            <SauvegardeAutomatiqueMedia
              etat={true}
              values={this.props.values}
              interval={10000}
            />
            <Colonne>
              <Entete
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t("flot.split.documente-ton-oeuvre.documenter.titre5")}
                question={t(
                  "flot.split.documente-ton-oeuvre.documenter.details"
                )}
              />

              <div className="mb-2">
                <div className="ui grid">
                  <div className="ui sixteen wide mobile eight wide tablet eight wide computer column">
                    <ChampDuree
                      pochette={this.props.pochette}
                      label={t(
                        "flot.split.documente-ton-oeuvre.documenter.duree"
                      )}
                      placeholder="MM:SS"
                      msDuration={parseInt(this.props.values.msDuration)}
                      onChange={value =>
                        this.props.setFieldValue("msDuration", `${value}`)
                      }
                    />
                  </div>

                  <div className="ui sixteen wide mobile eight wide tablet eight wide computer column">
                    <ChampTexte
                      pochette={this.props.pochette}
                      label="BPM"
                      placeholder="888"
                      value={this.props.values.bpm}
                      onChange={value => this.props.setFieldValue("bpm", value)}
                    />
                  </div>
                </div>
              </div>

              <ChampSelection
                pochette={this.props.pochette}
                items={this.genreOptions()}
                label={t("oeuvre.attribut.etiquette.genre")}
                /*createLabel={t("oeuvre.attribut.etiquette.creer-genre")}*/
                placeholder={t("oeuvre.attribut.etiquette.ajouter-genre")}
                value={this.props.values.genre}
                onChange={value => this.props.setFieldValue("genre", value)}
              />

              <ChampSelectionMultiple
                pochette={this.props.pochette}
                items={this.genreOptions()}
                label={t("oeuvre.attribut.etiquette.genre2")}
                /*createLabel={t("oeuvre.attribut.etiquette.creer-genre")}*/
                placeholder={t("oeuvre.attribut.etiquette.ajouter-genre")}
                value={this.props.values.secondaryGenres}
                onChange={value =>
                  this.props.setFieldValue("secondaryGenres", value)
                }
              />

              <ChampTexte
                pochette={this.props.pochette}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.influence"
                )}
                info={
                  <InfoBulle
                    text={t(
                      "flot.split.documente-ton-oeuvre.documenter.entete.exemple"
                    )}
                  />
                }
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.influenceurs"
                )}
                value={this.props.values.influence}
                onChange={value => this.props.setFieldValue("influence", value)}
              />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}
