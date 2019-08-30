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
import moment from 'moment'
import AssistantPartageEditeur from './assistant-partage-editeur'
import PartageSommaireEditeur from './partage-sommaire-editeur'

const PANNEAU_EDITEUR = 1, PANNEAU_PROPOSITIONS = 0

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
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.i18n !== nextProps.i18n) {
            if(nextProps.i18n.lng === "fr") {
                // momentjs en français, SVP
                require('../../utils/moment-fr')
            }            
        }
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
            this.initialisation()
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: `Connexion obligatoire`,
                message: `Tu dois être connecté pour accéder`,
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <div>
                        <Login message="Connecte-toi pour accéder" fn={(user)=>{
                            onClose()
                            this.setState({user: user}, ()=>{
                                this.initialisation()
                            })
                        }} />
                </div>
            })
        })        
    }

    afficherPanneauEditeur() {
        this.setState({panneau: PANNEAU_EDITEUR})
    }

    afficherPanneauPropositions() {
        this.setState({panneau: PANNEAU_PROPOSITIONS})
    }

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
                            (t) =>                            
                                <div className="ui row">
                                    <Accordion.Title active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                                        <Icon name='dropdown' />
                                        Version {idx + 1} - {elem.etat ? t(`flot.split.etat.${elem.etat}`) : "flot.split.etat.INCONNU"}
                                        <div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;{t('oeuvre.creePar')}&nbsp;</div>
                                            <div className="small-500-color" style={{display: "inline-block"}}>{`${elem.initiator.name}`}</div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;{elem._d ? moment(elem._d).fromNow() : moment().fromNow()}</div>
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

            let nouveauDisabled = "", envoiDisabled = "disabled", continuerDisabled = "disabled"
            let partageEditeur = false

            let _id0
            let _p0
            
            if(this.state.propositions.length > 0) {
                let _p = this.state.propositions[this.state.propositions.length - 1]
                _p0 = _p
                _id0 = _p.uuid
                if (_p.etat !== 'REFUSE' || this.state.propositions.length === 0) {
                    nouveauDisabled = "disabled"
                }    
                if(_p.etat !== 'PRET') {
                    envoiDisabled = "disabled"
                } else {
                    envoiDisabled = ""
                }
                if(_p.etat === 'BROUILLON' && _p.initiator.id === this.state.user.username) {
                    continuerDisabled = ""
                }
                if(_p.etat === 'ACCEPTE') {
                    partageEditeur = true
                }
            }

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
                                        <div className="ui seven wide column" />                
                                        <div className="ui seven wide column">
                                            <div className={`ui medium button ${continuerDisabled}`} onClick={
                                                ()=>{
                                                    window.location.href=`/partager/existant/${this.state.propositions[this.state.propositions.length - 1].uuid}`
                                                }
                                                }>
                                                {t('flot.proposition.continuer')}
                                            </div>
                                            <div className={`ui medium button ${nouveauDisabled}`} onClick={
                                                ()=>{
                                                    window.location.href=`/partager/nouveau/${this.state.mediaId}`
                                                }
                                                }>
                                                {t('flot.proposition.nouvelle')}
                                            </div>
                                            <div className={`ui medium button ${envoiDisabled}`} onClick={
                                                ()=>{
                                                    window.location.href=`/proposition/approuver/${this.state.propositions[this.state.propositions.length - 1].uuid}`
                                                }
                                                }>
                                                {t('flot.proposition.envoyer')}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        partageEditeur && (
                                            <div className="ui row">
                                                <div className="ui one wide column" />
                                                <div className="ui twelve wide column">
                                                    <span style={this.state.panneau === PANNEAU_PROPOSITIONS ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_PROPOSITIONS ? '-color' : ''}`} onClick={()=>{this.afficherPanneauPropositions()}}>Mes collaborateurs</span>&nbsp;&nbsp;
                                                    <span style={this.state.panneau === PANNEAU_EDITEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_EDITEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauEditeur()}}>Mon éditeur</span>
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