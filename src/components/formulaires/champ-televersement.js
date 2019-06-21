import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import FormData from 'form-data'

// Bloquer l'interactivité utilisateur
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

// Alertes
import { toast } from 'react-toastify'
import { Translation } from 'react-i18next';

export class ChampTeleversement extends Component {

    constructor(props){
        super(props)
        this.bloquerDebloquer = this.bloquerDebloquer.bind(this)
        this.stopEtJouer = this.stopEtJouer.bind(this)
        this.stop = this.stop.bind(this)
        this.state = {
            indication: props.indication,
            bloquer: false
        }
    }

    bloquerDebloquer() {
        this.setState({bloquer: !this.state.bloquer});
    }    

    componentWillReceiveProps(nextProps) {
        if(this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
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
        this.setState({context: new AudioContext()}, ()=>{
            let reader = new FileReader()
            let that = this
            reader.addEventListener('load', function(e) {
                let data = e.target.result
                let contexte = that.state.context
                contexte.decodeAudioData(data, function(buffer) {                    
                    playSound(contexte, buffer)
                })
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

    render() {

        return(
            <Translation>
                {
                    (t) =>
                        <div>
                            <BlockUi tag="div" blocking={this.state.bloquer}>                            
                                <Dropzone onDrop={
                                    (fichiers) => {
                                        toast.info(t('navigation.transfertEnCours'))
                                        this.bloquerDebloquer()
                                        this.props.chargement(fichiers)                                    

                                        fichiers.forEach(fichier=>{

                                            // Redémarre le lecteur audio
                                            this.stopEtJouer(fichier)

                                            let fd = new FormData()
                                            fd.append('file', fichier)

                                            axios
                                                .post('http://envoi.smartsplit.org:3033/envoi', fd)
                                                .then(res=>{                                                
                                                    this.props.apres(res.data)
                                                })
                                                .catch(err=>{
                                                    toast.error(t('flot.envoifichier.echec') + ` ${fichier.name}`)
                                                })
                                                .finally(()=>{
                                                    this.bloquerDebloquer()                                                
                                                })
                                        })
                                    }}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div className="drop-zone" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <br/>
                                                <p>{this.state.indication}</p>                                            
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>                            
                            </BlockUi>
                            <div style={{position: 'absolute', margin: '0 auto'}}>
                            {
                                this.state.context && (
                                    <div onClick={this.stop}>
                                        <i className="stop circle outline icon huge grey" style={{cursor: 'pointer'}} ></i> Stop Audio
                                    </div>
                                )
                            }                             
                            </div>
                        </div>
                }    
            </Translation>            
        )
    }
}