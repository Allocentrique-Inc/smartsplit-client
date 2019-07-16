import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert'
// CSS
import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from 'axios'
import Login from '../auth/Login'

const DROITS = {
    auteur: 'workCopyrightSplit', 
    interpretaion: 'performanceNeighboringRightSplit', 
    enregistrement: 'masterNeighboringRightSplit'
}

class TableauSommaireSplit extends Component {

    constructor(props){
        super(props)
       
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
        this.genererAffichage = this.genererAffichage.bind(this)
        this.changerVote = this.changerVote.bind(this)
        this.activerBoutonVote = this.activerBoutonVote.bind(this)
        this.preEnvoi = this.preEnvoi.bind(this)
        this.estVoteTermine = this.estVoteTermine.bind(this)
        this.transmettre = this.transmettre.bind(this)

        // Construction de la structure des données de l'assistant
        let rightHolders = {}
        let rights = this.props.droits ? this.props.droits : {}

        // TEMPORAIRE
        // Calcul des droits et ayants-droits
        let split, _s
        let sommaire = {}
        
        if (this.props.jeton) {            
            _s = this.props.jeton.splitId
            
            if(_s === "abababab-dddd-11e8-9c9c-2d42b21b1a3e") {
                split = require("../../assets/tests/1.json")
            } else if (_s === "ababafgdfgfdgsdb-dddd-11e8-9c9c-2d42b21b1a3e") {                                      
                split = require("../../assets/tests/2.json")
            } else if (_s === "abababab-dddd-11e8-9c9c-2d42basdsaoid223e") {
                split = require("../../assets/tests/3.json")
            } else {                
                split = require("../../assets/tests/4.json")                
            }            

            // Extraire les différents ayant-droits et ordonnancement dans un tableau
            Object.keys(DROITS).forEach(type=>{
                if(!rights[DROITS[type]]) {
                    rights[DROITS[type]] = {}
                }
                if(split[DROITS[type]]) {
                    let rightsSplit = split[DROITS[type]].rightsSplit
                    rightsSplit.forEach(droit=>{
                        if(!rightHolders[droit.rightHolder.uuid]) {
                            rightHolders[droit.rightHolder.uuid] = droit.rightHolder
                        }
                        rights[DROITS[type]][droit.rightHolder.uuid] = droit

                        // Ajout dans le sommaire
                        if(!sommaire[droit.rightHolder.uuid]) {
                            sommaire[droit.rightHolder.uuid] = { nom: rightHolders[droit.rightHolder.uuid].name, droits: {} }
                        }
                        if (droit.rightHolder.uuid === split.initiateur.uuid) {
                            sommaire[droit.rightHolder.uuid].droits[DROITS[type]] = "ACCEPTE"
                        } else {
                            sommaire[droit.rightHolder.uuid].droits[DROITS[type]] = "ATTENTE"
                        }
                    })                
                }
            })
        }            

        this.state = {
            droits: rights,
            jeton: props.jeton,
            split: split,
            jetonAPI: props.jetonAPI, // Le jeton encodé
            votes: props.votes,
            sommaire: sommaire,
            transmis: false,
            modifierVote: {
                workCopyrightSplit: false,
                performanceNeighboringRightSplit: false,
                masterNeighboringRightSplit: false
            }
        }
       
        if(this.props.jeton) {
            this.majListeVotes()
        }        

    }

    majListeVotes() {
        // Récupère l'état de la votation courante
        axios.post('http://api.smartsplit.org:8080/v1/proposal/liste-votes', {splitId: this.state.jeton.splitId})
        .then((resp)=>{
            let _v = resp.data
            this.setState({votes: _v})
            let sommaire = this.state.sommaire
            // Ajuste le sommaire avec les votes reçus
            if(_v.parts) {
                Object.keys(_v.parts).forEach(type=>{
                    Object.keys(_v.parts[type]).forEach(id=>{
                        let etat = _v.parts[type][id].etat
                        sommaire[id].droits[type] = etat
                    })
                })
                this.setState(sommaire)
            }            
        })        
    }

    activerBoutonVote() {
        this.setState({
            transmission: true
        })
    }

    componentWillReceiveProps(nextProps) {     
        if(this.state.jeton !== nextProps.jeton) {
            this.setState({jeton: nextProps.jeton})
        }
        if(this.state.jetonAPI !== nextProps.jetonAPI) {
            this.setState({jetonAPI: nextProps.jetonAPI})
        }
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
                        // Justifier le refus
                        let refus = {
                            userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                            jeton: this.state.jetonAPI,
                            raison: document.getElementById('raison').value
                        }                                                                
                
                        axios.post('http://api.smartsplit.org:8080/v1/proposal/justifier-refus', refus)
                        .catch(err=>{console.log(err)})
                        .then(()=>{
                            this.transmettre()                            
                        })

                        }                                
                    }
                    >Refuser ce partage</button>
                </div>
        })        
    }

    droitsPourUtilisateurCourant() {
        let _id = this.state.jeton.rightHolderId
        let _d = this.state.sommaire[_id].droits        
        return {
            workCopyrightSplit: _d.workCopyrightSplit,
            performanceNeighboringRightSplit: _d.performanceNeighboringRightSplit,
            masterNeighboringRightSplit: _d.masterNeighboringRightSplit
        }
    }

    preEnvoi() {
        let _d = this.droitsPourUtilisateurCourant()
        let contientRefus = false
        Object.keys(_d).forEach(d => {
            if(_d[d] && _d[d] !== 'ACCEPTE') {
                contientRefus = true
            }
        })
        if(contientRefus) {
            this.justifierRefus(()=>{this.transmettre()})
        } else {
            this.transmettre()
        }
    }

    transmettre() {

        // Détection de l'identité ...        

        if(!this.props.auth.isAuthenticated()) {
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
                        <Login auth={this.props.auth} fn={()=>{
                            let body = {
                                userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                                droits: this.droitsPourUtilisateurCourant(),
                                jeton: this.state.jetonAPI
                            }
                    
                            axios.post('http://api.smartsplit.org:8080/v1/proposal/voter', body)
                            .then(()=>{
                                this.majListeVotes()
                            })
                            onClose()
                        }} />
                </div>
            })       
        }
        
    }

    voter(droit, choix) {        
        let _etat = choix ? 'ACCEPTE' : 'REFUSE'
        let votes = this.state.votes
        votes.parts[droit][this.state.jeton.rightHolderId].etat = _etat
        this.setState({votes: votes})
        let _m = this.state.modifierVote
        _m[droit] = false
        this.setState({modifierVote: _m})
        let sommaire = this.state.sommaire
        sommaire[this.state.jeton.rightHolderId].droits[droit] = _etat
    }

    boutonAccepter (droit) {
        return this.state.jeton && (
            <i className="thumbs up outline icon huge green" style={{cursor: "pointer"}} onClick={()=>{
                this.voter(droit, true)
                if(this.estVoteTermine()) {
                    this.activerBoutonVote()
                }
            }}></i>
        )
    }

    boutonRefuser (droit) {   
        return this.state.jeton && (
            <i className="thumbs down outline icon big red" style={{cursor: "pointer"}} onClick={()=>{                
                this.voter(droit, false)
                if(this.estVoteTermine()) {
                    this.activerBoutonVote()
                }
            }}></i>
        )
    }

    genererAffichage(_e, droit, voteClos) {
        let voterPour 
        let voterContre
        let etat, estInitiateur = false
        let votes = this.state.votes

        if(_e) {

            // Récupère l'état du vote
            if(votes) {
                etat = votes.parts[droit][_e.rightHolder.uuid].etat
                estInitiateur = (votes.initiateur.uuid === this.state.jeton.rightHolderId)
            }

            // Affichage des boutons de votation
            let aVote = false, // A déjà voté ?            
                peutVoter = true

            if(this.state.jeton 
                && _e.rightHolder.uuid === this.state.jeton.rightHolderId) {  // Est l'utilisateur enregistré
                if ( 
                    etat === 'ATTENTE' // Vote pour la première fois
                    || // ou
                    (this.state.modifierVote && this.state.modifierVote[droit])) { // Modifie son vote
                    voterPour = ( !voteClos && this.boutonAccepter(droit))
                    voterContre = ( !voteClos && this.boutonRefuser(droit))
                }
                aVote = (etat === 'ACCEPTE' || etat === 'REFUSE')
            }

            let controleModification
            if (!voteClos && aVote && !this.state.modifierVote[droit] && !estInitiateur) {
                controleModification = (!this.state.modifierVote[droit] && 
                    (<i className="pencil alternate icon big blue" style={{cursor: "pointer"}} onClick={()=>{this.changerVote(droit)}}></i>))
            }
    
            if(etat === "ACCEPTE") {
                etat = (<span style={{color: "green"}}>ACCEPTÉ</span>)
            } else if(etat === "REFUSE") {
                etat = (<span style={{color: "red"}}>REFUSÉ</span>)
            } else {
                etat = (<span style={{color: "grey"}}>ATTENTE</span>)
            }

            return (
                <td>
                    {_e.rightHolder.name} : {_e.splitPct}% {voterPour} {voterContre} {etat} {peutVoter && controleModification}
                </td>
            )
        } else {
            return (<td></td>)
        }        
    }

    changerVote (droit) {
        let _m = this.state.modifierVote
        _m[droit] = true
        this.setState({modifierVote: _m})        
    }

    afficherSommaire() {
        let _d = Object.keys(this.state.sommaire).map((elem)=>{
            let _r = this.state.sommaire[elem]
            return (
                <tr key={`tab_sommaire--${elem}`}>
                    <td>{_r.nom}</td>
                    <td>{_r.droits[DROITS.auteur]}</td>
                    <td>{_r.droits[DROITS.interpretaion]}</td>
                    <td>{_r.droits[DROITS.enregistrement]}</td>
                    <td>{this.state.votes['commentaire'] && this.state.votes.commentaire[elem]}</td>
                </tr>
            )
        })

        return (
            <div>                    
                <h3>Sommaire des résultats</h3>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>Collaborateurs</th>
                            <th><i className="copyright outline icon"></i></th>
                            <th><i className="star outline icon"></i></th>
                            <th><i className="product hunt icon"></i></th>
                            <th>Commentaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_d}
                    </tbody>
                </table>
            </div>
        )
    }

    rafraichir () {
        if(!this.state.rafraichissement) {
            this.setState({rafraichissement: true},
                ()=>{
                    setInterval(()=>{                
                        this.majListeVotes()
                    }, 5000)
                }
            )
        }        
    }

    estVoteTermine() {
            
        // Détecte si le vote est terminé pour l'usager en cours
        let termine = true

        if (this.state.votes.transmis[this.state.jeton.rightHolderId]) {
            return termine
        }            

        if(this.state.sommaire && this.state.jeton) {
            let sommaire = this.state.sommaire[this.state.jeton.rightHolderId]
            Object.keys(sommaire.droits).forEach((_s)=>{
                if(
                    sommaire.droits[_s] !== 'ACCEPTE' &&
                    sommaire.droits[_s] !== 'REFUSE'
                ) {
                    termine = false
                }
            })
        } 

        return termine
    }

    estVoteFinal() {
        // Détecte si le vote est terminé pour l'usager en cours
        let termine = true

        if(this.state.votes && this.state.sommaire && this.state.jeton) {
            Object.keys(this.state.sommaire).forEach(id=>{
                if(!this.state.votes.transmis[id]) {
                    termine = false
                }
            })            
        } 

        return termine
    }

    render() {
            
        // Déclaration des structures de tri pour l'affichage

        let titre, voteClos = false
        let droitAuteur, droitInterpretation, droitEnregistrement
        let tableau = []      

        droitAuteur = []
        droitInterpretation = []
        droitEnregistrement = []        

        // Assignation des variables

        let _initiateur
        if(this.state.split) {
            titre = this.state.split.media.title
            _initiateur = this.state.split.initiateur.uuid === this.state.jeton.rightHolderId
        }        

        if(this.state.votes) {
            // Ne peut pas voter si le vote est clos ou si initiateur
            voteClos = this.state.votes.transmis[this.state.jeton.rightHolderId] || _initiateur
        }

        // STRUCTURE DU TABLEAU D'AFFICHAGE
        if(this.state.droits) {
            if(this.state.droits[DROITS.auteur]) {
                Object.keys(this.state.droits[DROITS.auteur]).forEach((elem) => {
                    let _e = this.state.droits[DROITS.auteur][elem]
                    if(_e) {
                        droitAuteur.push(this.genererAffichage(_e, DROITS.auteur, voteClos))                        
                    }
                })
            }            
    
            if(this.state.droits[DROITS.interpretaion]) {
                Object.keys(this.state.droits[DROITS.interpretaion]).forEach((elem) => {
                    let _e = this.state.droits[DROITS.interpretaion][elem]
                    if(_e) {
                        droitInterpretation.push(this.genererAffichage(_e, DROITS.interpretaion, voteClos))
                    }
                })
            }
        
            if(this.state.droits[DROITS.enregistrement]) {
                Object.keys(this.state.droits[DROITS.enregistrement]).forEach((elem) => {
                    let _e = this.state.droits[DROITS.enregistrement][elem]
                    if(_e) {
                        droitEnregistrement.push(this.genererAffichage(_e, DROITS.enregistrement, voteClos))
                    }
                })
            }            
    
            let tailleMax = Math.max(droitAuteur.length, droitInterpretation.length, droitEnregistrement.length)            
                
            for(let i = 0; i < tailleMax; i++) {
                tableau.push(
                    <tr key={`tableau--rang--${i}`}>                        
                        {droitAuteur[i] || <td></td>}
                        {droitInterpretation[i] || <td></td>}
                        {droitEnregistrement[i] || <td></td>}
                    </tr>
                )
            }
        }

        // Si l'utilisateur ne peut pas voter et que le vote n'est pas terminé, rafraichissement de l'écran
        // à chaque 5 secondes        
        if(voteClos && !this.estVoteFinal()) {
            this.rafraichir()
        }

        return (
            <div>
                <h1>{titre}</h1>
                <table width="100%">
                    <thead>
                        <tr>
                            {droitAuteur.length > 0 && (<th><i className="copyright outline icon huge"></i></th>)}
                            {droitInterpretation.length > 0 && (<th><i className="star outline icon huge"></i></th>)}
                            {droitEnregistrement.length > 0 && (<th><i className="product hunt icon huge"></i></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {tableau}
                    </tbody>
                </table>
                {(!voteClos && !_initiateur && !this.props.init) && (
                    <div>                    
                        <button disabled={!this.state.transmission} onClick={()=>{
                            this.preEnvoi()
                        }}> Voter
                        </button>
                    </div>
                )}                
                {(this.estVoteFinal() && !this.props.init) && (
                    <div>
                        <h1>Le vote est terminé !</h1>
                        {this.state.votes && this.afficherSommaire()}
                    </div>
                )}
            </div>            
        )
    }
}

export default TableauSommaireSplit