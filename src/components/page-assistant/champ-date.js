import React, { Component } from 'react';
import { DateInput } from "semantic-ui-calendar-react";
import 'moment/locale/fr';
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";

export class ChampDate extends Component {
    render() {
        return (
            <label className="champ">
                <TitreChamp
                    label={ this.props.label }
                    description={ this.props.description }
                />

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
