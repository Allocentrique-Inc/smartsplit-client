import React, { Component } from "react";

import "./Login.css";

// Importation pochette
import '../../assets/scss/connexion/connexion.scss'

import { Translation } from "react-i18next";
import axios from "axios";

import { Formik, Form, Field } from "formik";

// Rétroaction utilisateur
import { toast } from "react-toastify";

import Eye from "./Eye";

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pochette: props.pochette,
      hidden: true,
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
        let body = {"password": values.password}
        axios.post('http://dev.api.smartsplit.org:8080/v1/auth/verifyPassword', body)
        .then((resp)=>{     
            if (resp.data === "Success"){
                this.props.history.push("/accueil");
            } else {
                toast.error("Password Incorrect")
            }
        })
        .catch((error) => {
            console.log(error.message)
            toast.error(error.message)
        })
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
                        <div className="ui grid">
                          <div className="four column row">
                            <div className="right floated column">
                              <div className="top-register">
                                <div
                                  onClick={() => {
                                    // Le paramètre de la fonction afficher est le TYPE_ dans le fichier Connexion.js
                                    this.props.parent.afficher(1);
                                  }}
                                  className={`inscription ${pochette}`}
                                >
                                  {t("entete.inscription")}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    <section className="section auth">
                      <div className="container">
                        <h1>{this.props.message}</h1>
                        <div className="field">
                          <div className="field">
                            <div className="control has-icons-left">
                              <label htmlFor="password">
                                {t('flot.split.auth.protection.titre')}
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
                                  tabIndex="-1"
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
                          <div className="field">
                            <p className="control">
                              <button className={`ui medium button login is-success ${pochette}`}>
                                {t('flot.split.auth.protection.bouton')}
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

export default Password;
