import React, { Component } from 'react';
import { ItemSelectionne } from './item-selectionne';
import { Checkbox } from "semantic-ui-react";

export class ChampInstrument extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: "",
            chanteur: false,
            musicien: false,
        };
    }

    handleTypeChange = event => this.setState({ type: event.target.value });

    handleRoleChange = (name, checked) => {
        this.setState({ [name]: checked });
    };

    getRolesWith(name) {
        return [...this.state.roles]
            .concat([name])
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
    }

    getRolesWithout(name) {
        return [...this.state.roles].filter(value => value !== name);
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
                </div>

                <div className="instrument-divider"></div>
            </>
        );
    }
}
