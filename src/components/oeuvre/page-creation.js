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

import "../formulaires.css";

import RightHolderOptions from "../page-assistant/right-holder-options";
import {
  addRightHolderIfMissing,
  getRightHolderIdsByRole,
  hasRoles,
  updateRole
} from "../page-assistant/right-holder-helpers";
import { SauvegardeAutomatiqueMedia } from "./SauvegardeAutomatique"
import Axios from "axios";

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
      ),
      x: 0, y: 0
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

  idsSiUUID(ids) {
    // Protéger la liste des valeurs non-uuid
    let _ids = []
    const UUID_REGEXP = new RegExp("[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}")
    if(ids) {
        ids.forEach(id=>{
            if(UUID_REGEXP.test(id)) {
                _ids.push(id)
            }
        })
        return _ids        
    }
  }

  render() {
    const { x, y } = this.state;

    return (
      <Translation>
        {t => (
          <Page pochette={this.props.pochette}>
            <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={10000} />
            <Colonne>
              <Entete
                className="sousTitre"
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t("flot.documenter.entete.creation")}
                question={t("flot.split.documente-ton-oeuvre.documenter.titre1",
                  { titre: this.props.values.title })}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre1-description"
                )}
              />

              <ChampDate
                className="nouvelleDate"
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
              <br />
              <ChampSelectionMultipleAyantDroit
                label={t("flot.split.documente-ton-oeuvre.documenter.auteur")}
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.auteur-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.auteur-placeholder"
                )}
                value={this.state.songwriters}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({songwriters: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.songwriter)                  
                }}
              />
              <br />
              <ChampSelectionMultipleAyantDroit
                label={t("flot.split.documente-ton-oeuvre.documenter.compositeur")}
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.compositeur-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.compositeur-placeholder"
                )}
                value={this.state.composers}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({composers: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.composer)                  
                }}
              />
              <br />
              <ChampSelectionMultipleAyantDroit
                label={t("flot.split.documente-ton-oeuvre.documenter.editeur")}
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.editeur-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.editeur-placeholder"
                )}
                value={this.state.publishers}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({publishers: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.publisher)                  
                }}
              />
              <br />
              <ChampTexte
                label={t("flot.split.documente-ton-oeuvre.documenter.codeiswc")}
                className="codeiswc"
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.codeiswc-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.codeiswc-placeholder"
                )}
                value={this.props.values.iswc}
                onChange={value => this.props.setFieldValue("iswc", value)}
              />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}
