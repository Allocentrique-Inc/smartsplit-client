import React, {Component} from 'react'
import { Form } from "semantic-ui-react"
import { Wizard } from '../formulaires/assistant'

export default class CochesRolesDroit extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            choix: props.choix,
            modele: props.modele,            
            surCoche: props.surCoche // fonction
        }        
    }

    render() {

        let choix = this.state.choix.map((elem, idx)=>{
            return (
                <Wizard.Field
                    key={`coche_role_droit_auteur_${this.state.id}_${idx}`}
                    component={Form.Checkbox}
                    name={`${this.state.modele[idx]}`}
                    label={elem.nom}
                    onClick={this.state.surCoche}
                />
            )
        })

        return (
            <div className="coches--role__droit">
                {choix}
            </div>            
        )
    }
}