import React, { Component } from 'react'
import ChampFichier from "./champ-fichier"
import ChampAccesTelechargement from "./champ-acces-telechargement"
import DownloadCloudIcon from "../../assets/svg/icons/download-cloud.svg"
import DownloadLockIcon from "../../assets/svg/icons/download-lock.svg"
import LockFullIcon from "../../assets/svg/icons/lock-full.svg"
import "../formulaires.css"
import AudioLecture from '../oeuvre/audio-lecture'

export class ListeFichiers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId,
            liste: props.liste,
            type: props.type,
            editable: []
        }
        this.editer = this.editer.bind(this)
        this.supprimer = this.supprimer.bind(this)
    }

    editer(idx) {
        let editable = this.state.editable
        editable[idx] = !editable[idx]
        this.setState({editable: editable})
    }

    supprimer(idx) {
        this.props.surSuppression(this.state.type, idx)
    }

    render() {

        let pochette = this.props.pochette ? "pochette" : ""

        // Génère la liste en JSX
        let _liste = []
        
        if(this.state.liste[this.state.type] && this.state.liste[this.state.type].files) {
            _liste = this.state.liste[this.state.type].files.map((elem, idx)=>{
                // Une ligne de fichier avec bouton supprimer et éditer
                // Le bouton éditer permet de faire basculer le contrôle d'accès

                // Représentation visuelle de l'accès
                let acces

                if(this.state.editable[idx]) {
                    acces = (<ChampAccesTelechargement
                        value={elem.access}
                        sanstexte={true}
                        onChange={valeur => { 
                            this.props.surEdition(this.state.type, idx, valeur)
                         }}
                    />)
                } else {
                    switch(elem.access) {
                        case "public":
                            acces = (<img alt="public" src={DownloadCloudIcon} />)
                            break;
                        case "private":
                            acces = (<img alt="on-invite" src={LockFullIcon} />)
                            break;
                        case "on-invite":
                            acces = (<img alt="on-private" src={DownloadLockIcon} />)
                            break;
                        default:
                    }                    
                }                

                let url = `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.state.mediaId}/${this.state.type}/${elem.file}`

                return (
                    <div key={`ligne--${this.state.type}--${idx}`} className={`ui row medium-500-color ${pochette}`}>
                        <div className="ui four wide column">
                            {acces}
                        </div>
                        <div className="ui seven wide column">                            
                            { elem.file.length >= 20 && elem.file.substring(0,20) + "..." }
                            { elem.file.length < 23 && elem.file }
                        </div>
                        <div className="ui one wide column">
                            <i className={`ui ${this.state.editable[idx] ? "save" : "pencil"} alternate icon cliquable`} onClick={()=>this.editer(idx)} />                            
                        </div>
                        <div className="ui one wide column">
                            <i className="ui trash alternate outline icon cliquable" onClick={()=>this.supprimer(idx)} />
                        </div>
                        <div className="ui one wide column">
                            {this.state.type === "audio" && <AudioLecture taille="normal" sanstexte={true} url={url} visible={true} nom={elem.file} mode={1} onRef={lecteur=>{this.setState({lecteur: lecteur})}} />}
                        </div>                                                    
                    </div>
                )
            })
        }        

        return (
            <div className="ui grid">
                <div className="ui row">
                    <div className="ui two wide column" />
                    <div className="ui fourteen wide column">
                        <div className="ui grid">
                            {_liste}
                        </div>                        
                    </div>
                    <div className="ui two wide column" />
                </div>                
            </div>
        )
    }

}

export default class ChampTeleversement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audio: props.audio,
            apres: props.apres,
            extraStyle: props.extraStyle || {},
            fichiers: props.fichiers
        }
    }

    render() {

        let listeFichiers = []

        return (
            <div className="section-televersement" style={{ display: "-webkit-box" }}>
                <div className="ui grid" style={Object.assign({ width: "100%", marginBottom: "20px" }, this.state.extraStyle)}>
                    <div className="ui row">
                        <div className="ui column" />
                        <div className="ui twelve wide column">

                            <ChampFichier
                                conserverNomFichier={this.props.conserverNomFichier}
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
                    {listeFichiers}
                </div>
            </div>


        )
    }

}

