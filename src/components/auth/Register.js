import {AyantsDroit, journal, Identite, utils} from '../../utils/application'
import React, { Component } from "react";
import "./Register.css";
import { Field, Form, Formik } from "formik";
import zxcvbn from "zxcvbn";
import { toast } from "react-toastify";
import { Dropdown } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import Eye from "./Eye";
import InfoBulle from "../partage/InfoBulle"

const NOM = "Register"

class Register extends Component {
  state = {
    showModal: false,
    username: false
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  constructor(props) {
    super(props);

    this.state = {
      pochette: props.pochette,
      hidden: true,
      confirmhidden: true,
      password: "",
      confirmEmail: "",
      confirmpassword: "",
      strength: 0,
      passwordmatch: false,
      groups: [],
      avatarImage: "image.jpg",
      firstName: "",
      lastName: "",
      artistName: "",
      defaultRoles: [],
      instruments: [],
      currentValue: [],
      currentRoleValue: [],
      image: "",
      uploadURL: "",
      locale: navigator.language || navigator.userLanguage,
      gender: "registeredUser" // Cognito Default Attribute Gender used as flag for user creation
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validatePasswordStrong = this.validatePasswordStrong.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
  }

  validateUsername(value) {
    if (!value) {
      return "Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        value
      )
    ) {
      return "Invalid username";
    }
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

  validateConfirmPassword(value) {
    if (!value) {
      return "Required";
    } else if (value !== this.state.password) {
      return "Passwords do not match";
    } else {
      this.setState({ passwordmatch: true });
    }
  }

  validatePasswordStrong = value => {
    // ensure password is long enough
    if (value.length <= this.thresholdLength) {
      throw new Error("Password is short");
    }

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength) {
      throw new Error("Password is weak");
    }
  };

  handleSubmit = values => {
    let source = window.location.href;
    const username = values.username;
    const email = values.username; // username is used as email
    const password = this.state.password;
    const avatarImage = "image.jpg";
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const artistName = this.state.artistName;
    const defaultRoles = this.state.currentRoleValue;
    const instruments = this.state.instruments;
    const groups = this.state.currentValue;
    const locale = this.state.locale;
    const gender = this.state.gender;
    const requestSource = source.includes("pochette")
      ? "pochette"
      : "smartsplit";

    try {
      // S'il n'y a pas de groupe, un en créé un éponyme
      let groupes = groups;
      if (groupes.length === 0) {
        let nom = this.state.artistName
          ? this.state.artistName
          : `${this.state.firstName} ${this.state.lastName}`;

        if (nom.trim() === "") {
          nom = "Anonyme";
        }

        groupes.push(nom);
      }

      Identite.enregistrement({
        utilisateur: username,
        secret: password,
        attributs: {
          email: email,
          given_name: firstName,
          family_name: lastName,
          locale: locale,
          gender: gender,
          "custom:artistName": artistName,
          "custom:instruments": JSON.stringify(instruments),
          "custom:defaultRoles": JSON.stringify(defaultRoles),
          "custom:groups": JSON.stringify(groupes),
          "custom:avatarImage": avatarImage,
          "custom:requestSource": requestSource
        }
      }, false, // n'est pas éditeur, par défaut
      ()=>{
        toast.success(`${firstName}, compte créé !`)
        utils.naviguerVersAccueil()
        if (this.props.fn) {
          this.props.fn()
        }
      })        
    } catch (err) {
      journal.error(NOM, err)
    }
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
      strength: zxcvbn(e.target.value).score
    });
  }

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      groups: [{ text: value, value }, ...prevState.groups]
    }));
  };

  handleChange = (e, { value }) => this.setState({ currentValue: value });

  handleRoleChange = (e, { value }) => this.setState({ defaultRoles: value });

  roleChange = (e, { value }) => this.setState({ currentRoleValue: value });

  handleConfirmPasswordChange(e) {
    this.setState({ confirmpassword: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.password !== nextProps.password) {
      this.setState({ password: nextProps.password });
    }
  }

  toggleConfirmShow() {
    this.setState({ confirmhidden: !this.state.confirmhidden });
  }

  componentDidMount() {
    let groups = [];
    let res = AyantsDroit.ayantsDroitBrut    
    let groupers = [];
    let groupsUnique = [];
    res.forEach(function (element) {
      groupers.push(element.groups);
      // Remove duplicates from multiple right holders and flattens arrays
      let GR = groupers
        .sort()
        .flat()
        .filter(Boolean);
      groupsUnique = [...new Set(GR)];
    });
    groupsUnique.forEach(function (elm) {
      groups.push({ key: elm, text: elm, value: elm });
    });
    this.setState({ groups: groups });

    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
    if (this.props.confirmpassword) {
      this.setState({ confirmpassword: this.props.confirmpassword });
    }
  }

  render() {

    const t = this.props.t, i18n = this.props.i18n

    let pochette = this.state.pochette ? "pochette" : "";

    const { password, strength, currentValue } = this.state;
    const passwordLength = password.length;

    const strengthClass = [
      "strength-meter mt-2",
      passwordLength > 0 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();

    const confirmClass = [
      "confirmPassword",
      strength >= 4 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();

    return (
      <Formik
        initialValues={{
          username: this.state.username,
          password: this.state.password,
          hidden: true,
          confirmpassword: this.state.confirmpassword,
          strength: this.state.strength
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values, () => {
            setSubmitting(false);
          });
        }}
      >
        {({ errors, touched, isValidating }) => (          
          <Form>
            {!this.state.patience && (
              <div class="ui grid">
                <div class="four column row">
                  <div class="right floated column">
                    <div className="top-login">
                      <div
                        onClick={() => {
                          // Le paramètre de la fonction afficher est le TYPE_ dans le fichier Connexion.js
                          this.props.parent.afficher(0);
                        }}
                        className={`connexion-inscription ${pochette}`}
                      >
                        {t("entete.connexion")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <header id="registerHeader">
                    {i18n.language && i18n.language.substring(0, 2) === "en" && (
                      <div>
                        <div className="registerHead">
                          <h1>
                            Create for free your <br />
                            profile on Smartsplit.
                          </h1>
                          <br />
                          <br />
                        </div>
                        <div className="registerPrompt">
                          <h3>
                            You're one click away to documenting your music{" "}
                            <br />
                            and share your rights with your contributors.
                          </h3>
                        </div>
                      </div>
                    )}
                    {i18n.language && i18n.language.substring(0, 2) !== "en" && (
                      <div>
                        <div className="lregisterHeade">
                          <h1>
                            Crée gratuitement
                            <br />
                            ton profil sur{" "}
                            {pochette ? "Pochette" : "Smartsplit"}.
                          </h1>
                          <br />
                          <br />
                        </div>
                        <div className="registerPrompt">
                          <h3>
                            Tu es à un clic de pouvoir documenter ta musique
                            {!pochette && (
                              <>
                                &nbsp;et de partager tes droits
                                <br /> avec tes collabos
                              </>
                            )}
                            .
                          </h3>
                        </div>
                      </div>
                    )}
                  </header>
                  <section className="section auth">
                    <div className="container">
                      <br></br>
                      <br></br>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%"
                        }}
                      >
                        <div style={{ width: "220px" }}>
                          <label>
                            {t(
                              "flot.split.collaborateur.attribut.etiquette.prenom"
                            )}
                          </label>
                          <br />
                          <input
                            type="text"
                            className="firstName register"
                            placeholder={t(
                              "flot.split.collaborateur.attribut.placeholder.prenom"
                            )}
                            value={this.state.firstName}
                            onChange={e =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </div>
                        <div style={{ width: "220px", marginLeft: "25px" }}>
                          <label>
                            {t(
                              "flot.split.collaborateur.attribut.etiquette.nom"
                            )}
                          </label>
                          <br />
                          <input
                            type="text"
                            className="lastName register"
                            placeholder={t(
                              "flot.split.collaborateur.attribut.placeholder.nom"
                            )}
                            value={this.state.lastName}
                            onChange={e =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </div>
                      </span>

                      <div className="ui row" style={{ marginTop: "30px" }}>
                        <span>
                          <label>
                            {t(
                              "flot.split.collaborateur.attribut.etiquette.artiste"
                            )}

                            <span
                              className="sous-titre"
                              style={{ margin: "0px" }}
                            >
                              {i18n.language &&
                                i18n.language.substring(0, 2) === "en" && (
                                  <InfoBulle
                                    pos={{ x: "250px", y: "350px" }}
                                    text={
                                      <p>
                                        For example, <i>Jay-Z</i> is the
                                        artist name of{" "}
                                        <em>Shawn Corey Carter</em>.
                                      </p>
                                    }
                                  />
                                )}
                              {i18n.language &&
                                i18n.language.substring(0, 2) !== "en" && (
                                  <InfoBulle
                                    pos={{ x: "250px", y: "350px" }}
                                    text={
                                      <p>
                                        Par exemple, <i>Jay-Z</i> est le nom
                                        d'artiste de{" "}
                                        <em>Shawn Corey Carter</em>.
                                      </p>
                                    }
                                  />
                                )}
                            </span>
                          </label>
                          <label
                            style={{
                              color: "grey",
                              float: "right",
                              fontWeight: "normal"
                            }}
                          >
                            {t(
                              "flot.split.collaborateur.attribut.etiquette.option"
                            )}
                          </label>
                        </span>
                        <br />

                        <input
                          type="text"
                          className="artistName"
                          placeholder={t(
                            "flot.split.collaborateur.attribut.indication.artiste"
                          )}
                          value={this.state.artistName}
                          onChange={e =>
                            this.setState({ artistName: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <div>
                          <div
                            className="ui row"
                            style={{ marginTop: "30px" }}
                          >
                            <label>
                              {t(
                                "flot.split.collaborateur.attribut.etiquette.groupe"
                              )}
                            </label>
                            <br />
                            <br />
                          </div>
                          <div className="ui row">
                            <Dropdown
                              icon="ui search icon"
                              id="prompt"
                              type="text"
                              style={{ maxHeight: "10px" }}
                              options={this.state.groups}
                              placeholder={t(
                                "flot.split.collaborateur.attribut.indication.groupe"
                              )}
                              search
                              multiple={true}
                              selection
                              fluid
                              allowAdditions
                              value={currentValue}
                              onAddItem={this.handleAddition}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="ui row" style={{ marginTop: "30px" }}>
                        <div className="field">
                          <div className="control">
                            <label htmlFor="username">
                              {t("flot.split.inscription.courriel")}
                            </label>
                            <br />
                            <Field
                              validate={this.validateUsername}
                              name="username"
                              id="username"
                              style={{ marginBottom: "20px" }}
                              aria-describedby="userNameHelp"
                              placeholder={t(
                                "flot.split.inscription.exemple"
                              )}
                              value={this.state.username}
                              required={true}
                            />
                          </div>
                          {errors.username && touched.username && (
                            <div className="invalide">
                              {t("flot.split.inscription.email-invalide")}{" "}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <label htmlFor="username">
                            {t("flot.split.inscription.courriel-confirm")}
                          </label>
                          <Field
                            onPaste={e => {
                              e.preventDefault();
                              return false;
                            }}
                            validate={val => {
                              this.validateUsername(val);
                            }}
                            name="confirmUsername"
                            id="confirmUsername"
                            aria-describedby="userNameHelp"
                            placeholder={t(
                              "flot.split.inscription.exemple"
                            )}
                            value={this.state.confirmEmail}
                            required={true}
                            onChange={e =>
                              this.setState({
                                confirmEmail: e.target.value
                              })
                            }
                          />
                          {errors.confirmusername && touched.username && (
                            <div style={{ color: "red" }}>
                              {t("flot.split.inscription.email-invalide")}{" "}
                            </div>
                          )}
                        </div>
                      </div>

                      <span>
                        <div className="field">
                          <div
                            className="control has-icons-left"
                            style={{ marginTop: "10px" }}
                          >
                            <label htmlFor="password">
                              {t("flot.split.inscription.motdepasse")}
                            </label>
                            <br />

                            <div className="input-wrapper">
                              <Field
                                validate={val => {
                                  this.validatePasswordStrong(val);
                                }}
                                type={
                                  this.state.hidden &&
                                    this.state.confirmhidden
                                    ? "password"
                                    : "text"
                                }
                                id="password"
                                name="password"
                                placeholder={t(
                                  "flot.split.inscription.password"
                                )}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                required={true}
                              />

                              <button
                                type="button"
                                id="hide"
                                tabindex="-1"
                                onClick={e => {
                                  e.preventDefault();
                                  this.toggleShow();
                                }}
                              >
                                <Eye
                                  actif={
                                    this.state.hidden &&
                                    this.state.confirmhidden
                                  }
                                />
                              </button>
                            </div>

                            {errors.password && touched.password && (
                              <div style={{ color: "red" }}>
                                {" "}
                                {t(
                                  "flot.split.inscription.password-invalide"
                                )}{" "}
                              </div>
                            )}
                            <span className="icon is-small is-left">
                              <i className="fas fa-lock" />
                            </span>
                          </div>
                        </div>
                      </span>
                      <div className={strengthClass}>
                        <div
                          className="strength-meter-fill"
                          data-strength={strength}
                        />
                      </div>
                      <div className={confirmClass}>
                        <div className="control has-icons-left confirmPassword">
                          <i className="fas fa-lock" />
                          <div className="input-wrapper">
                            <Field
                              onPaste={e => {
                                e.preventDefault();
                                return false;
                              }}
                              validate={val => {
                                this.validateConfirmPassword(val);
                              }}
                              type={
                                this.state.hidden &&
                                  this.state.confirmhidden
                                  ? "password"
                                  : "text"
                              }
                              id="confirmpassword"
                              name="confirmpassword"
                              placeholder={t(
                                "flot.split.inscription.password-confirm"
                              )}
                              value={this.state.confirmpassword}
                              onChange={this.handleConfirmPasswordChange}
                              required={true}
                            />
                            <button
                              type="button"
                              id="hide-confirm"
                              tabindex="-1"
                              onClick={e => {
                                e.preventDefault();
                                this.toggleConfirmShow();
                              }}
                            >
                              <Eye
                                actif={
                                  this.state.confirmhidden &&
                                  this.state.hidden
                                }
                              />
                            </button>
                          </div>
                          {errors.confirmpassword &&
                            touched.confirmpassword && (
                              <div style={{ color: "red" }}>
                                {" "}
                                {t("inscription.correspond")}
                              </div>
                            )}
                          <span className="icon is-small is-left">
                            <i className="fas fa-lock" />
                          </span>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
                          <div className="container">
                            <div className="control">
                              <div>
                                <button
                                  className={`ui medium button register is-success ${pochette} ${
                                    !this.state.password ||
                                      this.state.confirmpassword !==
                                      this.state.password
                                      ? "disabled"
                                      : ""
                                    }`}
                                  type="submit"
                                  onClick={e => {
                                    if (
                                      this.state.confirmpassword !==
                                      this.state.password
                                    ) {
                                      e.preventDefault();
                                    } else {
                                      this.closeModal();
                                    }
                                  }}
                                >
                                  {t(
                                    "flot.split.collaborateur.attribut.bouton.parti"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </Form>            
        )}
      </Formik>
    )
  }
}

export default withTranslation()(Register)