import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Beignet from '../visualisation/partage/beignet'
import { withTranslation } from 'react-i18next'
import LogIn from '../auth/Login'
import { Modal } from 'semantic-ui-react'
// eslint-disable-next-line
import {Identite, config, AyantsDroit, utils, journal} from '../../utils/application'
import "../../assets/scss/tableaudebord/tableaudebord.scss";
import { CopyrightSVG } from '../svg/SVG.js'
import editIcon from '../../assets/svg/icons/edit.svg'

// eslint-disable-next-line
const NOM = "PartageSommaireEditeur"

class PartageSommaireEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parent: props.parent,
            idx: props.idx,
            part: props.part,
            proposition: props.proposition,
            utilisateur: props.ayantDroit,
            jetonApi: props.jetonApi,
            modifierVote: false,
            titre: props.titre,
            choix: props.part.etat === 'ACCEPTE' ? 'accept' : (props.part.etat === 'REFUSE' ? 'reject' : 'active')
        }
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
        this.changerVote = this.changerVote.bind(this)
        this.estVoteFinal = this.estVoteFinal.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.part !== nextProps.part) {
            this.setState({ part: nextProps.part })
        }
        if (this.props.proposition !== nextProps.proposition) {
            this.setState({ proposition: nextProps.proposition })
        }
        if (this.props.avatars !== nextProps.avatars) {
            this.setState({ avatars: nextProps.avatars })
        }
        if (this.props.ayantDroit !== nextProps.ayantDroit) {
            this.setState({ ayantDroit: nextProps.ayantDroit })
        }
        if (this.props.parent !== nextProps.parent) {
            this.setState({ parent: nextProps.parent })
        }
    }

    componentWillMount() {        

        // Récupère tous les ayant-droits        
        let _rHs = Object.assign({}, AyantsDroit.ayantsDroit, AyantsDroit.editeurs)

        this.setState({ ayantsDroit: _rHs }, () => {
            let donateur = _rHs[this.state.part.rightHolderId]
            let beneficiaire = _rHs[this.state.part.shareeId]
            this.setState({ donateur: donateur })
            this.setState({ beneficiaire: beneficiaire }, ()=>{
                // Créer une structure pour les données du beignet avec tous les collaborateurs du partage
                let _rH = {}
                let donnees = []
                let parts = this.state.proposition.rightsSplits.workCopyrightSplit
                // Paroles
                parts.lyrics.forEach((elem, idx) => {
                    if (!_rH[elem.rightHolder.rightHolderId]) {
                        _rH[elem.rightHolder.rightHolderId] = { nom: undefined, pourcent: 0 }
                    }
                    _rH[elem.rightHolder.rightHolderId].nom = elem.rightHolder.name
                    _rH[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                    _rH[elem.rightHolder.rightHolderId].pourcent = parseFloat(_rH[elem.rightHolder.rightHolderId].pourcent) + parseFloat(elem.splitPct)
                })
                // Musique
                parts.music.forEach((elem, idx) => {
                    if (!_rH[elem.rightHolder.rightHolderId]) {
                        _rH[elem.rightHolder.rightHolderId] = { nom: undefined, pourcent: 0 }
                    }
                    _rH[elem.rightHolder.rightHolderId].nom = elem.rightHolder.name
                    _rH[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                    _rH[elem.rightHolder.rightHolderId].pourcent = parseFloat(_rH[elem.rightHolder.rightHolderId].pourcent) + parseFloat(elem.splitPct)
                })
                // Calcul des données pour le beignet par ayant-droit
                Object.keys(_rH).forEach((elem) => {
                    if (elem === this.state.part.rightHolderId) {
                        // c'est l'utlisateur connecté, on lui assigne 100 % du partage avec l'éditeur
                        let _aD = {}
                        _aD.pourcent = 100
                        _aD.color = _rH[elem].color
                        _aD.nom = _rH[elem].nom
                        this.setState({ ayantDroit: _aD })
                        this.setState({ partPrincipale: _rH[elem].pourcent })
                        // on pousse l'utilisateur ET l'éditeur
                        donnees.push({ ayantDroit: this.state.donateur, color: _rH[elem].color, nom: _rH[elem].nom, pourcent: parseFloat(_rH[elem].pourcent * this.state.part.rightHolderPct / 100) })
                        donnees.push({
                            ayantDroit: this.state.beneficiaire,
                            color: "#bacada",
                            nom: this.state.beneficiaire.artistName ? this.state.beneficiaire.artistName : `${this.state.beneficiaire.firstName} ${this.state.beneficiaire.lastName}`,
                            pourcent: parseFloat(this.state.part.shareePct * _rH[elem].pourcent / 100)
                        })
                    } else {
                        // on pousse l'ayant-droit
                        donnees.push({ ayantDroit: this.state.ayantsDroit[elem], color: _rH[elem].color, nom: _rH[elem].nom, pourcent: parseFloat(_rH[elem].pourcent) })
                    }
                })
                this.setState({ donnees: donnees })
            })
        })
    }

    activerBoutonVote() {
        this.setState({
            transmission: true
        })
    }

    boutonAccepter() {
        const t = this.props.t
        return (            
            <div className={`ui button medium vote accepte ${this.state.choix === 'accept' ? 'actif' : '' }`} onClick={() => {
                this.voter(true)
                this.setState({refuser: false})
            }}>{t('flot.split.vote.accepter')}</div>                
        )
    }

    refuser(raison) {
        this.setState({ raison: raison })
    }

    boutonRefuser() {
        const t = this.props.t
        return (            
            <div className={`ui button medium vote refus ${this.state.choix === 'reject' ? 'actif' : '' }`} onClick={() => {
                this.voter(false)
                this.justifierRefus()
            }}>{t('flot.split.vote.refuser')}</div>                
        )
    }

    justifierRefus() {
        this.setState({ refuser: true })
        this.setState({ choix: 'reject' })
    }

    changerVote() {
        this.setState({ modifierVote: false })
    }

    estVoteFinal() {
        // Détecte si le vote est terminé pour tous
        return this.state.part.etat === 'ACCEPTE' || this.state.part.etat === 'REFUSE'
    }

    voter(choix) {
        let _monChoix = choix ? 'accept' : 'reject'
        this.setState({ modifierVote: true })
        if (choix) {
            this.setState({ justifierRefus: false })
        }
        this.setState({ choix: _monChoix }, () => {
            this.activerBoutonVote()
        })
    }

    rafraichissementAutomatique() {
        setTimeout(() => {
            this.rafraichirDonnees(() => {
                if (!this.estVoteFinal() || this.state.rafraichir) {
                    this.rafraichissementAutomatique()
                    if (this.estVoteFinal()) {
                        // C'était le dernier rafraichissement (p.ex. cas où le dernier vote entre)
                        this.rafraichirDonnees()
                        this.setState({ rafraichir: false })
                    }
                }
            })
        }, 3000)
    }

    envoi() {
        let body = {
            userId: `${this.state.utilisateur.rightHolderId}`,
            choix: this.state.choix,
            jeton: this.state.jetonApi,
            raison: this.state.raison
        }
        axios.post(`${config.API_URL}splitShare/tiers/voter`, body)
            .then((res) => {
                utils.naviguerVersAccueil()
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }

    modaleConnexion(ouvrir = true) {
        this.setState({ modaleConnexion: ouvrir })
    }

    transmettre() {
        if(Identite.usager) {
            if (Identite.usager.username === this.state.beneficiaire.rightHolderId) {
                this.envoi()
            } else {
                toast.error(this.props.t('flot.split.erreur.volIdentite'))
            }
        } else {
            this.modaleConnexion()
        }        
    }

    rafraichirDonnees() {
        if (this.state.rafraichir) {
            axios.get(`${config.API_URL}splitShare/${this.state.proposition.uuid}/${this.state.user.username}`)
            .then(res => {
                this.setState({ part: res.data })
            })
            .catch(err => {
                toast.error(err.message)
            })
        }
    }

    render() {
        const t = this.props.t
        if (this.state.beneficiaire && this.state.donateur) {
            let visualisation = (<Beignet type="workCopyrightSplit" uuid={`auteur--beignet__${this.state.idx}`} data={this.state.donnees} />)            
            const peutModifier =    this.state.part.etat === 'ATTENTE'
            return (
                <>
                <div className="ui grid">
                    <div className="ui row" style={{minHeight: "38rem"}}>
                        <div className="ui eight wide column">
                            <div className="ui grid">
                                <div className="ui row">
                                    <div className="ui sixteen wide column">
                                        <div className="wizard-title types" style={{marginTop: "0rem", padding: "1rem"}}>
                                            <div className="icon">
                                                <CopyrightSVG />
                                            </div>
                                            <div className="titre" style={{marginLeft: "1rem"}}>
                                                {t(`flot.split.droits.auteur`)}
                                            </div>
                                            {
                                                peutModifier && (
                                                    <div 
                                                        className="ui medium button inverse" 
                                                        style={{ right: "0px", position: "absolute", top: "0.25rem", height: "3rem" }}
                                                        onClick={()=>{
                                                            toast.info('Non implémenté')
                                                            // Naviguer vers l'édition du partage avec un tiers
                                                            // utils.naviguerVersEditerProposition(this.state.uuid, TYPES[this.state.type])
                                                        }}>
                                                        <img src={editIcon} alt={t('options.modifier')} />
                                                        <span style={{position: "relative", top: "-0.375rem", left: "0.375rem"}}>{t('options.modifier')}</span>
                                                    </div>
                                                )
                                            }
                                        </div>                                        
                                    </div>
                                </div>                            
                                <div className="ui row" style={{padding: "1rem"}}>
                                    <div className="ui two wide column" style={{padding: "0px 0px 0px 1rem"}}>
                                        <img style={{margin: "0.5rem 0px 0px 1rem"}} alt="" className="ui spaced avatar image" src={`${config.IMAGE_SRV_URL}${this.state.beneficiaire.avatarImage}`} />
                                    </div>
                                    <div className="ui fourteen wide column">
                                        <div className="ui row">
                                            <div className="holder-name" style={{display: "inline"}}>
                                                {
                                                this.state.beneficiaire &&
                                                this.state.beneficiaire.artistName ?
                                                this.state.beneficiaire.artistName :
                                                `${this.state.beneficiaire.firstName} ${this.state.beneficiaire.lastName}`
                                                }
                                            </div>
                                            <div className="vote" style={{float: "right"}}>
                                                {parseFloat(this.state.part.shareePct).toFixed(2) + "%"}
                                            </div>
                                        </div>

                                        <div className="ui row">
                                            <div className="role" style={{paddingLeft: "0rem", display: "inline"}}>
                                                {t('flot.split.documente-ton-oeuvre.editeur.editeur')}
                                            </div>
                                            <div className="statut">
                                                <div className={this.state.part.etat==="ACCEPTE" ? 'approuve' : (this.state.part.etat==="REFUSE" ? 'refuse' : '' )}>
                                                    {t(`flot.split.etat.${this.state.part.etat}`)}
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.part.etat==="REFUSE" && 
                                            <div className="ui row">
                                                <div className="ui sixteen wide column refuse" style={{textAlign: "right"}}>
                                                    {this.state.part.raison}
                                                </div>
                                            </div>
                                        }
                                        <div className="ui row" style={{paddingTop: "1.5rem"}}>
                                            <div className="ui two wide column" />
                                            <div className="ui fourteen wide column">
                                                {
                                                    !this.estVoteFinal() &&
                                                    this.state.ayantDroit &&
                                                    this.state.part.shareeId === this.state.utilisateur.rightHolderId &&
                                                    (
                                                        <>
                                                            {this.boutonRefuser()}
                                                            {this.boutonAccepter()}
                                                        </>
                                                    )                                                    
                                                }
                                                {this.state.refuser && (
                                                    <textarea
                                                        className="raison refus"
                                                        cols={30}
                                                        rows={2}
                                                        placeholder={t("flot.split.valider.pourquoi")}
                                                        onChange={(e) => {
                                                            this.refuser(e.target.value)
                                                        }}>
                                                    </textarea>
                                                )}                                            
                                            </div>                                        
                                        </div>                       
                                    </div>
                                </div>
                                <div className="ui row" style={{padding: "1rem"}}>
                                    <div className="ui two wide column" style={{padding: "0px 0px 0px 1rem"}}>
                                        <img style={{margin: "0.5rem 0px 0px 1rem"}} alt="" className="ui spaced avatar image" src={`${config.IMAGE_SRV_URL}${this.state.donateur.avatarImage}`} />
                                    </div>
                                    <div className="ui fourteen wide column">
                                        <div className="ui row">
                                            <div className="holder-name" style={{display: "inline"}}>
                                                {
                                                this.state.donateur &&
                                                this.state.donateur.artistName ?
                                                this.state.donateur.artistName :
                                                `${this.state.donateur.firstName} ${this.state.donateur.lastName}`
                                                }                                            
                                            </div> 
                                            <div className="vote" style={{float: "right"}}>
                                                {parseFloat(this.state.part.rightHolderPct).toFixed(2) + "%"} 
                                            </div>
                                        </div>
                                        <div className="ui row">
                                            <div className="role" style={{paddingLeft: "0rem", display: "inline"}}>
                                                {t('flot.split.documente-ton-oeuvre.editeur.donateur')}
                                            </div>  
                                            <div className= "statut">
                                                <div className={"approuve"}>
                                                    {t(`flot.split.vote.accept`)}</div>
                                                </div>
                                            </div>
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                            <div className="ui eight wide column">                    
                                <div className="ui row">
                                    <div className="ui sixteen wide column">
                                        {visualisation}
                                    </div>
                                </div>
                            </div>
                        </div>               
                    </div>                                  
                    {
                        this.state.jetonApi && this.state.part &&
                        (
                            <div
                                style={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                paddingTop: "15px",
                                background: "#fff",
                                boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                                pochette: this.props.pochette
                                }}
                            >
                                <div className="ui grid">
                                    <div className="ui row" style={{marginBottom: "1rem"}}>
                                        <div className="ui two wide column" />
                                        <div className="ui four wide column" style={{textAlign: "right", paddingRight: "4.5rem"}}>
                                            { !this.estVoteFinal() &&
                                                <span style={
                                                    {color: "#687A8B", 
                                                     fontFamily: "IBM Plex Sans", 
                                                     fontStyle: "normal", 
                                                     fontWeight: "normal", 
                                                     fontSize: "16px", 
                                                     lineHeight: "24px"}}>
                                                        {t('navigation.vote.editeur')}
                                                </span>
                                            }                                            
                                        </div>
                                        <div className="ui seven wide column">
                                            <div className={`ui medium button voter ${!this.state.transmission ? 'disabled' : ''}`} disabled={!this.state.transmission} onClick={() => {
                                                this.transmettre()
                                            }}>{t('flot.split.documente-ton-oeuvre.bouton.voter')}
                                            </div>
                                        </div>
                                        <div className="ui three wide column" />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <Modal
                        open={this.state.modaleConnexion}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                        onClose={this.props.close}
                        size="small" >
                        <br /><br /><br />
                        <LogIn
                            vote={true}
                            fn={() => { if(Identite.usager) { this.envoi() } }} />
                    </Modal>
                </>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default withTranslation()(PartageSommaireEditeur)