import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { withTranslation } from 'react-i18next'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Login from '../auth/Login'
import { Accordion } from 'semantic-ui-react'
import SommairePartage from './partage-sommaire'
import PageAssistantSplitCourrielsCollaborateurs from '../split/assistant-split-courriel-collaborateurs'
import { Modal, Button } from 'semantic-ui-react'
import moment from 'moment'
import SommairePartagesEditeur from './sommaire-partages-editeur'
import ModaleConnexion from '../auth/Connexion'
import ModalPropositionEnCours from '../modales/modale-proposition-encours'
import InfoBulle from '../partage/InfoBulle';
import "../../assets/scss/tableaudebord/tableaudebord.scss";
import Navbar from '../navigation/navbar'
// eslint-disable-next-line
import { config, utils, Identite, AyantsDroit, journal } from "../../utils/application"
import { FlecheBasSVG, FlecheHautSVG } from '../svg/SVG.js'
import "../../assets/scss/tableaudebord/tableaudebord.scss";

const PANNEAU_EDITEUR = 1, PANNEAU_PROPOSITIONS = 0
const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']
const ETAT_EDITEUR_NON = 1, ETAT_EDITEUR_OUI = 2, ETAT_EDITEUR_PLUSTARD = 3
// eslint-disable-next-line
const NOM = "SommairePartages"

class SommairePartages extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId,
            activeIndex: 0,
            panneau: PANNEAU_PROPOSITIONS,
            modaleConnexion: false,
            modaleNouvelle: false,
            modaleCourriels: props.envoyer
        }
        this.initialisation = this.initialisation.bind(this)
        this.clic = this.clic.bind(this)
        this.afficherPanneauEditeur = this.afficherPanneauEditeur.bind(this)
        this.afficherPanneauPropositions = this.afficherPanneauPropositions.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.modalePropositionEnCours = this.modalePropositionEnCours.bind(this)
        this.fermerInfobulleEditeur = this.fermerInfobulleEditeur.bind(this)
        moment.defaultFormat = "DD-MM-YYYY HH:mm"
    }

    componentWillMount() {
        if (Identite.usager) {
            this.setState({ user: Identite.usager }, () => this.initialisation())
        } else {
            this.setState({ modaleConnexion: true })
        }
    }

    afficherPanneauEditeur() {
        this.setState({ panneau: PANNEAU_EDITEUR })
    }

    afficherPanneauPropositions() {
        this.setState({ panneau: PANNEAU_PROPOSITIONS })
    }

    closeModal = () => this.setState({ modaleCourriels: false })
    openModal = () => this.setState({ modaleCourriels: true })

    async initialisation() {
        let res = await axios.get(`${config.API_URL}media/${this.state.mediaId}`)
        this.setState({ media: res.data.Item }, async () => {
            let _res = await axios.get(`${config.API_URL}proposal/media/${this.state.mediaId}`)
            let _rAd = AyantsDroit.ayantsDroit[this.state.user.username]
            this.setState({ ayantDroit: _rAd }, () => {
                this.setState({ propositions: _res.data })
                this.setState({ activeIndex: _res.data.length - 1 })
                let _ps = _res.data
                _ps.forEach(p => {
                    if (p.etat === 'ACCEPTE') {
                        axios.get(`${config.API_URL}splitShare/${p.uuid}/${this.state.user.username}`)
                            .then(res => this.setState({ partEditeur: res.data }))
                    }
                })
            })
        })
    }

    clic = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    ajouterNouvelleOeuvre() {
        this.setState({ modaleNouvelle: true })
    }

    modalePropositionEnCours(ouvrir = true) {
        this.setState({ modalePropositionEnCours: ouvrir })
    }

    fermerInfobulleEditeur(etat) {
        switch (etat) {
            case ETAT_EDITEUR_NON:
                this.setState({ fermerInfobulleEditeur: true })
                this.setState({ editeur: false })
                break;
            case ETAT_EDITEUR_OUI:
                this.setState({ fermerInfobulleEditeur: true })
                this.setState({ editeur: true })
                break;
            case ETAT_EDITEUR_PLUSTARD:
                this.setState({ fermerInfobulleEditeur: true })
                break;
            default:

        }
    }

    render() {

        let t = this.props.t, i18n = this.props.i18n

        if (this.state.propositions && this.state.media) {

            let propositions = []
            let _p0

            // Trouver _p0, la proposition la plus récente
            // elem fait référence à un élément qu'on assigne
            this.state.propositions.forEach(elem => {
                if (!_p0 || _p0._d < elem._d) { _p0 = elem }
            })

            let _rafraichir = false

            if (_p0 && _p0.etat === 'VOTATION') {
                // _rafraichir = true // Désactivation du rafraîchissment automatique
            }

            propositions = this.state.propositions.map((elem, idx) => {
                const accordionIsOpen = idx === this.state.activeIndex;
                return (
                    <div className="ui row" key={`sommaire_${idx}`} style={{marginBottom: "1rem"}}>
                        <Accordion.Title active={accordionIsOpen} index={idx} onClick={this.clic} style={{border: "1px solid rgba(34,36,38,.15)", padding: "1rem 1rem 1rem 0.5rem"}}>
                            <div className="fleche" style={{paddingRight: "0.5rem", paddingTop: "1rem"}}>
                                {accordionIsOpen ? <FlecheHautSVG /> : <FlecheBasSVG />}
                            </div>
                            <div className="version">                                
                                &nbsp; Version {idx + 1} <span style={{marginLeft: "1rem"}} className={(elem.etat === 'ACCEPTE') ? "sommaire-approuve" : (elem.etat === 'REFUSE') ? "sommaire-desaprouve" : (elem.etat === 'PRET') ? "sommaire-envoie" : "sommaire-attente"}>
                                    {t(`flot.split.etat.${elem.etat}`)}
                                    </span>
                                    </div>
                            <div>
                                <div className="small-400 creation">&nbsp;&nbsp;{t('oeuvre.creePar')}&nbsp;</div>
                                <div className="small-500-color">{`${elem.initiatorName}`}</div>
                                <span className="date sommaire">&nbsp;&nbsp;{i18n.language && elem._d ? moment(new Date(parseInt(elem.creationDate)), moment.defaultFormat).locale(i18n.language.substring(0, 2)).fromNow() : moment(Date.now(), moment.defaultFormat).fromNow()}
                                </span>
                            </div>
                        </Accordion.Title>
                        <Accordion.Content active={accordionIsOpen} style={{padding: "0rem", paddingTop: "1rem", marginBottom: "1rem", borderLeft: "1px solid rgba(34,36,38,.15)", borderRight: "1px solid rgba(34,36,38,.15)", borderBottom: "1px solid rgba(34,36,38,.15)"}} >
                            <SommairePartage ayantDroit={this.state.ayantDroit} uuid={elem.uuid} rafraichirAuto={_rafraichir} />
                        </Accordion.Content>
                    </div>
                )
            })
            propositions = propositions.reverse()

            // eslint-disable-next-line
            let nouveauDisabled = false, envoiDisabled = true, continuerDisabled = true
            let partageEditeur = false

            if (this.state.propositions.length > 0) {
                let _p = this.state.propositions[this.state.propositions.length - 1]
                _p0 = _p
                if (_p.etat !== 'REFUSE' || this.state.propositions.length === 0) {
                    nouveauDisabled = true
                }
                if ((_p.etat === 'BROUILLON' || _p.etat === 'PRET') && _p.initiatorUuid === this.state.user.username) {
                    continuerDisabled = false
                    envoiDisabled = false
                }
                if (_p.etat === 'ACCEPTE') {
                    // Est-ce que l'utilisateur est dans les ayant-droits ?
                    let estCollaborateur = false
                    if (_p.rightsSplits.workCopyrightSplit) {
                        Object.keys(_p.rightsSplits.workCopyrightSplit).forEach(type => {
                            _p.rightsSplits.workCopyrightSplit[type].forEach(part => {
                                if (part.rightHolder.rightHolderId === this.state.user.username) {
                                    estCollaborateur = true
                                }
                            })
                        })
                    }
                    if (estCollaborateur) {
                        partageEditeur = true
                    }
                }
            }

            let souligneInitiateur = this.state.panneau === PANNEAU_PROPOSITIONS
            let souligneCollaborateur = this.state.panneau === PANNEAU_EDITEUR

            let optionsAffichage = !this.state.pochette && (
                <div style={{ display: "inline" }}>
                    <div style={{ paddingBottom: "14px", display: "inline" }} className={`small-500${
                        souligneInitiateur ? "-color souligne" : " secondaire"
                        } ${souligneInitiateur && this.state.pochette ? "pochette" : ""}`}>

                        <span
                            className={`cliquable`}
                            onClick={() => {
                                this.afficherPanneauPropositions()
                            }}
                            style={{ fontSize: "16px", color: souligneInitiateur ? "black" : "" }}
                        >
                            {t('flot.split.documente-ton-oeuvre.tableaudebord.collabo')}
                        </span>
                    </div>
                    <div style={{ paddingBottom: "14px", marginLeft: "40px", display: "inline" }} className={`small-500${
                        souligneCollaborateur ? "-color souligne" : " secondaire"
                        } ${souligneCollaborateur && this.state.pochette ? "pochette" : ""}`}>

                        <InfoBulle
                            style={{backgroundColor: "#FAF8F9"}}
                            className="proposition"
                            declencheur={(
                                <span
                                    className={`cliquable`}
                                    onClick={() => {
                                        if (partageEditeur) this.afficherPanneauEditeur()
                                    }}
                                    style={{ fontSize: "16px", color: souligneCollaborateur ? "black" : "", cursor: !partageEditeur ? "not-allowed" : "pointer" }}
                                >
                                    {t('flot.split.documente-ton-oeuvre.tableaudebord.edito')}
                                </span>
                            )}
                          
                            decoration={
                                <>
                                    <div className="header" style={
                                        {
                                            textAlign: "center",
                                            fontSize: "16px",
                                            color: "black",
                                            margin: "0 auto",
                                            fontFamily: "IBM Plex Sans",
                                            fontWeight: "700",
                                            width: "240px"
                                        }}>
                                        {t("flot.split.documente-ton-oeuvre.tableaudebord.as-tu")}
                                    </div>
                                    <br />
                                    <div className="ui medium button inverse infobulle" style={{ width: "110px", marginLeft: "0px", marginRight: "0px" }}
                                        onClick={() => { this.fermerInfobulleEditeur(ETAT_EDITEUR_NON) }}
                                    >
                                        {t("editeur.non")}
                                    </div>
                                    <div className="ui medium button infobulle" onClick={(e) => {
                                        this.fermerInfobulleEditeur(ETAT_EDITEUR_OUI)
                                        this.afficherPanneauEditeur()
                                        this.setState({ nouvellePropositionEditeur: true })
                                    }}>{t("editeur.oui")}</div>
                                    <div className="panneau">
                                        <div className={`${this.state.pochette ? "pochette" : "smartsplit"} cliquable`} onClick={() => this.fermerInfobulleEditeur(ETAT_EDITEUR_PLUSTARD)}>
                                        {t("flot.split.documente-ton-oeuvre.tableaudebord.later")}</div>
                                    </div>
                                </>
                            }
                            orientation="bottom center"
                            ouvert={partageEditeur && !this.state.fermerInfobulleEditeur}
                        />

                    </div>
                </div>
            )

            // Extraction de la liste des ayants droit de la proposition la plus récente
            // Construction de la structure des données de l'assistant
            let proposition = _p0

            let rightHolders = {}
            let rights = {}

            function traitementDroit(objDroit, type) {
                if (objDroit) {
                    objDroit.forEach(droit => {
                        if (!rightHolders[droit.rightHolder.rightHolderId]) {
                            // Ajout du titulaire dans la table des ayant droits
                            rightHolders[droit.rightHolder.rightHolderId] = droit.rightHolder
                        }
                        // Ajout du droit à l'ayant droit
                        rights[type][droit.rightHolder.rightHolderId] = droit
                    })
                }
            }

            // Extraire les différents ayant-droits et ordonnancement dans un tableau
            TYPE_SPLIT.forEach(type => {
                if (!rights[type]) {
                    rights[type] = {}
                }
                if (proposition && proposition.rightsSplits[type]) {
                    let rightsSplit = proposition.rightsSplits[type]
                    // Séparation de la structure des droits
                    switch (type) {
                        case 'workCopyrightSplit':
                            // lyrics
                            traitementDroit(rightsSplit.lyrics, type)
                            // music
                            traitementDroit(rightsSplit.music, type)
                            break
                        case 'performanceNeighboringRightSplit':
                            //principal
                            traitementDroit(rightsSplit.principal, type)
                            //accompaniment
                            traitementDroit(rightsSplit.accompaniment, type)
                            break
                        case 'masterNeighboringRightSplit':
                            traitementDroit(rightsSplit.split, type)
                            break
                        default:
                    }
                }
            })

            // Désactive le bouton du contrat
            // eslint-disable-next-line
            let contratEnabled = false

            return (
                <div>
                    <Navbar pochette={this.props.pochette}
                        songTitle={this.state.title}
                        progressPercentage={this.state.progressPercentage}
                        profil={this.state.user}
                        media={this.state.media}
                        resume={false}
                        proposition={true}
                        menuProfil={false} />
                        <div className="resume">
                    <div className="ui container">
                        <div className="ui grid sommaire">
                            <div className="ui row">
                                <div className="ui twelve wide column" style={{marginBottom: "0.5rem"}}>
                                    <h1>{t('flot.split.documente-ton-oeuvre.proposition.resume', {titre: this.state.media.title})}</h1>    
                                </div>
                            </div>
                            <div className="ui row affichage" style={{boxShadow: "inset 0px -1px 0px #DCDFE1", marginLeft: "1rem", marginRight: "1rem"}}>
                                <div className="ui sixteen wide column" style={{padding: "0rem"}}>
                                    {optionsAffichage}
                                </div>
                            </div>
                            </div>
                            {
                                this.state.panneau === PANNEAU_PROPOSITIONS &&
                                (
                                    <>
                                        <div className="ui row">
                                            <div className="ui sixteen wide column">
                                                <div className="boutons sommaire">
                                                {
                                                    proposition.etat === 'ACCEPTE' && <div // Affichage désactivé (fonctionnalité à venir)
                                                        className="ui medium button inverse"
                                                        style={{ marginLeft: "0px" }}>
                                                        {t('flot.split.documente-ton-oeuvre.proposition.telecharger-contrat')}</div>
                                                }
                                                <div style={{textAlign: "right"}}>
                                                    {!continuerDisabled && (
                                                        <div className={`ui medium button inverse`} onClick={
                                                            () => {
                                                                utils.naviguerVersNouveauPartage(this.state.mediaId)
                                                            }
                                                        }>
                                                            {t('flot.split.documente-ton-oeuvre.proposition.nouvelle-version')}</div>
                                                        )
                                                    }
                                                    {!envoiDisabled && (
                                                        <div
                                                            onClick={() => this.openModal()}
                                                            className="ui medium button envoyer sommaire">
                                                            {t('flot.split.documente-ton-oeuvre.proposition.envoyer')}</div>
                                                    )}
                                                </div>                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ui row">
                                            <Accordion fluid className="ui sixteen wide column">
                                                {propositions}
                                            </Accordion>
                                        </div>
                                    </>
                                )
                            }
                            {this.state.panneau === PANNEAU_EDITEUR && <SommairePartagesEditeur proposition={_p0} />}
                            {
                                this.state.proposition && this.state.proposition.etat === "VOTATION" && !this.state.jetonApi && (
                                    <script language="javascript">
                                        setTimeout(()=>{
                                            toast.warn(t('flot.split.documente-ton-oeuvre.proposition.voter-avec-jeton'))
                                        })
                                    </script>
                                )
                            }
                        </div>
                    </div>
                    {
                        this.state.media.initiateurPropositionEnCours &&
                        rightHolders[this.state.media.initiateurPropositionEnCours] &&
                        <ModalPropositionEnCours
                            open={this.state.modalePropositionEnCours}
                            titre={this.state.media.title}
                            initiateur={rightHolders[this.state.media.initiateurPropositionEnCours].name}
                            onClose={() => { this.modalePropositionEnCours(false) }} />
                    }
                    <Modal
                        open={this.state.modaleConnexion}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                        onClose={this.props.close}
                        size="small" >
                        <br /><br /><br />
                        <Login fn={() => {
                            if (Identite.usager) {
                                this.setState({ user: Identite.usager })
                                this.setState({ modaleConnexion: false })
                            }
                        }} />
                    </Modal>
                    <Modal
                        open={this.state.modaleCourriels}
                        onClose={this.closeModal}
                        size="small"
                        closeIcon
                    >
                        <Modal.Header>
                            <h2 className="headerFin">{t("flot.split.documente-ton-oeuvre.proposition.titre")}
                                <div
                                    className="close-icon"
                                    onClick={() => { this.closeModal() }} >
                                </div>
                            </h2>
                        </Modal.Header>
                        <Modal.Content className="invitation">
                            {t("flot.split.documente-ton-oeuvre.proposition.sous-titre")}
                            <PageAssistantSplitCourrielsCollaborateurs
                                onRef={m => this.setState({ courrielsCollaborateurs: m })}
                                ayantDroits={rightHolders}
                                propositionId={this.state.propositions[this.state.propositions.length - 1].uuid}
                                close={(cb) => { this.closeModal(); if (cb) cb() }}
                                mediaId={this.state.mediaId}
                            />
                        </Modal.Content>
                        <Modal.Actions>
                            <div className="finaliser">
                                <div
                                    className="ui negative button"
                                    onClick={this.closeModal}
                                >
                                    {t("flot.split.collaborateur.attribut.bouton.annuler")}
                                </div>
                                <Button
                                    onClick={() => {
                                        this.state.courrielsCollaborateurs.handleSubmit()
                                        this.closeModal()
                                    }}
                                    className={`ui medium button envoie`}
                                >
                                    {t("flot.split.documente-ton-oeuvre.proposition.envoyer")}
                                </Button>
                            </div>
                        </Modal.Actions>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div className="tdb--cadre ui row accueil">
                    <ModaleConnexion fn={() => {
                        this.setState({ modaleConnexion: false })
                        this.initialisation()
                    }} parent={this} isOpen={this.state.modaleConnexion} />
                </div>
            )
        }
    }
}

export default withTranslation()(SommairePartages)