import React from "react";
import TableGauche from "./table-gauche";
import { withTranslation } from "react-i18next";
import moment from "moment";

class TableEnregistrement extends React.Component {
  constructor(props) {
    super(props);
    this.rangees = this.rangees.bind(this);

    this.ROLE_TECH = props.roles.soundRecordist;
    this.ROLE_PRODUCTION = props.roles.producer;
    this.ROLE_REALISATEUR = props.roles.director;
    this.ROLE_STUDIO = props.roles.studio;
    this.ROLE_MIXAGE = props.roles.mixEngineer;
    this.ROLE_VERSION = props.roles.masterEngineer;
    this.ROLE_GRAPHISTE = props.roles.graphist;

    this.tech = [];
    this.producteurs = [];
    this.realisateurs = [];
    this.studio = [];
    this.mixeur = [];
    this.master = [];
    this.graphistes = [];

    let parts = props.media.rightHolders

    if(parts) {
      parts.forEach(_ad => {
        let rhId = _ad.id;
        _ad.roles.forEach(_r => {
          switch (_r) {
            case this.ROLE_TECH:
              this.tech.push(props.rightHolders[rhId]);
              break;
            case this.ROLE_PRODUCTION:
              this.producteurs.push(props.rightHolders[rhId]);
              break;
            case this.ROLE_REALISATEUR:
              this.realisateurs.push(props.rightHolders[rhId]);
              break;
            case this.ROLE_STUDIO:
              this.studio.push(props.rightHolders[rhId]);
              break;
            case this.ROLE_MIXAGE:
              this.mixeur.push(props.rightHolders[rhId]);
              break;
            case this.ROLE_VERSION:
              this.master.push(props.rightHolders[rhId]);
              break;
            case this.ROLE_GRAPHISTE:
              this.graphistes.push(props.rightHolders[rhId]);
              break;
            default:
          }
        })
      })
    }    
  }

  rangees() {
    const t = this.props.t, i18n = this.props.i18n
    return [
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.date-sortie"),
        value:
          this.props.media.publishDate &&
          this.props.media.publishDate.trim() !== ""
            ? moment(this.props.media.publishDate)
                .locale(i18n.language.substring(0, 2))
                .format("LL")
            : t("flot.split.documente-ton-oeuvre.documenter.date-choix.avenir")
      },

      {
        label: t("sommaire.autres.piste"),
        value: this.props.media.title
      },
      {
        label: t("flot.split.roles.director"),
        value: this.realisateurs.map((r, idx) => {
          if (r && idx < this.realisateurs.length - 1) {
            return (
              <><span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`realisateurs_${r.rightHolderId}`}>
                {r.artistName}
              </span>,{" "}</>
            );
          } else {
            return (
              <span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`realisateurs_${r.rightHolderId}`}>
                {r.artistName}
              </span>
            );
          }
        })
      },
      {
        label: t("sommaire.autres.tech"),
        value: this.tech.map((r, idx) => {
          if (r && idx < this.tech.length - 1) {
            return (
              <><span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`techs_${r.rightHolderId}`}>{r.artistName}</span>,&nbsp;
              </>
            );
          } else {
            return <span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`techs_${r.rightHolderId}`}>{r.artistName}</span>;
          }
        })
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.mix"),
        value: this.mixeur.map((r, idx) => {
          if (r && idx < this.mixeur.length - 1) {
            return (
              <><span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`mixeurs_${r.rightHolderId}`}>{r.artistName}</span>, &nbsp;</>
            );
          } else {
            return (
              <span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`mixeurs_${r.rightHolderId}`}>{r.artistName}</span>
            );
          }
        })
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.master"),
        value: this.master.map((r, idx) => {
          if (r && idx < this.mixeur.length - 1) {
            return (
              <><span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`masters_${r.rightHolderId}`}>{r.artistName}</span>,&nbsp;</>
            );
          } else {
            return (
              <span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`masters_${r.rightHolderId}`}>{r.artistName}</span>
            );
          }
        })
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.studio"),
        value: (
          <>
            {this.props.media.studio}
            <br />
            <span className={"color-secondary"}>
              {this.props.media.studioAddress}
            </span>
          </>
        )
      },
      {
        label: "Production",
        value: this.producteurs.map((r, idx) => {
          if (r && idx < this.producteurs.length - 1) {
            return (
              <><span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`producteurs_${r.rightHolderId}`}>
                {r.artistName}
              </span>,{" "}</>
            );
          } else {
            return (
              <span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`producteurs_${r.rightHolderId}`}>{r.artistName}</span>
            );
          }
        })
      },
      {
        label: t("sommaire.autres.illustration"),
        value: this.graphistes.map((r, idx) => {
          if (r && idx < this.graphistes.length - 1) {
            return (
              <><span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`graphistes_${r.rightHolderId}`}>
                {r.artistName}
              </span>,{" "}</>
            );
          } else {
            return (
              <span className={`gras ${this.props.pochette ? "pochette" : "smartsplit" }`} key={`graphistes_${r.rightHolderId}`}>{r.artistName}</span>
            );
          }
        })
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.isrc"),
        helpIcon: true,
        value: this.props.media.isrc
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.etiquette"),
        value: this.props.media.label
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.distribution"),
        value: this.props.media.distributor
      }
    ];
  }

  render() {
    const t = this.props.t
    return (      
          <div className="table">
            <TableGauche
              jeton={this.props.jeton}
              edition={this.props.edition}
              title={t(
                "flot.split.documente-ton-oeuvre.partage.enregistrement.titre"
              )}
              rows={this.rangees()}
              pageNo={3}
              mediaId={this.props.media.mediaId}
            />
          </div>        
    )
  }
}
export default withTranslation()(TableEnregistrement)