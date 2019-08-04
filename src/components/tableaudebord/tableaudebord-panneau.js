import React, {Component} from 'react'

// Composantes
import Entete from './tableaudebord-entete'
import ListePieces from './tableaudebord-liste-pieces'
import MonProfil from './tableaudebord-profil'
import ListeCollaborateurs from './tableaudebord-liste-collaborateurs'

export default class Panneau extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selection: props.selection
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
                <Entete user={this.props.user} />
                <div className="contenu">
                    {this.state.selection === 0 && (<ListePieces />)}
                    {this.state.selection === 1 && (<MonProfil />)}
                    {this.state.selection === 2 && (<ListeCollaborateurs />)}
                </div>                
            </div>            
        )
    }
}