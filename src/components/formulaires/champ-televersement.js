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
        this.bloquerDebloquer = this.bloquerDebloquer.bind(this);
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

    render() {
        return(
            <Translation>
                {
                    (t) =>
                        <BlockUi tag="div" blocking={this.state.bloquer}>                            
                            <Dropzone onDrop={
                                (fichiers) => {
                                    toast.info(t('navigation.transfertEnCours'))
                                    this.bloquerDebloquer()
                                    this.props.chargement(fichiers)

                                    fichiers.forEach(fichier=>{
                                        let fd = new FormData()
                                        fd.append('file', fichier)                                    

                                        // Jouer la musique en attendant
                                        let context = new AudioContext()
                                        let playSound = function(buffer) {
                                            var source = context.createBufferSource()
                                            source.buffer = buffer
                                            source.connect(context.destination)                                            
                                            source.start(0)
                                        }

                                        var reader = new FileReader()
                                        reader.addEventListener('load', function(e) {
                                            var data = e.target.result
                                            context.decodeAudioData(data, function(buffer) {
                                                playSound(buffer)
                                            })
                                        })
                                        reader.readAsArrayBuffer(fichier)

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
                                            <p>{this.state.indication}</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </BlockUi> 
                }    
            </Translation>            
        )
    }
}