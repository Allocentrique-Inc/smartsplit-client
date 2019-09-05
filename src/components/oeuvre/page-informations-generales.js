import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import MusicCircleOrange from '../../assets/svg/icons/music-circle-orange.svg';
import MusicCircleGreen from '../../assets/svg/icons/music-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampTexte from "../page-assistant/champ-texte";
import ChampSelectionMultiple from "../page-assistant/champ-selection-multiple";
import SelectOption from "../../model/select-option/select-option";

export default class PageInformationsGenerales extends React.Component {

    genres = [
        'ska',
        'rap',
        'Sweet Pickle'
    ];

    constructor(props) {
        super(props);

        this.state = {
            duration: '',
            bpm: '',
            primaryGenres: [],
            secondaryGenres: [],
            influences: ''
        }
    }

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
                                        <div className="ui sixteen wide mobile eight wide tablet eight wide computer column">
                                            <ChampTexte
                                                pochette={ this.props.pochette }
                                                label="Durée"
                                                placeholder="MM:SS"
                                                value={ this.state.duration }
                                                onChange={ value => this.setState({ duration: value }) }
                                            />
                                        </div>

                                        <div className="ui sixteen wide mobile eight wide tablet eight wide computer column">
                                            <ChampTexte
                                                pochette={ this.props.pochette }
                                                label="BPM"
                                                placeholder="888"
                                                value={ this.state.bpm }
                                                onChange={ value => this.setState({ bpm: value }) }
                                            />
                                        </div>
                                    </div>
                                </div>

                                /* TODO Rendre non multiple */
                                <ChampSelectionMultiple
                                    pochette={ this.props.pochette }
                                    items={ this.genreOptions() }
                                    label="Genre principal"
                                    createLabel="Créer un nouveau genre"
                                    placeholder="Ajouter un genre..."
                                    value={ this.state.primaryGenres }
                                    onChange={ ids => this.setState({ primaryGenres: ids }) }
                                />

                                <ChampSelectionMultiple
                                    pochette={ this.props.pochette }
                                    items={ this.genreOptions() }
                                    label="Genres secondaires"
                                    createLabel="Créer un nouveau genre"
                                    placeholder="Ajouter un genre..."
                                    value={ this.state.secondaryGenres }
                                    onChange={ ids => this.setState({ secondaryGenres: ids }) }
                                />

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Influences"
                                    placeholder="Indiquer un ou plusieurs artistes"
                                    undertext="Exemple : Les Beatles, Dr Dre, Mozart, Brel, Stromae."
                                    value={ this.state.influences }
                                    onChange={ value => this.setState({ influences: value }) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
