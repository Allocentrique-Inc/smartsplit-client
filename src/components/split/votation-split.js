
import React, {Component} from 'react'

// Traduction
import { Translation } from 'react-i18next'

// HTTP
import axios from 'axios'

// Composantes
import TableauSommaireSplit from './tableau-sommaire'

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

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
        })
    }    

    render() {           

            return (            
                <Translation>
                    {
                        (t, i18n)=>
                            <div>
                                <h1>{t('flot.voter.soustitre')}</h1>
                                {this.state.jeton && (<TableauSommaireSplit auth={this.props.auth} jeton={this.state.jeton} jetonAPI={this.state.jetonAPI}/>)}
                            </div>
                    }
                </Translation>
            )
//       if(this.props.auth.isAuthenticated()) {
    /*
            return (
                <Translation>
                    {
                        (t, i18n)=>
                            <div>
                                <h1>{t('flot.voter.connexion')}</h1>
                                <Login auth={this.props.auth}/>
                            </div>
                    }
                </Translation>                
            ) */
//      }
        
    }
}

export default VotationSplit