import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import axios from "axios"
import LigneMedia from "./tableaudebord-ligne-media"
import { Modal } from "semantic-ui-react"
import NouvelleOeuvre from "./tableaudebord-nouvelle-oeuvre"
import AudioLecture from "../oeuvre/audio-lecture"
import Yeux from "../../assets/images/yeux.png"
import { AyantsDroit, Identite, config, journal } from '../../utils/application'

const PANNEAU_INITIATEUR = 1,
      PANNEAU_COLLABORATEUR = 0;
const NOM = "ListePieces"

class ListePieces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pochette: props.pochette,
      medias: [],
      collabMedias: [],
      creatorMedias: [],
      panneau: PANNEAU_INITIATEUR,
      collecte: {
        medias: false,
        collab: false
      },
      user: props.user
    };
    this.modaleNouvelleOeuvre = this.modaleNouvelleOeuvre.bind(this);
  }

  afficherPanneauInitiateur() {
    this.setState({ panneau: PANNEAU_INITIATEUR });
  }

  afficherPanneauCollaborateur() {
    this.setState({ panneau: PANNEAU_COLLABORATEUR });
  }

  collecte(obj) {
    let collecte = this.state.collecte;
    if (obj.medias) {
      collecte.medias = true;
    }
    if (obj.collab) {
      collecte.collab = true;
    }
    this.setState({ collecte: collecte }, () => {
      let _collecte = this.state.collecte;
      if (_collecte.medias && _collecte.collab) {
        this.setState({ patience: false });
      }
    });
  }

  componentWillMount() {
    try {
      this.setState({
        collecte: {
          medias: false,
          collabs: false
        }
      });
      this.setState({ patience: true }, () => {
        if(Identite.usager) {
          this.setState({ rightHolders: AyantsDroit.ayantsDroit }, ()=>{
            axios.get(`${config.API_URL}media/liste-createur/${Identite.usager.username}`)
            .then(res => {
              // Associe la liste des médias créés ou les médias pour lesquels une proposition est créée,
              // dans les deux cas, par l'usager.
              let data = res.data
              data.reverse()
              this.setState({ creatorMedias: data }, ()=>this.setState({ patience: false }))
            })
            .catch(err => journal.error(NOM, err))            
            axios.get(`${config.API_URL}media/liste-collaborations/${Identite.usager.username}`)
            .then(res => {
              // Associe la liste des médias créés ou les médias pour lesquels une proposition est créée,
              // dans les deux cas, par l'usager.
              let data = res.data
              this.setState({ collabMedias: data }, ()=>this.setState({ patience: false }))
            })
            .catch(err => console.log(err))
          })
        }                
      })
    } catch (err) {
      console.log(err)
    }
  }

  modaleNouvelleOeuvre(ouvert = true) {
    this.setState({ modaleOeuvre: ouvert })
  }

  render() {
    
    const t = this.props.t
    
    let pochette = this.state.pochette ? "pochette" : "";
    let rendu
    let that = this;

    function aucuneOeuvre(collaborations = false) {
      return (        
        <div style={{ marginTop: "20px" }} className="ui sixteen column grid">
          <br />
          <br />
          <br />
          <div style={{ width: "100%", textAlign: "center" }}>
            <div>
              <img
                style={{ fontSize: "3rem" }}
                aria-label=""
                className={"yeux"}
                src={Yeux}
                alt={"Yeux"}
              />

              <br />
              <div className="medium-500-nomargin">
                {collaborations && t("flot.split.tableaudebord.vide.preambule-collaborations")}
                {!collaborations && t("flot.split.tableaudebord.vide.preambule")}
              </div>
              <div
                className="medium-500-nomargin"
                style={{ fontWeight: "100" }}
              >
                {!collaborations &&                   
                  (
                    <>
                      {t("flot.split.tableaudebord.vide.indication")} <br />
                      <div
                        className="cliquable"
                        style={{ color: "#0645AD" }}
                        onClick={e => {
                          //Cliquable = pointeur lien, classe écrite Vincent
                          that.modaleNouvelleOeuvre();
                        }}
                      >
                        {t("flot.split.tableaudebord.vide.indication-lien")}
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>          
      )
    }

    let souligneInitiateur, souligneCollaborateur;
    souligneInitiateur = this.state.panneau === PANNEAU_INITIATEUR;
    souligneCollaborateur = this.state.panneau === PANNEAU_COLLABORATEUR;

    let optionsAffichage = !this.state.pochette && (      
      <div style={{display: "inline"}}>
        <div style={{paddingBottom: "20px", display: "inline"}} className={`small-500${
              souligneInitiateur ? "-color souligne" : " secondaire"
            } ${souligneInitiateur && pochette ? "pochette" : ""}`}>
          <span
            className={`cliquable`}
            onClick={() => {
              this.afficherPanneauInitiateur()
            }}
            style={{ fontSize: "16px", color: souligneInitiateur ? "black" : "" }}
          >
            {t("flot.split.tableaudebord.pieces.0")}
          </span>
        </div>
        <div style={{paddingBottom: "20px", marginLeft: "40px", display: "inline"}} className={`small-500${
              souligneCollaborateur ? "-color souligne" : " secondaire"
            } ${souligneCollaborateur && pochette ? "pochette" : ""}`}>
          <span
            className={`cliquable`}
            onClick={() => {
              this.afficherPanneauCollaborateur()
            }}
            style={{ fontSize: "16px", color: souligneCollaborateur ? "black" : "" }}
          >
            {t("flot.split.tableaudebord.pieces.1")}
          </span>
        </div>
      </div>        
    )

    if (
      (!this.state.patience &&
        this.state.medias.length + this.state.creatorMedias.length === 0 &&
        this.state.panneau === PANNEAU_INITIATEUR) ||
      (!this.state.patience &&
        this.state.collabMedias.length === 0 &&
        this.state.panneau === PANNEAU_COLLABORATEUR)
    ) {
      // If no initiator musical pieces present for user
      rendu = aucuneOeuvre(this.state.panneau === PANNEAU_COLLABORATEUR);
    } else {
      let tableauMedias = [];
      let _medias = {};
      if (
        this.state.medias.length + this.state.creatorMedias.length > 0 &&
        this.state.panneau === PANNEAU_INITIATEUR
      ) {
        tableauMedias = this.state.medias.map((elem, _idx) => {
          _medias[elem.mediaId] = elem;
          return (
            <LigneMedia
              pochette={this.state.pochette}
              key={elem.mediaId}
              media={elem}
              user={this.state.user}
              rightHolders={this.state.rightHolders}
            />
          );
        });
        tableauMedias = tableauMedias.concat(
          this.state.creatorMedias.map((elem, _idx) => {
            if (elem && elem.mediaId && !_medias[elem.mediaId]) {
              return (
                <LigneMedia
                  pochette={this.state.pochette}
                  key={`${elem.mediaId}_${_idx}`}
                  media={elem}
                  user={this.state.user}
                  rightHolders={this.state.rightHolders}
                />
              );
            } else {
              return null;
            }
          })          
        )        
      }
      if (
        this.state.collabMedias.length > 0 &&
        this.state.panneau === PANNEAU_COLLABORATEUR
      ) {
        tableauMedias = this.state.collabMedias.map((elem, _idx) => {
          return (
            elem !== undefined && (
              <LigneMedia
                pochette={this.state.pochette}
                key={`${elem.mediaId}_${elem._idx}`}
                media={elem}
                user={this.state.user}
                rightHolders={this.state.rightHolders}
              />
            )
          )
        })
      }
      rendu = <div style={{paddingLeft: "40px"}}>{tableauMedias}</div>;
    }

    return (
      <div>
        {!this.state.patience && (
          <div>
            <div className="ui grid">
              <div className="ui row">
                <div className="heading2 fifteen wide column" style={{paddingLeft: "0rem", marginRight: "60px"}}>
                  {t("flot.split.tableaudebord.navigation.0")}
                  <div
                    className={`ui three wide column medium button ${pochette}`}
                    onClick={() => {
                      this.modaleNouvelleOeuvre();
                    }}
                    style={{
                      float: "right"
                    }}
                  >
                    {t("flot.split.tableaudebord.pieces.ajouter")}
                  </div>
                </div>
              </div>
              <div className="ui row">
                <div className="fifteen wide column">
                  <div className="medium-500" style={{marginLeft: "25px", borderBottom: "0.5px solid lightgrey", paddingBottom: "20px", marginBottom: "50px"}}>{optionsAffichage}</div>
                  {rendu}
                </div>
              </div>
            </div>
            <Modal
              open={this.state.modaleOeuvre}
              onClose={() => {
                this.modaleNouvelleOeuvre(false);
                if (this.state.audio) this.state.audio.stop();
              }}
              size="large"
              closeIcon
              closeOnDimmerClick={false}
            >
              <Modal.Header>{t("flot.split.titre.creer")}</Modal.Header>
              <Modal.Content>
                <NouvelleOeuvre
                  pochette={this.state.pochette}
                  audio={this.state.audio}
                  parent={this}
                  user={this.state.user}
                />
              </Modal.Content>
              <Modal.Actions>
                <>
                  {this.state.mediaId && (
                    <AudioLecture
                      styleBouton={{width: "50px"}}
                      onRef={audio => {
                        this.setState({ audio: audio });
                      }}
                    />
                  )}
                </>
              </Modal.Actions>
            </Modal>
          </div>
        )}
        {this.state.patience && (
          <div className="ui active dimmer">
            <div className="ui text loader">{t("entete.encours")}</div>
          </div>
        )}
      </div>        
    )
  }
}
export default withTranslation()(ListePieces)