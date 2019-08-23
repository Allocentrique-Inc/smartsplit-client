import React, { Component } from 'react';
import { DateInput } from "semantic-ui-calendar-react";
import 'moment/locale/fr';

export class ChampDate extends Component {
    render() {
        return (
            <label className="champ">
                <div className="input-label">{ this.props.label }</div>

                <DateInput
                    localization="fr"
                    placeholder="Ajouter une date..."
                    value={ this.props.value }
                    onChange={ (event, props) => this.props.onChange(event, props) }
                    icon="calendar outline"
                />
            </label>
        );
    }
}
