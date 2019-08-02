import React, {Component} from 'react'
import { Translation } from 'react-i18next'
import axios from 'axios'

import { toast } from 'react-toastify'

export default class ListePieces extends Component {

    constructor(props) {
        super(props)
        this.state = {
            medias: []
        }
    }

    componentWillMount() {
        axios.get('http://api.smartsplit.org:8080/v1/media')
        .then((res)=>{            
            this.setState({medias: res.data})
        })
        .catch((error) => {
            toast.error(error)
            
        })
    }

    render() {        
        
        let tableauMedias = []

        if(this.state.medias.length > 0) {
            tableauMedias = this.state.medias.map((elem, _idx)=>{                
                return (
                    <div key={_idx} style={{marginTop: "20px"}}>                            
                        {`${elem.mediaId} ${elem.title} par ${elem.artist}`}
                    </div>
                )
            })
        }

        return (
            <Translation>
                {
                    t=>
                        <div>
                            <h1>{t('tableaudebord.navigation.0')}</h1>

                            La liste ici
                            <ul>{tableauMedias}</ul>
                            
                        </div>
                }
            </Translation>
        )
    }
}