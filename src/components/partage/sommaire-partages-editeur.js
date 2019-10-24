import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { Translation } from 'react-i18next'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'

import { Accordion, Icon } from 'semantic-ui-react'
import AssistantPartageEditeur from './assistant-partage-editeur'
import PartageSommaireEditeur from './partage-sommaire-editeur'

import { Modal } from 'semantic-ui-react'

export default class SommairePartagesEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proposition: props.proposition            
        }
        this.initialisation = this.initialisation.bind(this)
        this.clic = this.clic.bind(this)
        this.creerNouvelle = this.creerNouvelle.bind(this)        
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

    initialisation() {        
        axios.get(`http://dev.api.smartsplit.org:8080/v1/rightholders/${this.state.user.username}`)
        .then(_rAd => {
            this.setState({ ayantDroit: _rAd.data.Item }, () => {                
                axios.get(`http://dev.api.smartsplit.org:8080/v1/splitShare/${this.state.proposition.uuid}/${this.state.user.username}`)
                .then(res => {
                    this.setState({ activeIndex: res.data.length - 1 })
                    this.setState({ propositions: res.data.reverse() })
                })
            })
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
        if (this.state.propositions) {
            let propositions = []
            
            let _p0
            // Trouver _p0, la proposition la plus récente
            this.state.propositions.forEach(elem => {
                if (!_p0 || _p0._d < elem._d) { _p0 = elem }
            })

            propositions = this.state.propositions.map((elem, idx) => {
                return (
                    <Translation key={`sommaire_${idx}`} >
                        {
                            (t, i18n) =>
                                <>
                                    <div className="ui row" style={{ fontFamily: "IBM Plex Sans" }}>
                                        <Accordion.Title active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                                            <Icon name='dropdown' />
                                            Version {idx + 1} - {elem.etat ? t(`flot.split.etat.${elem.etat}`) : "flot.split.etat.INCONNU"}                                        
                                        </Accordion.Title>
                                        <Accordion.Content active={this.state.activeIndex === idx}>                                    
                                            <div className="ui row">
                                                <div className="ui one wide column" />                                            
                                                    <PartageSommaireEditeur idx={idx} ayantDroit={this.state.ayantDroit} part={elem} proposition={this.state.proposition} />
                                                <div className="ui one wide column" />
                                            </div>                                    
                                        </Accordion.Content>
                                    </div>                                    
                                </>
                        }
                    </Translation>
                )
            })
            propositions = propositions.reverse()

            let nouveauDisabled = false

            if (this.state.propositions.length > 0) {
                let _p = this.state.propositions[this.state.propositions.length - 1]
                _p0 = _p
                if (_p.etat !== 'REFUSE') {
                    nouveauDisabled = true
                }
            }

            if(this.state.propositions.length === 0) {
                nouveauDisabled = true
            }
            
            let that = this
            let message

            if (this.state.user && _p0 && _p0.etat === "PRET" && _p0.initiator.id === this.state.user.username) {
                message = (
                    <Translation>
                        {
                            t =>
                                <p className="ui color blue"
                                    style={{
                                        width: "800px",
                                        fontFamily: "IBM Plex Sans",
                                        fontWeight: "normal",
                                        fontSize: "16px"
                                    }}>
                                    {t('flot.split.partage.prete-a-envoyer')}</p>
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
                        t =>
                            <>
                                { (this.state.creerNouveauPartage || this.state.propositions.length === 0) &&
                                    <div className="ui row">
                                        <div className="ui one column" />
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
                                        <div className="ui one column" />
                                        <div className="ui twelve wide column">
                                            <div className="ui grid" style={{ padding: "10px" }}>
                                                <div className="ui row">
                                                    <div className="ui two wide column" />
                                                    <div className="ui eight wide column">
                                                        {message}
                                                    </div>
                                                    <div className="ui four wide column">                                            
                                                        {
                                                            !nouveauDisabled && (
                                                                <div className={`ui medium button`} onClick={
                                                                    () => {
                                                                        this.creerNouvelle()
                                                                    }
                                                                }>
                                                                    {t('flot.split.documente-ton-oeuvre.proposition.nouvelle')}
                                                                </div>
                                                            )
                                                        }                                            
                                                    </div>
                                                </div>                                        
                                                <div className="ui row">
                                                    <div className="ui two wide column" />
                                                    <Accordion fluid styled>
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
                                        </div>
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
                                        Auth.currentAuthenticatedUser()
                                            .then(res => {
                                                that.setState({ user: res })
                                            })
                                            .catch(err => {
                                                toast.error(err.message)
                                            })
                                    }} />
                                </Modal>
                            </>
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