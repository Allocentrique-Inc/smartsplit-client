import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import positiveImage from "../../assets/images/positive.png";
import closeIcon from "../../assets/svg/icons/x.svg";
import "../../assets/scss/page-assistant/modal.scss";
import { withTranslation } from "react-i18next";

class ModalFin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      onClose: props.onClose,
      titre: props.titre,
      songTitle: props.songTitle,
      mediaId: props.mediaId
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ open: true })
    }
  }
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  onClose = () => {
    this.props.open(false);
  };

  render() {
    const t = this.props.t, i18n = this.props.i18n
    return (      
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <div className="modal-navbar">
          <div className="left">
            <div style={{ textAlign: "center" }}>
              <div className="title">{t("flot.fin.created")}</div>
            </div>
          </div>

          <div className="right-0">
            <span className="close-icon cliquable" onClick={this.props.onClose}>
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
          {i18n.language && i18n.language.substring(0, 2) === "en" && (
            <p className={"description"}>
              You're one <em>click</em> away from publishing this track's
              credits on a web page and thus increasing your discoverability
              in <em>data web</em>.
            </p>
          )}
          {i18n.language && i18n.language.substring(0, 2) !== "en" && (
            <p className={"description"}>
              Tu es à un <em>clic</em> de pouvoir publier les crédits de
              cette pièce sur une page web et ainsi d’augmenter ta
              découvrabilité dans le <em>web des données</em>.
            </p>
          )}
        </div>

        <div className={"modal-bottom-bar"}>
          <Button onClick={() => window.location.href = "/oeuvre/" + this.state.mediaId + "/resume"} style={this.props.pochette ? { backgroundColor: "#F2724A" } : {}}>{t("flot.fin.resume")}</Button>
        </div>

      </Modal>
    )
  }
}

export default withTranslation()(ModalFin)