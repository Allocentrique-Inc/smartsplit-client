import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { NotificationValidator } from "../validators"

export default class NotificationsModel extends BaseModel {
	@observable general_interactions = new Field(this, "general_interactions", {
		type: FieldType.set,
		validation: NotificationValidator,
		ui: { email: true, push: true, sms: true },
	})
	@observable administrative_messages = new Field(
		this,
		"administrative_messages",
		{
			type: FieldType.set,
			validation: NotificationValidator,
			ui: { email: true, push: true, sms: true },
		}
	)
	@observable account_login = new Field(this, "account_login", {
		type: FieldType.set,
		validation: NotificationValidator,
		ui: { email: true, push: true, sms: false },
	})
	@observable smartsplit_blog = new Field(this, "smartsplit_blog", {
		type: FieldType.set,
		validation: NotificationValidator,
		ui: { email: true, push: true, sms: false },
	})
	@observable smartsplit_promotions = new Field(this, "smartsplit_promotions", {
		type: FieldType.set,
		validation: NotificationValidator,
		ui: { email: true, push: true, sms: false },
	})
	@observable partner_promotions = new Field(this, "partner_promotions", {
		type: FieldType.set,
		validation: NotificationValidator,
		ui: { email: true, push: true, sms: false },
	})
}
