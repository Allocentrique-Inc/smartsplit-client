import React, { Component } from "react";
// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { Translation } from "react-i18next";

//import { withTranslation } from "react-i18next";

const passwordStyle = {
  display: "block",
  width: "464px",
  fontFamily: "IBM Plex Sans",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  position: "isAbsolute",
  margin: "20px 20px 60px 70px"
};

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {
      cognito: null,
      blankfield: false
    }
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

    // Form validation
    // this.clearErrorState();
    // const error = Validate(event, this.state);
    // if (error) {
    //   this.setState({
    //     errors: { ...this.state.errors, ...error }
    //   });
    // }

    // AWS Cognito integration here
    try {
      await Auth.forgotPassword(this.state.email);
      this.props.history.push("/forgot-password-verification");
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

  render() {
    //const { t } = this.props;

    return (
      <Translation className="section auth">
        {t => (
          <React.Fragment>
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
                    right: "25px"
                  }}
                >
                  {t("entete.connexion")}
                </div>
              </span>
            )}
            {!this.state.patience && (
              <span
                className="top-register"
                style={{
                  color: "#2DA84F",
                  cursor: "pointer"
                }}
              >
                <div
                  onClick={() => {
                    // Le paramètre de la fonction afficher est le TYPE_ dans le fichier Connexion.js
                    this.props.parent.afficher(1);
                  }}
                >
                  {t("entete.inscription")}
                </div>
              </span>
            )}
            <div className="containerPassword" style={passwordStyle}>
              <h1
                style={{
                  passwordStyle,
                  marginLeft: "10px",
                  fontWeight: "normal"
                }}
              >
                {t("flot.split.auth.oublier.titre")}
              </h1>
              <p>{t("flot.split.auth.oublier.preambule")}</p>
              {/* <FormErrors formerrors={this.state.errors} /> */}

              <form onSubmit={this.forgotPasswordHandler}>
                <div
                  className="field"
                  style={{
                    passwordStyle,
                    fontWeight: "normal"
                  }}
                >
                  <p className="control has-icons-left has-icons-right">
                    <input
                      type="email"
                      className="input"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onInputChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control"></p>
                </div>
                <div className="field">
                  <p className="control">
                    <button
                      className="ui medium button is-success"
                      style={{ position: "relative", left: "350px" }}
                    >
                      {t("collaborateur.attribut.bouton.soumettre")}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </React.Fragment>
        )}
      </Translation>
    );
  }
}

export default ForgotPassword;
