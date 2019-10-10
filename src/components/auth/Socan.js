import React, { Component } from "react";
import "./Socan.css";
import { toast } from "react-toastify";
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
import { Translation } from "react-i18next";
import { DateInput } from "semantic-ui-calendar-react";

const divStyle = {
  padding: "0 0 0 15px"
};

/*const provinceOptions = [
  {
    key: 'Alberta',
    text: 'Alberta',
    value: 'AB',
  },
  {
    key: 'British Columbia',
    text: 'British Columbia',
    value: 'BC',
  },
  {
    key: 'Manitoba',
    text: 'Manitoba',
    value: 'MB',
  },
  {
    key: 'New Brunswick',
    text: 'New Brunswick',
    value: 'NB',
  },
  {
    key: 'Newfoundland and Labrador',
    text: 'Newfoundland and Labrador',
    value: 'NL',
  },
  {
    key: 'Northwest Territories',
    text: 'Northwest Territories',
    value: 'NT',
  },
  {
    key: 'Nova Scotia',
    text: 'Nova Scotia',
    value: 'NS',
  },
  {
    key: 'Nunavut',
    text: 'Nunavat',
    value: 'NU',
  },
  {
    key: 'Ontario',
    text: 'Ontario',
    value: 'ON',
  },
  {
    key: 'Prince Edward Island',
    text: 'Prince Edward Island',
    value: 'PE',
  },
  {
    key: 'Québec',
    text: 'Québec',
    value: 'QC',
  },
  {
    key: 'Saskatchewan',
    text: 'Saskatchewan',
    value: 'SK',
  },
  {
    key: 'Yukon Territory',
    text: 'Yukon Territory',
    value: 'YT',
  }
]*/

class Socan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      date: "",
      image: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      verifyEmail: "",
      password: "",
      verifyPassword: "",
      userId: "",
      terms: "Y",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      province: "QC",
      country: "CAN",
      currentCountryValue: "",
      currentProvinceValue: ""
    };
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = () => {
    this.setState({ open: false });
    if (this.props.onClose) this.props.onClose();
  };

  handleProvinceChange = (e, { value }) =>
    this.setState({ currentProvinceValue: value });

  handleCountryChange = (e, { value }) =>
    this.setState({ currentCountryValue: value });

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ date: value });
    }
  };

  handleSubmit = values => {
    let body = {
      GIVEN_NAMES: this.state.firstName,
      MIDDLE_NAME: this.state.middleName,
      LAST_NAME: this.state.lastName,
      DATE_OF_BIRTH: this.state.date,
      STREET1: this.state.address,
      CITY: this.state.city,
      PROVINCE: this.state.province,
      COUNTRY: "CAN", // TODO add multiple countries as option
      POSTAL_CODE: this.state.postalCode,
      PHONE_NO1: this.state.phone,
      TERMS: "Y", // TODO Set based on terms checkbox
      USER_ID: this.state.userId,
      EMAIL_ADDRESS: this.state.email,
      EMAIL_ADDRESS_VERIFY: this.state.verifyEmail,
      PASSWORD: this.state.password,
      PASSWORD_VERIFY: this.state.verifyPassword,
      HEAR_OF_SOCAN: "Other",
      LANGUAGE_PREFERENCE: "E" // TODO switch to local
    };

    try {
      axios.post('http://api.smartsplit.org:8080/v1/socan/join', body)
      .then(
        function (response) {
          console.log("RESPONSE: ", response)
          toast.success(`Application sent to SOCAN API, check your email!`)
        }
      )
      .catch((err)=>{
        toast.error(err.message)
        console.log(err)
      })
      .finally(()=>{
        if(this.props.fn) {
          this.props.fn()
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
    }
  }

  render() {
    const {
      open,
      closeOnDimmerClick,
      currentProvinceValue,
      currentCountryValue,
      terms
    } = this.state;

    return (
      <Translation>
        {(t, i18n) => (
          <Modal
            style={{ margin: "0 40px 0 40px" }}
            open={open}
            closeOnDimmerClick={closeOnDimmerClick}
            onClose={this.close}
            size="small"
            closeIcon
          >
            <Modal.Header>
              <div
                className="titre-socan"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  margin: "10px 0 10px 50px"
                }}
              >
                {t("socan.joindre")}
              </div>
            </Modal.Header>
            <br></br>
            <div className="input-container">
              <input
                type="text"
                className="firstName"
                placeholder={t("socan.prenom")}
                value={this.state.firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
              />
              <br></br>
              <input
                type="text"
                className="lastName"
                placeholder={t("socan.nom")}
                value={this.state.lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
              />
              <br></br>
              <input
                type="text"
                className="middleName"
                placeholder={t("socan.2eprenom")}
                value={this.state.middleName}
                onChange={e => this.setState({ middleName: e.target.value })}
              />
              <br></br>
              <DateInput
                style={{ color: "#c6c8ca" }}
                className="date"
                name="date"
                placeholder={t("socan.date")}
                value={this.state.date}
                onChange={this.handleChange}
                icon="calendar outline"
              />
              <input
                type="text"
                className="address"
                placeholder={t("socan.adresse")}
                value={this.state.address}
                onChange={e => this.setState({ address: e.target.value })}
              />
              <br></br>
              <input
                type="text"
                className="city"
                placeholder={t("socan.ville")}
                value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}
              />
              <br></br>
              {/*<Dropdown placeholder={t('socan.province')} search selection options={provinceOptions} onChange={this.handleProvinceChange}/>*/}
              <div class="ui form">
                <div class="province">
                  <select
                    multiple=""
                    className="ui dropdown"
                    style={{ color: "#c6c8ca" }}
                  >
                    <option value="" style={divStyle}>
                      Province
                    </option>
                    <option value="AB">Alberta</option>
                    <option value="BC">{t("socan.province.BC")}</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">{t("socan.province.NB")}</option>
                    <option value="NL">{t("socan.province.NL")}</option>
                    <option value="NT">{t("socan.province.NT")}</option>
                    <option value="NS">{t("socan.province.NS")}</option>
                    <option value="NU">Nunavut</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">{t("socan.province.PE")}</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="YT">Yukon</option>
                  </select>
                </div>
              </div>

              <input
                type="text"
                className="postalCode"
                placeholder={t("socan.codepostal")}
                value={this.state.postalCode}
                onChange={e => this.setState({ postalCode: e.target.value })}
              />
              <br></br>
              <input
                type="text"
                className="phone"
                placeholder={t("socan.telephone")}
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
              />
              <br></br>
              <input
                type="text"
                className="email"
                placeholder={t("socan.courriel")}
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <br></br>
              <input
                type="text"
                className="verifyEmail"
                placeholder={t("socan.confirmation-courriel")}
                value={this.state.verifyEmail}
                onChange={e => this.setState({ verifyEmail: e.target.value })}
              />
              <br></br>
              <input
                type="text"
                className="userId"
                placeholder={t("socan.utilisateur")}
                value={this.state.userId}
                onChange={e => this.setState({ userId: e.target.value })}
              />
              <br></br>
              <input
                type="password"
                className="password"
                placeholder={t("socan.mot-de-passe")}
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <br></br>
              <input
                type="password"
                className="verifyPassword"
                placeholder={t("socan.confirmation-mot-de-passe")}
                value={this.state.verifyPassword}
                onChange={e =>
                  this.setState({ verifyPassword: e.target.value })
                }
              />
              <Checkbox
                label={
                  <label>
                    <a
                      style={{ color: "black" }}
                      target="_blank"
                      href={
                        i18n.lng &&
                        (i18n.lng.substring(0, 2) === "en"
                          ? "https://www.socan.com/WriterApplicant/terms-conditions-of-membership/"
                          : "https://www.socan.com/WriterApplicant/fr/conditions-dadhesion/")
                      }
                    >
                      {t("socan.condition")}
                    </a>
                  </label>
                }
                key={terms}
                value={this.state.terms}
              />
            </div>
            <Modal.Actions>
              <Button onClick={this.close} negative>
                {t("socan.bouton.annuler")}
              </Button>
              <Button
                onClick={this.handleSubmit}
                positive
                icon="checkmark"
                labelPosition="right"
                content={t("socan.joindre")}
              />
            </Modal.Actions>
          </Modal>
        )}
      </Translation>
    );
  }
}

export default Socan;
