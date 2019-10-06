import React, { Component } from "react";
import { withTranslation, Translation, Trans } from "react-i18next";

import axios from "axios";

import { toast } from "react-toastify";
import { Dropdown, Label } from "semantic-ui-react";

import i18n from "i18next";
import moment from "moment";

// Authentification avec AWS
import { Auth } from "aws-amplify";
import Socan from "../auth/Socan";

class MenuProfil extends Component {
  constructor(props) {
    super(props);
    if (props.onRef) {
      // Permet de tenir une référence à la fonction de déconnexion dans l'en-tête qui inclut
      props.onRef(this);
    }
    this.state = {
      auth: props.user,
      angle: "down",
      initials: "",
      user: undefined
    };
    this.deconnexion = this.deconnexion.bind(this);
    this.ouvrirSocan = this.ouvrirSocan.bind(this);
  }

  componentWillMount() {
    axios
      .get(
        "http://api.smartsplit.org:8080/v1/rightHolders/" +
          this.state.auth.username
      )
      .then(res => {
        this.setState({ user: res.data.Item });
        this.setState({
          initials:
            res.data.Item.firstName.charAt(0) + res.data.Item.lastName.charAt(0)
        });
      })
      .catch(err => {
        toast.error(err.message);
      });
  }

  deconnexion() {
    Auth.signOut()
      .then(data => {
        toast.success(this.props.t("deconnexion.reussie"));
        setTimeout(() => {
          window.location.href = "/accueil";
        }, 1000);
      })
      .catch(error => toast.error("Erreur..."));
  }

  ouvrirSocan(val = true) {
    this.setState({ modaleSocan: val });
  }

  render() {
    let avatarImage;
    let userInitials;
    let nomComplet;

    if (this.state.user) {
      //avatarLink = this.state.user.avatarS3Etag // avatarS3Etag taken as full url instead of Etag
      avatarImage =
        this.state.user.avatarImage === null
          ? "https://www.imsa-search.com/wp-content/uploads/2018/06/avatar.png"
          : `https://smartsplit-images.s3.us-east-2.amazonaws.com/${this.state.user.avatarImage}`;
      userInitials =
        this.state.user.avatarImage === null ? this.state.initials : null;
      nomComplet = this.state.user.artistName
        ? this.state.user.artistName
        : `${this.state.user.firstName} ${this.state.user.lastName}`;
    }

    let menu = (
      <Translation>
        {t => (
          <span
            style={{
              position: "absolute",              
              zIndex: "1"
            }}
          >
            <Dropdown text="" icon="angle down big black">
              <Dropdown.Menu icon="down small">
                <Dropdown.Item
                  text={t("menuprofil.accueil")}
                  onClick={() => {
                    window.location.href = "/accueil";
                  }}
                />
                <Dropdown.Item
                  text={t("menuprofil.profil")}
                  onClick={() => {
                    this.ouvrirSocan();
                  }}
                />
                {i18n.language && i18n.language.substring(0, 2) == "en" && (
                  <Dropdown.Item
                    text={t("menuprofil.francais")}
                    onClick={() => {
                      i18n.init({ lng: "fr" });
                    }}
                  />
                )}
                {i18n.language && i18n.language.substring(0, 2) == "fr" && (
                  <Dropdown.Item
                    text={t("menuprofil.anglais")}
                    onClick={() => {
                      i18n.init({ lng: "en" });
                    }}
                  />
                )}
                <Dropdown.Divider />
                <Dropdown.Item
                  text={t("menuprofil.deconnexion")}
                  onClick={() => {
                    this.deconnexion();
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
            <Socan
              open={this.state.modaleSocan}
              onClose={() => {
                this.ouvrirSocan(false);
              }}
            />
          </span>
        )}
      </Translation>
    );

    return (
      <Translation>
        {t => (
          <>
            <div
              className="ui five wide column avatar--image profile"
              style={{
                position: "relative",
                top: "30px",
                right: "125px",
                zIndex: "1"
              }}
            ></div>
            <Label
              style={{
                background: "transparent",
                width: "150px",
                position: "relative",
                top: "5px",
                bottom: "10px"
              }}
            >
              {nomComplet}
            </Label>
            {!userInitials && (
              <img src={avatarImage} alt="user--image" className="user--img" />
            )}
            {menu}
          </>
        )}
      </Translation>
    );
  }
}

export default withTranslation()(MenuProfil);
