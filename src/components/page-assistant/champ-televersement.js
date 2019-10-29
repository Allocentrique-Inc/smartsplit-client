import React, { Component } from 'react';
import ChampFichier from "./champ-fichier";
import ChampAccesTelechargement from "./champ-acces-telechargement";

export default class ChampTeleversement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audio: props.audio,
            apres: props.apres
        }
    }

    render() {
        return (
            <div className="section-televersement" style={{ display: "-webkit-box" }}>
                <ChampFichier
                    label={this.props.label}
                    undertext={this.props.undertext}
                    value={this.props.file}
                    onChange={value => { this.props.onFileChange(value) }}
                />
                <ChampAccesTelechargement
                    value={this.props.access}
                    onChange={value => this.props.onAccessChange(value)}
                />
            </div>
        )
    }

}

