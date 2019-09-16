import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../page-assistant/champ-date";
import FileCircleOrange from '../../assets/svg/icons/file-circle-orange.svg';
import FileCircleGreen from '../../assets/svg/icons/file-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";

export default class PageFichiers extends React.Component {

    icon() {
        return this.props.pochette ? FileCircleOrange : FileCircleGreen;
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
                                    label={ t('flot.documenter.entete.fichier') }
                                    question={ t('flot.documenter.titre4') }
                                    description={ t('flot.documenter.titre4-description') }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
