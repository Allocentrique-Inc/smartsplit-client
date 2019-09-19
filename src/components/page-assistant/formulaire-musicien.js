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

        this.state = {
            type: type,
            chanteur: false,
            musicien: false,
            instruments: []
        };
    }

    handleTypeChange = event => {
        const newType = event.target.value;
        const newRole = roles.default[newType];

        const newRoles = this.props.rightHolder.roles
            .filter(role => (role !== roles.default[this.types.principal]) && (role !== roles.default[this.types.accompaniment]))
            .concat([newRole])
            .filter(isUnique);

        const newRightHolder = Object.assign({}, this.props.rightHolder, { roles: newRoles });

        this.props.onChange(newRightHolder);

        this.setState({ type: newType });
    };

    handleRoleChange = (name, checked) => this.setState({ [name]: checked });

    instrumentSelect() {
        return this.state.musicien ?
            (
                <ChampSelectionMultiple
                    pochette={ this.props.pochette }
                    items={ this.instrumentOptions }
                    placeholder="Ajouter un instrument..."
                    value={ this.state.instruments }
                    onChange={ ids => this.setState({ instruments: ids }) }
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
                                   checked={ this.state.type === this.types.principal }
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
                                   checked={ this.state.type === this.types.accompaniment }
                                   onChange={ event => this.handleTypeChange(event) }
                            />

                            <label>Artiste accompagnateur</label>
                        </div>
                    </div>

                    <p className="input-label">Quel rôle dans la pièce musicale ?</p>

                    <div>
                        <Checkbox
                            label={ 'Chanteur' }
                            checked={ this.state.chanteur }
                            onChange={ (event, { checked }) => this.handleRoleChange('chanteur', checked) }
                        />
                    </div>

                    <div>
                        <Checkbox
                            label={ 'Musicien' }
                            checked={ this.state.musicien }
                            onChange={ (event, { checked }) => this.handleRoleChange('musicien', checked) }
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
