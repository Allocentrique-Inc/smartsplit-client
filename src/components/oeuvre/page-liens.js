import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";
import LinkCircleOrange from '../../assets/svg/icons/link-circle-orange.svg';
import LinkCircleGreen from '../../assets/svg/icons/link-circle-green.svg';

export default class PageLiens extends React.Component {

    icon() {
        return this.props.pochette ? LinkCircleOrange : LinkCircleGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <PageAssistant
                            pochette={ this.props.pochette }
                            sectionIcon={ this.icon() }
                            sectionLabel={ 'Liens d\'écoute' }
                            sectionQuestion={ 'La pièce musicale est-elle déjà diffusée?' }
                            sectionDescription={ 'Pour augmenter les chances que ta pièce soit découverte et écoutée, documente ses liens d’écoute et de vente en ligne.' }
                        >

                        </PageAssistant>
                }
            </Translation>
        )
    }
}
