import React, {Component} from 'react'
import { Translation } from 'react-i18next';

// Composantes
import MenuProfil from '../entete/menu-profil'
import BoutonConnexion from '../entete/bouton-connexion'

export default class Entete extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: props.user
        }
    }

    render() {
        return(
            <Translation>
                {
                    t=>
                        <div className="tdb--entete">
                            <div className="entete--recherche">
                            </div>
                            <div className="bouton--profil">
                                {this.state.user && <MenuProfil pochette={this.props.pochette} user={this.state.user} />}
                                {!this.state.user && <BoutonConnexion />}
                            </div>
                        </div>
                }
            </Translation>
        )
    }
}