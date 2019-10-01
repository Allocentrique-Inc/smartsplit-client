import React, { Component } from "react";
import { Translation } from "react-i18next";
import moment from "moment";
import axios from "axios";
import { Label } from "semantic-ui-react";

export default class LigneMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: props.media,
      user: props.user
    };
  }

  componentWillMount() {
    // Récupération de la dernière proposition du média
    axios
      .get(
        `http://api.smartsplit.org:8080/v1/proposal/media/${this.state.media.mediaId}`
      )
      .then(res => {
        let _pS = res.data;
        let _p0;
        _pS.forEach(elem => {
          if (!_p0) {
            _p0 = elem;
          }
          if (_p0._d < elem._d) {
            _p0 = elem;
          }
        });
        this.setState({ p0: _p0 });
      });
  }

  render() {
    let elem = this.state.media;
    let _p = this.state.p0;

    let nouveauDisabled = false,
      continuerDisabled = true,
      sommaireDisabled = true,
      votationDisabled = true;

    if (_p && this.state.user) {
      if (_p.etat !== "REFUSE") {
        nouveauDisabled = true;
      }
      if (_p.etat === "PRET" || _p.etat === "ACCEPTE") {
        sommaireDisabled = false;
      }
      if (
        _p.etat === "BROUILLON" &&
        _p.initiator.id === this.state.user.username
      ) {
        continuerDisabled = false;
      }
      if (_p.etat === "VOTATION") {
        votationDisabled = false;
      }
    }

    return (
      <Translation>
        {(t, i18n) => (
          <div style={{ marginTop: "20px" }}>
            <div className="ui grid">
              <div className="ui row">
                <div
                  className="ui one wide column cliquable"
                  onClick={() => {
                    window.location.href = `/oeuvre/sommaire/${elem.mediaId}`;
                  }}
                >
                  <i className="file image outline icon big grey"></i>
                </div>
                <div
                  className="ui seven wide column cliquable"
                  onClick={() => {
                    window.location.href = `/oeuvre/sommaire/${elem.mediaId}`;
                  }}
                >
                  <div className="song-name">{`${elem.title}`}</div>
                  <div
                    className="small-400"
                    style={{ display: "inline-block" }}
                  >
                    &nbsp;&nbsp;{t("flot.split.tableaudebord.pieces.par")}&nbsp;
                  </div>
                  <div
                    className="small-500-color"
                    style={{ display: "inline-block" }}
                  >{`${elem.artist}`}</div>
                  <br />
                  <div
                    className="small-400-color"
                    style={{ display: "inline-block" }}
                  >
                    {i18n.lng &&
                      moment(elem.creationDate)
                        .locale(i18n.lng.substring(0, 2))
                        .fromNow()}{" "}
                    &bull; {t("flot.split.tableaudebord.pieces.partageAvec")}
                  </div>
                </div>
                <div className="ui six wide column">
                  {!continuerDisabled && (
                    <div
                      className={`ui medium button`}
                      onClick={() => {
                        window.location.href = `/partager/existant/${_p.uuid}`;
                      }}
                    >
                      {t(
                        "flot.split.documente-ton-oeuvre.proposition.continuer"
                      )}
                    </div>
                  )}
                  {!nouveauDisabled && (
                    <div
                      className={`ui medium button`}
                      onClick={() => {
                        window.location.href = `/partager/nouveau/${this.state.media.mediaId}`;
                      }}
                    >
                      {t(
                        "flot.split.documente-ton-oeuvre.proposition.nouvelle"
                      )}
                    </div>
                  )}
                  {!sommaireDisabled && (
                    <div
                      className={`ui medium button`}
                      onClick={() => {
                        window.location.href = `/partager/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.sommaire.titre")}
                    </div>
                  )}
                  {!votationDisabled && (
                    <div
                      className={`ui medium button`}
                      onClick={() => {
                        window.location.href = `/partager/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.documente-ton-oeuvre.proposition.voter")}
                    </div>
                  )}
                  {_p && <Label>{t(`flot.split.etat.${_p.etat}`)}</Label>}
                </div>
              </div>
            </div>
          </div>
        )}
      </Translation>
    );
  }
}
