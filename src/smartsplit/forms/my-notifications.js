import React from "react"
import { useTranslation } from "react-i18next"
import { Platform, Web } from "../../platform"
import { Column, Spacer } from "../../layout"
import { CheckBox } from "../../forms"
import { Text, Heading } from "../../text"
import { Table, TableRow } from "../../widgets/table"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"
import NotificationsModel from "../../mobX/models/settings/NotificationsModel"
const WebNotificationCheckBoxes = observer((props) => {
	const [t] = useTranslation()
	const { field, title, subtitle } = props
	const phoneValidated =
		useStorePath("settings", "profile", "mobilePhone", "status").value ===
		"verified"
	if (!field) return null
	return (
		<Table proportions={[2, 1, 1, 1]}>
			<TableRow>
				<Column>
					<Text>{title}</Text>
					<Text small secondary>
						{subtitle}
					</Text>
				</Column>
				{field.ui.email ? (
					<CheckBox
						checked={field.has("email")}
						onChange={(checked) => {
							checked ? field.add("email") : field.remove("email")
						}}
					/>
				) : (
					<Spacer />
				)}
				{field.ui.push ? (
					<CheckBox
						checked={field.has("push")}
						onChange={(checked) => {
							checked ? field.add("push") : field.remove("push")
						}}
					/>
				) : (
					<Spacer />
				)}
				{field.ui.sms ? (
					phoneValidated ? (
						<CheckBox
							checked={field.has("sms")}
							onChange={(checked) => {
								checked ? field.add("sms") : field.remove("sms")
							}}
						/>
					) : (
						<Text action>{t("general:buttons.checkPhone")}</Text>
					)
				) : (
					<Spacer />
				)}
			</TableRow>
		</Table>
	)
})
export default observer(function MyNotifications() {
	const [t] = useTranslation()
	const model: NotificationsModel = useStorePath(
		"settings",
		"profile",
		"notifications"
	)
	function renderNotificationLabel(name, description) {
		return (
			<Column>
				<Text>{name}</Text>
				<Text small secondary>
					{description}
				</Text>
			</Column>
		)
	}
	if (!model) return null
	return (
		<Column of={Platform.web ? "group" : "component"}>
			<Heading level="2">{t("settings:notifications")}</Heading>
			{Platform.web && (
				<>
					<Table proportions={[2, 1, 1, 1]}>
						<TableRow header>
							<Text bold>{t("settings:tab.type")}</Text>
							<Text bold>{t("settings:tab.email")}</Text>
							<Text bold>{t("settings:tab.mobile")}</Text>
							<Text bold>{t("settings:tab.sms")}</Text>
						</TableRow>
					</Table>
					<WebNotificationCheckBoxes
						title={t("settings:tab.interactions.title")}
						subtitle={"settings:tab.interactions.subTitle"}
						field={model.general_interations}
					/>
					<WebNotificationCheckBoxes
						title={t("settings:tab.administration.title")}
						subtitle={"settings:tab.administration.subTitle"}
						field={model.administrative_messages}
					/>
					<WebNotificationCheckBoxes
						title={t("settings:tab.connexion.title")}
						subtitle={"settings:tab.connexion.subTitle"}
						field={model.account_login}
					/>
					<WebNotificationCheckBoxes
						title={t("settings:tab.blog.title")}
						subtitle={"settings:tab.blog.subTitle"}
						field={model.smartsplit_blog}
					/>
					<WebNotificationCheckBoxes
						title={t("settings:tab.promos.title")}
						subtitle={"settings:tab.promos.subTitle"}
						field={model.smartsplit_promotions}
					/>
					<WebNotificationCheckBoxes
						title={t("settings:tab.promoPartner.title")}
						subtitle={"settings:tab.promoPartner.subTitle"}
						field={model.partner_promotions}
					/>

					{/*<TableRow>
							{renderNotificationLabel(
								t("settings:tab.connexion.title"),
								t("settings:tab.connexion.subTitle")
							)}
							<CheckBox />
							<CheckBox />
							<Spacer />
						</TableRow>
						<TableRow>
							{renderNotificationLabel(
								t("settings:tab.blog.title"),
								t("settings:tab.blog.subTitle")
							)}
							<CheckBox />
							<CheckBox />
							<Spacer />
						</TableRow>
						<TableRow>
							{renderNotificationLabel(
								t("settings:tab.promos.title"),
								t("settings:tab.promos.subTitle")
							)}
							<CheckBox />
							<CheckBox />
							<Spacer />
						</TableRow>
						<TableRow>
							{renderNotificationLabel(
								t("settings:tab.promoPartner.title"),
								t("settings:tab.promoPartner.subTitle")
							)}
							<CheckBox />
							<CheckBox />
							<Spacer />
						</TableRow>*/}
				</>
			)}
			{Platform.native && (
				<>
					<Heading level="3">{t("settings:tab.byEmail")}</Heading>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.interactions.title"),
							t("settings:tab.interactions.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.administration.title"),
							t("settings:tab.administration.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.connexion.title"),
							t("settings:tab.connexion.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.blog.title"),
							t("settings:tab.blog.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.promos.title"),
							t("settings:tab.promos.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.promoPartner.title"),
							t("settings:tab.promoPartner.subTitle")
						)}
					</CheckBox>

					<Heading level="3">{t("settings:tab.push")}</Heading>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.interactions.title"),
							t("settings:tab.interactions.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.administration.title"),
							t("settings:tab.administration.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.connexion.title"),
							t("settings:tab.connexion.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.blog.title"),
							t("settings:tab.blog.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.promos.title"),
							t("settings:tab.promos.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.promoPartner.title"),
							t("settings:tab.promoPartner.subTitle")
						)}
					</CheckBox>

					<Heading level="3">{t("settings:tab.bySms")}</Heading>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.interactions.title"),
							t("settings:tab.interactions.subTitle")
						)}
					</CheckBox>
					<CheckBox center>
						{renderNotificationLabel(
							t("settings:tab.administration.title"),
							t("settings:tab.administration.subTitle")
						)}
					</CheckBox>
				</>
			)}
		</Column>
	)
})
