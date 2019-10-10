
import React, { Component } from 'react'

// Traduction
import { Translation } from 'react-i18next'

// HTTP
import axios from 'axios'

import { toast } from 'react-toastify'

// Composantes
import Entete from '../entete/entete'
import SommairePartage from '../partage/partage-sommaire'

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
        axios.post('http://api.smartsplit.org:8080/v1/proposal/decode', body)
            .then((resp) => {
                let _s = resp.data
                this.setState({ jeton: _s })
                // Récupère le nom de l'ayant-droit, pour affichage (il peut ne pas être connecté)
                axios.get(`http://api.smartsplit.org:8080/v1/rightHolders/${_s.rightHolderId}`)
                    .then(res => {
                        let _rH = res.data.Item
                        this.setState({ ayantDroit: _rH })
                        // Récupère la proposition       
                        axios.get(`http://api.smartsplit.org:8080/v1/proposal/${_s.proposalId}`)
                            .then(_r => {
                                this.setState({ proposition: _r.data.Item })
                                // Récupère le média
                                axios.get(`http://api.smartsplit.org:8080/v1/media/${_r.data.Item.mediaId}`)
                                    .then(_rMedia => {
                                        this.setState({ media: _rMedia.data.Item })
                                    })
                                    .catch((error) => {
                                        toast.error(error.message)
                                    })
                            })
                            .catch((error) => {
                                toast.error(error.message)
                            })
                    })
                    .catch((error) => {
                        toast.error(error.message)
                    })
            })
            .catch((error) => {
                toast.error(error)

            })
    }

    render() {

        if (this.state.media) {
            let contenu = (
                <Translation>
                    {
                        t =>
                            <div className="ui ten wide column">
                                <i className="file image outline icon huge grey"></i>
                                {this.state.media && (<span style={{ marginLeft: "15px" }} className="medium-400">{this.state.media.title}</span>)}
                                <span className="heading4" style={{ marginLeft: "50px" }}>{t('flot.split.documente-ton-oeuvre.partage.auteur.titre')}</span>
                            </div>
                    }
                </Translation>
            )

            return (
                <Translation>
                    {
                        (t, i18n) =>
                            <div className="ui segment">
                                <div className="ui grid" style={{ padding: "10px" }}>
                                    <div className="ui row">
                                        <Entete contenu={contenu} sansconnexion={true} />
                                    </div>
                                    <div className="ui row">
                                        <div className="ui one wide column" />
                                        <div className="ui twelve wide column">
                                            {this.state.jeton && (<SommairePartage titre={this.state.media.title} uuid={this.state.proposition.uuid} ayantDroit={this.state.ayantDroit} jetonApi={this.state.jetonApi} />)}
                                        </div>
                                        <div className="ui one wide column">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </Translation>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default VotationSplit