import React, {Component} from 'react'
import { Translation } from 'react-i18next';

// Composantes
import MenuProfil from './tableaudebord-menu-profil'
import BoutonConnexion from './tableaudebord-bouton-connexion'

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
                                Biquette !
                            </div>
                            <div className="bouton--profil">
                                {this.state.user && <MenuProfil user={this.state.user} />}
                                {!this.state.user && <BoutonConnexion />}
                            </div>
                        </div>
                }
            </Translation>
        )
    }
}