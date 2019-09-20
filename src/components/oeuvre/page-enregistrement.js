import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import RecordGreen from '../../assets/svg/icons/record-green.svg';
import RecordOrange from '../../assets/svg/icons/record-orange.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import '../../assets/scss/assistant-form.scss';
import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit";
import RightHolderOptions from "../page-assistant/right-holder-options";
import ChampTexte from "../page-assistant/champ-texte";
import FormulaireDateSortie from "../page-assistant/formulaire-date-sortie";
import {
    addRightHolderIfMissing,
    getRightHolderIdsByRole,
    hasRoles,
    updateRole
} from "../page-assistant/right-holder-helpers";
import * as roles from '../../assets/listes/role-uuids.json';


export default class PageEnregistrement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            directors: getRightHolderIdsByRole(roles.director, props.values.rightHolders),
            soundRecordists: getRightHolderIdsByRole(roles.soundRecordist, props.values.rightHolders),
            mixEngineers: getRightHolderIdsByRole(roles.mixEngineer, props.values.rightHolders),
            masterEngineers: getRightHolderIdsByRole(roles.masterEngineer, props.values.rightHolders),
            producers: getRightHolderIdsByRole(roles.producer, props.values.rightHolders),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.directors !== prevState.directors ||
            this.state.soundRecordists !== prevState.soundRecordists ||
            this.state.mixEngineers !== prevState.mixEngineers ||
            this.state.masterEngineers !== prevState.masterEngineers ||
            this.state.producers !== prevState.producers
        ) {
            const recordingRightHolderIds = this.state.directors
                .concat(this.state.soundRecordists)
                .concat(this.state.mixEngineers)
                .concat(this.state.masterEngineers)
                .concat(this.state.producers);

            const updatedRightHolders = recordingRightHolderIds
                .reduce(addRightHolderIfMissing, [...this.props.values.rightHolders])
                .map(this.getUpdatedRightHolder)
                .filter(hasRoles);

            this.props.setFieldValue('rightHolders', updatedRightHolders);
        }
    }

    getUpdatedRightHolder = rightHolder => {
        const rightHolderRoles = rightHolder.roles || [];
        const id = rightHolder.id || null;

        const directorRoles = updateRole(roles.director, this.state.directors, id, rightHolderRoles);
        const soundRecordistRoles = updateRole(roles.soundRecordist, this.state.soundRecordists, id, directorRoles);
        const mixEngineerRoles = updateRole(roles.mixEngineer, this.state.mixEngineers, id, soundRecordistRoles);
        const masterEngineerRoles = updateRole(roles.masterEngineer, this.state.masterEngineers, id, mixEngineerRoles);
        const newRoles = updateRole(roles.producer, this.state.producers, id, masterEngineerRoles);

        return Object.assign({}, rightHolder, { roles: newRoles });
    };

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

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Réalisation"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="C’est le directeur artistique qui donne un son à l’enregistrement."
                                    placeholder="Ajouter un réalisateur..."
                                    value={ this.state.directors }
                                    onChange={ ids => this.setState({ directors: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Prise de son"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="C’est la personne qui fait la prise de son de ta pièce musicale."
                                    placeholder="Ajouter un preneur de son..."
                                    value={ this.state.soundRecordists }
                                    onChange={ ids => this.setState({ soundRecordists: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Mixage"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="C’est l’étape où l’on dose les niveaux de volume et fréquences."
                                    placeholder="Ajouter un ingénieur de mixage..."
                                    value={ this.state.mixEngineers }
                                    onChange={ ids => this.setState({ mixEngineers: ids }) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Mastering"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="C’est l’étape de compression et d’égalisation globale de la chanson."
                                    placeholder="Ajouter un ingénieur de mastering..."
                                    value={ this.state.masterEngineers }
                                    onChange={ ids => this.setState({ masterEngineers: ids }) }
                                />

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Studio d’enregistrement – nom"
                                    description="C’est le lieu où la chanson a été enregistrée."
                                    placeholder="Nom du studio d'enregistrement..."
                                    value={ this.props.values.studio }
                                    onChange={ value => this.props.setFieldValue('studio', value) }
                                />

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Studio d’enregistrement – adresse"
                                    placeholder="Adresse du studio d'enregistrement..."
                                    value={ this.props.values.studioAddress }
                                    onChange={ value => this.props.setFieldValue('studioAddress', value) }
                                />

                                <ChampSelectionMultipleAyantDroit
                                    pochette={ this.props.pochette }
                                    items={ this.rightHolderOptions() }
                                    label="Production"
                                    createLabel="Créer un nouveau collaborateur"
                                    description="Personne ou compagnie qui investit de l’argent ou du temps pour rendre l’enregistrement sonore possible."
                                    placeholder="Ajouter un producteur..."
                                    value={ this.state.producers }
                                    onChange={ ids => this.setState({ producers: ids }) }
                                />

                                <ChampTexte
                                    label="Code ISRC"
                                    description="L'International Standard Recording Code est un code unique d'identification des enregistrements sonores."
                                    value={ this.props.values.isrc }
                                    placeholder={ 'XX-XXX-00-0000' }
                                    onChange={ value => this.props.setFieldValue('isrc', value) }
                                />

                                <div className="section-divider"></div>

                                <h3 className="section-title">Sortie</h3>

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Étiquette – nom"
                                    description="C’est le lieu où la chanson a été enregistrée."
                                    placeholder="Nom de l'étiquette..."
                                    value={ this.props.values.label }
                                    onChange={ value => this.props.setFieldValue('label', value) }
                                />

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Étiquette – adresse"
                                    placeholder="Adresse de l'étiquette..."
                                    value={ this.props.values.labelAddress }
                                    onChange={ value => this.props.setFieldValue('labelAddress', value) }
                                />

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Distributeur – nom"
                                    description="C’est l'entité qui s'occupe de commercialiser la pièce."
                                    placeholder="Nom du distributeur..."
                                    value={ this.props.values.distributor }
                                    onChange={ value => this.props.setFieldValue('distributor', value) }
                                />

                                <ChampTexte
                                    pochette={ this.props.pochette }
                                    label="Distributeur – adresse"
                                    placeholder="Adresse du distributeur..."
                                    value={ this.props.values.distributorAddress }
                                    onChange={ value => this.props.setFieldValue('distributorAddress', value) }
                                />

                                <FormulaireDateSortie
                                    value={ this.props.values.publishDate }
                                    onChange={ value => this.props.setFieldValue('publishDate', value) }
                                />

                                <ChampTexte
                                    label="Code UPC/EAN"
                                    description="Code à barre obligatoire au produit physique. Peut optionnellement être attribué à un produit numérique."
                                    placeholder="Optionnel"
                                    value={ this.props.values.upc }
                                    onChange={ value => this.props.setFieldValue('upc', value) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
