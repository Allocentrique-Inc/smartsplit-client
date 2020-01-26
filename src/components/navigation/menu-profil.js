import {AyantsDroit, Identite, utils, journal, config} from '../../utils/application'
import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import { Dropdown } from "semantic-ui-react"
import i18n from "i18next"
import "../../assets/scss/menu-profil.scss"
import {
  LogOutSVG,
  SettingsSVG,
  AvatarInitialsSVG,
  ChevronDownSVG,
  LangueSVG
} from "../svg/SVG"

const NOM = "MenuProfil"

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
    let user = AyantsDroit.ayantsDroit[this.state.auth.username]    
    this.setState({ user })
    this.setState({ avatarInitiales: user.avatar.dataUri })              
  }

  deconnexion() {
    Identite.deconnexion(()=>{
      journal.debug(NOM, "retour accueil")
      utils.naviguerVersAccueil()
    })
  }

  ouvrirSocan(val = true) {
    this.setState({ modaleSocan: val });
  }

  render() {
    let t = this.props.t
    let avatarImage;
    let userInitials;
    let nomComplet;
    if (this.state.user) {
      //avatarLink = this.state.user.avatarS3Etag // avatarS3Etag taken as full url instead of Etag
      avatarImage =
        this.state.user.avatarImage === null ||
          this.state.user.avatarImage === "image.jpg"
          ? !this.props.pochette
            ? ""
            : `${config.IMAGE_SRV_URL}avatar.png`
          : `${config.IMAGE_SRV_URL}${this.state.user.avatarImage}`
      userInitials =
        this.state.user.avatarImage === null ? this.state.initials : null;
      nomComplet = this.state.user.artistName
        ? this.state.user.artistName
        : `${this.state.user.firstName} ${this.state.user.lastName}`;
    }

    let menu = (      
      <span>
        <Dropdown text="" icon={<ChevronDownSVG />} className="down angle">
          <Dropdown.Menu style={{right: "0", left: "auto"}}>
            <Dropdown.Item onClick={() => window.location.href = "/accueil"}>
              <React.Fragment>
                <div className="custom-initials-holder">
                  {
                    this.state.user && avatarImage && (
                      <img className="ui image rounded" src={avatarImage} alt={`${this.state.user.firstName} ${this.state.user.lastName}`} />
                    )
                  }
                  {
                    this.state.user && !avatarImage && (
                      <>
                        <AvatarInitialsSVG />
                        <span className="custom-initials">
                          {this.state.initials}
                        </span>
                      </>
                    )
                  }
                </div>
                <span className="text nom">{nomComplet}</span>
              </React.Fragment>
            </Dropdown.Item>
            {i18n.language && i18n.language.substring(0, 2) === "en" && (
              <Dropdown.Item onClick={() => {
                i18n.init({ lng: "fr" });
              }}>
                <React.Fragment>
                  <div className="custom-initials-holder">
                    <span className="custom-initials">
                      <LangueSVG />
                    </span>
                  </div>
                  <span className="text">{t("menuprofil.francais")}</span>
                </React.Fragment>
              </Dropdown.Item>
            )}
            {i18n.language && i18n.language.substring(0, 2) === "fr" && (
              <Dropdown.Item onClick={() => {
                i18n.init({ lng: "en" });
              }}>
                <React.Fragment>
                  <div className="custom-initials-holder">
                    <span className="custom-initials">
                      <LangueSVG />
                    </span>
                  </div>
                  <span className="text">{t("menuprofil.anglais")}</span>
                </React.Fragment>
              </Dropdown.Item>
            )}
            <Dropdown.Divider />          
            <Dropdown.Item
              className="parametre"
              text={t("menuprofil.parametre")}
              image={<SettingsSVG />}
              onClick={() => {
                window.location.href = "/parametre"; // À faire
              }}
            />
            <Dropdown.Item
              className="deconnexion"
              text={t("menuprofil.deconnexion")}
              image={<LogOutSVG />}
              onClick={() => {
                this.deconnexion();
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      </span>
    )
    return (     
      <>            
        {!userInitials && (
          <div className="custom-initials-holder2">
            {
              this.state.user && avatarImage && (
                <img width="30" className="ui image rounded" src={avatarImage} alt={`${this.state.user.firstName} ${this.state.user.lastName}`} />
              )
            }
            {
              this.state.user && !avatarImage && (
                <>
                  <AvatarInitialsSVG />
                  <span className="custom-initials">
                    {this.state.initials}
                  </span>
                </>
              )
            }
          </div>
        )}
        {menu}
      </>
    )
  }
}

export default withTranslation()(MenuProfil)
