/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react";
import { Translation } from 'react-i18next';

import starIconOrange from '../../assets/svg/icons/star-orange.svg';
import starIconGreen from '../../assets/svg/icons/star-green.svg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelectionInterprete } from "../page-assistant/champ-selection-interprete";
import Page from "../page-assistant/page";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";

import * as roles from '../../assets/listes/role-uuids.json';
import { FilterRightHoldersByRoles } from "../page-assistant/right-holder-roles";

export default class PageInterpretation extends Component {
    musicians() {
        return this.musicianUuids().reduce((musicians, uuid) => {
            musicians[uuid] = this.props.values.rightHolders[uuid];
            return musicians;
        }, {})
    }

    musicianUuids() {
        return FilterRightHoldersByRoles([roles.musician, roles.principal, roles.accompaniment], this.props.values.rightHolders);
    }

    handleChange(newMusicians) {
        const rawRightHolders = Object.assign({}, this.props.values.rightHolders, newMusicians);

        const newRightHolders = this.removeEmptyRoleRightHolders(rawRightHolders);

        this.props.setFieldValue('rightHolders', newRightHolders);
    };

    removeEmptyRoleRightHolders(rightHolders) {
        return Object.keys(rightHolders)
            .filter(key => rightHolders[key] &&
                rightHolders[key].roles &&
                rightHolders[key].roles.length
            )
            .reduce((newRightHolders, uuid) => {
                newRightHolders[uuid] = rightHolders[uuid];
                return newRightHolders;
            }, {});
    }

    icon() {
        return this.props.pochette ? starIconOrange : starIconGreen;
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
                                    label={ t('flot.documenter.entete.interpretation') }
                                    question={ t('flot.documenter.titre2') }
                                    description={ t('flot.documenter.titre2-description') }
                                />

                                <ChampSelectionInterprete
                                    pochette={ this.props.pochette }
                                    rightHolders={ this.props.rightHolders }
                                    musicians={ this.musicians() }
                                    values={ this.props.values }
                                    onChange={ newValues => this.handleChange(newValues) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
