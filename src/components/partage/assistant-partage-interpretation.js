import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Checkbox } from 'semantic-ui-react'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'

import { FieldArray } from "formik";

import BoutonsRadio from "../formulaires/champ-radio"
import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"

const MODES = {egal: "0", role: "1"}
const TYPE = {principal: "0", accompagnement: "1"}

class PageAssistantPartageInterpretation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            mode: MODES.egal,
            principaux: [],
            accompagnement: []
        }
        this.ajouterCollaborateur = this.ajouterCollaborateur.bind(this)
    }

    componentDidMount() {
        this.setState({parts: this.props.values.droitInterpretation})
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values.droitInterpretation !== nextProps.values.droitInterpretation) {
            this.setState({parts: nextProps.values.droitInterpretation})
        }
    }    

    recalculerPartage() {
        let pourcent = 100.00        
        switch(this.state.mode) {
            case MODES.egal:
                // Calcul le pourcentage égal
                let _parts = this.props.values.droitInterpretation
                pourcent = (pourcent / (_parts.length)).toFixed(4)
                // Applique le pourcentage aux données existantes
                _parts.forEach((elem, idx)=>{
                    _parts[idx].nom = elem.nom
                    _parts[idx].pourcent = pourcent
                })
                this.props.setFieldValue("droitInterpretation", _parts)
                break
            case MODES.role:                
                if(this.state.parts.length > 0) {                    
                    let principaux = [], accompagnement = []                    
                    this.state.parts.forEach(elem=>{
                        if(elem.principal) {
                            principaux.push(elem.nom)
                        } else {
                            accompagnement.push(elem.nom)
                        }                        
                    })
                    // Calcul des parts principales et d'accompagnement.
                    // Applique la règle du 80% / 20%
                    let pctPrincipaux = 80, pctAccompagnement = 20                    
                    let pctPrincipalParCollaborateur = principaux.length > 0 ? pctPrincipaux / principaux.length: 0
                    let pctAccompagnementParCollaborateur = accompagnement.length > 0 ? pctAccompagnement / accompagnement.length: 0                    
                    let _pP = 0, _pA = 0
                    let _parts = this.state.parts
                    this.state.parts.forEach((elem, idx)=>{
                        _pP = (principaux.includes(elem.nom) ? pctPrincipalParCollaborateur : 0)
                        _pA = (accompagnement.includes(elem.nom) ? pctAccompagnementParCollaborateur : 0)
                        _parts[idx].pourcent = _pP + _pA
                    })
                    this.setState({parts: _parts})                    
                }                
                break;
            default:
        }
        this.setState({ping: true})
    }

    ajouterCollaborateur(arrayHelpers) {
        let _coll = this.props.values.collaborateur                                                            
        _coll.forEach((elem, idx)=>{
            if(this.state.mode === MODES.egal) {
                arrayHelpers.insert(0, {
                    nom: elem, 
                    pourcent: (100 / (this.props.values.droitInterpretation.length + _coll.length) ).toFixed(4),
                    principal: true,
                    chanteur: false,
                    musicien: false
                })
            }
            if(this.state.mode === MODES.role) {          
                arrayHelpers.insert(0, {
                    nom: elem, 
                    pourcent: "100",
                    principal: true,
                    chanteur: false,
                    musicien: false
                })
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
                            <h1>{t('flot.partage.interprete.titre')}</h1>
                            <div className="mode--partage__auteur">
                                <div className="fields">
                                    <div className="nine wide field">
                                        <BoutonsRadio 
                                            name="mode_interpretation"
                                            actif={this.state.mode} // Attribut dynamique
                                            onClick={(e)=>{
                                                this.setState({mode: e.target.value}, ()=>{
                                                    this.recalculerPartage()
                                                })                                        
                                            }}
                                            titre="Mode de partage"
                                            choix={[
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
                                            name="droitInterpretation"
                                            render={arrayHelpers => (
                                                <div>
                                                    {
                                                        this.props.values.droitInterpretation.map((part, index)=>{                                                
                                                            let roles = [
                                                                {id: "chanteur", nom: t('flot.partage.interprete.role.chanteur')}, 
                                                                {id: "musicien", nom: t('flot.partage.interprete.role.musicien')}
                                                            ]
                                                            return (
                                                                <div key={`part-${index}`}>                                                                    
                                                                    <div className="fields">
                                                                        <div className="field">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => arrayHelpers.remove(index)}>
                                                                                <i className="remove icon"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div className="twelve wide field">
                                                                            <h4>{part.nom}</h4>
                                                                            <BoutonsRadio                                                                             
                                                                                name={`type_interpretation_${index}`}
                                                                                actif={part.principal ? TYPE.principal : TYPE.accompagnement} // Attribut dynamique
                                                                                onClick={(e)=>{
                                                                                    this.props.setFieldValue(`droitInterpretation[${index}].principal`, e.target.value === TYPE.principal)
                                                                                    this.setState({ping: true}, ()=>{
                                                                                        this.recalculerPartage()
                                                                                    })
                                                                                }}
                                                                                disabled={this.state.mode !== MODES.role}
                                                                                titre="Type d'interprétation"
                                                                                choix={[
                                                                                    {
                                                                                        nom: 'Principal',
                                                                                        valeur: TYPE.principal
                                                                                    },
                                                                                    {
                                                                                        nom: 'Accompagnement',
                                                                                        valeur: TYPE.accompagnement
                                                                                    }
                                                                                ]}
                                                                            />
                                                                            <div className="coches--role__droit">
                                                                            {
                                                                                roles.map((elem, idx)=>{
                                                                                    return (
                                                                                        <Checkbox
                                                                                            key={`coche_role_droit_interpretation_${index}_${idx}`}
                                                                                            label={elem.nom}
                                                                                            disabled={!this.props.values.droitInterpretation[index].principal}
                                                                                            checked={this.props.values.droitInterpretation[index][elem.id]}
                                                                                            onClick={(e)=>{ 
                                                                                                if(this.props.values.droitInterpretation[index].principal) {
                                                                                                    if(e.currentTarget.className.includes("checked")) {
                                                                                                        this.props.setFieldValue(`droitInterpretation[${index}][${elem.id}]`, false)
                                                                                                    } else {
                                                                                                        this.props.setFieldValue(`droitInterpretation[${index}][${elem.id}]`, true)
                                                                                                    }
                                                                                                    setTimeout(()=>{
                                                                                                        this.recalculerPartage()
                                                                                                    }, 0)
                                                                                                }                                                                                                
                                                                                            }}
                                                                                        />
                                                                                    )
                                                                                })
                                                                            }
                                                                            </div>
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
                                                                collaborateurs={this.props.values.droitInterpretation}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="nine wide field">
                                        {Object.keys(this.state.parts).length < 9 && (<Beignet uuid="interpretation--beignet" data={this.state.parts}/>)}
                                        {Object.keys(this.state.parts).length >= 9 && (<Histogramme uuid="interpretation--histogramme" data={this.state.parts}/>)}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageInterpretation