import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
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
                                    label={ t('flot.documenter.entete.lien') }
                                    question={ t('flot.documenter.titre7') }
                                    description={ t('flot.documenter.titre7-description') }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
