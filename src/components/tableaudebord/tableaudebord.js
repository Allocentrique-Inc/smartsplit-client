import React, {Component} from 'react'

// Composantes
import Navigation from './tableaudebord-navigation'
import Panneau from './tableaudebord-panneau'
import Entete from '../entete/entete'

// CSS
import './tableaudebord.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import { Translation } from 'react-i18next'
import ModaleConnexion from '../auth/Connexion'

export default class TableauDeBord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: 0,
            pochette: props.pochette
        }
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
        })
        .catch(err=>{
            console.log(err)
            this.setState({modaleConnexion: true})
        })
    }

    render() {

        let accueil = "accueil"

        if(this.props.pochette) {
            accueil = "accueil-pochette"
        }
        
        if(this.state.user) {
            let contenu = (<div className="ui seven wide column"></div>)
            let entete = (<Entete contenu={contenu} profil={this.state.user} />)
            return (
                <div className="tdb--cadre ui row">
                    <Navigation parent={this} pochette={this.state.pochette} />
                    <Panneau pochette={this.state.pochette} entete={entete} selection={this.state.navigation} user={this.state.user} />
                </div>                
            )
        } else {            
            return (
                <Translation>
                {   
                    t =>
                    
                    <div className={`tdb--cadre ui row ${accueil}`}>
                        <ModaleConnexion pochette={this.state.pochette} parent={this} isOpen={this.state.modaleConnexion} />
                    </div>
                }
                </Translation>
            )
            

        }
        
    }

}