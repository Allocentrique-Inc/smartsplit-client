import React, { Component } from 'react'

class AudioLecture extends Component {

    constructor(props) {
        super(props)
        props.onRef(this)
        this.stopEtJouer = this.stopEtJouer.bind(this)
        this.jouer = this.jouer.bind(this)
        this.pause = this.pause.bind(this)
        this.state = {
            context: null
        }
    }



    stop() {
        this.setState({stop: true})
        if(this.state.context) {
            this.state.context.close()
            this.setState({context: null})
        }
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
            <div>
            {
                this.state.context && this.state.fichier && (
                    <div onClick={()=>{ if(this.state.stop) {this.jouer()}else{ if(this.state.pause){this.reprise()}else{this.pause()}}}}>
                        {(this.state.stop || this.state.pause)&& (<><i className="play circle outline icon huge grey" style={{cursor: 'pointer'}} ></i> Audio</>)}
                        {!this.state.stop && !this.state.pause && (<><i className="pause circle outline icon huge grey" style={{cursor: 'pointer'}} ></i> Audio</>)}
                    </div>
                )
            }                             
            </div>
        )
    }
}

export default AudioLecture