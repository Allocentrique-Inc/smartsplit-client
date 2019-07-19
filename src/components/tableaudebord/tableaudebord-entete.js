import React, {Component} from 'react'
import { Translation } from 'react-i18next';

// Composantes
import MenuProfil from './tableaudebord-menu-profil'
import BoutonConnexion from './tableaudebord-bouton-connexion'

export default class Entete extends Component {

    constructor(props){
        super(props)
        this.state = {
            auth: null
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
                                {this.state.auth && <MenuProfil auth={this.state.auth} />}
                                {!this.state.auth && <BoutonConnexion />}
                            </div>
                        </div>
                }
            </Translation>
        )
    }
}