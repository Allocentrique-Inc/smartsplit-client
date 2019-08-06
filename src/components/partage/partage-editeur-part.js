import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Checkbox } from 'semantic-ui-react'

// Composantes
import Beignet from '../visualisation/partage/beignet'

import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik"

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"
import BoutonsRadio from "../formulaires/champ-radio"

import avatar from '../../assets/images/elliot.jpg'

const MODES = {egal: "0", role: "1", manuel: "2"}

class PageAssistantPartageEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},          // Parts de tous les ayants-droits
            partsLocales: {},   // Parts entre l'éditeur et l'ayant-droit
            song: ""
        }        
        this.changementGradateur = this.changementGradateur.bind(this)
    }

    componentDidMount() {
        this.setState({parts: this.props.values.droitAuteur})
        this.setState({song: this.props.values.song})
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values.droitAuteur !== nextProps.values.droitAuteur) {
            this.setState({parts: nextProps.values.droitAuteur})
        }
    }

    recalculerPartage() {          
        this.setState({ping: true})
    }

    changementGradateur(index, delta) {
        // Changement d'un gradateur
/*
        let invariable
    
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
*/
    }

    render() {
/*
        let visualisation

        if(this.state.parts.length > 0) {            
            // 1 beignet seulement            
            visualisation = (<Beignet uuid="auteur--beignet" data={this.state.parts}/>)            
        }        
        
        let descriptif

        if(this.props.i18n.lng === 'en') {
            descriptif = (<div className="medium-400">
                Split the copyright between the creators, ie the authors of the
                <strong> lyrics</strong>, the composers and arrangers of <strong> music</strong>.
                It is customary to share copyright fairly.
                But you can do otherwise.
            </div>)
        } else {
            descriptif = (<div className="medium-400">
                Sépare ici le droit d’auteur entre les créateurs, c’est à dire les 
                auteurs des <strong>paroles</strong>, les compositeurs et les arrangeurs de la <strong>musique</strong>. 
                Il est d’usage de partager le droit d’auteur équitablement. 
                Mais tu peux faire autrement.                
            </div>)
        }
*/
        return (
            <div></div>
        )

        /*
        return (
            <Translation>
                {
                    (t) =>
                        <div className="ui grid">          
                            <div className="ui row">
                                <div className="ui seven wide column">
                                    <div className="wizard-title">{t('flot.partage.auteur.titre')}</div>
                                    <br/>
                                    <div className="mode--partage__auteur">
                                    <div className="who-invented-title">
                                        { t('partage.auteur.titre', {oeuvre: this.state.song}) }
                                    </div>
                                    <br/>
                                    {descriptif}
                                    <br/>

                                <div className="fields">
                                    <div className="field">
                                        <BoutonsRadio 
                                            name="mode_auteur"
                                            actif={this.state.mode} // Attribut dynamique
                                            onClick={(e)=>{
                                                this.setState({mode: e.target.value}, ()=>{
                                                    this.recalculerPartage()
                                                })                                        
                                            }}
                                            titre=""
                                            choix={[  
                                                {
                                                    nom: 'Partager de façon égale',
                                                    valeur: MODES.egal
                                                },
                                                {
                                                    nom: 'Partager selon les rôles',
                                                    valeur: MODES.role
                                                },                                  
                                                {
                                                    nom: 'Gérer manuellement',
                                                    valeur:MODES.manuel
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
                                                                    <div className="gray-fields">
                                                                        <div className="twelve wide field">
                                                                            <div className="holder-name">
                                                                                <img className="ui spaced avatar image" src={avatar}/>
                                                                                {part.nom}
                                                                                <i class="delete icon" onClick={() => {
                                                                                    arrayHelpers.remove(index)
                                                                                    this.setState({ping: true}, ()=>{
                                                                                        this.recalculerPartage()
                                                                                    })
                                                                                }
                                                                                }></i>
                                                                            </div>
                                                                            <br/>
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
                                                                                    <i className={`lock ${!this.state.partsInvariables[index] ? 'open' : ''} icon golden`}
                                                                                        onClick={()=>{
                                                                                            this.basculerVariable(index)
                                                                                        }}>
                                                                                    </i>
                                                                                )
                                                                        }
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
                                                                    <div>&nbsp;</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div style={{margin: "0 auto", height: "100px"}}>                                    
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
                                                        <button 
                                                            className="ui medium button"
                                                            onClick={(e)=>{
                                                            e.preventDefault()
                                                            this.ajouterEditeur(arrayHelpers)
                                                            }}>Ajouter
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                                
                            </div>
                                </div>
                                <div className="ui seven wide column">
                                    <br/>
                                    <br/>
                                    <br/>
                                    <div className="conteneur-beignet nine wide field">
                                        {visualisation}
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </Translation>    
        )
        */
    }
}

export default PageAssistantPartageEditeur