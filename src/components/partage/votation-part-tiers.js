import {Identite, AyantsDroit, config, journal} from '../../utils/application'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import PartageSommaireEditeur from './partage-sommaire-editeur'

const NOM = "VotationParTiers"

class VotationPartTiers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            split: null,
            jetonApi: props.jeton
        }
    }

    componentWillMount() {
        // Décoder le jeton        
        let body = { jeton: this.state.jetonApi }
        axios.post(`${config.API_URL}proposal/decode`, body)
        .then((resp) => {
            let _s = resp.data
            this.setState({ jeton: _s })
            // Récupère le nom de l'ayant-droit, pour affichage (il peut ne pas être connecté)
            this.setState({ ayantDroit: AyantsDroit.ayantsDroit[_s.beneficiaire] })
            // Récupère la proposition       
            axios.get(`${config.API_URL}proposal/${_s.proposalId}`)
            .then(_r => {
                this.setState({ proposition: _r.data.Item })
                // Récupère le média
                axios.get(`${config.API_URL}media/${_r.data.Item.mediaId}`)
                .then(_rMedia => {
                    this.setState({ media: _rMedia.data.Item })
                    // Récupère la part de partage avec le tier
                    axios.get(`${config.API_URL}splitShare/${this.state.jeton.proposalId}/${this.state.jeton.donateur}`)
                    .then(res => {
                        // Trouve la bonne version
                        res.data.forEach(e=>{
                            if(e.version === _s.version) {
                                this.setState({ part: e })
                            }
                        })
                    })
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
            journal.error(NOM, error.message)
        })
        if(Identite.usager) {
            this.setState({user: Identite.usager})
        }        
    }

    render() {
        if (this.state.media && this.state.part) {
            let t = this.props.t
            return (        
                <div className="ui grid" style={{ padding: "10px" }}>
                    <div className="ui row">
                        <div className="ui two wide column" />
                        <div className="ui twelve wide column">
                            <div className="heading2" style={{margin: "0rem"}}>{t('flot.split.documente-ton-oeuvre.etape.vote-titre', {oeuvre: this.state.media.title})}</div>
                        </div>
                        <div className="ui two wide column" />
                    </div>
                    <div className="ui row">
                        <div className="ui two wide column" />
                        <div className="ui twelve wide column">
                            {this.state.jeton && 
                            (<PartageSommaireEditeur part={this.state.part} proposition={this.state.proposition} ayantDroit={this.state.ayantDroit} jetonApi={this.state.jetonApi} />)}
                        </div>
                        <div className="ui two wide column">
                        </div>
                    </div>
                </div>          
            )
        } else {
            return (<div></div>)
        }
    }
}

export default withTranslation()(VotationPartTiers)
