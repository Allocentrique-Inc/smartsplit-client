import React from "react";
import TableGauche from "./table-gauche";

export default class TableCreation extends React.Component {
  rows = [
    {
      label: "Date de création",
      value: "8 juillet 2019"
    },
    {
      label: "ISWC",
      helpIcon: true,
      value: ""
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
  ];

  render() {
    return <TableGauche title={"Création"} rows={this.rows} />;
  }
}
