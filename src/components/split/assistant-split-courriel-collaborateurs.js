/**
 * Saisie du collaborateur principal de l'oeuvre
 */
import { Header, Modal, Button } from "semantic-ui-react";

import React, { Component, Fragment } from "react";
import { Translation } from "react-i18next";

import { Input, Label } from "semantic-ui-react";

import axios from "axios";
import { toast } from "react-toastify";

import closeIcon from "../../assets/svg/icons/x.svg";

const divEmail = {
  position: "relative",
  display: "block",
  margin: "0 50px 0 30px"
};

class PageAssistantSplitCourrielsCollaborateurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ayantDroits: props.ayantDroits,
      propositionId: props.propositionId
    };
    this._courrielsModifies = [];
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    let _aDs = this.state.ayantDroits;
    let cpt = 0,
      taille = Object.keys(this.props.ayantDroits).length,
      aTous = false;
    Object.keys(this.props.ayantDroits).forEach(rhId => {
      axios
        .get(`http://dev.api.smartsplit.org:8080/v1/rightholders/${rhId}`)
        .then(res => {
          let _aD = res.data.Item;
          if (_aD) {
            let _nom =
              _aD.artistName !== ""
                ? _aD.artistName
                : `${_aD.firstName} ${_aD.lastName}`;
            _aDs[rhId] = {
              name: _nom,
              rightHolderId: _aD.rightHolderId,
              email: _aD.email
            };
            cpt = cpt + 1;
            if (cpt >= taille) {
              this.setState({ ayantDroits: _aDs });
            }
          }
        });
    });
  }

  handleSubmit() {
    // Construire la structure des ayant-droits avec les courriels modifiés, au besoin
    let _aDs = {};

    Object.keys(this.state.ayantDroits).forEach(elem => {
      let _aD = this.state.ayantDroits[elem];
      let __aD = {};
      if (this._courrielsModifies[elem]) {
        __aD.email = this._courrielsModifies[elem];
      } else {
        __aD.email = _aD.email;
      }
      __aD.name = _aD.name;
      __aD.rightHolderId = _aD.rightHolderId;
      _aDs[_aD.rightHolderId] = __aD;
    });

    let body = {
      proposalId: this.state.propositionId,
      rightHolders: _aDs
    };

    axios
      .post("http://dev.api.smartsplit.org:8080/v1/proposal/invite", body)
      .then(resp => {
        this.props.close(() => {
          window.location.reload();
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChange(e) {
    this._courrielsModifies[e.target.id] = e.target.value;
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {

    // Construction de la liste à afficher
    let ayantDroits = [];
    Object.keys(this.state.ayantDroits).forEach(elem => {
      let _aD = this.state.ayantDroits[elem];

      ayantDroits.push(
        <div key={`champ--courriel__${elem}`}>
          <Label style={divEmail} htmlFor={`champ--courriel__${elem}`}
            style={{
              fontSize: "16px",
              background: "transparent",
              margin: "10px 0 0 20px"
            }}>
            {_aD.name}
          </Label>
          <Translation>
            {t => (
              <Input
                style={divEmail}
                name={`champ--courriel__${elem}`}
                id={_aD.rightHolderId}
                defaultValue={_aD.email}
                placeholder={t("flot.split.inscription.exemple")}
                required={this.state.requis}
                autoFocus={this.state.autoFocus}
                type="email"
                onChange={this.onChange}
              />
            )}
          </Translation>
        </div>
      );
    });

    return (
      /*<Modal
        open={this.state.open}
        onClose={this.handleClose}
        size="small"
        closeIcon
      >*/
      <Translation>
        {t => (

          <div style={{
            fontFamily: "IBM Plex Sans",
            fontSize: "16px",
            marginLeft: "10px"
          }}>
            <div style={{ margin: "10px 50px 10px 30px" }}>
              <Modal.Header>
                <strong>{t("flot.split.documente-ton-oeuvre.proposition.titre")}</strong>
                <a className="close-icon"
                  onClick={() => { this.handleClose() }}
                  style={{
                    right: "40px",
                    position: "absolute"
                  }}
                >
                  <img src={closeIcon} alt={"close"} />
                </a>
              </Modal.Header>
              <br />
              <Modal.Content style={{ color: "#687A8B" }}>
                {t("flot.split.documente-ton-oeuvre.proposition.sous-titre")}
              </Modal.Content>
            </div>
            {ayantDroits}
            <div style={{ display: "flex" }}>
              <Button
                onClick={this.handleClose}
                style={{
                  margin: "20px 0px 0px 140px",
                  height: "10%"
                }}>
                {t("flot.split.collaborateur.attribut.bouton.annuler")}
              </Button>
              <div
                onClick={this.handleClose}
                className={`ui medium button envoie`}
                style={{
                  width: "45%",
                  margin: "20px 50px 20px 0px",
                  marginLeft: "auto"
                }}
              >
                {t("flot.split.documente-ton-oeuvre.proposition.envoyer")}
              </div>
            </div>
          </div>

        )}
      </Translation>
      /*</Modal>*/
    );
  }
}

export default PageAssistantSplitCourrielsCollaborateurs;
