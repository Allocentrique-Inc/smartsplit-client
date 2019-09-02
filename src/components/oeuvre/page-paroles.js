import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../formulaires/champ-date";
import LyricsCircleOrange from '../../assets/svg/icons/lyrics-circle-orange.svg';
import LyricsCircleGreen from '../../assets/svg/icons/lyrics-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";

export default class PageParoles extends React.Component {

    icon() {
        return this.props.pochette ? LyricsCircleOrange : LyricsCircleGreen;
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
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
