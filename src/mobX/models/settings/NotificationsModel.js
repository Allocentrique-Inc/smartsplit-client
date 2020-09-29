import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { NotificationValidator } from "../validators"

export default class NotificationsModel extends BaseModel {
	@observable general = new Field(this, "general", {
		type: FieldType.int,
		validation: NotificationValidator,
		ui: { email: true, mobile: true, sms: true },
	})
	@observable admin = new Field(this, "admin", {
		type: FieldType.int,
		validation: NotificationValidator,
		ui: { email: true, mobile: true, sms: true },
	})
	@observable logins = new Field(this, "logins", {
		type: FieldType.int,
		validation: NotificationValidator,
		ui: { email: true, mobile: true, sms: true },
	})
	@observable blog = new Field(this, "articles", {
		type: FieldType.int,
		validation: NotificationValidator,
		ui: { email: true, mobile: true, sms: false },
	})
	@observable promos = new Field(this, "promotions", {
		type: FieldType.int,
		validation: NotificationValidator,
		ui: { email: true, mobile: true, sms: false },
	})
	@observable promoPartners = new Field(this, "partners", {
		type: FieldType.int,
		validation: NotificationValidator,
		ui: { email: true, mobile: true, sms: false },
	})
}

const NotificationType = {
	email: "1",
	mobile: "2",
	sms: "4",
}
