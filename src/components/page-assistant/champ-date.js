import React, { Component } from "react";
import { DateTimeInput } from "semantic-ui-calendar-react";
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

            <DateTimeInput
              localization={
                String(i18n.lng).substr(0, 2)}
              placeholder={t(
                "flot.split.documente-ton-oeuvre.documenter.date-placeholder"
              )}
              value={this.props.value}
              onChange={(event, { value }) => {
                this.props.onChange(value)
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
