import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'

import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

const arrondir = function(nombre) {
    return Math.round(nombre * 10000) / 10000
}

class PageAssistantPartageEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ayantsDroit: props.ayantsDroit,
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
            _rH[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
            _rH[elem.rightHolder.rightHolderId].pourcent = parseFloat(_rH[elem.rightHolder.rightHolderId].pourcent) + parseFloat(elem.splitPct)
        })

        // Musique
        this.state.parts.music.forEach((elem, idx)=>{
            if(!_rH[elem.rightHolder.rightHolderId]) {
                _rH[elem.rightHolder.rightHolderId] = {nom: undefined, pourcent: 0}
            }            
            _rH[elem.rightHolder.rightHolderId].nom = elem.rightHolder.name
            _rH[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
            _rH[elem.rightHolder.rightHolderId].pourcent = parseFloat(_rH[elem.rightHolder.rightHolderId].pourcent) + parseFloat(elem.splitPct)
        })

        // Calcul des données pour le beignet par ayant-droit
        Object.keys(_rH).forEach((elem)=>{
            if(elem === this.props.values.ayantDroit.rightHolderId) {
                // c'est l'utlisateur connecté, on lui assigne 100 % du partage avec l'éditeur
                let _aD = this.props.values.ayantDroit
                _aD.pourcent = 100
                _aD.color = _rH[elem].color
                _aD.nom = _rH[elem].nom
                _aD.ayantDroit = this.state.ayantsDroit[elem]

                // Ajout de l'utilisateur et de son pourcentage aux données du formulaire
                this.props.setFieldValue('ayantDroit', _aD)
                this.setState({ayantDroit: _aD})
                this.setState({partPrincipale: _rH[elem].pourcent})

                // on pousse l'utilisateur ET l'éditeur
                donnees.push({color: _rH[elem].color, nom: _rH[elem].nom, pourcent: parseFloat(_rH[elem].pourcent), alpha: false, ayantDroit: this.state.ayantsDroit[elem]})
                donnees.push({color: "#bacada", nom: this.props.values.editeur.nom, pourcent: parseFloat(this.props.values.editeur.pourcent), alpha: false, ayantDroit: this.props.values.editeur.ayantDroit})
            } else {
                // on pousse l'ayant-droit
                donnees.push({color: _rH[elem].color, nom: _rH[elem].nom, pourcent: parseFloat(_rH[elem].pourcent), alpha: true, ayantDroit: this.state.ayantsDroit[elem]})
            }            
        })
            
        this.setState({donnees: donnees})
    }

    recalculerPartage() {
        // Recalculer les parts pour le beignet
        let donnees = this.state.donnees.map(elem=>{
            if(elem.nom === this.props.values.ayantDroit.nom) {
                elem.pourcent = `${arrondir(parseFloat(this.state.partPrincipale / 100) * parseFloat(this.props.values.ayantDroit.pourcent))}`
                return elem
            } else if(elem.nom === this.props.values.editeur.nom) {
                elem.pourcent = `${arrondir(parseFloat(this.state.partPrincipale / 100) * parseFloat(this.props.values.editeur.pourcent))}`
                return elem
            } else {
                return elem
            }
        })
        this.setState({donnees: donnees})
    }

    changementGradateur(index, delta) {

        // Modification graduelle des valeurs

        // Changement d'un gradateur
        let _aD = this.props.values.ayantDroit
        let editeur = this.props.values.editeur    
        if(index === "gradateur_ayantDroit") {
            // On bouge l'éditeur du delta inverse
            editeur.pourcent = `${arrondir(parseInt(editeur.pourcent) + (-1 * delta))}`
            this.props.setFieldValue('editeur', editeur)
        } else if(index === "gradateur_editeur") {
            // On bouge l'ayant-droit du delta inverse
            _aD.pourcent = `${arrondir(parseInt(_aD.pourcent) + (-1 * delta))}`
            this.props.setFieldValue('ayantDroit', _aD)
        }
        setTimeout(()=>{this.recalculerPartage()}, 0)
    }

    changementTexte(index, delta, e) {

        // Modification empirique des valeurs
        
        // Changement d'un gradateur
        let _aD = this.props.values.ayantDroit
        let editeur = this.props.values.editeur

        // Première passe ajuste le pourcentage avec maximum
        if( 
            (e.target.value < 50 && index === "texte_ayantdroit") ||
            (e.target.value > 50 && index === "texte_editeur")
        ) {
            e.target.value = 50
            _aD.pourcent = 50
            editeur.pourcent = 50    
        }

        if(index === "texte_ayantDroit") {
            // On bouge l'éditeur du delta inverse
            editeur.pourcent = 100 - arrondir(parseFloat(e.target.value))
        } else if(index === "texte_editeur") {            
            _aD.pourcent = 100 - arrondir(parseFloat(e.target.value))            
        }

        this.props.setFieldValue('editeur', editeur)
        this.props.setFieldValue('ayantDroit', _aD)

        setTimeout(()=>this.recalculerPartage(), 0)
    }

    render() {
      
        // TODO: VDEG 
        let visualisation = (<Beignet uuid="auteur--beignet" type="workCopyrightSplit" data={this.state.donnees}/>)
                  
        let descriptif
        if(this.props.i18n.lng.substring(0,2) === 'en') {
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

        let avatar = ''
        let userAvatar = ''

        let editeur = this.props.values.editeur
        let __aD = this.props.values.ayantDroit

        if(editeur && editeur.ayantDroit && editeur.ayantDroit.avatarImage) {            
            avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${editeur.ayantDroit.avatarImage}`
        } else {
            avatar = 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg'
        }

        if(__aD && __aD.aD && __aD.aD.avatarImage) {
            userAvatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${__aD.aD.avatarImage}`
        } else {
            userAvatar = 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg'
        }

        return (
            <Translation>
                {
                    (t) =>
                        <div className="ui grid">          
                            <div className="ui row">
                                <div className="ui seven wide column">
                                    <div className="wizard-title">{t('flot.split.documente-ton-oeuvre.partage.auteur.titre')}</div>
                                    <br/>
                                    <div className="mode--partage__auteur">
                                    <div className="who-invented-title">
                                        { t('flot.split.partage.editeur.titre-part') }
                                    </div>
                                    <br/>
                                    {descriptif}
                                    <br/>

                                    <span className="pourcentage-wrapper">
                                        <div className="ui grid">
                                            <div className="ui row fields gray-fields">
                                                <div className="holder-name">
                                                    <img alt="avatar" className="ui spaced avatar image" src={userAvatar}/>
                                                    {this.state.ayantDroit.nom}
                                                </div>
                                                <br/>
                                                <div className="ui eleven wide column">
                                                    <ChampGradateurAssistant                                                        
                                                        changement={(id, delta)=>{this.changementGradateur(id, delta)}}
                                                        id={`gradateur_ayantDroit`}
                                                        modele="ayantDroit.pourcent"
                                                        min={50}                                                        
                                                    />
                                                </div>

                                                <div className="ui four wide column">
                                                    <ChampTexteAssistant                                                                                                                            
                                                        id={`texte_ayantdroit`}
                                                        changement={(id, valeur, e)=>{
                                                            if(!isNaN(parseFloat(valeur))){
                                                                this.changementTexte(id, valeur, e)
                                                            }
                                                        }}
                                                        modele="ayantDroit.pourcent"
                                                        valeur={this.props.values.ayantDroit.pourcent}                                                        
                                                    />                                                                                                                        
                                                </div>
                                                {
                                                    document.getElementsByName("ayantDroit.pourcent").forEach((e, idx)=>{                                                                                                                                
                                                        if(e.type==="text") {
                                                            e.style.backgroundColor = "#faf8f9"
                                                            e.style.border = "none"
                                                            e.style.paddingBottom = "12px"
                                                        }
                                                    })
                                                }
                                            </div>
                                            <div className="ui row fields gray-fields">
                                                <div className="holder-name">
                                                    <img alt="avatar" className="ui spaced avatar image" src={avatar}/>
                                                    {this.state.editeur.nom}
                                                </div>
                                                <br/>
                                                <div className="ui eleven wide column">
                                                    <ChampGradateurAssistant
                                                        changement={(id, delta)=>{this.changementGradateur(id, delta)}}
                                                        id={`gradateur_editeur`}
                                                        modele="editeur.pourcent"
                                                        max={50}                                                        
                                                    />
                                                </div>

                                                <div className="ui four wide column">
                                                    <ChampTexteAssistant                                                                                                                            
                                                        id={`texte_editeur`}
                                                        changement={(id, valeur, e)=>{
                                                            if(!isNaN(parseFloat(valeur))){
                                                                this.changementTexte(id, valeur, e)
                                                            }
                                                        }}
                                                        modele="editeur.pourcent"
                                                        valeur={this.props.values.editeur.pourcent}                                                        
                                                    />                                                                                                                        
                                                </div>
                                                {
                                                    document.getElementsByName("editeur.pourcent").forEach((e, idx)=>{                                                                                                                                
                                                        if(e.type==="text") {
                                                            e.style.backgroundColor = "#faf8f9"
                                                            e.style.border = "none"
                                                            e.style.paddingBottom = "12px"
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </span>
                                
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