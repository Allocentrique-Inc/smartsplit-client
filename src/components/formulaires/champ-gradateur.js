import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik-iptoki'
import { Form } from 'semantic-ui-react';

export default class ChampGradateurAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            pourcent: props.pourcent,
            modele: props.modele,
            disabled: props.disabled,
            valeur: props.valeur
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({ etiquette: nextProps.etiquette })
        }
        if (this.props.disabled !== nextProps.disabled) {
            this.setState({ disabled: nextProps.disabled })
        }
        if (this.props.valeur !== nextProps.valeur) {
            this.setState({ valeur: nextProps.valeur })
        }
    }

    render() {
        return (
            <Wizard.Field
                name={this.state.modele}
                component={Form.Input}
                componentProps={{
                    label: this.state.etiquette,
                    value: `${this.state.pourcent}`,
                    min: this.props.min ? this.props.min : 0,
                    max: this.props.max ? this.props.max : 100,
                    step: 1,
                    type: "range",
                    disabled: this.state.disabled,
                    onInput: e => { // Déclenché lorsque le gradateur change de valeur
                        let val = e.target.value
                        this.props.changement(this.props.id, val - this.state.valeur)
                        this.setState({ valeur: val })
                    },
                    onMouseDown: e => {
                        this.setState({ valeur: e.target.value })
                    }
                }}
            />
        )
    }
}