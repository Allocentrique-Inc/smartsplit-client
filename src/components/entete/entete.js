import React, {Component} from 'react'
import MenuProfil from '../navigation/menu-profil'
import { AyantsDroit } from '../../utils/application'
import arrowLeftIcon from '../../assets/svg/icons/arrow-left.svg'

export default class Entete extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pochette: props.pochette,
            navigation: props.navigation,
            contenu: props.contenu,
            profil: props.profil,
            connexion: !props.sansconnexion            
        }
    }

    render() {

        let nav = this.props.navigation && (
            <div style={{paddingLeft: "30px", paddingTop: "20px"}} className={ 'back-button-section' }>
                <div className="ui cliquable" onClick={ this.props.navigation }>
                    <img src={ arrowLeftIcon } alt={ 'Retour' }/>
                </div>
            </div>
        )

        return (            
            <div className="ui three column grid" style={this.props.style}>
                <div className="ui row">
                    <div className="ui one wide column">
                        {nav}
                    </div>                                
                    {this.state.contenu}
                    <div className="ui seven wide column" style={{textAlign: "right", marginTop: "10px"}}>
                        {this.state.profil && AyantsDroit.ayantsDroit && <MenuProfil pochette={this.props.pochette} user={this.state.profil} />}
                    </div>                                
                </div>
            </div>
        )
    }

}