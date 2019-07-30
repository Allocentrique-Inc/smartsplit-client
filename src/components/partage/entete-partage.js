/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'
import axios from 'axios'

import { toast } from 'react-toastify'

// CSS
import './entete-partage.css'
import { Progress } from "semantic-ui-react";

class PageAssistantPartageAuteur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: this.props.mediaId
        }
    }

    componentWillMount() {
        // Récupérer le média
        axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
        .then(res=>{
            let media = res.data.Item
            this.setState({media: media})
        })
        .catch((error) => {
            toast.error(error)
            
        })
    }
    
    render() {

        return (
            <Translation>
                {
                    (t) =>
                        <div>
                            <div className="entete--partage">
                                {this.state.media && (<span className="entete--partage__media">{this.state.media.title}</span>)}
                                <span className="entete--partage__ariane">{t('flot.etape.partage-etape')} - <strong>{t('flot.etape.partage-titre')}</strong></span>
                                <span style={{cursor: "pointer"}} className="entete--partage__enregistrerEtQuitter">{t('flot.etape.enregistrerEtQuitter')}</span>
                            </div>
                            <Progress percent="10" indicating/>
                        </div>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageAuteur