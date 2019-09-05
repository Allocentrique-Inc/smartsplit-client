import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../page-assistant/champ-date";
import LyricsCircleOrange from '../../assets/svg/icons/lyrics-circle-orange.svg';
import LyricsCircleGreen from '../../assets/svg/icons/lyrics-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampTextArea from "../page-assistant/champ-textarea";
import ChampSelectionMultiple from "../page-assistant/champ-selection-multiple";
import ChampAccesVision from "../page-assistant/champ-acces-vision";

export default class PageParoles extends React.Component {

    languages = [
        'Français',
        'Anglais',
        'Esperanto'
    ];

    constructor(props) {
        super(props);

        this.state = {
            lyrics: "",
            languages: []
        };
    }

    icon() {
        return this.props.pochette ? LyricsCircleOrange : LyricsCircleGreen;
    }

    languageOptions() {
        return this.languages.map(language => {
            return {
                key: language,
                value: language,
                text: language
            };
        })
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
                                    label={ 'Paroles' }
                                    question={ this.props.values.title + ' contient des paroles?' }
                                    description={ 'Les mots dans une chanson sont d’excellentes données descriptives sur l’oeuvre qui augmentent sa découvrabilité et les chances d’élargir ton auditoire.' }
                                />

                                <ChampTextArea
                                    label={ 'Paroles' }
                                    placeholder={ 'Ajouter des paroles...' }
                                    undertext={ 'Paroles seulement. Ne pas inclure les auteurs, compositeurs, année de création, etc.' }
                                    value={ this.state.lyrics }
                                    onChange={ value => this.setState({ lyrics: value }) }
                                />

                                <ChampSelectionMultiple
                                    pochette={ this.props.pochette }
                                    items={ this.languageOptions() }
                                    label="Langues"
                                    createLabel="Créer la langue :"
                                    placeholder="Ajouter une langue..."
                                    value={ this.state.languages }
                                    onChange={ ids => this.setState({ languages: ids }) }
                                />

                                <ChampAccesVision/>
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
