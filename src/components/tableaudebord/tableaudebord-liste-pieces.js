import React, {Component} from 'react'
import { Translation } from 'react-i18next';
import axios from 'axios';

export default class ListePieces extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        let tableauMedias = []

        axios.get('http://api.smartsplit.org:8080/v1/media')
        .then((res)=>{
            tableauMedias = res.data.map((elem, _idx)=>{
                console.log(elem)                
                return (
                    <div key={_idx} style={{marginTop: "20px"}}>
                        {`${JSON.stringify(elem)}`}
                    </div>
                )
            })

            console.log(tableauMedias)
        })
        .catch(err=>{
            console.log(err)
        })

        return (
            <Translation>
                {
                    t=>
                        <div>
                            <h1>{t('tableaudebord.navigation.0')}</h1>

                            La liste ici
                            {tableauMedias}
                            
                        </div>
                }
            </Translation>
        )
    }
}