// Résumé du partage - US 64

import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { Translation } from 'react-i18next'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

import Entete from '../entete/entete'
import { Accordion, Icon } from 'semantic-ui-react'
import SommairePartage from './partage-sommaire'
import AssistantPartageEditeur from './assistant-partage-editeur'
import PartageSommaireEditeur from './partage-sommaire-editeur'

import PageAssistantSplitCourrielsCollaborateurs from '../split/assistant-split-courriel-collaborateurs'

import { Modal } from 'semantic-ui-react'

import moment from 'moment'

const PANNEAU_EDITEUR = 1, PANNEAU_PROPOSITIONS = 0

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

export default class SommairePartages extends Component {

    constructor(props){
        super(props)
        this.state = {
            mediaId: props.mediaId,
            activeIndex: 0,
            panneau: PANNEAU_PROPOSITIONS
        }
        this.initialisation = this.initialisation.bind(this)
        this.clic = this.clic.bind(this)
        this.afficherPanneauEditeur = this.afficherPanneauEditeur.bind(this)
        this.afficherPanneauPropositions = this.afficherPanneauPropositions.bind(this)
        this.openModal = this.openModal.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {     
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
            this.initialisation()
        })
        .catch(err=>{
            this.setState({modaleConnexion: true})
        })        
    }

    afficherPanneauEditeur() {
        this.setState({panneau: PANNEAU_EDITEUR})
    }

    afficherPanneauPropositions() {
        this.setState({panneau: PANNEAU_PROPOSITIONS})
    }

    closeModal = () => this.setState({ open: false })
    openModal = () => this.setState({ open: true })

    initialisation() {
        axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
        .then(res=>{
            this.setState({media: res.data.Item}, ()=>{
                axios.get(`http://api.smartsplit.org:8080/v1/proposal/media/${this.state.mediaId}`)
                .then(res=>{                    
                    axios.get(`http://api.smartsplit.org:8080/v1/rightholders/${this.state.user.username}`)
                    .then(_rAd=>{
                        this.setState({ayantDroit: _rAd.data.Item}, ()=>{
                            this.setState({propositions: res.data})                            
                            this.setState({activeIndex: res.data.length - 1})
                            let _ps = res.data
                            _ps.forEach(p=>{
                                if(p.etat === 'ACCEPTE') {
                                    axios.get(`http://api.smartsplit.org:8080/v1/splitShare/${p.uuid}/${this.state.user.username}`)
                                    .then(res=>{
                                        this.setState({partEditeur: res.data})
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

    render() {
        if(this.state.propositions && this.state.media) {
            let propositions = []
            let contenu = (
                <Translation>
                    {
                        t =>
                            <div className="ui ten wide column">
                                <i className="file image outline icon huge grey"></i>
                                    {this.state.media && (<span style={{marginLeft: "15px"}} className="medium-400">{this.state.media.title}</span>)}
                                    <span className="heading4" style={{marginLeft: "50px"}}>{t('flot.etape.partage-titre')}</span>                            
                            </div>
                    }                    
                </Translation>
            )
            propositions = this.state.propositions.map((elem, idx)=>{ 
                return(                    
                    <Translation key={`sommaire_${idx}`} >
                        {
                            (t, i18n) =>                            
                                <div className="ui row">
                                    <Accordion.Title active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                                        <Icon name='dropdown' />
                                        Version {idx + 1} - {elem.etat ? t(`flot.split.etat.${elem.etat}`) : "flot.split.etat.INCONNU"}
                                        <div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;{t('oeuvre.creePar')}&nbsp;</div>
                                            <div className="small-500-color" style={{display: "inline-block"}}>{`${elem.initiator.name}`}</div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;{i18n.lng && elem._d ? moment(elem._d).locale(i18n.lng.substring(0,2)).fromNow() : moment().fromNow()}</div>
                                        </div>
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeIndex === idx}>
                                        <SommairePartage ayantDroit={this.state.ayantDroit} uuid={elem.uuid} rafraichirAuto={true} />
                                    </Accordion.Content>                                
                                </div>
                        }
                    </Translation>
                )
            })

            propositions = propositions.reverse()

            let nouveauDisabled = false, envoiDisabled = true, continuerDisabled = true
            let partageEditeur = false

            let _id0
            let _p0
            
            if(this.state.propositions.length > 0) {
                let _p = this.state.propositions[this.state.propositions.length - 1]
                _p0 = _p
                _id0 = _p.uuid
                if (_p.etat !== 'REFUSE' || this.state.propositions.length === 0) {
                    nouveauDisabled = true
                }    
                if(_p.etat !== 'PRET') {
                    envoiDisabled = true
                } else {
                    envoiDisabled = false
                }
                if(_p.etat === 'BROUILLON' && _p.initiator.id === this.state.user.username) {
                    continuerDisabled = false
                }
                if(_p.etat === 'ACCEPTE') {
                    // ESt-ce que l'utilisateur est dans les ayant-droits ?
                    let estCollaborateur = false
                    if(_p.rightsSplits.workCopyrightSplit) {
                        Object.keys(_p.rightsSplits.workCopyrightSplit).forEach(type=>{
                            _p.rightsSplits.workCopyrightSplit[type].forEach(part => {
                                if(part.rightHolder.rightHolderId === this.state.user.username){
                                    estCollaborateur = true
                                }
                            })
                        })
                    }
                    if(estCollaborateur) {
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
                console.log('traitement droit', objDroit, type)
                if (objDroit) {
                    objDroit.forEach(droit=>{
                        if(!rightHolders[droit.rightHolder.rightHolderId]) {
                            // Ajout du titulaire dans la table des ayant droits
                            rightHolders[droit.rightHolder.rightHolderId] = droit.rightHolder
                        }
                        // Ajout du droit à l'ayant droit
                        rights[type][droit.rightHolder.rightHolderId] = droit
                    })
                }                
            }

            // Extraire les différents ayant-droits et ordonnancement dans un tableau
            TYPE_SPLIT.forEach(type=>{
                if(!rights[type]) {
                    rights[type] = {}
                }
                if(proposition.rightsSplits[type]) {
                    let rightsSplit = proposition.rightsSplits[type]
                    // Séparation de la structure des droits
                    switch(type) {
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

            return (          
                <Translation>
                    {
                        t =>
                            <div className="ui segment">                    
                                <div className="ui grid" style={{padding: "10px"}}>
                                    <div className="ui row">
                                        <Entete navigation={`/oeuvre/sommaire/${this.state.media.mediaId}`} contenu={contenu} profil={this.state.user} />
                                    </div>
                                    <div className="ui row">
                                        <div className="ui twelve wide column" />                
                                        <div className="ui one wide column">
                                            {
                                                !continuerDisabled && (
                                                    <div className={`ui medium button`} onClick={
                                                        ()=>{
                                                            window.location.href=`/partager/existant/${this.state.propositions[this.state.propositions.length - 1].uuid}`
                                                        }
                                                        }>
                                                        {t('flot.proposition.continuer')}
                                                    </div>
                                                )
                                            }
                                            {
                                                !nouveauDisabled && (
                                                    <div className={`ui medium button`} onClick={
                                                        ()=>{
                                                            window.location.href=`/partager/nouveau/${this.state.mediaId}`
                                                        }
                                                        }>
                                                        {t('flot.proposition.nouvelle')}
                                                    </div>
                                                )
                                            }
                                            {
                                                !envoiDisabled && (
                                    
                                                    <div>
                                                         
                                                        <div onClick={()=>{
                                                            this.openModal()
                                                        }} className={`ui medium button`} style={{width:"200px", right:"150px"}}>
                                                            {t('flot.proposition.envoyer')}
                                                        </div>
                                                     
                                                        <Modal 
                                                        open={this.state.open}
                                                        onClose={this.closeModal} 
                                                        size="small"
                                                    >
                                                        <PageAssistantSplitCourrielsCollaborateurs 
                                                            ayantDroits={rightHolders}
                                                            id={this.state.propositions[this.state.propositions.length - 1].uuid}/>
                                   
                                                  </Modal>
                                                 </div>
                                                     
                                                )
                                            }                                                                                        
                                                                                                                              
                                        </div>
                                    </div> 

                                    {
                                        partageEditeur && (
                                            <div className="ui row">
                                                <div className="ui one wide column" />
                                                <div className="ui twelve wide column">
                                                    <span style={this.state.panneau === PANNEAU_PROPOSITIONS ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_PROPOSITIONS ? '-color' : ''}`} onClick={()=>{this.afficherPanneauPropositions()}}>{t('flot.tableaudebord.collabo')}</span>&nbsp;&nbsp;
                                                    <span style={this.state.panneau === PANNEAU_EDITEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_EDITEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauEditeur()}}>{t('flot.tableaudebord.edito')}</span>
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
                                            <div className="ui row">
                                                <div className="ui one wide column" />
                                                {
                                                    !this.state.partEditeur &&
                                                    <AssistantPartageEditeur propositionId={_id0} sansentete className="ui twelve wide column" />
                                                }
                                                {
                                                    this.state.partEditeur &&
                                                    <PartageSommaireEditeur ayantDroit={this.state.ayantDroit} part={this.state.partEditeur} proposition={_p0} />
                                                }
                                                <div className="ui one wide column" />                                                
                                            </div>
                                        )
                                    }
                                </div>
                                <Modal
                                    open={this.state.modaleConnexion}
                                    closeOnEscape={false}
                                    closeOnDimmerClick={false}
                                    onClose={this.props.close} 
                                    size="small" >
                                    <br/><br/><br/>
                                    <Login fn={()=>{
                                        Auth.currentAuthenticatedUser()
                                        .then(res=>{
                                            that.setState({user: res})                                    
                                        })
                                        .catch(err=>{
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
                <div></div>
            )
        }
    }

}