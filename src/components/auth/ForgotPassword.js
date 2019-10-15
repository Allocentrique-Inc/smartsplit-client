import React, { Component } from "react";
// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { Translation } from "react-i18next";
import { Modal } from "semantic-ui-react";

import closeIcon from "../../assets/svg/icons/x.svg";
import "../../assets/scss/page-assistant/modal.scss";
import positiveImage from "../../assets/images/positive.png";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

//import { withTranslation } from "react-i18next";

const emailStyle = {
  display: "block",
  width: "464px",
  fontFamily: "IBM Plex Sans",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  position: "isAbsolute",
  margin: "20px 0px 40px 40px"
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      email: "",
      errors: {
        cognito: null,
        blankfield: false
      }
    };
    this.validateEmail = this.validateEmail.bind(this);
  }
  /*validateEmail(value) {
      if (!value) {
        return "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
        return "Invalid Email";
      }
    }*/
  validateEmail(value) {
    let error;
    if (!value) {
      error = ( /*Translation = dans JSX*/
        <Translation>
          {
            t =>
              <>
                {t('flot.split.inscription.email-requis')}
              </>
          }
        </Translation>
      );
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) { /*2,6 plutôt que 2,4 pour les .qc.ca*/
      error = (
        <Translation>
          {
            t =>
              <>
                {t('flot.split.inscription.email-invalide')}
              </>
          }
        </Translation>
      );
    }
    return error;
  }

  handleOpen = () => { this.setState({ modalOpen: true }) };
  handleClose = () => this.setState({ modalOpen: false });

  openModal = () => {
    this.setState({ showModal: true });
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  forgotPasswordHandler = async event => {
    event.preventDefault();

    // AWS Cognito integration here
    try {
      await Auth.forgotPassword(this.state.email);
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = values => {
    const email = values.email;
  }

  render() {
    return (
      <Formik
        initialValues={{
          /*email: this.state.email,*/
          email: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleOpen()
          this.handleSubmit(values, () => {
            setSubmitting(false);
          });
        }}
        render={
          props => (
            <Translation className="section auth">
              {(t, i18n) => (
                <div>
                  {!this.state.patience && (
                    <span className="top-login">
                      <div
                        onClick={() => {
                          // Le paramètre de la fonction afficher est le TYPE_ dans le fichier Connexion.js
                          this.props.parent.afficher(0);
                        }}
                        style={{
                          color: "#2DA84F",
                          cursor: "pointer",
                          position: "relative",
                          bottom: "30px"
                        }}
                      >
                        {t("entete.connexion")}
                      </div>
                    </span>
                  )}
                  <div className="containerPassword" style={emailStyle}>
                    <h1
                      style={{
                        emailStyle,
                        fontWeight: "normal"
                      }}
                    >
                      {t("flot.split.auth.oublier.titre")}
                    </h1>
                    <p>{t("flot.split.auth.oublier.preambule")}</p>
                    {/* <form onSubmit={this.forgotPasswordHandler}>
                    <div
                      className="field"
                      style={{
                        emailStyle,
                        fontWeight: "normal"
                      }}
                    > */}
                    <div className="control has-icons-left has-icons-right">

                      <Field
                        validate={this.validateEmail}
                        type="email"
                        name="email"
                        placeholder={t("flot.split.auth.oublier.indication.email")}
                        required={true}
                      />
                      {props.errors.email && props.touched.email && (
                        <div style={{
                          color: "red",
                          position: "absolute",
                          fontSize: "14px"
                        }}>
                          {props.errors.email}
                          { /*{t("flot.split.inscription.email-invalide")}{" "}*/}
                        </div>
                      )}
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <p className="control"></p>
                  </div>
                  <div className="field">
                    <button
                      className="ui medium button is-success"
                      type="submit"
                      style={{
                        position: "relative",
                        float: "right",
                        margin: "0px 35px 10px 0px"
                      }}
                      onClick={props.handleSubmit}
                    >
                      {t("flot.split.collaborateur.attribut.bouton.soumettre")}
                    </button>
                    <p className="control">
                      <Modal
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        size="small"
                      >
                        <Modal.Content>
                          <div className="modal-navbar">
                            <div className="left">
                              <div className="title">{t("flot.fin.recupMotDePasse")}</div>
                            </div>

                            <div className="right">
                              <a className="close-icon" onClick={() => { this.handleClose() }}>
                                <img src={closeIcon} alt={"close"} />
                              </a>
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
                                I just sent an email with a link that you can use to reset your password. Please, check your emails.
                              </p>
                            )}
                            {i18n.lng && i18n.lng.substring(0, 2) !== "en" && (
                              <p className={"description"}>
                                Je viens d'envoyer un courriel avec un lien pour réinitialiser ton mot de passe. Merci de vérifier tes messages.
                              </p>
                            )}
                          </div>

                          <div className={"modal-bottom-bar"}>
                          </div>

                        </Modal.Content>
                      </Modal>
                    </p>
                    {/* </div>
                  </form> */}
                  </div>
                </div>
              )}
            </Translation>
          )
        }
      >

      </Formik>
    );
  }
}

export default ForgotPassword;
