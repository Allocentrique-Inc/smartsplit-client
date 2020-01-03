import React, { Component } from "react";
import { Translation } from "react-i18next";
import moment from "moment";
import axios from "axios";
import ModalPropositionEnCours from "../modales/modale-proposition-encours";
import placeholder from '../../assets/images/placeholder.png';
import "../../assets/scss/tableaudebord/tableaudebord.scss";

export default class LigneMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pochette: props.pochette,
      media: props.media,
      user: props.user,
      rightHolders: props.rightHolders
    };
    this.modalePropositionEnCours = this.modalePropositionEnCours.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rightHolders !== nextProps.rightHolders) {
      this.setState({ rightHolders: nextProps.rightHolders });
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
    this.setState({ modalePropositionEnCours: ouvrir });
  }

  render() {
    let pochette = this.state.pochette ? "pochette" : "";

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

    let imageSrc = placeholder
    if(elem.files && elem.files.cover && elem.files.cover.files.length > 0) {
      elem.files.cover.files.forEach(e=>{
          if(e.access === 'public') {
            imageSrc = `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${elem.mediaId}/cover/${e.file}`
          }
      })
    }

    return (
      <Translation>
        {(t, i18n) => (
          <div className="hautColonne">
            <div className="ui grid">
              <div className="ui row">
                <div
                  className="ui one wide column cliquable"
                  onClick={() => {
                    if (!pochette) {
                      window.location.href = `/oeuvre/sommaire/${elem.mediaId}`;
                    } else {
                      window.location.href = `/documenter/${elem.mediaId}`;
                    }
                  }}
                >
                  <img className={ 'song-image' } style={{width: "40px", height: "40PX", right: "0px", position: "absolute"}} src={ imageSrc } alt={ this.props.media.title } />
                </div>
                <div
                  className="ui seven wide column cliquable"
                  onClick={() => {
                    if (!pochette) {
                      window.location.href = `/oeuvre/sommaire/${elem.mediaId}`;
                    } else {
                      window.location.href = `/documenter/${elem.mediaId}`;
                    }
                  }}
                >
                  <div className="song-name">{`${elem.title}`}</div>
                  <div className="small-400">
                    &nbsp;&nbsp;{t("flot.split.tableaudebord.pieces.par")}&nbsp;
                  </div>

                  <div
                    className={`small-500-color ${pochette}`}
                  >{`${elem.artist}`}</div>
                  <br />
                  <div className={`small-400-color`}>
                    {i18n.lng &&
                      moment(elem.creationDate)
                        .locale(i18n.lng.substring(0, 2))
                        .fromNow()}{" "}
                    &bull; {t("flot.split.tableaudebord.pieces.partageAvec")}
                  </div>
                </div>
                <div className="ui six wide column etat">
                  <div>
                    {!pochette && _p && (
                      <div class="ui huge label etat">
                        {t(`flot.split.etat.${_p.etat}`)}
                      </div>
                    )}
                  </div>

                  {!pochette && !continuerDisabled && (
                    <div
                      className={`ui medium button options ${pochette}`}
                      onClick={() => {
                        window.location.href = `/partager/existant/${_p.uuid}`;
                      }}
                    >
                      {t(
                        "flot.split.documente-ton-oeuvre.proposition.continuer"
                      )}
                    </div>
                  )}
                  <div className="two wide column" />
                  <div className="ui six wide column etat">
                    {!pochette && !nouveauDisabled && (
                      <div
                        className={`ui medium button options ${pochette}`}
                        onClick={() => {
                          // Détecter si la proposition est verrouillée
                          if (
                            this.state.media &&
                            ((this.state.media.initiateurPropositionEnCours &&
                              this.state.media.initiateurPropositionEnCours.trim() ===
                                "") ||
                              !this.state.media.initiateurPropositionEnCours ||
                              this.state.media.initiateurPropositionEnCours.trim() ===
                                this.state.user.username)
                          ) {
                            // Verrouiller la proposition
                            axios
                              .put(
                                `http://dev.api.smartsplit.org:8080/v1/media/proposal/${this.state.media.mediaId}`,
                                { rightHolderId: this.state.user.username }
                              )
                              .then(res => {
                                window.location.href = `/partager/nouveau/${this.state.media.mediaId}`;
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          } else {
                            this.modalePropositionEnCours();
                          }
                        }}
                      >
                        {t(
                          "flot.split.documente-ton-oeuvre.proposition.nouvelle"
                        )}
                      </div>
                    )}
                  </div>
                  {!pochette && !sommaireDisabled && (
                    <div
                      className={`ui medium button options ${pochette}`}
                      onClick={() => {
                        window.location.href = `/partager/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.sommaire.titre")}
                    </div>
                  )}
                  {!pochette && !votationDisabled && (
                    <div
                      className={`ui medium button options ${pochette}`}
                      onClick={() => {
                        window.location.href = `/partager/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.documente-ton-oeuvre.proposition.voter")}
                    </div>
                  )}

                  {pochette && (
                    <div
                      className={`ui medium button options ${pochette}`}
                      onClick={() => {
                        window.location.href = `/documenter/${this.state.media.mediaId}`;
                      }}
                    >
                      {t("flot.split.documente-ton-oeuvre.titre")}
                    </div>
                  )}
                  {this.state.media.initiateurPropositionEnCours && this.state.rightHolders &&
                    this.state.rightHolders[
                      this.state.media.initiateurPropositionEnCours
                    ] && (
                      <ModalPropositionEnCours
                        open={this.state.modalePropositionEnCours}
                        titre={this.state.media.title}
                        initiateur={
                          this.state.rightHolders[
                            this.state.media.initiateurPropositionEnCours
                          ].name
                        }
                        onClose={() => {
                          this.modalePropositionEnCours(false);
                        }}
                      />
                    )}                  
                </div>
              </div>
            </div>
          </div>
        )}
      </Translation>
    );
  }
}
