/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import starIconOrange from '../../assets/svg/icons/star-orange.svg';
import starIconGreen from '../../assets/svg/icons/star-green.svg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelectionInterprete } from "../formulaires/champ-selection-interprete";

export default class PageInterpretation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            musicians: []
        }
    }

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

    starIcon() {
        return this.props.pochette ? starIconOrange : starIconGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <>
                            <div className={'ui container assistant-container ' + (this.props.pochette ? 'pochette' : '')}>
                                <div className="ui grid">
                                    <div
                                        className="form-column ui sixteen wide mobile eight wide tablet eight wide computer column"
                                    >
                                        <h1 className="section-title">
                                            <span className="section-icon">
                                                <img src={ this.starIcon() } alt={ 'interprétation' }/>
                                            </span>

                                            <span className="section-label">
                                            {t('flot.documenter.entete.interpretation')}
                                            </span>
                                        </h1>

                                        <h2 className="section-question">
                                            {t('flot.documenter.titre2')}
                                        </h2>

                                        <p className="section-description">
                                            {t('flot.documenter.titre2-description')}
                                        </p>

                                        <ChampSelectionInterprete
                                            pochette={ this.props.pochette }
                                            items={ this.rightHolderOptions() }
                                            onChange={ values => this.setState({ musicians: values }) }
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </Translation>
        )
    }
}
