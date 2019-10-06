import React, { Component } from "react";
import "./ModifyUser.css";
import axios from "axios";
import {
  Button,
  Header,
  Image,
  Modal,
  Checkbox,
  Dropdown,
  Input,
  Label
} from "semantic-ui-react";
import { withTranslation, Translation } from "react-i18next";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";

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
      currentRoleValue: []
    };

    // BIND TODO
    this.click = this.click.bind(this);
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  //close = () => this.setState({ open: false })

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
    console.log("image: ", this.state.image);
  }

  handleFileUpload(e) {
    console.log("FILE: ", e.target.files[0]);
    if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      return alert("Image is loo large - 10Mb maximum");
    }
    if (!e.target.files[0].type.includes("image/jpeg")) {
      return alert("Wrong file type - JPG only.");
    }
    this.setState({
      image: "https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg"
    });
  }

  click() {
    this.handleSubmit();
    if (this.props.close) {
      this.props.close();
    }
  }

  randomPassword(length) {
    let chars =
      "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890";
    let password = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      password += chars.charAt(i);
    }
    return password;
  }

  handleSubmit = values => {
    let attributes = {
      email: this.state.email,
      given_name: this.state.firstName,
      family_name: this.state.lastName,
      "custom:artistName": this.state.artistName,
      "custom:defaultRoles": JSON.stringify(this.state.currentRoleValue),
      "custom:instruments": JSON.stringify(this.state.instruments),
      "custom:groups": JSON.stringify(this.state.currentValue),
      "custom:avatarImage": this.state.avatarImage
    };
    let username = this.state.email;
    let password = this.randomPassword(16);

    try {
      Auth.signUp({
        username,
        password,
        attributes: attributes
      })
        .then((res) => {
          console.log(res)
          this.setState({open: false})
          if (this.props.fn) {
            this.props.fn(res.userSub);
          }
        })
        .catch(err => {
          toast.error(err);
          console.log(err);
        });
    } catch (err) {
      console.log("try", err);
    }
  };

  onTodoChange(value) {
    this.setState({
      firstName: value
    });
  }

  componentDidMount() {
    let groups = [];
    axios
      .get("http://dev.api.smartsplit.org:8080/v1/rightHolders")
      .then(res => {
        let groupers = [];
        let groupsUnique = [];
        res.data.forEach(function(element) {
          groupers.push(element.groups);
          // Remove duplicates from multiple right holders and flattens arrays
          let GR = groupers
            .sort()
            .flat()
            .filter(Boolean);
          groupsUnique = [...new Set(GR)];
        });
        groupsUnique.forEach(function(elm) {
          groups.push({ key: elm, text: elm, value: elm });
        });
        this.setState({ groups: groups });
      })
      .catch(err => {
        console.log(err);
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
      closeOnDimmerClick,
      currentValue,
      currentRoleValue
    } = this.state;

    return (
      <Translation>
        {t => (
          <Modal
            open={open}
            closeOnEscape={true}
            closeOnDimmerClick={false}
            onClose={this.props.close}
            size="small"
          >
            <Modal.Header className="Titre">
              <div className="ui row" style={{ margin: "20px 0 20px 65px" }}>
                <strong>{t("collaborateur.titre")}</strong>
              </div>
            </Modal.Header>

            <div className="ui row" style={{ marginTop: "30px" }}>
              <div className="input-container">
                <div className="userContainer">
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%"
                    }}
                  >
                    <div style={{ width: "220px" }}>
                      <label htmlFor="prenom">
                        <strong>
                          {t("collaborateur.attribut.etiquette.prenom")}
                        </strong>
                      </label>
                      <input
                        type="text"
                        className="firstName"
                        placeholder={t(
                          "collaborateur.attribut.etiquette.prenom"
                        )}
                        value={this.state.firstName}
                        onChange={e => this.onTodoChange(e.target.value)}
                        style={{ marginRight: "5px" }}
                      />
                    </div>
                    <div style={{ width: "220px" }}>
                      <label>
                        <strong>
                          &nbsp;&nbsp;
                          {t("collaborateur.attribut.etiquette.nom")}
                        </strong>
                      </label>
                      <input
                        type="text"
                        className="lastName"
                        placeholder={t("collaborateur.attribut.etiquette.nom")}
                        value={this.state.lastName}
                        onChange={e =>
                          this.setState({ lastName: e.target.value })
                        }
                        style={{ marginLeft: "5px" }}
                      />
                    </div>
                  </span>
                </div>

                <div className="ui row" style={{ marginTop: "30px" }}>
                  <span>
                    <label>
                      <strong>
                        {t("collaborateur.attribut.etiquette.artiste")}
                      </strong>
                    </label>
                    <label style={{ float: "right", color: "gray" }}>
                      {t("collaborateur.attribut.etiquette.option")}
                    </label>
                  </span>
                  <input
                    type="text"
                    className="artistName"
                    placeholder={t("collaborateur.attribut.etiquette.artiste")}
                    value={this.state.artistName}
                    onChange={e =>
                      this.setState({ artistName: e.target.value })
                    }
                  />
                  <div
                    className="sous titre"
                    style={{ color: "gray", fontSize: "small" }}
                  >
                    {t("collaborateur.attribut.etiquette.na")}
                  </div>
                </div>

                <div className="ui row" style={{ marginTop: "30px" }}>
                  <label>
                    <strong>
                      {t("collaborateur.attribut.etiquette.courriel")}
                    </strong>
                  </label>
                  <input
                    type="text"
                    className="email"
                    placeholder={t("collaborateur.attribut.etiquette.courriel")}
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>

                <div className="ui row" style={{ marginTop: "30px" }}>
                  <label>
                    <strong>
                      {t("collaborateur.attribut.etiquette.groupe")}
                    </strong>
                  </label>
                  <span>
                    <Dropdown
                      icon="search"
                      id="prompt"
                      type="text"
                      options={this.state.groups}
                      placeholder={t(
                        "collaborateur.attribut.indication.groupe"
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

                <div className="ui row" style={{ marginTop: "30px" }}>
                  <label>
                    <strong>
                      {t("collaborateur.attribut.etiquette.role")}
                    </strong>
                  </label>
                  <Dropdown
                    id="roles"
                    type="text"
                    options={[
                      {
                        key: t("flot.split.roles.principal"),
                        text: "Principal",
                        value: "Principal"
                      },
                      {
                        key: t("flot.split.roles.accompaniment"),
                        text: "Accompaniment",
                        value: "Accompaniment"
                      },
                      {
                        key: t("flot.split.roles.songwriter"),
                        text: "Songwriter",
                        value: "Songwriter"
                      },
                      {
                        key: t("flot.split.roles.composer"),
                        text: "Composer",
                        value: "Composer"
                      },
                      {
                        key: t("flot.split.roles.remixer"),
                        text: "Remixer",
                        value: "Remixer"
                      },
                      {
                        key: t("flot.split.roles.studio"),
                        text: "Studio",
                        value: "Studio"
                      },
                      {
                        key: t("flot.split.roles.publisher"),
                        text: "Publisher",
                        value: "Publisher"
                      },
                      {
                        key: t("flot.split.roles.graphist"),
                        text: "Graphist",
                        value: "Graphist"
                      },
                      {
                        key: t("flot.split.roles.producer"),
                        text: "Producer",
                        value: "Producer"
                      },
                      {
                        key: t("flot.split.roles.singer"),
                        text: "Singer",
                        value: "Singer"
                      },
                      {
                        key: t("flot.split.roles.musician"),
                        text: "Musician",
                        value: "Musician"
                      }
                    ]}
                    placeholder={t("collaborateur.attribut.indication.role")}
                    search
                    multiple={true}
                    selection
                    fluid
                    value={currentRoleValue}
                    onChange={this.roleChange}
                  />
                  <div
                    className="sous titre"
                    style={{ color: "gray", fontSize: "small" }}
                  >
                    {t("collaborateur.attribut.indication.role2")}
                  </div>
                </div>

                <br></br>
              </div>
            </div>
            <Modal.Actions>
              <Button onClick={this.props.close} negative>
                {t("collaborateur.attribut.bouton.annuler")}
              </Button>
              <Button
                onClick={this.click}
                positive
                icon="checkmark"
                labelPosition="right"
                content={t("collaborateur.attribut.bouton.sauvegarder")}
              />
            </Modal.Actions>
          </Modal>
        )}
      </Translation>
    );
  }
}
export default withTranslation()(ModifyUser);
