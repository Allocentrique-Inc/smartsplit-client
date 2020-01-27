import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Beignet from '../visualisation/partage/beignet'
import { withTranslation } from 'react-i18next'
import LogIn from '../auth/Login'
import { Modal } from 'semantic-ui-react'
import editIcon from '../../assets/svg/icons/edit.svg'
import {Identite, config, AyantsDroit, utils} from '../../utils/application'

class PartageSommaireEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idx: props.idx,
            part: props.part,
            proposition: props.proposition,
            utilisateur: props.ayantDroit,
            jetonApi: props.jetonApi,
            modifierVote: false,
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
    }

    componentWillMount() {
        this.rafraichirDonnees(() => {
            if (!this.estVoteFinal() && (this.estVoteClos() || this.state.rafraichirAuto)) {
                this.setState({ rafraichir: true }, () => {
                    this.rafraichissementAutomatique()
                })
            }
        })

        // Récupère tous les ayant-droits        
        let _rHs = AyantsDroit.ayantsDroit

        this.setState({ ayantsDroit: _rHs }, () => {
            Object.keys(this.state.ayantsDroit).forEach(adId => {
                if (adId === this.state.part.rightHolderId) {
                    this.setState({ donateur: this.state.ayantsDroit[adId] })
                }
                if (adId === this.state.part.shareeId) {
                    this.setState({ beneficiaire: this.state.ayantsDroit[adId] }, () => {
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
                }
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
            <div className="ui button medium" style={{ cursor: "pointer", display: "inline-block" }} onClick={() => {
                this.voter(true)
            }}>{t('flot.split.vote.accepter')}</div>                
        )
    }

    refuser(raison) {
        this.setState({ raison: raison })
    }

    boutonRefuser() {
        const t = this.props.t
        return (            
            <div className="ui button medium red" style={{ cursor: "pointer", display: "inline-block" }} onClick={() => {
                this.voter(false)
                this.justifierRefus()
            }}>{t('flot.split.vote.refuser')}</div>                
        )
    }

    justifierRefus() {
        this.setState({ justifierRefus: true })
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
            jeton: this.state.jetonApi
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
            return (
                <div className="ui segment">
                    <div className="ui grid">
                        <div className="ui row">
                            <div className="ui one wide column">
                            </div>
                            <div className="ui six wide column">
                                <div className="ui grid">
                                    <div className="ui row">
                                        <div className="ui two wide column">
                                            <div className="holder-name">
                                                <img alt="" className="ui spaced avatar image" src={`${config.IMAGE_SRV_URL}${this.state.beneficiaire.avatarImage}`} />
                                            </div>
                                        </div>
                                        <div className="ui ten wide column">
                                            <div className="holder-name">
                                                {
                                                    this.state.beneficiaire &&
                                                        this.state.beneficiaire.artistName ?
                                                        this.state.beneficiaire.artistName :
                                                        `${this.state.beneficiaire.firstName} ${this.state.beneficiaire.lastName}`
                                                }
                                            </div>                                            
                                            <div className="small-400-color">
                                                {t('flot.split.documente-ton-oeuvre.editeur.editeur')}
                                            </div>                                                
                                            <div style={{ position: "relative", marginTop: "5px" }}>
                                                {
                                                    !this.estVoteFinal() &&
                                                    this.state.ayantDroit &&
                                                    this.state.part.shareeId === this.state.utilisateur.rightHolderId &&
                                                    (
                                                        <div className="ui five wide column">
                                                            {!this.state.modifierVote && this.boutonRefuser()}
                                                            {!this.state.modifierVote && this.boutonAccepter()}
                                                            {
                                                                this.state.modifierVote &&
                                                                (
                                                                    <div>
                                                                        <img
                                                                            alt="edit"
                                                                            src={editIcon}
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() => { this.changerVote() }} />
                                                                        {
                                                                            this.state.justifierRefus && (
                                                                                <div>
                                                                                    <textarea
                                                                                        cols={30}
                                                                                        rows={2}
                                                                                        placeholder="Pourquoi refuses-tu le split (optionel)"
                                                                                        onChange={(e) => {
                                                                                            this.refuser(e.target.value)
                                                                                        }}>
                                                                                    </textarea>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )}
                                                {
                                                    this.state.monVote &&
                                                    this.state.part.shareeId === this.state.utilisateur.rightHolderId && this.state.monVote.raison
                                                }
                                            </div>
                                        </div>
                                        <div className="ui three wide column">
                                            <p className="big">
                                                {parseFloat(this.state.part.shareePct).toFixed(2)} %
                                            </p>                                            
                                            <div style={{ color: this.state.choix === 'accept' ? "green" : (this.state.choix === "reject" ? "red" : "grey") }}>
                                                <strong>{t(`flot.split.vote.${this.state.choix}`)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui row">
                                        <div className="ui two wide column">
                                            <div className="holder-name">
                                                <img alt="" className="ui spaced avatar image" src={`${config.IMAGE_SRV_URL}${this.state.donateur.avatarImage}`} />
                                            </div>
                                        </div>
                                        <div className="ui ten wide column">
                                            <div className="holder-name">
                                                {
                                                    this.state.donateur &&
                                                        this.state.donateur.artistName ?
                                                        this.state.donateur.artistName :
                                                        `${this.state.donateur.firstName} ${this.state.donateur.lastName}`
                                                }
                                            </div>                                            
                                            <div className="small-400-color">
                                                {t('flot.split.documente-ton-oeuvre.editeur.donateur')}
                                            </div>                                            
                                        </div>
                                        <div className="ui three wide column">
                                            <p className="big">
                                                {parseFloat(this.state.part.rightHolderPct).toFixed(2)} %
                                            </p>                                            
                                            <div style={{ color: "green" }}>
                                                <strong>{t(`flot.split.vote.accept`)}</strong>
                                            </div>                                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui six wide column">
                                {visualisation}
                            </div>
                            <div className="ui one wide column">
                            </div>
                        </div>
                    </div>
                    {
                        this.state.part.etat === "VOTATION" &&
                        this.state.utilisateur.rightHolderId === this.state.part.shareeId &&
                        (
                            <button className="ui medium button" disabled={!this.state.transmission} onClick={() => {
                                this.transmettre()
                            }}> {t('flot.split.documente-ton-oeuvre.bouton.voter')}
                            </button>
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
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default withTranslation()(PartageSommaireEditeur)