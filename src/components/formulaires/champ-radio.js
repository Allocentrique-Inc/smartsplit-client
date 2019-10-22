import React, { Component } from 'react'
import classNames from 'classnames'
import { Field } from 'formik';
import InfoBulle from '../partage/InfoBulle';

// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div className="ui radio checkbox">
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
            <label>{label}</label>
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
            <div className="grouped fields">
                <legend>{label}</legend>
                {children}
                {touched && error && (<div className="ui red">{error}</div>)}
            </div>
        </div>
    )
}

export default class BoutonsRadio extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choix: props.choix, // { nom: ..., valeur: ..., info:... }
            titre: props.titre,
            id: props.id,
            onClick: props.onClick,
            actif: props.actif,
            disabled: props.disabled,
            requis: props.requis
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.actif !== nextProps.actif) {
            this.setState({ actif: nextProps.actif })
        }
        if (this.props.disabled !== nextProps.disabled) {
            this.setState({ disabled: nextProps.disabled })
        }
        if (this.props.choix !== nextProps.choix) {
            this.setState({ choix: nextProps.choix })
        }
        if (this.props.touched !== nextProps.touched) {
            this.setState({ touched: nextProps.touched })
        }
    }

    render() {

        let choix = this.state.choix.map((elem, idx) => {
            return (
                <div key={`radioOption_${this.props.name}_${idx}`}>
                    <div className="ui row"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            width: "464px"
                        }}
                        onClick={this.state.onClick}>
                        <Field
                            component={RadioButton}
                            id={this.props.modele}
                            value={elem.valeur}
                            label={elem.nom}
                            checked={parseInt(idx) === parseInt(this.state.actif)}
                            disabled={this.state.disabled}
                        />
                        {elem.info && (<InfoBulle text={elem.info} />)}
                    </div>
                </div>
            )
        })

        return (
            <RadioButtonGroup
                id={`radioGroup_${this.state.id}`}
                label={this.state.titre}
                required={this.state.requis}
            >
                {choix}
            </RadioButtonGroup >
        )
    }

}