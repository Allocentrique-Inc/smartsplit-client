import React, {Component} from 'react'

// Composantes
import ListePiecesInitiateur from './tableaudebord-liste-pieces-initiateur'
import MonProfil from './tableaudebord-profil'
import ListeCollaborateurs from './tableaudebord-liste-collaborateurs'

export default class Panneau extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selection: props.selection,
            entete: props.profil
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
                    {this.state.selection === 0 && (<ListePiecesInitiateur />)}
                    {this.state.selection === 1 && (<MonProfil />)}
                    {this.state.selection === 2 && (<ListeCollaborateurs />)}
                </div>                
            </div>            
        )
    }
}