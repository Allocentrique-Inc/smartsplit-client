import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { withTranslation } from 'react-i18next'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'

import { Accordion, Icon, Checkbox } from 'semantic-ui-react'
import SommairePartage from './partage-sommaire'

import PageAssistantSplitCourrielsCollaborateurs from '../split/assistant-split-courriel-collaborateurs'

import { Modal, Button } from 'semantic-ui-react'

import moment from 'moment'
import SommairePartagesEditeur from './sommaire-partages-editeur'
import ModaleConnexion from '../auth/Connexion'

import ModalPropositionEnCours from '../modales/modale-proposition-encours'

import InfoBulle from '../partage/InfoBulle';

import "../../assets/scss/tableaudebord/tableaudebord.scss";
import { Navbar } from '../navigation/navbar'

import Utilitaires from "../../utils/utilitaires"

const PANNEAU_EDITEUR = 1, PANNEAU_PROPOSITIONS = 0
const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']
const ETAT_EDITEUR_NON = 1, ETAT_EDITEUR_OUI = 2, ETAT_EDITEUR_PLUSTARD = 3

class SommairePartages extends Component {

    constructor(props) {
        super(props)
        this.utils = new Utilitaires(1) // Contexte WEB
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
                            //Certain que c'est l'ayant-droit
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

    fermerInfobulleEditeur(etat) {        
        switch(etat) {
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
            this.state.propositions.forEach(elem => {
                if (!_p0 || _p0._d < elem._d) { _p0 = elem }
            })

            let _rafraichir = false

            if (_p0 && _p0.etat === 'VOTATION') {
                _rafraichir = true
            }

            propositions = this.state.propositions.map((elem, idx) => {
                return (                    
                    <div className="ui row" key={`sommaire_${idx}`}>
                        <Accordion.Title active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                            <Icon name='dropdown' />
                            Version {idx + 1} - {elem.etat ? t(`flot.split.etat.${elem.etat}`) : "flot.split.etat.INCONNU"}
                            <div>
                                <div className="small-400">&nbsp;&nbsp;{t('oeuvre.creePar')}&nbsp;</div>
                                <div className="small-500-color">{`${elem.initiatorName}`}</div>
                                <div className="small-400">&nbsp;{i18n.language && elem._d ? moment( new Date(parseInt(elem.creationDate)), moment.defaultFormat).locale(i18n.language.substring(0, 2)).fromNow() : moment(Date.now(), moment.defaultFormat).fromNow()}</div>
                            </div>
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === idx}>
                            <SommairePartage ayantDroit={this.state.ayantDroit} uuid={elem.uuid} rafraichirAuto={_rafraichir} />
                        </Accordion.Content>
                    </div>                       
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
                <div style={{display: "inline"}}>
                    <div style={{paddingBottom: "20px", display: "inline"}} className={`small-500${
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
                    <div style={{paddingBottom: "20px", marginLeft: "40px", display: "inline"}} className={`small-500${
                        souligneCollaborateur ? "-color souligne" : " secondaire"
                        } ${souligneCollaborateur && this.state.pochette ? "pochette" : ""}`}>

                    <InfoBulle
                        className="proposition"
                        declencheur={(
                            <span
                                className={`cliquable`}
                                onClick={() => {
                                    if(partageEditeur) this.afficherPanneauEditeur()
                                }}
                                style={{ fontSize: "16px", color: souligneCollaborateur ? "black" : "", cursor: !partageEditeur ? "not-allowed" : "pointer" }}
                                >
                                {t('flot.split.documente-ton-oeuvre.tableaudebord.edito')}
                            </span>
                        )}
                        style={{
                            background: "#FAF8F9",
                            border: "1px solid #DCDFE1",
                            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.25)"
                        }}
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
                                <div className="ui medium button inverse infobulle" style={{width: "110px", marginLeft: "0px", marginRight: "0px"}}
                                    onClick={ () => { this.fermerInfobulleEditeur(ETAT_EDITEUR_NON) }}
                                    >
                                    Non
                                </div>
                                <div className="ui medium button infobulle" style={{width: "110px", marginLeft: "20px", marginRight: "0px"}} onClick={(e) => {
                                    this.fermerInfobulleEditeur(ETAT_EDITEUR_OUI)
                                    this.afficherPanneauEditeur()
                                    this.setState({nouvellePropositionEditeur: true})
                                }}>Oui</div>
                                <div className={`${this.state.pochette ? "pochette" : "smartsplit"} cliquable`} onClick={()=>this.fermerInfobulleEditeur(ETAT_EDITEUR_PLUSTARD)} style={
                                    {
                                        paddingTop: "10px",
                                        textAlign: "center", 
                                        fontSize: "16px", 
                                        fontFamily: "IBM Plex Sans", 
                                        fontWeight: "700"                                            
                                    }}>{t("flot.split.documente-ton-oeuvre.tableaudebord.later")}</div>
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
                    <div className="ui container" style={{marginTop: "100px"}}>
                        <div className="ui grid sommaire">
                            <div className="ui row">
                                <div className="ui twelve wide column">
                                    <h1>{t('flot.split.documente-ton-oeuvre.proposition.resume')}</h1>
                                </div>
                            </div>                            
                            <div className="ui row">
                                <div className="ui sixteen wide column" style={{borderBottom: "0.5px solid lightgrey", paddingBottom: "20px"}}>
                                    {optionsAffichage}
                                </div>
                            </div>
                            {
                                this.state.panneau === PANNEAU_PROPOSITIONS &&
                                (
                                    <>
                                        <div className="ui row">
                                            <div className="ui sixteen wide column">
                                                {
                                                    proposition.etat === 'ACCEPTE' && <div 
                                                        className="ui medium button inverse" 
                                                        style={{marginLeft: "0px"}}>
                                                            {t('flot.split.documente-ton-oeuvre.proposition.telecharger-contrat')}</div>
                                                }
                                                <div style={{float: "right"}}>
                                                    {!nouveauDisabled && (
                                                        <div 
                                                            className="ui medium button inverse">
                                                                {t('flot.split.documente-ton-oeuvre.proposition.telecharger-contrat')}</div>
                                                    )}
                                                    {!continuerDisabled && (
                                                            <div className={`ui medium button inverse`} onClick={
                                                                () => {
                                                                    this.utils.naviguerVersPoursuivrePartage(this.state.propositions[this.state.propositions.length - 1].uuid)                                                                    
                                                                }
                                                            }>
                                                                {t('flot.split.documente-ton-oeuvre.proposition.continuer')}</div>
                                                        )
                                                    }
                                                    {!envoiDisabled && (
                                                        <div 
                                                            onClick={()=>this.openModal()}
                                                            style={{marginRight: "0px"}} 
                                                            className="ui medium button">
                                                                {t('flot.split.documente-ton-oeuvre.proposition.envoyer')}</div>
                                                    )}                                                    
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div className="ui row">
                                            <Accordion fluid styled className="ui sixteen wide column">
                                                {propositions}
                                            </Accordion>
                                        </div>
                                    </>
                                )
                            }
                            {
                                this.state.panneau === PANNEAU_EDITEUR &&
                                (
                                    <>
                                        {
                                            !this.state.nouvellePropositionEditeur && (
                                                <div className="ui row">
                                                    <div className="ui sixteen wide column">
                                                        <Checkbox 
                                                            checked={this.state.editeur} 
                                                            onChange={
                                                                () => this.setState({ editeur: !this.state.editeur })
                                                            } 
                                                            label={{ children: t('flot.split.documente-ton-oeuvre.proposition.jai-un-editeur') }} />
                                                        <div style={{float: "right"}}>
                                                            <div onClick={ ()=> {if(this.state.editeur) this.setState({nouvellePropositionEditeur: true})} }className={`ui medium button ${!this.state.editeur ? 'disabled' : ''}`}>{t('flot.split.documente-ton-oeuvre.proposition.partage')}</div>                                                                                                                                
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            this.state.nouvellePropositionEditeur && (
                                                <SommairePartagesEditeur proposition={_p0} />
                                            )
                                        }
                                    </>                                                
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
                                    this.setState({ user: res })
                                    this.setState({ modaleConnexion: false })
                                })
                                .catch(err => {
                                    toast.error(err.message)
                                })
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