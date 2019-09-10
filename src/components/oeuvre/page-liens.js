import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../page-assistant/champ-date";
import LinkCircleOrange from '../../assets/svg/icons/link-circle-orange.svg';
import LinkCircleGreen from '../../assets/svg/icons/link-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";

export default class PageLiens extends React.Component {

    icon() {
        return this.props.pochette ? LinkCircleOrange : LinkCircleGreen;
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
                                    label={ 'Liens d\'écoute' }
                                    question={ 'La pièce musicale est-elle déjà diffusée?' }
                                    description={ 'Pour augmenter les chances que ta pièce soit découverte et écoutée, documente ses liens d’écoute et de vente en ligne.' }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
