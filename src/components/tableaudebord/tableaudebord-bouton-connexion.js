import React, {Component} from 'react'
import { Translation } from 'react-i18next';
import { Auth } from 'aws-amplify';
import axios from 'axios'
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
                            Connexion
                        </div>
                }
            </Translation>
        )
    }
}