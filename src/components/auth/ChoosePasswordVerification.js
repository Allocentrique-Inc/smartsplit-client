import React, { Component } from "react"
import {Identite, utils} from '../../utils/application'
import { withTranslation } from "react-i18next"
import { Modal } from "semantic-ui-react"
import ChangePasswordVerification from "./ChangePasswordVerification"

class ForgotPasswordVerification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verificationCode: props.code,
      email: props.email,
      newPassword: "",
      confirmNewPassword: "",
      errors: {
        cognito: null,
        blankfield: false
      }
    }
  }  

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  passwordVerificationHandler = async event => {
    event.preventDefault()
    Identite.oubliMotDePasse( {courriel: this.state.email, code: this.state.verificationCode, nouveauMdp: this.state.newPassword} )
    utils.naviguerVerAccueil()
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    const t = this.props.t
    return (      
      <section className="section auth">
        <div
          className="container"
          style={{
            width: "464px",
            fontFamily: "IBM Plex Sans",
            fontSize: "16px"
          }}
        >
          <h1>&nbsp;&nbsp;{t("flot.split.inscription.choose-password")}</h1>
          <form onSubmit={this.passwordVerificationHandler}>
            <div className="field">
              <p className="control">
                <input
                  type="text"
                  className="input"
                  id="verificationCode"
                  aria-describedby="verificationCodeHelp"
                  placeholder={t("flot.split.sommaire.verification")}
                  value={this.state.verificationCode}
                  onChange={this.onInputChange}
                  style={{display: "none"}}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder={t(
                    "flot.split.auth.oublier.indication.email"
                  )}
                  value={this.state.email}
                  onChange={this.onInputChange}
                  style={{display: "none"}}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  id="newPassword"
                  placeholder={t("flot.split.inscription.password")}
                  value={this.state.newPassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  id="confirmNewPassword"
                  placeholder={t("flot.split.inscription.confirm-password")}
                  value={this.state.confirmNewPassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <div className="control">
                <Modal
                  trigger={
                    <button
                      className="ui medium button is-success"
                      style={{ float: "right", margin: "0 0 50px 0" }}
                      onClick={this.handleOpen}
                    >
                      {t("collaborateur.attribut.bouton.soumettre")}
                    </button>
                  }
                  onClose={this.handleClose}
                  size="small"
                >
                  <Modal.Content>
                    <ChangePasswordVerification />
                  </Modal.Content>
                </Modal>
              </div>
            </div>
          </form>
        </div>
      </section>       
    )
  }
}

export default withTranslation()(ForgotPasswordVerification)