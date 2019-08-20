/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import starIcon from '../../assets/svg/icons/star-orange.svg';

import '../../assets/scss/assistant-form.scss';
import { ChampSelectionMultiple } from "../formulaires/champ-selection-multiple";
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
                                                <img src={ starIcon } alt={ 'création' }/>
                                            </span>

                                            <span className="section-label">
                                                Interprétation
                                            </span>
                                        </h1>

                                        <h2 className="section-question">
                                            Qui a interprété la pièce musicale sur cet enregistrement sonore&#8239;?
                                        </h2>

                                        <p className="section-description">
                                            C’est ici que tu indiques qui a joué quel instrument.
                                        </p>
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
