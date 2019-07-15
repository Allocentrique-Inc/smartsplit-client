import React, {Component} from 'react'
import { Translation } from 'react-i18next';

export default class ListePieces extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Translation>
                {
                    t=>
                        <div>
                            <h1>{t('tableaudebord.navigation.0')}</h1>
                        </div>
                }
            </Translation>
        )
    }
}