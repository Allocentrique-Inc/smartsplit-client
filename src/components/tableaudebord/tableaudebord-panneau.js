import React, {Component} from 'react'

// Composantes
import ListePieces from './tableaudebord-liste-pieces'
import MonProfil from './tableaudebord-profil'
import ListeCollaborateurs from './tableaudebord-liste-collaborateurs'

export default class Panneau extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pochette: props.pochette,
            selection: props.selection,
            entete: props.profil,
            user: props.user
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.selection !== nextProps.selection) {
            this.setState({selection: nextProps.selection})
        }
    }

    render() {
        return (
            <div className="tdb--panneau">                
                {this.props.entete}
                <div className="contenu">
                    {this.state.selection === 0 && (<ListePieces pochette={this.state.pochette} parent={this} user={this.state.user} />)}
                    {this.state.selection === 1 && (<MonProfil />)}
                    {this.state.selection === 2 && (<ListeCollaborateurs />)}
                </div>                
            </div>            
        )
    }
}