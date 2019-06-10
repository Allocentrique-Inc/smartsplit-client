import React, { Component } from 'react'
import { Form } from "semantic-ui-react"
import { FormField } from 'semantic-ui-react-ext'
import { Wizard } from 'semantic-ui-react-formik'

function required(value) {
    const result = value ? undefined : "Ce champ texte est obligatoire"
    return result
}

export class ChampTexte extends Component {

    constructor(props) {
        super(props)
        let t = this.props.t
        this.state = {
            etiquette: t('oeuvre.attribut.etiquette.titre'), 
            indication: t('oeuvre.attribut.indication.titre'),
            modele: props.modele
        }
    }

    render() {
        return (<div></div>)
    }

}

export class ChampTexteAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
    }

    render() {
        return(
            <Wizard.Field
                name={this.state.modele}
                component={FormField}
                componentProps={{
                    label: this.state.etiquette,
                    placeholder: this.state.indication,
                    required: this.state.requis,
                    autoFocus: this.state.autoFocus
                }}
                validate={this.state.requis && required}
            />
        )        
    }
}

export class ChampTexteLongAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
    }

    render() {
        return(
            <Wizard.Field
                name={this.state.modele}
                component={Form.TextArea}
                componentProps={{
                    label: this.state.etiquette,
                    placeholder: this.state.indication,
                    required: this.state.requis,
                    autoFocus: this.state.autoFocus
                }}
                validate={this.state.requis && required}
            />
        )        
    }
}