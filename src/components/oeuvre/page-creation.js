/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import copyrightIconOrange from '../../assets/svg/icons/copyright-orange.svg';
import copyrightIconGreen from '../../assets/svg/icons/copyright-green.svg';
import '../../assets/scss/assistant-form.scss';

import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import ChampDate from "../page-assistant/champ-date";
import Page from "../page-assistant/page";

import * as roles from '../../assets/listes/role-uuids.json';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";

import RightHolderOptions from "../page-assistant/right-holder-options";
import ChampTexte from "../page-assistant/champ-texte";

export default class PageCreation extends Component {
    constructor(props) {
        super(props);

        const songwriters = this.filterShareHolders(roles.songwriter, props.values.rightHolders);
        const composers = this.filterShareHolders(roles.composer, props.values.rightHolders);
        const publishers = this.filterShareHolders(roles.publisher, props.values.rightHolders);

        this.state = {
            songwriters: songwriters,
            composers: composers,
            publishers: publishers
        }
    }

    filterShareHolders(role, rightHolders) {
        return Object.keys(rightHolders).filter(rightHolderUuid => rightHolders[rightHolderUuid].includes(role));
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.songwriters !== prevState.songwriters ||
            this.state.composers !== prevState.composers ||
            this.state.publishers !== prevState.publishers
        ) {
            const songwriters = this.state.songwriters.reduce(this.pushRole(roles.songwriter), {});
            const songwritersAndComposers = this.state.composers.reduce(this.pushRole(roles.composer), songwriters);
            const rightHolders = this.state.publishers.reduce(this.pushRole(roles.publisher), songwritersAndComposers);

            this.props.setFieldValue('rightHolders', rightHolders);
        }
    }

    pushRole = type => (rightHolders, uuid) => {
        rightHolders[uuid] = rightHolders[uuid] || [];
        rightHolders[uuid].push(type);
        return rightHolders;
    };

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

    icon() {
        return this.props.pochette ? copyrightIconOrange : copyrightIconGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <Page
                            pochette={ this.props.pochette }
                        >
                            <Colonne>
                                <Entete
                                    pochette={ this.props.pochette }
                                    icon={ this.icon() }
                                    label={ 'Création' }
                                    question={ 'Qui a participé à la création de ' + this.props.values.title + ' ?' }
                                    description={ 'C’est ici que tu indiques qui a contribué à la création de cette pièce.' }
                                />

                                <ChampDate
                                    label="Date de création"
                                    value={ this.props.values.creationDate }
                                    onChange={ value => this.props.setFieldValue('creationDate', value) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Auteurs"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="Qui a écrit les paroles de cette pièce musicale&#8239;?"
                                    placeholder="Ajouter un auteur..."
                                    value={ this.state.songwriters }
                                    onChange={ ids => this.setState({ songwriters: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Compositeurs"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="Qui a composé la musique de cette pièce musicale&#8239;?"
                                    placeholder="Ajouter un compositeur..."
                                    value={ this.state.composers }
                                    onChange={ ids => this.setState({ composers: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Éditeurs"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="Qui représente ces auteurs et/ou compositeurs&#8239;?"
                                    placeholder="Ajouter un éditeur..."
                                    value={ this.state.publishers }
                                    onChange={ ids => this.setState({ publishers: ids }) }
                                />

                                <ChampTexte
                                    label={'Code ISWC'}
                                    description={'L\'International Standard Work Code est un code unique' +
                                    ' d\'identification des oeuvres musicales.'}
                                    placeholder={'Ajouter un code...'}
                                    value={ this.props.values.iswc }
                                    onChange={ value => this.props.setFieldValue('iswc', value) }
                                />
                            </Colonne>
                        </Page>

                }
            </Translation>
        )
    }
}
