import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'
import Beignet from '../visualisation/partage/beignet'
import Beignet2 from '../visualisation/partage/beignet2'
import Histogramme from '../visualisation/partage/histogramme'
import {CopyrightSVG, StarSVG, RecordSVG } from '../svg/SVG.js'
// eslint-disable-next-line
import {Droits, AyantsDroit, journal} from '../../utils/application'
// eslint-disable-next-line
const NOM = "SommaireDroit"

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
            uuid: props.uuid
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
        if(this.state.type === "workCopyrightSplit") {
            let donnees = Droits.donneesVisualisationParType(this.state.parts, this.state.type, this.state.ayantsDroit)
            let donneesParoles = donnees[Droits.nomSousTypeParoles()]
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
            Object.keys(this.state.donnees).forEach(uuid => {
                let part = this.state.donnees[uuid]
                let _aD = this.state.ayantsDroit[uuid]
                _data.push({ ayantDroit: _aD, nom: part.nom, pourcent: part.sommePct, color: part.color, raison: part.raison })
                _parts.push(
                    <>
                        <div key={`part_${uuid}`}>
                            <div className="ui grid">
                                <div className="ui row">
                                    <div className="ui fourteen wide column">
                                        <div className="holder-name" style={{marginTop: "30px"}}>
                                            <img alt="" className="ui spaced avatar image" src={AyantsDroit.ayantsDroit[part.rightHolderId].avatar.dataUri} />
                                            {part.nom}
                                            <div className="vote">
                                                <span className={`${part.rightHolderId !== this.props.ayantDroit.rightHolderId  ? 'utilisateurInvite' : 'utilisateurConnecte'}`}>
                                                    {parseFloat(part.sommePct).toFixed(2) + "%"}
                                                </span>
                                                <div className={(part.vote === 'accept') ? "approuve" : (part.vote === 'reject' ? "desaprouve" : "attente")} style={{fontWeight: "normal"}}>
                                                    {t(`flot.split.vote.${part.vote}`)} 
                                                </div> 
                                            </div> 
                                        </div>
                                        <div className="ui row">
                                            <div className="role">                                                
                                                {
                                                    part.roles.map((_e, idx) => { 
                                                        return t('flot.split.roles.' + _e) + (idx === part.roles.length - 1 ? '' : ', ')
                                                    })
                                                }                                            
                                                </div>
                                            </div>
                                                                                           
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
                                                <>
                                                    <div className="ui row">
                                                        <div className="ui one wide column" />
                                                        <div className="ui eight wide column">
                                                            <i>{part.raison ? part.raison : ""}</i>
                                                            <div className={`ui button medium vote refus ${this.state.refuser ? 'actif' : ''}`}
                                                                onClick={() => {
                                                                    this.setState({accepter: false})
                                                                    this.setState({refuser: true})
                                                                    this.voter(false)
                                                                }}>
                                                                    {t('flot.split.vote.refuser')}
                                                            </div>
                                                            <div className={`ui button medium vote accepte ${this.state.accepter ? 'actif' : ''}`}
                                                                onClick={() => {
                                                                    this.setState({accepter: true})
                                                                    this.setState({refuser: false})
                                                                    this.voter(true)
                                                                }}>{t('flot.split.vote.accepter')}</div>
                                                            </div>
                                                            {
                                                                this.state.refuser && (
                                                                    <textarea
                                                                        cols={30}
                                                                        rows={2}
                                                                        placeholder={t("flot.split.valider.pourquoi")}
                                                                        onChange={(e) => {
                                                                            this.state.parent.refuser(this.state.type, e.target.value)
                                                                        }}>
                                                                    </textarea>              
                                                                )
                                                            }
                                                        </div>
                                                    </>
                                            )
                                        }
                                    </>                                            
                                )
                            }
                         
                    </>
                )
            })        
            
            const Map = {"workCopyrightSplit": <CopyrightSVG />, 
                        "performanceNeighboringRightSplit": <StarSVG />,
                         "masterNeighboringRightSplit": <RecordSVG /> }

          const Icon = Map[this.state.titre]

            return (      
                <div className="ui segment types">                    
                    {/* Grille d'affichage des droits (à gauche) et à droite, de la visualisation */}
                    <div className="ui grid">
                        <div className="ui row">
                            <div className="ui eight wide column">
                                <div className="wizard-title types row" style={{marginTop: "0px"}}> 
                                    <div className="ui column">
                                        {Icon}
                                    </div>
                                    <div className="ui column">
                                        {t(`flot.split.droits.titre.${this.state.titre}`)} 
                                    </div>
                                </div>
                                {_parts}
                            </div>
                            <div className="ui eight wide column">                                
                                {beignetDouble && this.state.donneesParoles && this.state.donneesParoles.length < 9 && (<Beignet2 type={this.state.type} titre="Paroles" side="left" uuid={`beignet_${this.state.uuid}_${this.state.titre}_paroles`} data={this.state.donneesParoles} />)}
                                {beignetDouble && this.state.donneesMusique && this.state.donneesMusique.length < 9 && (<Beignet2 type={this.state.type} titre="Musique" side="right" uuid={`beignet_${this.state.uuid}_${this.state.titre}_musique`} data={this.state.donneesMusique} />)}
                                {!beignetDouble && _data.length < 9 && (<Beignet type={this.state.type} uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data} />)}
                                {!beignetDouble && _data.length >= 9 && (<Histogramme uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data} />)}
                            </div>
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