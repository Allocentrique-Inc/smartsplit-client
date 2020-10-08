import BaseState, { save, session } from "../BaseState"
import {
	observable,
	computed,
	action,
	when,
	reaction,
	runInAction,
	toJS,
} from "mobx"
import EmailState from "./settingsStates/EmailState"
import ProfileModel from "../models/settings/ProfileModel"
import NotificationsModel from "../models/settings/NotificationsModel"
export default class SettingsState extends BaseState {
	@observable emails
	constructor(root) {
		super(root)
		this.emails = new EmailState(root)
		this.notifications = new NotificationsModel()
		this.profile = new ProfileModel()
	}
	async init(...args) {
		this.notifications.init()
		this.profile.init()
		reaction(
			() => this.root.auth.user_id,
			(userId) => {
				this.load(userId)
			},
			{ fireImmediately: true }
		)
		return this.emails.init()
	}

	@observable profile: ProfileModel

	@action load(userId) {
		if (userId) {
			let user = this.root.auth.user
			let data = toJS(user.data)
			try {
				if (!data.lastName && data.firstName === data.email.split("@")[0])
					data.firstName = ""
			} catch {}
			console.log(data)
			this.profile.init(data)
		} else {
			this.profile.init()
		}
		//console.log(this.profile.toJS())
	}

	@action async saveProfile() {
		//console.log("saving profile")
		await this.profile.save()
		await this.root.auth.user.read()
		this.load(this.root.auth.user_id)
	}
}
