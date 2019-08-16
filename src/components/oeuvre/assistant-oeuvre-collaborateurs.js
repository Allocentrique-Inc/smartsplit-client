/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Dropdown } from "semantic-ui-react";
import { DateInput } from 'semantic-ui-calendar-react';

import copyrightIcon from '../../assets/images/icon_copyright.png';
import avatar1 from '../../assets/images/steve.jpg';
import avatar2 from '../../assets/images/stevie.jpg';
import avatar3 from '../../assets/images/elliot.jpg';

import '../../assets/scss/assistant-form.scss';

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
            dateCreation: '',
            selectedAuthorValues: [],
            selectedAuthorValue: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({ pctProgression: nextProps.pctProgression })
        }
    }

    setDateCreation = (event, { value }) => {
        this.setState({ dateCreation: value });
    };

    isSelectedPerson = person => this.state.selectedAuthorValues.includes(person.value);
    isUnselectedPerson = person => !this.isSelectedPerson(person);

    getSelectedPersons() {
        return this.persons.filter(this.isSelectedPerson);
    }

    getUnselectedPersons() {
        return this.persons.filter(this.isUnselectedPerson);
    }

    onAuthorSelection(event, { value }) {
        this.selectPerson(value);
    }

    selectPerson(personValue) {
        const selectedAuthorValues = this.state.selectedAuthorValues;

        if (!selectedAuthorValues.includes(personValue)) {
            selectedAuthorValues.push(personValue);
        }

        this.setState({
            selectedAuthorValues: selectedAuthorValues
        });
    }

    unselectPerson(person) {
        const selectedAuthorValues = this.state.selectedAuthorValues.filter(value => value !== person.value);

        this.setState({
            selectedAuthorValues: selectedAuthorValues
        });
    }

    renderSelectedPersons() {
        return this.getSelectedPersons().map(person => {
            return <div className={ 'h3-style' }
                        onClick={ () => {
                            this.unselectPerson(person);
                        } }
                        key={ 'person.key' }
            >
                { person.text }
            </div>;
        })
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
                                            C’est ici que tu indiques qui a contribué à la création de cette pièce.
                                        </p>

                                        <label>
                                            <div className="input-label">Date de création</div>

                                            <DateInput
                                                name="dateCreation"
                                                placeholder="Ajouter une date..."
                                                value={ this.state.dateCreation }
                                                onChange={ this.setDateCreation }
                                            />
                                        </label>

                                        <label>
                                            <div className="input-label">Auteurs</div>

                                            <p className="input-description">
                                                Qui a écrit les paroles de cette pièce musicale&#8239;?
                                            </p>

                                            { this.renderSelectedPersons() }

                                            <Dropdown
                                                placeholder='Ajouter un auteur...'
                                                fluid
                                                selection
                                                onChange={ this.onAuthorSelection.bind(this) }
                                                options={ this.getUnselectedPersons() }
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
