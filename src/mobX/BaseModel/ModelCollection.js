import BaseModel from "./BaseModel"
import Field, { FieldType } from "./Field"
import { observable, computed, action, toJS } from "mobx"
/**
 * TODO remove this for mobx6 upgrade
 */
const makeObservable = () => {}

/**
 *  this is a class where a field is a collection of models
 *
 *  it behaves like a collection field but each entry is a model
 *  to work it must have defined options.modelClass
 *  which must be derived from BaseModel
 *
 *  it is meant be used in React in a case where each entry
 *  (accessible through this.array) for mapping
 *  can be passed a full form which binds to several fields in a model
 *
 *  any context where a series of "rows" of forms needs to be editable
 *  simultaneously is a good candidate for a model collection
 *
 */
export default class ModelCollection extends Field {
	modelClass
	initialValue: Array<*> = []
	constructor(model, fieldName, options) {
		options.type = FieldType.modelCollection
		super(model, fieldName, options)
		makeObservable(this)
		if (!options.modelClass)
			throw Error("A Model Collection Field must define options.modelClass")
		// if (!options.modelClass.isPrototypeOf(BaseModel))
		// 	throw Error("options.modelClass must be derived from BaseModel")
		this.modelClass = options.modelClass
		this.value = []
	}
	@computed get array() {
		return this.value
	}
	@action init(collectionValues = []) {
		this.initialValue = collectionValues
		collectionValues.forEach((modelValue) => {
			this.add(modelValue)
		})
	}
	@action reset() {
		this.value = []
		this.initialValue.forEach((modelValue) => {
			this.add(modelValue)
		})
	}
	@action add(initValue = null) {
		console.log(initValue)
		let model = new this.modelClass()
		model.init(initValue)
		this.value.push(model)
	}
	@action remove(index) {
		console.log(index)
		console.log(toJS(this.value[index]))
		this.value.splice(index, 1)
		this.setValue(this.value)
	}
	validateSync() {
		this.array.forEach((model) => model.validateSync())
	}
	async validate() {
		let promises = this.array.map((model) => model.validate())
		await Promise.all(promises)
		return promises.reduce((accumulated, current) => accumulated && current)
	}
	@computed get isValid() {
		let validity = true
		this.array.forEach((model) => {
			if (!model.isValid) validity = false
		})
		return validity
	}

	toJS() {
		return toJS(this.value.map((model) => model.toJS()))
	}
}
