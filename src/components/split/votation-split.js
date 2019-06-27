
import React, {Component} from 'react'

// Traduction
import { Translation } from 'react-i18next'

// Composantes
import TableauSommaireSplit from './tableau-sommaire'

class VotationSplit extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            ayantDroitId: props.rightHolderId,
            splitId: props.splitId
        }
    }

    render() {

        return (            
            <Translation>
                {
                    (t, i18n)=>
                        <div>
                           
                        </div>
                }
            </Translation>                                
        )
    }
}

export default VotationSplit