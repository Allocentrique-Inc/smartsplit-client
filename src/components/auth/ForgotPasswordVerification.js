import {Identite} from '../../utils/application'
import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import { Modal } from "semantic-ui-react"
import ChangePasswordVerification from "./ChangePasswordVerification"
import Eye from "./Eye"
import { Field, Formik } from "formik"
import zxcvbn from "zxcvbn"

import "./Register.css"
import * as Yup from "yup"

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
      strength: 0,
      passwordmatch: false,
      errors: {
        cognito: null,
        blankfield: false
      },
    }

    this.validatePasswordStrong = this.validatePasswordStrong.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.validateConfirmNewPassword = this.validateConfirmNewPassword.bind(this)
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this)
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.validateConfirmNewPassword = this.validateConfirmNewPassword.bind(this)

  }


  validatePassword(value) {
    if (!value) {
      return "Required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
        value
      )
    ) {
      return "Invalid password";
    }
  }

  validateConfirmNewPassword(value) {
    if (!value) {
      return "Required";
    } else if (value !== this.state.password) {
      return "Passwords do not match";
    } else {
      this.setState({ passwordmatch: true });
    }
  }

  validatePasswordStrong = (value = this.state.newPassword) => {
    // ensure password is long enough

    if (value.length <= this.thresholdLength) {
      throw new Error("Password is short");
    }

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength) {
      throw new Error("Password is weak");
    }
  }

  passwordVerificationHandler = async event => {
    event.preventDefault();
    Identite.oubliMotDePasse( {courriel: this.state.email, code: this.state.verificationCode, nouveauMdp: this.state.newPassword} )
    
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      password: event.target.value,
      strength: zxcvbn(event.target.value).score
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  toggleConfirmShow() {
    this.setState({ confirmhidden: !this.state.confirmhidden });
  }

  componentDidMount() {    
    if (this.props.newPassword) {
      this.setState({ password: this.props.newPassword });
    }
    if (this.props.confirmNewPassword) {
      this.setState({ confirmNewPassword: this.props.confirmNewPassword });
    }
  }

  render() {

    const t = this.props.t
    
    const { newPassword, strength } = this.state;

    const passwordLength = newPassword.length;
   
    const strengthClass = [
      "strength-meter mt-2",
      passwordLength > 0 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();
    // confirm password field is only visible when password is not empty
    const confirmClass = [
      "confirmNewPassword",
      strength >= 4 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();

    return (
      <Formik
        initialValues={{
          newPassword: this.state.newPassword,
          hidden: true,
          confirmhidden: true,
          confirmNewPassword: this.state.confirmNewPassword,
          strength: this.state.strength
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values, () => {
            setSubmitting(false);
          });
        }}

        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .required("No password provided"),
          confirmNewPassword: Yup.string()
            .required("No password provided")
        })}
      >

        {({ errors, touched, isValidating }) => (          
          <section className="section auth">
            <div
              className="container"
              style={{
                width: "464px",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px"
              }}
            >
              <h1>{t("flot.split.sommaire.definir")}</h1>
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
                  <div className="control has-icons-left">
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
                    <div className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="control has-icons-left">
                    <div className="input-wrapper">
                      <Field
                        validate={this.validatePasswordStrong}
                        type={this.state.hidden && this.state.confirmhidden ? "password" : "text"}
                        name="newPassword"
                        id="newPassword"
                        placeholder={t("flot.split.sommaire.nouveau")}
                        value={this.state.newPassword}
                        onChange={this.onInputChange}
                        style={{ color: "#212121" }}
                        required={true}
                      />
                      <button
                        style={{ position: "absolute", bottom: "auto" }}
                        id="hide"
                        onClick={e => {
                          e.preventDefault();
                          this.toggleShow();
                        }}
                      >
                        <Eye actif={this.state.hidden && this.state.confirmhidden} />
                      </button>
                      {errors.newPassword && touched.newPassword && (
                        <div style={{ color: "red" }}>
                          {" "}
                          {t(
                            "flot.split.inscription.password-invalide"
                          )}{" "}
                        </div>
                      )}
                      <div className="icon is-small is-left">
                        <i className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className={strengthClass}>
                    <div
                      className="strength-meter-fill"
                      data-strength={strength}
                    />
                  </div>
                  <div className={confirmClass}>
                  </div>
                  <br />
                  <div className="field" style={{ position: "relative" }}>
                    <div className="control has-icons-left confirmPassword">
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
                        placeholder={t("flot.split.sommaire.confirmer")}
                        value={this.state.confirmNewPassword}
                        onChange={this.onInputChange}
                        style={{ color: "#212121" }}
                        required={true}
                      />
                      <button
                        style={{ position: "absolute", top: "-15px" }}
                        id="hide-confirm"
                        onClick={e => {
                          e.preventDefault();
                          this.toggleConfirmShow();
                        }}>
                        <Eye actif={this.state.hidden && this.state.confirmhidden} />
                      </button>
                      {errors.confirmNewPassword &&
                        touched.confirmNewPassword && (
                          <div style={{ color: "red" }}>
                            {" "}
                            {t("flot.split.inscription.correspond")}
                          </div>
                        )}
                      <div className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="field">
                  <div className="control">
                    <Modal
                      trigger={
                        <button
                          className={`ui medium button is-success" ${
                            !this.state.newPassword ||
                              this.state.confirmNewPassword !==
                              this.state.newPassword
                              ? "disabled"
                              : ""
                            }`}
                          type="submit"
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
        )}
      </Formik >
    )
  }
}

export default withTranslation()(ForgotPasswordVerification)
