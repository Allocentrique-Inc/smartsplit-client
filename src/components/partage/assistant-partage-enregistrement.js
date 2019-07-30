import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik"

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"
import BoutonsRadio from "../formulaires/champ-radio"

const MODES = {manuel: "0", egal: "1"}

class PageAssistantPartageEnregistrement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            mode: MODES.egal,
            partsInvariables: []
        }        
        this.changementGradateur = this.changementGradateur.bind(this)
        this.ajouterCollaborateur = this.ajouterCollaborateur.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values.droitEnregistrement !== nextProps.values.droitEnregistrement) {
            this.setState({parts: nextProps.values.droitEnregistrement})
        }
    }

    recalculerPartage() {
        let pourcent = 100.00        
        switch(this.state.mode) {
            case MODES.egal:
                // Calcul le pourcentage égal
                let _vals = this.props.values.droitEnregistrement
                pourcent = (pourcent / (_vals.length)).toFixed(4)
                // Applique le pourcentage aux données existantes
                _vals = _vals.map(elem=>{
                    return {
                        nom: elem.nom,
                        pourcent: ""+pourcent
                    }
                })
                this.props.setFieldValue("droitEnregistrement", _vals)
                break            
            default:
        }
    }

    pourcentRestant() {
        let _pctDelta = 100
        this.props.values.droitEnregistrement.forEach(elem=>{
            _pctDelta = _pctDelta - parseFloat(elem.pourcent)
        })
        return `${_pctDelta < 0 ? 0 : _pctDelta}`
    }

    // Changement d'un gradateur
    changementGradateur(index, delta) {
        
        let invariable = this.state.partsInvariables
        let droits = this.props.values.droitEnregistrement        
        
        let deltaParCollaborateurVariable = 0.0

        let aMisInvariable = false // Identifier si on doit retirer l'index des invariables
        if(!invariable[index])
            aMisInvariable = true

        invariable[index] = true // Le droit sélectionné lors de la transition est considéré invariable
        let nbModifications = droits.length - Object.keys(invariable).length

        deltaParCollaborateurVariable = -(delta / nbModifications) // Calcul de la différence à répartir sur les autres collaborateurs
    
        droits.forEach((elem, idx)=>{
            if(!invariable[idx]) { // Ajustement si l'index est variable
                droits[idx].pourcent = parseFloat(elem.pourcent) + parseFloat(deltaParCollaborateurVariable)
            }
        })
    
        this.props.setFieldValue('droitEnregistrement', droits)
        
        if(aMisInvariable) // Retrait de l'index des invariables
            delete invariable[index]

    }

    basculerVariable(index) {
        let invariables = this.state.partsInvariables
        invariables[index] = !invariables[index]
        this.setState({partsInvariables: invariables})
    }

    ajouterCollaborateur(arrayHelpers) {
        let _coll = this.props.values.collaborateur
                                                            
        _coll.forEach((elem, idx)=>{

            if(this.state.mode === MODES.egal) {
                arrayHelpers.insert(0, {
                    nom: elem, 
                    pourcent: (100 / (this.props.values.droitEnregistrement.length + _coll.length) ).toFixed(4)
                })
            }

            if(this.state.mode === MODES.manuel) {
                arrayHelpers.insert(0, {
                    nom: elem, 
                    pourcent: (
                        this.pourcentRestant() / 
                        (this.props.values.droitEnregistrement.length + _coll.length) )
                        .toFixed(4)
                })
                // création de l'entrée dans le tableau des invariables
                let _inv = this.state.partsInvariables
                _inv.unshift(false)
                this.setState({partsInvariables: _inv})
            }
            
        })                                                            
        this.props.setFieldValue('collaborateur', [])
        this.setState({ping: true}, ()=>{
            this.recalculerPartage()
        })
    }

    render() {

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                            <h1>{t('flot.partage.enregistrement.titre')}</h1>

                            <div className="mode--partage__auteur">
                                <BoutonsRadio 
                                    actif={this.state.mode} // Attribut dynamique
                                    onClick={(e)=>{
                                        this.setState({mode: e.target.value}, ()=>{
                                            this.recalculerPartage()
                                        })                                        
                                    }}
                                    titre="Mode de partage"
                                    choix={[                                    
                                        {
                                            nom: 'Manuel',
                                            valeur: ""+MODES.manuel
                                        },
                                        {
                                            nom: 'Égal',
                                            valeur: ""+MODES.egal
                                        }
                                    ]}
                                />
                            </div>

                            <div className="conteneur--beignet">
                                {Object.keys(this.state.parts).length < 9 && (<Beignet uuid="1" data={this.state.parts}/>)}
                                {Object.keys(this.state.parts).length >= 9 && (<Histogramme uuid="1" data={this.state.parts}/>)}
                            </div>

                            <FieldArray
                                name="droitEnregistrement"                                
                                render={arrayHelpers => (
                                    <div>
                                        {
                                            this.props.values.droitEnregistrement.map((part, index)=>{
                                                return (
                                                    <div key={`part-${index}`}>
                                                        <div className="fields">
                                                            <div className="field">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        arrayHelpers.remove(index)
                                                                        this.setState({ping: true}, ()=>{
                                                                            this.recalculerPartage()
                                                                        })
                                                                    }
                                                                    }>
                                                                    <i className="remove icon crimson"></i>
                                                                </button>
                                                                {
                                                                    this.state.mode == MODES.manuel && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={()=>{
                                                                                this.basculerVariable(index)
                                                                            }}
                                                                        >
                                                                            <i className={`lock ${!this.state.partsInvariables[index] ? 'open' : ''} icon golden`}></i>
                                                                        </button>
                                                                    )
                                                                }                                                              
                                                            </div>                                                            
                                                            {                                                                
                                                                this.state.mode == MODES.manuel && (
                                                                    <div className="twelve wide field">
                                                                        <ChampGradateurAssistant 
                                                                            changement={(id, delta)=>{this.changementGradateur(id, delta)}} 
                                                                            id={`gradateur_${index}`}
                                                                            etiquette={part.nom} 
                                                                            modele={`droitEnregistrement[${index}].pourcent`}
                                                                            disabled={this.state.partsInvariables[index]}
                                                                            />
                                                                        <ChampTexteAssistant 
                                                                            id={`texte_${index}`}
                                                                            changement={(id, valeur)=>{
                                                                                this.changementGradateur(id, valeur)
                                                                            }}
                                                                            modele={`droitEnregistrement[${index}].pourcent`} 
                                                                            disabled={this.state.partsInvariables[index]}
                                                                            valeur={this.props.values.droitEnregistrement[index].pourcent} />
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                this.state.mode == MODES.egal && (
                                                                    <span style={{position: "relative", left: "20px"}}>{part.nom}</span>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div style={{width: "30%", margin: "0 auto", height: "100px"}}>
                                            <div>
                                                <button
                                                    className="btnCollaborateur"
                                                    onClick={
                                                        (e) => {
                                                            e.preventDefault()
                                                            this.ajouterCollaborateur(arrayHelpers)
                                                        }
                                                    }
                                                >
                                                    <i className="plus circle icon big green"></i>                                                    
                                                </button>
                                            </div>                                    
                                            <div>
                                                <ChampListeCollaborateurAssistant
                                                    indication={t('flot.collaborateurs.ajout')}
                                                    modele="collaborateur"
                                                    autoFocus={false}
                                                    requis={false}
                                                    fluid={true}
                                                    multiple={false}
                                                    recherche={true}
                                                    selection={true}
                                                    ajout={false}
                                                    collaborateurs={this.props.values.droitEnregistrement}
                                                />                                               
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </React.Fragment>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageEnregistrement