import React, { Component } from 'react';
import { ItemSelectionne } from './item-selectionne';

export class ChampInstrument extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: "",
            roles: []
        };
    }

    handleTypeChange = (event, { value }) => this.setState({ type: value });
    handleRoleChange = (name, event) => {
        const newRoles = event.target.checked ? this.getRolesWith(name) : this.getRolesWithout(name);

        this.setState({ roles: newRoles });
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

                    <label className="ui radio">
                        <input type="radio"
                               name="type"
                               value='principal'
                               checked={ this.state.type === 'principal' }
                               onChange={ this.handleTypeChange }
                        />

                        Artiste principal
                    </label>

                    <label className="ui radio">
                        <input type="radio"
                               name="type"
                               value='accompagnateur'
                               checked={ this.state.type === 'accompagnateur' }
                               onChange={ this.handleTypeChange }
                        />

                        Artiste accompagnateur
                    </label>

                    <p className="input-label">Quel rôle dans la pièce musicale ?</p>

                    <label className="ui radio">
                        <input type="checkbox"
                               name="chanteur"
                               value='chanteur'
                               onChange={ event => this.handleRoleChange('chanteur', event) }
                        />

                        Chanteur
                    </label>
                </div>
            </>
        );
    }
}
