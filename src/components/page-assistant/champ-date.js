import React, { Component } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Translation } from "react-i18next";
import "../../assets/scss/page-assistant/champ.scss";
import TitreChamp from "./titre-champ";

export default class ChampDate extends Component {
  render() {
    return (
      <Translation>
        {(t, i18n) => (
          <label className="champ">
            <TitreChamp
              label={this.props.label}
              description={this.props.description}
            />

            <DateInput
              localization={String(i18n.lng).substr(0, 2)}
              placeholder={t(
                "flot.split.documente-ton-oeuvre.documenter.date-placeholder"
              )}
              value={this.props.value}
              onChange={(event, { value }) => {
                // s'assure que la date est valide pour momentjs
                let a = value.substr(6, 4),
                  m = value.substr(3, 2),
                  j = value.substr(0, 2);
                this.props.onChange(`${a}-${m}-${j}`);
              }}
              icon="calendar outline"
              closable
            />
          </label>
        )}
      </Translation>
    );
  }
}
