import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import RecordGreen from '../../assets/svg/icons/record-green.svg';
import RecordOrange from '../../assets/svg/icons/record-orange.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import '../../assets/scss/assistant-form.scss';
import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit";
import RightHolderOptions from "../page-assistant/right-holder-options";
import ChampTexte from "../page-assistant/champ-texte";
import SelectOption from "../../model/select-option/select-option";
import ChampSelectionMultiple from "../page-assistant/champ-selection-multiple";
import FormulaireDateSortie from "../page-assistant/formulaire-date-sortie";

export default class PageEnregistrement extends React.Component {

    studios = [
        'a', 'b', 'c'
    ];

    constructor(props) {
        super(props);

        this.state = {
            directors: [],
            soundRecordists: [],
            mixEngineers: [],
            masterEngineers: [],
            studios: [],
            producers: [],
            recordLabels: [],
            distributors: [],
            releaseDate: '',
            upc: ''
        };
    }

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

    studioOptions() {
        return this.studios.map(studio => new SelectOption({
            value: studio,
            text: studio
        }));
    }

    labelOptions() {
        return this.studioOptions();
    }

    distributorOptions() {
        return this.studioOptions();
    }

    icon() {
        return this.props.pochette ? RecordOrange : RecordGreen;
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
                                    label={ t('flot.documenter.entete.enregistrement') }
                                    question={ t('flot.documenter.titre3') }
                                    description={ t('flot.documenter.titre3-description') }
                                />

                                <h3 className="section-title">{ t('flot.documenter.entete.enregistrement') }</h3>

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label={ t('flot.documenter.realisation') }
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.realisation-description') }
                                    placeholder={ t('flot.documenter.realisation-placeholder') }
                                    value={ this.state.directors }
                                    onChange={ ids => this.setState({ directors: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label={ t('flot.documenter.son') }
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.son-description') }
                                    placeholder={ t('flot.documenter.son-placeholder') }
                                    value={ this.state.soundRecordists }
                                    onChange={ ids => this.setState({ soundRecordists: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label={ t('flot.documenter.mix') }
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.mix-description') }
                                    placeholder={ t('flot.documenter.mix-placeholder') }
                                    value={ this.state.mixEngineers }
                                    onChange={ ids => this.setState({ mixEngineers: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label={ t('flot.documenter.master') }
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.master-description') }
                                    placeholder={ t('flot.documenter.master-placeholder') }
                                    value={ this.state.masterEngineers }
                                    onChange={ ids => this.setState({ masterEngineers: ids }) }
                                />

                                <ChampSelectionMultiple
                                    pochette={ this.props.pochette }
                                    items={ this.studioOptions() }
                                    label={ t('flot.documenter.studio') }
                                    createLabel="Créer un nouveau studio"
                                    description={ t('flot.documenter.studio-description') }
                                    placeholder={ t('flot.documenter.studio-placeholder') }
                                    value={ this.state.studios }
                                    onChange={ ids => this.setState({ studios: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Production"
                                    createLabel="Créer un nouveau collaborateur"
                                    description={ t('flot.documenter.production-description') }
                                    placeholder={ t('flot.documenter.production-placeholder') }
                                    value={ this.state.producers }
                                    onChange={ ids => this.setState({ producers: ids }) }
                                />

                                <ChampTexte
                                    label={ t('flot.documenter.codeiswc') }
                                    description={ t('flot.documenter.codeiswc-description') }
                                    placeholder={ t('flot.documenter.codeiswc-placeholder') }
                                    value={ this.props.values.isrc }
                                    onChange={ value => this.props.setFieldValue('isrc', value) }
                                />

                                <div className="instrument-divider"></div>

                                <h3 className="section-title">{ t('flot.documenter.entete.sortie') }</h3>

                                <ChampSelectionMultiple
                                    label={ t('flot.documenter.etiquette') }
                                    items={ this.labelOptions() }
                                    description={ t('flot.documenter.etiquette-description') }
                                    placeholder={ t('flot.documenter.etiquette-placeholder') }
                                    value={ this.state.recordLabels }
                                    onChange={ ids => this.setState({ recordLabels: ids }) }
                                />

                                <ChampSelectionMultiple
                                    label="Distribution"
                                    items={ this.distributorOptions() }
                                    description={ t('flot.documenter.distribution-description') }
                                    placeholder={ t('flot.documenter.distribution-placeholder') }
                                    value={ this.state.distributors }
                                    onChange={ ids => this.setState({ distributors: ids }) }
                                />

                                <FormulaireDateSortie
                                    value={ this.state.releaseDate }
                                    onChange={ value => this.setState({ releaseDate: value }) }
                                />

                                <ChampTexte
                                    label={ t('flot.documenter.codeupc') }
                                    description={ t('flot.documenter.codeupc-description') }
                                    placeholder={ t('flot.documenter.codeupc-placeholder') }
                                    value={ this.state.upc }
                                    onChange={ value => this.setState({ upc: value }) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
