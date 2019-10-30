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
            <div className="ui grid">
                <div className="six wide column">
                    <ChampFichier
                        label={this.props.label}
                        undertext={this.props.undertext}
                        value={this.props.file}
                        onChange={value => { this.props.onFileChange(value) }}
                    />
                </div>

                <div className="ten wide column">
                    <ChampAccesTelechargement
                        value={this.props.access}
                        onChange={value => this.props.onAccessChange(value)}
                    />
                </div>
            </div>

        )
    }

}

