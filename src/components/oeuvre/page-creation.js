/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import copyrightIconOrange from '../../assets/svg/icons/copyright-orange.svg';
import copyrightIconGreen from '../../assets/svg/icons/copyright-green.svg';
import '../../assets/scss/assistant-form.scss';

import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit";
import ChampDate from "../page-assistant/champ-date";
import Page from "../page-assistant/page";

import * as roles from '../../assets/listes/role-uuids.json';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampTexte from "../page-assistant/champ-texte";

import RightHolderOptions from "../page-assistant/right-holder-options";
import { FilterRightHoldersByRole, AddRole } from "../page-assistant/right-holder-roles";

export default class PageCreation extends Component {
    constructor(props) {
        super(props);

        const songwriters = FilterRightHoldersByRole(roles.songwriter, props.values.rightHolders);
        const composers = FilterRightHoldersByRole(roles.composer, props.values.rightHolders);
        const publishers = FilterRightHoldersByRole(roles.publisher, props.values.rightHolders);

        this.state = {
            songwriters: songwriters,
            composers: composers,
            publishers: publishers
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.songwriters !== prevState.songwriters ||
            this.state.composers !== prevState.composers ||
            this.state.publishers !== prevState.publishers
        ) {
            const songwritersToUpdate = this.state.songwriters.reduce(AddRole(roles.songwriter), {});
            const songwritersAndComposersToUpdate = this.state.composers.reduce(AddRole(roles.composer), songwritersToUpdate);
            const rightHoldersToUpdate = this.state.publishers.reduce(AddRole(roles.publisher), songwritersAndComposersToUpdate);

            const rightHolders = Object.assign({}, this.props.values.rightHolders, rightHoldersToUpdate);

            this.props.setFieldValue('rightHolders', rightHolders);
        }
    }

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
                                    label={ t('flot.documenter.entete.creation') }
                                    question={ t('flot.documenter.titre1') + ' ' + this.props.values.title + "&#8239;?" }
                                    description={ t('flot.documenter.titre1-description') }
                                />

                                <ChampDate
                                    label={ t('flot.documenter.date-creation') }
                                    placeholder={ t('flot.documenter.date-placeholder') }
                                    value={ this.props.values.creationDate }
                                    onChange={ value => this.props.setFieldValue('creationDate', value) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label={ t('flot.documenter.auteur') }
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.auteur-description') }
                                    placeholder={ t('flot.documenter.auteur-placeholder') }
                                    value={ this.state.songwriters }
                                    onChange={ ids => this.setState({ songwriters: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label={ t('flot.documenter.compositeur') }
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.compositeur-description') }
                                    placeholder="Ajouter un compositeur..."
                                    value={ this.state.composers }
                                    onChange={ ids => this.setState({ composers: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label={ t('flot.documenter.editeur') }
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.editeur-description') }
                                    placeholder={ t('flot.documenter.editeur-placeholder') }
                                    value={ this.state.publishers }
                                    onChange={ ids => this.setState({ publishers: ids }) }
                                />

                                <ChampTexte
                                    label={ t('flot.documenter.code') }
                                    description={ t('flot.documenter.code-description') }
                                    placeholder={ t('flot.documenter.code-placeholder') }
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
