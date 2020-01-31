import React from "react";
import TableDroite from "./table-droite";
import { withTranslation } from "react-i18next";

class TableInformationsGenerales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  rangees() {
    const t = this.props.t
    let duree = Math.round(this.props.media.msDuration / 1000);

    let minutes, secondes;
    if (duree > 0) {
      let _min = Math.floor(duree / 60);
      let _sec = duree % 60;
      minutes = "" + _min;
      secondes = "" + _sec;
    }

    return [
      {
        label: t("sommaire.info.duree"),
        value: secondes ? minutes + ":" + secondes : t("sommaire.info.inconnue")
      },
      {
        label: "BPM",
        value: this.props.media.bpm
      },
      {
        label: "Genre",
        value: this.props.media.genre
      },
      {
        label: "Styles",
        value: this.props.media.secondaryGenre
          ? this.props.media.secondaryGenre.map((e, idx) => {
              if (idx < this.props.media.secondaryGenre.length - 1) {
                return e + ", ";
              } else {
                return e;
              }
            })
          : []
      },
      {
        label: t("sommaire.info.influence"),
        value: this.props.media.influence
      }
    ];
  }

  render() {
    const t = this.props.t
    return (      
      <TableDroite
        jeton={this.props.jeton}
        edition={this.props.edition}
        pageNo={5}
        mediaId={this.props.media.mediaId}
        title={t("sommaire.info.info")}
        rows={this.rangees()}
      />        
    )
  }
}
export default withTranslation()(TableInformationsGenerales)