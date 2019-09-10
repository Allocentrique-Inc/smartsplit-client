import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../page-assistant/champ-date";
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
                                    label={ t('flot.documenter.entete.parole') }
                                    question={ this.props.values.title + " " + t('flot.documenter.titre6')}
                                    description={ t('flot.documenter.titre6-description') }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
