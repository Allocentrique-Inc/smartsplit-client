import React, { Component } from "react";
import { Translation } from "react-i18next";
import { Modal } from "semantic-ui-react";

class ChoosePasswordVerification extends Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {t => (
            <section className="section auth">
              <div className="container">
                <div
                  style={{ FontFamily: "IBM Plex Sans", fontSize: "16px" }}
                >
                  <div className="ui row">
                    <div className="ui fourteen wide column">
                      <h2>
                        &nbsp;&nbsp;{t("flot.split.auth.passwordchanged.titre")}
                      </h2>

                      <p>{t("flot.split.auth.passwordchanged.indication")}</p>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <Modal
                      trigger={
                        <button
                          className="ui medium  button login is-success"
                          onClick={() => (window.location.href = "/accueil")}
                        >
                          {t("entete.connexion")}
                        </button>
                      }
                      onClose={this.handleClose}
                      size="small"
                    >
                      <Modal.Content>
                      </Modal.Content>
                    </Modal>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Translation>
      </React.Fragment>
    );
  }
}

export default ChoosePasswordVerification;
