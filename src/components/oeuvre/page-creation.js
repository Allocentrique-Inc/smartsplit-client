/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react";
import { Translation } from "react-i18next";

import copyrightIconOrange from "../../assets/svg/icons/copyright-orange.svg";
import copyrightIconGreen from "../../assets/svg/icons/copyright-green.svg";
import "../../assets/scss/assistant-form.scss";

import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit";
import ChampDate from "../page-assistant/champ-date";
import Page from "../page-assistant/page";

import * as roles from "../../assets/listes/role-uuids.json";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampTexte from "../page-assistant/champ-texte";
import InfoBulle from '../partage/InfoBulle';

import RightHolderOptions from "../page-assistant/right-holder-options";
import {
  addRightHolderIfMissing,
  getRightHolderIdsByRole,
  hasRoles,
  updateRole
} from "../page-assistant/right-holder-helpers";
import { SauvegardeAutomatiqueMedia } from "./SauvegardeAutomatique"

export default class PageCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songwriters: getRightHolderIdsByRole(
        roles.songwriter,
        props.values.rightHolders
      ),
      composers: getRightHolderIdsByRole(
        roles.composer,
        props.values.rightHolders
      ),
      publishers: getRightHolderIdsByRole(
        roles.publisher,
        props.values.rightHolders
      )
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.songwriters !== prevState.songwriters ||
      this.state.composers !== prevState.composers ||
      this.state.publishers !== prevState.publishers
    ) {
      const creationRightHolderIds = this.state.songwriters
        .concat(this.state.composers)
        .concat(this.state.publishers);

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

    const songwriterRoles = updateRole(
      roles.songwriter,
      this.state.songwriters,
      id,
      rightHolderRoles
    );
    const composerRoles = updateRole(
      roles.composer,
      this.state.composers,
      id,
      songwriterRoles
    );
    const newRoles = updateRole(
      roles.publisher,
      this.state.publishers,
      id,
      composerRoles
    );

    return Object.assign({}, rightHolder, { roles: newRoles });
  };

  rightHolderOptions() {
    return RightHolderOptions(this.props.rightHolders);
  }

  icon() {
    return this.props.pochette ? copyrightIconOrange : copyrightIconGreen;
  }

  render() {
    return (
      <Translation>
        {t => (
          <Page pochette={this.props.pochette}>
            <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={20000} />
            <Colonne>
              <Entete
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t("flot.documenter.entete.creation")}
                question={
                  t("flot.split.documente-ton-oeuvre.documenter.titre1") +
                  " " +
                  t('flot.split.partage.guillemets.guillemet1')
                  +
                  this.props.values.title
                  +
                  t('flot.split.partage.guillemets.guillemet2')
                  +
                  "?"
                }
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre1-description"
                )}
              />

              <ChampDate
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.date-creation"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.date-placeholder"
                )}
                value={this.props.values.creationDate}
                onChange={value =>
                  this.props.setFieldValue("creationDate", value)
                }
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.auteur")}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.auteur-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.auteur-placeholder"
                )}
                value={this.state.songwriters}
                onChange={ids => this.setState({ songwriters: ids })}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.compositeur"
                )}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.compositeur-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.compositeur-placeholder"
                )}
                value={this.state.composers}
                onChange={ids => this.setState({ composers: ids })}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.editeur")}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.editeur-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.editeur-placeholder"
                )}
                value={this.state.publishers}
                onChange={ids => this.setState({ publishers: ids })}
              />

              <ChampTexte
                label={t("flot.split.documente-ton-oeuvre.documenter.codeiswc")}
                info={t("flot.split.documente-ton-oeuvre.documenter.codeiswc-description")}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.codeiswc-placeholder"
                )}
                value={this.props.values.iswc}
                onChange={value => this.props.setFieldValue("iswc", value)}
              />
              <InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.codeiswc-description")} />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}
