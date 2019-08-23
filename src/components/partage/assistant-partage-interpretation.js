import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Checkbox, Progress } from 'semantic-ui-react'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik";

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"
import BoutonsRadio from "../formulaires/champ-radio"

import avatar from '../../assets/images/stevie.jpg'

const MODES = {egal: "0", role: "1"}
const TYPE = {principal: "0", accompagnement: "1"}

const COLORS = ["#BCBBF2", "#D9ACF7", "#EBB1DC", "#FFAFA8", "#FCB8C5", "#FAC0AE", "#FFD0A9", "#F8EBA3", "#C6D9AD", "#C6F3B6", "#93E9E4", "#91DDFE", "#A4B7F1"]

class PageAssistantPartageInterpretation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            mode: MODES.egal,
            principaux: [],
            accompagnement: [],
            song: ""
        }
        this.ajouterCollaborateur = this.ajouterCollaborateur.bind(this)
    }

    componentDidMount() {
        this.setState({parts: this.props.values.droitInterpretation})
        this.setState({song: this.props.values.media.title})
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
        let ayants = {}
        let _coll = this.props.values.collaborateur     
        //let _index = arrayHelpers.data.length
        let _index = this.props.values.droitAuteur.length + 
                    this.props.values.droitInterpretation.length +
                    this.props.values.droitEnregistrement.length
        this.props.values.droitAuteur.forEach(droit=>{
            ayants[droit["nom"]] = droit["color"]
        })
        console.log(ayants)
          
        _coll.forEach((elem, idx)=>{
            if(this.state.mode === MODES.egal) {
                if (elem in ayants) {
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: (100 / (this.props.values.droitInterpretation.length + _coll.length) ).toFixed(4),
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: ayants[elem]
                    })
                } else {
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: (100 / (this.props.values.droitInterpretation.length + _coll.length) ).toFixed(4),
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: COLORS[_index+idx]
                    })
                    ayants[elem] = COLORS[_index+idx]
                }
            }
            if(this.state.mode === MODES.role) {     
                if (elem in ayants) {     
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: "100",
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: ayants[elem]
                    })
                } else { 
                    arrayHelpers.insert(0, {
                        nom: elem, 
                        pourcent: "100",
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: COLORS[_index+idx]
                    })
                    ayants[elem] = COLORS[_index+idx]
                }
            }         
        })                                                         
        this.props.setFieldValue('collaborateur', [])
        this.setState({ping: true}, ()=>{
            this.recalculerPartage()
        })   
    }

    render() {

        let descriptif

        if(this.props.i18n.lng === 'en') {
            descriptif = (<div className="medium-400">
                Here we divide the <strong> neighboring right</strong> between the 
                <strong> performers</strong>, musicians and singers alike. 
                In the case of a <i> group</i>, all are <i> principal artists</i> 
                and share this right equally. In the case of a <i> featured artist</i>, the artist 
                retains 80% while the remaining 20% ​​is shared among his companions, if any.
            </div>)
        } else {
            descriptif = (<div className="medium-400">
                On sépare ici le <strong>droit voisin</strong> entre les <strong>interprètes</strong>, 
                autant les <i>musiciens</i> que les <i>chanteurs</i>. Dans le cas d’un <i>groupe</i>, 
                tous sont <i>Artiste principal</i> et partagent ce droit en parts égales. Dans le cas 
                d’un <i>artiste vedette</i>, celui-ci concerve 80% tandis que le 20% restant est 
                partagé parmi ses accompagnateurs, le cas échéant.
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
                                    <Progress percent="50" size='tiny' indicating/>                                    
                                </div>
                                <div className="ui three wide column">
                                    <div style={{top: "-15px", position: "relative", left: "30px"}} className="ui medium button" onClick={()=>{this.props.enregistrerEtQuitter(this.props.values)}}>
                                        {t('flot.etape.enregistrerEtQuitter')}
                                    </div>
                                </div>
                            </div>
                            <div className="ui row">
                                <div className="ui seven wide column">
                                    <div className="wizard-title">{t('flot.partage.interprete.titre')}</div>
                                    <br/>
                                    <div className="mode--partage__auteur">
                                    <div className="who-invented-title">
                                        {t('partage.interprete.titre', {oeuvre: this.state.song})}
                                    </div>
                                    <br/>
                                    {descriptif}
                                    <br/>
                                <div className="fields">
                                    <div className="field">
                                        <div className="nine wide field">
                                        <BoutonsRadio 
                                            name="mode_interpretation"
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
                                                }
                                            ]}
                                        />
                                        </div>
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
                                                                                titre=""
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
                                                                                            checked={this.props.values.droitInterpretation[index][elem.id]}
                                                                                            onClick={(e)=>{                                                                                                 
                                                                                                if(e.currentTarget.className.includes("checked")) {
                                                                                                    this.props.setFieldValue(`droitInterpretation[${index}][${elem.id}]`, false)
                                                                                                } else {
                                                                                                    this.props.setFieldValue(`droitInterpretation[${index}][${elem.id}]`, true)
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
                                                                        collaborateurs={this.props.values.droitInterpretation}
                                                                    />
                                                                </div> 
                                                                <div className="four wide column">
                                                                    <button 
                                                                        className="ui small button"
                                                                        onClick={(e)=>{
                                                                            e.preventDefault()
                                                                            this.ajouterCollaborateur(arrayHelpers)
                                                                        }}>Ajouter
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
                                            {Object.keys(this.state.parts).length < 9 && (<Beignet uuid="interpretation--beignet" data={this.state.parts}/>)}
                                            {Object.keys(this.state.parts).length >= 9 && (<Histogramme uuid="interpretation--histogramme" data={this.state.parts}/>)}
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

export default PageAssistantPartageInterpretation