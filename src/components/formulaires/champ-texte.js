import React, { Component } from 'react'
import { Form, Input } from "semantic-ui-react"
import { FormField } from 'semantic-ui-react-ext'
import { Wizard } from '../formulaires/assistant'

function required(value) {
    const result = value ? undefined : "Ce champ texte est obligatoire"
    return result
}

export class ChampCourrielAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis
        }
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({ etiquette: nextProps.etiquette })
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({ indication: nextProps.indication })
        }
        if (this.props.modele !== nextProps.modele) {
            this.setState({ modele: nextProps.modele })
        }
    }

    validerCourriel(valeur) {
        let erreur;
        if (!valeur) {
            erreur = 'Requis';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(valeur)) {
            erreur = 'Adresse invalide';
        }
        return erreur;
    }

    onChange(e) {
        this.setState({ modele: e.target.value })
    }

    render() {

        return (
            <div>
                {this.state.etiquette}
                <Input
                    value={this.state.modele}
                    placeholder={this.state.indication}
                    required={this.state.requis}
                    autoFocus={this.state.autoFocus}
                    type="email"
                    onChange={this.onChange}
                />
                {this.props.info && (<i className="right info circle icon blue"></i>)}
            </div>
        )
    }
}

export class ChampTexteAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            className: props.className,
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            lien: props.lien,
            typeLien: props.typeLien,
            disabled: props.disabled,
            soustexte: props.soustexte,
            style: props.style || {},
            valeur: props.valeur,
            type: props.type || "text"
        }
        this.valeur = props.valeur
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({ etiquette: nextProps.etiquette })
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({ indication: nextProps.indication })
        }
        if (this.props.lien !== nextProps.lien) {
            this.setState({ estLien: nextProps.estLien })
        }
        if (this.props.lien !== nextProps.lien) {
            this.setState({ typeLien: nextProps.typeLien })
        }
        if (this.props.disabled !== nextProps.disabled) {
            this.setState({ disabled: nextProps.disabled })
        }
        if (this.props.valeur !== nextProps.valeur) {
            this.setState({ valeur: nextProps.valeur })
        }
        if (this.props.soustexte !== nextProps.soustexte) {
            this.setState({ soustexte: nextProps.soustexte })
        }
        if (this.props.style !== nextProps.style) {
            this.setState({ style: nextProps.style })
        }
    }

    render() {

        let attributs = {
            label: !this.state.lien && this.state.etiquette,
            placeholder: this.state.indication,
            required: this.state.requis,
            autoFocus: this.state.autoFocus,
            disabled: this.state.disabled,
            className: this.state.className,
            type: this.state.type
        }

        if (this.props.changement)
            Object.assign(attributs, {
                onInput: e => {
                    e.target.value = e.target.value.replace(',', '.')
                    let val = parseFloat(e.target.value)
                    if (Number.isNaN(val)) {
                        val = 0
                    }
                    this.props.changement(this.props.id, parseFloat((val - this.state.valeur).toFixed(4)), e)
                    this.setState({ valeur: val })
                }
            })

        return (
            <div>
                <Wizard.Field
                    name={this.state.modele}
                    component={FormField}
                    componentProps={attributs}
                    validate={this.state.requis && required}                    
                />
                {this.props.info && (<i className="right info circle icon blue"></i>)}
                {this.state.soustexte && (<p className="undertext">{this.state.soustexte}</p>)}
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
            this.setState({ etiquette: nextProps.etiquette })
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({ indication: nextProps.indication })
        }
    }

    render() {
        return (
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