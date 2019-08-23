import React, { Component } from 'react';
import { ItemSelectionne } from './item-selectionne';
import { Checkbox } from "semantic-ui-react";
import { ChampSelectionMultiple } from "./champ-selection-multiple";

export class ChampInstrument extends Component {

    instruments = [
        {
            text: 'a',
            key: 'a',
            value: 'a'
        },
        {
            text: 'b',
            key: 'b',
            value: 'b'
        },
    ];

    constructor(props) {
        super(props);

        this.state = {
            type: "",
            chanteur: false,
            musicien: false,
        };
    }

    handleTypeChange = event => this.setState({ type: event.target.value });
    handleRoleChange = (name, checked) => this.setState({ [name]: checked });

    instrumentSelect() {
        return this.state.musicien ?
            (
                <ChampSelectionMultiple
                    items={ this.instruments }
                    label="Compositeurs"
                    createLabel="Créer un nouveau collaborateur"
                    description="Qui a composé la musique de cette pièce musicale&#8239;?"
                    placeholder="Ajouter un compositeur..."
                    value={ this.state.composers }
                    onChange={ ids => this.setState({ composers: ids }) }
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
                                   value='principal'
                                   checked={ this.state.type === 'principal' }
                                   onChange={ event => this.handleTypeChange(event) }
                            />

                            <label>Artiste principal</label>
                        </div>
                    </div>

                    <div>
                        <div className="ui radio checkbox">
                            <input type="radio"
                                   name="type"
                                   value='accompagnateur'
                                   checked={ this.state.type === 'accompagnateur' }
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

                    { this.instrumentSelect() }
                </div>

                <div className="instrument-divider"></div>
            </>
        );
    }
}
