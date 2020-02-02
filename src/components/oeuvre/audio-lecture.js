import React, { Component } from 'react'
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import Axios from 'axios'
import {journal} from '../../utils/application'
import stop from '../../assets/svg/icons/stop-circle.svg'
import play from '../../assets/svg/icons/play-circle.svg'

const JOUER = 0

class AudioLecture extends Component {

    constructor(props) {
        super(props)        
        this.stopEtJouer = this.stopEtJouer.bind(this)
        this.jouer = this.jouer.bind(this)
        this.pause = this.pause.bind(this)
        this.state = {
            context: null,
            stop: true,
            nom: props.nom,
            url: props.url,
            visible: props.visible,
            taille: props.taille || "huge",
            mode: props.mode || JOUER,
            patience: false
        }
        if(this.props.onRef) {
            this.props.onRef(this)
        }
    }    

    stop() {
        this.setState({stop: true})
        if(this.state.context) {
            this.state.context.close()
            this.setState({context: null})
        }
    }

    visible(etat) {
        this.setState({visible: etat})
    }

    chargerEtJouer() {        
        this.stop()
        this.setState({patience: true})
        Axios.get(this.state.url, {
            responseType: 'arraybuffer'
        })
        .then(res=>{
            let blob = new Blob([res.data])
            this.setState({context: new AudioContext()},
                this.setState({fichier: blob}, ()=>{                    
                    this.jouer()
                    this.setState({patience: false})
                })
            )
        })
        .catch(err=>{journal.error(err)})
    }

    stopEtJouer(fichier) {
        this.stop()        
        if(fichier) {            
            this.setState({context: new AudioContext()},
                this.setState({fichier: fichier})
            )
        }
    }

    pause() {
        if(this.state.context) {            
            this.setState({pause: true}, ()=>this.state.context.suspend())
        }
    }

    reprise() {
        if(this.state.context) {
            this.setState({pause: false}, ()=>this.state.context.resume())
        }
    }

    jouer() {
        let reader = new FileReader()
        let that = this
        let demarrerLecture = function(contexte, buffer) {
            var source = contexte.createBufferSource()
            source.buffer = buffer
            source.connect(contexte.destination)
            source.start(0)
        }
        reader.addEventListener('load', function(e) {
            let data = e.target.result
            let contexte = that.state.context
            if(contexte) {
                contexte.decodeAudioData(data, function(buffer) {                    
                    demarrerLecture(contexte, buffer)
                })
            }                
        })
        reader.readAsArrayBuffer(this.state.fichier)
        this.setState({stop: false})
    }

    render() {
        return (
            <>
            {
                (this.state.visible || (this.state.context && this.state.fichier)) && (
                    <BlockUi tag="div" style={this.props.style} blocking={this.state.patience} className="cliquable" onClick={()=>{ if(this.state.stop) { if(this.state.mode === 0){this.jouer()}else{this.chargerEtJouer()} }else{ if(this.state.pause){this.reprise()}else{this.pause()}}}}>
                        {(this.state.stop || this.state.pause)&& (<><img src={play} alt="stop" className="cliquable" />{!this.props.sanstexte && (Audio)}</>)}
                        {!this.state.stop && !this.state.pause && (<><img src={stop} alt="jouer" className={`cliquable`}/>{!this.props.sanstexte && (Audio)}</>)}
                    </BlockUi>
                )
            }
            </>
        )
    }
}

export default AudioLecture