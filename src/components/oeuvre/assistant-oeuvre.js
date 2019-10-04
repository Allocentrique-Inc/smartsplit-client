/**
 * Assistant de saisie de la description d'une oeuvre
 */
import React, { Component } from 'react';
import { Wizard } from "semantic-ui-react-formik";
import axios from 'axios';
// Pages de l'assistant
import PageCreation from './page-creation';
import PageInterpretation from './page-interpretation';
import PageInformationsGenerales from './page-informations-generales';
import PageParoles from './page-paroles';
import PageLiens from './page-liens';
import PageEnregistrement from "./page-enregistrement";
import PageFichiers from './page-fichiers';
// Alertes
import { toast } from 'react-toastify';
// Traduction
import { Translation } from 'react-i18next';
import { Navbar } from '../navigation/navbar';

import { Auth } from 'aws-amplify';

import Login from '../auth/Login';
import ModalFin from "./modal-fin";
import { confirmAlert } from 'react-confirm-alert';
import ModaleConnexion from '../auth/Connexion';

// Modèle


class AssistantOeuvre extends Component {
    pageProgressPercentages = [10, 20, 30, 40, 50, 70, 80, 100];

    constructor(props) {
        super(props)

        this.state = {
            progressPercentage: this.pageProgressPercentages[0],
            title: props.titre,
            rightHolders: [],
            endModalOpen: false,
            modaleConnexion: false,
            mediaId: props.mediaId
        }
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(response => {            
            if(this.state.mediaId) {
                axios.get(`http://dev.api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
                .then(res=>{                    
                    if(res.data.Item) {
                        let media = res.data.Item
                        this.setState({media: media}, ()=>this.fetchApiRightHolders())
                        this.setState({ user: response })
                    }
                })
            } else {
                this.setState({ user: response })
                this.fetchApiRightHolders()
            }
        })
        .catch(error => {
            console.log(error)
            this.setState({modaleConnexion: true})
        })          
    }

    fetchApiRightHolders() {
        axios.get('http://dev.api.smartsplit.org:8080/v1/rightHolders')
            .then(response => {
                this.setState({ rightHolders: response.data });
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.audio !== nextProps.audio) {
            this.setState({ audio: nextProps.audio })
        }
    }

    getInitialValues() {

        let _m = this.state.media
        let valeurs = {}

        if(!_m) {
            valeurs = {
                title: "",
                album: "",
                artist: "",
                cover: "false",
                rightHolders: [],
                jurisdiction: "",
                rightsType: [],
                lyrics: {
                    text: "",
                    languages: [],
                    access: "private"
                },
                isrc: "",
                iswc: "",
                upc: "",
                msDuration: "",
                duration: "",
                bpm: "",
                influence: "",
                genre: "",
                secondaryGenres: [],
                socialMediaLinks: [],
                streamingServiceLinks: [],
                pressArticleLinks: [],
                playlistLinks: [],
                creationDate: "",
                modificationDate: "",
                publishDate: "",
                publisher: "",
                studio: "",
                studioAddress: "",
                label: "",
                labelAddress: "",
                distributor: "",
                distributorAddress: "",
                rightsSplit: {},
                files: {
                    cover: {
                        file: null,
                        access: "private"
                    },
                    audio: {
                        file: null,
                        access: "private"
                    },
                    score: {
                        file: null,
                        access: "private"
                    },
                    midi: {
                        file: null,
                        access: "private"
                    }
                }
            }
        } else {
            valeurs = {
                title: _m.title,
                album: _m.album,
                artist: _m.artist,
                cover: "false",
                rightHolders: [],
                jurisdiction: "",
                rightsType: [],
                lyrics: {
                    text: "",
                    languages: [],
                    access: "private"
                },
                isrc: _m.isrc,
                iswc: _m.iswc,
                upc: _m.upc,
                msDuration: _m.msDuration,
                duration: "",
                bpm: "",
                influence: "",
                genre: _m.genre,
                secondaryGenres: [],
                socialMediaLinks: _m.socialMediaLinks || [],
                streamingServiceLinks: _m.streamingServiceLinks || [],
                pressArticleLinks: _m.pressArticleLinks || [],
                playlistLinks: _m.playlistLinks || [],
                creationDate: _m.creationDate,
                modificationDate: _m.modificationDate,
                publishDate: _m.publishDate,
                publisher: _m.publisher,
                studio: "",
                studioAddress: "",
                label: "",
                labelAddress: "",
                distributor: "",
                distributorAddress: "",
                rightsSplit: {},
                files: {
                    cover: {
                        file: null,
                        access: "private"
                    },
                    audio: {
                        file: _m.fichier,
                        access: "private"
                    },
                    score: {
                        file: null,
                        access: "private"
                    },
                    midi: {
                        file: null,
                        access: "private"
                    }
                }
            }
        }
        return valeurs
    }

    onPageChanged = value => {
        const newProgressPercentage = this.pageProgressPercentages[value] || 100;

        this.setState({
            progressPercentage: newProgressPercentage
        });
    };

    onSubmit = (values, actions, t) => {
        this.setState({
            endModalOpen: true
        });

        //let oeuvre = new Oeuvre(values);
        //let body = oeuvre.get();

        axios.post('http://dev.api.smartsplit.org:8080/v1/media', values)
            .then((response) => {
                actions.setSubmitting(false);
                toast(t('flot.envoi.reussi'));
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    render() {
        if (this.state.user) {
            return (
                <Translation>
                    {
                        (t, i18n) =>
                            <>
                                <Navbar
                                    songTitle={ this.state.title }
                                    pochette={ this.props.pochette }
                                    progressPercentage={ this.state.progressPercentage }
                                    profil={this.state.user}
                                />

                                {
                                    this.state.rightHolders && (
                                    <>
                                        <Wizard
                                            initialValues={ this.getInitialValues() }
                                            onPageChanged={ this.onPageChanged }
                                            onSubmit={ this.onSubmit }

                                            buttonLabels={ {
                                                previous: t('navigation.precedent'),
                                                next: t('navigation.suivant'),
                                                submit: t('navigation.envoi')
                                            } }

                                            debug={ false }
                                        >
                                            <Wizard.Page>
                                                <PageCreation
                                                    pochette={ this.props.pochette }
                                                    i18n={ i18n }
                                                    rightHolders={ this.state.rightHolders }
                                                />
                                            </Wizard.Page>

                                            <Wizard.Page>
                                                <PageInterpretation
                                                    pochette={ this.props.pochette }
                                                    i18n={ i18n }
                                                    rightHolders={ this.state.rightHolders }
                                                />
                                            </Wizard.Page>

                                            <Wizard.Page>
                                                <PageEnregistrement
                                                    pochette={ this.props.pochette }
                                                    i18n={ i18n }
                                                    rightHolders={ this.state.rightHolders }
                                                />
                                            </Wizard.Page>

                                            <Wizard.Page>
                                                <PageFichiers
                                                    pochette={ this.props.pochette }
                                                    i18n={ i18n }
                                                />
                                            </Wizard.Page>

                                            <Wizard.Page>
                                                <PageInformationsGenerales
                                                    pochette={ this.props.pochette }
                                                    i18n={ i18n }
                                                />
                                            </Wizard.Page>

                                            <Wizard.Page>
                                                <PageParoles
                                                    pochette={ this.props.pochette }
                                                />
                                            </Wizard.Page>

                                            <Wizard.Page>
                                                <PageLiens
                                                    pochette={ this.props.pochette }
                                                />
                                            </Wizard.Page>
                                        </Wizard>
                                        <ModalFin
                                            songTitle={ this.state.title }
                                            open={ this.state.endModalOpen }
                                            onClose={ () => this.setState({ endModalOpen: false }) }
                                        />
                                    </>
                                    )
                                }                                
                                
                            </>
                    }
                </Translation>
            )
        } else {
            return (<ModaleConnexion parent={this} isOpen={this.state.modaleConnexion} />)
        }

    }
}

export default AssistantOeuvre
