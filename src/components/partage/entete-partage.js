/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react";
import { Translation } from "react-i18next";
import { Progress } from "semantic-ui-react";

import MenuProfil from "../entete/menu-profil";

class EntetePartage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: this.props.media,
      user: this.props.user
    };
  }

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
