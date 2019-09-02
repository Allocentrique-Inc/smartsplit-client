import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../formulaires/champ-date";
import RecordGreen from '../../assets/svg/icons/record-green.svg';
import RecordOrange from '../../assets/svg/icons/record-orange.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import '../../assets/scss/assistant-form.scss';
import { ChampSelectionPersonne } from "../formulaires/champ-selection-personne";
import RightHolderOptions from "../page-assistant/right-holder-options";

export default class PageEnregistrement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            directors: []
        };
    }

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

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

                                <h3 className="section-title">Enregistrement</h3>

                                <ChampSelectionPersonne
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Réalisation"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="C’est le directeur artistique qui donne un son à l’enregistrement."
                                    placeholder="Ajouter un réalisateur..."
                                    value={ this.state.directors }
                                    onChange={ ids => this.setState({ directors: ids }) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
