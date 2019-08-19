/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import copyrightIcon from '../../assets/svg/icons/copyright-orange.svg';
import avatar1 from '../../assets/images/steve.jpg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelection } from "../formulaires/champ-selection";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import { ChampDate } from "../formulaires/champ-date";

class PageAssistantOeuvreDescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pctProgression: props.pctProgression,
            authors: [],
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
            this.state.authors !== prevState.authors ||
            this.state.composers !== prevState.composers ||
            this.state.publishers !== prevState.publishers
        ) {
            const authors = this.state.authors.map(this.addType('author'));
            const composers = this.state.composers.map(this.addType('composer'));
            const publishers = this.state.publishers.map(this.addType('publisher'));

            const rightHolders = authors
                .concat(composers)
                .concat(publishers);

            this.props.setFieldValue('rightHolders', rightHolders);
        }
    }

    rightHolderOptions() {
        return this.props.rightHolders.map(this.makeRightHolderOption);
    }

    makeRightHolderOption(rightHolder) {
        const artistText = rightHolder.artistName ?
            '(' + rightHolder.artistName + ')' :
            null;

        const fullName = [
            rightHolder.firstName,
            rightHolder.lastName,
            artistText
        ]
            .filter(text => text)
            .join(' ');

        return {
            key: rightHolder.rightHolderId,
            value: rightHolder.rightHolderId,
            text: fullName,
            image: { avatar: true, src: avatar1 }
        };
    };

    addType = type => rightHolder => Object.assign(rightHolder, { type: type });

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
                                            onChange={ authors => this.setState({ 'authors': authors }) }
                                        />

                                        <ChampSelection
                                            items={ this.rightHolderOptions() }
                                            label="Compositeurs"
                                            description="Qui a composé la musique de cette pièce musicale&#8239;?"
                                            placeholder="Ajouter un compositeur..."
                                            onChange={ composers => this.setState({ 'composers': composers }) }
                                        />

                                        <ChampSelection
                                            items={ this.rightHolderOptions() }
                                            label="Éditeurs"
                                            description="Qui représente ces auteurs et/ou compositeurs&#8239;?"
                                            placeholder="Ajouter un éditeur..."
                                            onChange={ publishers => this.setState({ 'publishers': publishers }) }
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
