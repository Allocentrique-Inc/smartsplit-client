import React, { Component } from 'react'
import ChampFichier from "./champ-fichier"
import "../formulaires.css"
import { withTranslation } from 'react-i18next'

class ChampTeleversement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audio: props.audio,
            apres: props.apres,
            extraStyle: props.extraStyle || {},
            fichiers: props.fichiers,
            pochette: props.pochette
        }
    }

    render() {
        return (
            <div className="section-televersement" style={{ display: "-webkit-box" }}>
                <div className="ui grid" style={Object.assign({ width: "100%", marginBottom: "20px" }, this.state.extraStyle)}>
                    <div className="ui row">
                        <div className="ui column" />
                        <div className="ui fifteen wide column">
                            <ChampFichier
                                conserverNomFichier={this.props.conserverNomFichier}
                                pochette={this.props.pochette}
                                label={this.props.label}
                                info={this.props.info}
                                undertext={this.props.undertext}
                                value={this.props.file}
                                onChange={value => { if (this.props.onFileChange) this.props.onFileChange(value) }}
                            />
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }

}
export default withTranslation()(ChampTeleversement)