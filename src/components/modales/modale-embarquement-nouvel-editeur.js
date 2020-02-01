import React, { Component } from "react"
import axios from "axios"
import {
  Button,
  Modal,
  Dropdown
} from "semantic-ui-react"
import { withTranslation } from "react-i18next"
import { Identite, config, AyantsDroit, journal } from "../../utils/application"

// eslint-disable-next-line
const NOM = "ModaleEmbarquementEntreprise"

class ModaleEmbarquementEntreprise extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      avatarImage: "image.jpg",
      open: props.open,
      currentValue: [props.firstName],
      locale: navigator.language || navigator.userLanguage,
      gender: "initiatorCreatedUser"  // Cognito Default Attribute Gender used as flag for user creation
    };

    this.click = this.click.bind(this)
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  };

  handleAddition = (e, { value }) => {    
    this.setState(prevState => ({
      groups: [{ text: value, value }, ...prevState.groups]
    }))
  }

  handleChange = (e, { value }) => this.setState({ currentValue: value })

  handleRoleChange = (e, { value }) => this.setState({ defaultRoles: value });

  roleChange = (e, { value }) => this.setState({ currentRoleValue: value });

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
    this.setState({ currentValue: [] })
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
    let attributes = {
      email: this.state.email,
      given_name: this.state.firstName || "Unnamed",
      family_name: this.state.lastName || "Unnamed",
      locale: this.state.locale || "fr",
      gender: this.state.gender,
      "custom:groups": JSON.stringify(groupes),
      "custom:avatarImage": this.state.avatarImage,
      "custom:requestSource": "smartsplit"
    }
    let username = this.state.email
    let password = this.randomPassword()
    Identite.enregistrement({utilisateur: username, secret: password, attributs: attributes},
      res => {        
        journal.info(NOM, res)
        axios.patch(`${config.API_URL}rightHolders/${res}/editeur`, {editeur: true})
        .then(async ret=>{          
          await AyantsDroit.rafraichirListe( ()=>{
            this.fermerModale()
            if (this.props.fn) {              
              this.props.fn(res)
            }
          })
        })
        .catch(err=>journal.error(NOM, err))        
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
      this.setState({ currentValue: [nextProps.firstName] })
    }
  }

  render() {    
    const t = this.props.t
    if(this.state.currentValue && this.state.currentValue.length > 0) {
      let option = this.state.currentValue[0]
      if(!this.state.groups.includes(option)) {
        this.state.groups.push({text: option, value: option})
      }
    }
    return (      
      <Modal
        className="modal collabo"
        open={this.state.open}
        closeOnEscape={true}
        closeOnDimmerClick={false}
        onClose={this.props.close}
        size="small"
      >
        <Modal.Header className="Titre">
          <div className="ui row titre">
            <strong>{t("collaborateur.titreEntreprise")}</strong>
          </div>
        </Modal.Header>

        <div className="ui container">
          <div className="input-container">
            <div className="ui row group">
              <label>
                <strong>
                  {t("flot.split.collaborateur.attribut.etiquette.entreprise")}
                </strong>
              </label>
              <span>
                {
                  this.state.currentValue && this.state.currentValue.length > 0 && (
                    <Dropdown
                      icon="search"
                      id="prompt"
                      type="text"
                      options={this.state.groups}
                      placeholder={t(
                        "flot.split.collaborateur.attribut.indication.entreprise"
                      )}
                      search
                      multiple={true}
                      selection
                      fluid
                      allowAdditions
                      value={this.state.currentValue}
                      onAddItem={this.handleAddition}
                      onChange={this.handleChange}
                    />
                  )
                }
              </span>
            </div>
            <div className="ui row courriel">
              <span className="etiquettes">
                <div className="etiquettePrenom">
                  <label htmlFor="prenom">
                    <strong>
                      {t("flot.split.collaborateur.attribut.etiquette.responsable")}
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
            <div className="ui row courriel" style={{paddingBottom: "40px"}}>
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
export default withTranslation()(ModaleEmbarquementEntreprise)
