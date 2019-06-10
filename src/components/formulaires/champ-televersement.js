import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import FormData from 'form-data'

export class ChampTeleversement extends Component {

    constructor(props){
        super(props)
        this.state = {
            indication: props.indication
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
    }

    render() {
        return(
            <Dropzone onDrop={
                (acceptedFiles) => {
                    console.log(acceptedFiles)
                    // Création du fichier
                    acceptedFiles.forEach(fichier=>{
                        console.log(fichier)
                        let fd = new FormData()
                        fd.append('file', fichier)
                        axios
                            .post('https://lckh3cn2l8.execute-api.us-east-2.amazonaws.com/dev/TeleverserOeuvre', fd)
                            .then(res=>{
                                console.log(res)
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
        )
    }
}