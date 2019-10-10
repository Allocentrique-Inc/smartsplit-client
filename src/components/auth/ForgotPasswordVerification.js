import React, { Component } from "react";
// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { Translation } from "react-i18next";
import { Modal } from "semantic-ui-react";
import ChangePasswordVerification from "./ChangePasswordVerification";
import Eye from "./Eye";

const styleWrapper = {
  position: 'relative',
  width: '464px',
  fontFamily: "IBM Plex Sans"
}

class ForgotPasswordVerification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verificationcode: props.code,
      email: props.email,
      newpassword: "",
      errors: {
        cognito: null,
        blankfield: false
      },
      type: 'input',
      score: 'null'
    }
    this.toggleShow = this.toggleShow.bind(this);
    this.showHide = this.showHide.bind(this);
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
    event.preventDefault();

    // AWS Cognito integration here
    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.verificationcode,
        this.state.newpassword
      );

      this.props.history.push("/accueil");
    } catch (error) {
      console.log(error);
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  }

  render() {
    return (
      <Translation>
        {t => (
          <section className="section auth">
            <div
              className="container"
              style={{
                width: "464px",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px"
              }}
            >
              <h1>&nbsp;&nbsp;{t("flot.split.sommaire.definir")}</h1>
              <p>{t("flot.split.sommaire.code")}</p>
              <div style={styleWrapper}>
                <form onSubmit={this.passwordVerificationHandler}
                  onPaste={e => {
                    e.preventDefault();
                    return false
                  }}>
                  <div className="field">
                    <p className="control">
                      <input
                        type={this.state.type}
                        type="text"
                        className="input"
                        id="verificationcode"
                        aria-describedby="verificationCodeHelp"
                        placeholder={t("flot.split.sommaire.verification")}
                        value={this.state.verificationcode}
                        onChange={this.onInputChange}
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
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <span>
                        <input
                          type={
                            this.state.hidden ? "password" : "text"
                          }
                          type="password"
                          className="input"
                          id="newpassword"
                          placeholder={t("flot.split.sommaire.definir")}
                          value={this.state.newpassword}
                          onChange={this.onInputChange}
                        />
                        {/*<button
                          id="hide"
                          onClick={e => {
                            e.preventDefault();
                            this.toggleShow();
                          }}
                        >*/}
                        <button id="hide" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}

                          <Eye actif={this.state.hidden} />
                        </button>
                      </span>
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
                            {t("flot.split.collaborateur.attribut.bouton.soumettre")}
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
            </div>
          </section>
        )
        }
      </Translation>
    );
  }
}

export default ForgotPasswordVerification;
