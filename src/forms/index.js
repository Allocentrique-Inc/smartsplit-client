import React, { useState, useEffect, useContext } from "react"
import { LabelText } from "./label"
import _TextField from "./text"
import _PasswordField from "./password"
import {
	CheckBox as _CheckBox,
	CheckBoxGroup as _CheckBoxGroup,
	CheckBoxGroupButton,
} from "./checkbox"
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
import _FileField from "./file"
import useImagePicker from "./image-picker"
import _SearchAndTag from "./search-and-tag"

export {
	LabelText,
	RadioGroupButton,
	Dropdown,
	TextDropdown,
	useImagePicker,
	CheckBoxGroupButton,
}

export const FormContext = React.createContext()

export class Form extends React.PureComponent {
	static contextType = FormContext

	constructor(props) {
		super(props)

		this.form = {
			submit: this.submit.bind(this),
			fields: {},
			field: this.getField.bind(this),
		}

		if (props.values) this.setValues(props.values)

		// strict
	}

	setValues(values) {
		this.form.fields = {}

		for (let key in values) {
			this.form.fields[key] = this.newField(key, values[key])
		}

		this._notifyChange()
	}

	updateValues(values) {
		for (let key in values) {
			this.getField(key).value = values[key]
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

	getFields() {
		return this.form.fields
	}

	newField(name, value, error) {
		const field = Object.create(null)
		const listeners = []

		const notifyListeners = () => {
			listeners.forEach((l) => l(value, error))
			this._notifyChange(name, value)
		}

		const addListener = (fn) => {
			if (listeners.indexOf(fn) < 0) {
				listeners.push(fn)
			}
		}

		const removeListener = (fn) => {
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

			formValue: {
				enumerable: true,
				configurable: false,
				writable: true,
				value: value,
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

	getValues() {
		const values = {}

		for (let key in this.form.fields) {
			values[key] = this.form.fields[key].value
		}

		return values
	}

	UNSAFE_componentWillUpdate(nextProps) {
		if (nextProps.values === this.props.values) return

		const values = nextProps.values

		for (let name in nextProps.values) {
			let field = this.form.fields[name]
			let value = values[name]

			if (field) {
				if (field.formValue !== value) {
					field.value = field.formValue = value
				}
			} else {
				this.newField(name, value)
			}
		}
	}

	_notifyChange(key, value) {
		if (this.props.onChange) {
			this.props.onChange.call(this, this.getValues())
		}
	}

	submit() {
		this.props.onSubmit.call(this, this.getValues())
	}

	reset() {
		this.setValues(this.props.values || {})
	}

	clearErrors() {
		for (let k in this.form.fields) {
			this.form.fields[k].error = null
		}
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
		const form = name && useFormField(name)

		nextProps.error = error

		if (form && name) {
			if (!nextProps[valueProp]) {
				nextProps[valueProp] = form.value
			}

			if (!nextProps[onChangeProp]) {
				nextProps[onChangeProp] = function (value, ...args) {
					form.value = value

					if (props[onChangeProp]) {
						props[onChangeProp](value, ...args)
					}
				}
			}

			if (!nextProps.error) {
				nextProps.error = form.error
			}
		}

		return React.createElement(component, nextProps, children)
	}
}

export function wrapMultipleChoiceField(component) {
	return ({ name, error, onSelect, onUnselect, children, ...nextProps }) => {
		const formField = name && useFormField(name)
		nextProps.error = error

		const selection = formField ? formField.value : null
		if (formField) {
			onSelect = onSelect
				? onSelect
				: (value) => {
						if (!selection.includes(value)) {
							selection.push(value)
							formField.value = [...selection]
						}
				  }
			onUnselect = onUnselect
				? onUnselect
				: (value) => {
						selection.splice(selection.indexOf(value), 1)
						formField.value = [...selection]
				  }
			if (!nextProps.error) {
				nextProps.error = formField.error
			}
		}
		return React.createElement(
			component,
			{ selection, onSelect, onUnselect, ...nextProps },
			children
		)
	}
}

export function FormSubmit({ children }) {
	const form = useContext(FormContext)
	return children(form.submit.bind(form))
}

export function FormValue({ name }) {
	const field = useFormField(name)
	return children(field.value)
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
export const FileField = wrapSimpleField(_FileField, "file", "onFileChange")

export const SearchAndTag = wrapMultipleChoiceField(_SearchAndTag)
export const CheckBoxGroup = wrapMultipleChoiceField(_CheckBoxGroup)
