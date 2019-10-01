
import React, {Component} from 'react'

// Traduction
import { Translation } from 'react-i18next'

// HTTP
import axios from 'axios'

import { toast } from 'react-toastify'

// Composantes
import Entete from '../entete/entete'
import PartageSommaireEditeur from './partage-sommaire-editeur'

export default class VotationPartTiers extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            split: null,            
            jetonApi: props.jeton
        }

    }

    componentWillMount() {                
        // Décoder le jeton        
        let body = {jeton: this.state.jetonApi}
        axios.post('http://api.smartsplit.org:8080/v1/proposal/decode', body)
        .then((resp)=>{            
            let _s = resp.data
            this.setState({jeton: _s})
            // Récupère le nom de l'ayant-droit, pour affichage (il peut ne pas être connecté)
            axios.get(`http://api.smartsplit.org:8080/v1/rightHolders/${_s.beneficiaire}`)
            .then(res=>{                
                let _rH = res.data.Item
                this.setState({ayantDroit: _rH})
                // Récupère la proposition       
                axios.get(`http://api.smartsplit.org:8080/v1/proposal/${_s.proposalId}`)
                .then(_r=>{                    
                    this.setState({proposition: _r.data.Item})
                    // Récupère le média
                    axios.get(`http://api.smartsplit.org:8080/v1/media/${_r.data.Item.mediaId}`)
                    .then(_rMedia=>{                        
                        this.setState({media: _rMedia.data.Item})
                        // Récupère la part de partage avec le tier
                        axios.get(`http://api.smartsplit.org:8080/v1/splitShare/${this.state.jeton.proposalId}/${this.state.jeton.donateur}`)
                        .then(res=>{
                            this.setState({part: res.data})
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
                toast.error(error.message)                
            })
        })
        .catch((error) => {
            toast.error(error.message)
            
        })
    }

    render() {           

        if(this.state.media && this.state.part) {
            let contenu = (
                <Translation>
                    {
                        t =>
                            <div className="ui ten wide column">
                                <i className="file image outline icon huge grey"></i>
                                    {this.state.media && (<span style={{marginLeft: "15px"}} className="medium-400">{this.state.media.title}</span>)}
                                    <span className="heading4" style={{marginLeft: "50px"}}>{t('flot.split.documente-ton-oeuvre.etape.partage-titre')}</span>                            
                            </div>
                    }                    
                </Translation>
            )        
    
            return (            
                <Translation>
                    {
                        (t, i18n)=>
                            <div className="ui segment">                    
                                <div className="ui grid" style={{padding: "10px"}}>
                                    <div className="ui row">
                                        <Entete contenu={contenu} sansconnexion={true} />
                                    </div>
                                    <div className="ui row">
                                        <div className="ui one wide column" />
                                        <div className="ui twelve wide column">
                                            {this.state.jeton && (<PartageSommaireEditeur part={this.state.part} proposition={this.state.proposition} ayantDroit={this.state.ayantDroit} jetonApi={this.state.jetonApi} />)}
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