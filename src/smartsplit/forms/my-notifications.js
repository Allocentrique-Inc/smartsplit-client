import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Row, Column, Group, Flex, Hairline } from "../../layout"
import { CheckBox } from "../../forms"
import { Text, Link, Heading } from "../../text"
import DashboardNavbarNative from "../../layout/subscreen"
import { Table } from "../../widgets/table"

export function NotificationColumn(props) {
	const { header, checkbox } = props
	const [t] = useTranslation()

	return (
		<Column>
			<Column of="component">
				<Heading level="5">{header}</Heading>
				<Row>
					<CheckBox checked={checkbox} />
					<Text heavy>{props.title}</Text>
				</Row>
			</Column>
			<Text secondary small>
				{props.subTitle}
			</Text>
		</Column>
	)
}

export function RenderRow(props) {
	const { title, subTitle, email, mobile, sms } = props
	const [t] = useTranslation()

	return (
		<Platform
			web={Row}
			of="inside"
			style={{ alignItems: "center" }}
			native={Column}
		>
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
		</Platform>
	)
}

export default function MyNotifications(props) {
	const [t] = useTranslation()
	const { interations, admin, connexion, blog, promo, promoPartner } = props
	const head = ["Type", "Courriel", "Mobile", "Texto"]
	const body = [
		[
			<Column>
				<Text>Interactions générales</Text>
				<Text secondary>Proposition et suivi davants droit</Text>
			</Column>,
			<CheckBox/>,
			<CheckBox/>,
			<CheckBox/>
		],
		[
			<Column>
				<Text>Messages administratifs</Text>
				<Text secondary>Mises à jours, reçus, paiements</Text>
			</Column>,
			<CheckBox/>,
			<CheckBox/>,
			<CheckBox/>
		],
		[
			<Column>
				<Text>Interactions générales</Text>
				<Text secondary>Proposition et suivi davants droit</Text>
			</Column>,
			<CheckBox/>,
			<CheckBox/>,
			<CheckBox/>
		]
	]

	return (
		<Table head={head.map(title => <Text bold>{title}</Text>)}
		       body={body}
		/>

		// <Platform web={Group} of="group" native={Column} of="component">
		// 	{Platform.native && (
		// 		<DashboardNavbarNative header={t("settings:preferences")} />
		// 	)}
		//
		// 	<Heading level="2">Notifications</Heading>
		//
		// 	{Platform.native && (
		// 		<>
		// 			<Column of="tiny">
		// 				<NotificationColumn
		// 					checkbox={props.interactions}
		// 					header={t("settings:tab.email")}
		// 					title={t("settings:tab.interactions.title")}
		// 					subTitle={t("settings:tab.interactions.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.admin}
		// 					title={t("settings:tab.administration.title")}
		// 					subTitle={t("settings:tab.administration.subTitle")}
		// 				/>
		// 				<NotificationColumn
		// 					checkbox={props.connexion}
		// 					title={t("settings:tab.connexion.title")}
		// 					subTitle={t("settings:tab.connexion.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.blog}
		// 					title={t("settings:tab.blog.title")}
		// 					subTitle={t("settings:tab.blog.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.promos}
		// 					title={t("settings:tab.promos.title")}
		// 					subTitle={t("settings:tab.promos.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={promoPartner}
		// 					title={t("settings:tab.promoPartner.title")}
		// 					subTitle={t("settings:tab.promoPartner.subTitle")}
		// 				/>
		// 			</Column>
		// 			<Column of="tiny">
		// 				<NotificationColumn
		// 					checkbox={props.interactions}
		// 					header={t("settings:tab.mobile")}
		// 					title={t("settings:tab.interactions.title")}
		// 					subTitle={t("settings:tab.interactions.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.admin}
		// 					title={t("settings:tab.administration.title")}
		// 					subTitle={t("settings:tab.administration.subTitle")}
		// 				/>
		// 				<NotificationColumn
		// 					checkbox={props.connexion}
		// 					title={t("settings:tab.connexion.title")}
		// 					subTitle={t("settings:tab.connexion.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.blog}
		// 					title={t("settings:tab.blog.title")}
		// 					subTitle={t("settings:tab.blog.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.promos}
		// 					title={t("settings:tab.promos.title")}
		// 					subTitle={t("settings:tab.promos.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={promoPartner}
		// 					title={t("settings:tab.promoPartner.title")}
		// 					subTitle={t("settings:tab.promoPartner.subTitle")}
		// 				/>
		// 			</Column>
		//
		// 			<Column of="tiny">
		// 				<NotificationColumn
		// 					checkbox={props.interactions}
		// 					header={t("settings:tab.sms")}
		// 					title={t("settings:tab.interactions.title")}
		// 					subTitle={t("settings:tab.interactions.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.admin}
		// 					title={t("settings:tab.administration.title")}
		// 					subTitle={t("settings:tab.administration.subTitle")}
		// 				/>
		// 				<NotificationColumn
		// 					checkbox={props.connexion}
		// 					title={t("settings:tab.connexion.title")}
		// 					subTitle={t("settings:tab.connexion.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.blog}
		// 					title={t("settings:tab.blog.title")}
		// 					subTitle={t("settings:tab.blog.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={props.promos}
		// 					title={t("settings:tab.promos.title")}
		// 					subTitle={t("settings:tab.promos.subTitle")}
		// 				/>
		//
		// 				<NotificationColumn
		// 					checkbox={promoPartner}
		// 					title={t("settings:tab.promoPartner.title")}
		// 					subTitle={t("settings:tab.promoPartner.subTitle")}
		// 				/>
		// 			</Column>
		// 		</>
		// 	)}
		// 	{Platform.web && (
		// 		<>
		// 			<Column of="inside" spacer={Hairline} flex>
		// 				<Row>
		// 					<View style={{ flex: 1 }}>
		// 						<Heading level="5">{t("settings:tab.type")}</Heading>
		// 					</View>
		//
		// 					<View style={{ width: 117 }}>
		// 						<Heading level="5">{t("settings:tab.email")}</Heading>
		// 					</View>
		//
		// 					<View style={{ width: 117 }}>
		// 						<Heading level="5">{t("settings:tab.mobile")}</Heading>
		// 					</View>
		//
		// 					<View style={{ width: 117 }}>
		// 						<Heading level="5">{t("settings:tab.sms")}</Heading>
		// 					</View>
		// 				</Row>
		// 				<RenderRow
		// 					title={t("settings:tab.interactions.title")}
		// 					subTitle={t("settings:tab.interactions.subTitle")}
		// 					email={"required"}
		// 					mobile={true}
		// 					sms={"validate"}
		// 				/>
		//
		// 				<RenderRow
		// 					title={t("settings:tab.administration.title")}
		// 					subTitle={t("settings:tab.administration.subTitle")}
		// 					email={"required"}
		// 					mobile={true}
		// 					sms={false}
		// 				/>
		// 				<RenderRow
		// 					title={t("settings:tab.connexion.title")}
		// 					subTitle={t("settings:tab.connexion.subTitle")}
		// 					subHeading={t("settings:tab.mobile")}
		// 					email={false}
		// 					mobile={false}
		// 					sms={null}
		// 				/>
		// 				<RenderRow
		// 					title={t("settings:tab.blog.title")}
		// 					subTitle={t("settings:tab.blog.subTitle")}
		// 					subHeading={t("settings:tab.text")}
		// 					email={true}
		// 					mobile={true}
		// 					sms={null}
		// 				/>
		// 				<RenderRow
		// 					title={t("settings:tab.promos.title")}
		// 					subTitle={t("settings:tab.promos.subTitle")}
		// 					email={true}
		// 					mobile={true}
		// 					sms={null}
		// 				/>
		// 				<RenderRow
		// 					title={t("settings:tab.promoPartner.title")}
		// 					subTitle={t("settings:tab.promoPartner.subTitle")}
		// 					email={false}
		// 					mobile={false}
		// 					sms={null}
		// 					padding="tiny"
		// 				/>
		// 			</Column>
		// 			<Hairline />
		// 		</>
		// 	)}
		// </Platform>
	)
}
