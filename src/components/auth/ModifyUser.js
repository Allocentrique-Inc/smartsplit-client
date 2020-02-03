import React, { Component } from "react";
import "./ModifyUser.css";
import axios from "axios";
import {
  Button,
  Modal,
  Dropdown
} from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import InfoBulle from '../partage/InfoBulle';
import { Identite, config, AyantsDroit, journal } from "../../utils/application";

const MAX_IMAGE_SIZE = 10000000;

class ModifyUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      image: "",
      firstName: "",
      lastName: "",
      artistName: props.firstName,
      email: "",
      avatarImage: "image.jpg",
      instruments: [],
      open: props.open,
      defaultRoles: [],
      currentValue: [],
      currentRoleValue: [],
      locale: navigator.language || navigator.userLanguage,
      gender: "initiatorCreatedUser"  // Cognito Default Attribute Gender used as flag for user creation
    };

    // BIND TODO
    this.click = this.click.bind(this);
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      groups: [{ text: value, value }, ...prevState.groups]
    }));
  };

  handleChange = (e, { value }) => this.setState({ currentValue: value });

  handleRoleChange = (e, { value }) => this.setState({ defaultRoles: value });

  roleChange = (e, { value }) => this.setState({ currentRoleValue: value });

  handleFileDelete(e) {
    e.target.value = null;
    this.setState({ image: "" });
  }

  handleFileUpload(e) {
    if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      return alert("Image is loo large - 10Mb maximum");
    }
    if (!e.target.files[0].type.includes("image/jpeg")) {
      return alert("Wrong file type - JPG only.");
    }
    this.setState({
      image: `${config.IMAGE_SRV_URL}faceapp.jpg`
    });
  }

  click() {
    this.handleSubmit();
    if (this.props.close) {
      this.props.close();
    }
  }

  randomPassword() {
    let randomString = "QmlxdWV0dGUjMSE="
    let payload = Buffer.from(randomString, 'base64').toString('ascii');
    return payload
  }

  fermerModale() {
    // Réinitialiser les valeurs du formulaire
    this.setState({ groups: [] })
    this.setState({ image: "" })
    this.setState({ firstName: "" })
    this.setState({ lastName: "" })
    this.setState({ email: "" })
    this.setState({ defaultRoles: [] })
    this.setState({ currentValue: [] })
    this.setState({ currentRoleValue: [] })
    this.setState({ instruments: [] })
    this.setState({ open: false })
  }

  handleSubmit = values => {
    // S'il n'y a pas de groupe, un en créé un éponyme, si non c'est un anonyme
    let groupes = this.state.currentValue
    if (groupes.length === 0) {
      let nom = this.state.artistName ? this.state.artistName : `${this.state.firstName} ${this.state.lastName}`
      if (nom.trim() === "") {
        nom = "Anonyme"
      }
      groupes.push(nom)
    }
    let source = window.location.href
    let attributes = {
      email: this.state.email,
      given_name: this.state.firstName || "Unnamed",
      family_name: this.state.lastName || "Unnamed",
      locale: this.state.locale || "fr",
      gender: this.state.gender,
      "custom:artistName": this.state.artistName,
      "custom:defaultRoles": JSON.stringify(this.state.currentRoleValue),
      "custom:instruments": JSON.stringify(this.state.instruments),
      "custom:groups": JSON.stringify(groupes),
      "custom:avatarImage": this.state.avatarImage,
      "custom:requestSource": ((source.includes("pochette")) ? "pochette" : "smartsplit")
    }
    let username = this.state.email
    let password = this.randomPassword()
    Identite.enregistrement({utilisateur: username, secret: password, attributs: attributes},
      false,
      async (rightHolderId) => {        
        await AyantsDroit.rafraichirListe( ()=>{
          this.fermerModale()            
          if (this.props.fn) {
            this.props.fn(rightHolderId)
          }
        })
      }
    )
  }

  onTodoChange(value) {
    this.setState({
      firstName: value
    });
  }

  componentDidMount() {
    let groups = [];
    axios
      .get(`${config.API_URL}entities`)
      .then(res => {
        res.data.forEach(g => {
          groups.push({ key: g.uuid, text: g.name, value: g.name })
        })
        this.setState({ groups: groups });
      })
      .catch(err => {
        journal.error(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
    }
    if (this.props.firstName !== nextProps.firstName) {
      this.setState({ artistName: nextProps.firstName });
    }
  }

  render() {
    const {
      open,
      currentValue
    } = this.state
    const t = this.props.t
    return (      
      <Modal
        className="modal collabo"
        open={open}
        closeOnEscape={true}
        closeOnDimmerClick={false}
        onClose={this.props.close}
        size="small"
      >
        <Modal.Header className="Titre">
          <div className="ui row titre">
            <strong>{t("collaborateur.titre")}</strong>
          </div>
        </Modal.Header>

        <div className="ui row container">
          <div className="input-container">
            <div className="userContainer">
              <span className="etiquettes">
                <div className="etiquettePrenom">
                  <label htmlFor="prenom">
                    <strong>
                      {t("flot.split.collaborateur.attribut.etiquette.prenom")}
                    </strong>
                  </label>
                  <input
                    type="text"
                    required
                    className="newFirstName"
                    placeholder={t(
                      "flot.split.collaborateur.attribut.etiquette.placeholder.prenom"
                    )}
                    value={this.state.firstName}
                    onChange={e => this.onTodoChange(e.target.value)}
                  />
                </div>
                <div className="etiquetteNom">
                  <label>
                    <strong>
                      &nbsp;&nbsp;
                      {t("flot.split.collaborateur.attribut.etiquette.nom")}
                    </strong>
                  </label>
                  <input
                    type="text"
                    required
                    className="newLastName"
                    placeholder={t("flot.split.collaborateur.attribut.etiquette.placeholder.nom")}
                    value={this.state.lastName}
                    onChange={e =>
                      this.setState({ lastName: e.target.value })
                    }
                  />
                </div>
              </span>
            </div>

            <div className="ui row artiste">
              <label>
                <strong>
                  {t("flot.split.collaborateur.attribut.etiquette.artiste")}
                </strong>
              </label>
              <InfoBulle text={t("flot.split.collaborateur.attribut.etiquette.na")}
                pos={{ x: 220, y: 200 }}
              />
              <label className="option">
                {t("flot.split.collaborateur.attribut.etiquette.option")}
              </label>
              <input
                type="text"
                className="newArtistName"
                placeholder={t("flot.split.collaborateur.attribut.etiquette.placeholder.artiste")}
                value={this.state.artistName}
                onChange={e =>
                  this.setState({ artistName: e.target.value })
                }
              />
            </div>

            <div className="ui row group">
              <label>
                <strong>
                  {t("flot.split.collaborateur.attribut.etiquette.groupe")}
                </strong>
              </label>
              <span>
                <Dropdown
                  icon="search"
                  id="prompt"
                  type="text"
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
              </span>
            </div>
            <div className="ui row courriel">
              <label>
                <strong>
                  {t("flot.split.collaborateur.attribut.etiquette.courriel")}
                </strong>
              </label>
              <input
                type="text"
                required
                className="Email"
                placeholder={t("flot.split.collaborateur.attribut.etiquette.courriel")}
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>                
          </div>
        </div>
        <Modal.Actions>
          <Button onClick={this.props.close} negative>
            {t("flot.split.collaborateur.attribut.bouton.annuler")}
          </Button>
          <Button
            onClick={this.click}
            positive
            icon="checkmark"
            labelPosition="right"
            content={t("flot.split.collaborateur.attribut.bouton.sauvegarder")}
          />         
        </Modal.Actions>
      </Modal>       
    )
  }
}
export default withTranslation()(ModifyUser)
