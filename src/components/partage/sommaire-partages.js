// Résumé du partage - US 64

import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { Translation } from 'react-i18next'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'
import EntetePartage from './entete-partage';

export default class SommairePartages extends Component {

    constructor(props){
        super(props)
        this.state = {
            mediaId: props.mediaId
        }
        this.initialisation = this.initialisation.bind(this)
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
            this.initialisation()
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: `Connexion obligatoire`,
                message: `Tu dois être connecté pour accéder`,
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <div>
                        <Login message="Connecte-toi pour accéder" fn={(user)=>{
                            onClose()
                            this.setState({user: user}, ()=>{
                                this.initialisation()
                            })
                        }} />
                </div>
            })
        })        
    }

    initialisation() {
        axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
        .then(res=>{
            this.setState({media: res.data.Item}, ()=>{
                axios.get(`http://api.smartsplit.org:8080/v1/proposal/media/${this.state.mediaId}`)
                .then(res=>{
                    this.setState({propositions: res.data}, ()=>{console.log(this.state.propositions, this.state.media)})
                })
            })
        })
    }

    render() {
        
        if(this.state.propositions && this.state.media) {
            return (
                <div className="ui segment">                    
                    <div className="ui grid" style={{padding: "10px"}}>
                        <EntetePartage media={this.state.media} user={this.state.user} />
                        <div className="ui row">
                            <div className="ui one wide column">
                            </div>
                            <div className="ui twelve wide column">
                                {JSON.stringify(this.state.propositions)}
                            </div>                        
                            <div className="ui one wide column">
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

}