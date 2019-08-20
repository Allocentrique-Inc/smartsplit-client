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
            parts: props.parts,
            titre: props.titre,
            icone: props.icon,
            uuid: props.propositionId,
            proposition: props.proposition,
            donnees: [],
            ayantDroit: props.ayantDroit,
            jetonApi: props.jetonApi,
            transmis: false,
            voteClos: false,
            modifierVote: {
                workCopyrightSplit: {music: false, lyrics: false},
                performanceNeighboringRightSplit: {principal: false, accompaniment: false},
                masterNeighboringRightSplit: {split: false}
            }
        }
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
        this.changerVote = this.changerVote.bind(this)
        this.activerBoutonVote = this.activerBoutonVote.bind(this)
        this.estVoteTermine = this.estVoteTermine.bind(this)
        this.structureVotation = this.structureVotation.bind(this)
    }

    componentWillMount() {
        this.organiserDonnees()
        this.structureVotation()        
    }

    structureVotation() {
        let rightHolders = {}, sommaire = {}
        let rights = this.props.droits ? this.props.droits : {}
        let proposal = this.state.proposition
        this.setState({voteClos: this.estVoteClos()})
            function extraireDroit (famille, type, partages) {
                if(partages) {
                    partages.forEach(part=>{
                        let _r = part.rightHolder
                        if(!rightHolders[_r.rightHolderId]) {
                            rightHolders[_r.rightHolderId] = _r
                        }

                        if(!rights[famille]) {
                            rights[famille] = {}
                        }

                        if (!rights[famille][type]) {
                            rights[famille][type] = []
                        }

                        rights[famille][type].push(part)

                        // Ajout dans le sommaire
                        if(!sommaire[_r.rightHolderId]) {
                            sommaire[_r.rightHolderId] = { nom: rightHolders[_r.rightHolderId].name, droits: {} }
                        }
                        if(!sommaire[_r.rightHolderId].droits[famille]) {
                            sommaire[_r.rightHolderId].droits[famille] = {}
                        }
                        if (_r.uuid === proposal.initiator.id) {
                            sommaire[_r.rightHolderId].droits[famille][type] = "accept"
                        } else {
                            sommaire[_r.rightHolderId].droits[famille][type] = "active"
                        }
                    })
                }                    
            }

            // Extraire les différents ayant-droits et ordonnancement dans un tableau
            Object.keys(TYPE_SPLIT).forEach(type=>{
                if(!rights[TYPE_SPLIT[type]]) {
                    rights[TYPE_SPLIT[type]] = {}
                }                    
                if(proposal.rightsSplits[TYPE_SPLIT[type]]) {
                    let familleDroit = proposal.rightsSplits[TYPE_SPLIT[type]]
                    switch(TYPE_SPLIT[type]) {
                        case TYPE_SPLIT.auteur:
                            // musique
                            extraireDroit(TYPE_SPLIT[type], 'music', familleDroit.music)
                            // paroles
                            extraireDroit(TYPE_SPLIT[type], 'lyrics', familleDroit.lyrics)
                            break;
                        case TYPE_SPLIT.interpretation:
                            // principal
                            extraireDroit(TYPE_SPLIT[type], 'principal', familleDroit.principal)                                
                            // accompagnement
                            extraireDroit(TYPE_SPLIT[type], 'accompaniment', familleDroit.accompaniment)
                            break
                        case TYPE_SPLIT.enregistrement:
                            // split
                            extraireDroit(TYPE_SPLIT[type], 'split', familleDroit.split)
                            break
                        default:
                            // split
                            extraireDroit(TYPE_SPLIT[type], 'split', familleDroit.split)
                            break
                    }                                      
                }
            })

            this.setState({sommaire: sommaire})
            this.setState({droits: rights})
    }

    activerBoutonVote() {
        this.setState({
            transmission: true
        })
    }

    boutonAccepter (droit, type) {
        return (
            <div className="ui button medium" style={{cursor: "pointer", width: "40%", display: "inline-block"}} onClick={()=>{
                /*
                VdeG : À suivre ...
                this.voter(droit, type, true)
                if(this.estVoteTermine()) {
                    this.activerBoutonVote()
                }
                */
            }}>ACCEPTER</div>
        )
    }

    boutonRefuser (droit, type) {   
        return (
            <div className="ui button medium red" style={{cursor: "pointer", width: "40%", display: "inline-block"}} onClick={()=>{
                /*
                VdeG : À suivre ...
                this.voter(droit, type, false)
                if(this.estVoteTermine()) {
                    this.activerBoutonVote()
                }
                */
            }}>REFUSER</div>
        )
    }

    changerVote (droit, sousDroit) {
        let _m = this.state.modifierVote
        _m[droit][sousDroit] = true
        this.setState({modifierVote: _m})        
    }

    estVoteClos() {
        // Détecte si le vote est clos pour cet utilisateur (s'il a déjà voté  il ne peut plus voter)
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

    estVoteTermine() {
            
        // Détecte si le vote est terminé pour l'usager en cours (s'il a donné un choix pour tous les droits)
        let termine = false

        if(this.state.sommaire && this.state.jeton) {
            termine = true
            let sommaire = this.state.sommaire[this.state.jeton.rightHolderId]
            Object.keys(sommaire.droits).forEach((_s)=>{                
                Object.keys(sommaire.droits[_s]).forEach(__s=>{
                    if(
                        sommaire.droits[_s][__s] !== 'accept' &&
                        sommaire.droits[_s][__s] !== 'reject'
                    ) {
                        termine = false
                    }
                })                
            })
        } 
        
        return termine
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

    voter(droit, type, choix) {
        let _etat = choix ? 'accept' : 'reject'
        let droits = this.state.droits
        let partages = droits[droit][type]
        partages.forEach((elem, idx)=>{
            if(elem.rightHolder.rightHolderId === this.state.jeton.rightHolderId) {
                elem.voteStatus = choix ? 'accept': 'reject'
                partages[idx] = elem
            }
        })
        droits[droit][type] = partages
        this.setState({droits: droits})
        let _m = this.state.modifierVote
        _m[droit][type] = false
        this.setState({modifierVote: _m})
        let sommaire = this.state.sommaire
        sommaire[this.state.jeton.rightHolderId].droits[droit][type] = _etat
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
            console.log('Part', part)
            _data.push({nom: part.nom, pourcent: part.sommePct})            
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
                            </div>
                            <div className="ui three wide column">
                                <p className="big">
                                    {parseFloat(part.sommePct).toFixed(2)} %
                                </p>
                                <div>                            
                                    {part.vote}
                                </div>
                            </div>
                        </div>
                        <div className="ui row">
                            <div className="ui two wide column" />                                
                            <div className="ui ten wide column">
                                {this.state.ayantDroit && uuid === this.state.ayantDroit.rightHolderId && (                                    
                                        <div className="ui five wide column">                                            
                                            {this.boutonRefuser()}
                                            {this.boutonAccepter()}
                                        </div>
                                )}
                            </div>
                            <div className="ui three wide column" />                                
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
        console.log(props)
        this.state = {
            uuid: props.proposition.uuid,
            ayantDroit: props.ayantDroit,
            jetonApi: props.jetonApi,
            proposition: props.proposition
        }
    }

    componentWillMount() {
        if(!this.state.proposition) {
            this.rafraichirDonnees()
        }        
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.uuid !== nextProps.uuid && !this.state.proposition) {
            this.setState({uuid: nextProps.uuid}, ()=>{
                this.rafraichirDonnees()
            })
        }
    }

    rafraichirDonnees() {
        axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
        .then(res=>{
            this.setState({proposition: res.data.Item})            
        })
        .catch(err=>{
            toast.error(err)
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
                        key={`sommaire_${this.state.uuid}_${type}`}
                        parts={this.state.proposition.rightsSplits[type]}
                        titre={type}
                        icone={undefined}   
                        propositionId={this.state.uuid}
                        proposition={this.state.proposition}
                        ayantDroit={this.state.ayantDroit}
                        jetonApi={this.state.jetonApi}
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