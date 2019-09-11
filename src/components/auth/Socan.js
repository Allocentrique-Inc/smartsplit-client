import React, { Component } from 'react';
import './Register.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Button, Header, Image, Modal, Checkbox, Dropdown, Input, Label} from 'semantic-ui-react'
import { Translation } from 'react-i18next';
import { DateInput } from "semantic-ui-calendar-react";

// TODO GET SECRETS and KEYS from AWS Parameter Store
const apiKey = '';
const accessToken = '';
const refreshToken = '';
const tokenType = 'Bearer ';
const passwordSOCAN = '';
const client_secret = '';

class Socan extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      date: '',
      image:'',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      verifyEmail: '',
      password: '',
      verifyPassword: '',
      userId: '',
      open: false,
      terms: 'Y',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      province: 'QC',
      country: 'CAN',
      currentCountryValue: '',
      currentProvinceValue: ''
    };
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => this.setState({ open: false })

  handleProvinceChange = (e, { value }) => this.setState({ currentProvinceValue: value })
  
  handleCountryChange = (e, { value }) => this.setState({ currentCountryValue: value })

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ date: value });
    }
  }

  handleSubmit = values => {
    let body = {
      GIVEN_NAMES: this.state.firstName,
      MIDDLE_NAME: this.state.middleName,
      LAST_NAME: this.state.lastName,
      DATE_OF_BIRTH: this.state.date,
      STREET1: this.state.address,
      CITY: this.state.city,
      PROVINCE: this.state.province,
      COUNTRY: this.state.country,
      POSTAL_CODE: this.state.postalCode,
      PHONE_NO1: this.state.phone,
      TERMS: 'Y',
      USER_ID: this.state.userId,
      EMAIL_ADDRESS: this.state.email,
      EMAIL_ADDRESS_VERIFY: this.state.verifyEmail,
      PASSWORD: this.state.password,
      PASSWORD_VERIFY: this.state.verifyPassword,
      HEAR_OF_SOCAN: "Other",
      LANGUAGE_PREFERENCE: "E" // TODO switch to local
    }

    try {
      axios.post('http://api.smartsplit.org:8080/v1/socan/join', body)
      console.log("BODY: ", body)
      .then(
        function (response) {
          // handle success
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
      console.log(err)
    }
  }

  componentDidMount(){

  }

  render() {
    const { open, closeOnDimmerClick, currentProvinceValue, currentCountryValue, terms } = this.state

    return (
      
      <Modal open={open}
      closeOnDimmerClick={closeOnDimmerClick}
      onClose={this.close} size="tiny" trigger={<Button onClick={this.closeConfigShow(true, false)}>Join SOCAN</Button>} closeIcon>
        <Modal.Header>Join SOCAN</Modal.Header>
          <Label>Prénom légal</Label><input type="text" className="firstName" placeholder="Prénom légal" value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})}/>
          <br></br>
          <Label>Deuxième nom légal</Label><input type="text" className="middleName" placeholder="Deuxième nom légal" value={this.state.middleName} onChange={e => this.setState({middleName: e.target.value})}/>
          <br></br>
          <Label>Nom légal</Label><input type="text" className="lastName" placeholder="Nom légal" value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}/>
          <br></br>
          <DateInput
            name = "date"
            placeholder={"Date de Naissance"}
            value={ this.state.date }
            onChange={this.handleChange}
            icon="calendar outline"
          />
          <br></br>
          <Label>Addresse</Label><input type="text" className="address" placeholder="Addresse" value={this.state.address} onChange={e => this.setState({address: e.target.value})}/>
          <br></br>
          <Label>Ville</Label><input type="text" className="city" placeholder="Ville" value={this.state.city} onChange={e => this.setState({city: e.target.value})}/>
          <br></br>
          <Label>Province</Label><input type="text" className="province" placeholder="Province" value={this.state.province} onChange={e => this.setState({province: e.target.value})}/>
          <br></br>
          <Label>Pays</Label><input type="text" className="country" placeholder="Pays" value={this.state.country} onChange={e => this.setState({country: e.target.value})}/>
          {/* <Label>Province</Label>
            <Dropdown
              className="prompt"
              type="text"
              paceholder="Province"
              options={this.state.province}
              placeholder='Choisir province'
              search
              multiple={false}
              selection
              fluid
              value={currentProvinceValue}
              onChange={this.handleProvinceChange}
            />
          <Label>Pays</Label>
            <Dropdown
              className="prompt"
              type="text"
              paceholder="Pays"
              options={this.state.country}
              placeholder='Choisir group'
              search
              multiple={false}
              selection
              fluid
              value={currentCountryValue}
              onChange={this.handleCountryChange}
            /> */}
          <br></br>
          <Label>Code Postal</Label><input type="text" className="postalCode" placeholder="Code postal" value={this.state.postalCode} onChange={e => this.setState({postalCode: e.target.value})}/>
          <br></br>
          <Label>Numéro Téléphone</Label><input type="text" className="phone" placeholder="Numéro Téléphone" value={this.state.phone} onChange={e => this.setState({phone: e.target.value})}/>

          <br></br>
          <Label>Courriel</Label><input type="text" className="email" placeholder="Courriel" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
          <br></br>
          <Label>Vérifie Courriel</Label><input type="text" className="verifyEmail" placeholder="Vérifiez votre courriel" value={this.state.verifyEmail} onChange={e => this.setState({verifyEmail: e.target.value})}/>
          <br></br>
          <Label>User ID</Label><input type="text" className="userId" placeholder="Créer ton User ID" value={this.state.userId} onChange={e => this.setState({userId: e.target.value})}/>
          <br></br>
          <Label>Mot de passe</Label><input type="password" className="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          <br></br>
          <Label>Confirmez le mot de passe</Label><input type="password" className="verifyPassword" placeholder="Vérifiez votre mot de passe" value={this.state.verifyPassword} onChange={e => this.setState({verifyPassword: e.target.value})}/>
        <Checkbox label={"I agree to SOCAN's Terms & Conditions of Membership."} key={terms} value={this.state.terms}/>
        <Modal.Actions>
                <Button onClick={this.close} negative>Annuler</Button>
                <Button onClick={this.handleSubmit} positive icon='checkmark' labelPosition='right' content='Join SOCAN' />
          </Modal.Actions>
      </Modal>
    )
  }

}

export default Socan
