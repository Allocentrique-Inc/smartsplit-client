import React, { Component } from 'react'
import { Form } from "semantic-ui-react"
import { FormField } from 'semantic-ui-react-ext'
import { Wizard } from 'semantic-ui-react-formik'

function required(value) {
    const result = value ? undefined : "Ce champ texte est obligatoire"
    return result
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
            <div>                
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
                <i className="right info circle icon blue"></i>
            </div>
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
            <div>
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
                <i className="right info circle icon blue"></i>
            </div>
        )        
    }
}