/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react";
import { Translation } from "react-i18next";

import starIconOrange from "../../assets/svg/icons/star-orange.svg";
import starIconGreen from "../../assets/svg/icons/star-green.svg";

import "../../assets/scss/assistant-form.scss";
import { ChampSelectionInterprete } from "../page-assistant/champ-selection-interprete";
import Page from "../page-assistant/page";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";

import * as roles from "../../assets/listes/role-uuids.json";
import { getRightHoldersByAnyRole } from "../page-assistant/right-holder-helpers";
import {SauvegardeAutomatiqueMedia} from "./SauvegardeAutomatique";

export default class PageInterpretation extends Component {
  musicianRoles = [roles.musician, roles.principal, roles.accompaniment];

  musicians() {
    return getRightHoldersByAnyRole(
      this.musicianRoles,
      this.props.values.rightHolders
    );
  }

  handleChange(newRightHolders) {
    this.props.setFieldValue("rightHolders", newRightHolders);
  }

  icon() {
    return this.props.pochette ? starIconOrange : starIconGreen;
  }

  render() {
    return (
      <Translation>
        {t => (
          <Page pochette={this.props.pochette}>
            <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={10000} />
            <Colonne>
              <Entete
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.interpretation"
                )}
                question={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre2"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre2-description"
                )}
              />

              <ChampSelectionInterprete
                pochette={this.props.pochette}
                rightHolders={this.props.rightHolders}
                musicians={this.musicians()}
                values={this.props.values}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre2-placeholder"
                )}
                onChange={newRightHolders => this.handleChange(newRightHolders)}
              />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}
