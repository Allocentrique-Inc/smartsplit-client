import React, { Component } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { withTranslation } from "react-i18next";
import "../../assets/scss/page-assistant/champ.scss";
import TitreChamp from "./titre-champ"

class ChampDate extends Component {
  render() {
    const t = this.props.t, i18n = this.props.i18n
    return (      
      <label className="champ">
        <TitreChamp
          label={this.props.label}
          description={this.props.description}
        />

        {
          i18n && i18n.language && (
            <DateInput
              localization={i18n.language}
              dateFormat="DD-MM-YYYY"
              placeholder={t(
                "flot.split.documente-ton-oeuvre.documenter.date-placeholder"
              )}
              value={`${this.props.value}`}
              onChange={(event, { value }) => {
                this.props.onChange(value)
              }}
              icon="calendar outline"
              closable
            />
          )
        }            
      </label>        
    )
  }
}
export default withTranslation()(ChampDate)