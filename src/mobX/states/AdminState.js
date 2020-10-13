import BaseState, { save, session } from "../BaseState"
import { observable, computed, action, when, reaction, runInAction } from "mobx"
import { Platform, AsyncStorage } from "react-native"
import ContentLanguageState from "./EntityStates/ContentLanguagesState"

export default class Admin extends BaseState {
	@observable entities = null
	constructor(root) {
		super(root)
		this.entities = {
			"content-languages": new ContentLanguageState(root),
		}
	}
	@action async init() {
		//console.log("adminState.init called")
		let promises = Object.keys(this.entities).map((key) => {
			//console.log(`adminState.entities['${key}']`)
			this.entities[key].init()
		})
		await Promise.all(promises)
	}
}
