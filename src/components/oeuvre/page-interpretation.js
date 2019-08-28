/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import starIconOrange from '../../assets/svg/icons/star-orange.svg';
import starIconGreen from '../../assets/svg/icons/star-green.svg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelectionInterprete } from "../formulaires/champ-selection-interprete";
import { PageAssistant } from "../canevas/page-assistant";

export default class PageInterpretation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            musicians: props.values.musicians
        };
    }

    rightHolderOptions() {
        return this.props.rightHolders.map(this.makeRightHolderOptions);
    }

    makeRightHolderOptions = rightHolder => {
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
                        <PageAssistant
                            sectionIcon={ this.starIcon() }
                            sectionLabel={ 'Interprétation' }
                            sectionQuestion={ 'Qui a interprété la pièce musicale sur cet enregistrement sonore?' }
                            sectionDescription={ 'C’est ici que tu indiques qui a joué quel instrument.' }
                        >
                            <ChampSelectionInterprete
                                pochette={ this.props.pochette }
                                items={ this.rightHolderOptions() }
                                values={ this.state.musicians }
                                onChange={ newValues => this.setState({ musicians: newValues }) }
                            />
                        </PageAssistant>
                }
            </Translation>
        )
    }
}
