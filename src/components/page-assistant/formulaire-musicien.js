import React, { Component } from 'react';
import { ItemSelectionne } from './item-selectionne';
import { Checkbox } from "semantic-ui-react";
import { instruments } from '../../assets/listes/fr/instruments';
import ChampSelectionMultiple from "./champ-selection-multiple";
import { isUnique } from "./right-holder-helpers";
import * as roles from '../../assets/listes/role-uuids.json';

export class FormulaireMusicien extends Component {

    types = {
        principal: 'principal',
        accompaniment: 'accompaniment',
    };

    singerInstrument = 'Chanteur';

    constructor(props) {
        super(props);

        this.instrumentOptions = instruments
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
            .map(instrument => ({
                key: instrument.nom,
                value: instrument.nom,
                text: instrument.nom
            }));

        this.state = {
            musician: this.rightHolderHasNonSingerInstruments(),
        };
    }

    hasRole(role) {
        this.props.rightHolder.roles.includes(roles[role]);
    }

    getRightHolderType() {
        let type;

        switch (true) {
            case this.props.rightHolder.roles.includes(roles.principal) :
                type = this.types.principal;
                break;
            case this.props.rightHolder.roles.includes(roles.accompaniment):
                type = this.types.accompaniment;
                break;
            default:
                type = '';
        }

        return type;
    }

    rightHolderInstruments() {
        return this.props.rightHolder.instruments || [];
    }

    rightHolderIsSinger() {
        return this.rightHolderInstruments().includes(this.singerInstrument);
    }

    rightHolderNonSingerInstruments() {
        return this.nonSingerInstruments(this.rightHolderInstruments());
    }

    rightHolderHasNonSingerInstruments() {
        return Boolean(this.rightHolderNonSingerInstruments().length);
    }

    nonSingerInstruments(instruments) {
        return instruments.filter(instrument => instrument !== this.singerInstrument);
    }

    handleTypeChange = event => {
        const newType = event.target.value;
        const newRole = roles.default[newType];

        const newRoles = this.props.rightHolder.roles
            .filter(this.isNotMusicianType)
            .concat([newRole])
            .filter(isUnique);

        this.updateRightHolder({ roles: newRoles });
    };

    isNotMusicianType = role => (role !== roles.default[this.types.principal]) && (role !== roles.default[this.types.accompaniment]);

    updateRightHolder(newAttributes) {
        const newRightHolder = Object.assign({}, this.props.rightHolder, newAttributes);

        this.props.onChange(newRightHolder);
    }

    handleSingerChange(checked) {
        checked ?
            this.addSingerInstrument() :
            this.removeSingerInstrument();
    }

    addSingerInstrument() {
        this.updateRightHolder({ instruments: this.rightHolderNonSingerInstruments().concat([this.singerInstrument]) });
    }

    removeSingerInstrument() {
        this.updateRightHolder({ instruments: this.rightHolderNonSingerInstruments() });
    }

    handleInstrumentCheckboxChange(checked) {
        if (!checked) {
            this.removeNonSingerInstruments();
        }

        this.setState({ musician: checked });
    }

    onNonSingerInstrumentChange = instruments => {
        this.updateNonSingerInstruments(instruments);
    };

    updateNonSingerInstruments(instruments) {
        const rightHolderInstruments = this.props.rightHolder.instruments || [];
        const newInstruments = rightHolderInstruments
            .filter(instrument => instrument === this.singerInstrument)
            .concat(instruments);

        this.updateRightHolder({ instruments: newInstruments });

    }

    removeNonSingerInstruments() {
        const instruments = this.props.rightHolder.instruments || [];
        const newInstruments = instruments
            .filter(instrument => instrument === this.singerInstrument);

        this.updateRightHolder({ instruments: newInstruments });
    }

    instrumentSelect() {
        return this.state.musician ?
            (
                <ChampSelectionMultiple
                    pochette={ this.props.pochette }
                    items={ this.instrumentOptions }
                    placeholder="Ajouter un instrument..."
                    value={ this.rightHolderNonSingerInstruments() }
                    onChange={ this.onNonSingerInstrumentChange }
                />
            ) :
            (<></>);
    }


    render() {
        return (
            <>
                <ItemSelectionne
                    key={ this.props.item.key }
                    image={ this.props.item.image.src }
                    nom={ this.props.item.text }
                    onClick={ this.props.onClick }
                />

                <div className="instrument-form">
                    <p className="input-label">Quel type d'interprétation ?</p>

                    <div>
                        <div className="ui radio checkbox">
                            <input type="radio"
                                   name="type"
                                   value={ this.types.principal }
                                   checked={ this.hasRole(this.types.principal) }
                                   onChange={ event => this.handleTypeChange(event) }
                            />

                            <label>Artiste principal</label>
                        </div>
                    </div>

                    <div>
                        <div className="ui radio checkbox">
                            <input type="radio"
                                   name="type"
                                   value={ this.types.accompaniment }
                                   checked={ this.getRightHolderType() === this.types.accompaniment }
                                   onChange={ event => this.handleTypeChange(event) }
                            />

                            <label>Artiste accompagnateur</label>
                        </div>
                    </div>

                    <p className="input-label">Quel rôle dans la pièce musicale ?</p>

                    <div>
                        <Checkbox
                            label={ 'Chanteur' }
                            checked={ this.rightHolderIsSinger() }
                            onChange={ (event, { checked }) => this.handleSingerChange(checked) }
                        />
                    </div>

                    <div>
                        <Checkbox
                            label={ 'Musicien' }
                            checked={ this.state.musician }
                            onChange={ (event, { checked }) => this.handleInstrumentCheckboxChange(checked) }
                        />
                    </div>

                    <div className="instrument-select">
                        { this.instrumentSelect() }
                    </div>
                </div>

                <div className="section-divider"></div>
            </>
        );
    }
}
