import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { Platform } from "../../../platform"
import { Row, Column, Group, Flex, Hairline } from "../../../layout"
import { CheckBox } from "../../../forms"
import { Text, Link, Heading } from "../../../text"

export function NotificationsRow(props) {
	const { title, subTitle, email, mobile, sms } = props
	const [t] = useTranslation()

	return (
		<Row of="inside" style={{ alignItems: "center" }} size="large">
			<View style={{ flex: 1 }}>
				<Text heavy>{title}</Text>
				<Text secondary small>
					{subTitle}
				</Text>
			</View>
			<View style={{ width: 117 }}>
				<CheckBox checked={email} disabled={email === "required"} />
			</View>
			<View style={{ width: 117 }}>
				<CheckBox checked={mobile} />
			</View>
			<View style={{ width: 117 }}>
				{sms === "validate" ? (
					<Link link small>
						{t("settings:tab.interactions.confirmNO")}
					</Link>
				) : (
					sms !== null && <CheckBox checked={sms} />
				)}
			</View>
		</Row>
	)
}

export default function MyNotifications() {
	const [t] = useTranslation()
	return (
		<Platform web={Group} of="group" native={Column} of="component">
			{Platform.web && <Heading level="2">Notifications</Heading>}
			{Platform.native && (
				<DashboardNavbarNative header={t("settings:preferences")} />
			)}

			<Column of="inside" spacer={Hairline} flex>
				<Row>
					<View style={{ flex: 1 }}>
						<Heading level="5">{t("settings:tab.type")}</Heading>
					</View>

					<View style={{ width: 117 }}>
						<Heading level="5">{t("settings:tab.email")}</Heading>
					</View>

					<View style={{ width: 117 }}>
						<Heading level="5">{t("settings:tab.mobile")}</Heading>
					</View>

					<View style={{ width: 117 }}>
						<Heading level="5">{t("settings:tab.sms")}</Heading>
					</View>
				</Row>

				<NotificationsRow
					title={t("settings:tab.interactions.title")}
					subTitle={t("settings:tab.interactions.subTitle")}
					email={"required"}
					mobile={true}
					sms={"validate"}
				/>
				<NotificationsRow
					title={t("settings:tab.administration.title")}
					subTitle={t("settings:tab.administration.subTitle")}
					email={"required"}
					mobile={true}
					sms={false}
				/>
				<NotificationsRow
					title={t("settings:tab.connexion.title")}
					subTitle={t("settings:tab.connexion.subTitle")}
					subHeading={t("settings:tab.mobile")}
					email={false}
					mobile={false}
					sms={null}
				/>
				<NotificationsRow
					title={t("settings:tab.blog.title")}
					subTitle={t("settings:tab.blog.subTitle")}
					subHeading={t("settings:tab.text")}
					email={true}
					mobile={true}
					sms={null}
				/>
				<NotificationsRow
					title={t("settings:tab.promotions.title")}
					subTitle={t("settings:tab.promotions.subTitle")}
					email={true}
					mobile={true}
					sms={null}
				/>
				<NotificationsRow
					title={t("settings:tab.promoPartner.title")}
					subTitle={t("settings:tab.promoPartner.subTitle")}
					email={false}
					mobile={false}
					sms={null}
					padding="tiny"
				/>
			</Column>

			<Column of="section">{Platform.OS === "web" && <Hairline />}</Column>
		</Platform>
	)
}
