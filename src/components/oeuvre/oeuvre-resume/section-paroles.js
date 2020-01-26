import React from "react";
import downloadLockIcon from "../../../assets/svg/icons/download-lock.svg";
import downloadCloudIcon from "../../../assets/svg/icons/download-cloud.svg";
import lockFullIcon from "../../../assets/svg/icons/lock-full.svg";
import TitreModifiable from "./titre-modifiable";
import { useTranslation } from "react-i18next";

export default function SectionParoles(props) {
  const { t } = useTranslation();
  return <BaseSectionParoles {...props} t={t} />;
}

export class BaseSectionParoles extends React.Component {
  iconeParAccess(type) {
    switch (type) {
      case "public":
        return downloadCloudIcon;
      case "private":
        return lockFullIcon;
      case "on-invite":
        return downloadLockIcon;
      default:
    }
  }

  render() {
    let paroles = this.props.media.lyrics;
    let texte = this.props.t("sommaire.parole.voir");
    if (paroles) {
      if (
        (this.props.acces === 3 ||
          this.props.membreEquipe ||
          (paroles.access === "private" && this.props.membreEquipe) ||
          (paroles.access === "on-invite" && this.props.acces > 1) ||
          paroles.access === "public") &&
        paroles.text.trim()
      ) {
        texte = paroles.text;
      }
    }

    if(paroles) {
      return (      
        <>
          <TitreModifiable
            jeton={this.props.jeton}
            edition={this.props.edition}
            pageNo={6}
            mediaId={this.props.media.mediaId}
          >
            <h4 className={"corps-title-2"}>
              {this.props.t("sommaire.parole.parole")}
            </h4>
          </TitreModifiable>

          <div className={"download-section"}>
            <img
              className={"download-icon"}
              src={this.iconeParAccess(paroles.access)}
              alt={"accès"}
            />

            <div className={"download-texts"}>
              <pre>{texte}</pre>
            </div>
          </div>
        </>
      )
    } else {
      return (<></>)
    }
    
  }
}
