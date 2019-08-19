/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import copyrightIcon from '../../assets/svg/icons/copyright-orange.svg';
import avatar1 from '../../assets/images/steve.jpg';
import avatar2 from '../../assets/images/stevie.jpg';
import avatar3 from '../../assets/images/elliot.jpg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelection } from "../formulaires/champ-selection";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import { ChampDate } from "../formulaires/champ-date";

class PageAssistantOeuvreDescription extends Component {
    persons = [
        {
            key: 1,
            text: 'Gros Bidule',
            value: 1,
            image: { avatar: true, src: avatar1 }
        },
        {
            key: 2,
            text: 'Machin Chouette',
            value: 2,
            image: { avatar: true, src: avatar2 }
        },
        {
            key: 3,
            text: 'Souffler Danslecou',
            value: 3,
            image: { avatar: true, src: avatar3 }
        },
    ];

    constructor(props) {
        super(props);

        this.state = {
            pctProgression: props.pctProgression,
            selectedAuthorValues: [],
            selectedAuthorValue: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({ pctProgression: nextProps.pctProgression })
        }
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
                                            items={ this.persons }
                                            label="Auteurs"
                                            description="Qui a écrit les paroles de cette pièce musicale&#8239;?"
                                            placeholder="Ajouter un auteur..."
                                        />

                                        <ChampSelection
                                            items={ this.persons }
                                            label="Compositeurs"
                                            description="Qui a composé la musique de cette pièce musicale&#8239;?"
                                            placeholder="Ajouter un compositeur..."
                                        />

                                        <ChampSelection
                                            items={ this.persons }
                                            label="Éditeurs"
                                            description="Qui représente ces auteurs et/ou compositeurs&#8239;?"
                                            placeholder="Ajouter un éditeur..."
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
                                                name="codeIswc"
                                                placeholder="Ajouter un code..."
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
