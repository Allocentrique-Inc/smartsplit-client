import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { Translation } from 'react-i18next'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'

import Entete from '../entete/entete'
import { Accordion, Icon } from 'semantic-ui-react'
import SommairePartage from './partage-sommaire'

import PageAssistantSplitCourrielsCollaborateurs from '../split/assistant-split-courriel-collaborateurs'

import { Modal, Button } from 'semantic-ui-react'

import moment from 'moment'
import SommairePartagesEditeur from './sommaire-partages-editeur'
import ModaleConnexion from '../auth/Connexion'

import ModalPropositionEnCours from '../modales/modale-proposition-encours'
import placeholder from '../../assets/images/placeholder.png';

import InfoBulle from '../partage/InfoBulle';

import "../../assets/scss/tableaudebord/tableaudebord.scss";

import { StarSVG } from "../svg/SVG";

const PANNEAU_EDITEUR = 1, PANNEAU_PROPOSITIONS = 0
const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

export default class SommairePartages extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId,
            activeIndex: 0,
            panneau: PANNEAU_PROPOSITIONS,
            modaleConnexion: false,
            modaleNouvelle: false,
            modaleCourriels: false,
            editeur: true
        }
        this.initialisation = this.initialisation.bind(this)
        this.clic = this.clic.bind(this)
        this.afficherPanneauEditeur = this.afficherPanneauEditeur.bind(this)
        this.afficherPanneauPropositions = this.afficherPanneauPropositions.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.modalePropositionEnCours = this.modalePropositionEnCours.bind(this)
        this.actionEditeur = this.actionEditeur.bind(this)
        moment.defaultFormat = "DD-MM-YYYY HH:mm"
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
            .then(res => {
                this.setState({ user: res })
                this.initialisation()
            })
            .catch(err => {
                this.setState({ modaleConnexion: true })
            })
    }

    afficherPanneauEditeur() {
        this.setState({ panneau: PANNEAU_EDITEUR })
    }

    afficherPanneauPropositions() {
        this.setState({ panneau: PANNEAU_PROPOSITIONS })
    }

    closeModal = () => this.setState({ modaleCourriels: false })
    openModal = () => this.setState({ modaleCourriels: true })

    initialisation() {
        axios.get(`http://dev.api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
            .then(res => {
                this.setState({ media: res.data.Item }, () => {
                    axios.get(`http://dev.api.smartsplit.org:8080/v1/proposal/media/${this.state.mediaId}`)
                        .then(_res => {
                            axios.get(`http://dev.api.smartsplit.org:8080/v1/rightholders/${this.state.user.username}`)
                                .then(_rAd => {
                                    this.setState({ ayantDroit: _rAd.data.Item }, () => {
                                        this.setState({ propositions: _res.data })
                                        this.setState({ activeIndex: _res.data.length - 1 })
                                        let _ps = _res.data
                                        _ps.forEach(p => {
                                            if (p.etat === 'ACCEPTE') {
                                                axios.get(`http://dev.api.smartsplit.org:8080/v1/splitShare/${p.uuid}/${this.state.user.username}`)
                                                    .then(res => {
                                                        this.setState({ partEditeur: res.data })
                                                    })
                                            }
                                        })
                                    })
                                })
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
    actionEditeur() {
        this.setState({ editeur: false }) // Déjà à false
    } // affecte état, rafraîchi contenu

    render() {
        if (this.state.propositions && this.state.media) {
            let propositions = []

            let imageSrc = placeholder
            if(this.state.media) {
                let elem = this.state.media
                if(elem.files && elem.files.cover && elem.files.cover.files && elem.files.cover.files.length > 0) {
                    elem.files.cover.files.forEach(e=>{
                        if(e.access === 'public') {
                            imageSrc = `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${elem.mediaId}/cover/${e.file}`
                        }
                    })
                }
            }

            let contenu = (
                <Translation>
                    {
                        t =>
                            <div className="ui seven wide column">
                                <img alt="Vignette" src={imageSrc} style={{width: "55px", height: "55px", verticalAlign: "middle", marginRight: "15px"}}/>
                                {this.state.media && (<span className="medium-400 media cliquable" onClick={()=>window.location.href=`/oeuvre/${this.state.media.mediaId}/resume`} style={{marginRight: "10px"}}>{this.state.media.title}</span>)}
                                <span className="heading4 partage">{t('flot.split.documente-ton-oeuvre.etape.partage-titre')}</span>
                            </div>
                    }
                </Translation>
            )

            let _p0

            // Trouver _p0, la proposition la plus récente
            this.state.propositions.forEach(elem => {
                if (!_p0 || _p0._d < elem._d) { _p0 = elem }
            })

            let _rafraichir = false

            if (_p0 && _p0.etat === 'VOTATION') {
                _rafraichir = true
            }

            propositions = this.state.propositions.map((elem, idx) => {
                return (
                    <Translation key={`sommaire_${idx}`} >
                        {
                            (t, i18n) =>
                                <div className="ui row">
                                    <Accordion.Title active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                                        <Icon name='dropdown' />
                                        Version {idx + 1} - {elem.etat ? t(`flot.split.etat.${elem.etat}`) : "flot.split.etat.INCONNU"}
                                        <div>
                                            <div className="small-400">&nbsp;&nbsp;{t('oeuvre.creePar')}&nbsp;</div>
                                            <div className="small-500-color">{`${elem.initiatorName}`}</div>
                                            <div className="small-400">&nbsp;{i18n.lng && elem._d ? moment(elem.creationDate, moment.defaultFormat).locale(i18n.lng.substring(0, 2)).fromNow() : moment(Date.now(), moment.defaultFormat).fromNow()}</div>
                                        </div>
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeIndex === idx}>
                                        <SommairePartage ayantDroit={this.state.ayantDroit} uuid={elem.uuid} rafraichirAuto={_rafraichir} />
                                    </Accordion.Content>
                                </div>
                        }
                    </Translation>
                )
            })
            propositions = propositions.reverse()

            let nouveauDisabled = false, envoiDisabled = true, continuerDisabled = true
            let partageEditeur = false

            if (this.state.propositions.length > 0) {
                let _p = this.state.propositions[this.state.propositions.length - 1]
                _p0 = _p
                if (_p.etat !== 'REFUSE' || this.state.propositions.length === 0) {
                    nouveauDisabled = true
                }
                if (_p.etat !== 'PRET') {
                    envoiDisabled = true
                } else {
                    if (_p.initiatorUuid === this.state.user.username) {
                        envoiDisabled = false
                    }
                }
                if ((_p.etat === 'BROUILLON' || _p.etat === 'PRET') && _p.initiatorUuid === this.state.user.username) {
                    continuerDisabled = false
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

            let that = this
            let message

            if (this.state.user && _p0 && _p0.etat === "PRET" && _p0.initiatorUuid === this.state.user.username) {
                message = (
                    <Translation>
                        {
                            t =>
                                <>
                                    <div className="ui row">
                                        <div className="four wide column">
                                            <p className="ui color blue envoyer">
                                                {t('flot.split.partage.prete-a-envoyer')}</p>
                                        </div>
                                    </div>
                                </>
                        }

                    </Translation>
                )
            }

            if (this.state.user && _p0 && _p0.etat === "VOTATION" && !this.state.jetonApi) {
                message = (
                    <Translation>
                        {
                            t =>
                                <h4 className="ui color orange">{t('flot.split.documente-ton-oeuvre.proposition.voter-avec-jeton')}</h4>
                        }
                    </Translation>
                )
            }

            return (
                <Translation>
                    {
                        (t, i18n) =>
                            <div className="ui segment">
                                <div className="ui grid sommaire">
                                    <div className="ui row">
                                        <Entete navigation={`/oeuvre/sommaire/${this.state.media.mediaId}`} contenu={contenu} profil={this.state.user} />
                                    </div>
                                    <div className="ui row">
                                        <div className="ui one wide column" />
                                        <div className="ui twelve wide column">
                                            {message}
                                        </div>
                                    </div>
                                    <div className="ui row">
                                        <div className="ui one wide column" />
                                        <div className="ui twelve wide column">
                                            {
                                                !continuerDisabled && (
                                                    <div className={`ui medium right floated button`} onClick={
                                                        () => {
                                                            window.location.href = `/partager/existant/${this.state.propositions[this.state.propositions.length - 1].uuid}`
                                                        }
                                                    }>
                                                        {t('flot.split.documente-ton-oeuvre.proposition.continuer')}
                                                    </div>
                                                )
                                            }
                                            {
                                                !nouveauDisabled && (
                                                    <div className={`ui medium right floated button`} onClick={
                                                        () => {
                                                            // Détecter si la proposition est verrouillée
                                                            if (
                                                                (  (this.state.media.initiateurPropositionEnCours && !this.state.media.initiateurPropositionEnCours.trim() ) || 
                                                                    this.state.media.initiateurPropositionEnCours === this.state.user.username)) {
                                                                // Verrouiller la proposition
                                                                axios.put(`http://dev.api.smartsplit.org:8080/v1/media/proposal/${this.state.media.mediaId}`, { rightHolderId: this.state.user.username })
                                                                    .then(res => {
                                                                        window.location.href = `/partager/nouveau/${this.state.media.mediaId}`;
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err)
                                                                    })
                                                            } else {
                                                                this.modalePropositionEnCours()
                                                            }

                                                        }
                                                    }>
                                                        {t('flot.split.documente-ton-oeuvre.proposition.nouvelle')}
                                                    </div>
                                                )
                                            }
                                            {
                                                !envoiDisabled && (  
                                                    <>                                              
                                                        <div onClick={() => {
                                                            this.openModal()
                                                        }} className={`ui medium button sommaire`}
                                                            style={{ width: "250px" }}
                                                        >
                                                            <div className="four wide column">
                                                                {t('flot.split.documente-ton-oeuvre.proposition.envoyer')}
                                                            </div>
                                                        </div>
                                                        <div>
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
                                                    </>
                                                )
                                            }
                                        </div>                                                                                                                    
                                    </div>
                                    {
                                        partageEditeur && (

                                            <div className="ui row">
                                                <div className="ui one wide column" />
                                                <div className="ui twelve wide column">
                                                    <span style={this.state.panneau === PANNEAU_PROPOSITIONS ? { cursor: "pointer", borderBottom: "solid green" } : { cursor: "pointer" }} className={`medium-500-tier${this.state.panneau === PANNEAU_PROPOSITIONS ? '-color' : ''}`} onClick={() => { this.afficherPanneauPropositions() }}>{t('flot.split.documente-ton-oeuvre.tableaudebord.collabo')}</span>&nbsp;&nbsp;
                                                    {/* Doit être adjacent à encapsules */}
                                                    <InfoBulle
                                                    className="proposition"
                                                        declencheur={(<span style={this.state.panneau === PANNEAU_EDITEUR ? { cursor: "pointer", borderBottom: "solid green" } : { cursor: "pointer" }} className={`medium-500-tier${this.state.panneau === PANNEAU_EDITEUR ? '-color' : ''}`} onClick={() => { this.afficherPanneauEditeur() }}>{t('flot.split.documente-ton-oeuvre.tableaudebord.edito')}</span>)}
                                                        decoration={
                                                            <>
                                                                <div className="header">{t("flot.split.documente-ton-oeuvre.tableaudebord.as-tu")} </div>
                                                                <br />
                                                                <div className="ui negative button editeur"
                                                                    onClick={(e) => { this.actionEditeur() }} // () = activation passer paramètre true ou false
                                                                    > {/* Chargé mais des fois faut l'importer à moins que composante déjà importée l'ait déjà chargée */}
                                                                    Non
                                                                </div>
                                                                <div className="ui positive button" onClick={(e) => {
                                                                    this.actionEditeur() // Ensuite ligne 116
                                                                    this.afficherPanneauEditeur() // L'affiche de suite après
                                                                }}>Oui</div>
                                                                <br /> <br />
                                                                <div className="contenu">{t("flot.split.documente-ton-oeuvre.tableaudebord.later")}</div>
                                                            </> // nul
                                                        }
                                                        ouvert={this.state.editeur} // fonction passée à var pour changer état (= "swich"). Ligne 117
                                                    // Défini dans state puis dans setState de InfoBulle
                                                    />
                                                </div>
                                                <div className="ui one wide column" />
                                            </div>


                                        )
                                    }
                                    {
                                        this.state.panneau === PANNEAU_PROPOSITIONS &&
                                        (
                                            <div className="ui row">
                                                <div className="ui one wide column" />
                                                <Accordion fluid styled className="ui twelve wide column">
                                                    {propositions}
                                                </Accordion>
                                                <div className="ui one wide column">
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        this.state.panneau === PANNEAU_EDITEUR &&
                                        (
                                            <SommairePartagesEditeur proposition={_p0} />
                                        )
                                    }
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
                                        Auth.currentAuthenticatedUser()
                                            .then(res => {
                                                that.setState({ user: res })
                                                that.setState({ modaleConnexion: false })
                                            })
                                            .catch(err => {
                                                toast.error(err.message)
                                            })
                                    }} />
                                </Modal>
                            </div>
                    }
                </Translation>
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