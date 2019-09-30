import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import FormData from "form-data";

// Bloquer l'interactivité utilisateur
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

// Alertes
import { toast } from "react-toastify";
import { Translation } from "react-i18next";

export class ChampTeleversement extends Component {
  constructor(props) {
    super(props);
    this.bloquerDebloquer = this.bloquerDebloquer.bind(this);

    this.state = {
      indication: props.indication,
      bloquer: false
    };
  }

  bloquerDebloquer() {
    this.setState({ bloquer: !this.state.bloquer });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.indication !== nextProps.indication) {
      this.setState({ indication: nextProps.indication });
    }
    if (this.props.audio !== nextProps.audio) {
      this.setState({ audio: nextProps.audio });
    }
  }

  render() {
    return (
      <Translation>
        {t => (
          <div>
            <BlockUi tag="div" blocking={this.state.bloquer}>
              <Dropzone
                onDrop={fichiers => {
                  toast.info(t("navigation.transfertEnCours"));
                  this.bloquerDebloquer();
                  this.props.chargement(fichiers);

                  fichiers.forEach(fichier => {
                    // Redémarre le lecteur audio
                    this.props.audio.stopEtJouer(fichier);

                    let fd = new FormData();
                    fd.append("file", fichier);

                    axios
                      .post("http://envoi.smartsplit.org:3033/envoi", fd)
                      .then(res => {
                        this.props.apres(res.data);
                      })
                      .catch(err => {
                        toast.error(
                          t(
                            "flot.split.documente-ton-oeuvre.envoifichier.echec"
                          ) + ` ${fichier.name}`
                        );
                      })
                      .finally(() => {
                        this.bloquerDebloquer();
                      });
                  });
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div className="drop-zone" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <br />
                      <p>{this.state.indication}</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </BlockUi>
          </div>
        )}
      </Translation>
    );
  }
}
