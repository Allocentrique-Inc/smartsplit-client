import React, { Component } from "react";
import { Translation } from "react-i18next";
import moment from "moment";
import axios from "axios";
import { Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import ModalPropositionEnCours from "../modales/modale-proposition-encours";

export default class LigneMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pochette: props.pochette,
      media: props.media,
      user: props.user,
      rightHolders: props.rightHolders
    }
    this.modalePropositionEnCours = this.modalePropositionEnCours.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.rightHolders !== nextProps.rightHolders) {
      this.setState({rightHolders: nextProps.rightHolders})
    }
  }

  componentWillMount() {
    // Récupération de la dernière proposition du média
    axios
      .get(
        `http://dev.api.smartsplit.org:8080/v1/proposal/media/${this.state.media.mediaId}`
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

  modalePropositionEnCours(ouvrir = true) {
    this.setState({modalePropositionEnCours: ouvrir})
  }

  render() {

    let pochette = this.state.pochette ? "pochette" : ""

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
                    if(!pochette) {
                      window.location.href = `/oeuvre/sommaire/${elem.mediaId}`;
                    } else {
                      window.location.href = `/documenter/${elem.mediaId}`;
                    }
                  }}
                >
                  <i className="file image outline icon big grey"></i>
                </div>
                <div
                  className="ui seven wide column cliquable"
                  onClick={() => {
                    if(!pochette) {
                      window.location.href = `/oeuvre/sommaire/${elem.mediaId}`;
                    } else {
                      window.location.href = `/documenter/${elem.mediaId}`;
                    }
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
                    className={`small-500-color ${pochette}`}
                    style={{ display: "inline-block" }}
                  >{`${elem.artist}`}</div>
                  <br />
                  <div
                    className={`small-400-color`}
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
                  {!pochette && !continuerDisabled && (
                    <div
                      className={`ui medium button ${pochette}`}
                      onClick={() => {
                        window.location.href = `/partager/existant/${_p.uuid}`;
                      }}
                    >
                      {t(
                        "flot.split.documente-ton-oeuvre.proposition.continuer"
                      )}
                    </div>
                  )}
                  {!pochette && !nouveauDisabled && (
                    <div
                      className={`ui medium button ${pochette}`}
                      onClick={() => {
                        // Détecter si la proposition est verrouillée
                        if(
                          this.state.media &&
                          this.state.media.initiateurPropositionEnCours &&
                          (!this.state.media.initiateurPropositionEnCours.trim() || this.state.media.initiateurPropositionEnCours === this.state.user.username)) {
                          // Verrouiller la proposition
                          axios.put(`http://dev.api.smartsplit.org:8080/v1/media/proposal/${this.state.media.mediaId}`,{rightHolderId: this.state.user.username})
                          .then(res=>{
                              window.location.href = `/partager/nouveau/${this.state.media.mediaId}`;
                          })
                          .catch(err=>{
                              console.log(err)
                          })
                        } else {
                          this.modalePropositionEnCours()
                        }                        
                      }}
                    >
                      {t(
                        "flot.split.documente-ton-oeuvre.proposition.nouvelle"
                      )}
                    </div>
                  )}
                  {!pochette && !sommaireDisabled && (
                    <div
                      className={`ui medium button ${pochette}`}
                      onClick={() => {
                        window.location.href = `/partager/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.sommaire.titre")}
                    </div>
                  )}
                  {!pochette && !votationDisabled && (
                    <div
                      className={`ui medium button ${pochette}`}
                      onClick={() => {
                        window.location.href = `/partager/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.documente-ton-oeuvre.proposition.voter")}
                    </div>
                  )}
                  {pochette && (
                    <div
                      className={`ui medium button ${pochette}`}
                      onClick={() => {
                        window.location.href = `/documenter/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.documente-ton-oeuvre.titre")}
                    </div>
                  )}
                  {!pochette && _p && <Label>{t(`flot.split.etat.${_p.etat}`)}</Label>}
                  {
                    this.state.media.initiateurPropositionEnCours &&
                    this.state.rightHolders[this.state.media.initiateurPropositionEnCours] &&
                    <ModalPropositionEnCours
                      open={this.state.modalePropositionEnCours} 
                      titre={this.state.media.title} 
                      initiateur={this.state.rightHolders[this.state.media.initiateurPropositionEnCours].name}
                      onClose={()=>{this.modalePropositionEnCours(false)}} />
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </Translation>
    );
  }
}
