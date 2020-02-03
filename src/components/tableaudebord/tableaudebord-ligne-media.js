import { AyantsDroit, utils, config } from '../../utils/application'
import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import moment from "moment"
import axios from "axios"
import ModalPropositionEnCours from "../modales/modale-proposition-encours"
import placeholder from '../../assets/images/placeholder.png'
import "../../assets/scss/tableaudebord/tableaudebord.scss"
import OptionsMedia from "./options-media"
import EtatMedia from './etat-media'

// eslint-disable-next-line
const NOM = "LigneMedia"

class LigneMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pochette: props.pochette,
      media: props.media,      
      user: props.user,
      rightHolders: props.rightHolders,
      p0: (props.media && props.media.propositions && props.media.propositions.length > 0) ? props.media.propositions[0] : undefined
    }
    this.modalePropositionEnCours = this.modalePropositionEnCours.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rightHolders !== nextProps.rightHolders) {
      this.setState({ rightHolders: nextProps.rightHolders }, ()=>this.genererAvatars());
    }
  }

  componentDidMount() {    
    if(this.props.rightHolders && Object.keys(this.props.rightHolders).length > 0) {
      this.genererAvatars()
    }
  }

  genererAvatars() {    
    let avatars = AyantsDroit.genererAvatars(this.state.media.rightHolders)
    this.setState({ avatars })
  }

  modalePropositionEnCours(ouvrir = true) {
    this.setState({ modalePropositionEnCours: ouvrir });
  }

  renderAvatars() {
    let arrAvatars = []
    Object.keys(this.state.avatars).forEach(a=>{
      arrAvatars.push(this.state.avatars[a])
    })
    const maxDisplayedAvatars = 5
    const displayedAvatars = Math.min(maxDisplayedAvatars, this.state.avatars.length)
    const undisplayedAvatars = this.state.avatars.length - displayedAvatars
    let _avatars = arrAvatars
      .slice(0, maxDisplayedAvatars)
      .map((avatar, index) => {
        const zIndex = displayedAvatars + 2 - index;
        return (
          <div key={`avatar_${index}`} className={"avatar"} style={{ zIndex, display: "inline"}}>
            <img height="12px" src={avatar.dataUri} alt={`${avatar.prenom} ${avatar.nom} ${avatar.nomArtiste ? `(${avatar.nomArtiste})` : ""}`} title={`${avatar.prenom} ${avatar.nom} ${avatar.nomArtiste ? `(${avatar.nomArtiste})` : ""}`} />
          </div>
        )
      })
    if(this.state.avatars.length >= maxDisplayedAvatars) {
      let autres = ""
      this.state.avatars.slice(maxDisplayedAvatars, this.state.avatars.length).forEach(e=>{
        autres = autres + `${e.prenom} ${e.nom} ${e.nomArtiste ? `(${e.nomArtiste})` : ""}\n`
      })
      _avatars = _avatars.concat([
        <div style={{display: "inline"}} key={`more-tag-avatar`} className={"more-tag"}  title={autres} >{undisplayedAvatars > 0 ? `+${undisplayedAvatars}`: ""}
        </div>
      ])
    }
    return _avatars
  }

  supprimer(mediaId) {
    this.setState({mediaASupprimer: mediaId}, ()=>this.setState({supprimer: true}))
  }

  surNouveau() {
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
          `${config.API_URL}media/proposal/${this.state.media.mediaId}`,
          { rightHolderId: this.state.user.username }
        )
        .then(res => utils.naviguerVersNouveauPartage(this.state.media.mediaId))
        .catch(err => console.log(err))
    } else {
      this.modalePropositionEnCours()
    }
  }

  render() {

    const t = this.props.t, i18n = this.props.i18n

    let pochette = this.state.pochette ? "pochette" : ""
    let elem = this.state.media
    let _p = this.state.p0

    let nouveauDisabled = false

    if (_p && this.state.user) {
      if (_p.etat !== "REFUSE") {
        nouveauDisabled = true;
      }      
    }

    let imageSrc = placeholder
    if(elem.files && elem.files.cover && elem.files.cover.files && elem.files.cover.files.length > 0) {
      elem.files.cover.files.forEach(e=>{
          if(e.access === 'public') {
            imageSrc = `${config.IMAGE_SRV_ARTISTES_URL}${elem.mediaId}/cover/${e.file}`
          }
      })
    }

    moment.defaultFormat = "DD-MM-YYYY HH:mm"

    let avatars
    if(this.state.avatars) {
      avatars = this.renderAvatars()
    }

    function naviguerVersOeuvre(pochette, mediaId) {
      if(pochette){utils.naviguerVersSommaire(mediaId)}
      else { utils.naviguerVersSommaireOeuvre(mediaId) }
    }

    return (
      <div className="_hautColonne">
        <div className="ui grid">
          <div className="ui row">
            <div
              className="ui one wide column cliquable"
              onClick={() => {
                naviguerVersOeuvre(this.state.pochette, elem.mediaId)
              } }
            >
              <img className={ 'song-image' } style={{width: "40px", height: "40PX", right: "0px", position: "absolute"}} src={ imageSrc } alt={ this.props.media.title } />
            </div>
            <div
              className="ui six wide column"
            >
              <div className="song-name cliquable" onClick={() => naviguerVersOeuvre(this.state.pochette, elem.mediaId) }>{`${elem.title}`}</div>
              <div className="small-400" style={{display: "inline"}}>
                &nbsp;&nbsp;{t("flot.split.tableaudebord.pieces.par")}&nbsp;
              </div>

              <div
                className={`small-500-color ${pochette}`}
              >{`${elem.artist}`}</div>
              <br />
              <div className={`small-400-color`}>
                {i18n.language &&
                  moment(new Date(parseInt(elem.creationDate)))
                    .locale(i18n.language.substring(0, 2))
                    .fromNow()}{" "}
                &bull; {t("flot.split.tableaudebord.pieces.partageAvec")}
                <div className={"avatars"} style={{display: "inline", marginLeft: "12px"}}>{avatars}</div>
              </div>
            </div>
            <div className={`ui four wide column etat`} style={{float: "right"}}>
              {!pochette && _p && _p.etat && (
                <EtatMedia media={this.state.media} pochette={this.state.pochette} proposition={_p} />
              )}
              {!pochette && !nouveauDisabled && (
                  <div
                    className={`small-500-color ${pochette} cliquable`}
                    onClick={() => {
                      this.surNouveau(this.state.media.mediaId)
                    }}
                  >
                    {t(
                      "flot.split.documente-ton-oeuvre.proposition.nouvelle"
                    )}
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
            <div className={`ui four wide column`} style={{float: "right"}}>                  
              <div className={`small-500-color ${pochette} cliquable`} onClick={()=>utils.naviguerVersDocumentation(this.state.media.mediaId)}>
                {t(
                  "flot.split.documente-ton-oeuvre.titre"
                )}
              </div>
            </div>
            <div className={`ui one wide column`} style={{float: "right"}}>
              <OptionsMedia 
                reenvoi={()=>utils.naviguerVersEnvoyerAuxCollaborateurs(this.state.media.mediaId)} 
                supprimer={this.supprimer} 
                user={this.state.user} 
                ayantDroit={this.state.user.username} 
                media={this.state.media} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(LigneMedia)