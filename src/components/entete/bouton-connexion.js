import React, {Component} from 'react'
import { Translation } from 'react-i18next';

import { Auth } from 'aws-amplify';

import { toast } from 'react-toastify'

export default class BoutonConnexion extends Component {    

    constructor(props) {
      super(props)
      this.state = {
        user: '',
        initials: ''
      }
    }

    render() {
        return (
            <Translation>
                {
                    t=>
                        <div className="ui medium button">
                            {t('entete.connexion')}
                        </div>
                }
            </Translation>
        )
    }
}