import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { Checkbox, Progress } from 'semantic-ui-react'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import Histogramme from '../visualisation/partage/histogramme'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'
import { ChampTexteAssistant } from '../formulaires/champ-texte'

import { FieldArray } from "formik"
import axios from 'axios'

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"
import BoutonsRadio from "../formulaires/champ-radio"

const MODES = { egal: "0", manuel: "1" }

const COLORS = ["#BCBBF2", "#D9ACF7", "#EBB1DC", "#FFAFA8", "#FCB8C5", "#FAC0AE", "#FFD0A9", "#F8EBA3", "#C6D9AD", "#C6F3B6", "#93E9E4", "#91DDFE", "#A4B7F1"]

const arrondir = function (nombre) {
    return Math.round(nombre * 10000) / 10000
}

class PageAssistantPartageEnregistrement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            mode: MODES.egal,
            partsInvariables: {},
            song: ""
        }
        this.changementGradateur = this.changementGradateur.bind(this)
        this.ajouterCollaborateur = this.ajouterCollaborateur.bind(this)
    }

    componentDidMount() {
        this.setState({ parts: this.props.values.droitEnregistrement })
        this.setState({ song: this.props.values.media.title })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.values.droitEnregistrement !== nextProps.values.droitEnregistrement) {
            this.setState({ parts: nextProps.values.droitEnregistrement })
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
                let _parts = this.props.values.droitEnregistrement
                pourcent = (pourcent / _parts.length)
                // Applique le pourcentage aux données existantes
                _parts.forEach((elem, idx) => {
                    _parts[idx].nom = elem.nom
                    _parts[idx].pourcent = `${pourcent}`
                })
                this.props.setFieldValue("droitEnregistrement", _parts)
                break
            default:
        }
    }

    pourcentRestant() {
        let _pctDelta = 100
        this.props.values.droitEnregistrement.forEach(elem => {
            _pctDelta = _pctDelta - parseFloat(elem.pourcent)
        })
        return _pctDelta < 0 ? 0 : _pctDelta
    }

    // Changement d'un gradateur
    changementGradateur(index, delta) {
        // Changement d'un gradateur

        let invariable = this.state.partsInvariables
        let droits = this.props.values.droitEnregistrement

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
            }
        })

        this.props.setFieldValue('droitEnregistrement', droits)

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

        if (((nbAvant === 0 && nbApres === 1) || nbAvant < nbApres) && (this.props.values.droitEnregistrement.length - 1 === nbApres)) {

            // Trouver le gradateur restant et l'inscrire comme invariable
            let nbGradateurs = this.props.values.droitEnregistrement.length // Autant de gradateurs que de droits

            for (let i = 0; i < nbGradateurs; i++) { // Pour gradateur_droitEnregistrement_[0 à N-1]
                if (!invariables[i]) {
                    invariables[i] = true
                }
            }
        }

        this.setState({ partsInvariables: invariables })
    }

    ajouterCollaborateur(arrayHelpers) {
        let ayants = {}

        let _coll = this.props.values.collaborateur

        if (_coll) {
            let ayantDroit = this.state.ayantsDroit[_coll], nom

            if (ayantDroit) {
                nom = `${ayantDroit.firstName || ""} ${ayantDroit.lastName || ""} ${ayantDroit.artistName ? `(${ayantDroit.artistName})` : ""}`
            }

            let _index = this.props.values.droitEnregistrement.length +
                this.props.values.droitInterpretation.length +
                this.props.values.droitEnregistrement.length

            this.props.values.droitEnregistrement.forEach(droit => {
                ayants[droit.ayantDroit.rightHolderId] = droit["color"]
            })
            this.props.values.droitInterpretation.forEach(droit => {
                ayants[droit.ayantDroit.rightHolderId] = droit["color"]
            })

            if (this.state.mode === MODES.egal) {
                if (_coll in ayants) {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: `${arrondir(100 / (this.props.values.droitEnregistrement.length + 1))}`,
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: ayants[_coll]
                    })
                } else {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: `${arrondir(100 / (this.props.values.droitEnregistrement.length + 1))}`,
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: COLORS[_index]
                    })
                    ayants[_coll] = COLORS[_index]
                }
            }
            if (this.state.mode === MODES.manuel) {
                if (_coll in ayants) {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: `${arrondir(
                            this.pourcentRestant() /
                            (this.props.values.droitEnregistrement.length + 1))}`,
                        producteur: false,
                        realisateur: false,
                        graphiste: false,
                        studio: false,
                        color: ayants[_coll]
                    })
                } else {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: `${arrondir(
                            this.pourcentRestant() /
                            (this.props.values.droitEnregistrement.length + 1))}`,
                        producteur: false,
                        realisateur: false,
                        graphiste: false,
                        studio: false,
                        color: COLORS[_index]
                    })
                    ayants[_coll] = COLORS[_index]
                }
            }

            this.props.setFieldValue('collaborateur', "")
            this.setState({ ping: true }, () => {
                this.recalculerPartage()
            })
        }

    }

    render() {

        let descriptif

        if (this.props.i18n.lng.substring(0, 2) === 'en') {
            descriptif = (<div className="medium-400">
                Here we separate the <strong>neighboring right</strong> of <strong>producers</strong>,
                ie those who have invested their time and / or their money to record and
                finalize the product in order to be marketed.
                <br />
                It is customary to share this right equally or pro rata with the investment.
            </div>)
        } else {
            descriptif = (<div className="medium-400">
                On sépare ici le <strong>droit voisin</strong> des <strong>producteurs</strong>,
                c’est à dire ceux qui ont investi leur temps et/ou leur argent pour enregistrer et
                finaliser le produit afin d’être commercialisé. <br />
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
                                        <Progress percent="85" size='tiny' indicating />
                                    </div>
                                    <div className="ui three wide column">
                                        <div style={{ top: "-15px", position: "relative", left: "30px", width: "150px" }} className="ui medium button" onClick={() => { this.props.enregistrerEtQuitter(t, this.props.values) }}>
                                            {t('flot.split.documente-ton-oeuvre.etape.enregistrerEtQuitter')}
                                        </div>
                                    </div>
                                </div>
                                <div className="ui row">
                                    <div className="ui seven wide column">
                                        <div className="wizard-title">{t('flot.split.documente-ton-oeuvre.partage.enregistrement.titre')}</div>
                                        <br />
                                        <div className="mode--partage__auteur">
                                            <div className="who-invented-title">
                                                {t('flot.split.partage.enregistrement.titre', { oeuvre: this.state.song })}
                                            </div>
                                            <br />
                                            {descriptif}
                                            <br />
                                            <div className="fields">
                                                <div className="fourteen wide field">
                                                    <div className="fourteen wide field">
                                                        <BoutonsRadio
                                                            name="mode_enregistrement"
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
                                                                    valeur: "" + MODES.egal
                                                                },
                                                                {
                                                                    nom: t('flot.split.modepartage.manual'),
                                                                    valeur: "" + MODES.manuel
                                                                }
                                                            ]}
                                                        />
                                                    </div>
                                                    <p style={{ height: "30px" }} />
                                                    <FieldArray
                                                        name="droitEnregistrement"
                                                        render={arrayHelpers => (
                                                            <div>
                                                                {
                                                                    this.state.ayantsDroit && this.props.values.droitEnregistrement.map((part, index) => {
                                                                        let roles = [
                                                                            { id: "producteur", nom: t('flot.split.documente-ton-oeuvre.partage.enregistrement.role.producteur') },
                                                                            { id: "realisateur", nom: t('flot.split.documente-ton-oeuvre.partage.enregistrement.role.realisateur') },
                                                                            { id: "graphiste", nom: t('flot.split.documente-ton-oeuvre.partage.enregistrement.role.graphiste') },
                                                                            { id: "studio", nom: t('flot.split.documente-ton-oeuvre.partage.enregistrement.role.studio') }
                                                                        ]

                                                                        let avatar = ''
                                                                        let _aD = part.ayantDroit
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
                                                                                            <div className="ui two wide column">
                                                                                                <div className="avatar-image">
                                                                                                    <img className="ui spaced avatar image" src={avatar} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ui thirteen wide column">
                                                                                                <div className="holder-name">
                                                                                                    {part.nom}
                                                                                                    <i className="right floated close icon" onClick={() => {
                                                                                                        arrayHelpers.remove(index)
                                                                                                        this.setState({ ping: true }, () => {
                                                                                                            this.recalculerPartage()
                                                                                                        })
                                                                                                    }
                                                                                                    }></i>
                                                                                                    <div className="ui divider"></div>
                                                                                                </div>
                                                                                                <div className="coches--role__droit">
                                                                                                    {
                                                                                                        roles.map((elem, idx) => {
                                                                                                            return (
                                                                                                                <Checkbox
                                                                                                                    key={`coche_role_droit_enregistrement_${index}_${idx}`}
                                                                                                                    label={elem.nom}
                                                                                                                    checked={this.props.values.droitEnregistrement[index][elem.id]}
                                                                                                                    onClick={(e) => {
                                                                                                                        if (e.currentTarget.className.includes("checked")) {
                                                                                                                            this.props.setFieldValue(`droitEnregistrement[${index}][${elem.id}]`, false)
                                                                                                                        } else {
                                                                                                                            this.props.setFieldValue(`droitEnregistrement[${index}][${elem.id}]`, true)
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
                                                                                                <ChampGradateurAssistant
                                                                                                    changement={(id, delta) => { this.changementGradateur(id, delta) }}
                                                                                                    id={`gradateur_droitEnregistrement_${index}`}
                                                                                                    modele={`droitEnregistrement[${index}].pourcent`}
                                                                                                    disabled={
                                                                                                        this.state.partsInvariables[index] ||
                                                                                                        this.state.mode !== MODES.manuel ||
                                                                                                        this.props.values.droitEnregistrement.length <= 1 ||
                                                                                                        (
                                                                                                            1 ===
                                                                                                            (this.props.values.droitEnregistrement.length - Object.keys(this.state.partsInvariables).length)
                                                                                                        )}
                                                                                                />
                                                                                                {
                                                                                                    this.state.mode === MODES.manuel && !(this.props.values.droitEnregistrement.length <= 1) && (
                                                                                                        <i className={`lock ${!this.state.partsInvariables[index] ? 'open' : ''} icon golden`}
                                                                                                            onClick={() => {
                                                                                                                this.basculerVariable(index)
                                                                                                            }}>
                                                                                                        </i>
                                                                                                    )
                                                                                                }
                                                                                                {
                                                                                                    this.state.mode === MODES.manuel && !(this.props.values.droitEnregistrement.length <= 1) && (
                                                                                                        <ChampTexteAssistant
                                                                                                            id={`texte_${index}`}
                                                                                                            changement={(id, valeur) => {
                                                                                                                this.changementGradateur(id, valeur)
                                                                                                            }}
                                                                                                            modele={`droitEnregistrement[${index}].pourcent`}
                                                                                                            disabled={this.state.partsInvariables[index] ||
                                                                                                                (
                                                                                                                    1 ===
                                                                                                                    (this.props.values.droitEnregistrement.length - Object.keys(this.state.partsInvariables).length)
                                                                                                                )}
                                                                                                            valeur={this.props.values.droitEnregistrement[index].pourcent} />
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
                                                                <div style={{ margin: "0 auto", height: "50px" }}>
                                                                    <div className="ui grid">
                                                                        <div className="ui row">
                                                                            <div className="ui ten wide column">
                                                                                <ChampListeCollaborateurAssistant
                                                                                    onRef={ayantsDroit => this.setState({ ayantsDroit: ayantsDroit })}
                                                                                    indication={t('flot.split.documente-ton-oeuvre.collaborateurs.ajout')}
                                                                                    modele="collaborateur"
                                                                                    autoFocus={false}
                                                                                    requis={false}
                                                                                    fluid={true}
                                                                                    multiple={false}
                                                                                    recherche={true}
                                                                                    selection={true}
                                                                                    ajout={true}
                                                                                    collaborateurs={this.props.values.droitEnregistrement}
                                                                                    fn={(_aD) => {

                                                                                        // Fonction de rappel à la modale ModifyUser

                                                                                        // Ajoute le nouvel ayantdroit à la liste comme si il était déjà
                                                                                        // dans la liste.
                                                                                        this.props.setFieldValue('collaborateur', _aD)

                                                                                        let droitsEnregistrement = this.props.values.droitEnregistrement

                                                                                        // Rafraîchir ayants droit
                                                                                        // Récupérer la liste des ayant-droits        
                                                                                        axios.get(`http://api.smartsplit.org:8080/v1/rightHolders`)
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
                                                                                                        droitsEnregistrement.push({
                                                                                                            nom: nom,
                                                                                                            ayantDroit: ayantDroit,
                                                                                                            pourcent: `${arrondir(100 / (this.props.values.droitEnregistrement.length + 1))}`,
                                                                                                            auteur: true,
                                                                                                            compositeur: true,
                                                                                                            arrangeur: false,
                                                                                                            color: COLORS[_index]
                                                                                                        })
                                                                                                    }

                                                                                                    if (this.state.mode === MODES.manuel) {
                                                                                                        let _pourcent = (this.pourcentRestant())
                                                                                                        droitsEnregistrement.push({
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
                                                                                                        droitsEnregistrement.push({
                                                                                                            nom: nom,
                                                                                                            ayantDroit: ayantDroit,
                                                                                                            pourcent: "100",
                                                                                                            auteur: true,
                                                                                                            compositeur: true,
                                                                                                            arrangeur: false,
                                                                                                            color: COLORS[_index]
                                                                                                        })
                                                                                                    }

                                                                                                    this.props.setFieldValue('droitEnregistrement', droitsEnregistrement)
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
                                    <div className="ui seven wide column">
                                        <br />
                                        <br />
                                        <br />
                                        <div className="conteneur-beignet fourteen wide field">
                                            {Object.keys(this.state.parts).length < 9 && (<Beignet type="masterNeighboringRightSplit" uuid="1" data={this.state.parts} />)}
                                            {Object.keys(this.state.parts).length >= 9 && (<Histogramme uuid="1" data={this.state.parts} />)}
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