import React, { Component } from "react"
import Dropzone from "react-dropzone"
import axios from "axios"
import FormData from "form-data"
import BlockUi from "react-block-ui"
import "react-block-ui/style.css"
import { toast } from "react-toastify"
import { withTranslation } from "react-i18next"
import { config } from '../../utils/application'

export class ChampTeleversement extends Component {

  constructor(props) {
    super(props);
    this.bloquerDebloquer = this.bloquerDebloquer.bind(this);
    this.state = {
      indication: props.indication,
      bloquer: false,
      pochette: props.pochette
    }
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
    const t = this.props.t
    return (      
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
                  .post(`${config.FICHIERS_SRV_URL}envoi`, fd)
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
    )
  }
}
export default withTranslation()(ChampTeleversement)