import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { withTranslation } from 'react-i18next'
import 'react-confirm-alert/src/react-confirm-alert.css'
import LogIn from '../auth/Login'
import { Modal } from 'semantic-ui-react'
import Declaration from '../auth/Declaration'
import {Droits, Identite, AyantsDroit, config, journal, utils} from '../../utils/application'
import SommaireDroit from './sommaire-droit'

import "../../assets/scss/tableaudebord/tableaudebord.scss";

class SommairePartage extends Component {

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

        this.setState({ ayantsDroit: AyantsDroit.ayantsDroit })
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
            axios.get(`${config.API_URL}proposal/${this.state.uuid}`)
                .then(res => {
                    let proposition = res.data.Item
                    this.calculMesVotes(proposition, fn)
                })
                .catch(err => {
                    journal.error(err)
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

    //Identité ayant-droit. L'utilisateur connecté en cours
    transmettre() {
        const t = this.props.t
        if(Identite.usager) {
            if (Identite.usager.username === this.state.ayantDroit.rightHolderId) {
                this.envoi()
            } else {
                toast.error(t('flot.split.erreur.volIdentite'))
            }
        } else {
            this.modaleConnexion()
        }        
    }

    modaleConnexion(ouvert = true) {
        this.setState({ modaleConnexion: ouvert })
    }

    render() {

        let droits = []
        let TYPE_SPLIT = Droits.listeDroits()

        if (this.state.proposition && this.state.ayantsDroit) {
            TYPE_SPLIT.forEach(type => {
                let _aDonnees = false
                Object.keys(this.state.proposition.rightsSplits[type]).forEach(_cle => {
                    if (this.state.proposition.rightsSplits[type][_cle].length > 0) { _aDonnees = true }
                })

                if (_aDonnees) {
                    droits.push(<SommaireDroit
                        ayantsDroit={this.state.ayantsDroit}
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
                        t={this.props.t}
                    />)
                }
            })
        }

        let t = this.props.t

        return (          
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
                                        this.transmettre()
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
                    <LogIn
                        vote={true}
                        fn={() => {
                            if(Identite.usager) {
                                if (Identite.usager.username === this.state.ayantDroit.rightHolderId) {
                                    this.setState({ user: Identite.usager }, ()=>{
                                        this.envoi()
                                        this.modaleConnexion(false)
                                    })                                    
                                } else {
                                    toast.error(t('flot.split.erreur.volIdentite'))
                                }
                            }
                        }} />
                </Modal>
                {
                    this.state.ayantDroit &&
                    <Declaration
                        votes={this.state.mesVotes}
                        firstName={this.state.ayantDroit.firstName}
                        lastName={this.state.ayantDroit.lastName}
                        artistName={this.state.ayantDroit.artistName}
                        songTitle={this.props.titre}
                        open={this.state.modaleDeclaration}
                        onClose={() => { this.setState({ modaleDeclaration: false }) }}
                        fn={() => {
                            let body = {
                                userId: `${this.state.ayantDroit.rightHolderId}`,
                                droits: this.state.mesVotes,
                                jeton: this.state.jetonApi
                            }
                            axios.post(`${config.API_URL}proposal/voter`, body)
                            .then((res) => {
                                utils.naviguerVersSommairePartage(this.state.proposition.mediaId)
                            })
                            .catch((err) => {
                                journal.error(err)
                            })
                        }} />
                }
            </div>
        )
    }
}

export default withTranslation()(SommairePartage)