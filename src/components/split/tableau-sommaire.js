import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert'
// CSS
import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from 'axios';

const DROITS = {
    auteur: 'workCopyrightSplit', 
    interpretaion: 'performanceNeighboringRightSplit', 
    enregistrement: 'masterNeighboringRightSplit'
}

class TableauSommaireSplit extends Component {

    constructor(props){
        super(props)
        this.state = {
            droits: props.droits,
            jeton: props.jeton,
            jetonAPI: props.jetonAPI, // Le jeton encodé
            votes: props.votes,
            modifierVote: {
                workCopyrightSplit: false,
                performanceNeighboringRightSplit: false,
                masterNeighboringRightSplit: false
            }
        }
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
        this.genererAffichage = this.genererAffichage.bind(this)
        this.changerVote = this.changerVote.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.droits !== nextProps.droits) {
            this.setState({droits: nextProps.droits})
        }
        if(this.state.jeton !== nextProps.jeton) {
            this.setState({jeton: nextProps.jeton})
        }
        if(this.state.jetonAPI !== nextProps.jetonAPI) {
            this.setState({jetonAPI: nextProps.jetonAPI})
        }
        if(this.state.votes !== nextProps.votes) {
            this.setState({votes: nextProps.votes})
        }
        if(this.state.peutVoter !== nextProps.peutVoter) {
            this.setState({peutVoter: nextProps.peutVoter})
        }
    }

    boutonAccepter (droit) {
        return this.state.jeton && (
            <i className="thumbs up outline icon huge green" style={{cursor: "pointer"}} onClick={()=>{

                let body = {
                    userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                    droit: droit,
                    jeton: this.state.jetonAPI
                }
                
                let _m = this.state.modifierVote
                _m[droit] = false
                this.setState({modifierVote: _m})

                axios.post('http://api.smartsplit.org:8080/v1/splits/accepter', body)                            
                .catch(err=>{console.log(err)})
                                
            }}></i>
        )
    }

    boutonRefuser (droit, raisonPrec) {   
        return this.state.jeton && (
            <i className="thumbs down outline icon big red" style={{cursor: "pointer"}} onClick={()=>{
                let body = {
                    userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                    droit: droit,
                    jeton: this.state.jetonAPI
                }                
                axios.post('http://api.smartsplit.org:8080/v1/splits/refuser', body)
                .then(()=>{
                    let _m = this.state.modifierVote
                    _m[droit] = false
                    this.setState({modifierVote: _m})
                    confirmAlert({
                        title: `Tu refuses la proposition !`,
                        message: `Es-tu certain ?`,
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
                                    defaultValue={raisonPrec}
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

                                    let refus = {
                                        userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                                        jeton: this.state.jetonAPI,
                                        droit: droit,
                                        raison: document.getElementById('raison').value
                                    }                                                                

                                    axios.post('http://api.smartsplit.org:8080/v1/splits/justifier-refus', refus)
                                    .catch(err=>{console.log(err)})
                                
                                    onClose()
                                }                                
                                }
                                >Refuser ce partage</button>
                            </div>
                    })
                })                
            }}></i>
        )
    }

    genererAffichage(_e, droit) {
        let voterPour 
        let voterContre
        let etat, raison, raisonPrec, estInitiateur = false
        let votes = this.state.votes
        
        if(_e) {

            // Récupère l'état du vote
            if(votes) {
                etat = votes.parts[droit][_e.rightHolder.uuid].etat
                raisonPrec = votes.parts[droit][_e.rightHolder.uuid].raison
                estInitiateur = (votes.initiateur.uuid === this.state.jeton.rightHolderId)
            }

            // Affichage des boutons de votation
            let aVote = false // A déjà voté ?
            if(this.state.jeton 
                && _e.rightHolder.uuid === this.state.jeton.rightHolderId) {  // Est l'utilisateur enregistré
                if ( 
                    etat === 'ATTENTE' // Vote pour la première fois
                    || // ou
                    (this.state.modifierVote && this.state.modifierVote[droit])) { // Modifie son vote
                    voterPour = (_e.rightHolder.uuid === this.state.jeton.rightHolderId && this.boutonAccepter(droit))
                    voterContre = (_e.rightHolder.uuid === this.state.jeton.rightHolderId && this.boutonRefuser(droit, raisonPrec))
                }
                aVote = (etat === 'ACCEPTE' || etat === 'REFUSE')
            }            

            let controleModification
            if (aVote && !this.state.modifierVote[droit] && !estInitiateur) {
                controleModification = (!this.state.modifierVote.workCopyrightSplit && 
                    (<i className="pencil alternate icon big blue" style={{cursor: "pointer"}} onClick={()=>{this.changerVote(droit)}}></i>))
            }
    
            if(etat === "ACCEPTE") {
                etat = (<span style={{color: "green"}}>ACCEPTÉ</span>)
            } else if(etat === "REFUSE") {
                etat = (<span style={{color: "red"}}>REFUSÉ</span>)
                raison = votes.parts[droit][_e.rightHolder.uuid].raison
            } else {
                etat = (<span style={{color: "grey"}}>ATTENTE</span>)
            }            

            return (
                <td>
                    {_e.rightHolder.name} : {_e.splitPct}% {this.state.peutVoter && voterPour} {this.state.peutVoter && voterContre} {etat} {raison} {this.state.peutVoter && controleModification}
                </td>
            )
        } else {
            return (<td></td>)
        }        
    }

    changerVote (droit) {

        console.log(`Changer vote pour ${droit} ${DROITS.auteur} `)

        let _m = this.state.modifierVote
        _m[droit] = true
        this.setState({modifierVote: _m})
        
    }

    render() {

        let peutVoter = this.state.peutVoter
        let droitAuteur, droitInterpretation, droitEnregistrement
        let tableau = []

        droitAuteur = []
        droitInterpretation = []
        droitEnregistrement = []

        if(this.state.droits) {
            Object.keys(this.state.droits[DROITS.auteur]).forEach((elem) => {
                let _e = this.state.droits[DROITS.auteur][elem]  
                if(_e)
                    droitAuteur.push(this.genererAffichage(_e, DROITS.auteur, peutVoter))
            })
    
            Object.keys(this.state.droits[DROITS.interpretaion]).forEach((elem) => {
                let _e = this.state.droits[DROITS.interpretaion][elem]
                if(_e)
                    droitInterpretation.push(this.genererAffichage(_e, DROITS.interpretaion, peutVoter))
            })
    
            Object.keys(this.state.droits[DROITS.enregistrement]).forEach((elem) => {
                let _e = this.state.droits[DROITS.enregistrement][elem]
                if(_e)
                    droitEnregistrement.push(this.genererAffichage(_e, DROITS.enregistrement, peutVoter))
            })
    
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

        return (
            <div>
                <table style={{width: "100%"}}>
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
                {!this.state.peutVoter && this.state.votes && (                
                    <div><h1>Le vote est terminé !</h1></div>
                )}
            </div>            
        )
    }
}

export default TableauSommaireSplit