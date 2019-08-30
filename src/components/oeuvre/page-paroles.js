import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";
import LyricsCircleOrange from '../../assets/svg/icons/lyrics-circle-orange.svg';
import LyricsCircleGreen from '../../assets/svg/icons/lyrics-circle-green.svg';

export default class PageParoles extends React.Component {

    icon() {
        return this.props.pochette ? LyricsCircleOrange : LyricsCircleGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <PageAssistant
                            pochette={ this.props.pochette }
                            sectionIcon={ this.icon() }
                            sectionLabel={ 'Paroles' }
                            sectionQuestion={ this.props.values.title + ' contient des paroles?' }
                            sectionDescription={ 'Les mots dans une chanson sont d’excellentes données descriptives sur l’oeuvre qui augmentent sa découvrabilité et les chances d’élargir ton auditoire.' }
                        >

                        </PageAssistant>
                }
            </Translation>
        )
    }
}
