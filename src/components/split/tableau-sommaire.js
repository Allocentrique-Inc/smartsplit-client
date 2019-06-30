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
            <i className="thumbs up outline icon huge green" onClick={()=>{
                let body = {
                    userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                    droit: droit,
                    jeton: this.state.jetonAPI
                }
                confirmAlert({
                    title: `Tu acceptes la proposition!`,
                    message: `As-tu certain ?`,
                    buttons: [
                      {
                        label: 'Oui, mets-en !!',
                        onClick: () => {
                            axios.post('http://api.smartsplit.org:8080/v1/splits/accepter', body)
                            .then((err, resp)=>{
                                console.log('Acceptation !', body)
                                window.location.reload()
                            })
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
            <i className="thumbs down outline icon big red" onClick={()=>{
                let body = {
                    userId: this.state.jeton.rightHolderId, // Temporaire le temps de connecter le système d'identités
                    droit: droit,
                    jeton: this.state.jetonAPI
                }
                confirmAlert({
                    title: `Tu refuses la proposition!`,
                    message: `As-tu certain ? Tu devras en proposer une nouvelle.`,
                    buttons: [
                      {
                        label: 'Oui, je le veux !!',
                        onClick: () => {
                            axios.post('http://api.smartsplit.org:8080/v1/splits/refuser', body)
                            .then((err, resp)=>{
                                window.location.href="/approuver-split/2"
                            })
                            .catch(err=>{console.log(err)})                          
                        }
                      },
                      {
                        label: 'Non, merci mais ça va être correct.',
                        onClick: () => {                            
                        }
                      }
                    ]
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
            let etat
            let votes = that.state.votes
            
            if(votes) {
                etat = votes.parts[_e.rightHolder.uuid].etat                
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
                    {_e.rightHolder.name} : {_e.splitPct}% {voterPour} {voterContre} {etat}
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
                        {droitAuteur[i]}
                        {droitInterpretation[i]}
                        {droitEnregistrement[i]}
                    </tr>
                )
            }
        }        

        return (
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th><i className="copyright outline icon huge"></i></th>
                        <th><i className="star outline icon huge"></i></th>
                        <th><i className="product hunt icon huge"></i></th>
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