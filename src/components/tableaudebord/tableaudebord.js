import React, {Component} from 'react'

// Composantes
import Navigation from './tableaudebord-navigation'
import Panneau from './tableaudebord-panneau'
import Login from '../auth/Login'

// CSS
import './tableaudebord.css'

import { toast } from 'react-toastify'
import axios from 'axios'

import { Auth } from 'aws-amplify'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { confirmAlert } from 'react-confirm-alert'

export default class TableauDeBord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: 0,
            auth: {}
        }
        this.verifierConnexion = this.verifierConnexion.bind(this)
    }
    
    componentDidMount() {
        this.verifierConnexion()    
    }

    verifierConnexion() {
        // On vérifie d'abord si l'usager est connecté
        Auth.currentAuthenticatedUser({
            bypassCache: true
        })
        .then(user => {
            console.log('Utilisateur connecté', user)
            this.setState({user: user})
        })
        .catch(err => {
            console.log('Utilisateur non connecté, affichage de la page de connexion')
            confirmAlert({
            title: `Connexion obligatoire`,
            message: `Tu dois être connecté pour accéder à la page d'accueil`,
            closeOnClickOutside: false,
            style: {
                    position: "relative",
                    width: "640px",
                    height: "660px",
                    margin: "0 auto",
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    boxSizing: "border-box",
                    boxShadow: "inset 0px -1px 0px #DCDFE1"
                },
            customUI: ({ onClose }) => 
                <div>         
                    <Login message="Connecte-toi pour accéder tableau de bord" auth={this.props.auth} fn={(user)=>{
                        onClose()
                        this.setState({user: user}, ()=>{
                            this.verifierConnexion()
                        })
                              
                    }} />
            </div>
            })

        })
    }

    render() {

        if(this.state.user) {
            return (
                <div className="tdb--cadre">
                    <Navigation parent={this} />
                    <Panneau selection={this.state.navigation} user={this.state.user} />
                </div>
            )
        } else {
            return (
                <div className="tdb--cadre">                    
                </div>
            )
        }
    }

}