import React, {Component} from 'react'
import axios from 'axios'
import { Translation } from 'react-i18next'
import moment from 'moment'

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

                            // Correction de l'attribut cover si ce n'est pas une chaîne de caractères
                            let _vals = this.state.values
                            _vals.cover = `${this.state.values.cover}`

                            // Formattage des dates
                            let dateheure = _vals.creationDate
                            if(moment(dateheure, "DD-MM-YYYY HH:mm").isValid()) {
                                _vals.creationDate = moment(dateheure, "DD-MM-YYYY HH:mm").format('x')
                            }

                            axios.post('http://dev.api.smartsplit.org:8080/v1/media', _vals)
                            .then((response) => {
                                this.setState({autoDemarre: false})
                            })
                            
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
