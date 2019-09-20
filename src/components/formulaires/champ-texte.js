import React, { Component } from 'react'
import { Form } from "semantic-ui-react"
import { FormField } from 'semantic-ui-react-ext'
import { Wizard } from 'semantic-ui-react-formik'

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
        this.valeur = ""
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
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

    render() {    

        return(
            <div>      {this.state.etiquette}           
                <input 
                    value= {this.state.modele}
                         
                        placeholder = {this.state.indication}
                        required = {this.state.requis}
                        autoFocus = {this.state.autoFocus}
                        type = "email"                  
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
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            lien: props.lien,
            typeLien: props.typeLien,
            disabeld: props.disabled
        }
        this.valeur = props.valeur
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
        if (this.props.lien !== nextProps.lien) {
            this.setState({estLien: nextProps.estLien})
        }
        if (this.props.lien !== nextProps.lien) {
            this.setState({typeLien: nextProps.typeLien})
        }
        if (this.props.disabled !== nextProps.disabled) {
            this.setState({disabled: nextProps.disabled})
        }
        if (this.props.valeur !== nextProps.valeur) {
            this.setState({valeur: nextProps.valeur})
        }
    }

    render() {

        let classType

        switch (this.state.typeLien) {
            case "spotify":
                classType = "spotify"
                break;
            case "youtube":
                classType = "youtube"
                break;
            default:
                classType = "external alternate"
                break;
        }

        let attributs = {
            label: !this.state.lien && this.state.etiquette,
            placeholder: this.state.indication,
            required: this.state.requis,
            autoFocus: this.state.autoFocus,
            disabled: this.state.disabled
        }

        if(this.props.changement)
            Object.assign(attributs, {onInput: e=>{
                let val = parseInt(e.target.value)
                this.props.changement(this.props.id, val - this.valeur)
                this.valeur = val
            }})

        return(
            <div>                
                <Wizard.Field
                    name={this.state.modele}
                    component={FormField}
                    componentProps={attributs}
                    validate={this.state.requis && required}
                />
                {this.state.lien && (<a href={this.state.lien} target={`lien--${classType}`}><i className={`right ${classType} icon big`}></i></a>)}
                {this.props.info && (<i className="right info circle icon blue"></i>)}
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