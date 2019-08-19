import React, { Component } from 'react';
import './Register.css'
import { Formik , Form, Field } from 'formik'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify';
import axios from 'axios'
import { Button, Header, Image, Modal, Checkbox, Dropdown, Input, Label} from 'semantic-ui-react'
import { Translation } from 'react-i18next';

const groups = [
  { key: 'Group1', text: 'Group1', value: 'Group1' },
  { key: 'Group2', text: 'Group2', value: 'Group2' },
  { key: 'Group3', text: 'Group3', value: 'Group3' },
  { key: 'Group4', text: 'Group4', value: 'Group4' }
]

const roles = [
  'principal', 
  'accompaniment', 
  'songwriter', 
  'composer', 
  'remixer', 
  'studio', 
  'publisher', 
  'graphist', 
  'producer', 
  'singer', 
  'musician'
]

const image = ''
const artistName = ''
const firstName = ''
const lastName = ''
const email = ''
const avatarS3Etag = ''
const MAX_IMAGE_SIZE = 10000000

class Register2 extends Component {
  state = { groups,
            image,
            firstName,
            lastName,
            artistName,
            email,
            avatarS3Etag
           }

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      groups: [{text: value, value}, ...prevState.groups],
    }))  
  }

  handleChange = (e, { value }) => this.setState({ currentValue: value })

  handleFileDelete(e) {
    e.target.value = null;
    // this.image = ''
    this.setState(
      { image: '' },
    );
    console.log('image: ', this.state.image);
  }

  handleFileUpload(e) {
    // console.log(e.target.files[0]);
    console.log("FILE: ", e.target.files[0]);
    if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      return alert('Image is loo large - 10Mb maximum')
    }
    if ( !e.target.files[0].type.includes('image/jpeg') )  {
      return alert('Wrong file type - JPG only.')
    }
    this.setState(
      { image: 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg'}
    );
  }

  handleSubmit = values => { 
    // AWS Cognito integration here 
    const username = values.username;
    const email = values.username; // username is used as email
    const firstName = values.firstName;
    const lastName = values.lastName;
    const artistName = values.artistName;
    const password = this.state.password;
    // console.log(password, username, email, firstName, lastName)

    try {
      Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          name: firstName,
          family_name: lastName,
          'custom:artistName': artistName,
          'custom:avatarS3Etag': 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg'
        }
      })

      .then(
        // toast.success(`Biquette#${user.username} !`)
        // this.props.auth.setAuthStatus(true)
        // this.props.auth.setUser(user.username)  
        this.props.history.push("/welcome")
    
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

  render() {
    const { currentValue } = this.state

    // Return checkbox for each role
    const renderCheckbox= () => {
      return roles.map(role => {
        return <Checkbox label={role} key={role}/>;
      });
    };

    return (
      <Modal size="tiny" trigger={<Button>Ajouter un nouveau collaborateur</Button>}>
        <Modal.Header>Ajouter un artiste collaborateur</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='tiny' src='https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg' />
          <Modal.Description>
            <Header>Image de profil</Header>
            <p>Photo par défaut pour votre utilisateur</p>
            <Input type="file" className="fileUpload" onChange={this.handleFileUpload}/>
            <button size='tiny' className="fileDelete" onChange={this.handleFileDelete}>Annuler</button>
          </Modal.Description>
        </Modal.Content>
          <label>Prénom légal</label><input type="text" className="firstName" placeholder="Prénom légal"/>
          <label>Nom légal</label><input type="text" className="lastName" placeholder="Nom légal"/>
          <label>Nom d'artiste</label><input type="text" className="artistName" placeholder="Nom d'artiste"/>
          <label>Courriel</label><input type="text" className="email" placeholder="Courriel"/>
          <label>Groupes</label>
            <Dropdown 
              className="prompt"
              type="text" 
              paceholder="Groupes"
              options={this.state.groups}
              placeholder='Choisir group'
              search
              selection
              fluid
              allowAdditions
              value={currentValue}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            />
            <i className="search icon"></i>
          <label>Rôle(s) par défaut</label>
          <div className="roles">
            { renderCheckbox() }
          </div>
        <Modal.Actions>
                <Button negative>Annuler</Button>
                <Button positive icon='checkmark' labelPosition='right' content='Sauvegarder' onChange={this.handleSubmit} />
          </Modal.Actions>
      </Modal>
    )
  }
  
}

export default Register2