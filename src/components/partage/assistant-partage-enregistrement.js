import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik";

import axios from 'axios'
import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste";
import BoutonsRadio from "../formulaires/champ-radio"

const MODES = {manuel: 0, egal: 1}

class PageAssistantPartageEnregistrement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            invariables: {},
            mode: MODES.egal
        }
        this.calculParts = this.calculParts.bind(this)
        this.changementGradateur = this.changementGradateur.bind(this)
    }

    componentWillMount() {
        // Récupérer la liste des ayant-droits
        axios.get(`http://api.smartsplit.org:8080/v1/rightHolders`)
        .then(res=>{            
            let _options = res.data.map(elem=>{
                return {key: `${elem.rightHolderId}`,text: `${elem.firstName} '${elem.artistName}' ${elem.lastName}`, value: `${elem.firstName} '${elem.artistName}' ${elem.lastName}`}
            })
            this.setState({options: _options})
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values.droitEnregistrement !== nextProps.values.droitEnregistrement) {
            this.setState({parts: nextProps.values.droitEnregistrement})
        }
    }

    recalculParts() {
        return this.calculParts(this.props.values.droitEnregistrement.length)        
    }

    calculParts(taille) {
        let pourcent = 100.00
        switch(parseInt(this.state.mode)) {
            case MODES.egal:
                // Ajuster tous les collaborateurs au même pourcentage
                let _vals = this.props.values.droitEnregistrement                
                pourcent = (pourcent / (taille)).toFixed(4)
                // Applique le pourcentage aux données existantes
                _vals = _vals.map(elem=>{
                    return {
                        nom: elem.nom,
                        pourcent: ""+pourcent
                    }
                })
                this.props.setFieldValue("droitEnregistrement", _vals)

                break;
            case MODES.manuel:
                pourcent = this.pourcentRestant()
                break;
            default:
        }
        return pourcent
    }

    pourcentRestant() {
        let _pctDelta = 100
        this.props.values.droitEnregistrement.forEach(elem=>{
            _pctDelta = _pctDelta - parseFloat(elem.pourcent)
        })
        return `${_pctDelta < 0 ? 0 : _pctDelta}`
    }

    // Changement d'un gradateur
    changementGradateur(index, valeurInitiale, valeurActuelle) {
        
        let invariable = {}
        let droits = this.props.values.droitEnregistrement        
//        let valeurActuelle = droits[index].pourcent
        
        let delta = valeurInitiale - valeurActuelle
        let deltaParCollaborateurVariable = 0.0

        invariable[index] = droits[index].pourcent
        let nbModifications = droits.length - Object.keys(invariable).length

        console.log('valeurInitiale, valeurActuelle', valeurInitiale, valeurActuelle)

        if(delta < 0) {
            deltaParCollaborateurVariable = -1 / nbModifications
        } else if (delta > 0) {
            deltaParCollaborateurVariable = 1 / nbModifications
        } else {
            deltaParCollaborateurVariable = 0
        }              

        console.log("nbCollaborateursAModifier, deltaParColaborateur", nbModifications, deltaParCollaborateurVariable)

        //console.log('delta, nbmodification', delta, nbModifications, delta/nbModifications)

        //console.log('invariables', invariable)

        droits.forEach((elem, idx)=>{
            //console.log(elem, idx)
            if(!invariable[idx]) {
                // Ajustement
                droits[idx].pourcent = parseFloat(elem.pourcent) + parseFloat(deltaParCollaborateurVariable)
            }
        })
    
        //console.log('changementGradateur',deltaParCollaborateurVariable, valeurInitiale, valeurActuelle, delta, droits)
        this.props.setFieldValue('droitEnregistrement', droits)

    }

    render() {

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                            <h1>Partage du droit d'enregistrement</h1>

                            <div className="mode--partage__auteur">
                                <BoutonsRadio 
                                    actif={this.state.mode} // Attribut dynamique
                                    onClick={(e)=>{
                                        this.setState({mode: e.target.value})
                                    }}
                                    titre="Mode de partage"
                                    choix={[                                    
                                        {
                                            nom: 'Manuel',
                                            valeur: MODES.manuel
                                        },
                                        {
                                            nom: 'Égal',
                                            valeur: MODES.egal
                                        }
                                    ]}
                                />
                            </div>

                            <div className="conteneur--beignet">
                                <Beignet key="1" data={this.state.parts}/>
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
                                                                        setTimeout(()=>{
                                                                            this.recalculParts()
                                                                        }, 0)
                                                                    }
                                                                    }>
                                                                    <i className="remove icon"></i>                                                                    
                                                                </button>
                                                                <span style={{position: "relative", left: "20px"}}>{part.nom}</span>
                                                            </div>                                                            
                                                            {                                                                
                                                                this.state.mode == MODES.manuel && (
                                                                    <div className="twelve wide field">
                                                                        <ChampGradateurAssistant changement={(id, valInitiale, valActuelle)=>{this.changementGradateur(id, valInitiale, valActuelle)}} id={index} etiquette={part.nom} modele={`droitEnregistrement[${index}].pourcent`} />
                                                                        <ChampTexteAssistant modele={`droitEnregistrement[${index}].pourcent`} />
                                                                    </div>
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

                                                            let part = this.calculParts(this.props.values.droitEnregistrement.length + 1)

                                                            e.preventDefault()
                                                            arrayHelpers.insert()                                                            
                                                            this.props.setFieldValue(`droitEnregistrement[0]`, {nom: this.props.values.collaborateur, pourcent: part})
                                                            this.props.setFieldValue('collaborateur', "")
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