import { observable, action, computed, runInAction, toJS } from "mobx"
import Model from "./BaseModel"

/**
 * the field properties passed as an option object to the Field constructor
 *
 */
declare interface FieldOptions {
	/**
	 * the type must be one of FieldType
	 */
	type?: string;

	/**
	 * hints for UI rendering
	 */
	ui?: string;

	/**
	 * marks a field as primary.
	 *
	 * Model.primaryKey will be set to this field.
	 * Model.save will either 'create' or 'modify'
	 * if the field's value > 0 'modify' will be used
	 * @see Model.save
	 */
	primary?: boolean;

	/**
	 * the language key for label
	 */
	label?: string;

	/**
	 * whether the field is required
	 *
	 * if a function is provided it contains a single
	 * argument of the model instance for multiple
	 * field checking
	 *
	 * @param {Model} model the instance of the model
	 * @returns {boolean} true if the field is required
	 */
	required?: boolean | ((model: Model) => boolean);

	/**
	 * the error message to display if the field is empty and required
	 * should be a lang key
	 */
	requiredMessage?: string;

	/**
	 * unique is an alias for asyncValidation
	 *
	 * this alias exists mostly because checking uniqueness is the
	 * most common use for asynchronous validation
	 *
	 * @param {*} value the value of the field
	 * @param {Model} model the instance of the model
	 * @returns {Promise<null|string>} a promise that resolves to null or an error message lang key
	 */
	unique?: (value: any, model: Model) => Promise<null | string>;

	/**
	 * an asynchronous validation method that returns a promise
	 *
	 * @param {*} value the value of the field
	 * @param {Model} model the instance of the model
	 * @returns {Promise<null|string>} a promise that resolves to null or an error message lang key
	 */
	asyncValidation?: (value: any, model?: Model) => Promise<null | string>;

	/**
	 * set this to true to peform Async validation as well as synchronous validation when the field
	 * value is set
	 */
	asyncValidationOnChange?: boolean;

	/**
	 * a synchronous or local validation function
	 *
	 * the function is passed the value and the model instance
	 * to be able to use other field values in the validation
	 *
	 * @param {*} value the value of the field
	 * @param {Model} model the instance of the model
	 * @returns {null|string} null means the field is valid, the string is the error message. it should be a lang key
	 */
	validation?: (value: any, model: Model) => null | string;

	/**
	 * use this property for fields marked as readonly only
	 *
	 * for default values use the 'default' property
	 * value can either be a static value or a function that returns the value
	 */
	value?: any | ((model: Model) => any);

	/**
	 * the initial value of a field that is NOT readonly
	 */
	default?: any;

	/**
	 * if set, the field will not change
	 */
	readonly?: boolean;

	/**
	 * a string for automated testing. will set the data-testid property
	 */
	testId?: string;

	/**
	 * a function to transform the value for the final output
	 *
	 * the transformed value will NOT be visible imn the UI
	 * a good example of when one would use this would be
	 * to convert quotes or eliminate commas
	 *
	 * if you wish to transform the value of a field as the user is
	 * typing then use format
	 * @see FieldOptions.format
	 *
	 * @param {*} value the value of the field
	 * @param {Model} model the instance of the model
	 * @returns {*} the transformed value
	 */
	transform?: (value: any, model: Model) => any;
	/**
	 * a function to format the input every time it is set
	 *
	 * the value changes as one types and is formatted directly in the field
	 *
	 * @param {*} value the value of the field
	 * @param {Model} model the instance of the model
	 * @returns {*} the formatted value
	 */
	format?: (value: any, model: Model) => any;

	/**
	 * the help text associated with the field
	 */
	help?: string;

	/**
	 * if set to true (default is false) the field and value should not be added to the final object when the model's toJS() function is called
	 */
	pseudo?: boolean;

	/**
	 * a function executed every time the field's setValue(v) function is executed
	 *
	 * @param {*} value the value of the field
	 * @param {Model} model the instance of the model
	 */
	onSet?: (value: any, model: Model) => {};

	/**
	 * a function executed only when the values of the model are initialized
	 *
	 * @param {*} value the value of the field
	 * @param {Model} model the instance of the model
	 */
	onInit?: (value: any, model: Model) => {};
}

export const FieldType = {
	/**
	 * most API calls are expecting 0 or 1 but bool will produce true or false. use a transform to convert to 0 or 1
	 */
	bool: "bool",
	date: "date",
	/**
	 * there is no setting for natural numbers use min property of 1 to ensure that the value is > 0
	 */
	int: "int",
	/**
	 * if the value can be either and int or a float use float
	 */
	float: "float",
	/**
	 * currently np internal validation for json, validate by testing with JSON.parse
	 * @see FieldOptions.validation
	 */
	json: "json",
	/**
	 * to validate strings with a RegExp do it expicitly a function passed to the validation option
	 * @see FieldOptions.validation
	 */
	string: "string",
	/**
	 * no internal validation for polygon types create a validator for it
	 * @see FieldOptions.validation
	 */
	polygon: "polygon",

	/**
	 * in some cases the primary key when loading the model is different than when posting to save
	 * example, a search will have 'id' as its primary when retrieved but to save it needs to be searchId
	 * */
	postAlias: "string",

	/**
	 * html strings are strings but the UI will display them as richtext editors
	 */
	html: "string",

	/**
	 * a collection of plain objects. fields of this type have a value that is an array which can
	 * be iterated for rendering.
	 *
	 * additionally the methods addItem(), removeItem(), setItem(), getItem(), clear() can be used for this type
	 * setValue() expects an array.
	 */
	collection: "collection",

	/**
	 * a key value pair collection setItem(), getItem(), removeItem(), clear() are additional methods that cen be used
	 * setValue() expects an object
	 */
	map: "map",

	/**
	 * like collection but with only unique values
	 */
	set: "set",

	/**
	 * a model collection
	 */
	modelCollection: "ModelCollection",

	/**
	 * a model collection
	 */
	modelMap: "ModelMap",

	/**
	 * when using an object but only a single one (not a collection)
	 */
	object: "object",
}

/**
 * A class that is used within models that derive from Model
 * to define properties as fields that we ultimately want to
 * post to the API
 *
 */
export default class Field {
	/**
	 *
	 * @param {Model} model pass 'this' to the constructor fo the Field
	 * @param {string} fieldName must be identical to the property that is being defined
	 * @param {FieldOptions} options the meta data of the field
	 */
	constructor(model: Model, fieldName: string, options: FieldOptions) {
		this.model = model
		this.model.__fields.push(fieldName)
		if (!options["pseudo"]) this.model.__submittable.push(fieldName)
		this.fieldName = fieldName
		Object.keys(options).forEach((k) => {
			// console.log(`metaData[target][${k}][${property}] = ${options[k]}`)
			// console.log(k);
			switch (k) {
				case "primary":
					if (options["primary"] === true) this.isPrimary = true
					this.model.primaryKey = fieldName
					break
				case "pseudo":
					if (options["pseudo"] === true) this.isPseudo = true
					break
				case "value":
					if (!options.readonly) {
						throw new Error(
							'the "value" is only for readonly fields.if you are trying to alter the value on the fly use the property "format". if you are trying to alter prior to posting use "transform"'
						)
					}
					if (options.default) {
						throw new Error(
							'field cannot have a "value" field and a "default" field.'
						)
					}

					runInAction(() => {
						if (typeof options.value === "function")
							this.initValue(options.value(this, this.model))
						else this.initValue(options.value)
					})
					break
				case "default":
					if (options.readonly) {
						throw new Error("default cannot ne used with readonly fields")
					}
					this.initValue(options.default)
					break
				case "readonly":
					if (options["readonly"] === true) this.isReadonly = true
					break
				case "unique":
					this.asyncValidator = options.unique
					this.hasAsyncValidator = true
					break
				case "asyncValidation":
					this.asyncValidator = options.asyncValidation
					this.hasAsyncValidator = true
					break
				case "validation":
					this.validator = options.validation
					break
				case "testId":
					this.testId = options.testId
					break
				case "required":
					if (typeof options.required === "function")
						this.requiredFunction = options.required
					else if (typeof options.required === "boolean")
						this.requiredFunction = () => options.required
					else {
						throw new Error(
							"Field constructor options: required must be either a function that returns a boolean, or a boolean literal"
						)
					}
					break
				case "type":
					this.type = options.type
					switch (options.type) {
						case FieldType.map:
							this.initValue({})
							break
						case FieldType.collection:
							this.initValue([])
							break
						case FieldType.set:
							this.initValue(new Set())
							break
					}
					break
				default:
					runInAction(() => {
						this[k] = options[k]
					})
			}
		})
		if (!this.isPseudo) this.model.__submittable.push(fieldName)
	}

	isModel = false
	isModelCollection = false

	/**
	 * a reference to the parent model
	 * @type {Model}
	 */
	model: Model = null

	/**
	 * Indicates that the field is the primary key.
	 *
	 * the value is used to determine whether to save by creating or modifying
	 * @type {boolean}
	 */
	isPrimary: boolean = false

	/**
	 * Indicates that the field is a pseudo field.
	 *
	 * if true the fields value will not be included in the final results object
	 *
	 * the value is used to determine whether to save by creating or modifying
	 * @type {boolean}
	 */
	isPseudo: boolean = false

	/**
	 * indicates that the field is read only
	 * @type {boolean}
	 */
	isReadonly: boolean = false

	/**
	 * indicates whether or not an async validator has been assigned
	 * @type {boolean}
	 */
	hasAsyncValidator: boolean = false

	/**
	 * if true will execute async validators when the value of this field changes
	 * @type {boolean}
	 */
	doAsyncValidationOnChange: boolean = false

	/**
	 * a getter that returns the result of the requiredFunction
	 * @returns {boolean}
	 */
	get isRequired(): boolean {
		return this.requiredFunction(this.model)
	}

	/**
	 * indicates the minimum value in a range for numeric properties
	 * @type {null|number}
	 */
	min: null | number = null

	/**
	 * indicates the maximum value in a range for numeric properties
	 * @type {null}
	 */
	max: null | number = null

	/**
	 * the initial value is set when the method Field.initValue is called
	 * @type {string}
	 */
	initialValue: string = ""

	/**
	 * the error message when a reauired field is empty
	 * @type {string}
	 */
	requiredMessage: string = "errors:requiredField"

	/**
	 * the name of the field. used by Model.fields()
	 * @type {string}
	 */
	fieldName: string

	/**
	 * the test id to put as data-testid
	 * @type {string}
	 */
	testId: string = ""

	/**
	 * the help text language key to use for the help text
	 * @type {string}
	 */
	help: string = ""

	/**
	 * UI hint
	 * @type {string}
	 */
	ui: string = ""

	/**
	 * the alias to use for the field when saving
	 * @type {string}
	 */
	postAlias = ""

	/**
	 * the function that determines if a field is required
	 * @param model {Model}
	 * @return {boolean}
	 */
	requiredFunction: (model: Model) => boolean = (model) => false

	/**
	 * the validation function set by FieldOptions.validation
	 * @return {null|string}
	 */
	validator: (value: any, model: Model) => undefined | null | string = (
		value,
		model
	) => null

	/**
	 * a function used by the model's toJS() function when the final values are produced
	 *
	 * @param value
	 * @return {*}
	 */
	transform: (value: any, model?: Model) => any = (value) => value

	/**
	 * a function that changes the value or formats the value each time setValue(v) is called
	 *
	 * @param value
	 * @return {*}
	 */
	format: (model?: Model) => any = (value) => value

	/**
	 * an event handler called when the value is set. this is executed with the new value produced
	 * by format(v,model). tyoically this event handler is used to set other field values
	 * @param value
	 */
	onSet: (model?: Model) => any = (value) => {}

	/**
	 * an event handler called when the value is initialized.
	 * @param value
	 */
	onInit: (model?: Model) => any = (value) => {}

	/**
	 * method to initialize the value.
	 *
	 * the value set by this function determines if the field is dirty
	 * when reset() is called the field will be restored to the value set by this function
	 *
	 * when initValue is called the isDirty automatically becomes
	 * false
	 *
	 * @param v
	 */
	@action
	initValue(v): void {
		v = v === null || v === undefined ? "" : v
		if (!v) {
			switch (this.type) {
				case FieldType.collection:
					if (!v) v = []
					break
				case FieldType.map:
					v = {}
					break
				case FieldType.set:
					v = new Set()
			}
		}

		this.onInit(v, this.model)
		this.setValue(v, true)
		this.initialValue = toJS(this.value)
	}

	/**
	 * method to set the value of the Field
	 * will trigger only local or synchronous validation
	 *
	 * @param newValue
	 */
	setValue(newValue, setReadOnlyField = false) {
		newValue = newValue === null || newValue === undefined ? "" : newValue
		if (this.isReadonly && !setReadOnlyField) return
		runInAction(() => {
			switch (this.type) {
				case FieldType.set:
					this.value = new Set(newValue)
					break
				default:
					this.value = this.format(newValue, this.model)
			}
		})
		this.onSet(this.value, this.model)

		// validation should only flow from the base of the tree down to fields and
		// child models. If a field changes, it should trigger validation of the top most
		// model level, which will then cascade downwards

		if (this.model) {
			let modelToValidate = this.model
			while (modelToValidate.parent) {
				modelToValidate = modelToValidate.parent
			}
			modelToValidate.validateSync()
		}
	}

	/**
	 * an async version  of setValue suitable for cases where waiting for the format or onSet handlers
	 * is crucial for the proper execution of setValue
	 *
	 * use cases for this are cases where setting the value will trigger some asynchronous onSet or format
	 * method which  might, for example make use of a service and then set the value of other fields as a result.
	 *
	 * race conditions can occur if a field has an async `onSet` or `format` handler conflicts with some statements
	 * that might occur after the regular `setValue` action.
	 *
	 * using asyncSetValue guarantees if either onSet or format methods completed and resolved before itself resolving,
	 * thus guaranteeing the order of execution of statements following asyncSetValue
	 *
	 * @param newValue
	 * @param setReadOnlyField
	 * @return {Promise<void>}
	 */
	async asyncSetValue(newValue, setReadOnlyField = false) {
		newValue = newValue === null || newValue === undefined ? "" : newValue
		if (this.isReadonly && !setReadOnlyField) return
		runInAction(async () => {
			this.value = await this.format(newValue, this.model)
		})
		await this.onSet(this.value, this.model)
		if (this.model) {
			this.model.validateSync()
		}
	}

	/**
	 * set a key/value pair in fieldtypes of map
	 *
	 * @param key
	 * @param value
	 */
	@action setItem(key, value) {
		if (this.type !== FieldType.map || this.type)
			switch (this.type) {
				case FieldType.map:
					this.setValue({ ...this.value, [key]: value })
					break
				case FieldType.collection:
					let newValue = toJS(this.value)
					newValue[key] = value
					this.setValue(newValue)
					break
				default:
					throw new Error(
						"Field.setItem can only be used by fields of type FieldType.map"
					)
			}
	}

	/**
	 * Add a new item at the end of a collection
	 * @param value
	 */
	@action push(value) {
		if (this.type === "collection") {
			this.value.push(value)
			this.validateSync()
		} else
			throw new Error(
				"Field.push can only be used by fields of type collection"
			)
	}

	/**
	 * get the value at a specific key (not really necessary since Field.value[key] is what is returned
	 * @param key
	 * @return {string}
	 */
	getItem(key) {
		if (this.type !== FieldType.map)
			throw new Error(
				"Field.getItem can only be used by fields of type FieldType.map"
			)
		return this.value[key]
	}

	/**
	 * a function to clear (empty) field types of collection or map
	 */
	@action clearItems() {
		switch (this.type) {
			case FieldType.map:
				this.setValue({})
				break
			case FieldType.collection:
				this.setValue([])
				break
			default:
				throw new Error(
					"Field.clearItems can only be used by fields of type FieldType.collection or FieldType.map"
				)
		}
	}

	/**
	 * used only by collection / set field types to add an item
	 * @param item
	 */
	@action add(item) {
		switch (this.type) {
			case FieldType.collection:
				this.value.push(item)
				break
			case FieldType.set:
				this.value.add(item)
				this.validateSync()
				break
			default:
				throw new Error(
					"Field.add(item) can only be used with a field type of FieldType of collection or set"
				)
		}

		// this.setValue([...this.value, item])
	}

	get array() {
		if (this.type !== FieldType.collection && this.type !== FieldType.set)
			return [this.value]
		if (this.type === FieldType.map) return Object.values(this.value)
		else return [...this.value]
	}

	/**
	 * used only by set or collection field types to remove an item
	 * @param item
	 */
	@action remove(item) {
		switch (this.type) {
			case FieldType.collection:
				let index = this.value.indexOf(item)
				if (index === -1) return
				let newValue = toJS(this.value)
				newValue.splice(index, 1)
				this.setValue(newValue)
				break
			case FieldType.set:
				this.value.delete(item)
				this.validateSync()
				break
			default:
				throw new Error(
					"Field.add(item) can only be used with a field type of FieldType = collection or set"
				)
		}
	}

	/**
	 * @param id
	 * @return {boolean}
	 */
	includes(id) {
		switch (this.type) {
			case FieldType.map:
				return this.value[id] !== undefined
			case FieldType.collection:
				return (
					this.value.filter((v) => JSON.stringify(v) === JSON.stringify(id))
						.length > 0
				)
			case FieldType.set:
				return this.has(id)
			default:
				throw new Error(
					"Field.includes can only be used by fields of type collection or map"
				)
		}
	}

	/**
	 * used only in set field types
	 * @param item
	 */
	has(item) {
		if (this.type !== FieldType.set)
			throw new Error("has can only be used with field types of 'set'")
		//console.log(this.value)
		//console.log(typeof this.value)
		return this.value.has(item)
	}

	/**
	 * used only by field types of map to remove a key / value pair
	 * @param key
	 */
	@action removeItem(key) {
		if (this.type !== FieldType.map)
			throw new Error(
				"Field.removeItem can only be used by fields of type FieldType.map"
			)
		//console.log(toJS(this.value))
		let newValue = toJS(this.value)
		delete newValue[key]
		this.setValue(newValue)
	}
	/**
	 * this method restores the value set by initValue
	 * and automatically sets isDirty to false
	 */
	@action
	reset() {
		this.value = this.initialValue
		this.error = null
	}

	/**
	 * run the complete validation for a field
	 * first run the synchronous local validation function
	 * then if that passes run the asyncValidator or the unique
	 * @returns {Promise<*>}
	 */
	async validate() {
		// console.log('validating ' + this.fieldName + ' checks uniqueness is ' + (this.hasAsyncValidator ? 'true' : 'false'))
		const localError = this.validateSync()
		if (localError) return localError
		if (!this.error && this.hasAsyncValidator) {
			//console.log("must check uniqueness for " + this.fieldName, 4);
			runInAction(() => {
				this.isAsyncValidating = true
			})
			const error = await this.asyncValidator(this.value, this.model)
			//console.log("uniqueness check for " + this.fieldName + " = " + error, 4);
			runInAction(() => {
				this.isAsyncValidating = false
				this.error = error
			})
			return error
		}
	}

	@action
	validateSync() {
		// first check if  required anc null or empty
		//console.log("validating " + this.fieldName)
		this.error = null
		/*console.log(
      this.fieldName + " required : " + (this.isRequired ? "true" : "false"),
      4,
    );*/
		if (!this.isRequired && !this.value) return null
		if (
			this.isRequired &&
			(this.type === FieldType.collection ||
				this.type === FieldType.modelCollection ||
				this.type === FieldType.set ||
				this.type === FieldType.map ||
				this.type === FieldType.modelMap)
		) {
			if (!this.array.length) this.error = this.requiredMessage
			return this.requiredMessage
		} else if (
			this.isRequired &&
			(this.value === null || this.value === "" || this.value === undefined)
		) {
			this.error = this.requiredMessage
			return this.requiredMessage
		}
		// first validate type and associated max and min values
		// this part will validate ints versus floats
		// if min and max are set and the type is int or float then max and min
		// are compared to the value
		// min and max need not be used, the validation function passed can also handle these ranges

		let error = null
		switch (this.type) {
			case FieldType.int:
				if (isNaN(this.value)) error = "expecting_number"
				else if (this.value - parseInt(this.value) !== 0)
					error = "expecting_integer"
				// this case is for when both min and max are defined
				else if (
					this.min !== null &&
					this.max !== null &&
					this.value < this.min &&
					this.value > this.max
				)
					error = "error_range_min_max"
				// this case is for when only min is defined
				else if (this.min !== null && this.value < this.min) "error_min"
				// this case is for when only max is defined
				else if (this.max !== null && this.value > this.max) error = "error_max"
				break
			case FieldType.float:
				if (isNaN(this.value)) error = "expecting_number"
				else if (
					this.min !== null &&
					this.max !== null &&
					this.value < this.min &&
					this.value > this.max
				)
					error = "error_range_min_max"
				// this case is for when only min is defined
				else if (this.min !== null && this.value < this.min) error = "error_min"
				// this case is for when only max is defined
				else if (this.max !== null && this.value > this.max) error = "error_max"
				break
			default:
				break
		}
		// if there is no type error from above, then run the validator
		// the validator takes the model itself as an argument so that the validator
		// can use other field values in more complex validation
		if (error === null) {
			error = this.validator(this.value, this.model)
		}
		if (error) {
			//console.log(`${this.fieldName} error: ${error}`, 4);
		}
		this.error = error
		return error
	}

	/**
	 *
	 * @param value
	 * @param model
	 * @return {Promise<null>}
	 */
	asyncValidator: (value: string, model: Model) => Promise<string> = async (
		value,
		model
	) => null

	@computed
	get isValid() {
		if (this.error) return false
		return true
	}

	@computed
	get isDirty() {
		// console.log(toJS(this.value))
		// console.log(toJS(this.initialValue))
		return toJS(this.value) !== toJS(this.initialValue)
	}

	@observable
	value = ""

	@observable
	label = ""

	@observable
	type = FieldType.string

	@observable
	error = null

	@observable
	isAsyncValidating = false
}
