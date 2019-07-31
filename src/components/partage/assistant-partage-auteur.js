import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Checkbox } from 'semantic-ui-react'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik"

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"
import BoutonsRadio from "../formulaires/champ-radio"

const MODES = {manuel: "0", egal: "1", role: "2"}

class PageAssistantPartageAuteur extends Component {

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

    componentDidMount() {
        this.setState({parts: this.props.values.droitAuteur})
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values.droitAuteur !== nextProps.values.droitAuteur) {
            this.setState({parts: nextProps.values.droitAuteur})
        }
    }

    recalculerPartage() {
        let pourcent = 100.00        
        switch(this.state.mode) {
            case MODES.egal:
                // Calcul le pourcentage égal
                let _parts = this.props.values.droitAuteur
                pourcent = (pourcent / (_parts.length)).toFixed(4)
                // Applique le pourcentage aux données existantes
                _parts.forEach((elem, idx)=>{
                    _parts[idx].nom = elem.nom
                    _parts[idx].pourcent = pourcent
                })
                this.props.setFieldValue("droitAuteur", _parts)
                break
            case MODES.role:
                if(this.state.parts.length > 0) {                    
                    let auteurs = [], compositeurs = [], arrangeurs = []
                    let partsMusique = [], partsParoles = []
                    this.state.parts.forEach(elem=>{
                        if(elem.auteur) {
                            auteurs.push(elem.nom)
                        }
                        if(elem.compositeur) {
                            compositeurs.push(elem.nom)
                        }
                        if(elem.arrangeur) {
                            arrangeurs.push(elem.nom)
                        }
                    })

                    // Calcul des parts musique et paroles
                    let pctMusique = 50, pctParoles = 50                    
                    let pctMusiqueParCollaborateur = (compositeurs.length + arrangeurs.length) > 0 ? (pctMusique / (arrangeurs.length + compositeurs.length)): 0
                    let pctParolesParCollaborateur = auteurs.length > 0 ? (pctParoles / auteurs.length) : 0
                    
                    let _pM = 0, _pP = 0
                    let _parts = this.state.parts
                    this.state.parts.forEach((elem, idx)=>{
                        _pM = (compositeurs.includes(elem.nom) ? pctMusiqueParCollaborateur : 0) + (arrangeurs.includes(elem.nom) ? pctMusiqueParCollaborateur : 0 )
                        _pP = (auteurs.includes(elem.nom) ? pctParolesParCollaborateur : 0)
                        partsMusique.push({nom: elem.nom, pourcent: `${_pM}`})
                        partsParoles.push({nom: elem.nom, pourcent: `${_pP}`})
                        _parts[idx].pourcent = _pM + _pP
                    })
                    this.setState({parts: _parts})
                    this.setState({partsMusique: partsMusique})
                    this.setState({partsParoles: partsParoles})
                }                
                break;
            default:
        }
        this.setState({ping: true})
    }

    pourcentRestant() {
        let _pctDelta = 100
        this.props.values.droitAuteur.forEach(elem=>{
            _pctDelta = _pctDelta - parseFloat(elem.pourcent)
        })
        return `${_pctDelta < 0 ? 0 : _pctDelta}`
    }

    changementGradateur(index, delta) {
        // Changement d'un gradateur
        
        let invariable = this.state.partsInvariables
        let droits = this.props.values.droitAuteur        
        
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
    
        this.props.setFieldValue('droitAuteur', droits)
        
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
                    pourcent: (100 / (this.props.values.droitAuteur.length + _coll.length) ).toFixed(4),
                    auteur: true,
                    compositeur: true,
                    arrangeur: false
                })
            }

            if(this.state.mode === MODES.manuel) {
                arrayHelpers.insert(0, {
                    nom: elem, 
                    pourcent: (
                        this.pourcentRestant() / 
                        (this.props.values.droitAuteur.length + _coll.length) )
                        .toFixed(4),
                    auteur: true,
                    compositeur: true,
                    arrangeur: false
                })
                // création de l'entrée dans le tableau des invariables
                let _inv = this.state.partsInvariables
                _inv.unshift(false)
                this.setState({partsInvariables: _inv})
            }

            if(this.state.mode === MODES.role) {          
                arrayHelpers.insert(0, {
                    nom: elem, 
                    pourcent: "100",
                    auteur: true,
                    compositeur: true,
                    arrangeur: false
                })
            }
            
        })                                                            
        this.props.setFieldValue('collaborateur', [])

        this.setState({ping: true}, ()=>{
            this.recalculerPartage()
        })
    }

    render() {

        let visualisation

        if(this.state.parts.length > 0) {
            switch(this.state.mode) {
                case MODES.egal:
                    // 1 beignet ou histogramme dépendant du nombre de collaborateurs
                    if(Object.keys(this.state.parts).length < 9) {
                        visualisation = (<Beignet uuid="auteur--beignet" data={this.state.parts}/>)
                    } else {
                        visualisation = (<Histogramme uuid="auteur--histogramme" data={this.state.parts}/>)
                    }
                    break;
                case MODES.manuel:
                    // 1 beignet ou histogramme dépendant du nombre de collaborateurs
                    if(Object.keys(this.state.parts).length < 9) {
                        visualisation = (<Beignet uuid="auteur--beignet" data={this.state.parts}/>)
                    } else {
                        visualisation = (<Histogramme uuid="auteur--histogramme" data={this.state.parts}/>)
                    }
                    break;
                case MODES.role:    
                    // 2 beignets, 1 pour les droits Musique, l'autre pour les droits Paroles   
                    visualisation = (
                        <div>                            
                            {this.state.parts && (<Beignet className="twelve wide field" titre="Total" uuid="auteur--beignet--1" data={this.state.parts} />)}
                            {this.state.partsMusique && (<Beignet className="six wide field" titre="Musique" uuid="auteur--beignet--2" data={this.state.partsMusique}/>)}                            
                            {this.state.partsParoles && (<Beignet className="six wide field" titre="Paroles" uuid="auteur--beignet--3" data={this.state.partsParoles}/>)}
                        </div>                        
                    )
                    break;
                default:
            }
        }        
        
        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                            <h1>{t('flot.partage.auteur.titre')}</h1>

                            <div className="mode--partage__auteur">

                                <div className="fields">
                                    <div className="nine wide field">
                                        <BoutonsRadio 
                                            name="mode_auteur"
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
                                                    valeur:MODES.manuel
                                                },
                                                {
                                                    nom: 'Égal',
                                                    valeur: MODES.egal
                                                },
                                                {
                                                    nom: 'Rôle',
                                                    valeur: MODES.role
                                                }
                                            ]}
                                        />
                                        <p style={{height: "30px"}} />
                                        <FieldArray
                                            name="droitAuteur"                                
                                            render={arrayHelpers => (
                                                <div>
                                                    {
                                                        this.props.values.droitAuteur.map((part, index)=>{
                                                            let roles = [
                                                                {id: "auteur", nom: t('flot.partage.auteur.role.auteur')}, 
                                                                {id: "compositeur", nom: t('flot.partage.auteur.role.compositeur')}, 
                                                                {id: "arrangeur", nom: t('flot.partage.auteur.role.arrangeur')}
                                                            ]
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
                                                                            this.state.mode === MODES.manuel && (
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
                                                                        <div className="twelve wide field">
                                                                            <h4>{part.nom}</h4>
                                                                            <div className="coches--role__droit">
                                                                            {
                                                                                roles.map((elem, idx)=>{
                                                                                    return (
                                                                                        <Checkbox
                                                                                            key={`coche_role_droit_auteur_${index}_${idx}`}
                                                                                            label={elem.nom}
                                                                                            checked={this.props.values.droitAuteur[index][elem.id]}
                                                                                            onClick={(e)=>{ 
                                                                                                if(e.currentTarget.className.includes("checked")) {
                                                                                                    this.props.setFieldValue(`droitAuteur[${index}][${elem.id}]`, false)                                                                                
                                                                                                } else {
                                                                                                    this.props.setFieldValue(`droitAuteur[${index}][${elem.id}]`, true)
                                                                                                }
                                                                                                setTimeout(()=>{
                                                                                                    this.recalculerPartage()                                                                                
                                                                                                }, 0)
                                                                                            }}
                                                                                        />
                                                                                    )
                                                                                })
                                                                            }
                                                                            </div>                                                                        
                                                                            <ChampGradateurAssistant 
                                                                                    changement={(id, delta)=>{this.changementGradateur(id, delta)}} 
                                                                                    id={`gradateur_${index}`}                                                                                 
                                                                                    modele={`droitAuteur[${index}].pourcent`}
                                                                                    disabled={this.state.partsInvariables[index] || this.state.mode !== MODES.manuel}
                                                                            />
                                                                        {
                                                                            this.state.mode === MODES.manuel && (                                                                        
                                                                                <ChampTexteAssistant 
                                                                                    id={`texte_${index}`}
                                                                                    changement={(id, valeur)=>{
                                                                                        this.changementGradateur(id, valeur)
                                                                                    }}
                                                                                    modele={`droitAuteur[${index}].pourcent`} 
                                                                                    disabled={this.state.partsInvariables[index]}
                                                                                    valeur={this.props.values.droitAuteur[index].pourcent} />
                                                                            )
                                                                        }
                                                                        </div>                                                           
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div style={{margin: "0 auto", height: "100px"}}>
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
                                                                collaborateurs={this.props.values.droitAuteur}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="conteneur--beignet nine wide field">
                                        {visualisation}
                                    </div>
                                </div>
                                
                            </div>
                                                    
                        </React.Fragment>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageAuteur