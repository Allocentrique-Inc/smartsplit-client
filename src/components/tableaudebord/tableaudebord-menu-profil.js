import React, {Component} from 'react'
import { Translation } from 'react-i18next';

export default class MenuProfil extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Translation>
                {
                    t=>
                        <div>
                            Menu profil
                        </div>
                }
            </Translation>
        )
    }
}