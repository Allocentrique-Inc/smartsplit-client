/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react";
import { Translation } from "react-i18next";

import MenuProfil from "../entete/menu-profil";

class EntetePartage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: this.props.media,
      user: this.props.user
    };
  }

  render() {
    return (
      <Translation>
        {t => (
          <div className="ui row">
            <div className="ui sixteen wide column">
              <i className="file image outline icon huge grey"></i>
              {this.state.media && (
                <span style={{ marginLeft: "15px" }} className="medium-400">
                  {this.state.media.title}
                </span>
              )}
              <span className="heading4" style={{ marginLeft: "50px" }}>
                {t("flot.split.documente-ton-oeuvre.etape.partage-titre")}
              </span>
              <span
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "200px"
                }}
                className="entete--partage"
              >
                <MenuProfil
                  onRef={menu => {
                    this.setState({ menu: menu });
                  }}
                  user={this.state.user}
                />
              </span>
            </div>
          </div>
        )}
      </Translation>
    );
  }
}

export default EntetePartage;
