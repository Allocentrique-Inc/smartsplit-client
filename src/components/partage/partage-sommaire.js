import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Beignet from '../visualisation/partage/beignet'
import Beignet2 from '../visualisation/partage/beignet2'
import Histogramme from '../visualisation/partage/histogramme'
import { withTranslation } from 'react-i18next'

import { Auth } from 'aws-amplify'

import 'react-confirm-alert/src/react-confirm-alert.css'

import avatar_espece from '../../assets/images/elliot.jpg'
import LogIn from '../auth/Login'

import { Modal } from 'semantic-ui-react'
import Declaration from '../auth/Declaration'
import Utilitaires from '../../utils/utilitaires'

import AideDroits from '../../utils/droits'
import {CopyrightSVG, StarSVG, RecordSVG } from '../svg/SVG.js'

import "../../assets/scss/tableaudebord/tableaudebord.scss";

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
            t: props.t
        }
        this.utils = new Utilitaires(1) // Contexte WEB
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
            let donnees = AideDroits.donneesVisualisationParType(this.state.parts, this.state.type, this.state.ayantsDroit)
            let donneesParoles = donnees[AideDroits.nomSousTypeParoles()]
            let donneesMusique = donnees[AideDroits.nomSousTypeMusique()]
            let donneesCompletes = AideDroits.donneesVisualisation(this.state.parts)

            this.setState({ donnees: donneesCompletes })
            this.setState({ donneesMusique })
            this.setState({ donneesParoles })
        } else {
            let donnees = AideDroits.donneesVisualisation(this.state.parts)
            this.setState({ donnees })
        }        
    }

    render() {

        let t = this.state.t

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
                                            <img alt="" className="ui spaced avatar image" src={
                                                (this.state.avatars && this.state.avatars[part.rightHolderId] && this.state.avatars[part.rightHolderId].avatar) ?
                                                    this.state.avatars[part.rightHolderId].avatar : avatar_espece} />
                                            {part.nom}
                                             {/* this.state.monVote = avant le vote, part.vote = après le vote. Référence aux bonnes données */}
                                            <div className="vote">
                                                {parseFloat(part.sommePct).toFixed(2) + "%"}
                                                <div style={{ color: (part.vote === 'accept') ? "#2da84f" : (part.vote === "reject" ? "#ac1616" : "grey") }}>
                                                    <strong>{t(`flot.split.vote.${part.vote}`)}</strong>    

                                                    <div className="ui eight wide column">
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
                                        </div>
                                        </div>
                                        <hr className="division"/>
                            </div>         
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

        // Récupère tous les ayant-droits
        axios.get(`http://dev.api.smartsplit.org:8080/v1/rightholders`)
            .then(res => {
                let _rHs = {}
                res.data.forEach(rh => _rHs[rh.rightHolderId] = rh)
                this.setState({ ayantsDroit: _rHs })
            })

        this.setState({ patience: true }, () => {
            // Récupérer les avatars de tous les ayants-droits de la proposition et stocker les avatars
            axios.get(`http://dev.api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
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
                                    axios.get(`http://dev.api.smartsplit.org:8080/v1/rightholders/${_rH.rightHolderId}`)
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
            axios.get(`http://dev.api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
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

    //Identité ayant-droit. L'utilisateur connecté en cours
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
        let TYPE_SPLIT = AideDroits.listeDroits()

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
                    <LogIn
                        vote={true}
                        fn={() => {
                            Auth.currentAuthenticatedUser()
                                .then(res => {
                                    if (res.username === this.state.ayantDroit.rightHolderId) {
                                        this.setState({ user: res })
                                        this.envoi()
                                        this.modaleConnexion(false)
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
                            axios.post('http://dev.api.smartsplit.org:8080/v1/proposal/voter', body)
                                .then((res) => {
                                    window.location.href = `/partager/${this.state.proposition.mediaId}`
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }} />
                }
            </div>
        )
    }
}

export default withTranslation()(SommairePartage)