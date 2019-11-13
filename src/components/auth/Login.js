import React, { Component } from "react";

import "./Login.css";

// Importation pochette
import '../../assets/scss/connexion/connexion.scss'

import { Auth } from "aws-amplify";
import { Translation } from "react-i18next";

import { Formik, Form, Field } from "formik";

// Rétroaction utilisateur
import { toast } from "react-toastify";

import Eye from "./Eye";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pochette: props.pochette,
      hidden: true,
      username: "",
      password: this.props.password,
      parent: props.parent,
      vote: props.vote
    };

    this.toggleShow = this.toggleShow.bind(this);
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = values => {
    try {
      this.setState({ patience: true }, () => {
        Auth.signIn(values.username, values.password)
          .then(user => {
            //toast.success(`#${user.username} !`);
            if (this.props.fn) {
              this.props.fn();
            }
          })
          .catch(err => {
            toast.error(err.message);
          })
          .finally(() => {
            this.setState({ patience: false });
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.password !== nextProps.password) {
      this.setState({ password: nextProps.password })
    }
    if (this.props.parent !== nextProps.parent) {
      this.setState({ parent: nextProps.parent })
    }
    if (this.props.vote !== nextProps.vote) {
      this.setState({ vote: nextProps.vote })
    }
  }

  render() {
    let pochette = this.state.pochette ? "pochette" : ""
    return (
      <Formik
        initialValues={{
          username: this.state.username,
          password: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values, () => {
            setSubmitting(false);
          });
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Translation>
            {(t, i18n) => (
              <Form>
                {this.state.patience && (
                  <div className="container ui active dimmer">
                    <div className="ui text loader">{t("entete.encours")}</div>
                  </div>
                )}
                {!this.state.patience && (
                  <div>
                    {
                      !this.state.vote && (
                        <span className="top-register">
                          <div
                            onClick={() => {
                              // Le paramètre de la fonction afficher est le TYPE_ dans le fichier Connexion.js
                              this.props.parent.afficher(1);
                            }}
                            className={`inscription ${pochette}`}
                          >
                            {t("entete.inscription")}
                          </div>
                        </span>
                      )
                    }                    
                    <div className="container">
                      <header id="loginHeader">
                        {i18n.lng && i18n.lng.substring(0, 2) === "en" && (
                          <div>
                            <div className="loginHead">
                              {
                                !this.state.vote && (
                                  <h1>
                                    Login to your {this.state.pochette ? "Pochette" : "Smartsplit"} <br />
                                    account
                                  </h1>
                                )
                              }
                              {
                                this.state.vote && (
                                  <h1>
                                    Login to confirm your vote
                                  </h1>
                                )
                              }                              
                              <br></br>
                            </div>
                          </div>
                        )}
                        {i18n.lng && i18n.lng.substring(0, 2) !== "en" && (
                          <div>
                            <div className="loginHead">
                              {
                                !this.state.vote && (
                                  <h1>
                                    Connecte-toi à ton <br />
                                    compte {this.state.pochette ? "Pochette" : "Smartsplit"}
                                  </h1>
                                )
                              }
                              {
                                this.state.vote && (
                                  <h1>
                                    Connecte-toi <br/>
                                    pour confirmer ta décision
                                  </h1>
                                )
                              }                              
                              <br></br>
                            </div>
                          </div>
                        )}
                      </header>
                    </div>
                    <section className="section auth">
                      <div className="container">
                        <h1>{this.props.message}</h1>
                        <div className="field">
                          <div className="input-wrapper">
                            <div className="control">
                              <label htmlFor="username">
                                {t("accueil.courriel")}
                              </label>
                              <Field
                                name="username"
                                id="username"
                                aria-describedby="usernameHelp"
                                placeholder={t(
                                  "flot.split.inscription.exemple"
                                )}
                                required={true}
                              />
                              {errors.username && touched.username && (
                                <div style={{
                                  color: "red",
                                  position: "absolute",
                                  top: "70px"
                                }}>
                                  {" "}
                                  {t(
                                    "flot.split.inscription.email-invalide"
                                  )}{" "}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="field">
                            <div className="control has-icons-left">
                              <label htmlFor="password">
                                {t("accueil.motdepasse")}
                              </label>
                              <div className="input-wrapper">
                                <Field
                                  type={this.state.hidden ? "password" : "text"}
                                  id="password"
                                  name="password"
                                  placeholder=""
                                  required={true}
                                />
                                <button
                                  type="button"
                                  id="hide"
                                  onClick={e => {
                                    this.toggleShow(e);
                                  }}
                                >
                                  <Eye actif={this.state.hidden}
                                    id="hide"
                                    onClick={e => {
                                      this.toggleShow(e);
                                    }}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {!this.state.patience && (
                            <div className="field">
                              <div className="control">
                                <div
                                  onClick={() => {
                                    this.state.parent.afficher(2);
                                  }}
                                  className={`motdepasse-oublie ${pochette}`}
                                >
                                  {t("accueil.oublie")}
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="field">
                            <p className="control">
                              <button className={`ui medium button login is-success ${pochette}`}>
                                {t("entete.connexion")}
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </Form>
            )}
          </Translation>
        )}
      </Formik>
    );
  }
}

export default LogIn;
