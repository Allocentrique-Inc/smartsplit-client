import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import MusicCircleOrange from '../../assets/svg/icons/music-circle-orange.svg';
import MusicCircleGreen from '../../assets/svg/icons/music-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampDuree from "../page-assistant/champ-duree";
import ChampTexte from "../page-assistant/champ-texte";
import ChampSelection from "../page-assistant/champ-selection";
import ChampSelectionMultiple from "../page-assistant/champ-selection-multiple";
import SelectOption from "../../model/select-option/select-option";

export default class PageInformationsGenerales extends React.Component {

    genres = [
        'ska',
        'rap',
        'Sweet Pickle'
    ];

    genreOptions() {
        return this.genres.map(genre => new SelectOption({ text: genre, value: genre }));
    }

    icon() {
        return this.props.pochette ? MusicCircleOrange : MusicCircleGreen;
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
                                    label={ 'Informations générales' }
                                    question={ 'Dis-nous en plus sur la pièce musicale.' }
                                />

                                <div className="mb-2">
                                    <div className="ui grid">
                                        <div
                                            className="ui sixteen wide mobile eight wide tablet eight wide computer column">
                                            <ChampDuree
                                                pochette={ this.props.pochette }
                                                label="Durée"
                                                placeholder="MM:SS"
                                                msDuration={ this.props.values.msDuration }
                                                onChange={ value => this.props.setFieldValue('msDuration', value) }
                                            />
                                        </div>

                                        <div
                                            className="ui sixteen wide mobile eight wide tablet eight wide computer column">
                                            <ChampTexte
                                                pochette={ this.props.pochette }
                                                label="BPM"
                                                placeholder="888"
                                                value={ this.props.values.bpm }
                                                onChange={ value => this.props.setFieldValue('bpm', value) }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <ChampSelection
                                    pochette={ this.props.pochette }
                                    items={ this.genreOptions() }
                                    label="Genre principal"
                                    createLabel="Créer un nouveau genre"
                                    placeholder="Ajouter un genre..."
                                    value={ this.props.values.genre }
                                    onChange={ value => this.props.setFieldValue('genre', value) }
                                />

                                <ChampSelectionMultiple
                                    pochette={ this.props.pochette }
                                    items={ this.genreOptions() }
                                    label="Genres secondaires"
                                    createLabel="Créer un nouveau genre"
                                    placeholder="Ajouter un genre..."
                                    value={ this.props.values.secondaryGenres }
                                    onChange={ value => this.props.setFieldValue('secondaryGenres', value) }
                                />

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Influences"
                                    placeholder="Indiquer un ou plusieurs artistes"
                                    undertext="Exemple : Les Beatles, Dr Dre, Mozart, Brel, Stromae."
                                    value={ this.props.values.influence }
                                    onChange={ value => this.props.setFieldValue('influence', value) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
