import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";
import FileCircleOrange from '../../assets/svg/icons/file-circle-orange.svg';
import FileCircleGreen from '../../assets/svg/icons/file-circle-green.svg';

export default class PageFichiers extends React.Component {

    icon() {
        return this.props.pochette ? FileCircleOrange : FileCircleGreen;
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
