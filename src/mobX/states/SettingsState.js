import BaseState, { save, session } from "../BaseState"
import { observable, computed, action, when, reaction, runInAction } from "mobx"
import EmailState from "./settingsStates/EmailState"
import ProfileModel from "../models/settings/ProfileModel"
import NotificationsModel from "../models/settings/NotificationsModel"
export default class SettingsState extends BaseState {
	@observable emails
	@observable phones
	constructor(root) {
		super(root)
		this.emails = new EmailState(root)
		this.notifications = new NotificationsModel()
		this.profile = new ProfileModel()
	}
	async init(...args) {
		return this.emails.init()
	}
	@observable profile: ProfileModel
	@observable notifications: NotificationsModel
}
