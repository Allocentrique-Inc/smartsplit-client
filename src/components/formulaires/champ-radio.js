import React, {Component} from 'react'
import classNames from 'classnames'
import { Field } from 'formik';

// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div>
        <input
            name={name}
            id={id}
            type="radio"
            value={id}
            checked={id === value}
            onChange={onChange}
            onBlur={onBlur}
            className={classNames("radio-button")}
            {...props}
        />
        <label htmlFor={id}>{label}</label>
        </div>
    )
}
  
  // Radio group
const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
 }) => {
    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched
      },
      className
    )
  
    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {children}
        </fieldset>
      </div>
    )
}

export default class BoutonsRadio extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choix: props.choix, // { nom: ..., valeur: ... }
            titre: props.titre,
            id: props.id,
            onClick: props.onClick,
            actif: props.actif
        }
    }

    componentWillReceiveProps(nextProps) {        
        if(this.props.actif !== nextProps.actif) {
            this.setState({actif: nextProps.actif})
        }
    }

    render() {

        let choix = this.state.choix.map((elem, idx)=>{
            return (
                <Field
                    key={`radioOption_${idx}`}
                    component={RadioButton}
                    name="radioGroup"                
                    value={elem.valeur}
                    label={elem.nom}
                    checked={idx == this.state.actif}
                    onClick={this.state.onClick}
                />
            )
        })        

        return (
            <RadioButtonGroup
            id={`radioGroup_${this.state.id}`}
            label={this.state.titre}
            >
                {choix}                
            </RadioButtonGroup>
        )
    }

}