import React, { Component } from 'react'

class AudioLecture extends Component {

    constructor(props) {
        super(props)
        props.onRef(this)
        this.stopEtJouer = this.stopEtJouer.bind(this)
        this.state = {
            context: null
        }
    }

    stop() {
        if(this.state.context) {
            this.state.context.close()
            this.setState({context: null})
        }
    }

    stopEtJouer(fichier) {
        this.stop()
        if(fichier) {
            this.setState({context: new AudioContext()}, ()=>{
                let reader = new FileReader()
                let that = this
                reader.addEventListener('load', function(e) {
                    let data = e.target.result
                    let contexte = that.state.context
                    if(contexte) {
                        contexte.decodeAudioData(data, function(buffer) {                    
                            playSound(contexte, buffer)
                        })
                    }                
                })
                reader.readAsArrayBuffer(fichier)
            })
            
            let playSound = function(contexte, buffer) {
                var source = contexte.createBufferSource()
                source.buffer = buffer
                source.connect(contexte.destination)
                source.start(0)
            }
        }        
        
    }

    render() {
        return (
            <div>
            {
                this.state.context && (
                    <div onClick={()=>{this.stop()}}>
                        <i className="stop circle outline icon huge grey" style={{cursor: 'pointer'}} ></i> Audio
                    </div>
                )
            }                             
            </div>
        )
    }
}

export default AudioLecture