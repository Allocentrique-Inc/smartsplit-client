// import {validate, ValidationError} from 'class-validator';
// import {createViewModel} from 'mobx-utils';
import { observable, runInAction, toJS, action, computed } from "mobx"

/**
 *  BaseModel is an observable class that contains methods and properties
 *  to help with UI forms and with saving to the server
 */
export default class BaseModel {
	/**
	 *  constructs the model and if a parent model is provided,
	 *  it will add itself as one of the parent model's children
	 *
	 * @param {*} parent
	 * @memberof BaseModel
	 */
	constructor(parent) {
		this.parent = parent
		if (parent) {
			this.parent.addModel(this)
		}
	}
	addModel(child) {
		this.children.push(child)
	}

	isModel = true
	parent
	children = []
	/**
	 * the field which is the primary key of the form
	 *
	 * set by a Field with option primary set to true.
	 * this is used to determine if a model is new or an existing entry
	 * @type {string}
	 */
	primaryKey = ""

	/**
	 * configuration used the Model.save()
	 *
	 * BaseModel.config.create will be used when the primary key field's value is 0
	 * config.modify in cases where the primary key field's value > 0
	 * @type {{create: null, modify: null}}
	 */
	config = {
		create: null,
		modify: null,
	}

	/**
	 * a list fields populated by individual Field constructors which add themselves to this
	 * array when the model is constructed. value is accessed by function BaseModel.fields()
	 *
	 * @type {Array}
	 * @private
	 */
	__fields = []
	__submittable = []
	/**
	 * this is set when BaseModel.save() is called during validation and saving
	 * @type {boolean}
	 */
	@observable
	busy: boolean = false

	/**
	 * a getter that runs through the list of fields an will return true if ALL fields are valid
	 * @type {boolean}
	 */
	@computed
	get isValid() {
		// this.fields().map(k=>this[k].isValid).reduce((prev,current)=>prev && current,true)
		let validity = true
		this.fields().forEach((k) => {
			if (!this[k].isValid) validity = false
		})
		this.children.forEach((model) => {
			if (!model.isValid) validity = false
		})
		return validity
	}

	/**
	 * a getter that runs through the fields and returns true if ANY field is dirty
	 * @type {boolean}
	 */
	@computed
	get isDirty() {
		// this.fields().map(k=>this[k].isDirty).reduce((prev,current)=>prev || current,false)
		let dirty = false
		this.fields().forEach((k) => {
			if (this[k].isDirty) dirty = true
		})
		this.children.forEach((model) => {
			if (model.isDirty) dirty = true
		})
		return dirty
	}

	@computed
	get isPristine() {
		return !this.isDirty
	}

	@observable validated = false

	@observable initialized = false

	@observable initialData = null

	/**
	 * determines if the model is new or not based on whether or not
	 * the init function received initial values.
	 * @return {boolean}
	 */
	@computed get isNew() {
		return this.initialData === null || this.initialData === {}
	}

	/**
	 * returns the list of fields. useful for iterating in components
	 * @returns {string[]}
	 */
	fields() {
		return this.__fields
	}

	partialValidity(fields) {
		let validity = true
		fields.forEach((k) => {
			if (!this[k].isValid) validity = false
		})
		return validity
	}

	/**
	 * extract an object with the field values
	 * @returns {{}}
	 */
	toJS(excludePrimary = false) {
		const js = {}
		this.__submittable.forEach((k) => {
			if (excludePrimary && k === this.primaryKey) return
			const value = toJS(this[k].transform(this[k].value, this))
			if (this[k].postAlias) js[this[k].postAlias] = value
			else js[k] = toJS(this[k].transform(this[k].value, this))
		})
		return js
	}

	/**
	 * to be used by JSON.stringify
	 * @param key
	 * @returns {*}
	 */
	toJSON(key = null) {
		if (key) return this.toJS()[key]
		return this.toJS()
	}

	//------------------------------------------
	// ACTIONS
	//------------------------------------------

	/**
	 * reset values to original values since last save
	 */
	@action
	reset() {
		this.fields().forEach((k) => {
			this[k].reset()
		})
		this.children.forEach((child: BaseModel) => {
			child.reset()
		})
		this.validated = false
	}

	/**
	 * the initialisation of the model
	 *
	 * in addition to passing the the initial values we pass
	 * a reference to the main store.
	 *
	 * some models will use the store for various reasons
	 * such as to retrieve fusion data or other
	 *
	 *
	 *
	 * @param obj
	 */
	@action
	init(obj = null) {
		this.initialized = false
		this.initialData = obj
		if (obj) {
			console.log(toJS(obj))
			obj = this.importData(obj)
			console.log(toJS(obj))
			this.initValue(obj)
			Object.keys(this).forEach((key) => {
				if (this[key] && this[key].isModel) {
					console.log(`$initializing ${key} model`)
					this[key].init(obj[key] ? obj[key] : "")
				}
			})
		} else {
			Object.keys(this).forEach((key) => {
				if (this[key] && this[key].isModel && key != "parent") {
					console.log(`$initializing ${key} model`)
					this[key].init()
				}
			})
		}
		this.initialized = true
		this.validated = false
	}

	/**
	 * sets the values from a passed object to each Field
	 * it uses the Field.initValue(v) method which defines
	 * that value as the original value and is used to determine
	 * if the field is dirty. this also clears the errors
	 *
	 * the Field.reset() method will reset the value to the
	 * value assigned when Field.initValue was called
	 *
	 *
	 * @param obj
	 */
	@action
	initValue(obj) {
		this.fields().forEach((k) => {
			if (obj[k] !== undefined) {
				this[k].initValue(obj[k])
			}
		})
	}

	/**
	 * this will set a field's value and run it's synchronous validator
	 *
	 * components need not use this method to set a field's value, they
	 * can also call Field.setValue(v) directly. the result is the same
	 * @param key
	 * @param value
	 */
	@action
	setValue(key, value) {
		this[key].setValue(value)
		// this.isDirty = Object.values(this.dirty).reduce((p, c) => (p || c))
	}

	/**
	 * validate all the fields both locally and server side
	 *
	 * this function should typically be only executed when the user clicks on
	 * a save or submit button,
	 *
	 * this method will run each field's Field.validate() function, which will
	 * first do a local validation of the value of the field followed by running
	 * the async validators (such as uniqueness checks)
	 *
	 * it will then reduce all the resolved promises and determine if the overall
	 * validation was successful
	 *
	 * @returns {Promise<void>}
	 */

	async validate() {
		const promises = this.fields().map(async (k) => this[k].validate())
		const results = await Promise.all(promises)
		const childResults = []
		this.children.forEach(async (model) => {
			childResults.push(await model.validate())
		})
		let allresults = [...results, ...childResults]
		const failure = allresults.reduce((prev, current) => prev || current, false)
		// console.dir(results)
		// console.dir(this.fields())
		runInAction(() => {
			this.validated = true
		})
		return !failure
	}

	/**
	 * validation of model only client side.
	 *
	 * typically this function is not needed to be run repeatedly. Fields when they change will typically run their own
	 * Field.validateSync(model) method.
	 *
	 * synchronous validation is used to catch errors of formatting etc. the full uniqueness check is done typically in
	 * the Fields asyncValidator() async method, which one would implement as a call to check on the server for
	 * server side constraints such as uniqueness
	 *
	 * uniqueness can be checked in a synchronous validation function if the data it is being
	 * checked against is in the Store, however this is not enough to guarantee uniqueness
	 * if the local state is out of sync with the server, for example: if a new project has been created
	 * on the server and the app state is not aware of it,
	 *
	 * thus if you wish to create synchronous validation of field's uniqueness the best practice would be to
	 * also construct the Field with a unique option defined as an async function that calls the server
	 */
	@action
	validateSync() {
		if (this.initialized) {
			this.fields().forEach((k) => {
				this[k].validateSync()
			})

			this.children.forEach((model) => {
				model.validateSync()
			})
		}
	}

	@observable
	saveError = null

	/**
	 * save requires that the model's config property be set to an api end point where
	 * the values will be POSTed.
	 *
	 * errors returned from the server will be put in the saveError property
	 * @returns {Promise<*|void>}
	 */
	async save(...args) {
		console.log("save called")
		if (this.isNew) {
			console.log("attempting to create")
			try {
				await this.create(...args)
				return true
			} catch (e) {
				this.saveError = e
				return false
			}
		} else {
			console.log("attempting to update")
			try {
				await this.update(...args)
			} catch (e) {
				this.saveError = e
				return false
			}
		}
	}

	async create(...args) {
		throw new Error("create is not implemented")
	}

	async update(...args) {
		throw new Error("update is not implemented")
	}

	/**
	 * override this function to change the output format
	 *
	 * @return {{}}
	 */
	@action exportData(data): Object {
		return data
	}

	/**
	 * override to change the import mapping
	 * @param data
	 * @return {{}|*}
	 */
	@action importData(data) {
		return data
	}
	@action async submit(...args) {
		console.log("model submitted")
		await this.validate()
		if (this.isValid) {
			console.log("model is valid trying to save")
			try {
				return this.save(...args)
			} catch (e) {
				this.saveError = e
				return false
			}
		} else return false
	}
}
