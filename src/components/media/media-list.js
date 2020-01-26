import React, { Component } from 'react'
import JSONPretty from 'react-json-prettify'
import { withTranslation } from 'react-i18next'
import {config} from '../../utils/application'

class MediaList extends Component {

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

        fetch(`${config.API_URL}media`, options).then((response) => {
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
        const t = this.props.t
        return (            
            <div>
                <h1>{t('titre.liste-media')} (GET /media)</h1>
                <div style={{textAlign: "left"}}>
                    <JSONPretty json={this.state.donnees} />
                </div>
            </div>
        )
    }
}
export default withTranslation()(MediaList)