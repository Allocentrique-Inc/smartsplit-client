import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";
import MusicOrange from '../../assets/svg/icons/music-orange.svg';
import MusicGreen from '../../assets/svg/icons/music-green.svg';

export default class PageInfluences extends React.Component {

    icon() {
        return this.props.pochette ? MusicOrange : MusicGreen;
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
                            sectionQuestion={ 'Question?' }
                            sectionDescription={ 'Description' }
                        >
                            <ChampDate
                                label="Date de création"
                                value={ this.props.values.creationDate }
                            />
                        </PageAssistant>
                }
            </Translation>
        )
    }
}
