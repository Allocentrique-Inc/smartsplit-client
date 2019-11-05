import React from 'react';
import { Translation } from "react-i18next";
import { Navbar } from "./oeuvre-resume/navbar";
import Entete from "./oeuvre-resume/entete";
import Corps from "./oeuvre-resume/corps";
import axios from 'axios';

export default class OeuvreResume extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId            
        }
    }

    componentWillMount() {
        axios.get(`http://dev.api.smartsplit.org:8080/v1/media/${this.props.mediaId}`)
        .then(res=>{
            let _m = res.data.Item
            this.setState({media: _m},
                ()=>{
                    axios.get('http://dev.api.smartsplit.org:8080/v1/rightHolders')
                    .then(response => {
                        let _adParUuid = { }
                        response.data.forEach(e => {
                          _adParUuid[e.rightHolderId] = e
                        })
                        this.setState({ rightHolders: _adParUuid });
                    })
                    .catch(error => {                        
                    });
                })
        })
    }

    render() {
        if(this.state.media) {
            return (
                <Translation>
                    {
                        (t) =>
                            <>
                                <Navbar media={this.state.media} />
                                <Entete media={this.state.media} />
                                <Corps media={this.state.media} />
                            </>
                    }
                </Translation>
            )
        } else {
            return (<></>)
        }    
    }
}
