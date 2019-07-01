
import React, {Component} from 'react'

// Traduction
import { Translation } from 'react-i18next'

// HTTP
import axios from 'axios'

// Composantes
import TableauSommaireSplit from './tableau-sommaire'

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

class VotationSplit extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            split: null,
            jetonAPI: props.jeton
        }

        // Décoder le jeton
        let body = {jeton: this.props.jeton}
        axios.post('http://api.smartsplit.org:8080/v1/splits/decode', body)
        .then((resp)=>{
            let _s = resp.data
            
            // TEMPORAIRE
            // Calcul des droits et ayants-droits
            let split
            if(_s.splitId === "abababab-dddd-11e8-9c9c-2d42b21b1a3e") {
                split = require("../../assets/tests/1.json")
            } else if (_s.splitId === "ababafgdfgfdgsdb-dddd-11e8-9c9c-2d42b21b1a3e") {
                split = require("../../assets/tests/2.json")
            } else if (_s.splitId === "abababab-dddd-11e8-9c9c-2d42basdsaoid223e") {
                split = require("../../assets/tests/3.json")
            } else {
                split = require("../../assets/tests/4.json")
            }

            // Construction de la structure des données de l'assistant
            let rightHolders = {}
            let rights = {}

            // Extraire les différents ayant-droits et ordonnancement dans un tableau
            TYPE_SPLIT.forEach(type=>{
                if(!rights[type]) {
                    rights[type] = {}
                }
                if(split[type]) {
                    let rightsSplit = split[type].rightsSplit
                    rightsSplit.forEach(droit=>{
                        if(!rightHolders[droit.rightHolder.uuid]) {
                            // Ajout du titulaire dans la table des ayant droits
                            rightHolders[droit.rightHolder.uuid] = droit.rightHolder
                        }
                        // Ajout du droit à l'ayant droit
                        rights[type][droit.rightHolder.uuid] = droit
                    })                
                }
            })

            this.setState({                
                droits: rights
            }, ()=>{
                this.setState({jeton: _s},()=>{
                    this.setState({split: split})
                })
            })

            this.majListeVotes(_s.splitId)            

        })

    }

    majListeVotes(splitId) {
        // Récupère l'état de la votation courante
        axios.post('http://api.smartsplit.org:8080/v1/splits/liste-votes', {splitId: splitId})
        .then((resp)=>{
            this.setState({votes: resp.data})
        })
        setInterval(()=>{            
            axios.post('http://api.smartsplit.org:8080/v1/splits/liste-votes', {splitId: splitId})
            .then((resp)=>{
                this.setState({votes: resp.data})
            })
        }, 2311)
    }

    render() {

        let titre, peutVoter = false

        if(this.state.split) {
            titre = this.state.split.media.title
        }
        if(this.state.votes) {
            peutVoter = !this.state.votes.estClos
        }

        return (            
            <Translation>
                {
                    (t, i18n)=>
                        <div>
                            <h1>Salut, voici la page de votation pour les contributeurs dans l'oeuvre : </h1>
                            <h2>{titre}</h2>
                            {this.state.droits && (<TableauSommaireSplit peutVoter={peutVoter} votes={this.state.votes} droits={this.state.droits} jeton={this.state.jeton} jetonAPI={this.state.jetonAPI}/>)}
                        </div>
                }
            </Translation>                                
        )
    }
}

export default VotationSplit