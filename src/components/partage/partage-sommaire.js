import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'
import { Translation } from 'react-i18next'

import { Auth } from 'aws-amplify'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import avatar_espece from '../../assets/images/elliot.jpg'
import LogIn from '../auth/Login'

import { Modal } from 'semantic-ui-react'
import Declaration from '../auth/Declaration'

const ROLES = [
    "principal",
    "accompaniment",
    "producer",
    "director",
    "studio",
    "graphist",
    "remixer",
    "songwriter",
    "composer",
    "singer",
    "musician"
]

// À passer dans le système de traduction
const ROLES_NAMES = {
    "principal": "Principal",
    "accompaniment": "Accompaniment",
    "producer": "Producer",
    "director": "Director",
    "studio": "Studio",
    "graphist": "Graphist",
    "remixer": "Arranger",
    "songwriter": "Songwriter",
    "composer": "Composer",
    "singer": "Singer",
    "musician": "Musician"
}

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

const TITRES = {
    workCopyrightSplit: "Droits d'auteur",
    performanceNeighboringRightSplit: "Interprétation",
    masterNeighboringRightSplit: "Enregistrement sonore"
}

class SommaireDroit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ayantsDroit: props.ayantsDroit,
            parent: props.parent,
            voteTermine: props.voteTermine,
            type: props.type,
            parts: props.parts,
            titre: props.titre,
            donnees: [],
            ayantDroit: props.ayantDroit,
            jetonApi: props.jetonApi,
            modifierVote: false,
            monVote: props.monVote,
            avatars: props.avatars,
            uuid: props.uuid
        }
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
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
        this.setState({ monVote: nextProps.monVote }, () => {
            if (this.state.monVote && this.state.monVote.vote !== 'active') {
                this.setState({ modifierVote: true })
            }
        })
    }

    componentWillMount() {
        this.organiserDonnees()
    }

    boutonAccepter() {
        return (
            <Translation>
                {
                    t =>
                        <div className="ui button medium" style={{ cursor: "pointer", display: "inline-block", width: "100px" }} onClick={() => {
                            this.voter(true)
                        }}>{t('flot.split.vote.accepter')}</div>
                }
            </Translation>
        )
    }

    boutonRefuser() {
        return (
            <Translation>
                {
                    t =>
                        <div style={{ display: "inline-block" }}>
                            <div className="ui button medium red" style={{ cursor: "pointer", display: "inline-block" }} onClick={() => {
                                this.justifierRefus()
                                this.voter(false)
                            }}>
                                {t('flot.split.vote.refuser')}
                            </div>
                        </div>
                }
            </Translation>
        )
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
        let _p = this.state.parts
        let _aD = {} // Structure résumé des ayants-droit
        Object.keys(_p).forEach(_e => {
            _p[_e].forEach(__e => {

                // Ajoute une structure d'ayant-droit si non existante
                if (!_aD[__e.rightHolder.rightHolderId]) {
                    _aD[__e.rightHolder.rightHolderId] = { roles: [], sommePct: 0.0000 }
                }

                let _donnees = _aD[__e.rightHolder.rightHolderId]
                _donnees.nom = __e.rightHolder.name
                _donnees.vote = __e.voteStatus
                _donnees.raison = __e.comment
                _donnees.color = __e.rightHolder.color
                _donnees.rightHolderId = __e.rightHolder.rightHolderId
                _donnees.sommePct = (parseFloat(_donnees.sommePct) + parseFloat(__e.splitPct)).toFixed(4)

                // Les rôles dépendent du type de droit

                function ajouterRolesReconnus(roles) {
                    Object.keys(roles).forEach(_roleId => {
                        if (ROLES.includes(roles[_roleId]) && !_donnees.roles.includes(roles[_roleId])) {
                            _donnees.roles.push(roles[_roleId])
                        }
                    })
                }

                switch (_e) {
                    case "principal":
                        _donnees.roles.push('principal')
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "accompaniment":
                        _donnees.roles.push('accompaniment')
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "lyrics":
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "music":
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "split":
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    default:
                }

            })
        })
        this.setState({ donnees: _aD })
    }

    render() {

        if (this.state.ayantsDroit) {

            let _parts = []
            let _data = []

            Object.keys(this.state.donnees).forEach(uuid => {
                let part = this.state.donnees[uuid]

                let _aD = this.state.ayantsDroit[uuid]

                _data.push({ ayantDroit: _aD, nom: part.nom, pourcent: part.sommePct, color: part.color, raison: part.raison })

                let _vote
                if (this.state.monVote) {
                    _vote = this.state.monVote.vote
                } else {
                    _vote = part.vote
                }

                _parts.push(
                    <div key={`part_${uuid}`}>
                        <div className="ui grid">
                            <div className="ui row">
                                <div className="ui two wide column">
                                    <div className="holder-name">
                                        <img className="ui spaced avatar image" src={
                                            (this.state.avatars && this.state.avatars[part.rightHolderId] && this.state.avatars[part.rightHolderId].avatar) ?
                                                this.state.avatars[part.rightHolderId].avatar : avatar_espece} />
                                    </div>
                                </div>
                                <div className="ui ten wide column">
                                    <div className="holder-name">
                                        {part.nom}
                                    </div>
                                    <div className="small-400-color">
                                        {part.roles.map((_e, idx) => {
                                            return ROLES_NAMES[_e] + `${idx === part.roles.length - 1 ? '' : ', '}`
                                        })}
                                    </div>
                                    <div style={{ position: "relative", marginTop: "5px" }}>
                                        {
                                            !this.state.voteTermine &&
                                            this.state.ayantDroit &&
                                            uuid === this.state.ayantDroit.rightHolderId &&
                                            (
                                                <div className="ui five wide column">
                                                    {!this.state.modifierVote && this.boutonRefuser()}
                                                    {!this.state.modifierVote && this.boutonAccepter()}
                                                    {
                                                        this.state.modifierVote &&
                                                        (
                                                            <div>
                                                                <i
                                                                    className="pencil alternate icon big blue"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => { this.changerVote() }}></i>
                                                                {
                                                                    this.state.justifierRefus && (
                                                                        <div>
                                                                            <textarea
                                                                                cols={30}
                                                                                rows={2}
                                                                                placeholder="Pourquoi refuses-tu le split (optionel)"
                                                                                onChange={(e) => {
                                                                                    this.state.parent.refuser(this.state.type, e.target.value)
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
                                        {part.raison ? part.raison : ""}
                                    </div>
                                </div>
                                <div className="ui three wide column">
                                    <p className="big">
                                        {parseFloat(part.sommePct).toFixed(2)} %
                                    </p>
                                    <Translation>
                                        {
                                            t =>
                                                <div>
                                                    {
                                                        uuid !== this.state.ayantDroit.rightHolderId &&
                                                        (
                                                            <div style={{ color: part.vote === 'accept' ? "green" : (part.vote === "reject" ? "red" : "grey") }}>
                                                                <strong>{t(`flot.split.vote.${part.vote}`)}</strong>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        uuid === this.state.ayantDroit.rightHolderId &&
                                                        (
                                                            <div style={{ color: (this.state.monVote && this.state.monVote.vote === 'accept') ? "green" : (this.state.monVote && this.state.monVote.vote === "reject" ? "red" : "grey") }}>
                                                                <strong>{t(`flot.split.vote.${this.state.monVote && this.state.monVote.vote}`)}</strong>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                        }
                                    </Translation>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })

            return (
                <Translation>
                    {
                        t =>
                            <div className="ui segment">
                                <div className="wizard-title">{t(`flot.split.droits.titre.${this.state.titre}`)}</div>
                                <br /><br />
                                <div className="ui grid">
                                    <div className="ui row">
                                        <div className="ui one wide column">
                                        </div>
                                        <div className="ui six wide column">
                                            {_parts}
                                        </div>
                                        <div className="ui six wide column">
                                            {_data.length < 9 && (<Beignet type={this.state.type} uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data} />)}
                                            {_data.length >= 9 && (<Histogramme uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data} />)}
                                        </div>
                                        <div className="ui one wide column">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </Translation>
            )

        } else {
            return (<div></div>)
        }


    }

}

export default class SommairePartage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uuid: props.uuid,
            ayantDroit: props.ayantDroit,
            jetonApi: props.jetonApi,
            proposition: props.proposition,
            mesVotes: {},
            rafraichirAuto: props.rafraichirAuto
        }
        this.calculMesVotes = this.calculMesVotes.bind(this)
        this.envoi = this.envoi.bind(this)
        this.modaleConnexion = this.modaleConnexion.bind(this)
    }

    componentWillMount() {

        // Récupère tous les ayant-droits
        axios.get(`http://api.smartsplit.org:8080/v1/rightholders`)
            .then(res => {
                let _rHs = {}
                res.data.forEach(rh => _rHs[rh.rightHolderId] = rh)
                this.setState({ ayantsDroit: _rHs })
            })

        this.setState({ patience: true }, () => {
            // Récupérer les avatars de tous les ayants-droits de la proposition et stocker les avatars
            axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
                .then(res => {
                    let proposition = res.data.Item
                    // Chercher les avatars
                    let _avatars = {} // Les avatars peuvent être sur plusieurs droits
                    Object.keys(proposition.rightsSplits).forEach(droit => {
                        Object.keys(proposition.rightsSplits[droit]).forEach(type => {
                            proposition.rightsSplits[droit][type].forEach(part => {
                                let _rH = part.rightHolder
                                if (!_avatars[_rH.rightHolderId]) {
                                    _avatars[_rH.rightHolderId] = {}
                                    // Récupération des avatars et intégration dans les éléments correspondants
                                    axios.get(`http://api.smartsplit.org:8080/v1/rightholders/${_rH.rightHolderId}`)
                                        .then(r => {
                                            let avatar = r.data.Item.avatarImage
                                            _avatars[_rH.rightHolderId].avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${avatar}`
                                            this.setState({ avatars: _avatars })
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            _avatars[_rH.rightHolderId].avatar = err.message
                                        })
                                }
                            })
                        })
                    })
                    this.setState({ patience: false })
                })
                .catch(err => {
                    console.log(err)
                })
        })

        this.rafraichirDonnees(() => {
            if ((this.estVoteFinal() && this.estVoteClos()) || this.state.rafraichirAuto) {
                this.setState({ rafraichir: true }, () => {
                    this.rafraichissementAutomatique()
                })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.uuid !== nextProps.uuid && !this.state.proposition) {
            this.setState({ uuid: nextProps.uuid }, () => {
                this.rafraichirDonnees()
            })
        }
    }

    rafraichissementAutomatique() {
        setTimeout(() => {
            this.rafraichirDonnees(() => {
                if ((!this.estVoteFinal() && this.estVoteClos()) || this.state.rafraichir) {
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

    refuser(type, raison) {
        let _mesVotes = this.state.mesVotes
        if (!_mesVotes[type]) {
            _mesVotes[type] = {}
        }
        _mesVotes[type].raison = raison
    }

    estVoteFinal() {
        // Détecte si le vote est terminé pour tous
        let termine = false
        let proposition = this.state.proposition

        if (proposition) {
            termine = true
            Object.keys(proposition.rightsSplits).forEach(famille => {
                Object.keys(proposition.rightsSplits[famille]).forEach(type => {
                    proposition.rightsSplits[famille][type].forEach(partage => {
                        if (partage.voteStatus === 'active') {
                            termine = false
                        }
                    })
                })
            })
        }

        return termine
    }

    vote(choix, type) {
        let _mesVotes = this.state.mesVotes
        if (!_mesVotes[type]) {
            _mesVotes[type] = {}
        }
        _mesVotes[type].vote = choix

        if (choix === 'accept') {
            // Enlève la raison de refus si acceptation
            delete _mesVotes[type].raison
        }

        this.setState({ mesVotes: _mesVotes },
            () => {
                // Vérifie si tous les votes sont saisis
                let _tousSaisis = true
                Object.keys(this.state.mesVotes).forEach(elem => {
                    if (this.state.mesVotes[elem].vote === 'active') {
                        _tousSaisis = false
                    }
                })
                if (_tousSaisis) {
                    this.activerBoutonVote()
                }
            }
        )
    }

    estVoteClos() {
        // Détecte si le vote est clos pour cet utilisateur (s'il a déjà voté il ne peut plus voter)
        let termine = false
        let proposition = this.state.proposition
        if (proposition) {
            termine = true
            Object.keys(proposition.rightsSplits).forEach(famille => {
                Object.keys(proposition.rightsSplits[famille]).forEach(type => {
                    proposition.rightsSplits[famille][type].forEach(partage => {
                        if (partage.rightHolder.rightHolderId === this.state.ayantDroit.rightHolderId && partage.voteStatus === 'active') {
                            termine = false
                        }
                    })
                })
            })
        }

        return termine
    }

    calculMesVotes(proposition, fn) {
        this.setState({ proposition: proposition })
        // Calcul des votes
        let _mesVotes = {}
        Object.keys(proposition.rightsSplits).forEach(_droit => {
            let _droits = proposition.rightsSplits[_droit]
            Object.keys(_droits).forEach(_type => {
                let _parts = _droits[_type]
                _parts.forEach(_part => {
                    if (_part.rightHolder) {
                        if (_part.rightHolder.rightHolderId === this.state.ayantDroit.rightHolderId) {
                            if (!_mesVotes[_droit]) {
                                _mesVotes[_droit] = {}
                            }
                            _mesVotes[_droit].vote = _part.voteStatus
                            if (_part.comment) {
                                _mesVotes[_droit].raison = _part.comment
                            }
                        }
                    }
                })
            })
        })
        this.setState({ mesVotes: _mesVotes }, () => { if (fn) fn() })
    }

    activerBoutonVote() {
        this.setState({
            transmission: true
        })
    }

    rafraichirDonnees(fn) {
        if (!this.state.proposition || this.state.rafraichir) {
            axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
                .then(res => {
                    let proposition = res.data.Item
                    this.calculMesVotes(proposition, fn)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.calculMesVotes(this.state.proposition, fn)
        }
    }

    modaleDeclaration(ouvert = true) {
        this.setState({ modaleDeclaration: ouvert })
    }

    envoi() {

        // Ouvrir Modale déclaration et c'est dans celle-ci
        // que l'envoi est réellement fait.
        this.modaleDeclaration()
    }

    transmettre(t) {

        Auth.currentAuthenticatedUser()
            .then(res => {
                if (res.username === this.state.ayantDroit.rightHolderId) {
                    this.envoi()
                } else {
                    toast.error(t('flot.split.erreur.volIdentite'))
                }
            })
            .catch(err => {
                this.modaleConnexion()
            })

    }

    modaleConnexion(ouvert = true) {
        this.setState({ modaleConnexion: ouvert })
    }

    render() {

        let droits = []

        if (this.state.proposition && this.state.ayantsDroit) {
            TYPE_SPLIT.forEach(type => {

                let _aDonnees = false

                Object.keys(this.state.proposition.rightsSplits[type]).forEach(_cle => {
                    if (this.state.proposition.rightsSplits[type][_cle].length > 0) {
                        _aDonnees = true
                    }
                })

                if (_aDonnees) {
                    droits.push(<SommaireDroit
                        ayantsDroit={this.state.ayantsDroit}
                        avatars={this.state.avatars}
                        type={type}
                        key={`sommaire_${this.state.uuid}_${type}`}
                        parts={this.state.proposition.rightsSplits[type]}
                        titre={type}
                        ayantDroit={this.state.ayantDroit}
                        monVote={this.state.mesVotes[type]}
                        voteTermine={
                            this.estVoteFinal() ||
                            this.estVoteClos() ||
                            this.state.proposition.etat !== "VOTATION" ||
                            (this.state.proposition.etat === "VOTATION" && !this.state.jetonApi)}
                        parent={this}
                        uuid={this.state.proposition.uuid}
                    />)
                }
            })
        }

        let that = this

        return (
            <Translation>
                {
                    t =>
                        <div>
                            {
                                !this.state.patience && (
                                    <div>
                                        {droits}
                                        {
                                            !this.estVoteClos() &&
                                            (this.state.proposition && this.state.proposition.etat === "VOTATION") &&
                                            (
                                                <div className={`ui medium button ${!this.state.transmission ? 'disabled' : ''}`} disabled={!this.state.transmission} onClick={() => {
                                                    this.transmettre(t)
                                                }}>{t('flot.split.documente-ton-oeuvre.bouton.voter')}
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            {
                                this.state.patience && (
                                    <div className="ui active dimmer">
                                        <div className="ui text loader">{t('entete.encours')}</div>
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
                                <LogIn fn={() => {
                                    Auth.currentAuthenticatedUser()
                                        .then(res => {
                                            if (res.username === this.state.ayantDroit.rightHolderId) {
                                                that.setState({ user: res })
                                                that.envoi()
                                                that.modaleConnexion(false)
                                            } else {
                                                toast.error(t('flot.split.erreur.volIdentite'))
                                            }

                                        })
                                        .catch(err => {
                                            toast.error(err.message)
                                        })

                                }} />
                            </Modal>
                            {
                                this.state.ayantDroit &&
                                <Declaration
                                    firstName={this.state.ayantDroit.firstName}
                                    lastName={this.state.ayantDroit.lastName}
                                    artistName={this.state.ayantDroit.artistName}
                                    songTitle={this.props.titre}
                                    open={this.state.modaleDeclaration}
                                    fn={() => {
                                        let body = {
                                            userId: `${this.state.ayantDroit.rightHolderId}`,
                                            droits: this.state.mesVotes,
                                            jeton: this.state.jetonApi
                                        }
                                        axios.post('http://api.smartsplit.org:8080/v1/proposal/voter', body)
                                            .then((res) => {
                                                window.location.href = `/partager/${this.state.proposition.mediaId}`
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }} />
                            }

                        </div>
                }
            </Translation>
        )
    }

}