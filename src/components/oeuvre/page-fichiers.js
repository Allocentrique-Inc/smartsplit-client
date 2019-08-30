import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";
import PlusCircleOrange from '../../assets/svg/icons/plus-circle-orange.svg';
import PlusCircleGreen from '../../assets/svg/icons/plus-circle-green.svg';

export default class PageFichiers extends React.Component {

    icon() {
        return this.props.pochette ? PlusCircleOrange : PlusCircleGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <PageAssistant
                            pochette={ this.props.pochette }
                            sectionIcon={ this.icon() }
                            sectionLabel={ 'Fichiers' }
                            sectionQuestion={ 'Quels fichiers veux-tu rendre accessible?' }
                            sectionDescription={ 'Ici, tu peux ajouter tous les fichiers relatifs à cette pièce musicale.' }
                        >

                        </PageAssistant>
                }
            </Translation>
        )
    }
}
