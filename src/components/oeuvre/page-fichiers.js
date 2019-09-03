import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../page-assistant/champ-date";
import FileCircleOrange from '../../assets/svg/icons/file-circle-orange.svg';
import FileCircleGreen from '../../assets/svg/icons/file-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampTeleversement from "../page-assistant/champ-televersement";

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
                                    label={ 'Fichiers' }
                                    question={ 'Quels fichiers veux-tu rendre accessible?' }
                                    description={ 'Ici, tu peux ajouter tous les fichiers relatifs à cette pièce musicale.' }
                                />

                                <h3 className="section-title with-description">Visuel de l'œuvre</h3>

                                <p className="description">
                                    Comme l’album a sa pochette, une chanson ou une pièce instrumentale doit aussi avoir
                                    un visuel pour la représenter. <br/>
                                    <a href="#">En savoir plus</a>
                                </p>

                                <ChampTeleversement
                                    label={'Téléverser en format JPEG ou PNG'}
                                    undertext={'Recommandé : Image carrée de 1600 x 1600 pixels d’une résolution de 300 dpi.'}
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
