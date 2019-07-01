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
            votes: props.votes
        }
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
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
    }

    boutonAccepter (droit) {
        return this.state.jeton && (
            <i className="thumbs up outline icon huge green" style={{cursor: "pointer"}} onClick={()=>{
                let body = {
                    userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                    droit: droit,
                    jeton: this.state.jetonAPI
                }
                confirmAlert({
                    title: `Tu acceptes la proposition !`,
                    message: `Es-tu certain ?`,
                    buttons: [
                      {
                        label: 'Oui, mets-en !!',
                        onClick: () => {
                            axios.post('http://api.smartsplit.org:8080/v1/splits/accepter', body)                            
                            .catch(err=>{console.log(err)})                          
                        }
                      },
                      {
                        label: 'Non, je ne suis pas certain.',
                        onClick: () => {                            
                        }
                      }
                    ]
                })                
            }}></i>
        )
    }

    boutonRefuser (droit) {            
        return this.state.jeton && (
            <i className="thumbs down outline icon big red" style={{cursor: "pointer"}} onClick={()=>{
                let body = {
                    userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                    droit: droit,
                    jeton: this.state.jetonAPI
                }
                axios.post('http://api.smartsplit.org:8080/v1/splits/refuser', body)
                .then(()=>{
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
                                <textarea cols={40} rows={5} id="raison" placeholder="Pourquoi refuses-tu le split (optionel)" style={{
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

    render() {

        let droitAuteur, droitInterpretation, droitEnregistrement
        let tableau = []

        droitAuteur = []
        droitInterpretation = []
        droitEnregistrement = []        

        let that = this

        function genererAffichage(_e, droit) {
            let voterPour 
            let voterContre
            let etat, raison
            let votes = that.state.votes
            
            if(votes) {
                etat = votes.parts[droit][_e.rightHolder.uuid].etat
                raison = votes.parts[droit][_e.rightHolder.uuid].raison
            }

            if(that.state.jeton && _e.rightHolder.uuid === that.state.jeton.rightHolderId && etat === 'ATTENTE') {
                voterPour = (_e.rightHolder.uuid === that.state.jeton.rightHolderId && that.boutonAccepter(droit))
                voterContre = (_e.rightHolder.uuid === that.state.jeton.rightHolderId && that.boutonRefuser(droit))
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
                    {_e.rightHolder.name} : {_e.splitPct}% {voterPour} {voterContre} {etat} {raison && (votes.parts[droit][_e.rightHolder.uuid].raison)}
                </td>
            )
        }

        if(this.state.droits) {
            Object.keys(this.state.droits[DROITS.auteur]).forEach((elem) => {
                let _e = this.state.droits[DROITS.auteur][elem]  
                droitAuteur.push(genererAffichage(_e, DROITS.auteur))
            })
    
            Object.keys(this.state.droits[DROITS.interpretaion]).forEach((elem) => {
                let _e = this.state.droits[DROITS.interpretaion][elem]                               
                droitInterpretation.push(genererAffichage(_e, DROITS.interpretaion))
            })
    
            Object.keys(this.state.droits[DROITS.enregistrement]).forEach((elem) => {
                let _e = this.state.droits[DROITS.enregistrement][elem]
                droitEnregistrement.push(genererAffichage(_e, DROITS.enregistrement))
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
        )
    }
}

export default TableauSommaireSplit