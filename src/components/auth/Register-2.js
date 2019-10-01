import React, { Component } from 'react'
import './Register.css'
// import { Formik , Form, Field } from 'formik'
import { Button, Header, Image, Modal, Checkbox, Dropdown, Input, Label} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import { Translation } from 'react-i18next'

const MAX_IMAGE_SIZE = 10000000
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


class Register2 extends Component {
  state = { firstName: false, username: false, lastName: false }

  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      password: props.password,
      groups: [],
      avatarImage: 'image.jpg',
      open: props.open,
      firstName: '',
      lastName: '',
      artistName: '',
      defaultRoles: [],
      instruments: [],
      currentValue: [],
      currentRoleValue: [],
      artistName: '',
      role: 'Singer',
      avatar: 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg',
      image: '',
      uploadURL: '',
      roles: [
        {key: "Principal", text: "Principal", value: "Principal"},
        {key: "Accompaniment", text: "Accompaniment", value: "Accompaniment"},
        {key: "Songwriter", text: "Songwriter", value: "Songwriter"},
        {key: "Composer", text: "Composer", value: "Composer"},
        {key: "Remixer", text: "Remixer", value: "Remixer"},   
        {key: "Studio", text: "Studio", value: "Studio"},
        {key: "Publisher", text: "Publisher", value: "Publisher"},
        {key: "Graphist", text: "Graphist", value: "Graphist"},
        {key: "Producer", text: "Producer", value: "Producer"},
        {key: "Singer", text: "Singer", value: "Singer"},
        {key: "Musician", text: "Musician", value: "Musician"}
      ]
    };

    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.validatePasswordStrong = this.validatePasswordStrong.bind(this)
    // // this.stateChanged = this.stateChanged.bind(this);
    // this.toggleShow = this.toggleShow.bind(this);
    this.handleArtistNameChange = this.handleArtistNameChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.click = this.click.bind(this)
    // this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
    // this.validateUsername = this.validateUsername.bind(this)
    // this.validatePassword = this.validatePassword.bind(this)
    // this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      groups: [{text: value, value}, ...prevState.groups],
    }))  
  }

  handleChange = (e, { value }) => this.setState({ currentValue: value })

  handleRoleChange = (e, { value }) => this.setState({ defaultRoles: value })

  roleChange = (e, { value }) => this.setState({ currentRoleValue: value })

  handleFileDelete(e) {
    e.target.value = null;
    this.setState(
      { image: '' },
    );
    console.log('image: ', this.state.image);
  }

  handleFileUpload(e) {
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

    /* 
      Auth.currentSession().then(
        session=>{
          let url = 'http://api.smartsplit.org:8080/v1/rightHolders/' + session.idToken.payload.sub + '/artistName'
          let req = {
            url,
            method: 'Patch',
            data: {artistName: this.state.artistName}
          }
          axios(req)
          .then(res=>{
            console.log(res);
          })
          .catch(err=>{
            toast.error(err)
          })
        }
      )
      .catch(err=>console.log(err)) */
          // let avatarUrl = 'http://api.smartsplit.org:8080/v1/rightHolders/' + session.idToken.payload.sub + '/avatarS3Etag'
          // let avatarReq = {
          //   avatarUrl,
          //   method: 'Patch',
          //   data: {avatarS3Etag: avatar} 
          // }
          // axios(avatarReq)
          // .then(res=>{
          //   console.log(res);
          // })
          // .catch(err=>{
          //   toast.error(err)
          // })
  click(){
    this.handleSubmit();
    // this.props.close();
  }

  handleSubmit = values => {
    // const username = values.email;
    const email = values.email; // username is used as email
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const artistName = values.artistName;
    const avatarImage = values.avatarImage;
    const defaultRoles = Buffer.from(defaultRoles).toString('base64');
    const instruments = Buffer.from(instruments).toString('base64');
    const groups = Buffer.from(groups).toString('base64');
    
    try {
      Auth.signUp({
        email,
        password,
        attributes: {
          email: email,
          given_name: firstName,
          family_name: lastName,
          'custom:artistName': artistName,
          'custom:instruments': instruments,
          'custom:defaultRoles': defaultRoles,
          'custom:groups': groups,
          'custom:avatarImage': avatarImage
        }
      })
        .then(
          toast.success(`Check email ${values.email} account created!`),
          this.props.history.push("/accueil")
        )
        .catch(err => {
          toast.error(err.message)
          console.log(err);
        })
        .finally(() => {
          if (this.props.fn) {
            this.props.fn();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };


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

  handleFileDelete(e) {
    e.target.value = null;
    // this.image = ''
    this.setState(
      { image: '' },
    );
    console.log('image: ', this.state.image);
  }

  handleArtistNameChange(e) {
    this.setState(
      { artistName: e.target.value },
    );
  }

  onTodoChange(value){
    this.setState({
         firstName: value
    });
  }

  componentDidMount(){
    let groups = [];
    axios.get('http://api.smartsplit.org:8080/v1/rightHolders')
    .then(res=>{
      let groupers = [];
      let groupsUnique = [];
      res.data.forEach(function(element) {
        groupers.push( element.groups )
        // Remove duplicates from multiple right holders and flattens arrays
        let GR = groupers.sort().flat().filter( Boolean );
        groupsUnique = [...new Set(GR)]
      })
      groupsUnique.forEach(function(elm) {
        groups.push( {key: elm, text: elm, value: elm} )
      })
      this.setState({groups: groups}, ()=>{console.log("this.state.groups", this.state.groups)})
    })
    .catch(err=>{
      console.log(err);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.open !== nextProps.open) {
        this.setState({open: nextProps.open})
    }
    if(this.props.email !== nextProps.email) {
      this.setState({email: nextProps.email})
    }
    if(this.props.password !== nextProps.password) {
      this.setState({password: nextProps.password})
    }
  }
  

  render() {

    const { open, closeOnDimmerClick, currentValue, currentRoleValue } = this.state

   
    return (
      <Translation>
        { 
            t=>  
  
        <Modal 
          // open={open}
          // closeOnEscape={true}
          // closeOnDimmerClick={false}
          // onClose={this.props.close} 
          size="small"         >
          <div className="input-container">
          <Modal.Header className="Titre">{t('collaborateur.titre')}</Modal.Header>
          <br></br> 
  
          <img type="image" className="avatarImage" src="https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg"/>
          <input type="file" className="fileUpload" onChange={this.handleFileUpload}/>
  
            <input type="text" className="firstName" placeholder={t('collaborateur.attribut.etiquette.prenom')} value={this.state.firstName} onChange={e => this.onTodoChange(e.target.value)}/>
            <input type="text" className="lastName" placeholder={t('collaborateur.attribut.etiquette.nom')} value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}/>
            <label>{t('collaborateur.attribut.etiquette.artiste')}</label><label id="Optionel">{t('collaborateur.attribut.etiquette.option')}</label><input type="text" className="artistName" placeholder={t('collaborateur.attribut.etiquette.artiste')} value={this.state.artistName} onChange={e => this.setState({artistName: e.target.value})}/>
            <div className="sous titre">{t('collaborateur.attribut.etiquette.na')}</div>
            <input type="text" className="email" placeholder={t('collaborateur.attribut.etiquette.courriel')} value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
            <label>{t('collaborateur.attribut.etiquette.groupe')}</label>
              <Dropdown 
                id="prompt"
                type="text" 
                options={this.state.groups}
                placeholder={t('collaborateur.attribut.indication.groupe')}
                search
                multiple={true}
                selection
                fluid
                allowAdditions
                value={currentValue}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />
              {/*<i className="search icon"></i>*/}
            <label>{t('collaborateur.attribut.etiquette.role')}</label>
            <Dropdown 
                id="roles"
                type="text" 
                options = {this.state.roles}
                placeholder={t('collaborateur.attribut.indication.role')}
                search
                multiple={true}
                selection
                fluid
                value={currentRoleValue}
                onChange={this.roleChange}
              /> 
            <div className="sous titre">{t('collaborateur.attribut.indication.role2')}</div>
          </div>  
          <Modal.Actions>
                  {/* <Button onClick={this.props.close} negative>{t('collaborateur.attribut.bouton.annuler')}</Button> */}
                  <Button onClick={this.click} positive icon='checkmark' labelPosition='right' content={t('collaborateur.attribut.bouton.sauvegarder')} />
            </Modal.Actions>
        </Modal>
  
      }  
      </Translation>
      )  
  }
}

export default Register2;