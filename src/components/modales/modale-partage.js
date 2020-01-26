import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import eye from "../../assets/svg/icons/eye.svg";
import downloadLock from "../../assets/svg/icons/download-lock.svg";
import edit from "../../assets/svg/icons/edit.svg";
import closeIcon from "../../assets/svg/icons/x.svg";
import "../../assets/scss/page-assistant/modal.scss";
import { withTranslation } from "react-i18next";
import ChampTexte from '../page-assistant/champ-texte'
import Axios from "axios";
import { toast } from "react-toastify";
import {config} from '../../utils/application'

const PUBLIC = 1, SECRET = 2, ADMIN = 3

class ModalePartage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      onClose: props.onClose,      
      media: props.media
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ open: true })
    }
  }

  autoriserAccess(t, contexte) {
    if(this.state.prenom && this.state.nom && this.state.courriel) {      
      let data = {
        mediaId: this.state.media.mediaId,
        acces: this.state.selection,
        nom: this.state.nom,
        prenom: this.state.prenom,
        courriel: this.state.courriel,
        contexte: contexte
      }      
      Axios.post(`${config.API_URL}media/shareMedia`, data)
      .then(res=>{
        console.log(res)
        toast.success(t('flot.partage.reussi'))
      })
      .catch(err=>console.log(err))
      .finally(()=>this.props.onClose())
    }
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  onClose = () => {
    this.props.open(false);
  };

  render() {

    const t = this.props.t

    let genererLigne = (idx, imgSrc, cleTradTitre, cleTradDesc) => {
      return (
        <div onClick={()=>{this.setState({selection: idx})}} className="ui row cliquable">
          <div className="ui two wide column">
            <img style={{width: "35px"}} src={imgSrc} alt={cleTradTitre} />
          </div>
          <div className="ui fourteen wide column">
            <div style={{width: "100%"}}><h3 className={`${this.props.pochette ? 'pochette' : 'smartsplit'}`}>{cleTradTitre}</h3></div>
            <div className="medium-300" style={{width: "100%", color: "gray"}}>{cleTradDesc}</div>
          </div>
        </div>
      )
    }

    let titre = "flot.partage.titre"
    if(this.state.selection) {
      switch(this.state.selection) {
        case 1:
          titre = "flot.partage.titre1"
          break;
        case 2:
          titre = "flot.partage.titre2"
          break;
        case 3:
          titre = "flot.partage.titre3"
          break;
        default:
      }
    }

    let url, contexte = "smartsplit.org"
    let prefixe = config.BASE
    if(this.props.pochette) {
      prefixe = config.BASE_POCHETTE
      contexte = "pochette.info"
    }

    url = `${prefixe}oeuvre/${this.state.media.mediaId}/resume`

    return (      
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <div className="modal-navbar">
          <div className="left">
            <div style={{ textAlign: "center" }}>
              <div className="title">{t(titre)}</div>
            </div>
          </div>
          <div className="right-0">
            <span className="close-icon cliquable" onClick={this.props.onClose}>
              <img src={closeIcon} alt={"close"} />
            </span>
          </div>
        </div>
        {!this.state.selection && (
          <div className="modal-content">
            <h4 className={"h4-style"} style={{marginTop: "30px"}} >
              {t("flot.partage.sous-titre-1")}
            </h4>
            <div className="ui grid" style={{width: "78%", marginBottom: "35px"}}>
              {genererLigne(PUBLIC, eye, t('flot.partage.public-t'), t('flot.partage.public-d'))}
              {genererLigne(SECRET, downloadLock, t('flot.partage.secret-t'), t('flot.partage.secret-d'))}
              {genererLigne(ADMIN, edit, t('flot.partage.admin-t'), t('flot.partage.admin-d'))}
            </div>
          </div>
        )}
        {this.state.selection && (
          <>              
            <div className="modal-content">                  
              <div className="ui grid" style={{width: "90%", marginBottom: "35px", marginTop: "20px"}}>
                <div className="ui row">
                  <div className="ui sixteen wide column">
                    <ChampTexte 
                      label={t(`flot.partage.adresse${this.state.selection}`)}                          
                      disabled={true}
                      value={url} />
                  </div>
                </div>
                <div className="ui row">
                  <div className="ui eight wide column">
                    <ChampTexte 
                      required={true}
                      label={t(`flot.partage.envoyer`)}
                      placeholder={t(`flot.partage.prenom`)}
                      onChange={val=>this.setState({prenom: val})}
                    />
                  </div>                                        
                  <div className="ui eight wide column">
                    <ChampTexte 
                      label=""
                      required={true}
                      placeholder={t(`flot.partage.nom`)}
                      onChange={val=>this.setState({nom: val})}
                    />
                  </div>
                </div>
                <div className="ui row">
                  <div className="ui sixteen wide column">
                  <ChampTexte 
                    required={true}
                    label={t(`flot.partage.courriel`)}
                    placeholder={t(`flot.partage.adrCourriel`)}
                    onChange={val=>this.setState({courriel: val})}
                  />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-bottom-bar">
              <Button className={`negative ${this.props.pochette ? 'pochette' : ''}`} onClick={()=>{this.setState({selection: 0})}}>
                {t('flot.partage.btn-retour')}
              </Button>
              <Button className={`${this.props.pochette ? 'pochette' : ''}`} onClick={()=>{this.autoriserAccess(t, contexte)}}>
                {t('flot.partage.btn-ok')}
              </Button>
            </div>
          </>
        )}
      </Modal>
    )
  }
}
export default withTranslation()(ModalePartage)