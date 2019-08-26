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
import { AbstractIdentifyPredictionsProvider } from '@aws-amplify/predictions/lib/types/Providers';

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
        "principal":"Principal",
        "accompaniment":"Accompaniment",
        "producer":"Producer",
        "director":"Director",
        "studio":"Studio",
        "graphist":"Graphist",
        "remixer":"Arranger",
        "songwriter":"Songwriter",
        "composer":"Composer",
        "singer":"Singer",
        "musician":"Musician"
    }

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

const TITRES = {
    workCopyrightSplit: "Droits d'auteur", 
    performanceNeighboringRightSplit: "Interprétation", 
    masterNeighboringRightSplit: "Enregistrement sonore"
}

class SommaireDroit extends Component {

    constructor(props){
        super(props)    
        this.state = {
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
        if(this.props.parts !== nextProps.parts) {
            this.setState({parts: nextProps.parts})
            this.organiserDonnees()
        } 
        if(this.props.avatars !== nextProps.avatars) {
            this.setState({avatars: nextProps.avatars})
        }        
        this.setState({monVote: nextProps.monVote}, ()=>{
            if(this.state.monVote && this.state.monVote.vote !== 'active') {
                this.setState({modifierVote: true})
            }            
        })    
    }

    componentWillMount() {
        this.organiserDonnees()
    }  
    
    boutonAccepter () {
        return (
            <Translation>
                {
                    t=>
                        <div className="ui button medium" style={{cursor: "pointer", display: "inline-block"}} onClick={()=>{
                            this.voter(true)                        
                        }}>{t('vote.accepter')}</div>
                }
            </Translation>
        )
    }

    boutonRefuser () {   
        return (
            <Translation>
                {
                    t=>
                        <div className="ui button medium red" style={{cursor: "pointer", display: "inline-block"}} onClick={()=>{
                            this.justifierRefus(()=>{this.voter(false)})
                        }}>{t('vote.refuser')}</div>
                }
            </Translation>            
        )
    }

    justifierRefus(fn) {
        confirmAlert({
            title: `Tu refuses la proposition !`,
            message: `Es-tu certain ?`,
            closeOnClickOutside: false,
            style: {
                    position: "relative",
                    width: "640px",
                    height: "660px",
                    margin: "0 auto",
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    boxSizing: "border-box",
                    boxShadow: "inset 0px -1px 0px #DCDFE1"
                },
            customUI: ({ onClose }) => 
                <div>         
                    <h3>Indiques à tes collaborateurs pourquoi tu n'es pas à l'aise avec ce split.</h3>               
                    <textarea 
                        cols={40} 
                        rows={5} 
                        id="raison"
                        placeholder="Pourquoi refuses-tu le split (optionel)" 
                        style={{
                        width: "546px",
                        height: "253px",
                        left: "436px",
                        top: "429px",                              
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    }}></textarea><p/>
                    <button style={{
                        background: "rgb(45, 168, 79)",
                        borderRadius: "2px",
                        width: "100%",                                
                        fontWeight: "bold",
                        fontSize: "1.2rem"
                    }}
                    onClick={()=>{
                        this.state.parent.refuser(this.state.type, document.getElementById('raison').value)
                        onClose()
                        fn()
                    }}
                    >Refuser ce partage</button>
                </div>
        })        
    }

    changerVote () {        
        this.setState({modifierVote: false})
    }

    voter(choix) {
        let _monChoix = choix ? 'accept' : 'reject'
        this.state.parent.vote(_monChoix, this.state.type)        
    }

    organiserDonnees() {
        let _p = this.state.parts
        let _aD = {} // Structure résumé des ayants-droit
        Object.keys(_p).forEach(_e=>{
            _p[_e].forEach(__e=>{
                
                // Ajoute une structure d'ayant-droit si non existante
                if(!_aD[__e.rightHolder.rightHolderId]) {
                    _aD[__e.rightHolder.rightHolderId] = { roles: [], sommePct: 0.0000 }
                }
                
                let _donnees = _aD[__e.rightHolder.rightHolderId]
                _donnees.nom = __e.rightHolder.name
                _donnees.vote = __e.voteStatus     
                _donnees.color = __e.rightHolder.color
                _donnees.rightHolderId = __e.rightHolder.rightHolderId
                _donnees.sommePct = (parseFloat(_donnees.sommePct) + parseFloat(__e.splitPct)).toFixed(4)
                
                // Les rôles dépendent du type de droit

                function ajouterRolesReconnus (roles) {
                    Object.keys(roles).forEach(_roleId=>{
                        if(ROLES.includes(roles[_roleId]) && !_donnees.roles.includes(roles[_roleId])) {
                            _donnees.roles.push(roles[_roleId])
                        }
                    })
                }

                switch(_e) {
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
        this.setState({donnees: _aD})
    }

    render() {

        let _parts = []
        let _data = []
        let titre = TITRES[this.state.titre]       

        Object.keys(this.state.donnees).forEach(uuid=>{
            let part = this.state.donnees[uuid]
            _data.push({nom: part.nom, pourcent: part.sommePct, color: part.color})  
            
            let _vote
            if(this.state.monVote) {
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
                                    { part.roles.map((_e, idx)=>{
                                        return ROLES_NAMES[_e]+`${idx === part.roles.length - 1 ? '' : ', '}`
                                    })}
                                </div>
                                <div style={{position: "relative", marginTop: "5px"}}>
                                    {
                                        !this.state.voteTermine &&                                        
                                        this.state.ayantDroit && 
                                        uuid === this.state.ayantDroit.rightHolderId && 
                                        (
                                        <div className="ui five wide column">                                            
                                            {   !this.state.modifierVote && this.boutonRefuser()}
                                            {   !this.state.modifierVote && this.boutonAccepter()}
                                            {
                                                this.state.modifierVote &&
                                                (
                                                    <i 
                                                        className="pencil alternate icon big blue" 
                                                        style={{cursor: "pointer"}} 
                                                        onClick={()=>{this.changerVote()}}></i>
                                                )
                                            }                                            
                                        </div>
                                    )}
                                    {
                                        this.state.monVote && 
                                        uuid === this.state.ayantDroit.rightHolderId && this.state.monVote.raison
                                    }
                                </div>
                            </div>
                            <div className="ui three wide column">
                                <p className="big">
                                    {parseFloat(part.sommePct).toFixed(2)} %
                                </p>
                                <Translation>
                                    {
                                        t=>
                                            <div>
                                                {
                                                    uuid !== this.state.ayantDroit.rightHolderId && 
                                                    (
                                                        <div style={{color: part.vote === 'accept' ? "green" : (part.vote === "reject" ? "red" : "grey")}}>
                                                            <strong>{t(`vote.${part.vote}`)}</strong>
                                                        </div>
                                                    ) 
                                                }
                                                {
                                                    uuid === this.state.ayantDroit.rightHolderId && 
                                                    (
                                                        <div style={{color: (this.state.monVote && this.state.monVote.vote === 'accept') ? "green" : (this.state.monVote && this.state.monVote.vote === "reject" ? "red" : "grey")}}>
                                                            <strong>{t(`vote.${this.state.monVote && this.state.monVote.vote}`)}</strong>
                                                        </div>
                                                    ) 
                                                }
                                            </div>
                                    }
                                </Translation>
                            </div>
                        </div>                        
                    </div>                    
                    <hr/>
                </div>
            )
        })                    
        
        return (
            <div className="ui segment">
                <div className="wizard-title">{titre}</div>
                <br/><br/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="ui one wide column">
                        </div>
                        <div className="ui six wide column">
                            {_parts}
                        </div>
                        <div className="ui six wide column">
                            {_data.length < 9 && (<Beignet uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data}/>)}
                            {_data.length >= 9 && (<Histogramme uuid={`beignet_${this.state.uuid}_${this.state.titre}`} data={_data}/>)}
                        </div>
                        <div className="ui one wide column">
                        </div>
                    </div>
                </div>                
            </div>
        )
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
    }

    componentWillMount() {

        // Récupérer les avatars de tous les ayants-droits de la proposition et stocker les avatars
        axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
        .then(res=>{
            let proposition = res.data.Item
            // Chercher les avatars
            let _avatars = {} // Les avatars peuvent être sur plusieurs droits
            Object.keys(proposition.rightsSplits).forEach(droit=> {
                Object.keys(proposition.rightsSplits[droit]).forEach(type=>{
                    proposition.rightsSplits[droit][type].forEach(part=>{
                        let _rH = part.rightHolder
                        if(!_avatars[_rH.rightHolderId]) {
                            _avatars[_rH.rightHolderId] = { }
                            // Récupération des avatars et intégration dans les éléments correspondants
                            axios.get(`http://api.smartsplit.org:8080/v1/rightholders/${_rH.rightHolderId}`)
                            .then(r=>{
                                let avatar = r.data.Item.avatarImage
                                _avatars[_rH.rightHolderId].avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${avatar}`
                                this.setState({avatars: _avatars})
                            })
                            .catch(err=>{
                                toast.error(err.message)
                                _avatars[_rH.rightHolderId].avatar = err.message
                            })
                        }
                    })                    
                })
            })            
        })
        .catch(err=>{
            toast.error(err.message)
        })

        this.rafraichirDonnees(()=>{
            if(!this.estVoteFinal() && this.estVoteClos() || this.state.rafraichirAuto) {
                this.setState({rafraichir: true}, ()=>{
                    this.rafraichissementAutomatique()                
                })
            }
        })        
    }   

    componentWillReceiveProps(nextProps) {
        if(this.props.uuid !== nextProps.uuid && !this.state.proposition) {
            this.setState({uuid: nextProps.uuid}, ()=>{
                this.rafraichirDonnees()                
            })
        }
    }

    rafraichissementAutomatique() {
        setTimeout(()=>{
            this.rafraichirDonnees(()=>{                
                if((!this.estVoteFinal() && this.estVoteClos()) || this.state.rafraichir){
                    this.rafraichissementAutomatique()
                    if(this.estVoteFinal()){
                        // C'était le dernier rafraichissement (p.ex. cas où le dernier vote entre)                        
                        this.setState({rafraichir: false})
                    }
                }
            })            
        }, 3000)
    }

    refuser(type, raison) {
        let _mesVotes = this.state.mesVotes
        if(!_mesVotes[type]) {
            _mesVotes[type] = {}
        }
        _mesVotes[type].raison = raison
    }

    estVoteFinal() {
        // Détecte si le vote est terminé pour tous
        let termine = false
        let proposition = this.state.proposition

        if(proposition) {
            termine = true
            Object.keys(proposition.rightsSplits).forEach(famille=>{
                Object.keys(proposition.rightsSplits[famille]).forEach(type=>{
                    proposition.rightsSplits[famille][type].forEach(partage=>{
                        if(partage.voteStatus === 'active') {
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
        if(!_mesVotes[type]) {
            _mesVotes[type] = {}
        }
        _mesVotes[type].vote = choix
        
        if(choix === 'accept') {
            // Enlève la raison de refus si acceptation
            delete _mesVotes[type].raison
        }

        this.setState({mesVotes: _mesVotes}, 
            ()=>{
                // Vérifie si tous les votes sont saisis
                let _tousSaisis = true
                Object.keys(this.state.mesVotes).forEach(elem=>{                    
                    if(this.state.mesVotes[elem].vote === 'active') {
                        _tousSaisis = false
                    }                    
                })
                if(_tousSaisis){
                    this.activerBoutonVote()
                }
            }
        )
    }    

    estVoteClos() {
        // Détecte si le vote est clos pour cet utilisateur (s'il a déjà voté il ne peut plus voter)
        let termine = false
        let proposition = this.state.proposition
        if(proposition) {
            termine = true
            Object.keys(proposition.rightsSplits).forEach(famille=>{
                Object.keys(proposition.rightsSplits[famille]).forEach(type=>{
                    proposition.rightsSplits[famille][type].forEach(partage=>{
                        if(partage.rightHolder.rightHolderId === this.state.ayantDroit.rightHolderId && partage.voteStatus === 'active') {
                            termine = false
                        }
                    })                                        
                })                
            })            
        } 

        return termine
    }

    calculMesVotes(proposition, fn) {
        this.setState({proposition: proposition})
        // Calcul des votes
        let _mesVotes = {}
        Object.keys(proposition.rightsSplits).forEach(_droit=>{
            let _droits = proposition.rightsSplits[_droit]
            Object.keys(_droits).forEach(_type=>{
                let _parts = _droits[_type]
                _parts.forEach(_part=>{
                    if(_part.rightHolder) {                        
                        if(_part.rightHolder.rightHolderId === this.state.ayantDroit.rightHolderId) {
                            if(!_mesVotes[_droit]) {
                                _mesVotes[_droit] = {}
                            }
                            _mesVotes[_droit].vote = _part.voteStatus
                            if(_part.comment) {
                                _mesVotes[_droit].raison = _part.comment
                            }
                        }                
                    }
                })                
            })                        
        })
        this.setState({mesVotes: _mesVotes}, ()=>{if(fn) fn() })
    }

    activerBoutonVote() {
        this.setState({
            transmission: true
        })
    }

    rafraichirDonnees(fn) {
        if (!this.state.proposition || this.state.rafraichir){
            axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
            .then(res=>{
                let proposition = res.data.Item
                this.calculMesVotes(proposition, fn)
            })
            .catch(err=>{
                toast.error(err.message)
            })
        } else {
            this.calculMesVotes(this.state.proposition, fn)
        }
    }

    envoi() {
        let body = {
            userId: `${this.state.ayantDroit.rightHolderId}`,
            droits: this.state.mesVotes,
            jeton: this.state.jetonApi
        }
        axios.post('http://api.smartsplit.org:8080/v1/proposal/voter', body)
        .then((res)=>{
            window.location.reload()
        })
        .catch((err) => {
            toast.error(err.message)                                
        })
    }

    transmettre() {        

        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.envoi()
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: `Connexion obligatoire`,
                message: `Tu dois être connecté pour accéder`,
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <div>
                        <LogIn message="Connecte-toi pour voter" fn={()=>{
                            this.envoi()
                            onClose()
                        }} />
                </div>
            })
        })
        
    }

    render() {

        let droits = []

        if(this.state.proposition) {
            TYPE_SPLIT.forEach(type=>{

                let _aDonnees = false

                Object.keys(this.state.proposition.rightsSplits[type]).forEach(_cle=>{
                    if(this.state.proposition.rightsSplits[type][_cle].length > 0) {
                        _aDonnees = true
                    }
                })

                if(_aDonnees) {
                    droits.push( <SommaireDroit 
                        avatars={this.state.avatars}
                        type={type}
                        key={`sommaire_${this.state.uuid}_${type}`}
                        parts={this.state.proposition.rightsSplits[type]}
                        titre={type}
                        ayantDroit={this.state.ayantDroit}
                        monVote={this.state.mesVotes[type]}
                        voteTermine={this.estVoteFinal() || this.estVoteClos() || this.state.proposition.etat !== "VOTATION"}
                        parent={this}
                        uuid={this.state.proposition.uuid}
                        /> )
                }                
            })
        }

        return (
            <div>
                {droits}
                {
                    !this.estVoteClos() && 
                    (this.state.proposition && this.state.proposition.etat === "VOTATION") &&
                    (
                        <button disabled={!this.state.transmission} onClick={()=>{
                            this.transmettre()
                        }}> Voter
                        </button>
                    )
                }
            </div>
        )
    }
}