import React, { Component } from 'react';
import './Declaration.css'
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
        share: false,
        open: true
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
      <Translation>
        {
          (t, i18n) =>
      <Modal open={open}
      closeOnDimmerClick={closeOnDimmerClick}
      onClose={this.close} size="small" closeIcon>
        <Modal.Header>{t('collaborateur.declaration.identite')} </Modal.Header>
        
        <div className="declare">
        <Checkbox
          value={this.state.identity}
          key={identity} 
          label=""
          onChange={this.handleIdentityCheck}
          className="checkbox"
        />
        {
          i18n.lng && i18n.lng.substring(0,2) === 'en' && (  
            <div className="en">
              <p><strong>I declare to really be {this.state.firstName} {this.state.lastName}.</strong> I understand that pretending to be someone else would be a serious misconduct liable to legal prosecution.</p>
            </div>  
          )  
        }
        </div>
        <div className="declare">
        {
          i18n.lng && i18n.lng.substring(0,2) !== 'en' && (
            <div className="fr">
              <p><strong>Je déclare être réellement {this.state.firstName} {this.state.lastName}.</strong> Je comprends que le fait me faire passer pour quelqu’un d’autre constituerait une faute grave passible de poursuites judiciaires.</p>
            </div>
          ) 
        }
        <Checkbox 
          value={this.state.share}
          key={share} 
          label=""
          onChange={this.handleShareCheck}
          className="checkbox"
        />
        {
          i18n.lng && i18n.lng.substring(0,2) === 'en' && (  
            <div className="accepte">
              <p><strong>I accept these rights splits</strong> between myself and any collaborator. This represents the desired agreement. I understand that these percentages will now apply to any revenue sharing related to {this.state.songTitle}.</p>
            </div>  
          )  
        }
        {
          i18n.lng && i18n.lng.substring(0,2) !== 'en' && (
            <div className="accepte">
              <p><strong>Jaccepte ces partages de droits</strong> intervenus entre moi-même et tout collaborateur. Cela représente l’entente souhaitée. Je comprends que ces pourcentages s’appliqueront désormais à tout partage de revenus en lien avec {this.state.songTitle}."</p>
            </div>
          ) 
        }
        </div>
        <Modal.Actions>
                <Button onClick={this.close} negative>{t('collaborateur.attribut.bouton.annuler')}</Button>
                <Button onClick={this.click} positive icon='checkmark' labelPosition='right' content={t('collaborateur.attribut.declaration.accepter')} />
          </Modal.Actions>
      </Modal>
    }
    </Translation>
    )
  }
  
}
export default Declaration