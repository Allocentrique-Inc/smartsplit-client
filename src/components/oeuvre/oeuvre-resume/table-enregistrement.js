import React from 'react';
import TableGauche from "./table-gauche";
import { Translation } from 'react-i18next';
import moment from 'moment';

export default class TableEnregistrement extends React.Component {

    constructor(props) {
        super(props)
        this.rangees = this.rangees.bind(this)
    
        this.ROLE_TECH = props.roles.soundRecordist
        this.ROLE_PRODUCTION = props.roles.producer
        this.ROLE_REALISATEUR = props.roles.director
        this.ROLE_STUDIO = props.roles.studio
        this.ROLE_MIXAGE = props.roles.mixEngineer
        this.ROLE_VERSION = props.roles.masterEngineer
        this.ROLE_GRAPHISTE = props.roles.graphist
    
        this.tech = []
        this.producteurs = []
        this.realisateurs = []
        this.studio = []
        this.mixeur = []
        this.master = []
        this.graphistes = []
    
        let parts  = props.media.rightHolders
        parts.forEach(_ad=>{
          let rhId = _ad.id
          _ad.roles.forEach(_r=>{
            switch(_r) {
              case this.ROLE_TECH:
                this.tech.push(props.rightHolders[rhId])
                break
              case this.ROLE_PRODUCTION:
                this.producteurs.push(props.rightHolders[rhId])
                break
              case this.ROLE_REALISATEUR:
                this.realisateurs.push(props.rightHolders[rhId])
                break
              case this.ROLE_STUDIO:
                this.studio.push(props.rightHolders[rhId])
                break
              case this.ROLE_MIXAGE:
                this.mixeur.push(props.rightHolders[rhId])
                break
              case this.ROLE_VERSION:
                this.master.push(props.rightHolders[rhId])
                break
              case this.ROLE_GRAPHISTE:
                this.graphistes.push(props.rightHolders[rhId])
                break
              default:
            }
          })
        })
      }
    
      rangees(t, i18n) {     

        return [
            
            {
                label: 'Date de sortie',
                value: this.props.media.publishDate && this.props.media.publishDate.trim() !== "" ? moment(this.props.media.publishDate).locale(i18n.lng.substring(0, 2)).format("LL") : "À venir"
            },

            {
                label: 'Titre de la piste',
                value: this.props.media.title
            },
            {
                label: 'Réalisateur',
                value: this.realisateurs.map((r, idx)=>{
                    if(r && idx < this.realisateurs.length - 1) {
                        return <span key={`realisateurs_${r.rightHolderId}`}>{r.artistName}, </span>
                      } else {
                        return <span key={`realisateurs_${r.rightHolderId}`}>{r.artistName}</span>
                      }
                })
            },
            {
                label: 'Techniciens en enregistrement',
                value: this.tech.map((r, idx)=>{
                    if(r && idx < this.tech.length - 1) {
                        return <span key={`techs_${r.rightHolderId}`}>{r.artistName}, </span>
                      } else {
                        return <span key={`techs_${r.rightHolderId}`}>{r.artistName}</span>
                      }
                })
            },
            {
                label: 'Mixage',
                value: this.mixeur.map((r, idx)=>{
                    if(r && idx < this.mixeur.length - 1) {
                        return <span key={`mixeurs_${r.rightHolderId}`}>{r.artistName}, </span>
                      } else {
                        return <span key={`mixeurs_${r.rightHolderId}`}>{r.artistName}</span>
                      }
                })
            },
            {
                label: 'Mastering',
                value: this.master.map((r, idx)=>{
                    if(r && idx < this.mixeur.length - 1) {
                        return <span key={`masters_${r.rightHolderId}`}>{r.artistName}, </span>
                      } else {
                        return <span key={`masters_${r.rightHolderId}`}>{r.artistName}</span>
                      }
                })
            },
            {
              label: "Studio d'enregistrement",
              value: (
                  <>
                      {this.props.media.studio}
                      <br/><span className={'color-secondary'}>{this.props.media.studioAddress}</span></>)
            },
            {
                label: 'Production',
                value: this.producteurs.map((r, idx)=>{
                    if(r && idx < this.producteurs.length - 1) {
                        return <span key={`producteurs_${r.rightHolderId}`}>{r.artistName}, </span>
                      } else {
                        return <span key={`producteurs_${r.rightHolderId}`}>{r.artistName}</span>
                      }
                })
            },
            {
              label: 'Illustration',
              value: this.graphistes.map((r, idx)=>{
                if(r && idx < this.graphistes.length - 1) {
                    return <span key={`graphistes_${r.rightHolderId}`}>{r.artistName}, </span>
                  } else {
                    return <span key={`graphistes_${r.rightHolderId}`}>{r.artistName}</span>
                  }
              })
            },
            {
              label: 'ISRC',
              helpIcon: true,
              value: this.props.media.isrc
            },
            {
                label: 'Étiquette',
                value: this.props.media.label
            },            
            {
                label: "Distributeur",
                value: this.props.media.distributor
            }
        ]
    }

    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <TableGauche
                            edition={this.props.edition} 
                            title={ 'Enregistrement sonore' }
                            rows={ this.rangees(t, i18n) }
                            pageNo={ 3 }
                            mediaId={ this.props.media.mediaId }
                        />
                }
            </Translation>            
        )
    }
}
