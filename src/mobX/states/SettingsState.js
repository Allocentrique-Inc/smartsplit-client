import BaseState, { save, session } from "../BaseState"
import { observable, computed, action, when, reaction, runInAction } from "mobx"
import EmailState from "./userStates/EmailState"
export default class SettingsState extends BaseState {
	@observable emails
	constructor(root) {
		super(root)
		this.emails = new EmailState(root)
	}
	async init(...args) {
		return this.emails.init()
	}
}
