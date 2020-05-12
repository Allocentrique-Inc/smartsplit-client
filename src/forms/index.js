import React, { useState, useEffect, useContext } from "react"
import { LabelText } from "./label"
import _TextField from "./text"
import _PasswordField from "./password"
import _CheckBox from "./checkbox"
import {
	RadioButton as _RadioButton,
	RadioGroup as _RadioGroup,
	RadioGroupButton,
} from "./radio"
import Dropdown from "./dropdown"
import TextDropdown from "./text-dropdown"
import _Select from "./select"
import { PhoneNumberField as _PhoneNumberField } from "./phone-number"
import { DateField as _DateField } from "./date"
import useImagePicker from "./image-picker"

export { LabelText, RadioGroupButton, Dropdown, TextDropdown, useImagePicker }

export const FormContext = React.createContext()

export class Form extends React.PureComponent {
	static contextType = FormContext

	constructor(props) {
		super(props)

		this.form = {
			submit: this.handleSubmit.bind(this),
			fields: {},
			field: this.getField.bind(this),
		}

		if (props.values) this.setValues(props.values)

		// strict
		// onChange
		// onSubmit
	}

	setValues(values) {
		this.form.fields = {}

		for (let key in values) {
			this.form.fields[key] = this.newField(key, values[key])
		}
	}

	getField(name) {
		if (this.form.fields[name]) {
			return this.form.fields[name]
		}

		if (this.props.strict) {
			throw new Error(
				"Field `" +
					name +
					"` does not exist in this form and strict mode is enabled"
			)
		}

		return this.newField(name)
	}

	newField(name, value, error) {
		const field = Object.create(null)
		const listeners = []

		function notifyListeners() {
			listeners.forEach((l) => l(value, error))
		}

		function addListener(fn) {
			if (listeners.indexOf(fn) < 0) {
				listeners.push(fn)
			}
		}

		function removeListener(fn) {
			const index = listeners.indexOf(fn) < 0

			if (index >= 0) {
				listeners.splice(index, 1)
			}
		}

		Object.defineProperties(field, {
			value: {
				enumerable: true,
				configurable: false,
				get: function () {
					return value
				},
				set: function (next) {
					value = next
					notifyListeners()
				},
			},

			error: {
				enumerable: true,
				configurable: false,
				get: function () {
					return error
				},
				set: function (next) {
					error = next
					notifyListeners()
				},
			},

			subscribe: {
				enumerable: true,
				configurable: false,
				value: addListener,
			},

			unsubscribe: {
				enumerable: true,
				configurable: false,
				value: removeListener,
			},
		})

		this.form.fields[name] = field
		return field
	}

	handleSubmit() {
		const values = {}

		for (let key in this.form.fields) {
			values[key] = this.form.fields[key].value
		}

		this.props.onSubmit(values)
	}

	render() {
		return (
			<FormContext.Provider value={this.form}>
				{typeof this.props.children === "function"
					? this.props.children({ submit: this.form.submit })
					: this.props.children}
			</FormContext.Provider>
		)
	}
}

export function useForm() {
	return useContext(FormContext)
}

export function useFormField(name) {
	const form = useContext(FormContext)

	if (!form) return null

	const formField = form.field(name)

	const field = Object.create(null)
	const [value, setValue] = useState(formField.value)
	const [error, setError] = useState(formField.error)

	useEffect(function () {
		function handler(newValue, newError) {
			setValue(newValue)
			setError(newError)
		}

		form.field(name).subscribe(handler)

		return function () {
			form.field(name).unsubscribe(handler)
		}
	})

	Object.defineProperties(field, {
		value: {
			enumerable: true,
			configurable: false,
			get: function () {
				return value
			},
			set: function (next) {
				formField.value = next
			},
		},
		error: {
			enumerable: true,
			configurable: false,
			get: function () {
				return error
			},
			set: function (next) {
				formField.error = next
			},
		},
	})

	return field
}

export function wrapSimpleField(component, valueProp, onChangeProp) {
	return function (props) {
		const { name, error, children, ...nextProps } = props
		const form = useFormField(name)

		nextProps.error = error

		if (form && name) {
			if (!nextProps[valueProp]) {
				nextProps[valueProp] = form.value
			}

			if (!nextProps[onChangeProp]) {
				nextProps[onChangeProp] = (value) => (form.value = value)
			}

			if (!nextProps.error) {
				nextProps.error = form.error
			}
		}

		return React.createElement(component, nextProps, children)
	}
}

export function FormSubmit({ children }) {
	const form = useContext(FormContext)
	return children(form.submit.bind(form))
}

export const TextField = wrapSimpleField(_TextField, "value", "onChangeText")
export const PasswordField = wrapSimpleField(
	_PasswordField,
	"value",
	"onChangeText"
)
export const CheckBox = wrapSimpleField(_CheckBox, "checked", "onChange")
export const RadioButton = wrapSimpleField(_RadioButton, "checked", "onChange")
export const RadioGroup = wrapSimpleField(_RadioGroup, "value", "onChange")
export const Select = wrapSimpleField(_Select, "value", "onChange")
export const PhoneNumberField = wrapSimpleField(
	_PhoneNumberField,
	"value",
	"onChangeText"
)
export const DateField = wrapSimpleField(_DateField, "value", "onChangeText")
