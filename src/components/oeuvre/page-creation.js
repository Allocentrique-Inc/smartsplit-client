/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import copyrightIconOrange from '../../assets/svg/icons/copyright-orange.svg';
import copyrightIconGreen from '../../assets/svg/icons/copyright-green.svg';
import '../../assets/scss/assistant-form.scss';

import { ChampSelectionPersonne } from "../formulaires/champ-selection-personne";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import { ChampDate } from "../formulaires/champ-date";


const roles = {
    songwriter: 'songwriter',
    composer: 'composer',
    publisher: 'publisher'
};

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
        return Object.keys(rightHolders).filter(uuid => rightHolders[uuid].includes(role));
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

    copyrightIcon() {
        return this.props.pochette ? copyrightIconOrange : copyrightIconGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>
                            <div
                                className={ 'ui container assistant-container ' + (this.props.pochette ? 'pochette' : '') }>
                                <div className="ui grid">
                                    <div
                                        className="form-column ui sixteen wide mobile eight wide tablet eight wide computer column"
                                    >
                                        <h1 className="section-title">
                                            <span className="section-icon">
                                                <img src={ this.copyrightIcon() } alt={ 'création' }/>
                                            </span>

                                            <span className="section-label">
                                            {t('flot.documenter.entete.creation')}
                                            </span>
                                        </h1>

                                        <h2 className="section-question">
                                        {t('flot.documenter.titre1')}{ this.props.values.title }&#8239;?
                                        </h2>

                                        <p className="section-description">
                                        {t('flot.documenter.titre1-description')}
                                        </p>

                                        <ChampDate
                                            label={t('flot.documenter.date-creation')}
                                            placeholder={t('flot.documenter.date-placeholder')} 
                                            value={ this.props.values.creationDate }
                                            onChange={ (event, { value }) => this.props.setFieldValue('creationDate', value) }
                                        /> 

                                        <ChampSelectionPersonne
                                            pochette={ this.props.pochette }
                                            items={ this.rightHolderOptions() }
                                            label={t('flot.documenter.auteur')}
                                            createLabel="Créer un nouveau collaborateur"
                                            description={t('flot.documenter.auteur-description')}
                                            placeholder={t('flot.documenter.auteur-placeholder')} 
                                            value={ this.state.songwriters }
                                            onChange={ ids => this.setState({ songwriters: ids }) }
                                        />

                                        <ChampSelectionPersonne
                                            pochette={ this.props.pochette }
                                            items={ this.rightHolderOptions() }
                                            label={t('flot.documenter.compositeur')}
                                            createLabel="Créer un nouveau collaborateur"
                                            description={t('flot.documenter.compositeur-description')}
                                            placeholder={t('flot.documenter.compositeur-placeholder')}
                                            value={ this.state.composers }
                                            onChange={ ids => this.setState({ composers: ids }) }
                                        />

                                        <ChampSelectionPersonne
                                            pochette={ this.props.pochette }
                                            items={ this.rightHolderOptions() }
                                            label={t('flot.documenter.editeur')}
                                            createLabel="Créer un nouveau collaborateur"
                                            description={t('flot.documenter.editeur-description')}
                                            placeholder={t('flot.documenter.editeur-placeholder')}
                                            value={ this.state.publishers }
                                            onChange={ ids => this.setState({ publishers: ids }) }
                                        />

                                        <label className="champ">
                                            <div className="input-label">{t('flot.documenter.code')}</div>

                                            <p className="input-description">
                                            {t('flot.documenter.code-description')}
                                            </p>

                                            <Input
                                                fluid
                                                placeholder={t('flot.documenter.code-placeholder')}
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
