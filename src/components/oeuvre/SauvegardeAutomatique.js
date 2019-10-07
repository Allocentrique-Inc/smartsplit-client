import React, {Component} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Translation } from 'react-i18next'

export class SauvegardeAutomatiqueMedia extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etat: props.etat,
            interval: props.interval,
            values: props.values
        }
        this.sauvegardeAuto = this.sauvegardeAuto.bind(this)
    }

    componentWillReceiveProps(nextPros) {
        if(this.props.etat !== nextPros.etat) {
            this.setState({etat: nextPros.etat})
        }
        if(this.props.interval !== nextPros.interval) {
            this.setState({interval: nextPros.interval})
        }
        if(this.props.values !== nextPros.values) {
            this.setState({values: nextPros.values})
        }
    }

    sauvegardeAuto(t) {
        if(this.state.etat) {
            if(!this.state.autoDemarre) {
                this.setState({autoDemarre: true},
                    ()=>{                        
                        setTimeout(()=>{
                            // Sauvegarde des valeurs dans la base de données
                            axios.post('http://api.smartsplit.org:8080/v1/media', this.state.values)
                            .then((response) => {
                                console.log(t('flot.split.documente-ton-oeuvre.documenter.sauvegarde'))
                            })
                            this.setState({autoDemarre: false})
                        }, this.state.interval)
                    }
                )
            }            
        }
    }

    render() {
        return (
            <Translation>
                {
                    t=>
                        <>
                            {
                                !this.state.autoDemarre && this.sauvegardeAuto(t) // Déclenchement initial
                            }
                        </>
                }
            </Translation>            
        )
    }

}
