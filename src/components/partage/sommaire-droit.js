import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import Beignet from '../visualisation/partage/beignet'
import Beignet2 from '../visualisation/partage/beignet2'
import Histogramme from '../visualisation/partage/histogramme'
import { CopyrightSVG, StarSVG, RecordSVG } from '../svg/SVG.js'
import editIcon from '../../assets/svg/icons/edit.svg'
// eslint-disable-next-line
import { Droits, AyantsDroit, journal, utils, Identite } from '../../utils/application'
// eslint-disable-next-line
const NOM = "SommaireDroit"

const TYPES = { workCopyrightSplit: 1, performanceNeighboringRightSplit: 2, masterNeighboringRightSplit: 3 }

class SommaireDroit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ayantsDroit: props.ayantsDroit, // Les ayant-droits
            ayantDroit: props.ayantDroit,   // L'utilisateur en cours
            parent: props.parent,
            voteTermine: props.voteTermine,
            type: props.type,
            parts: props.parts,
            titre: props.titre,
            donnees: [],
            jetonApi: props.jetonApi,
            modifierVote: false,
            monVote: props.monVote,
            avatars: props.avatars,
            uuid: props.uuid,
            proposition: props.proposition
        }
        this.changerVote = this.changerVote.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.parts !== nextProps.parts) {
            this.setState({ parts: nextProps.parts })
            this.organiserDonnees()
        }
        if (this.props.avatars !== nextProps.avatars) {
            this.setState({ avatars: nextProps.avatars })
        }
        if (this.props.ayantsDroit !== nextProps.ayantsDroit) {
            this.setState({ ayantsDroit: nextProps.ayantsDroit })
        }
        if (this.props.t !== nextProps.t) {
            this.setState({ t: nextProps.t })
        }
        this.setState({ monVote: nextProps.monVote }, () => {
            if (this.state.monVote && this.state.monVote.vote !== 'active') {
                this.setState({ modifierVote: true })
            }
        })
    }

    componentWillMount() {
        this.organiserDonnees()
    }

    justifierRefus() {
        this.setState({ justifierRefus: true })
    }

    changerVote() {
        this.setState({ modifierVote: false })
    }

    voter(choix) {
        let _monChoix = choix ? 'accept' : 'reject'
        this.state.parent.vote(_monChoix, this.state.type)
        if (choix) {
            this.setState({ justifierRefus: false })
        }
    }

    organiserDonnees() {
        if (this.state.type === "workCopyrightSplit") {
            let donnees = Droits.donneesVisualisationParType(this.state.parts, this.state.type, this.state.ayantsDroit)
            let donneesParoles = donnees[Droits.nomSousTypeParoles()].reverse()
            let donneesMusique = donnees[Droits.nomSousTypeMusique()]
            let donneesCompletes = Droits.donneesVisualisation(this.state.parts)

            this.setState({ donnees: donneesCompletes })
            this.setState({ donneesMusique })
            this.setState({ donneesParoles })
        } else {
            let donnees = Droits.donneesVisualisation(this.state.parts)
            this.setState({ donnees })
        }
    }

    render() {
        let t = this.props.t
        if (this.state.ayantsDroit) {
            let _parts = []
            let _data = []
            let beignetDouble = (this.state.type === "workCopyrightSplit")
            Object.keys(this.state.donnees).forEach((uuid, idx) => {            
                let part = this.state.donnees[uuid]
                let _aD = this.state.ayantsDroit[uuid]
                _data.push({ ayantDroit: _aD, nom: part.nom, pourcent: part.sommePct, color: part.color, raison: part.raison })
                _parts.push(
                    <div key={`part--${this.state.type}_${uuid}_${idx}`}>
                        <div className="ui grid">
                            <div className="ui row">
                                <div className="ui two wide column" style={{padding: "0 0 0 1rem"}}>
                                    <img style={{margin: "0.5rem 0 0 1rem"}} alt="" className="ui spaced avatar image" src={AyantsDroit.ayantsDroit[part.rightHolderId].avatar.dataUri} />
                                </div>
                                <div className="ui fourteen wide column">
                                    <div className="ui row">
                                        <div className="holder-name" style={{display: "inline"}}>
                                            {part.nom}
                                        </div>                                                                               
                                        <div className="vote">
                                            <span className={`${part.rightHolderId !== this.props.ayantDroit.rightHolderId ? 'utilisateurInvite' : 'utilisateurConnecte'}`}>
                                                {parseFloat(part.sommePct).toFixed(2) + "%"}
                                            </span>
                                        </div>
                                    </div>                                    
                                    <div className="ui row">
                                        <div className="role" style={{paddingLeft: "0rem", display: "inline"}}>
                                            {
                                                part.roles.map((_e, idx) => {
                                                    return t('flot.split.roles.' + _e) + (idx === part.roles.length - 1 ? '' : ', ')
                                                })
                                            }
                                        </div>
                                        <div className="statut">
                                            <div className={(part.vote === 'accept') ? "approuve" : (part.vote === 'reject' ? "desaprouve" : "attente")}>
                                                {t(`flot.split.vote.${part.vote}`)}
                                            </div>
                                        </div>   
                                        {
                                            Object.keys(this.state.donnees).length - 1 !== idx && (
                                                <div className="ui section divider sommaire" style={{marginTop: "1rem", marginBottom: "1rem"}} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${part.rightHolderId && this.props.ayantDroit.rightHolderId > 1 ? 'border-bottom devide' : ''}`} />
                        {
                            uuid === this.state.ayantDroit.rightHolderId && (
                                <>
                                    {
                                        !this.state.voteTermine &&
                                        (
                                            <div className="ui grid">
                                                <div className="ui row">
                                                    <div className="ui two wide column" />
                                                    <div className="ui fourteen wide column">
                                                        <i>{part.raison ? part.raison : ""}</i>
                                                        <div className={`ui button medium vote refus ${this.state.refuser ? 'actif' : ''}`}
                                                            onClick={() => {
                                                                this.setState({ accepter: false })
                                                                this.setState({ refuser: true })
                                                                this.voter(false)
                                                            }}>
                                                            {t('flot.split.vote.refuser')}
                                                        </div>
                                                        <div className={`ui button medium vote accepte ${this.state.accepter ? 'actif' : ''}`}
                                                            onClick={() => {
                                                                this.setState({ accepter: true })
                                                                this.setState({ refuser: false })
                                                                this.voter(true)
                                                            }}>{t('flot.split.vote.accepter')}</div>
                                                        {this.state.refuser && (
                                                            <textarea
                                                                className="raison refus"
                                                                cols={30}
                                                                rows={2}
                                                                placeholder={t("flot.split.valider.pourquoi")}
                                                                onChange={(e) => {
                                                                    this.state.parent.refuser(this.state.type, e.target.value)
                                                                }}>
                                                            </textarea>
                                                        )}
                                                    </div>                                                    
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                )
            })

            const Map = {"workCopyrightSplit": <CopyrightSVG />, 
                        "performanceNeighboringRightSplit": <StarSVG />,
                         "masterNeighboringRightSplit": <RecordSVG /> }

            const Icon = Map[this.state.titre]

            const peutModifier = !this.props.votation && 
                                    (this.state.proposition.initiatorUuid === Identite.usager.username) &&
                                    this.state.proposition.etat !== 'ACCEPTE' &&
                                    this.state.proposition.etat !== 'REFUSE' &&
                                    this.state.proposition.etat !== 'VOTATION'
            
            return (
                <div className="ui grid">
                    <div className="ui row" style={ this.state.type === Droits.droitAuteur() ? {minHeight: "38rem"} : {} }>
                        <div className="ui eight wide column">                            
                            <div className="wizard-title types" style={{padding: "1rem", marginTop: "0rem"}}>
                                <div>
                                    {Icon}
                                </div>
                                <div style={{marginLeft: "1rem"}}>
                                    {t(`flot.split.droits.titre.${this.state.titre}`)}
                                </div>
                                {
                                    _parts.length > 0 && peutModifier && (
                                        <div 
                                            className="ui medium button inverse" 
                                            style={{ right: "0px", position: "absolute", top: "0.25rem", height: "3rem" }}
                                            onClick={()=>{
                                                utils.naviguerVersEditerProposition(this.state.uuid, TYPES[this.state.type])
                                            }}>
                                            <img src={editIcon} alt={t('options.modifier')} />
                                            <span style={{position: "relative", top: "-0.375rem", left: "0.375rem"}}>{t('options.modifier')}</span>
                                        </div>
                                    )
                                }
                                {
                                    _parts.length === 0 && peutModifier && (
                                        <div 
                                            className="ui medium button" 
                                            style={{ right: "0px", position: "absolute", top: "0.25rem", height: "3rem" }}
                                            onClick={()=>{
                                                utils.naviguerVersEditerProposition(this.state.uuid, TYPES[this.state.type])
                                            }}>
                                            <span style={{position: "relative"}}>{t('options.ajouter')}</span>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                _parts && _parts.length > 0 && (
                                    <div className="ui row">
                                        <div className="ui eight wide column" style={{padding: "1rem", marginTop: "0px"}}>
                                        {_parts}
                                        </div>                            
                                    </div>
                                )
                            }
                        </div>
                        <div className="ui eight wide column" style={{minHeight: (this.state.type === 1)}}>
                            {
                                _parts && _parts.length > 0 && 
                                (
                                    <>
                                        {
                                            beignetDouble && (
                                                <div>
                                                    {beignetDouble && this.state.donneesParoles && (<Beignet2 type={this.state.type} titre="Paroles" side="left" uuid={`beignet_${this.state.uuid}_${this.state.titre}_paroles`} data={this.state.donneesParoles} styleTexte={{position: "absolute", top: "32rem", left: "18rem"}} />)}
                                                    {beignetDouble && this.state.donneesMusique && (<Beignet2 type={this.state.type} titre="Musique" side="right" uuid={`beignet_${this.state.uuid}_${this.state.titre}_musique`} data={this.state.donneesMusique} styleTexte={{position: "absolute", top: "32rem", right: "14rem"}} />)}
                                                </div>
                                            )
                                        }                            
                                        {!beignetDouble && _data.length < 9 && (<Beignet type={this.state.type} uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data} />)}
                                        {!beignetDouble && _data.length >= 9 && (<Histogramme uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data} />)}
                                    </>
                                )
                            }                            
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}
export default withTranslation()(SommaireDroit)