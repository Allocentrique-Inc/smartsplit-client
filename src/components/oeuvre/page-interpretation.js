/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import starIconOrange from '../../assets/svg/icons/star-orange.svg';
import starIconGreen from '../../assets/svg/icons/star-green.svg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelectionInterprete } from "../formulaires/champ-selection-interprete";
import { Page } from "../page-assistant/page";
import { Colonne } from "../page-assistant/colonne";
import { Entete } from "../page-assistant/entete";

export default class PageInterpretation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            musicians: props.values.musicians
        };
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
                                    label={ 'Interprétation' }
                                    question={ 'Qui a interprété la pièce musicale sur cet enregistrement sonore?' }
                                    description={ 'C’est ici que tu indiques qui a joué quel instrument.' }
                                />

                                <ChampSelectionInterprete
                                    pochette={ this.props.pochette }
                                    rightHolders={ this.props.rightHolders }
                                    values={ this.state.musicians }
                                    onChange={ newValues => this.setState({ musicians: newValues }) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
