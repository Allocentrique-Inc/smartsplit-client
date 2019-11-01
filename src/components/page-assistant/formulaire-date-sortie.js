import React from "react";
import TitreChamp from "./titre-champ";
import ChampDate from "./champ-date";
import { Translation } from "react-i18next";
import InfoBulle from '../partage/InfoBulle'

export default class FormulaireDateSortie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      determined: Boolean(this.props.value),
      value: this.props.value
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.determined && prevState.determined) {
      this.props.onChange("");
    }

    if (this.state.determined && this.state.value !== prevState.value) {
      this.props.onChange(this.state.value);
    }
  }

  handleRadioChange = event =>
    this.setState({ determined: event.target.value === "true" });

  renderChampDate() {
    return this.state.determined ? (
      <div className="champ-date-sortie">
        <ChampDate
          value={this.state.value || ""}
          onChange={value => this.setState({ value: value })}
        />
      </div>
    ) : (
        <></>
      );
  }

  render() {
    return (
      <Translation>
        {t => (
          <div className="champ">
            <TitreChamp
              label={t("flot.split.documente-ton-oeuvre.documenter.date")}
              info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.date-description")} />}
            />

            <div>
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="type"
                  value="false"
                  checked={!this.state.determined}
                  onChange={this.handleRadioChange}
                />

                <label>
                  {t(
                    "flot.split.documente-ton-oeuvre.documenter.date-choix.avenir"
                  )}
                </label>
              </div>
            </div>

            <div>
              <div className="ui radio checkbox date-sortie-determinee">
                <input
                  type="radio"
                  name="type"
                  value="true"
                  checked={this.state.determined}
                  onChange={this.handleRadioChange}
                />

                <label>
                  {t(
                    "flot.split.documente-ton-oeuvre.documenter.date-choix.determine"
                  )}
                </label>
              </div>
            </div>

            {this.renderChampDate()}
          </div>
        )}
      </Translation>
    );
  }
}
