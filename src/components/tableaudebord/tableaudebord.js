import React, {Component} from 'react'

// Composantes
import Navigation from './tableaudebord-navigation'
import Panneau from './tableaudebord-panneau'
import Entete from '../entete/entete'

// CSS
import './tableaudebord.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'
import { Translation } from 'react-i18next'
import { Modal } from 'semantic-ui-react'

export default class TableauDeBord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: 0
        }
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
        })
        .catch(err=>{
            this.setState({modaleConnexion: true})
        })
    }

    render() {
        
        if(this.state.user) {
            let contenu = (<div className="ui eleven wide column"></div>)
            let entete = (<Entete contenu={contenu} profil={this.state.user} />)
            return (
                <div className="tdb--cadre ui row">
                    <Navigation parent={this} />
                    <Panneau entete={entete} selection={this.state.navigation} />
                </div>                
            )
        } else {
            let that = this
            return (
                <Translation>
             {   
                 t =>
                 
                <div className="tdb--cadre ui row accueil">
                    <Modal
                        open={this.state.modaleConnexion}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                        onClose={this.props.close} 
                        size="small" >
                        <br/><br/><br/>
                        <Login fn={()=>{
                            Auth.currentAuthenticatedUser()
                            .then(res=>{
                                that.setState({user: res})                                    
                            })
                            .catch(err=>{
                                toast.error(err.message)
                            })
                        }} />
                    </Modal>
                </div>
            }
            </Translation>
            )
            

        }
        
    }

}