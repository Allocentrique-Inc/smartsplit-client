import React from "react"
import { useTranslation } from "react-i18next"
import { Platform, Web } from "../../platform"
import { Column, Spacer } from "../../layout"
import { CheckBox } from "../../forms"
import { Text, Heading } from "../../text"
import { Table, TableRow } from "../../widgets/table"
import { useStorePath } from "../../mobX"
const WebNotificationCheckBoxes = observer((props) => {
	const { field, title, subtitle, phoneValidated } = props
	return (
		<TableRow>
			<Column>
				<Text>{title}</Text>
				<Text small secondary>
					{subtitle}
				</Text>
			</Column>
			{field.ui.email ? (
				<CheckBox
					checked={(field.value & 1) === 1}
					onChange={(checked) => {
						field.setValue(checked ? field.value | 1 : field.value & 6)
					}}
				/>
			) : (
				<Spacer />
			)}
			{field.ui.mobile ? (
				<CheckBox
					checked={(field.value & 2) === 2}
					onChange={(checked) => {
						field.setValue(checked ? field.value | 2 : field.value & 5)
					}}
				/>
			) : (
				<Spacer />
			)}
			{field.ui.sms ? (
				phoneValidated ? (
					<CheckBox
						checked={(field.value & 4) === 4}
						onChange={(checked) => {
							field.setValue(checked ? field.value | 4 : field.value & 3)
						}}
					/>
				) : (
					<Text action>{t("general:buttons.checkPhone")}</Text>
				)
			) : (
				<Spacer />
			)}
		</TableRow>
	)
})
export default observer(function MyNotifications() {
	const [t] = useTranslation()
	const model = useStorePath("settings", "notifications")
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
						<WebNotificationCheckBoxes
							title={t("settings:tab.interactions.title")}
							subtitle={"settings:tab.interactions.subTitle"}
							field={model.general}
						/>
						<WebNotificationCheckBoxes
							title={t("settings:tab.connexion.title")}
							subtitle={"settings:tab.connexion.subTitle"}
							field={model.general}
						/>
						<WebNotificationCheckBoxes
							title={t("settings:tab.blog.title")}
							subtitle={"settings:tab.blog.subTitle"}
							field={model.blog}
						/>
						<WebNotificationCheckBoxes
							title={t("settings:tab.promos.title")}
							subtitle={"settings:tab.promos.subTitle"}
							field={model.promos}
						/>
						<WebNotificationCheckBoxes
							title={t("settings:tab.promoPartner.title")}
							subtitle={"settings:tab.promoPartner.subTitle"}
							field={model.promoPartner}
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
					</Table>
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
