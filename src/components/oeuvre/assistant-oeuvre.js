/**
 * Assistant de saisie de la description d'une oeuvre
 */
import './oeuvre.css'
import React, { Component } from 'react'
import { Wizard } from "semantic-ui-react-formik"
import axios from 'axios'
// Pages de l'assistant
import Embarquement from './assistant-oeuvre-embarquement'
import PageCollaborateurs from './assistant-oeuvre-collaborateurs'
import PageParoles from './assistant-oeuvre-paroles'
import PageGenres from './assistant-oeuvre-genres'
import PagePro from './assistant-oeuvre-pro'
import PageLiens from './assistant-oeuvre-liens'
import AudioLecture from './audio-lecture'
// Alertes
import { toast } from 'react-toastify'
// Traduction
import { Translation } from 'react-i18next'
// Modèle
import Oeuvre from '../../model/oeuvre/oeuvre'
import Entete from '../entete/entete'

import { Navbar } from '../navbar/navbar';


import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

class AssistantOeuvre extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pctProgression: 0,
            titre: props.titre
        }
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
            .then(res => {
                this.setState({ user: res }, () => {
                    console.log(this.state.user)
                })
            })
            .catch(err => {
                toast.error(err.message)
                confirmAlert({
                    title: ``,
                    message: ``,
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
                        <Translation>
                            {
                                t =>
                                    <Login message={ t('connexion.titre.oeuvre') } fn={ (user) => {
                                        onClose()
                                        this.setState({ user: user })
                                    } }/>
                            }
                        </Translation>
                })
            })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.audio !== nextProps.audio) {
            this.setState({ audio: nextProps.audio })
        }
    }

    render() {
        if (this.state.user) {
            return (
                <Translation>
                    {
                        (t, i18n) =>
                            <React.Fragment>
                                <Navbar></Navbar>
                                <div>
                                    Classe
                                </div>
                            </React.Fragment>

                    }
                </Translation>
            )
        } else {
            return (<div></div>)
        }

    }
}

export default AssistantOeuvre
