import React, { Component } from 'react';
import './Register.css'
import { Button, Modal, Checkbox, Dropdown, Input, Label} from 'semantic-ui-react'
import { Translation } from 'react-i18next';
import { toast } from 'react-toastify';

class Declaration extends Component {
  constructor(props){
    super(props)

    this.state = { 
        firstName: 'Name',
        lastName: 'Last Name',
        songTitle: 'Song',
        identity: false,
        share: false
    }

    // BIND TODO
    this.click = this.click.bind(this)
  }
  

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
        
  close = () => this.setState({ open: false })

  click(){
    this.handleSubmit();
    this.close();
  }

  handleSubmit = values => { 

    try {
      window.location.href = "/register-2"
      .then(
        console.log('Identity declared')
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
    
  handleIdentityCheck = (e, { value }) => this.setState({ identity: true })

  handleShareCheck = (e, { value }) => this.setState({ share: true })

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    if(this.props.open !== nextProps.open) {
        this.setState({open: nextProps.open})
    }
    if(this.props.firstName !== nextProps.firstName) {
      this.setState({firstName: nextProps.firstName})
    }
    if(this.props.lastName !== nextProps.lastName) {
        this.setState({lastName: nextProps.lastName})
    }
    if(this.props.songTitle !== nextProps.songTitle) {
        this.setState({songTitle: nextProps.songTitle})
    }
  }

  render() {
    const { open, closeOnDimmerClick, identity, share} = this.state

    return (
      <Modal open={open}
      closeOnDimmerClick={closeOnDimmerClick}
      onClose={this.close} size="tiny" closeIcon>
        <Modal.Header>Déclaration d’identité</Modal.Header>
        <Checkbox 
          key={identity} 
          value={'Je déclare être réellement {firstName} {firstName}. Je comprends que le fait me faire passer pour quelqu’un d’autre constituerait une faute grave passible de poursuites judiciaires. '} 
          onChange={this.handleIdentityCheck}
        />
        <Checkbox 
          key={share} 
          value={'Jaccepte ces partages de droits intervenus entre moi-même et tout collaborateur. Cela représente l’entente souhaitée. Je comprends que ces pourcentages s’appliqueront désormais à tout partage de revenus en lien avec {song}.'} 
          onChange={this.handleShareCheck}
        />
        <Modal.Actions>
                <Button onClick={this.close} negative>Annuler</Button>
                <Button onClick={this.click} positive icon='checkmark' labelPosition='right' content='Sauvegarder' />
          </Modal.Actions>
      </Modal>
    )
  }
  
}
export default Declaration