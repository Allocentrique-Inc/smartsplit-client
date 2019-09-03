import React, { Component } from 'react';
import { DateInput } from "semantic-ui-calendar-react";
import 'moment/locale/fr';
import { Translation } from 'react-i18next';
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";

export default class ChampDate extends Component {
    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <label className="champ">
                            <TitreChamp
                                label={ this.props.label }
                                description={ this.props.description }
                            />

                            <DateInput
                                localization={ String(i18n.lng).substr(0,2) }
                                placeholder={ t('flot.documenter.date-placeholder') }
                                value={ this.props.value }
                                onChange={ (event, props) => this.props.onChange(event, props) }
                                icon="calendar outline"
                            />
                        </label>
                }
            </Translation>
        );
    }
}
