import React from "react";
import { Translation } from "react-i18next";
import Page from "../page-assistant/page";
import { ChampDate } from "../page-assistant/champ-date";
import LyricsCircleOrange from "../../assets/svg/icons/lyrics-circle-orange.svg";
import LyricsCircleGreen from "../../assets/svg/icons/lyrics-circle-green.svg";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampTextArea from "../page-assistant/champ-textarea";
import ChampSelectionMultiple from "../page-assistant/champ-selection-multiple";
import ChampAccesVision from "../page-assistant/champ-acces-vision";

export default class PageParoles extends React.Component {
  languages = ["Français", "Anglais", "Esperanto"];

  icon() {
    return this.props.pochette ? LyricsCircleOrange : LyricsCircleGreen;
  }

  languageOptions() {
    return this.languages.map(language => {
      return {
        key: language,
        value: language,
        text: language
      };
    });
  }

  render() {
    return (
      <Translation>
        {t => (
          <Page pochette={this.props.pochette}>
            <Colonne>
              <Entete
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t("flot.documenter.entete.parole")}
                question={
                  this.props.values.title +
                  " " +
                  t("flot.split.documente-ton-oeuvre.documenter.titre6")
                }
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre6-description"
                )}
              />

              <ChampTextArea
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.parole"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.ajouter-parole"
                )}
                undertext={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.parole-only"
                )}
                value={this.props.values.lyrics.text}
                onChange={value =>
                  this.props.setFieldValue("lyrics.text", value)
                }
              />

              <ChampSelectionMultiple
                pochette={this.props.pochette}
                items={this.languageOptions()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.langueParole"
                )}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.langue-creer"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.langue-ajouter"
                )}
                value={this.props.values.lyrics.languages}
                onChange={values =>
                  this.props.setFieldValue("lyrics.languages", values)
                }
              />

              <ChampAccesVision
                value={this.props.values.lyrics.access}
                onChange={value =>
                  this.props.setFieldValue("lyrics.access", value)
                }
              />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}
