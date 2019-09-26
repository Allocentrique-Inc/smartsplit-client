import React, {Component} from 'react';
import ChampFichier from "./champ-fichier";
import ChampAccesTelechargement from "./champ-acces-telechargement";

export default class ChampTeleversement extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="section-televersement">
                <ChampFichier
                    label={ this.props.label }
                    undertext={ this.props.undertext }
                    value={ this.props.file }
                    onChange={ value => {this.props.onFileChange(value)} }
                />
                {
                    this.props.acces && (
                        <ChampAccesTelechargement
                            value={ this.props.access }
                            onChange={ value => this.props.onAccessChange(value) }
                        />
                    )
                }            
            </div>
        )
    }
    
}

