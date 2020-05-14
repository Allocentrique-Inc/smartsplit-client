import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Row, Column, Group, Flex, Hairline, Spacer } from "../../layout"
import { CheckBox } from "../../forms"
import { Text, Link, Heading } from "../../text"
import DashboardNavbarNative from "../../layout/subscreen"
import { Table, TableRow } from "../../widgets/table"

export default function MyNotifications() {
	const [t] = useTranslation()

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
						<TableRow>
							{renderNotificationLabel(
								t("settings:tab.interactions.title"),
								t("settings:tab.interactions.subTitle")
							)}
							<CheckBox />
							<CheckBox />
							<Text action>{t("general:buttons.checkPhone")}</Text>
						</TableRow>
						<TableRow>
							{renderNotificationLabel(
								t("settings:tab.administration.title"),
								t("settings:tab.administration.subTitle")
							)}
							<CheckBox />
							<CheckBox />
							<CheckBox />
						</TableRow>
						<TableRow>
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
						</TableRow>
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
}
