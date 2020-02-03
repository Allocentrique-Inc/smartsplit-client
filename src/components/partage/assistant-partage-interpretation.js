// eslint-disable-next-line
import { AyantsDroit, config, journal } from "../../utils/application"
import React, { Component } from "react"
import { withTranslation } from 'react-i18next'
import { Checkbox } from 'semantic-ui-react'
import Beignet from '../visualisation/partage/beignet'
import { FieldArray } from "formik";
import ChampListeCollaborateurAssistant from "../formulaires/champ-liste-collaborateur"
import BoutonsRadio from "../formulaires/champ-radio"
import "../../assets/scss/page-assistant/pages-assistant-partage.scss" //Mettre tout le CSS là
import { StarSVG } from "../svg/SVG";
import closeIcon from "../../assets/svg/icons/x.svg";
import EntetePartage from "./entete-partage"
const MODES = { egal: "0", role: "1" }
const TYPE = { principal: "0", accompagnement: "1" }
const COLORS = ["#BCBBF2", "#D9ACF7", "#EBB1DC", "#FFAFA8", "#FCB8C5", "#FAC0AE", "#FFD0A9", "#F8EBA3", "#C6D9AD", "#C6F3B6", "#93E9E4", "#91DDFE", "#A4B7F1"]

// eslint-disable-next-line
const NOM = "PageAssistantPartageInterpretation"

const arrondir = function (nombre) {
    return Math.round(nombre * 10000) / 10000
}

class PageAssistantPartageInterpretation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: [],
            mode: MODES.role,
            principaux: [],
            accompagnement: [],
            song: "",
            media: props.media
        }
        this.ajouterCollaborateur = this.ajouterCollaborateur.bind(this)
    }

    componentDidMount() {
        this.setState({ parts: this.props.values.droitInterpretation })
        this.setState({ song: this.props.values.media.title })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.values.droitInterpretation !== nextProps.values.droitInterpretation) {
            this.setState({ parts: nextProps.values.droitInterpretation })
        }
        if (this.props.ayantsDroit !== nextProps.ayantsDroit) {
            this.setState({ ayantsDroit: nextProps.ayantsDroit })
        }
        if (this.props.media !== nextProps.media) {
            this.setState({ media: nextProps.media })
        }
    }

    recalculerPartage() {
        let pourcent = 100.00, _parts
        switch (this.state.mode) {
            case MODES.egal:
                // Calcul le pourcentage égal
                _parts = this.props.values.droitInterpretation
                pourcent = arrondir(pourcent / (_parts.length))
                // Applique le pourcentage aux données existantes
                _parts.forEach((elem, idx) => {
                    _parts[idx].nom = elem.nom
                    _parts[idx].pourcent = `${pourcent}`
                })
                this.props.setFieldValue("droitInterpretation", _parts)
                break
            case MODES.role:
                let principaux = [], accompagnement = []
                this.state.parts.forEach(elem => {
                    if (elem.principal) {
                        principaux.push(elem.nom)
                    } else {
                        accompagnement.push(elem.nom)
                    }
                })
                // Calcul des parts principales et d'accompagnement.
                // Applique la règle du 80% / 20%, sauf si tous sont principaux ou tous accompagnateurs (ce sera alors 100%)
                let pctPrincipaux = 80, pctAccompagnement = 20

                if (accompagnement.length === 0) {
                    pctPrincipaux = 100
                    pctAccompagnement = 0
                }

                if (principaux.length === 0) {
                    pctAccompagnement = 100
                    pctPrincipaux = 0
                }

                let pctPrincipalParCollaborateur = principaux.length > 0 ? pctPrincipaux / principaux.length : 0
                let pctAccompagnementParCollaborateur = accompagnement.length > 0 ? pctAccompagnement / accompagnement.length : 0
                let _pP = 0, _pA = 0
                _parts = this.state.parts
                this.state.parts.forEach((elem, idx) => {
                    _pP = (principaux.includes(elem.nom) ? pctPrincipalParCollaborateur : 0)
                    _pA = (accompagnement.includes(elem.nom) ? pctAccompagnementParCollaborateur : 0)
                    _parts[idx].pourcent = `${arrondir(_pP + _pA)}`
                })
                this.props.setFieldValue("droitInterpretation", _parts)
                this.setState({ parts: _parts })                
                break;
            default:
        }
    }

    ajouterCollaborateur(arrayHelpers) {
        let ayants = {}
        let _coll = this.props.values.collaborateur
        if (_coll) {
            let ayantDroit = this.state.ayantsDroit[_coll], 
                nom = AyantsDroit.affichageDuNom(ayantDroit)
            let _index = this.props.values.droitAuteur.length +
                this.props.values.droitInterpretation.length +
                this.props.values.droitEnregistrement.length
            this.props.values.droitAuteur.forEach(droit => {
                ayants[droit.ayantDroit.rightHolderId] = droit["color"]
            })
            if (this.state.mode === MODES.egal) {
                if (_coll in ayants) {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: `${arrondir(100 / (this.props.values.droitInterpretation.length + 1))}`,
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: ayants[_coll]
                    })
                } else {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: `${arrondir(100 / (this.props.values.droitInterpretation.length + 1))}`,
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: COLORS[_index]
                    })
                    ayants[_coll] = COLORS[_index]
                }
            }
            if (this.state.mode === MODES.role) {
                if (_coll in ayants) {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: "100",
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: ayants[_coll]
                    })
                } else {
                    arrayHelpers.insert(0, {
                        nom: nom,
                        ayantDroit: ayantDroit,
                        pourcent: "100",
                        principal: true,
                        chanteur: false,
                        musicien: false,
                        color: COLORS[_index]
                    })
                    ayants[_coll] = COLORS[_index]
                }
            }
            this.props.setFieldValue('collaborateur', '')
            this.setState({ ping: true }, () => {
                this.recalculerPartage()
            })
        }
    }

    render() {
        let descriptif
        let t = this.props.t, i18n = this.props.i18n
        if (i18n.language.substring(0, 2) === 'en') {
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
                d’un <i>artiste vedette</i>, celui-ci conserve 80% tandis que le 20% restant est
                partagé parmi ses accompagnateurs, le cas échéant.
            </div>)
        }

        return (            
            <React.Fragment>
                <EntetePartage 
                    values={this.props.values} 
                    enregistrerEtAllerAuSommaire={this.props.enregistrerEtAllerAuSommaire}
                    user={this.props.user} 
                    media={this.state.media} 
                    currentPage={2} />
                <div className="ui grid">
                    <div className="ui row" />
                    <div className="ui row">
                        <div className="ui seven wide column">
                            <div className="wizard-title">
                                <StarSVG />{t('flot.split.documente-ton-oeuvre.documenter.entete.interpretation')}</div>
                            <br />
                            <div className="mode--partage__auteur">
                                <div className="who-invented-title">
                                    {t('flot.split.partage.interprete.titre', { titre: this.state.song })}
                                </div>
                                <br />
                                {descriptif}
                                <br />
                                <div className="fields">
                                    <div className="fourteen wide field">
                                        <p style={{ height: "30px" }} />
                                        <FieldArray
                                            name="droitInterpretation"
                                            render={arrayHelpers => (
                                                <div>
                                                    <div style={{ margin: "0 auto", height: "100px" }}>
                                                        <div className="ui grid">
                                                            <div className="ui row">
                                                                <div className="ui sixteen wide column">
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
                                                                        collaborateurs={this.props.values.droitInterpretation}
                                                                        fnSelect={
                                                                            () => {
                                                                                this.ajouterCollaborateur(arrayHelpers)
                                                                            }
                                                                        }
                                                                        fn={(_aD) => {
                                                                            // Fonction de rappel à la modale ModifyUser
                                                                            // Ajoute le nouvel ayantdroit à la liste comme si il était déjà
                                                                            // dans la liste.
                                                                            this.props.setFieldValue('collaborateur', _aD)
                                                                            let droitsInterpretation = this.props.values.droitInterpretation
                                                                            // Rafraîchir ayants droit
                                                                            // Récupérer la liste des ayant-droits
                                                                            AyantsDroit.rafraichirListe( ()=>{
                                                                                this.setState({ayantsDroit: AyantsDroit.ayantsDroit}, ()=>{
                                                                                    let ayantDroit = this.state.ayantsDroit[this.props.values.collaborateur]
                                                                                    let nom = AyantsDroit.affichageDuNom(ayantDroit)                                                                                    
                                                                                    let _index = this.props.values.droitAuteur.length +
                                                                                        this.props.values.droitInterpretation.length +
                                                                                        this.props.values.droitEnregistrement.length
                                                                                    if (this.state.mode === MODES.egal) {
                                                                                        droitsInterpretation.push({
                                                                                            nom: nom,
                                                                                            ayantDroit: ayantDroit,
                                                                                            pourcent: `${arrondir(100 / (this.props.values.droitInterpretation.length + 1))}`,
                                                                                            auteur: true,
                                                                                            compositeur: true,
                                                                                            arrangeur: false,
                                                                                            color: COLORS[_index]
                                                                                        })
                                                                                    }
                                                                                    if (this.state.mode === MODES.manuel) {
                                                                                        let _pourcent = (this.pourcentRestant())
                                                                                        droitsInterpretation.push({
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
                                                                                        droitsInterpretation.push({
                                                                                            nom: nom,
                                                                                            ayantDroit: ayantDroit,
                                                                                            pourcent: "100",
                                                                                            auteur: true,
                                                                                            compositeur: true,
                                                                                            arrangeur: false,
                                                                                            color: COLORS[_index]
                                                                                        })
                                                                                    }

                                                                                    this.props.setFieldValue('droitInterpretation', droitsInterpretation)
                                                                                    this.props.setFieldValue('collaborateur', '')
                                                                                    this.setState({ ping: true }, () => {
                                                                                        this.recalculerPartage()
                                                                                    })
                                                                                })
                                                                            })
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        this.state.ayantsDroit && this.props.values.droitInterpretation.map((part, index) => {
                                                            let roles = [
                                                                { id: "chanteur", nom: t('flot.split.documente-ton-oeuvre.partage.interprete.role.chanteur') },
                                                                { id: "musicien", nom: t('flot.split.documente-ton-oeuvre.partage.interprete.role.musicien') }
                                                            ]                                                        
                                                            let _aD = part.ayantDroit
                                                            let avatar = `${config.IMAGE_SRV_URL}faceapp.jpg`
                                                            if (_aD.avatar) {
                                                                avatar = _aD.avatar.dataUri
                                                            }
                                                            return (
                                                                <div key={`part-${index}`}>
                                                                    <div className="gray-fields">
                                                                        <div className="ui grid">
                                                                            <div className="ui row">
                                                                            <div
                                                                                    className="ui three wide column">
                                                                                    <div
                                                                                        className="avatar-image">
                                                                                        <img
                                                                                            alt=""
                                                                                            className="ui spaced avatar image"
                                                                                            src={avatar} />
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="ui twelve wide column">
                                                                                    <div
                                                                                        className="holder-name">
                                                                                        {part.nom}
                                                                                        
                                                                                        <div className="ui one wide column">
                                                                                        {/* À remplacer éventuellement par l'icône PlusHorizontalSVG */}
                                                                                        <div className="close-icon cliquable" onClick={() => {
                                                                                                arrayHelpers.remove(index)
                                                                                                this.setState({ ping: true }, () => {
                                                                                                    this.recalculerPartage()
                                                                                                })
                                                                                            }
                                                                                            }>
                                                                                        <img src={closeIcon} alt={"close"} style={{ position: "absolute", top: "0", right: "20px" }} />
                                                                                    </div>
                                                                                    </div>
                                                                                    </div>
                                                                                        <div className="ui divider"></div>
                                                                                        <BoutonsRadio
                                                                                            style={{ display: "inline-flex" }}
                                                                                            className="ten wide column"
                                                                                            titre=""
                                                                                            name={`type_interpretation_${index}`}
                                                                                            actif={part.principal ? TYPE.principal : TYPE.accompagnement} // Attribut dynamique
                                                                                            onClick={(e) => {
                                                                                                if (this.state.mode === MODES.role) {
                                                                                                    let valeur
                                                                                                    // Clic de la puce ou de l'étiquette ?
                                                                                                    if (e.target.nodeName === 'LABEL') {
                                                                                                        valeur = e.target.parentNode.childNodes[0].value
                                                                                                    }
                                                                                                    if (e.target.nodeName === 'INPUT') {
                                                                                                        valeur = e.target.value
                                                                                                    }
                                                                                                    this.props.setFieldValue(`droitInterpretation[${index}].principal`, valeur === TYPE.principal)
                                                                                                    this.setState({ ping: true }, () => {
                                                                                                        this.recalculerPartage()
                                                                                                    })
                                                                                                }
                                                                                            }}
                                                                                            disabled={this.state.mode !== MODES.role}
                                                                                            choix={[
                                                                                                {
                                                                                                    nom: t("flot.split.documente-ton-oeuvre.documenter.options.question1-choix-a"),
                                                                                                    valeur: TYPE.principal
                                                                                                },
                                                                                                {
                                                                                                    nom: t("flot.split.documente-ton-oeuvre.documenter.options.question1-choix-b"),
                                                                                                    valeur: TYPE.accompagnement
                                                                                                }
                                                                                            ]}
                                                                                        />
                                                                                    <div className="coches--role__droit">
                                                                                        {
                                                                                            roles.map((elem, idx) => {
                                                                                                return (
                                                                                                    <Checkbox
                                                                                                        key={`coche_role_droit_interpretation_${index}_${idx}`}
                                                                                                        label={elem.nom}
                                                                                                        checked={this.props.values.droitInterpretation[index][elem.id]}
                                                                                                        onClick={(e) => {
                                                                                                            if (e.currentTarget.className.includes("checked")) {
                                                                                                                this.props.setFieldValue(`droitInterpretation[${index}][${elem.id}]`, false)
                                                                                                            } else {
                                                                                                                this.props.setFieldValue(`droitInterpretation[${index}][${elem.id}]`, true)
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
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="blank-text">A</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
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
                                <Beignet type="performanceNeighboringRightSplit" uuid="interpretation--beignet" data={this.state.parts} />                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withTranslation()(PageAssistantPartageInterpretation)