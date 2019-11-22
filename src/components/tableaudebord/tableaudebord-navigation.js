import React, { Component } from "react";
import { Translation } from "react-i18next";

import "../../assets/scss/tableaudebord/tableaudebord.scss";
import "../../assets/scss/page-assistant/bouton.scss";

import {
  LogoPochette,
  LogoSmartsplit,
  MenuCollaborateurSVG,
  MenuMusiqueSVG,
  MenuProfilSVG
} from "../svg/SVG";

const PIECES = 0,
  PROFIL = 1,
  COLLABORATEURS = 2;

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pochette: props.pochette,
      selection: PIECES
    };
  }

  naviguer(choix) {
    switch (choix) {
      case PIECES:
        this.props.parent.setState({ navigation: PIECES });
        this.setState({ selection: PIECES });
        break;
      case PROFIL:
        this.props.parent.setState({ navigation: PROFIL });
        this.setState({ selection: PROFIL });
        break;
      case COLLABORATEURS:
        this.props.parent.setState({ navigation: COLLABORATEURS });
        this.setState({ selection: COLLABORATEURS });
        break;
      default:
    }
  }

  genererLien(choix, t, couleur) {
    let image;
    switch (choix) {
      case PIECES:
        image = <MenuMusiqueSVG couleur={couleur} />;
        break;
      case COLLABORATEURS:
        image = <MenuCollaborateurSVG couleur={couleur} />;
        break;
      case PROFIL:
        image = <MenuProfilSVG couleur={couleur} />;
        break;
      default:
    }

    return (
      <div
        className="cliquable menu"
        onClick={() => {
          this.naviguer(choix);
        }}
      >
        <i
          className={`navigation ${
            this.state.selection === choix
              ? this.state.pochette
                ? "pochette"
                : ""
              : "grismauve"
          }`}
        >
          {image}
        </i>
        <span
          className={`${
            this.state.selection === choix
              ? "tdb--lien__actif"
              : `tdb--lien__inactif`
          }`}
          style={{ marginLeft: "20px" }}
        >
          {t("flot.split.tableaudebord.navigation." + choix)}
        </span>
      </div>
    );
  }

  render() {
    let pochette = this.state.pochette ? "pochette" : "";
    let couleur = this.state.pochette ? "#F5752C" : "#2DA84F";
    return (
      <Translation>
        {t => (
          <div className="tdb--navigation">
            <div className="tdb--navigation__logo">
              {!pochette && <LogoSmartsplit />}
              {pochette && <LogoPochette />}
            </div>

            <div className="tdb--navigation__liens">
              <div className="ui row">
                {this.genererLien(
                  PIECES,
                  t,
                  this.state.selection === PIECES ? couleur : "#8DA0B3"
                )}
              </div>
              {!pochette && (
                <>
                  <div className="ui row espace-15">
                    {this.genererLien(
                      PROFIL,
                      t,
                      this.state.selection === PROFIL ? couleur : "#8DA0B3"
                    )}
                  </div>
                  <div className="ui row espace-15">
                    {this.genererLien(
                      COLLABORATEURS,
                      t,
                      this.state.selection === COLLABORATEURS
                        ? couleur
                        : "#8DA0B3"
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Translation>
    );
  }
}
