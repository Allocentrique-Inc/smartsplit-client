import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import positiveImage from "../../assets/images/positive.png";
import closeIcon from "../../assets/svg/icons/x.svg";
import "../../assets/scss/page-assistant/modal.scss";
import { Translation } from "react-i18next";

export default class ModalPropositionEnCours extends Component {

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
      this.setState({ open: nextProps.open })
    }
  }
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  onClose = () => {
    this.state.onClose()
  };

  render() {

    return (
      <Translation>
        {(t, i18n) => (
          <Modal open={this.state.open} onClose={this.onClose}>
            <div className="modal-navbar">
              <div className="left">
                <div style={{ textAlign: "center" }}>
                  <div className="title">Attention !</div>
                </div>
              </div>

              <div className="right-0">
                <span className="close-icon cliquable" onClick={this.onClose}>
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
              
              {i18n.lng && i18n.lng.substring(0, 2) === "en" && (
              <p className={"description"}>
                <em>{this.props.initiateur}</em> is currently working on a new proposal for the <em>{this.props.titre}</em> split. As soon as it will be ready, you will receive an email inviting you to accept or refuse this proposal.
              </p>
              )}
              {i18n.lng && i18n.lng.substring(0, 2) === "fr" && (
                <p className={"description"}>
                  <em>{this.props.initiateur}</em> est en train de faire une contre-proposition de split pour la chanson <em>{this.props.titre}</em>. Dès que celle-ci sera prête, tu recevras un courriel t'invitant à accepter ou refuser cette proposition.
                </p>
              )}
            </div>

            <div className={"modal-bottom-bar"}>
              <Button onClick={() => {this.onClose()}}>OK</Button>
            </div>

          </Modal>
        )
        }
      </Translation>
    );
  }
}
