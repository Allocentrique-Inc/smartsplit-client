import React from "react";
import TableGauche from "./table-gauche";
import moment from "moment";
import { Translation } from "react-i18next";

export default class TableCreation extends React.Component {

  constructor(props) {
    super(props)
    this.rangees = this.rangees.bind(this)
  }

  rangees(t, i18n) {
    return [
      {
        label: "Date de création",
        value: moment(this.props.media.creationDate).locale(i18n.lng.substring(0, 2)).format("LLL")
      },      
      {
        label: "ISWC",
        helpIcon: true,
        value: this.props.media.iswc.trim()
      },
      {
        label: "Auteurs (paroles)",
        value: (
          <>
            <span>Inscience</span>, <span>Lores</span>,{" "}
            <span>Quest Love</span>, <span>Jean-Pierre Cool</span>
          </>
        )
      },
      {
        label: "Compositeurs (musique)",
        value: (
          <>
            <span>Inscience</span>, <span>Lores</span>,{" "}
            <span>Quest Love</span>, <span>Jean-Pierre Cool</span>
          </>
        )
      },
      {
        label: "Arrangeurs (musique)",
        value: (
          <>
            <span>Inscience</span>, <span>Lores</span>,{" "}
            <span>Quest Love</span>, <span>Jean-Pierre Cool</span>
          </>
        )
      },
      {
        label: "Éditeurs",
        value: (
          <>
            <span>Sync.mu</span>, <span>Lepdup</span>
          </>
        )
      }
    ]
  }

  render() {
    return (
      <Translation>
        {
          (t, i18n) =>
            (<TableGauche title={"Création"} rows={this.rangees(t, i18n)} />)
        }
      </Translation>
    )
  }
}
