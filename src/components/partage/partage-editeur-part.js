import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'

import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import avatar from '../../assets/images/elliot.jpg'

class PageAssistantPartageEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: this.props.values.parts,     // Parts de tous les ayants-droits            
            song: this.props.values.song,
            editeur: this.props.values.editeur,
            ayantDroit: {},
            donnees: []                         // Données du beignet
        }        
        this.changementGradateur = this.changementGradateur.bind(this)
    }

    componentWillMount() {
        // Créer une structure pour les données du beignet
        let _rH = {}
        let donnees = []
        
        // Paroles
        this.state.parts.lyrics.forEach((elem, idx)=>{
            if(!_rH[elem.rightHolder.rightHolderId]) {
                _rH[elem.rightHolder.rightHolderId] = {nom: undefined, pourcent: 0}
            }            
            _rH[elem.rightHolder.rightHolderId].nom = elem.rightHolder.name
            _rH[elem.rightHolder.rightHolderId].pourcent = parseFloat(_rH[elem.rightHolder.rightHolderId].pourcent) + parseFloat(elem.splitPct)
        })

        // Musique
        this.state.parts.music.forEach((elem, idx)=>{
            if(!_rH[elem.rightHolder.rightHolderId]) {
                _rH[elem.rightHolder.rightHolderId] = {nom: undefined, pourcent: 0}
            }            
            _rH[elem.rightHolder.rightHolderId].nom = elem.rightHolder.name
            _rH[elem.rightHolder.rightHolderId].pourcent = parseFloat(_rH[elem.rightHolder.rightHolderId].pourcent) + parseFloat(elem.splitPct)
        })

        // Calcul des données pour le beignet par ayant-droit
        Object.keys(_rH).forEach((elem)=>{
            if(elem === this.props.values.ayantDroit.rightHolderId) {
                // c'est l'utlisateur connecté, on lui assigne 100 % du partage avec l'éditeur
                let _aD = this.props.values.ayantDroit
                _aD.pourcent = 100
                _aD.nom = _rH[elem].nom

                // Ajout de l'utilisateur et de son pourcentage aux données du formulaire
                this.props.setFieldValue('ayantDroit', _aD)
                this.setState({ayantDroit: _aD})
                this.setState({partPrincipale: _rH[elem].pourcent})

                // on pousse l'utilisateur ET l'éditeur
                donnees.push({nom: _rH[elem].nom, pourcent: parseFloat(_rH[elem].pourcent)})
                donnees.push({nom: this.props.values.editeur.nom, pourcent: parseFloat(this.props.values.editeur.pourcent)})
            } else {
                // on pousse l'ayant-droit
                donnees.push({nom: _rH[elem].nom, pourcent: parseFloat(_rH[elem].pourcent)})
            }            
        })
            
        this.setState({donnees: donnees})
    }

    recalculerPartage() {
        // Recalculer les parts pour le beignet
        let donnees = this.state.donnees.map(elem=>{
            if(elem.nom === this.props.values.ayantDroit.nom) {
                elem.pourcent = (parseFloat(this.state.partPrincipale / 100) * parseFloat(this.props.values.ayantDroit.pourcent)).toFixed(4)
                return elem
            } else if(elem.nom === this.props.values.editeur.nom) {
                elem.pourcent = (parseFloat(this.state.partPrincipale / 100) * parseFloat(this.props.values.editeur.pourcent)).toFixed(4)
                return elem
            } else {
                return elem
            }
        })    
        this.setState({donnees: donnees}, ()=>{
            console.log('données, valeurs', this.state.donnees, this.props.values)
        })
    }

    changementGradateur(index, delta) {
        // Changement d'un gradateur
        let _aD = this.props.values.ayantDroit
        let editeur = this.props.values.editeur    
        if(index === "gradateur_ayantDroit") {
            // On bouge l'éditeur du delta inverse
            editeur.pourcent = parseInt(editeur.pourcent) + (-1 * delta)
            this.props.setFieldValue('editeur', editeur)
        } else if(index === "gradateur_editeur") {
            // On bouge l'ayant-droit du delta inverse
            _aD.pourcent = parseInt(_aD.pourcent) + (-1 * delta)
            this.props.setFieldValue('ayantDroit', _aD)
        }
        setTimeout(()=>{this.recalculerPartage()}, 0)
    }

    render() {
      
        let visualisation = (<Beignet uuid="auteur--beignet" data={this.state.donnees}/>)
                  
        let descriptif
        if(this.props.i18n.lng === 'en') {
            descriptif = (<div className="medium-400">
                It's official, you own <strong>{this.state.partPrincipale.toFixed(2)}% of {this.props.values.song}'s Copyright</strong>. 
                You must now determine how much your publisher should get from this share.
            </div>)
        } else {
            descriptif = (<div className="medium-400">
                C’est officiel, tu possèdes <strong>{this.state.partPrincipale.toFixed(2)}% du droit d’auteur de l’oeuvre {this.props.values.song}</strong>. 
                Tu dois maintenant indiquer combien, de cette part, sera partagé avec ton éditeur.
            </div>)
        }

        return (
            <Translation>
                {
                    (t) =>
                        <div className="ui grid">          
                            <div className="ui row">
                                <div className="ui seven wide column">
                                    <div className="wizard-title">{t('flot.partage.editeur.titre-part')}</div>
                                    <br/>
                                    <div className="mode--partage__auteur">
                                    <div className="who-invented-title">
                                        { t('partage.auteur.titre', {oeuvre: this.state.song}) }
                                    </div>
                                    <br/>
                                    {descriptif}
                                    <br/>

                                    <div className="ui row">
                                        <div className="fields gray-fields">                                    
                                            <div className="twelve wide field">
                                                <div className="holder-name">
                                                    <img className="ui spaced avatar image" src={avatar}/>
                                                    {this.state.ayantDroit.nom}
                                                </div>
                                                <br/>
                                                <ChampGradateurAssistant 
                                                        changement={(id, delta)=>{this.changementGradateur(id, delta)}}
                                                        id={`gradateur_ayantDroit`}
                                                        modele="ayantDroit.pourcent"
                                                        min={50}
                                                />
                                                <ChampTexteAssistant 
                                                    id={`texte_ayantdroit`}
                                                    changement={(id, valeur)=>{
                                                        this.changementGradateur(id, valeur)
                                                    }}
                                                    modele="ayantDroit.pourcent"
                                                    valeur={this.props.values.ayantDroit.pourcent} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui row">
                                        <div className="fields gray-fields">
                                            <div className="twelve wide field">
                                                <div className="holder-name">
                                                    <img className="ui spaced avatar image" src={avatar}/>
                                                    {this.state.editeur.nom}
                                                </div>
                                                <br/>
                                                <ChampGradateurAssistant 
                                                        changement={(id, delta)=>{this.changementGradateur(id, delta)}} 
                                                        id="gradateur_editeur"
                                                        modele="editeur.pourcent"
                                                        max={50}
                                                />                                                                        
                                                <ChampTexteAssistant 
                                                    id={`texte_editeur`}
                                                    changement={(id, valeur)=>{
                                                        this.changementGradateur(id, valeur)
                                                    }}
                                                    modele="editeur.pourcent"
                                                    valeur={this.props.values.editeur.pourcent} />
                                            </div>
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
    }
}

export default PageAssistantPartageEditeur