import React, { Component } from "react";
import { ItemSelectionne } from "./item-selectionne";
import { Checkbox } from "semantic-ui-react";
import ChampSelectionMultiple from "./champ-selection-multiple";
import { isUnique } from "./right-holder-helpers";
import * as roles from "../../assets/listes/role-uuids.json";
import { useTranslation } from "react-i18next"

export default function FormulaireMusicien(props) {
  const { t } = useTranslation();

  return <BaseFormulaireMusicien {...props} t={t} />
}

export class BaseFormulaireMusicien extends Component {
  singerRoleLabels = [
    {
      key: "leadVocal",
      text: "Soliste"
    },
    {
      key: "backVocal",
      text: "Choriste"
    },
    {
      key: "spokenVocal",
      text: "Voix parlée"
    }
  ];

  singerRoles = this.singerRoleLabels.map(label => roles.default[label.key]);
  singerOptions = this.singerRoleLabels.map(label => ({
    key: roles.default[label.key],
    value: roles.default[label.key],
    text: label.text
  }));

  constructor(props) {
    super(props);

    let instruments = require(`../../assets/listes/${props.langue}/instruments`).instruments;

    // Épuration de la liste des instruments pour éviter les doublons
    let _instruments = {}
    this.instrumentOptions = []

    instruments.forEach(i => {
      if (!_instruments[i.nom])
        _instruments[i.nom] = i
    })

    Object.keys(_instruments).forEach(_i => {
      let i = _instruments[_i]
      this.instrumentOptions.push({
        key: i.nom,
        value: i.nom,
        text: i.nom
      })
    })

    this.state = {
      singer: this.props.rightHolder.roles.includes(roles.singer),
      musician: this.props.rightHolder.roles.includes(roles.musician)
    };
  }

  hasRole(role) {
    this.props.rightHolder.roles.includes(roles.default[role]);
  }

  rightHolderSingerSubroles() {
    return this.singerRoles.filter(role =>
      this.props.rightHolder.roles.includes(role)
    );
  }

  rightHolderInstruments() {
    return this.props.rightHolder.instruments || [];
  }

  rightHolderHasInstruments() {
    return Boolean(this.rightHolderInstruments().length);
  }

  onTypeChange = event => {
    const newType = event.target.value;
    const newRole = roles.default[newType];

    const newRoles = this.props.rightHolder.roles
      .filter(this.isNotMusicianRole)
      .concat([newRole])
      .filter(isUnique);

    this.updateRightHolder({ roles: newRoles });
  };

  isNotMusicianRole = role =>
    role !== roles.principal && role !== roles.accompaniment;

  updateRightHolder(newAttributes) {
    const newRightHolder = Object.assign(
      {},
      this.props.rightHolder,
      newAttributes
    );

    this.props.onChange(newRightHolder);
  }

  handleSingerCheckboxChange(checked) {
    const newSingerRoles = checked ? [roles.singer] : [];

    const rightHolderRoles = this.props.rightHolder.roles || [];
    const newRoles = rightHolderRoles
      .filter(this.isNotSingerRole)
      .filter(role => role !== roles.singer)
      .concat(newSingerRoles);

    this.updateRightHolder({ roles: newRoles });
    this.setState({ singer: checked });
  }

  isNotSingerRole = role =>
    this.singerRoles.every(singerRole => role !== singerRole);

  handleInstrumentCheckboxChange(checked) {
    if (!checked) {
      this.removeInstruments();
    }

    this.setState({ musician: checked });
  }

  onSingerRoleChange = newSingerRoles => {
    const rightHolderRoles = this.props.rightHolder.roles || [];
    const newRoles = rightHolderRoles
      .filter(this.isNotSingerRole)
      .concat(newSingerRoles);

    this.updateRightHolder({ roles: newRoles });
  };

  onInstrumentChange = instruments => {
    const rightHolderInstruments = this.props.rightHolder.instruments || [];
    const newInstruments = rightHolderInstruments
      .filter(instrument => instrument === this.singerInstrument)
      .concat(instruments);

    this.updateRightHolder({ instruments: newInstruments });
  };

  removeInstruments() {
    const instruments = this.props.rightHolder.instruments || [];
    const newInstruments = instruments.filter(
      instrument => instrument === this.singerInstrument
    );

    this.updateRightHolder({ instruments: newInstruments });
  }

  singerSelect() {
    return this.state.singer ? (
      <div className={"mb-2"}>
        <ChampSelectionMultiple
          key={this.props.rightHolder.id + "singer"}
          pochette={this.props.pochette}
          items={this.singerOptions}
          placeholder={this.props.t("flot.split.documente-ton-oeuvre.chanteur")}
          value={this.rightHolderSingerSubroles()}
          onChange={this.onSingerRoleChange}
        />
      </div>
    ) : (
        <></>
      );
  }

  instrumentSelect() {

    return this.state.musician ? (
      <ChampSelectionMultiple
        key={this.props.rightHolder.id + "instrument"}
        pochette={this.props.pochette}
        items={this.instrumentOptions}
        placeholder={this.props.t("flot.split.documente-ton-oeuvre.instrument")}
        value={this.rightHolderInstruments()}
        onChange={this.onInstrumentChange}
      />
    ) : (
        <></>
      );
  }

  render() {
    return (
      <>
        <ItemSelectionne
          key={this.props.item.key}
          image={this.props.item.image.src}
          nom={this.props.item.text}
          onClick={this.props.onClick}
        />

        <div className="instrument-form">
          <p className="input-label">
            {this.props.t("flot.split.documente-ton-oeuvre.documenter.options.question1")}
          </p>

          <div>
            <div className="ui radio checkbox">
              <input
                type="radio"
                name={`${this.props.rightHolder.id}type`}
                value={"principal"}
                checked={this.props.rightHolder.roles.includes(
                  roles.principal
                )}
                onChange={this.onTypeChange}
              />

              <label>
                {this.props.t("flot.split.documente-ton-oeuvre.documenter.options.question1-choix-a")}
              </label>
            </div>
          </div>

          <div>
            <div className="ui radio checkbox">
              <input
                type="radio"
                name={`${this.props.rightHolder.id}type`}
                value={"accompaniment"}
                checked={this.props.rightHolder.roles.includes(
                  roles.accompaniment
                )}
                onChange={this.onTypeChange}
              />

              <label>
                {this.props.t("flot.split.documente-ton-oeuvre.documenter.options.question1-choix-b")}
              </label>
            </div>
          </div>

          <p className="input-label">
            {this.props.t("flot.split.documente-ton-oeuvre.documenter.options.question2")}
          </p>

          <div>
            <Checkbox
              label={this.props.t("flot.split.documente-ton-oeuvre.documenter.options.question2-choix-a")}
              checked={this.state.singer}
              onChange={(event, { checked }) =>
                this.handleSingerCheckboxChange(checked)
              }
            />
          </div>

          <div className="instrument-select">{this.singerSelect()}</div>

          <div>
            <Checkbox
              label={this.props.t("flot.split.documente-ton-oeuvre.documenter.options.question2-choix-b")}
              checked={this.state.musician}
              onChange={(event, { checked }) =>
                this.handleInstrumentCheckboxChange(checked)
              }
            />
          </div>

          <div className="instrument-select">{this.instrumentSelect()}</div>
        </div>

        <br />
      </>
    );
  }
}
