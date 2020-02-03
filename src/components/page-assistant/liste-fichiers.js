import React, {Component} from 'react'
import { withTranslation } from 'react-i18next'
import ChampAccesTelechargement from "./champ-acces-telechargement"
import xIcon from "../../assets/svg/icons/x.svg"
import AudioLecture from '../oeuvre/audio-lecture'
import { config } from '../../utils/application'
import InfoBulle from '../partage/InfoBulle';

class ListeFichiers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId,
            liste: props.liste,
            type: props.type,
            editable: []
        }
        this.supprimer = this.supprimer.bind(this)
    }

    supprimer(idx) {
        this.setState({infobulleSuppprimer: `${idx}`})
    }

    fermerInfobulle(supprimer) {
        if(supprimer) {
            this.props.surSuppression(this.state.type, parseInt(this.state.infobulleSuppprimer))
        }
        this.setState({infobulleSuppprimer: false})
    }

    render() {

        const t = this.props.t
        let pochette = this.props.pochette ? "pochette" : ""

        // Génère la liste en JSX
        let _liste = []
        
        if(this.state.liste && this.state.liste[this.state.type] && this.state.liste[this.state.type].files) {
            _liste = this.state.liste[this.state.type].files.map((elem, idx)=>{
                // Une ligne de fichier avec bouton supprimer et éditer
                // Le bouton éditer permet de faire basculer le contrôle d'accès

                // Représentation visuelle de l'accès
                let acces

                acces = (<ChampAccesTelechargement
                    value={elem.access}
                    sanstexte={true}
                    onChange={valeur => { 
                        this.props.surEdition(this.state.type, idx, valeur)
                     }}
                />)                

                let url = `${config.IMAGE_SRV_ARTISTES_URL}${this.state.mediaId}/${this.state.type}/${elem.file}`

                return (
                    <div key={`ligne--${this.state.type}--${idx}`} className={`ui row medium-500-color ${pochette}`}>                        
                        <div className="ui ten wide column selection-row" style={{padding: "0.5rem"}}>
                            {
                                this.state.type === "audio" && (                                    
                                    <AudioLecture 
                                        taille="normal" 
                                        sanstexte={true} 
                                        url={url} 
                                        visible={true} 
                                        nom={elem.file} 
                                        mode={1} 
                                        onRef={lecteur=>{this.setState({lecteur: lecteur})}}
                                        style={{
                                            display: "inline",
                                            float: "left"
                                        }}
                                        />
                                )
                            }
                            <span style={{float: "left", paddingLeft: "1rem"}}>
                                { elem.file.length >= 28 && elem.file.substring(0,28) + "..." }
                                { elem.file.length < 30 && elem.file }
                                <InfoBulle
                                    style={{backgroundColor: "#FAF8F9"}}
                                    className="proposition"                                    
                                    declencheur={(<div></div>)}
                                    decoration={
                                        <>
                                            <div className="header" style={
                                                {
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                    color: "black",
                                                    margin: "0 auto",
                                                    fontFamily: "IBM Plex Sans",
                                                    fontWeight: "700",
                                                    width: "240px"
                                                }}>
                                                {t("options.supprimer.fichier")}
                                            </div>
                                            <br />
                                            <div className="ui medium button inverse infobulle" style={{ width: "110px", marginLeft: "0px", marginRight: "0px" }}
                                                onClick={() => { this.fermerInfobulle(false) }}
                                            >
                                                {t("editeur.non")}
                                            </div>
                                            <div className="ui medium button infobulle" onClick={()=>{                                            
                                                this.fermerInfobulle(true)                                                
                                            }}>{t("editeur.oui")}</div>
                                            <div className="panneau">
                                                &nbsp;
                                            </div>
                                        </>
                                    }
                                    orientation="bottom center"
                                    ouvert={parseInt(this.state.infobulleSuppprimer) === idx}
                                />
                            </span>
                            <div style={{textAlign: "right"}} className="ui three wide column">
                                <img className="cliquable" src={xIcon} alt="" onClick={()=>this.supprimer(idx)} />
                            </div>
                        </div>                                                
                        <div className="ui three wide column">
                            {acces}
                        </div>
                    </div>
                )
            })
        }        

        return (
            <div className="ui grid">
                <div className="ui row">
                    <div className="ui one wide column" />
                    <div className="ui fifteen wide column">
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

export default withTranslation()(ListeFichiers)