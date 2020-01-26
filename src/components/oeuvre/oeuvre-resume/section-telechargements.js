import React from "react";
import downloadLockIcon from "../../../assets/svg/icons/download-lock.svg";
import downloadCloudIcon from "../../../assets/svg/icons/download-cloud.svg";
import lockFullIcon from "../../../assets/svg/icons/lock-full.svg";
import TitreModifiable from "./titre-modifiable";
import { withTranslation } from "react-i18next";
import { config } from '../../../utils/application'

class SectionTelechargements extends React.Component {
  renderDownload(download) {
    let pochette = this.props.pochette ? "pochette" : "smartsplit";

    return (
      <div
        key={`download-${download.label}`}
        className={`download-section cliquable`}
      >
        <img
          className={"download-icon"}
          src={download.icon}
          alt={download.label}
        />

        <div className={"download-texts"}>
          <div className={`download-url ${pochette}`}>
            <a
              className={`${pochette}`}
              target="_blank"
              rel="noopener noreferrer"
              href={download.urls}
            >
              {download.label}
            </a>
          </div>
        </div>
      </div>
    );
  }

  iconeParAcces(acces) {
    switch (acces) {
      case "on-invite":
        return downloadLockIcon;
      case "private":
        return lockFullIcon;
      case "public":
        return downloadCloudIcon;
      default:
    }
  }

  genererAffichage(type) {
    let arr = [];
    if (this.props.media.files[type] && this.props.media.files[type].files) {
      this.props.media.files[type].files.forEach(elem => {
        if (
          this.props.acces === 3 ||
          this.props.membreEquipe ||
          (elem.access === "private" && this.props.membreEquipe) ||
          (elem.access === "on-invite" && this.props.acces > 1) ||
          elem.access === "public"
        ) {
          let nomfichierS3 = elem.file;
          arr.push({
            icon: this.iconeParAcces(elem.access),
            label: elem.file,
            urls: `${config.IMAGE_SRV_ARTISTES_URL}${this.props.media.mediaId}/${type}/${nomfichierS3}`
          });
        }
      });
    }
    return arr;
  }

  render() {
    const t = this.props.t
    let audio = [],
      cover = [],
      midi = [],
      score = [];
    if (this.props.media.files) {
      audio = this.genererAffichage("audio");
      cover = this.genererAffichage("cover");
      midi = this.genererAffichage("midi");
      score = this.genererAffichage("score");
    }

    return (      
      <>
        <TitreModifiable
          jeton={this.props.jeton}
          edition={this.props.edition}
          pageNo={4}
          mediaId={this.props.media.mediaId}
        >
          <h4 className={"corps-title-2"}>
            {t("sommaire.telechargement.telechargement")}
          </h4>
        </TitreModifiable>

        <span
          className="corps-table"
          style={{ color: "#687A8B", marginBottom: "5px" }}
        >
          {t("sommaire.telechargement.visuel")}
        </span>
        {cover && cover.map(download => this.renderDownload(download))}
        <p style={{ height: "15px" }} />
        <span
          className="corps-table"
          style={{ color: "#687A8B", marginBottom: "5px" }}
        >
          {t("sommaire.telechargement.audio")}
        </span>
        {audio && audio.map(download => this.renderDownload(download))}
        <p style={{ height: "15px" }} />
        <span
          className="corps-table"
          style={{ color: "#687A8B", marginBottom: "5px" }}
        >
          {t("sommaire.telechargement.midi")}
        </span>
        {midi && midi.map(download => this.renderDownload(download))}
        <p style={{ height: "15px" }} />
        <span
          className="corps-table"
          style={{ color: "#687A8B", marginBottom: "5px" }}
        >
          {t("sommaire.telechargement.partition")}
        </span>
        <p style={{ height: "15px" }} />
        {score && score.map(download => this.renderDownload(download))}
      </>        
    )
  }
}
export default withTranslation()(SectionTelechargements)