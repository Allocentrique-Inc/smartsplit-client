import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik'
import { Form } from 'semantic-ui-react';

export default class ChampGradateurAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            pourcent: props.pourcent,
            modele: props.modele,
            disabled: props.disabled
        }
        this.valeur = 0
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.disabled !== nextProps.disabled) {
            this.setState({disabled: nextProps.disabled})
        }
    }

    render() {
        return(
            <Wizard.Field
                name={this.state.modele}
                component={Form.Input}
                componentProps={{
                    label: this.state.etiquette,
                    value: `${this.state.pourcent}`,
                    min: 0,
                    max: 100,
                    step: 1,
                    type: "range",
                    disabled: this.state.disabeld,
                    onInput: e=>{ // Déclenché lorsque le gradateur change de valeur
                        let val = e.target.value
                        this.props.changement(this.props.id, val - this.valeur)
                        this.valeur=val                        
                    },
                    onMouseDown: e=>{
                        this.valeur = e.target.value
                    }
                }}
            />
        )        
    }
}