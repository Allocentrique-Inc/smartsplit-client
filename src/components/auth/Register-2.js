import React, { Component } from 'react';
import './Register.css'
import { Formik , Form, Field } from 'formik'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify';
import axios from 'axios'
import { Button, Header, Image, Modal, Checkbox } from 'semantic-ui-react'
import { Translation } from 'react-i18next';


const MAX_IMAGE_SIZE = 10000000

  // handleFileUpload(e) {
  //   // console.log(e.target.files[0]);
  //   console.log("FILE: ", e.target.files[0]);
  //   if (e.target.files[0].size > MAX_IMAGE_SIZE) {
  //     return alert('Image is loo large - 10Mb maximum')
  //   }
  //   if ( !e.target.files[0].type.includes('image/jpeg') )  {
  //     return alert('Wrong file type - JPG only.')
  //   }
  //   this.setState(
  //     { image: 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg'}
  //   );
  // }

  // handleFileDelete(e) {
  //   e.target.value = null;
  //   // this.image = ''
  //   this.setState(
  //     { image: '' },
  //   );
  //   console.log('image: ', this.state.image);
  // }

const Register2 = () => (
  <Modal size="tiny" trigger={<Button>Ajouter un nouveau collaborateur</Button>}>
    <Modal.Header>Ajouter un artiste collaborateur</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='tiny' src='https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg' />
      <Modal.Description>
        <Header>Image de profil</Header>
        <p>Photo par défaut pour votre utilisateur</p>
        {/* <input type="file" className="fileUpload" onChange={this.handleFileUpload}/> */}
        <input type="file" className="fileUpload"/>
        {/* <button className="fileDelete" onChange={this.handleFileDelete}>Remove File</button> */}
        <button size='tiny' className="fileDelete">Annuler</button>
      </Modal.Description>
{/* 
      <div className="field">
               <div className="control has-icons-left has-icons-right">
                 Artist Name:
               <Field 
                  name="artistName"
                  id="artistName"
                  aria-describedby="artistNameHelp"
                  placeholder="Enter Artist Name"
                  value={this.state.artistName}
                  onChange={this.handleArtistNameChange}
                  required={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                Role:
                <Field
                  name="role"
                  id="role"
                  aria-describedby="=roleHelp"
                  placeholder="Enter Role"
                  value={this.state.role}
                  required={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div></div> */}
    </Modal.Content>
      <input type="text" className="firstName" placeholder="Prénom légal"/>
      <input type="text" className="lastName" placeholder="Nom légal"/>
      <input type="text" className="artistName" placeholder="Nom d'artiste"/>
      <input type="text" className="email" placeholder="Courriel"/>
      <input class="prompt" type="text" placeholder="Groupes"/><i class="search icon"></i>
      <p>Role(s) par défaut</p>
      <Checkbox label='Auteur' />
      <Checkbox label='Compositeur' />
      <Checkbox label='Arrangeur' />
      <Checkbox label='Interprète' />
    <Modal.Actions>
            <Button negative>Annuler</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Sauvegarder' />
      </Modal.Actions>
  </Modal>
)

export default Register2

