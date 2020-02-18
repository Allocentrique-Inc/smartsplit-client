import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { withTranslation } from 'react-i18next'
import 'react-confirm-alert/src/react-confirm-alert.css'
import "../../assets/scss/tableaudebord/tableaudebord.scss";
import Login from '../auth/Login'
import { Accordion, Button } from 'semantic-ui-react'
import AssistantPartageEditeur from './assistant-partage-editeur'
import PartageSommaireEditeur from './partage-sommaire-editeur'
import { Modal } from 'semantic-ui-react'
import {Identite, config, AyantsDroit, journal, utils} from '../../utils/application'
import { FlecheBasSVG, FlecheHautSVG } from '../svg/SVG.js'
import moment from 'moment'
import PageAssistantSplitCourrielsCollaborateurs from '../split/assistant-split-courriel-collaborateurs'

const NOM = "SommairePartagesEditeur"

class SommairePartagesEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proposition: props.proposition            
        }
        this.initialisation = this.initialisation.bind(this)
        this.clic = this.clic.bind(this)
        this.creerNouvelle = this.creerNouvelle.bind(this)        
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentWillMount() {
        if(Identite.usager) {
            this.setState({ user: Identite.usager }, ()=>{this.initialisation()})            
        } else {
            this.setState({ modaleConnexion: true })
        }
    }

    closeModal = () => this.setState({ modaleCourriels: false })
    openModal = () => this.setState({ modaleCourriels: true })

    initialisation() {
        let _rAd = AyantsDroit.ayantsDroit[this.state.user.username]        
        this.setState({ ayantDroit: _rAd }, async () => {
            try {
                let res = await axios.get(`${config.API_URL}splitShare/${this.state.proposition.uuid}/${this.state.user.username}`)
                this.setState({ activeIndex: res.data.length - 1 })
                this.setState({ propositions: res.data })
            } catch(err) {
                journal.error(NOM, err)
            }            
        })
    }    

    creerNouvelle = (ouvert = true) => {
        this.setState({creerNouveauPartage: ouvert})
    }

    clic = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const t = this.props.t, i18n = this.props.i18n
        if (this.state.propositions) {            
            let propositions = []
            let _p0
            // Trouver _p0, la proposition la plus récente
            this.state.propositions.forEach(elem => {
                if (!_p0 || _p0._d < elem._d) { _p0 = elem }
            })
            let rightHolders = {}
            if(_p0) {
                rightHolders[_p0.rightHolderId] = {
                    rightHolderId: _p0.rightHolderId,
                    name: AyantsDroit.affichageDuNom(_p0.rightHolderId)
                }
                rightHolders[_p0.shareeId] = {
                    rightHolderId: _p0.shareeId,
                    name: AyantsDroit.affichageDuNom(_p0.shareeId)
                }
            }            
            propositions = this.state.propositions.map((elem, idx) => {    
                const accordionIsOpen = idx === this.state.activeIndex;
                let ayantDroit = AyantsDroit.ayantsDroit[elem.rightHolderId]
                let nomInitiateur = AyantsDroit.affichageDuNom(ayantDroit)
                return (
                    <div className="ui row" key={`sommaire_${idx}`}>
                        <div className="ui sixteen wide column">
                            <div className="ui row" style={{marginBottom: "1rem"}}>
                                <Accordion.Title style={{border: "1px solid rgba(34, 36, 38, 0.15)", padding: "1rem 1rem 1rem 0.5rem"}} active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                                    <div className="fleche" style={{paddingRight: "0.5rem", paddingTop: "1rem"}}>
                                        {accordionIsOpen ? <FlecheHautSVG /> : <FlecheBasSVG />}
                                    </div>
                                    <div className="version">
                                    &nbsp; Version {idx + 1} <span style={{marginLeft: "1rem"}} className={( elem.etat  === 'ACCEPTE') ? "sommaire-approuve" : ( elem.etat  === 'REFUSE') ? "sommaire-desaprouve" : ( elem.etat  === 'PRET') ? "sommaire-envoie" : "sommaire-attente"}>
                                        {t( `flot.split.etat.${elem.etat}`)}
                                        </span>                               
                                    </div>
                                    <div>
                                        <div className="small-400 creation">&nbsp;&nbsp;{t('oeuvre.creePar')}&nbsp;</div>
                                        <div className="small-500-color">{nomInitiateur}</div>
                                        <span className="date sommaire">&nbsp;&nbsp;{i18n.language && elem._d ? moment(new Date(parseInt(elem._d)), moment.defaultFormat).locale(i18n.language.substring(0, 2)).fromNow() : moment(Date.now(), moment.defaultFormat).fromNow()}</span>
                                    </div>
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeIndex === idx} style={{padding: "0rem", paddingTop: "1rem", marginBottom: "1rem", borderLeft: "1px solid rgba(34,36,38,.15)", borderRight: "1px solid rgba(34,36,38,.15)", borderBottom: "1px solid rgba(34,36,38,.15)"}} >
                                    <PartageSommaireEditeur parent={this} idx={idx} ayantDroit={this.state.ayantDroit} part={elem} proposition={this.state.proposition} />
                                </Accordion.Content>
                            </div>                                    
                        </div>
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
                                    onSubmit={()=>{                                        
                                        let body = {
                                            rightHolder: {nom: ayantDroit.nom, uuid: ayantDroit.rightHolderId},
                                            shareeId: _p0.shareeId,
                                            proposalId: _p0.proposalId,
                                            mediaId: this.state.proposition.mediaId,
                                            version: _p0.version
                                        }
                                        // Soumettre l'invitation
                                        axios.post(`${config.API_URL}editorsplitshare/invite`, body)
                                        .then(()=>{
                                            toast.success(t('flot.invitations.envoyees'))
                                            setTimeout(()=>{utils.naviguerVersPartageEditeur(this.state.proposition.mediaId)}, 3000)
                                        })
                                    }}
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
            })
            propositions = propositions.reverse()
            // eslint-disable-next-line
            let nouveauDisabled = true, envoiDisabled = true
            if (this.state.propositions.length > 0) {
                let _p = this.state.propositions[this.state.propositions.length - 1]
                _p0 = _p
                if(_p.etat === 'ATTENTE') {
                    envoiDisabled = false
                }
                if (_p.etat === 'REFUSE') {
                    nouveauDisabled = false
                }                
            }
            if(this.state.propositions.length === 0 || this.state.jetonApi) {
                nouveauDisabled = true
            }



            let that = this
            return (                
                <>
                    { (this.state.creerNouveauPartage || this.state.propositions.length === 0) &&
                        <div className="ui row">
                            <AssistantPartageEditeur 
                                sansentete
                                propositionId={this.state.proposition.uuid}
                                version={propositions.length}
                                className="ui twelve wide column" 
                                soumettre={()=>{
                                    this.creerNouvelle(false)
                                    window.location.reload()
                                }} />
                        </div>
                    }
                    { !this.state.creerNouveauPartage &&
                        <div className="ui row">
                            <div className="ui row">
                                <div className="ui sixteen wide column">
                                    <div className="boutons sommaire">
                                        <div style={{textAlign: "right"}}>
                                            { (!nouveauDisabled) && (
                                                <div className={`ui medium button inverse`} onClick={
                                                    () => {
                                                        this.creerNouvelle()
                                                    }
                                                }>
                                                    {t('flot.split.documente-ton-oeuvre.proposition.nouvelle-version')}</div>
                                                )
                                            }
                                            {!envoiDisabled && (
                                                <div
                                                    onClick={() => this.openModal()}
                                                    className="ui medium button envoyer sommaire">
                                                    {t('flot.split.documente-ton-oeuvre.proposition.envoyer-editeur')}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui row">
                                <div className="ui two wide column" />
                                <Accordion fluid>
                                    {propositions}
                                </Accordion>
                                <div className="ui two wide column" />
                            </div>                                                                      
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
                    }
                    <Modal
                        open={this.state.modaleConnexion}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                        onClose={this.props.close}
                        size="small" >
                        <br /><br /><br />
                        <Login fn={() => {
                            if(Identite.usager) {
                                that.setState({ user: Identite.usager })
                            }
                        }} />
                    </Modal>
                </>                    
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
export default withTranslation()(SommairePartagesEditeur)