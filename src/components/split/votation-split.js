import { Identite, AyantsDroit, config, journal } from '../../utils/application'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import SommairePartage from '../partage/partage-sommaire'

const NOM = "VotationSplit"

class VotationSplit extends Component {
  
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

    render() {
        const t = this.props.t
        if (this.state.media) {            
            return (                
                <div className="ui segment">
                    <div className="ui grid" style={{ padding: "10px" }}>
                        <div className="ui row">
                            <div className="ui one wide column" />
                            <div className="ui twelve wide column">
                                <div className="heading2">{t('flot.split.documente-ton-oeuvre.etape.vote-titre', {oeuvre: this.state.media.title})}</div>
                            </div>
                            <div className="ui three wide column"/>
                        </div>
                        <div className="ui row">
                            <div className="ui one wide column" />
                            <div className="ui twelve wide column">
                                {this.state.jeton && (<SommairePartage titre={this.state.media.title} uuid={this.state.proposition.uuid} ayantDroit={this.state.ayantDroit} jetonApi={this.state.jetonApi} />)}
                            </div>
                            <div className="ui three wide column"/>
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
