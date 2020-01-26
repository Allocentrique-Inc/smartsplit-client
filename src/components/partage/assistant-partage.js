import { AyantsDroit, config, journal, utils, Identite } from '../../utils/application'
import React, { Component } from 'react'
import { Wizard } from "semantic-ui-react-formik-iptoki"
import { withTranslation } from 'react-i18next'
import PageAssistantPartageDroitAuteur from './assistant-partage-auteur'
import PageAssistantPartageDroitInterpretation from './assistant-partage-interpretation'
import PageAssistantPartageDroitEnregistrement from './assistant-partage-enregistrement'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Login from '../auth/Login'
import { Modal, Button } from 'semantic-ui-react'
import Declaration from '../auth/Declaration'
import closeIcon from "../../assets/svg/icons/x.svg";
import "../../assets/scss/page-assistant/modal.scss";
import positiveImage from "../../assets/images/positive.png";

const NOM = "AssistantPartage"

const ROLES = {
    COMPOSITEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a31",
    AUTEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a33",
    ARRANGEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a32",
    ACCOMPAGNEMENT: "45745c60-7b1a-11e8-9c9c-2d42b21b1a37",
    PRODUCTEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a40",
    REALISATEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a41",
    STUDIO: "45745c60-7b1a-11e8-9c9c-2d42b21b1a42",
    GRAPHISTE: "45745c60-7b1a-11e8-9c9c-2d42b21b1a43",
    CHANTEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a35",
    MUSICIEN: "45745c60-7b1a-11e8-9c9c-2d42b21b1a36"
}

class AssistantPartage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaId: this.props.mediaId,
            uuid: this.props.uuid,
            user: null,
            currentWizardPage: 0 //Set
        }
        this.enregistrerEtAllerAuSommaire = this.enregistrerEtAllerAuSommaire.bind(this)
        this.soumettre = this.soumettre.bind(this)
        this.modaleFin = this.modaleFin.bind(this)
    }

    componentWillMount() {
        if (Identite.usager) {
            this.setState({ ayantsDroit: AyantsDroit.ayantsDroit })                
            this.setState({ user: Identite.usager })
            if (this.state.mediaId) {
                // Une nouvelle proposition pour un média                
                // Récupérer la dernière proposition pour le média                
                axios.get(`${config.API_URL}proposal/derniere-proposition/${this.state.mediaId}`)
                    .then(res => {
                        // Si elle existe, configuration de l'assistant avec cette dernière
                        if (res.data) {
                            this.setState({ proposition: res.data })
                        }
                    })
                    .catch(err => {
                        journal.error(NOM, err)
                    })
                    .finally(() => {
                        this.recupererOeuvre()
                    })
            } else if (this.state.uuid) {
                // Une proposition existante, poursuite de la proposition BROUILLON
                axios.get(`${config.API_URL}proposal/${this.state.uuid}`)
                .then(res => {
                    let proposal = res.data.Item
                    this.setState({ proposition: proposal }, () => {
                        this.setState({ mediaId: proposal.mediaId }, () => {
                            this.recupererOeuvre()
                        })
                    })
                })
                .catch((err) => {
                    journal.error(NOM, err)
                })
            }
        } else {
            this.modaleConnexion()
        }
            
    }

    recupererOeuvre() {
        // Récupérer le média
        axios.get(`${config.API_URL}media/${this.state.mediaId}`)
            .then(res => {
                let media = res.data.Item;
                this.setState({ media: media });
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    soumettre(t, values, etat, cb, sansBlocage) {
        if (this.state.user) {            
            // 1. Récupérer la liste des ayant-droits
            let _association = AyantsDroit.ayantsDroit
            // 2. Générer la structure à envoyer à Dynamo
            let droitEnregistrement = [];
            let droitInterpretePrincipal = [];
            let droitInterpreteAccompagnement = [];
            let droitAuteurMusique = [];
            let droitAuteurParoles = [];
            values.droitAuteur.forEach(elem => {
                let _rH = _association[elem.ayantDroit.rightHolderId]
                let uuid = _rH.rightHolderId
                if (elem.arrangeur || elem.compositeur) {
                    let roles = {}
                    if (elem.compositeur) {
                        roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a31"] = "composer"
                    }
                    if (elem.arrangeur) {
                        roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a32"] = "remixer"
                    }
                    droitAuteurMusique.push({
                        "rightHolder": {
                            "name": elem.nom,
                            "rightHolderId": uuid,
                            "color": elem.color
                        },
                        "voteStatus": "active",
                        "contributorRole": roles,
                        "splitPct": `${elem.pourcentMusique}`
                    })
                }
                if (elem.auteur) {
                    let roles = { "45745c60-7b1a-11e8-9c9c-2d42b21b1a33": "songwriter" }
                    droitAuteurParoles.push({
                        "rightHolder": {
                            "name": elem.nom,
                            "rightHolderId": uuid,
                            "color": elem.color
                        },
                        "voteStatus": "active",
                        "contributorRole": roles,
                        "splitPct": `${elem.pourcentParoles}`
                    }
                    )
                }
            })
            values.droitInterpretation.forEach(elem => {
                let _rH = _association[elem.ayantDroit.rightHolderId]
                let uuid = _rH.rightHolderId
                if (elem.principal) {
                    let roles = { "45745c60-7b1a-11e8-9c9c-2d42b21b1a38": "principal" }
                    if (elem.chanteur) {
                        roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a35"] = "singer"
                    }
                    if (elem.musicien) {
                        roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a36"] = "musician"
                    }
                    droitInterpretePrincipal.push({
                        "rightHolder": {
                            "name": elem.nom,
                            "rightHolderId": uuid,
                            "color": elem.color
                        },
                        "voteStatus": "active",
                        "contributorRole": roles,
                        "splitPct": `${elem.pourcent}`
                    })
                } else {
                    let roles = { "45745c60-7b1a-11e8-9c9c-2d42b21b1a37": "accompaniment" }
                    if (elem.chanteur) {
                        roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a35"] = "singer"
                    }
                    if (elem.musicien) {
                        roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a36"] = "musician"
                    }
                    droitInterpreteAccompagnement.push({
                        "rightHolder": {
                            "name": elem.nom,
                            "rightHolderId": uuid,
                            "color": elem.color
                        },
                        "voteStatus": "active",
                        "contributorRole": roles,
                        "splitPct": `${elem.pourcent}`
                    })
                }
            })
            values.droitEnregistrement.forEach(elem => {
                let _rH = _association[elem.ayantDroit.rightHolderId]
                let uuid = _rH.rightHolderId
                let roles = {}
                if (elem.producteur) {
                    roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a40"] = "producer"
                }
                if (elem.realisateur) {
                    roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a41"] = "director"
                }
                if (elem.studio) {
                    //roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a42"] = "studio"
                    roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a42"] = "studio"
                }
                if (elem.graphiste) {
                    roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a43"] = "graphist"
                }
                droitEnregistrement.push({
                    "rightHolder": {
                        "name": elem.nom,
                        "rightHolderId": uuid,
                        "color": elem.color
                    },
                    "voteStatus": "active",
                    "contributorRole": roles,
                    "splitPct": `${elem.pourcent}`
                })
            })
            if (!sansBlocage && values.droitAuteur.length + values.droitInterpretation.length + values.droitEnregistrement.length === 0) {
                toast.warn(t('info.partage.vide'))
            } else {
                let body = {
                    uuid: "",
                    mediaId: parseInt(`${this.state.mediaId}`),
                    initiatorUuid: this.state.user.username,
                    initiatorName: `${this.state.user.attributes.given_name} ${this.state.user.attributes.family_name}`,
                    rightsSplits: {
                        "workCopyrightSplit": {
                            "lyrics": droitAuteurParoles,
                            "music": droitAuteurMusique
                            
                        },
                        "performanceNeighboringRightSplit": {
                            "principal": droitInterpretePrincipal,
                            "accompaniment": droitInterpreteAccompagnement
                        },
                        "masterNeighboringRightSplit": {
                            "split": droitEnregistrement
                        }
                    },
                    "comments": [],
                    "etat": etat
                }
                body.comments.push({ rightHolderId: this.state.user.username, comment: "Initiateur du split" })
                if (values.uuid && values.uuid !== "") {
                    // Reprise d'une proposition existante
                    // 3a. Soumettre la nouvelle proposition en PUT
                    body.uuid = values.uuid
                    axios.put(`${config.API_URL}proposal/${body.uuid}`, body)
                        .then(res => {
                            // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
                            if (typeof cb === "function") {
                                cb()
                            } else {
                                this.modaleFin()
                            }
                        })
                        .catch(err => {
                            journal.error(NOM, err)
                        })
                } else {
                    // 3b. Soumettre la nouvelle proposition en POST
                    axios.post(`${config.API_URL}proposal`, body)
                        .then(res => {
                            // toast.success(`${res.data}`)
                            // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
                            if (typeof cb === "function") {
                                cb()
                            } else {
                                this.modaleFin()
                            }
                        })
                        .catch(err => {
                            journal.error(NOM, err)
                        })
                }
            }
            if (typeof cb === "function") {
                setTimeout(() => {
                    cb()
                }, 1000)
            }
        }
    }

    modaleConnexion(ouvert = true) {
        this.setState({ modaleConnexion: ouvert })
    }

    modaleDeclaration(ouvert = true, fn) {
        this.setState({ fnSoumettre: fn }, () => {
            this.setState({ modaleDeclaration: ouvert })
        })
    }    

    enregistrerEtAllerAuSommaire(t, valeurs, mediaId) {
        this.soumettre(t, valeurs, "BROUILLON", () => {
            utils.naviguerVersAccueil()
        }, true)
    }

    modaleFin(ouvert = true) {
        this.setState({ modaleFin: ouvert })
    }

    render() {

        let lectureSeule

        let that = this

        if (this.state.media && this.state.ayantsDroit) {
            let valeursInitiales = { droitAuteur: [], droitInterpretation: [], droitEnregistrement: [] }
            if (this.state.proposition) {

                if (this.state.proposition.etat !== 'BROUILLON' && this.state.proposition.etat !== 'PRET' && this.state.proposition.etat !== 'REFUSE') {
                    lectureSeule = true
                }

                // Ordonner les valeurs initiales
                let _rS = this.state.proposition.rightsSplits
                let _droit = {
                    auteur: {},
                    interpretation: {},
                    enregistrement: {}
                }
                function creerAd(elem) {
                    if (that.state.ayantsDroit) {
                        return { nom: elem.rightHolder.name, pourcent: 0.00, ayantDroit: that.state.ayantsDroit[elem.rightHolder.rightHolderId] }
                    }
                }
                // Droit d'auteur
                _rS.workCopyrightSplit.music.forEach(elem => { // Musique
                    if (!_droit.auteur[elem.rightHolder.rightHolderId]) {
                        _droit.auteur[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcentMusique = parseFloat(elem.splitPct)
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.auteur[elem.rightHolder.rightHolderId].pourcent
                    _droit.auteur[elem.rightHolder.rightHolderId].arrangeur = elem.contributorRole[ROLES.ARRANGEUR] ? true : false
                    _droit.auteur[elem.rightHolder.rightHolderId].compositeur = elem.contributorRole[ROLES.COMPOSITEUR] ? true : false
                    _droit.auteur[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })
                _rS.workCopyrightSplit.lyrics.forEach(elem => { // Paroles
                    if (!_droit.auteur[elem.rightHolder.rightHolderId]) {
                        _droit.auteur[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcentParoles = parseFloat(elem.splitPct)
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.auteur[elem.rightHolder.rightHolderId].pourcent
                    _droit.auteur[elem.rightHolder.rightHolderId].auteur = elem.contributorRole[ROLES.AUTEUR] ? true : false
                    _droit.auteur[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })

                // Droit d'interprétation
                _rS.performanceNeighboringRightSplit.principal.forEach(elem => { // Principal
                    if (!_droit.interpretation[elem.rightHolder.rightHolderId]) {
                        _droit.interpretation[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.interpretation[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.interpretation[elem.rightHolder.rightHolderId].pourcent
                    _droit.interpretation[elem.rightHolder.rightHolderId].principal = true
                    _droit.interpretation[elem.rightHolder.rightHolderId].chanteur = elem.contributorRole[ROLES.CHANTEUR] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].musicien = elem.contributorRole[ROLES.MUSICIEN] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })
                _rS.performanceNeighboringRightSplit.accompaniment.forEach(elem => { // Accompagnement
                    if (!_droit.interpretation[elem.rightHolder.rightHolderId]) {
                        _droit.interpretation[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.interpretation[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.interpretation[elem.rightHolder.rightHolderId].pourcent
                    _droit.interpretation[elem.rightHolder.rightHolderId].accompaniment = true
                    _droit.interpretation[elem.rightHolder.rightHolderId].chanteur = elem.contributorRole[ROLES.CHANTEUR] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].musicien = elem.contributorRole[ROLES.MUSICIEN] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })
                // Droit d'enregistrement
                _rS.masterNeighboringRightSplit.split.forEach(elem => { // Split
                    if (!_droit.enregistrement[elem.rightHolder.rightHolderId]) {
                        _droit.enregistrement[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.enregistrement[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct)
                    _droit.enregistrement[elem.rightHolder.rightHolderId].studio = elem.contributorRole[ROLES.STUDIO] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].producteur = elem.contributorRole[ROLES.PRODUCTEUR] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].realisateur = elem.contributorRole[ROLES.REALISATEUR] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].graphiste = elem.contributorRole[ROLES.GRAPHISTE] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })

                // Construction des valeurs initiales
                Object.keys(_droit.auteur).forEach(elem => { valeursInitiales.droitAuteur.push(_droit.auteur[elem]) })
                Object.keys(_droit.interpretation).forEach(elem => { valeursInitiales.droitInterpretation.push(_droit.interpretation[elem]) })
                Object.keys(_droit.enregistrement).forEach(elem => { valeursInitiales.droitEnregistrement.push(_droit.enregistrement[elem]) })
            }

            let t = this.props.t

            return (                
                <>
                    <div className="ui grid" style={{ padding: "10px" }}>
                        {
                            lectureSeule && (
                                <script>
                                    setTimeout(()=>{toast.info(t('flot.split.partage.lecture-seule'))})
                            </script>
                            )
                        }
                        <div className="ui row">
                            <div className="ui two wide column" />
                            <div className="ui twelve wide column">
                                <Wizard
                                    initialValues={{
                                        droitAuteur: valeursInitiales.droitAuteur,
                                        droitInterpretation: valeursInitiales.droitInterpretation,
                                        droitEnregistrement: valeursInitiales.droitEnregistrement,
                                        collaborateur: "",
                                        uuid: this.state.uuid,
                                        media: this.state.media
                                    }}
                                    pochette={this.props.pochette}
                                    ButtonsWrapper={(props) => <div style={{
                                        position: "fixed",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        paddingTop: "15px",
                                        background: "#fff",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                                        pochette: this.state.pochette
                                    }}>
                                        <div className="ui grid">
                                            <div className="ui row">
                                                <div className="ui eight wide column">{props.children}</div>
                                            </div>
                                        </div>
                                    </div>}
                                    buttonLabels={{ previous: t('navigation.retour'), next: t('navigation.suivant'), submit: t('navigation.envoi') }}
                                    debug={false}
                                    onPageChanged={index => this.setState({ currentWizardPage: index })}
                                    onSubmit={
                                        (values, actions) => {
                                            actions.setSubmitting(false)
                                            if (!lectureSeule) {
                                                this.modaleDeclaration(true, () => {
                                                    this.soumettre(t, values, "PRET")
                                                })
                                            }
                                        }
                                    }
                                >

                                    <Wizard.Page>
                                        <PageAssistantPartageDroitAuteur 
                                            ayantsDroit={this.state.ayantDroits} 
                                            enregistrerEtAllerAuSommaire={this.enregistrerEtAllerAuSommaire}
                                            user={this.state.user}
                                            media={this.state.media} />
                                    </Wizard.Page>

                                    <Wizard.Page>
                                        <PageAssistantPartageDroitInterpretation 
                                            ayantsDroit={this.state.ayantDroits} 
                                            enregistrerEtAllerAuSommaire={this.enregistrerEtAllerAuSommaire}
                                            user={this.state.user}
                                            media={this.state.media} />
                                    </Wizard.Page>

                                    <Wizard.Page>
                                        <PageAssistantPartageDroitEnregistrement 
                                            ayantsDroit={this.state.ayantDroits} 
                                            enregistrerEtAllerAuSommaire={this.enregistrerEtAllerAuSommaire}
                                            user={this.state.user}
                                            media={this.state.media} />
                                    </Wizard.Page>

                                </Wizard>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.user &&
                        <Declaration
                            firstName={this.state.user.attributes.given_name}
                            lastName={this.state.user.attributes.family_name}
                            artistName={this.state.user.attributes["custom:artistName"]}
                            songTitle={this.state.media.title}
                            open={this.state.modaleDeclaration}
                            onClose={() => this.modaleDeclaration(false)}                                        
                            fn={() => {
                                this.state.fnSoumettre()

                            }} />
                    }
                    <Modal open={this.state.modaleFin} onClose={() => this.modaleFin(false)}>
                        <div className="modal-navbar">
                            <div className="leftModal">
                                <div className="title" style={{ width: "464px" }}>{t("flot.fin.partageCree")}</div>
                            </div>

                            <div className="rightModal" style={{ paddingRight: "10px" }}>
                                <div className="close-icon cliquable" onClick={this.props.onClose}>
                                    <img src={closeIcon} alt={"close"} style={{ float: "right" }} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-content">
                            <img
                                className={"success-image"}
                                src={positiveImage}
                                alt={"Positive"}
                            />

                            <h4 className={"h4-style"}>
                                {t("flot.fin.maintenantPartage")}
                            </h4>
                            {this.props.i18n.language.substring(0, 2) === "en" && (
                                <p className={"description"}>
                                    Hourray, your successfully created a share proposal. <em>Click</em> on the button below
                        to <em>review</em> it's content and to <em>send by email</em> to your collaborators.
                        </p>
                            )}
                            {this.props.i18n.language.substring(0, 2) !== "en" && (
                                <p className={"description"}>
                                    Bravo, tu as créé une proposition de partage de droits avec succès ! <em>Clique</em> sur
                                    le bouton ci-dessous afin de <em>revoir</em> et <em>envoyer par courriel</em> la proposition 
                                    à tes collaborateurs.
                                </p>
                            )}
                        </div>
                        <div className={"modal-bottom-bar"}>
                            <a href={`/partager/${this.state.mediaId}`}>
                                <Button>{t("flot.fin.partage")}</Button>
                            </a>
                        </div>
                    </Modal>
                </>                   
            )
        } else {
            return (
                <div>
                    <Modal
                        open={this.state.modaleConnexion}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                        onClose={() => { this.modaleConnexion(false) }}
                        size="small" >
                        <br /><br /><br />
                        <Login fn={() => {
                            if(Identite.usager) {
                                this.setState({ user: Identite.usager }, () => {
                                    this.recupererOeuvre()
                                })
                            }                            
                        }} />
                    </Modal>
                </div>
            )
        }

    }
}

export default withTranslation()(AssistantPartage)
