import React, { Component } from 'react';
import { DateInput } from "semantic-ui-calendar-react";
import 'moment/locale/fr';
import { Translation } from 'react-i18next';

export class ChampDate extends Component {
    render() {
        return (
            <Translation>
                {
                    (t, i18n)=>
                        <label className="champ">
                            <div className="input-label">{ this.props.label }</div>

                            <DateInput
                                localization={i18n.lng.substring(0,2)}
                                placeholder={t('flot.documenter.date-placeholder')} 
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
