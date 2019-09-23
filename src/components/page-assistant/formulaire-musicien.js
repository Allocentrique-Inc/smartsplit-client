import React, { Component } from 'react';
import { ItemSelectionne } from './item-selectionne';
import { Checkbox } from "semantic-ui-react";
import { instruments } from '../../assets/listes/fr/instruments';
import ChampSelectionMultiple from "./champ-selection-multiple";
import { isUnique } from "./right-holder-helpers";
import * as roles from '../../assets/listes/role-uuids.json';

export class FormulaireMusicien extends Component {
    singerRoleLabels = [
        {
            key: 'leadVocal',
            text: 'Soliste'
        },
        {
            key: 'backVocal',
            text: 'Choriste',
        },
        {
            key: 'spokenVocal',
            text: 'Voix parlée'
        }
    ];

    singerRoles = this.singerRoleLabels.map(label => roles.default[label.key]);
    singerOptions = this.singerRoleLabels.map(label => ({
        key: roles.default[label.key],
        value: roles.default[label.key],
        text: label.text
    }));

    constructor(props) {
        super(props);

        console.log(this.rightHolderSingerSubroles());

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
            singer: this.props.rightHolder.roles.includes(roles.singer),
            musician: this.rightHolderHasInstruments(),
        };
    }

    hasRole(role) {
        this.props.rightHolder.roles.includes(roles.default[role]);
    }

    rightHolderSingerSubroles() {
        return this.singerRoles.filter(role => this.props.rightHolder.roles.includes(role));
    }

    rightHolderInstruments() {
        return this.props.rightHolder.instruments || [];
    }

    rightHolderHasInstruments() {
        return Boolean(this.rightHolderInstruments().length);
    }

    onTypeChange = event => {
        const newType = event.target.value;
        const newRole = roles.default[newType];

        const newRoles = this.props.rightHolder.roles
            .filter(this.isNotMusicianRole)
            .concat([newRole])
            .filter(isUnique);

        this.updateRightHolder({ roles: newRoles });
    };

    isNotMusicianRole = role => (role !== roles.principal) && (role !== roles.accompaniment);

    updateRightHolder(newAttributes) {
        const newRightHolder = Object.assign({}, this.props.rightHolder, newAttributes);

        this.props.onChange(newRightHolder);
    }

    handleSingerCheckboxChange(checked) {
        const newSingerRoles = checked ? [roles.singer] : [];

        const rightHolderRoles = this.props.rightHolder.roles || [];
        const newRoles = rightHolderRoles
            .filter(this.isNotSingerRole)
            .filter(role => role !== roles.singer)
            .concat(newSingerRoles);

        this.updateRightHolder({ roles: newRoles });
        this.setState({ singer: checked });
    }

    isNotSingerRole = role => (this.singerRoles.every(singerRole => role !== singerRole));

    handleInstrumentCheckboxChange(checked) {
        if (!checked) {
            this.removeInstruments();
        }

        this.setState({ musician: checked });
    }

    onSingerRoleChange = newSingerRoles => {
        const rightHolderRoles = this.props.rightHolder.roles || [];
        const newRoles = rightHolderRoles
            .filter(this.isNotSingerRole)
            .concat(newSingerRoles);

        this.updateRightHolder({ roles: newRoles });
    }

    onInstrumentChange = instruments => {
        const rightHolderInstruments = this.props.rightHolder.instruments || [];
        const newInstruments = rightHolderInstruments
            .filter(instrument => instrument === this.singerInstrument)
            .concat(instruments);

        this.updateRightHolder({ instruments: newInstruments });
    }

    removeInstruments() {
        const instruments = this.props.rightHolder.instruments || [];
        const newInstruments = instruments
            .filter(instrument => instrument === this.singerInstrument);

        this.updateRightHolder({ instruments: newInstruments });
    }

    singerSelect() {
        return this.state.singer ?
            (
                <div className={ 'mb-2' }>
                    <ChampSelectionMultiple
                        key={ this.props.rightHolder.id + 'singer' }
                        pochette={ this.props.pochette }
                        items={ this.singerOptions }
                        placeholder="Ajouter un type de chanteur..."
                        value={ this.rightHolderSingerSubroles() }
                        onChange={ this.onSingerRoleChange }
                    />
                </div>
            ) :
            (<></>);
    }

    instrumentSelect() {
        return this.state.musician ?
            (
                <ChampSelectionMultiple
                    key={ this.props.rightHolder.id + 'musician' }
                    pochette={ this.props.pochette }
                    items={ this.instrumentOptions }
                    placeholder="Ajouter un instrument..."
                    value={ this.rightHolderInstruments() }
                    onChange={ this.onInstrumentChange }
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
                                   value={ 'principal' }
                                   checked={ this.props.rightHolder.roles.includes(roles.principal) }
                                   onChange={ this.onTypeChange }
                            />

                            <label>Artiste principal</label>
                        </div>
                    </div>

                    <div>
                        <div className="ui radio checkbox">
                            <input type="radio"
                                   name="type"
                                   value={ 'accompaniment' }
                                   checked={ this.props.rightHolder.roles.includes(roles.accompaniment) }
                                   onChange={ this.onTypeChange }
                            />

                            <label>Artiste accompagnateur</label>
                        </div>
                    </div>

                    <p className="input-label">Quel rôle dans la pièce musicale ?</p>

                    <div>
                        <Checkbox
                            label={ 'Chanteur' }
                            checked={ this.state.singer }
                            onChange={ (event, { checked }) => this.handleSingerCheckboxChange(checked) }
                        />
                    </div>

                    <div className="instrument-select">
                        { this.singerSelect() }
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
