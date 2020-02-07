import { Identite, AyantsDroit, config, journal } from '../../utils/application'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import SommairePartage from '../partage/partage-sommaire'
import { Accordion } from 'semantic-ui-react'
import { FlecheHautSVG, FlecheBasSVG } from '../svg/SVG'
import moment from 'moment'

const NOM = "VotationSplit"

class VotationSplit extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            split: null,
            jetonApi: props.jeton,
            accordeonOuvert: true
        }
        this.accordeon = this.accordeon.bind(this)
    }

    componentWillMount() {
        // Décoder le jeton        
        let body = { jeton: this.state.jetonApi }
        axios.post(`${config.API_URL}proposal/decode`, body)
        .then((resp) => {
            let _s = resp.data
            this.setState({ jeton: _s })
            // Récupère le nom de l'ayant-droit, pour affichage (il peut ne pas être connecté)            
            this.setState({ ayantDroit: AyantsDroit.ayantsDroit[_s.rightHolderId] })
            // Récupère la proposition
            axios.get(`${config.API_URL}proposal/${_s.proposalId}`)
                .then(_r => {
                    this.setState({ proposition: _r.data.Item })
                    // Récupère le média
                    axios.get(`${config.API_URL}media/${_r.data.Item.mediaId}`)
                        .then(_rMedia => {
                            this.setState({ media: _rMedia.data.Item })
                        })
                        .catch((error) => {
                            journal.error(NOM, error.message)
                        })
                })
                .catch((error) => {
                    journal.error(NOM, error.message)
                })            
        })
        .catch((error) => {
            journal.error(NOM, error)
        })
        if(Identite.usager) {
            this.setState({user: Identite.usager})
        }        
    }

    accordeon(ouvert = true) {
        this.setState({accordeonOuvert: ouvert})
    }

    render() {
        const t = this.props.t, i18n = this.props.i18n
        if (this.state.media && this.state.proposition) {
            const elem = this.state.proposition
            return (                
                <div className="ui segment">
                    <div className="ui grid">
                        <div className="ui row">
                            <div className="ui two wide column" />
                            <div className="ui twelve wide column">
                                <div className="heading2" style={{margin: "0rem"}}>{t('flot.split.documente-ton-oeuvre.etape.vote-titre', {oeuvre: this.state.media.title})}</div>
                            </div>
                            <div className="ui two wide column" />
                        </div>
                        <div className="ui row" style={{marginBottom: "3rem"}}>
                            <div className="ui two wide column" />
                            <div className="ui twelve wide column">
                                {
                                    this.state.jeton && (
                                        <Accordion fluid className="ui sixteen wide column">
                                            <Accordion.Title active={this.state.accordeonOuvert} onClick={()=>this.accordeon(!this.state.accordeonOuvert)} style={{border: "1px solid rgba(34,36,38,.15)", padding: "1rem 1rem 1rem 0.5rem"}}>
                                                <div className="fleche" style={{paddingRight: "0.5rem", paddingTop: "1rem"}}>
                                                    {this.state.accordeonOuvert ? <FlecheHautSVG /> : <FlecheBasSVG />}
                                                </div>
                                                <div className="version">                                
                                                    &nbsp; {t('accordeon.version-proposee')} <span style={{marginLeft: "1rem"}} className={(elem.etat === 'ACCEPTE') ? "sommaire-approuve" : (elem.etat === 'REFUSE') ? "sommaire-desaprouve" : (elem.etat === 'PRET') ? "sommaire-envoie" : "sommaire-attente"}>
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
                                            <Accordion.Content active={this.state.accordeonOuvert} style={{padding: "0rem", paddingTop: "1rem", marginBottom: "1rem", borderLeft: "1px solid rgba(34,36,38,.15)", borderRight: "1px solid rgba(34,36,38,.15)", borderBottom: "1px solid rgba(34,36,38,.15)"}} >
                                                <SommairePartage 
                                                    votation 
                                                    titre={this.state.media.title} 
                                                    uuid={this.state.proposition.uuid} 
                                                    ayantDroit={this.state.ayantDroit} 
                                                    jetonApi={this.state.jetonApi} 
                                                    />
                                            </Accordion.Content>                                        
                                        </Accordion>                                
                                    )
                                }
                            </div>
                            <div className="ui two wide column" />
                        </div>
                    </div>
                </div>                   
            )
        } else {
            return (<div></div>)
        }
    }
      
}

export default withTranslation()(VotationSplit)