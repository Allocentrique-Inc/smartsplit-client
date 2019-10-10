/**
 * Assistant de saisie de la description d'une oeuvre
 */
import React, { Component } from 'react';
import { Wizard } from "semantic-ui-react-formik";
import axios from 'axios';

import moment from 'moment'

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
import { ConsoleLogger } from '@aws-amplify/core';


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
                axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
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
        axios.get('http://api.smartsplit.org:8080/v1/rightHolders')
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
                mediaId: this.state.mediaId,
                title: "",
                album: "",
                artist: "",
                cover: "false",
                rightHolders: [],
                jurisdiction: "",            
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

            let lyrics = _m.lyrics

            lyrics.text = lyrics.text.trim()

            valeurs = {
                mediaId: this.state.mediaId,
                title: _m.title.trim(),
                album: _m.album.trim(),
                artist: _m.artist.trim(),
                cover: _m.cover.trim(),
                rightHolders: _m.rightHolders ? _m.rightHolders : [],
                jurisdiction: _m.jurisdiction.trim(),
                lyrics: lyrics,
                isrc: _m.isrc.trim(),
                iswc: _m.iswc.trim(),
                upc: _m.upc.trim(),
                msDuration: _m.msDuration.trim(),
                bpm: _m.bpm.trim(),
                influence: _m.influence.trim(),
                genre: _m.genre.trim(),
                secondaryGenres: _m.secondaryGenres,
                socialMediaLinks: _m.socialMediaLinks || [],
                streamingServiceLinks: _m.streamingServiceLinks || [],
                pressArticleLinks: _m.pressArticleLinks || [],
                playlistLinks: _m.playlistLinks || [],
                creationDate: moment(_m.creationDate).locale('fr').format("L"),
                modificationDate: _m.modificationDate.trim(),
                publishDate: _m.publishDate.trim(),
                publisher: _m.publisher.trim(),
                studio: _m.studio.trim(),
                studioAddress: _m.studioAddress.trim(),
                label: _m.label.trim(),
                labelAddress: _m.labelAddress.trim(),
                distributor: _m.distributor.trim(),
                distributorAddress: _m.distributorAddress.trim(),                
                files: _m.files
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

        axios.post('http://api.smartsplit.org:8080/v1/media', values)
            .then((response) => {
                actions.setSubmitting(false);                
            })
            .catch((error) => {
                console.log(error)
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
                                                    i18n={ i18n }
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
                                            titre={ this.state.title }
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
