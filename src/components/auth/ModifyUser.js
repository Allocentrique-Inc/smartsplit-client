import React, { Component } from 'react';
import './Register.css'
// import { toast } from 'react-toastify'
import axios from 'axios'
import { Button, Header, Image, Modal, Checkbox, Dropdown, Input, Label} from 'semantic-ui-react'
import { Translation } from 'react-i18next';
import { toast } from 'react-toastify';

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

class ModifyUser extends Component {
  constructor(props){
    super(props)

    this.state = { 
      groups: [],
      image:'',
      firstName: props.firstName,
      lastName: '',
      artistName: '',
      email: '',
      avatarImage: '',
      open: props.open,
      // collabGroup: '',
      newUser: true,
      defaultRoles: [],
      currentValue: [],
      currentRoleValue: [],
      roles: [
        {key: "Principal", text: "Principal", value: "Principal"},
        {key: "Accompaniment", text: "Accompaniment", value: "Aaccompaniment"},
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
    }

    // BIND TODO
    this.click = this.click.bind(this)

  }


  

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
        
  close = () => this.setState({ open: false })

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
    // this.image = ''
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

  click(){
    this.handleSubmit();
    this.close();
  }

  handleSubmit = values => { 

    let body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      artistName: this.state.artistName,
      email: this.state.email,
      groups: this.state.currentValue,
      defaultRoles: this.state.currentRoleValue,
      jurisdiction: "Canada",
      newUser: true,
      avatarImage: "image.jpg"
    }

    try {
      axios.post('http://api.smartsplit.org:8080/v1/rightHolders', body)
      .then(
        console.log('user created / modified'),
        toast.success('user created / modified'),
        setTimeout(function(){ window.location.reload(); }, 2000)
        // window.location.reload()
        // TODO Add modal close action
        // this.props.history.push("/")

        // TODO
        // if(this.props.callback){
        //   this.props.callback();
        // }
        // if (this.props.callback) {
        //   this.props.callback();
        // }
      )
      // .then(
      //   if (this.state.firstName == 'Jim') {
      //     this.props.callback();
      //   }
      // )
      .catch((err)=>{
        // toast.error(err.message)
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
      // toast.error(err)
      console.log(err);
    })
    console.log("this.state.roles", this.state.roles)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.open !== nextProps.open) {
        this.setState({open: nextProps.open})
    }
    if(this.props.firstName !== nextProps.firstName) {
      this.setState({firstName: nextProps.firstName})
    }
  }

  render() {
    const { open, closeOnDimmerClick, currentValue, currentRoleValue } = this.state

    // Return checkbox for each role
    const renderCheckbox= () => {
      return roles.map(role => {
        return <Checkbox 
          label={role} 
          key={role} 
          value={this.state.defaultRoles} 
          onChange={this.handleRoleChange}
        />;
      });
    };

    return (
      <Modal open={open}
      closeOnDimmerClick={closeOnDimmerClick}
      onClose={this.close} size="tiny" closeIcon>
        <Modal.Header>Ajouter un artiste collaborateur</Modal.Header>
        {/* <Modal.Content image>
          <Image wrapped size='tiny' src='https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg' />
          <Modal.Description>
            <Header>Image de profil</Header>
            <p>Photo par défaut pour votre utilisateur</p>
            <Input type="file" className="fileUpload" onChange={this.handleFileUpload}/>
            <button size='tiny' className="fileDelete" onChange={this.handleFileDelete}>Annuler</button>
          </Modal.Description>
        </Modal.Content> */}
          <label>Prénom légal</label><input type="text" className="firstName" placeholder="Prénom légal" value={this.state.firstName} onChange={e => this.onTodoChange(e.target.value)}/>
          <label>Nom légal</label><input type="text" className="lastName" placeholder="Nom légal" value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}/>
          <label>Nom d'artiste</label><label id="Optionel">Optionel</label><input type="text" className="artistName" placeholder="Nom d'artiste" value={this.state.artistName} onChange={e => this.setState({artistName: e.target.value})}/>
          Si non applicable, nous afficherons son nom complet.
          <label>Courriel</label><input type="text" className="email" placeholder="Courriel" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
          <label>Groupes</label>
            <Dropdown 
              className="prompt"
              type="text" 
              paceholder="Groupes"
              options={this.state.groups}
              placeholder='Choisir group'
              search
              // multiple
              multiple={true}
              selection
              fluid
              allowAdditions
              value={currentValue}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            />
            <i className="search icon"></i>
          <label>Rôle(s) par défaut</label>
          <Dropdown 
              className="roles"
              type="text" 
              paceholder="Roles"
              options = {this.state.roles}
              placeholder='Choisir group'
              search
              // multiple
              multiple={true}
              selection
              fluid
              value={currentRoleValue}
              onChange={this.roleChange}
            />
          {/* <div className="roles">
            { renderCheckbox() }
          </div> */} 
          Ces rôles pourront toujours être modifiés plus tard.
        <Modal.Actions>
                <Button onClick={this.close} negative>Annuler</Button>
                <Button onClick={this.click} positive icon='checkmark' labelPosition='right' content='Sauvegarder' />
          </Modal.Actions>
      </Modal>
    )
  }
  
}
export default ModifyUser
