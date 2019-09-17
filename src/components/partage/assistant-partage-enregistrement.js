import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Checkbox, Progress } from 'semantic-ui-react'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik"

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"
import BoutonsRadio from "../formulaires/champ-radio"

import avatar from "../../assets/images/elliot.jpg"

const MODES = {egal: "0", manuel: "1"}

const COLORS = ["#BCBBF2", "#D9ACF7", "#EBB1DC", "#FFAFA8", "#FCB8C5", "#FAC0AE", "#FFD0A9", "#F8EBA3", "#C6D9AD", "#C6F3B6", "#93E9E4", "#91DDFE", "#A4B7F1"]

class PageAssistantPartageEnregistrement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            mode: MODES.egal,
            partsInvariables: [],
            song: ""
        }        
        this.changementGradateur = this.changementGradateur.bind(this)
        this.ajouterCollaborateur = this.ajouterCollaborateur.bind(this)
    }

    componentDidMount() {
        this.setState({parts: this.props.values.droitEnregistrement})
        this.setState({song: this.props.values.media.title})
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
                let _parts = this.props.values.droitEnregistrement
                pourcent = (pourcent / (_parts.length)).toFixed(4)
                // Applique le pourcentage aux données existantes
                _parts.forEach((elem, idx)=>{
                    _parts[idx].nom = elem.nom
                    _parts[idx].pourcent = pourcent
                })
                this.props.setFieldValue("droitEnregistrement", _parts)
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
        let ayants = {}
        let _coll = this.props.values.collaborateur
        //let _index = arrayHelpers.data.length
        let _index = this.props.values.droitAuteur.length + 
                    this.props.values.droitInterpretation.length +
                    this.props.values.droitEnregistrement.length
        this.props.values.droitAuteur.forEach(droit=>{
            ayants[droit["nom"]] = droit["color"]
        })
        this.props.values.droitInterpretation.forEach(droit=>{
            ayants[droit["nom"]] = droit["color"]
        })
        console.log(ayants)
                                                            
        _coll.forEach((elem, idx)=>{
            if(this.state.mode === MODES.egal) {
                if (elem in ayants) {
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: (100 / (this.props.values.droitEnregistrement.length + _coll.length) ).toFixed(4),
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: ayants[elem]
                    })
                } else {
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: (100 / (this.props.values.droitEnregistrement.length + _coll.length) ).toFixed(4),
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: COLORS[_index+idx]
                    })
                    ayants[elem] = COLORS[_index+idx]
                }
            }
            if(this.state.mode === MODES.manuel) {  
                if (elem in ayants) {     
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: (
                            this.pourcentRestant() / 
                            (this.props.values.droitEnregistrement.length + _coll.length) )
                            .toFixed(4),
                        producteur: false,
                        realisateur: false,
                        graphiste: false,
                        studio: false,
                        color: ayants[elem]
                    })
                } else {
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: (
                            this.pourcentRestant() / 
                            (this.props.values.droitEnregistrement.length + _coll.length) )
                            .toFixed(4),
                        producteur: false,
                        realisateur: false,
                        graphiste: false,
                        studio: false,
                        color: COLORS[_index+idx]
                    })
                    ayants[elem] = COLORS[_index+idx]
                }
            }
            // création de l'entrée dans le tableau des invariables
            let _inv = this.state.partsInvariables
            _inv.unshift(false)
            this.setState({partsInvariables: _inv})
            
        })                                                            
        this.props.setFieldValue('collaborateur', [])
        this.setState({ping: true}, ()=>{
            this.recalculerPartage()
        })
    }

    render() {

        let descriptif
 
        if(this.props.i18n.lng.substring(0,2) === 'en') {
            descriptif = (<div className="medium-400">
                Here we separate the <strong>neighboring right</strong> of <strong>producers</strong>, 
                ie those who have invested their time and / or their money to record and 
                finalize the product in order to be marketed.
                <br/>
                It is customary to share this right equally or pro rata with the investment.
            </div>)
        } else {
            descriptif = (<div className="medium-400">
                On sépare ici le <strong>droit voisin</strong> des <strong>producteurs</strong>, 
                c’est à dire ceux qui ont investi leur temps et/ou leur argent pour enregistrer et 
                finaliser le produit afin d’être commercialisé. <br/>
                Il est d’usage de partager ce droit en parts égales ou au prorata de l’investissement.
            </div>)
        }

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                                                       
                        <div className="ui grid">  
                            <div className="ui row">                                                    
                                <div className="ui thirteen wide column">
                                    <Progress percent="85" size='tiny' indicating/>                                    
                                </div>
                                <div className="ui three wide column">
                                    <div style={{top: "-15px", position: "relative", left: "30px"}} className="ui medium button" onClick={()=>{this.props.enregistrerEtQuitter(this.props.values)}}>
                                        {t('flot.etape.enregistrerEtQuitter')}
                                    </div>
                                </div>
                            </div>       
                            <div className="ui row">
                                <div className="ui seven wide column">
                                    <div className="wizard-title">{t('flot.partage.enregistrement.titre')}</div>
                                    <br/>
                                    <div className="mode--partage__auteur">
                                    <div className="who-invented-title">
                                        {t('partage.enregistrement.titre', {oeuvre: this.state.song})}
                                    </div>
                                    <br/>
                                    {descriptif}
                                    <br/>
                            <div className="fields">
                                <div className="field">
                                    <div className="nine wide field">
                                    <BoutonsRadio 
                                        name="mode_enregistrement"
                                        actif={this.state.mode} // Attribut dynamique
                                        onClick={(e)=>{       
                                            console.log('clic', e.target.value)                                     
                                            this.setState({mode: e.target.value}, ()=>{
                                                this.recalculerPartage()
                                            })                                        
                                        }}
                                        titre=""
                                        choix={[    
                                            {
                                                nom: t('modepartage.egal'),
                                                valeur: ""+MODES.egal
                                            },                                
                                            {
                                                nom: t('modepartage.manual'),
                                                valeur: ""+MODES.manuel
                                            }
                                        ]}
                                    />
                                    </div>
                                    <p style={{height: "30px"}} />
                                    <FieldArray
                                        name="droitEnregistrement"                                
                                        render={arrayHelpers => (
                                            <div>
                                                {
                                                    this.props.values.droitEnregistrement.map((part, index)=>{
                                                        let roles = [
                                                            {id: "producteur", nom: t('flot.partage.enregistrement.role.producteur')}, 
                                                            {id: "realisateur", nom: t('flot.partage.enregistrement.role.realisateur')}, 
                                                            {id: "graphiste", nom: t('flot.partage.enregistrement.role.graphiste')}, 
                                                            {id: "studio", nom: t('flot.partage.enregistrement.role.studio')}
                                                        ]
                                                        return (
                                                            <div key={`part-${index}`}>                                                                
                                                                <div className="gray-fields">
                                                                        <div className="ui grid">
                                                                        <div className="ui row">
                                                                        <div className="ui two wide column">
                                                                            <div className="avatar-image">
                                                                                <img className="ui spaced avatar image" src={avatar}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ui thirteen wide column">
                                                                            <div className="holder-name">
                                                                                {part.nom}
                                                                                <i className="right floated ellipsis horizontal icon" onClick={() => {
                                                                                    arrayHelpers.remove(index)
                                                                                    this.setState({ping: true}, ()=>{
                                                                                        this.recalculerPartage()
                                                                                    })
                                                                                }
                                                                                }></i>
                                                                                <div className="ui divider"></div>
                                                                            </div>
                                                                        <div className="coches--role__droit">
                                                                        {
                                                                            roles.map((elem, idx)=>{
                                                                                return (
                                                                                    <Checkbox
                                                                                        key={`coche_role_droit_enregistrement_${index}_${idx}`}
                                                                                        label={elem.nom}
                                                                                        checked={this.props.values.droitEnregistrement[index][elem.id]}
                                                                                        onClick={(e)=>{ 
                                                                                            if(e.currentTarget.className.includes("checked")) {
                                                                                                this.props.setFieldValue(`droitEnregistrement[${index}][${elem.id}]`, false)                                                                                
                                                                                            } else {
                                                                                                this.props.setFieldValue(`droitEnregistrement[${index}][${elem.id}]`, true)
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
                                                                            modele={`droitEnregistrement[${index}].pourcent`}
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
                                                                                    modele={`droitEnregistrement[${index}].pourcent`} 
                                                                                    disabled={this.state.partsInvariables[index]}
                                                                                    valeur={this.props.values.droitEnregistrement[index].pourcent} />
                                                                            )
                                                                        }
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                    <div className="blank-text">A</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div style={{margin: "0 auto", height: "100px"}}>                                  
                                                    <div className="ui grid">                                 
                                                        <div className="ui row">                                 
                                                            <div className="ui ten wide column">
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
                                                            <div className="four wide column">
                                                                <button 
                                                                    className="ui medium button"
                                                                    onClick={(e)=>{
                                                                        e.preventDefault()
                                                                        this.ajouterCollaborateur(arrayHelpers)
                                                                    }}>{t('flot.bouton.ajout')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                        {Object.keys(this.state.parts).length < 9 && (<Beignet uuid="1" data={this.state.parts}/>)}
                                        {Object.keys(this.state.parts).length >= 9 && (<Histogramme uuid="1" data={this.state.parts}/>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                                                    
                        </React.Fragment>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageEnregistrement