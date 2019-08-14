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

import { Navbar } from '../navbar/navbar';

import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

class AssistantOeuvre extends Component {

    constructor(props) {
        super(props);
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

    getInitialValues() {
        return {
            // mediaId: 0,
            title: this.state.titre,
            album: "",
            artist: "",
            cover: "false",
            rightHolders: [{}],
            jurisdiction: "",
            rightsType: [],
            genre: "",
            secondaryGenre: [],
            lyrics: "",
            inLanguages: [],
            isrc: "",
            upc: "",
            msDuration: "",
            socialMediaLinks: [],
            streamingServiceLinks: [],
            pressArticleLinks: [],
            playlistLinks: [],
            creationDate: "",
            modificationDate: "",
            publishDate: "",
            publisher: "",
            rightsSplit: {}
        };
    }

    onSubmit(values, actions, t) {
        let oeuvre = new Oeuvre(values);
        let body = oeuvre.get();

        axios.post('http://api.smartsplit.org:8080/v1/media', body)
            .then((response) => {
                actions.setSubmitting(false);
                toast(t('flot.envoi.reussi'));

                setTimeout(() => {
                    window.location.href = '/liste-oeuvres';
                }, 4000);
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    render() {
        if (this.state.user) {
            return (
                <Translation>
                    {
                        (t, i18n) =>
                            <React.Fragment>
                                <Navbar songTitle={ this.state.titre }/>

                                <Wizard
                                    initialValues={ this.getInitialValues() }
                                    onSubmit={ (values, actions, t) => {
                                        this.onSubmit(values, actions, t)
                                    } }
                                    buttonLabels={ {
                                        previous: t('navigation.precedent'),
                                        next: t('navigation.suivant'),
                                        submit: t('navigation.envoi')
                                    } }
                                    debug={ false }
                                >
                                    <Wizard.Page>
                                        <Embarquement audio={ this.state.audio } i18n={ i18n } pctProgression={ 5 }/>
                                    </Wizard.Page>

                                    <Wizard.Page>
                                        <PageCollaborateurs i18n={ i18n } pctProgression={ 15 }/>
                                    </Wizard.Page>

                                    <Wizard.Page>
                                        <PageParoles i18n={ i18n } pctProgression={ 55 }/>
                                    </Wizard.Page>

                                    <Wizard.Page>
                                        <PageGenres i18n={ i18n } pctProgression={ 75 }/>
                                    </Wizard.Page>

                                    <Wizard.Page>
                                        <PagePro pctProgression={ 85 }/>
                                    </Wizard.Page>

                                    <Wizard.Page>
                                        <PageLiens pctProgression={ 97 }/>
                                    </Wizard.Page>

                                </Wizard>

                                <AudioLecture onRef={
                                    (audio)=>{ this.setState({audio: audio}) }
                                } />
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
