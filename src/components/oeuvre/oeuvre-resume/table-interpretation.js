import React from 'react';
import TableGauche from "./table-gauche";
import { Translation } from 'react-i18next';

export default class TableInterpretation extends React.Component {

    constructor(props) {
        super(props)
       
        this.rangees = this.rangees.bind(this)

        this.ROLE_PRINCIPAL = props.roles.principal
        this.ROLE_ACCOMPAGNEMENT = props.roles.accompaniment
        this.ROLE_MUSICIEN = props.roles.musician
        this.ROLE_CHANTEUR = props.roles.singer
        this.ROLE_SOLISTE = props.roles.leadVocal
        this.ROLE_CHORISTE = props.roles.backVocal
        this.ROLE_VOIX = props.roles.spokenVocal        
    }

    rangees(t, i18n) {

        let rangees = []

        let parts  = this.props.media.rightHolders
        
        parts.forEach(_ad=>{
            let rhId = _ad.id
            let rang = {}            
            
            let principalOuAccompagnateur, chanteur, musicien, instruments = "", soliste, voix, choriste          
            _ad.roles.forEach(_r=>{                
                switch(_r) {
                    case this.ROLE_PRINCIPAL:
                        principalOuAccompagnateur = (
                            <div className={ 'mb-05' }>
                                <span className={ 'tag' }>Artiste vedette</span>
                            </div>)
                        break
                    case this.ROLE_ACCOMPAGNEMENT:
                        principalOuAccompagnateur = (
                            <div className={ 'mb-05' }>
                                <span className={ 'tag' }>Artiste accompagnateur</span>
                            </div>)                    
                        break
                    case this.ROLE_MUSICIEN:
                        musicien = (
                            <div>Musicien :&nbsp;</div>
                        )
                        break
                    case this.ROLE_CHANTEUR:
                        chanteur = (
                            <div>Chanteur :&nbsp;</div>
                        )
                        break
                    case this.ROLE_SOLISTE:
                        soliste = (
                            <div className={ 'color-secondary' }>Soliste</div>
                        )
                        break
                    case this.ROLE_CHORISTE:
                        choriste = (
                            <div className={ 'color-secondary' }>Choriste</div>
                        )
                        break
                    case this.ROLE_VOIX:
                        voix = (
                            <div className={ 'color-secondary' }>Voix parlée</div>
                        )
                        break
                    default:
                }
            })

            if(principalOuAccompagnateur && musicien) {
                if(_ad.instruments) {
                    _ad.instruments.forEach((i, idx)=>{
                        if(idx < _ad.instruments.length - 1) {
                            instruments = instruments + i + ", "
                        } else {
                            instruments = instruments + i
                        }
                    })
                }                
                rang.label = (<span key={`${rhId}`}>{this.props.rightHolders[rhId].artistName}</span>)
            }
            // assemblage
            rang.value = (
                <>
                    {principalOuAccompagnateur}
                    <div className={ 'flex' }>
                        {chanteur}{soliste}{choriste}{voix}
                    </div>
                    <div className={ 'flex' }>
                        {musicien}
                        <div className={ 'color-secondary' }>{instruments}</div>
                    </div>
                </>
            )

            if(rang.label)
                rangees.push(rang)
        })

        return rangees
       
    }

    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <TableGauche
                            title={ 'Interprétation' }
                            rows={ this.rangees(t, i18n) }
                        />
                }
            </Translation>            
        )
    }
}
