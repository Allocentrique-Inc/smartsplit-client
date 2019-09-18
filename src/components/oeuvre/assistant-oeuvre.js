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

// Modèle


class AssistantOeuvre extends Component {
    pageProgressPercentages = [10, 20, 30, 40, 50, 70, 80, 100];

    constructor(props) {
        super(props);

        this.state = {
            progressPercentage: this.pageProgressPercentages[0],
            title: props.titre,
            rightHolders: [],
            endModalOpen: false
        };
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
            .then(response => {
                this.setState({ user: response }, () => {
                    console.log(this.state.user);
                })
            })
            .catch(error => {
                toast.error(error.message)
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
                                    <Login message={ t('connexion.title.oeuvre') } fn={ (user) => {
                                        onClose()
                                        this.setState({ user: user })
                                    } }/>
                            }
                        </Translation>
                })
            })

        this.fetchApiRightHolders();
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
        return {
            title: this.state.title,
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
        };
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

        /*let oeuvre = new Oeuvre(values);
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
            });*/
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
                                />

                                <Wizard
                                    initialValues={ this.getInitialValues() }
                                    onPageChanged={ this.onPageChanged }
                                    onSubmit={ this.onSubmit }

                                    buttonLabels={ {
                                        previous: t('navigation.precedent'),
                                        next: t('navigation.suivant'),
                                        submit: t('navigation.envoi')
                                    } }

                                    debug={ true }
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
                    }
                </Translation>
            )
        } else {
            return (<></>)
        }

    }
}

export default AssistantOeuvre
