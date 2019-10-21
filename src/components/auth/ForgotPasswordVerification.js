import React, { Component } from "react";
// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { Translation } from "react-i18next";
import { Modal } from "semantic-ui-react";
import ChangePasswordVerification from "./ChangePasswordVerification";
import Eye from "./Eye";
import { Field, Form, Formik } from "formik";


const styleWrapper = {
  position: 'relative',
  width: '464px',
  fontFamily: "IBM Plex Sans"
}

class ForgotPasswordVerification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hidden: true,
      confirmhidden: true,
      verificationCode: props.code,
      email: props.email,
      newPassword: "",
      confirmNewPassword: "",
      errors: {
        cognito: null,
        blankfield: false
      },
    }

    this.toggleShow = this.toggleShow.bind(this);
    this.validateConfirmNewPassword = this.validateConfirmNewPassword.bind(this);
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
  }

  validateConfirmNewPassword(value) {
    if (!value) {
      return "Required";
      // } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
      //   console.log("VALUE confirm", value)
      //   return "Passwords do not match"
    } else if (value !== this.state.password) {
      console.log("VALUE confirm", value);
      return "Passwords do not match";
    } else {
      this.setState({ passwordmatch: true });
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
  toggleConfirmShow() {
    this.setState({ confirmhidden: !this.state.confirmhidden });
  }

  render() {
    return (
      <Formik
        initialValues={{
          password: this.state.password,
          password: this.state.confirmNewPassword,
          hidden: true,
          confirmpassword: this.state.confirmpassword,
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values, () => {
            setSubmitting(false);
          });
        }}
      >
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
                        style={{ display: "none", color: "#212121" }}
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
                        style={{ display: "none", color: "#212121" }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <span>
                        <Field
                          type={this.state.hidden && this.state.confirmhidden ? "password" : "text"}
                          name="newPassword"
                          id="newPassword"
                          placeholder={t("flot.split.sommaire.definir")}
                          value={this.state.newpassword}
                          onChange={this.onInputChange}
                          style={{ color: "#212121" }}
                          required={true}
                        />
                        <button
                          id="hide"
                          style={{ margin: "15px 80px 0px 0" }}
                          onClick={e => {
                            e.preventDefault();
                            this.toggleShow();
                          }}
                        >
                          <Eye actif={this.state.hidden && this.state.confirmhidden} />
                        </button>
                      </span>
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>

                  <div className="field">
                    <p className="control has-icons-left">
                      <Field
                        onPaste={e => {
                          e.preventDefault();
                          return false
                        }}
                        validate={val => {
                          this.validateConfirmNewPassword(val);
                        }}
                        type={this.state.hidden && this.state.confirmhidden
                          ? "password"
                          : "text"}
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder={t("flot.split.inscription.password-confirm")}
                        value={this.state.confirmNewPassword}
                        onChange={this.onInputChange}
                        style={{ color: "#212121" }}
                        required={true}
                      />
                      <button
                        id="hide-confirm"
                        style={{ margin: "15px 80px 0 0" }}
                        onCLick={e => {
                          e.preventDefault();
                          this.toggleConfirmShow();
                        }}>
                        <Eye actif={this.state.confirmhidden && this.state.hidden} />
                      </button>

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
            </section>
          )
          }
        </Translation>
      </Formik>
    );
  }
}

export default ForgotPasswordVerification;
