import React from 'react';
import { Translation } from "react-i18next";
import { Page } from '../page-assistant/page';
import { ChampDate } from "../formulaires/champ-date";
import RecordGreen from '../../assets/svg/icons/record-green.svg';
import RecordOrange from '../../assets/svg/icons/record-orange.svg';
import { Colonne } from "../page-assistant/colonne";
import { Entete } from "../page-assistant/entete";

export default class PageEnregistrement extends React.Component {

    icon() {
        return this.props.pochette ? RecordOrange : RecordGreen;
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
                                    label={ 'Enregistrement' }
                                    question={ 'Qui a enregistré la pièce musicale?' }
                                    description={ 'Ici, tu indiques qui a contribué à l’enregistrement sonore de cette pièce.' }
                                />

                                <h3 className="h3-style">Enregistrement</h3>
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
