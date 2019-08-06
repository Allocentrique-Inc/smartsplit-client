
import React, {Component} from 'react'

// Traduction
import { Translation } from 'react-i18next'

// HTTP
import axios from 'axios'

import { toast } from 'react-toastify'

// Composantes
import TableauSommaireSplit from './tableau-sommaire'

class VotationSplit extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            split: null,
            jetonAPI: props.jeton
        }

        // Décoder le jeton
        let body = {jeton: this.props.jeton}
        axios.post('http://api.smartsplit.org:8080/v1/proposal/decode', body)
        .then((resp)=>{
            let _s = resp.data                                    
            this.setState({jeton: _s})
            // Récupère le nom de l'ayant-droit, pour affichage
            axios.get(`http://api.smartsplit.org:8080/v1/rightHolders/${_s.rightHolderId}`)
            .then(res=>{
                let _rH = res.data.Item
                this.setState({nomUsager: `${_rH.firstName} ${_rH.lastName}` })
            })
            .catch((error) => {
                toast.error(error)
                
            })
        })
        .catch((error) => {
            toast.error(error)
            
        })

    }    

    render() {           

            return (            
                <Translation>
                    {
                        (t, i18n)=>
                            <div>
                                <h1>{t('flot.voter.soustitre', {nom: this.state.nomUsager})}</h1>
                                {this.state.jeton && (<TableauSommaireSplit auth={this.props.auth} jeton={this.state.jeton} jetonAPI={this.state.jetonAPI}/>)}
                            </div>
                    }
                </Translation>
            )
        
    }
}

export default VotationSplit