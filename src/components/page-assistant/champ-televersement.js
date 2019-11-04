import React, { Component } from 'react';
import ChampFichier from "./champ-fichier";
import ChampAccesTelechargement from "./champ-acces-telechargement";
import "../formulaires.css";

export default class ChampTeleversement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audio: props.audio,
            apres: props.apres,
            extraStyle: props.extraStyle || {}
        }
    }

    render() {
        return (
            <div className="section-televersement" style={{ display: "-webkit-box" }}>
                <div className="ui grid" style={Object.assign({ width: "100%", height: "50px", marginBottom: "20px" }, this.state.extraStyle)}>
                    <div className="ui row">
                        <div className="ui column" />
                        <div className="ui twelve wide column">

                            <ChampFichier
                                label={this.props.label}
                                info={this.props.info}
                                undertext={this.props.undertext}
                                value={this.props.file}
                                onChange={value => { if (this.props.onFileChange) this.props.onFileChange(value) }}
                            />
                        </div>
                        <div className="ui three wide column">
                            <ChampAccesTelechargement
                                value={this.props.access}
                                onChange={value => { if (this.props.onAccessChange) this.props.onAccessChange(value) }}
                            />
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

