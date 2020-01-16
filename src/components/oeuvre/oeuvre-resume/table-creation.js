import React from "react";
import TableGauche from "./table-gauche";
import moment from "moment";
import { Translation } from "react-i18next";

export default class TableCreation extends React.Component {

  constructor(props) {
    super(props)
    this.rangees = this.rangees.bind(this)

    this.ROLE_AUTEUR = props.roles.songwriter
    this.ROLE_COMPOSITEUR = props.roles.composer
    this.ROLE_ARRANGEUR = props.roles.remixer
    this.ROLE_EDITEUR = props.roles.publisher

    this.auteurs = []
    this.compositeurs = []
    this.arrangeurs = []
    this.editeurs = []

    let parts = props.media.rightHolders
    parts.forEach(_ad => {
      let rhId = _ad.id
      _ad.roles.forEach(_r => {
        switch (_r) {
          case this.ROLE_AUTEUR:
            this.auteurs.push(props.rightHolders[rhId])
            break
          case this.ROLE_COMPOSITEUR:
            this.compositeurs.push(props.rightHolders[rhId])
            break
          case this.ROLE_ARRANGEUR:
            this.arrangeurs.push(props.rightHolders[rhId])
            break
          case this.ROLE_EDITEUR:
            this.editeurs.push(props.rightHolders[rhId])
            break
          default:
        }
      })
    })

    moment.defaultFormat = "DD-MM-YYYY HH:mm"
  }

  rangees(t, i18n) {

    return [
      {
        label: t("oeuvre.attribut.etiquette.dateCreation"),
        value: moment( new Date(parseInt(this.props.media.creationDate) ), moment.defaultFormat).locale(i18n.lng.substring(0, 2)).format("LL")
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.iswc"),
        helpIcon: true,
        value: this.props.media.iswc ? this.props.media.iswc.trim() : ""
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.auteur-parole"),
        value: this.auteurs ? this.auteurs.map((a, idx) => {
          if (a && idx < this.auteurs.length - 1) {
            return <span key={`auteurs_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`auteurs_${a.rightHolderId}`}>{a.artistName}</span>
          }
        }) : []
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.compositeur-musique"),
        value: this.compositeurs.map((a, idx) => {
          if (a && idx < this.compositeurs.length - 1) {
            return <span key={`compositeur_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`compositeur_${a.rightHolderId}`}>{a.artistName}</span>
          }
        })
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.arrangeur-musique"),
        value: this.arrangeurs.map((a, idx) => {
          if (a && idx < this.arrangeurs.length - 1) {
            return <span key={`arrangeurs_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`arrangeurs_${a.rightHolderId}`}>{a.artistName}</span>
          }
        })
      },
      {
        label: t("flot.split.documente-ton-oeuvre.documenter.editeur"),
        value: this.editeurs.map((a, idx) => {
          if (a && idx < this.editeurs.length - 1) {
            return <span key={`editeurs_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`editeurs_${a.rightHolderId}`}>{a.artistName}</span>
          }
        })
      }
    ]
  }

  render() {
    return (
      <Translation>
        {
          (t, i18n) =>
            <div className="table">
              <TableGauche jeton={this.props.jeton} edition={this.props.edition} pageNo={1} mediaId={this.props.media.mediaId} title={t("flot.split.documente-ton-oeuvre.documenter.entete.creation")} rows={this.rangees(t, i18n)} />
            </div>
        }
      </Translation>
    )
  }
}