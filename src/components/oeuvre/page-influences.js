import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";
import MusicCircleOrange from '../../assets/svg/icons/music-circle-orange.svg';
import MusicCircleGreen from '../../assets/svg/icons/music-circle-green.svg';

export default class PageInfluences extends React.Component {

    icon() {
        return this.props.pochette ? MusicCircleOrange : MusicCircleGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <PageAssistant
                            pochette={ this.props.pochette }
                            sectionIcon={ this.icon() }
                            sectionLabel={ 'Influences' }
                            sectionQuestion={ 'Informations générales' }
                            sectionDescription={ 'Ici, tu indiques de quel genre est cette pièce musicale et qui sont les artistes ou tendances qui l’ont influencé.' }
                        >

                        </PageAssistant>
                }
            </Translation>
        )
    }
}
