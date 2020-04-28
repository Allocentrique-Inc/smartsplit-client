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
						{t("dashboardTitles:profile.tab.interactions.confirmNO")}
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
		<>
			<Row of="component">
				<Flex>
					<Heading level="2">Notifications</Heading>
				</Flex>
			</Row>

			<Column of="inside" spacer={Hairline} flex>
				<Row>
					<View style={{ flex: 1 }}>
						<Heading level="5">{t("dashboardTitles:profile.type")}</Heading>
					</View>

					<View style={{ width: 117 }}>
						<Heading level="5">{t("dashboardTitles:profile.email")}</Heading>
					</View>

					<View style={{ width: 117 }}>
						<Heading level="5">{t("dashboardTitles:profile.mobile")}</Heading>
					</View>

					<View style={{ width: 117 }}>
						<Heading level="5">{t("dashboardTitles:profile.sms")}</Heading>
					</View>
				</Row>

				<NotificationsRow
					title={t("dashboardTitles:profile.tab.interactions.title")}
					subTitle={t("dashboardTitles:profile.tab.interactions.subTitle")}
					email={"required"}
					mobile={true}
					sms={"validate"}
				/>
				<NotificationsRow
					title={t("dashboardTitles:profile.tab.administration.title")}
					subTitle={t("dashboardTitles:profile.tab.administration.subTitle")}
					email={"required"}
					mobile={true}
					sms={false}
				/>
				<NotificationsRow
					title={t("dashboardTitles:profile.tab.connexion.title")}
					subTitle={t("dashboardTitles:profile.tab.connexion.subTitle")}
					subHeading={t("profile:mobile")}
					email={false}
					mobile={false}
					sms={null}
				/>
				<NotificationsRow
					title={t("dashboardTitles:profile.tab.blog.title")}
					subTitle={t("dashboardTitles:profile.tab.blog.subTitle")}
					subHeading={t("profile:text")}
					email={true}
					mobile={true}
					sms={null}
				/>
				<NotificationsRow
					title={t("dashboardTitles:profile.tab.promotions.title")}
					subTitle={t("dashboardTitles:profile.tab.promotions.subTitle")}
					email={true}
					mobile={true}
					sms={null}
				/>
				<NotificationsRow
					title={t("dashboardTitles:profile.tab.promoPartner.title")}
					subTitle={t("dashboardTitles:profile.tab.promoPartner.subTitle")}
					email={false}
					mobile={false}
					sms={null}
					padding="tiny"
				/>
			</Column>
			<Hairline />
		</>
	)
}
