import React, {Component} from 'react'
import { Translation } from 'react-i18next';

export default class BoutonConnexion extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Translation>
                {
                    t=>
                        <div>
                            Bouton Profil
                        </div>
                }
            </Translation>
        )
    }
}