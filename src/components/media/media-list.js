import React, { Component } from 'react'
import JSONPretty from 'react-json-prettify'

// Traduction
import { Translation } from 'react-i18next'

import Configuration from '../../utils/configuration'
let config = Configuration.getInstance()

export default class MediaList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            donnees: []
        }
    }

    componentDidMount() {
        // Récupère la liste des médias
        this.listeMedias()
    }

    listeMedias() {

        // Récupérer la liste des médias depuis l'API
        const options = {
            method: 'GET',
            credentials: 'omit',
            headers: {             
            }
        }        

        fetch(`${config.APIURL}media`, options).then((response) => {
            return response.json()
        })
        .then((jsonObject) => {
            this.setState({donnees: jsonObject})
        })
        .catch((error) => {
            throw(error)
        })
    }

    render() {               
        return (
            <Translation>
                {
                    (t) =>
                        <div>
                            <h1>{t('titre.liste-media')} (GET /media)</h1>
                            <div style={{textAlign: "left"}}>
                                <JSONPretty json={this.state.donnees} />
                            </div>
                        </div>
                }                
            </Translation>
        )
    }
}