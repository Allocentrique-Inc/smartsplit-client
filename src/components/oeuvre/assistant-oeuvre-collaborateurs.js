/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import copyrightIcon from '../../assets/svg/icons/copyright-orange.svg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelection } from "../formulaires/champ-selection";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import { ChampDate } from "../formulaires/champ-date";

class PageAssistantOeuvreDescription extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pctProgression: props.pctProgression,
            songwriters: [],
            composers: [],
            publishers: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({ pctProgression: nextProps.pctProgression })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.songwriters !== prevState.songwriters ||
            this.state.composers !== prevState.composers ||
            this.state.publishers !== prevState.publishers
        ) {
            const songwriters = this.state.songwriters.reduce(this.pushRole('songwriter'), {});
            const songwritersAndComposers = this.state.composers.reduce(this.pushRole('composer'), songwriters);
            const rightHolders = this.state.publishers.reduce(this.pushRole('publisher'), songwritersAndComposers);

            this.props.setFieldValue('rightHolders', rightHolders);
        }
    }

    pushRole = type => (rightHolders, uuid) => {
        rightHolders[uuid] = rightHolders[uuid] || [];
        rightHolders[uuid].push(type);
        return rightHolders;
    };

    rightHolderOptions() {
        return this.props.rightHolders.map(this.makeRightHolderOption);
    }

    makeRightHolderOption = rightHolder => {
        return {
            key: rightHolder.rightHolderId,
            value: rightHolder.rightHolderId,
            text: this.makeRightHolderText(rightHolder),
            image: {
                avatar: true,
                src: this.makeRightHolderAvatarUrl(rightHolder)
            }
        };
    };

    makeRightHolderText = rightHolder => {
        return rightHolder.artistName ?
            rightHolder.artistName :
            [rightHolder.firstName, rightHolder.lastName]
                .filter(text => text)
                .join(' ');
    };

    makeRightHolderAvatarUrl = rightHolder => {
        const avatarImage = rightHolder.avatarImage;

        return avatarImage ?
            'https://smartsplit-images.s3.us-east-2.amazonaws.com/' + avatarImage :
            'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg';
    };

    updateRightHolders(key, newRightHolderIds) {
        this.setState({ [key]: newRightHolderIds });
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>
                            <div className="ui container assistant-container">
                                <div className="ui grid">
                                    <div
                                        className="form-column ui sixteen wide mobile eight wide tablet eight wide computer column"
                                    >
                                        <h1 className="section-title">
                                            <span className="section-icon">
                                                <img src={ copyrightIcon } alt={ 'création' }/>
                                            </span>

                                            <span className="section-label">
                                                Création
                                            </span>
                                        </h1>

                                        <h2 className="section-question">
                                            Qui a participé à la création de { this.props.songTitle }&#8239;?
                                        </h2>

                                        <p className="section-description">
                                            C’est ici que tu indiques qui a contribué à la création de cette
                                            pièce.
                                        </p>

                                        <ChampDate
                                            label="Date de création"
                                            value={ this.props.values.creationDate }
                                            onChange={ (event, { value }) => this.props.setFieldValue('creationDate', value) }
                                        />

                                        <ChampSelection
                                            items={ this.rightHolderOptions() }
                                            label="Auteurs"
                                            description="Qui a écrit les paroles de cette pièce musicale&#8239;?"
                                            placeholder="Ajouter un auteur..."
                                            onChange={ ids => this.setState({ songwriters: ids }) }
                                        />

                                        <ChampSelection
                                            items={ this.rightHolderOptions() }
                                            label="Compositeurs"
                                            description="Qui a composé la musique de cette pièce musicale&#8239;?"
                                            placeholder="Ajouter un compositeur..."
                                            onChange={ ids => this.setState({ composers: ids }) }
                                        />

                                        <ChampSelection
                                            items={ this.rightHolderOptions() }
                                            label="Éditeurs"
                                            description="Qui représente ces auteurs et/ou compositeurs&#8239;?"
                                            placeholder="Ajouter un éditeur..."
                                            onChange={ ids => this.setState({ publishers: ids }) }
                                        />

                                        <label>
                                            <div className="input-label">Code ISWC</div>

                                            <p className="input-description">
                                                L'International Standard Work Code est un code unique
                                                d'identification
                                                des oeuvres musicales.
                                            </p>

                                            <Input
                                                fluid
                                                placeholder="Ajouter un code..."
                                                onChange={ (event, { value }) => this.props.setFieldValue('iswc', value) }
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                }
            </Translation>
        )
    }
}

export default PageAssistantOeuvreDescription
