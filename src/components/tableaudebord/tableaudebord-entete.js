import React, {Component} from 'react'
import { withTranslation } from 'react-i18next';

// Composantes
import MenuProfil from '../entete/menu-profil'
import BoutonConnexion from '../entete/bouton-connexion'
import { AyantsDroit } from '../../utils/application';

class Entete extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: props.user
        }        
    }

    render() {
        const t = this.props.t
        return(            
            <div className="tdb--entete">
                <div className="entete--recherche">
                </div>
                <div className="bouton--profil">
                    {this.state.user && AyantsDroit.ayantsDroit && <MenuProfil pochette={this.props.pochette} user={this.state.user} />}
                    {!this.state.user && <BoutonConnexion />}
                </div>
            </div>                
        )
    }
}

export default withTranslation()(Entete)