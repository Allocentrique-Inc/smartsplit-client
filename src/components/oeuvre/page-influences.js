import React from 'react';
import { Translation } from "react-i18next";
import { Page } from '../page-assistant/page';
import MusicCircleOrange from '../../assets/svg/icons/music-circle-orange.svg';
import MusicCircleGreen from '../../assets/svg/icons/music-circle-green.svg';
import { Colonne } from "../page-assistant/colonne";
import { Entete } from "../page-assistant/entete";

export default class PageInfluences extends React.Component {

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
                                    label={ 'Influences' }
                                    question={ 'Informations générales' }
                                    description={ 'Ici, tu indiques de quel genre est cette pièce musicale et qui sont les artistes ou tendances qui l’ont influencé.' }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
