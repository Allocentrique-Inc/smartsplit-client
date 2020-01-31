// eslint-disable-next-line
import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import { journal, config } from '../../utils/application'

const NOM = "SauvegardeAutomatiqueMedia"

class SauvegardeAutomatiqueMedia extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etat: props.etat,
            interval: props.interval,
            values: props.values
        }
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

    componentDidMount() {
        if (!this.state.autoDemarre) {this.sauvegardeAuto()}
    }

    sauvegardeAuto() {        
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
                            journal.debug(`${NOM}`, "Sauvegarde automatique")
                            axios.post(`${config.API_URL}media`, _vals)
                            .then((response) => {
                                this.setState({autoDemarre: false}, ()=>this.sauvegardeAuto())                                
                            })
                        }, this.state.interval)
                    }
                )
            }            
        }
    }

    render() {
        return (
            <div/>
        )
    }

}
export default SauvegardeAutomatiqueMedia