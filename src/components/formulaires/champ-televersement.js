import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

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
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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