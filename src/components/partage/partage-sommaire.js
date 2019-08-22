import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Beignet from '../visualisation/partage/beignet'
import { Translation } from 'react-i18next';

import avatar from '../../assets/images/elliot.jpg'

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
            monVote: props.monVote
        }
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
        this.changerVote = this.changerVote.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.parts !== nextProps.parts) {
            this.setState({parts: nextProps.parts})
        }
        if(this.props.monVote !== nextProps.monVote) {
            this.setState({monVote: nextProps.monVote}, ()=>{
                this.setState({modifierVote: true}, ()=>{
                    console.log('monVote', this.state)
                })
            })
        }
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
                            this.voter(false)                            
                        }}>{t('vote.refuser')}</div>
                }
            </Translation>            
        )
    }

    changerVote () {        
        this.setState({modifierVote: false})
    }

    voter(choix) {
        let _monChoix = choix ? 'accept' : 'reject'
        this.state.parent.vote(_monChoix, this.state.type)
        
        /*
        let droits = this.state.droits
        let partages = droits[droit]
        Object.keys(partages).forEach(type=>{
            partages[type].forEach((elem, idx)=>{
                if(elem.rightHolder.rightHolderId === this.state.ayantDroit.rightHolderId) {
                    elem.voteStatus = choix ? 'accept': 'reject'
                    partages[type][idx] = elem
                }
            })
        })        
        droits[droit] = partages
        this.setState({droits: droits})
        this.setState({modifierVote: false})
        let sommaire = this.state.sommaire
        sommaire[this.state.ayantDroit.rightHolderId].droits[droit] = _monChoix
        console.log(`${this.state.ayantDroit.rightHolderId} a voté ${choix} sur pour ${droit}`)
        */
    }

    organiserDonnees() {
        let _p = this.state.parts
        let _aD = {} // Structure résumé de l'ayant-droit
        Object.keys(_p).forEach(_e=>{
            _p[_e].forEach(__e=>{
                
                // Ajoute une structure d'ayant-droit si non existante
                if(!_aD[__e.rightHolder.rightHolderId]) {
                    _aD[__e.rightHolder.rightHolderId] = { roles: [], sommePct: 0.0000 }
                }
                
                let _donnees = _aD[__e.rightHolder.rightHolderId]
                _donnees.nom = __e.rightHolder.name
                _donnees.vote = __e.voteStatus                
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
            _data.push({nom: part.nom, pourcent: part.sommePct})        
            
            let _vote
            if(this.state.monVote) {
                _vote = this.state.monVote
            } else {
                _vote = part.vote
            }

            _parts.push(
                <div key={`part_${uuid}`}>
                    <div className="ui grid">
                        <div className="ui row">
                            <div className="ui two wide column">
                                <div className="holder-name">
                                    <img className="ui spaced avatar image" src={avatar}/>
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
                                                        <div style={{color: this.state.monVote === 'accept' ? "green" : (this.state.monVote === "reject" ? "red" : "grey")}}>
                                                            <strong>{t(`vote.${this.state.monVote}`)}</strong>
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
                        <div className="ui seven wide column">
                            {_parts}
                        </div>
                        <div className="ui five wide column">
                            <Beignet uuid={`beignt_${this.state.uuid}_${this.state.titre}`} data={_data} />
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
            uuid: props.proposition.uuid,
            ayantDroit: props.ayantDroit,
            jetonApi: props.jetonApi,
            proposition: props.proposition,
            mesVotes: {}
        }
        this.calculMesVotes = this.calculMesVotes.bind(this)
    }

    componentWillMount() {
        console.log('will mount', this.state)        
        this.rafraichirDonnees()
    }

    componentWillReceiveProps(nextProps) {
        console.log('will receive props', nextProps)
        if(this.props.uuid !== nextProps.uuid && !this.state.proposition) {
            this.setState({uuid: nextProps.uuid}, ()=>{
                this.rafraichirDonnees()
            })
        }        
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
        _mesVotes[type] = choix
        this.setState({mesVotes: _mesVotes}, console.log('vote', this.state.mesVotes))
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

    calculMesVotes(proposition) {
        console.log('Dans calculMesVotes')
        this.setState({proposition: proposition})
        // Calcul des votes
        let _mesVotes = {}
        Object.keys(proposition.rightsSplits).forEach(_droit=>{
            let _droits = proposition.rightsSplits[_droit]
            Object.keys(_droits).forEach(_type=>{
                console.log(_droits, _droit, _type)
                let _parts = _droits[_type]
                _parts.forEach(_part=>{
                    if(_part.rightHolder) {                        
                        if(_part.rightHolder.rightHolderId === this.state.ayantDroit.rightHolderId) {
                            console.log(` monVote[${_droit}] trouvé pour part`, _part, _part.rightHolder.rightHolderId, this.state.ayantDroit.rightHolderId)
                            _mesVotes[_droit] = _part.voteStatus
                        }                
                    }
                })                
            })                        
        })
        this.setState({mesVotes: _mesVotes},()=>{ console.log('mesVotes', this.state.mesVotes)})
    }

    activerBoutonVote() {
        this.setState({
            transmission: true
        })
    }

    rafraichirDonnees() {
        console.log('rafraichir données', this.state)
        if (!this.state.proposition){
            axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
            .then(res=>{
                let proposition = res.data.Item
                this.calculMesVotes(proposition)            
            })
            .catch(err=>{
                toast.error(err)
            })
        } else {
            this.calculMesVotes(this.state.proposition)
        }
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
                        type={type}
                        key={`sommaire_${this.state.uuid}_${type}`}
                        parts={this.state.proposition.rightsSplits[type]}
                        titre={type}
                        ayantDroit={this.state.ayantDroit}
                        jetonApi={this.state.jetonApi}
                        monVote={this.state.mesVotes[type]}
                        voteTermine={this.estVoteFinal() || this.estVoteClos()}
                        parent={this}
                        /> )
                }                
            })
        }        

        return (
            <div>
                {droits}
            </div>            
        )
    }
}