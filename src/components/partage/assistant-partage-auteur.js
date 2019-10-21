import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Checkbox, Progress } from 'semantic-ui-react'

import axios from 'axios'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik"

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"
import BoutonsRadio from "../formulaires/champ-radio"

const MODES = { egal: "0", role: "1", manuel: "2" }

const COLORS = ["#BCBBF2", "#D9ACF7", "#EBB1DC", "#FFAFA8", "#FCB8C5", "#FAC0AE", "#FFD0A9", "#F8EBA3", "#C6D9AD", "#C6F3B6", "#93E9E4", "#91DDFE", "#A4B7F1"]

const arrondir = function (nombre) {
    return Math.round(nombre * 10000) / 10000
}

class PageAssistantPartageAuteur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            mode: MODES.egal,
            partsInvariables: {},
            song: ""
        }
        this.changementGradateur = this.changementGradateur.bind(this)
        this.changementTexte = this.changementTexte.bind(this)
        this.ajouterCollaborateur = this.ajouterCollaborateur.bind(this)
        this.pourcentRestant = this.pourcentRestant.bind(this)
    }

    componentDidMount() {
        this.setState({ parts: this.props.values.droitAuteur })
        this.setState({ song: this.props.values.media.title })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.values.droitAuteur !== nextProps.values.droitAuteur) {
            this.setState({ parts: nextProps.values.droitAuteur })
        }
        if (this.props.ayantsDroit !== nextProps.ayantsDroit) {
            this.setState({ ayantsDroit: nextProps.ayantsDroit })
        }
    }

    recalculerPartage() {
        let pourcent = 100.00

        switch (this.state.mode) {
            case MODES.egal:
                // Calcul le pourcentage égal
                let _parts = this.props.values.droitAuteur
                pourcent = arrondir(pourcent / _parts.length)
                // Applique le pourcentage aux données existantes
                _parts.forEach((elem, idx) => {
                    _parts[idx].nom = elem.nom
                    _parts[idx].pourcent = `${pourcent}`
                    _parts[idx].pourcentMusique = `${arrondir(pourcent / 2)}`
                    _parts[idx].pourcentParoles = `${arrondir(pourcent / 2)}`
                    _parts[idx].color = elem.color
                })
                this.props.setFieldValue("droitAuteur", _parts)
                break
            case MODES.role:
                if (this.state.parts.length > 0) {
                    let auteurs = [], compositeurs = [], arrangeurs = []
                    let partsMusique = [], partsParoles = []
                    this.state.parts.forEach(elem => {
                        if (elem.auteur) {
                            auteurs.push(elem.nom)
                        }
                        if (elem.compositeur) {
                            compositeurs.push(elem.nom)
                        }
                        if (elem.arrangeur) {
                            arrangeurs.push(elem.nom)
                        }
                    })

                    // Calcul des parts musique et paroles
                    let pctMusique = 50, pctParoles = 50
                    let pctMusiqueParCollaborateur = (compositeurs.length + arrangeurs.length) > 0 ? (pctMusique / (arrangeurs.length + compositeurs.length)) : 0
                    let pctParolesParCollaborateur = auteurs.length > 0 ? (pctParoles / auteurs.length) : 0

                    let _pM = 0, _pP = 0
                    let _parts = this.state.parts
                    this.state.parts.forEach((elem, idx) => {
                        _pM = (compositeurs.includes(elem.nom) ? pctMusiqueParCollaborateur : 0) + (arrangeurs.includes(elem.nom) ? pctMusiqueParCollaborateur : 0)
                        _pP = (auteurs.includes(elem.nom) ? pctParolesParCollaborateur : 0)
                        partsMusique.push({ nom: elem.nom, pourcent: `${_pM}`, color: elem.color, ayantDroit: elem.ayantDroit })
                        partsParoles.push({ nom: elem.nom, pourcent: `${_pP}`, color: elem.color, ayantDroit: elem.ayantDroit })
                        _parts[idx].pourcent = `${arrondir(_pM + _pP)}`
                        _parts[idx].pourcentMusique = `${arrondir(_pM)}`
                        _parts[idx].pourcentParoles = `${arrondir(_pP)}`
                        _parts[idx].color = elem.color
                    })
                    this.props.setFieldValue("droitAuteur", _parts)
                    this.setState({ parts: _parts })
                    this.setState({ partsMusique: partsMusique })
                    this.setState({ partsParoles: partsParoles })
                }
                break;
            case MODES.manuel:

                if (this.state.parts.length > 0) {
                    let auteurs = [], compositeurs = [], arrangeurs = []
                    this.state.parts.forEach(elem => {
                        if (elem.auteur) {
                            auteurs.push(elem.nom)
                        }
                        if (elem.compositeur) {
                            compositeurs.push(elem.nom)
                        }
                        if (elem.arrangeur) {
                            arrangeurs.push(elem.nom)
                        }
                    })

                    let _parts = this.state.parts
                    this.state.parts.forEach((elem, idx) => {
                        let _musique = 0, _paroles = 0
                        _musique = compositeurs.includes(elem.nom) || arrangeurs.includes(elem.nom)
                        _paroles = auteurs.includes(elem.nom)

                        elem.pourcent = parseFloat(elem.pourcent)

                        if (isNaN(elem.pourcent)) {
                            _parts[idx].pourcent = `0`
                            _parts[idx].pourcentMusique = `${0.00}`
                            _parts[idx].pourcentParoles = `${0.00}`
                        } else {
                            _parts[idx].pourcent = `${arrondir(elem.pourcent)}`
                            _parts[idx].pourcentMusique = `${arrondir(_musique ? elem.pourcent / (_paroles ? 2 : 1) : 0)}`
                            _parts[idx].pourcentParoles = `${arrondir(_paroles ? elem.pourcent / (_musique ? 2 : 1) : 0)}`
                        }

                        _parts[idx].color = elem.color
                    })
                    this.props.setFieldValue("droitAuteur", _parts)
                }
                break;
            default:
        }
        this.setState({ ping: true })
    }

    pourcentRestant() {
        let _pctDelta = 100
        this.props.values.droitAuteur.forEach(elem => {
            _pctDelta = _pctDelta - parseFloat(elem.pourcent)
        })

        return arrondir(_pctDelta < 0 ? 0 : _pctDelta)
    }

    changementTexte(index, delta) {
         // Changement de la zone de texte associée au gradateur
         let invariable = this.state.partsInvariables
        let droits = this.props.values.droitAuteur

        // extraction de l'index numérique du gradateur
        // pour récupération du droit (derniers caractères après le dernier _)
        //let idxG = index.substring(index.lastIndexOf('_') + 1, index.length)

        //delta = delta - (parseFloat(droits[idxG].pourcent) % 1) // différence décimale à soustraire du delta à répartir

        let deltaParCollaborateurVariable = 0.0

        let aMisInvariable = false // Identifier si on doit retirer l'index des invariables
        if (!invariable[index])
            aMisInvariable = true

        invariable[index] = true // Le droit sélectionné lors de la transition est considéré invariable
        let nbModifications = droits.length - Object.keys(invariable).length

        if (nbModifications > 0) {
            deltaParCollaborateurVariable = -(delta / nbModifications) // Calcul de la différence à répartir sur les autres collaborateurs
        }

        console.log('delta par collaborateur variable', deltaParCollaborateurVariable)

        droits.forEach((elem, idx) => {
            if (!invariable[idx]) { // Ajustement si l'index est variable
                droits[idx].pourcent = `${arrondir(parseFloat(elem.pourcent) + parseFloat(deltaParCollaborateurVariable))}`
                droits[idx].pourcentParoles = `${arrondir(droits[idx].pourcent / 2)}`
                droits[idx].pourcentMusique = `${arrondir(droits[idx].pourcent / 2)}`
            }
        })

        this.props.setFieldValue('droitAuteur', droits)

        //this.setState({ ping: true }, () => this.recalculerPartage())

        if (aMisInvariable) // Retrait de l'index des invariables
            delete invariable[index]

    }

    changementGradateur(index, delta) {

        // Changement d'un gradateur

        let invariable = this.state.partsInvariables
        let droits = this.props.values.droitAuteur

        // extraction de l'index numérique du gradateur
        // pour récupération du droit (derniers caractères après le dernier _)
        let idxG = index.substring(index.lastIndexOf('_') + 1, index.length)

        delta = delta - (parseFloat(droits[idxG].pourcent) % 1) // différence décimale à soustraire du delta à répartir

        let deltaParCollaborateurVariable = 0.0

        let aMisInvariable = false // Identifier si on doit retirer l'index des invariables
        if (!invariable[index])
            aMisInvariable = true

        invariable[index] = true // Le droit sélectionné lors de la transition est considéré invariable
        let nbModifications = droits.length - Object.keys(invariable).length

        if (nbModifications > 0) {
            deltaParCollaborateurVariable = -(delta / nbModifications) // Calcul de la différence à répartir sur les autres collaborateurs
        }

        droits.forEach((elem, idx) => {
            if (!invariable[idx]) { // Ajustement si l'index est variable
                droits[idx].pourcent = `${arrondir(parseFloat(elem.pourcent) + parseFloat(deltaParCollaborateurVariable))}`
                droits[idx].pourcentParoles = `${arrondir(droits[idx].pourcent / 2)}`
                droits[idx].pourcentMusique = `${arrondir(droits[idx].pourcent / 2)}`
            }
        })

        this.props.setFieldValue('droitAuteur', droits)

        this.setState({ ping: true }, () => this.recalculerPartage())

        if (aMisInvariable) // Retrait de l'index des invariables
            delete invariable[index]

    }

    basculerVariable(index) {

        let invariables = this.state.partsInvariables

        let nbAvant = Object.keys(invariables).length
        invariables[index] = !invariables[index]

        if (!invariables[index]) {
            delete invariables[index]
        }

        let nbApres = Object.keys(invariables).length

        if (((nbAvant === 0 && nbApres === 1) || nbAvant < nbApres) && (this.props.values.droitAuteur.length - 1 === nbApres)) {
            // Trouver le gradateur restant et l'inscrire comme invariable
            let nbGradateurs = this.props.values.droitAuteur.length // Autant de gradateurs que de droits

            for (let i = 0; i < nbGradateurs; i++) { // Pour gradateur_droitAuteur_[0 à N-1]
                if (!invariables[i]) {
                    invariables[i] = true
                }
            }
        }

        this.setState({ partsInvariables: invariables })
    }

    ajouterCollaborateur(arrayHelpers) {

        let _coll = this.props.values.collaborateur

        if (_coll) {
            let ayantDroit = this.state.ayantsDroit[_coll], nom

            if (ayantDroit) {
                nom = `${ayantDroit.firstName || ""} ${ayantDroit.lastName || ""} ${ayantDroit.artistName ? `(${ayantDroit.artistName})` : ""}`
            }

            let _index = this.props.values.droitAuteur.length +
                this.props.values.droitInterpretation.length +
                this.props.values.droitEnregistrement.length

            if (this.state.mode === MODES.egal) {
                arrayHelpers.insert(0, {
                    nom: nom,
                    ayantDroit: ayantDroit,
                    pourcent: `${arrondir(100 / (this.props.values.droitAuteur.length + 1))}`,
                    auteur: true,
                    compositeur: true,
                    arrangeur: false,
                    color: COLORS[_index]
                })
            }

            if (this.state.mode === MODES.manuel) {
                let _pourcent = (this.pourcentRestant())
                arrayHelpers.insert(0, {
                    nom: nom,
                    ayantDroit: ayantDroit,
                    pourcent: `${_pourcent}`,
                    auteur: true,
                    compositeur: true,
                    arrangeur: false,
                    color: COLORS[_index]
                })
            }

            if (this.state.mode === MODES.role) {
                arrayHelpers.insert(0, {
                    nom: nom,
                    ayantDroit: ayantDroit,
                    pourcent: "100",
                    auteur: true,
                    compositeur: true,
                    arrangeur: false,
                    color: COLORS[_index]
                })
            }

            this.props.setFieldValue('collaborateur', '')
            this.setState({ ping: true }, () => {
                this.recalculerPartage()
            })
        }

    }

    render() {
        let visualisation
        if (this.state.parts.length > 0) {

            switch (this.state.mode) {
                case MODES.egal:
                    // 1 beignet ou histogramme dépendant du nombre de collaborateurs
                    if (Object.keys(this.state.parts).length < 9) {
                        visualisation = (<Beignet type="workCopyrightSplit" uuid="auteur--beignet" data={this.state.parts} />)
                    } else {
                        visualisation = (<Histogramme uuid="auteur--histogramme" data={this.state.parts} />)
                    }
                    break;
                case MODES.manuel:
                    // 1 beignet ou histogramme dépendant du nombre de collaborateurs
                    if (Object.keys(this.state.parts).length < 9) {
                        visualisation = (<Beignet type="workCopyrightSplit" uuid="auteur--beignet" data={this.state.parts} />)
                    } else {
                        visualisation = (<Histogramme uuid="auteur--histogramme" data={this.state.parts} />)
                    }
                    break;
                case MODES.role:
                    // 2 beignets, 1 pour les droits Musique, l'autre pour les droits Paroles   
                    visualisation = (
                        <div>
                            {this.state.parts && (
                                <Beignet className="twelve wide field" titre="Total" uuid="auteur--beignet--1"
                                    data={this.state.parts} type="workCopyrightSplit" />)}
                            {this.state.partsMusique && (
                                <Beignet className="six wide field" titre="Musique" uuid="auteur--beignet--2"
                                    data={this.state.partsMusique} type="workCopyrightSplit" />)}
                            {this.state.partsParoles && (
                                <Beignet className="six wide field" titre="Paroles" uuid="auteur--beignet--3"
                                    data={this.state.partsParoles} type="workCopyrightSplit" />)}
                        </div>
                    )
                    break;
                default:
            }
        }

        let descriptif

        if (this.props.i18n && this.props.i18n.lng.substring(0, 2) === 'en') {
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

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>

                            <div className="ui grid">
                                <div className="ui row">
                                    <div className="ui thirteen wide column">
                                        <Progress percent="20" size='tiny' indicating />
                                    </div>
                                    <div className="ui three wide column">
                                        <div style={{ top: "-15px", position: "relative", left: "30px", width: "150px" }} className="ui medium button" onClick={() => { this.props.enregistrerEtQuitter(t, this.props.values) }}>
                                            {t('flot.split.documente-ton-oeuvre.etape.enregistrerEtQuitter')}
                                        </div>
                                    </div>
                                </div>
                                <div className="ui row">
                                    <div className="ui seven wide column">
                                        <div className="wizard-title">{t('flot.split.droits.auteur')}</div>
                                        <br />
                                        <div className="mode--partage__auteur">
                                            <div className="who-invented-title">
                                                {t('flot.split.partage.auteur.titre', { oeuvre: this.state.song })}
                                            </div>
                                            <br />
                                            {descriptif}
                                            <br />

                                            <div className="fields">
                                                <div className="fourteen wide field">
                                                    <div className="fourteen wide field">
                                                        <BoutonsRadio

                                                            name="mode_auteur"
                                                            actif={this.state.mode} // Attribut dynamique
                                                            onClick={(e) => {

                                                                let valeur
                                                                // Clic de la puce ou de l'étiquette ?
                                                                if (e.target.nodeName === 'LABEL') {
                                                                    valeur = e.target.parentNode.childNodes[0].value
                                                                }
                                                                if (e.target.nodeName === 'INPUT') {
                                                                    valeur = e.target.value
                                                                }

                                                                this.setState({ mode: valeur }, () => {
                                                                    this.recalculerPartage()
                                                                })
                                                            }}
                                                            titre=""
                                                            choix={[
                                                                {
                                                                    nom: t('flot.split.modepartage.egal'),
                                                                    valeur: MODES.egal,
                                                                    info: t('tooltip.egal')
                                                                },
                                                                {
                                                                    nom: t('flot.split.modepartage.roles'),
                                                                    valeur: MODES.role,
                                                                    info: t('tooltip.roles')
                                                                },
                                                                {
                                                                    nom: t('flot.split.modepartage.manual'),
                                                                    valeur: MODES.manuel,
                                                                    info: t('tooltip.manuel')
                                                                }
                                                            ]}
                                                        />
                                                    </div>
                                                    <p style={{ height: "30px" }} />
                                                    <FieldArray
                                                        name="droitAuteur"
                                                        render={arrayHelpers => (
                                                            <div>
                                                                {
                                                                    this.state.ayantsDroit && this.props.values.droitAuteur.map((part, index) => {

                                                                        // Composante de carte controlable

                                                                        let _aD = part.ayantDroit

                                                                        let roles = [
                                                                            {
                                                                                id: "auteur",
                                                                                nom: t('flot.split.documente-ton-oeuvre.partage.auteur.role.auteur')
                                                                            },
                                                                            {
                                                                                id: "compositeur",
                                                                                nom: t('flot.split.documente-ton-oeuvre.partage.auteur.role.compositeur')
                                                                            },
                                                                            {
                                                                                id: "arrangeur",
                                                                                nom: t('flot.split.documente-ton-oeuvre.partage.auteur.role.arrangeur')
                                                                            }
                                                                        ]

                                                                        let avatar = ''

                                                                        // Y a-t-il un avatar ?
                                                                        if (_aD.avatarImage)
                                                                            avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${_aD.avatarImage}`
                                                                        else
                                                                            avatar = 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg';

                                                                        return (
                                                                            <div key={`part-${index}`}>
                                                                                <div className="gray-fields">
                                                                                    <div className="ui grid">
                                                                                        <div className="ui row">
                                                                                            <div
                                                                                                className="ui two wide column">
                                                                                                <div
                                                                                                    className="avatar-image">
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        className="ui spaced avatar image"
                                                                                                        src={avatar} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="ui thirteen wide column">
                                                                                                <div
                                                                                                    className="holder-name">
                                                                                                    {part.nom}
                                                                                                    <i className="right flated close icon cliquable"
                                                                                                        onClick={() => {
                                                                                                            arrayHelpers.remove(index)
                                                                                                            this.setState({ ping: true }, () => {
                                                                                                                this.recalculerPartage()
                                                                                                            })
                                                                                                        }
                                                                                                        }></i>
                                                                                                    <div
                                                                                                        className="ui divider"></div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="coches--role__droit">
                                                                                                    {
                                                                                                        roles.map((elem, idx) => {
                                                                                                            return (
                                                                                                                <Checkbox
                                                                                                                    key={`coche_role_droit_auteur_${index}_${idx}`}
                                                                                                                    label={elem.nom}
                                                                                                                    checked={this.props.values.droitAuteur[index][elem.id]}
                                                                                                                    onClick={(e) => {
                                                                                                                        if (e.currentTarget.className.includes("checked")) {
                                                                                                                            this.props.setFieldValue(`droitAuteur[${index}][${elem.id}]`, false)
                                                                                                                        } else {
                                                                                                                            this.props.setFieldValue(`droitAuteur[${index}][${elem.id}]`, true)
                                                                                                                        }
                                                                                                                        setTimeout(() => {
                                                                                                                            this.recalculerPartage()
                                                                                                                        }, 0)
                                                                                                                    }}
                                                                                                                />
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </div>                                                                                                
                                                                                                {
                                                                                                    this.state.mode === MODES.manuel && (
                                                                                                        <>
                                                                                                            <ChampGradateurAssistant
                                                                                                                changement={(id, delta) => {
                                                                                                                    this.changementGradateur(id, delta)
                                                                                                                }}
                                                                                                                id={`gradateur_droitAuteur_${index}`}
                                                                                                                modele={`droitAuteur[${index}].pourcent`}
                                                                                                                disabled={
                                                                                                                    this.state.partsInvariables[index] ||
                                                                                                                    this.state.mode !== MODES.manuel ||
                                                                                                                    this.props.values.droitAuteur.length <= 1 ||
                                                                                                                    (
                                                                                                                        1 ===
                                                                                                                        (this.props.values.droitAuteur.length - Object.keys(this.state.partsInvariables).length)
                                                                                                                    )
                                                                                                                }
                                                                                                            />
                                                                                                            <i className={`lock ${!(this.state.partsInvariables[index] || this.props.values.droitAuteur.length <= 1) ? 'open' : ''} icon golden`}
                                                                                                                onClick={() => {
                                                                                                                    this.basculerVariable(index)
                                                                                                                }}>
                                                                                                            </i>
                                                                                                            <ChampTexteAssistant
                                                                                                                id={`texte_${index}`}
                                                                                                                changement={(id, valeur) => {
                                                                                                                    this.changementTexte(id, valeur)
                                                                                                                }}
                                                                                                                modele={`droitAuteur[${index}].pourcent`}
                                                                                                                disabled={(
                                                                                                                    this.props.values.droitAuteur.length <= 1) ||
                                                                                                                    this.state.partsInvariables[index] ||
                                                                                                                    (1 === this.props.values.droitAuteur.length - Object.keys(this.state.partsInvariables).length)}
                                                                                                                valeur={this.props.values.droitAuteur[index].pourcent} />
                                                                                                        </>
                                                                                                    )
                                                                                                }                                                                                                
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <br></br>
                                                                <br></br>
                                                                <div style={{ margin: "0 auto" }}>
                                                                    <div className="ui grid">
                                                                        <div className="ui row">
                                                                            <div className="ui ten wide column">
                                                                                <ChampListeCollaborateurAssistant
                                                                                    onRef={ayantsDroit => this.setState({ ayantsDroit: ayantsDroit })}
                                                                                    style={{ height: "50px" }}
                                                                                    indication={t('flot.split.documente-ton-oeuvre.collaborateurs.ajout')}
                                                                                    modele="collaborateur"
                                                                                    autoFocus={false}
                                                                                    requis={false}
                                                                                    fluid={true}
                                                                                    multiple={false}
                                                                                    recherche={true}
                                                                                    selection={true}
                                                                                    ajout={true}
                                                                                    collaborateurs={this.props.values.droitAuteur}
                                                                                    fn={(_aD) => {

                                                                                        // Fonction de rappel à la modale ModifyUser

                                                                                        // Ajoute le nouvel ayantdroit à la liste comme si il était déjà
                                                                                        // dans la liste.
                                                                                        this.props.setFieldValue('collaborateur', _aD)

                                                                                        let droitsAuteur = this.props.values.droitAuteur

                                                                                        // Rafraîchir ayants droit
                                                                                        // Récupérer la liste des ayant-droits        
                                                                                        axios.get(`http://dev.api.smartsplit.org:8080/v1/rightHolders`)
                                                                                            .then(res => {
                                                                                                let _adParId = {}
                                                                                                res.data.forEach((elem) => {
                                                                                                    _adParId[elem.rightHolderId] = elem
                                                                                                })
                                                                                                this.setState({ ayantsDroit: _adParId }, () => {
                                                                                                    let ayantDroit = this.state.ayantsDroit[this.props.values.collaborateur], nom

                                                                                                    if (ayantDroit) {
                                                                                                        nom = `${ayantDroit.firstName || ""} ${ayantDroit.lastName || ""} ${ayantDroit.artistName ? `(${ayantDroit.artistName})` : ""}`
                                                                                                    }

                                                                                                    let _index = this.props.values.droitAuteur.length +
                                                                                                        this.props.values.droitInterpretation.length +
                                                                                                        this.props.values.droitEnregistrement.length

                                                                                                    if (this.state.mode === MODES.egal) {
                                                                                                        droitsAuteur.push({
                                                                                                            nom: nom,
                                                                                                            ayantDroit: ayantDroit,
                                                                                                            pourcent: `${arrondir(100 / (this.props.values.droitAuteur.length + 1))}`,
                                                                                                            auteur: true,
                                                                                                            compositeur: true,
                                                                                                            arrangeur: false,
                                                                                                            color: COLORS[_index]
                                                                                                        })
                                                                                                    }

                                                                                                    if (this.state.mode === MODES.manuel) {
                                                                                                        let _pourcent = (this.pourcentRestant())
                                                                                                        droitsAuteur.push({
                                                                                                            nom: nom,
                                                                                                            ayantDroit: ayantDroit,
                                                                                                            pourcent: `${_pourcent}`,
                                                                                                            auteur: true,
                                                                                                            compositeur: true,
                                                                                                            arrangeur: false,
                                                                                                            color: COLORS[_index]
                                                                                                        })
                                                                                                    }

                                                                                                    if (this.state.mode === MODES.role) {
                                                                                                        droitsAuteur.push({
                                                                                                            nom: nom,
                                                                                                            ayantDroit: ayantDroit,
                                                                                                            pourcent: "100",
                                                                                                            auteur: true,
                                                                                                            compositeur: true,
                                                                                                            arrangeur: false,
                                                                                                            color: COLORS[_index]
                                                                                                        })
                                                                                                    }

                                                                                                    this.props.setFieldValue('droitAuteur', droitsAuteur)
                                                                                                    this.props.setFieldValue('collaborateur', '')
                                                                                                    this.setState({ ping: true }, () => {
                                                                                                        this.recalculerPartage()
                                                                                                    })
                                                                                                })

                                                                                            })
                                                                                            .catch(err => {
                                                                                                console.log(err)
                                                                                            })

                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="four wide column">
                                                                                <button
                                                                                    className="ui medium button"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault()
                                                                                        this.ajouterCollaborateur(arrayHelpers)
                                                                                    }}>{t('flot.split.documente-ton-oeuvre.bouton.ajout')}
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

                                    <div className="ui sixteen wide mobile twelve wide tablet seven wide computer column">
                                        <br />
                                        <br />
                                        <br />
                                        <div className="conteneur-beignet fourteen wide field">
                                            {visualisation}
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

export default PageAssistantPartageAuteur;
