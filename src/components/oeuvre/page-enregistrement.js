import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";
import RecordGreen from '../../assets/svg/icons/record-green.svg';
import RecordOrange from '../../assets/svg/icons/record-orange.svg';

export default class PageEnregistrement extends React.Component {

    icon() {
        return this.props.pochette ? RecordOrange : RecordGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <PageAssistant
                            pochette={ this.props.pochette }
                            sectionIcon={ this.icon() }
                            sectionLabel={ 'Enregistrement' }
                            sectionQuestion={ 'Qui a enregistré la pièce musicale?' }
                            sectionDescription={ 'Ici, tu indiques qui a contribué à l’enregistrement sonore de cette pièce.' }
                        >

                        </PageAssistant>
                }
            </Translation>
        )
    }
}
