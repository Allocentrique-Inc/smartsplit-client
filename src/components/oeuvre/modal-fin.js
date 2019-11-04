import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import positiveImage from "../../assets/images/positive.png";
import closeIcon from "../../assets/svg/icons/x.svg";
import "../../assets/scss/page-assistant/modal.scss";
import { Translation } from "react-i18next";

export default class ModalFin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      onClose: props.onClose,
      titre: props.titre,
      songTitle: props.songTitle
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.open !== nextProps.open) {
      this.setState({open: true})
    }
  }

  render() {
    return (
      <Translation>
        {(t, i18n) => (
          <Modal open={this.state.open} onClose={this.state.onClose}>
            <div className="modal-navbar">
              <div className="left">
                <div className="title">{t("flot.fin.created")}</div>
              </div>

              <div className="right">
                <span className="close-icon" onClick={this.state.onClose}>
                  <img src={closeIcon} alt={"close"} />
                </span>
              </div>
            </div>

            <div className="modal-content">
              <img
                className={"success-image"}
                src={positiveImage}
                alt={"Positive"}
              />

              <h4 className={"h4-style"}>
                {t("flot.fin.maintenant1")}, <em>{this.state.titre}</em>, {t("flot.fin.maintenant2")}
              </h4>
              {i18n.lng && i18n.lng.substring(0, 2) === "en" && (
                <p className={"description"}>
                  You're one <em>click</em> away from publishing this track's
                  credits on a web page and thus increasing your discoverability
                  in <em>data web</em>.
                </p>
              )}
              {i18n.lng && i18n.lng.substring(0, 2) !== "en" && (
                <p className={"description"}>
                  Tu es à un <em>clic</em> de pouvoir publier les crédits de
                  cette pièce sur une page web et ainsi d’augmenter ta
                  découvrabilité dans le <em>web des données</em>.
                </p>
              )}
            </div>

            <div className={"modal-bottom-bar"}>            
              <Button onClick={()=>window.location.href="/oeuvre/resume"}style={this.props.pochette ? {backgroundColor: "#F2724A"} : {}}>{t("flot.fin.resume")}</Button>
            </div>

          </Modal>
        )}
      </Translation>
    );
  }
}
