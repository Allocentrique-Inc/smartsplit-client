/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component, Fragment } from "react";
import { Translation } from "react-i18next";

import { Input, Label } from "semantic-ui-react";

import axios from "axios";
import { toast } from "react-toastify";

const divEmail = {
  position: "relative",
  display: "block",
  margin: "0 50px 0 30px",
  background: "transparent"
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
        .get(`http://api.smartsplit.org:8080/v1/rightholders/${rhId}`)
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

  click() {
    this.handleSubmit();
    this.close();
  }

  close() {
    this.props.close();
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
      .post("http://api.smartsplit.org:8080/v1/proposal/invite", body)
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

  render() {
    // Construction de la liste à afficher
    let ayantDroits = [];
    Object.keys(this.state.ayantDroits).forEach(elem => {
      let _aD = this.state.ayantDroits[elem];

      ayantDroits.push(
        <div key={`champ--courriel__${elem}`}>
          <Label style={divEmail} htmlFor={`champ--courriel__${elem}`}>
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
      <Translation>
        {t => (
          <div>
            {ayantDroits}
            <br></br>
            <div
              onClick={() => {
                this.click();
              }}
              className={`ui medium button envoie`}
              style={{ position: "relative", left: "365px" }}
            >
              {t("flot.split.documente-ton-oeuvre.proposition.envoyer")}
            </div>
          </div>
        )}
      </Translation>
    );
  }
}

export default PageAssistantSplitCourrielsCollaborateurs;
