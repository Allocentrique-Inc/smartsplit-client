import React, { useState, useMemo, PureComponent } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import { observer } from "mobx-react"
import { CardStyles } from "../../../widgets/card"
import TextField from "../../../forms/text"
import { render } from "react-dom"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
	frame: {
		backgroundColor: Colors.background.underground,
	},
	frame_error: {
		borderWidth: 1,
		borderColor: Colors.error,
		borderStyle: "solid",
	},
	frame_yourself: {
		borderWidth: 1,
		borderColor: Colors.secondaries.teal,
	},
})

const frameStyle = [CardStyles.frame, Styles.frame]

const CertificatePage = observer(() => {
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id

	return (
		<Row>
			<Column of="group" flex={7}>
				<Column of="section" flex={6}>
					<Column of="component">
						<Heading level={1}>
							{t("protect:certificate:heading1")}
						</Heading>
						<Paragraph>
							{t("protect:certificate:para1")}
						</Paragraph>
					</Column>
					<Column of="component">
						<Heading level={3}>
							{t("protect:certificate:musicalPiece")}
						</Heading>
						<Row>
							<Text bold style={{ flex: 7 }}>{t("protect:certificate:sourceFile")}</Text>
							<Text secondary style={{ flex: 9 }}>Value</Text>
						</Row>
						<Row>
							<Text bold style={{ flex: 7 }}>{t("protect:certificate:format")}</Text>
							<Text secondary style={{ flex: 9 }}>Value</Text>
						</Row>
						<Row>
							<Text bold style={{ flex: 7 }}>{t("protect:certificate:versionName")}</Text>
							<Text secondary style={{ flex: 9 }}>Value</Text>
						</Row>
						<Row>
							<Text bold style={{ flex: 7 }}>{t("protect:certificate:workingVersion")}</Text>
							<Text secondary style={{ flex: 9 }}>Value</Text>
						</Row>
						<Row>
							<Text bold style={{ flex: 7 }}>{t("protect:certificate:listedBy")}</Text>
							<Text secondary style={{ flex: 9 }}>Value</Text>
						</Row>
					</Column>
					<Hairline />
					<Column of="component">
						<Heading level={3}>
							{t("protect:certificate:fileDigitalFingerprints")}
						</Heading>
						<Row>
							<Text bold style={{ flex: 7 }}>{t("protect:certificate:sha256")}</Text>
							<Text secondary style={{ flex: 9 }}>Value</Text>
						</Row>
						<Row>
							<Text bold style={{ flex: 7 }}>{t("protect:certificate:md5")}</Text>
							<Text secondary style={{ flex: 9 }}>Value</Text>
						</Row>
					</Column>
					<Hairline />
					<Column of="component">
						<Heading level={3}>
							{t("protect:certificate:addiction")}
						</Heading>
					</Column>
				</Column>
			</Column >
			<Flex />
			<Column of="group" flex={5}>
				<Column of="component" padding="component" layer="underground">
					<Column of="inside">
						<Text small bold tertiary>
							{t("protect:help")}
						</Text>
						<Hairline />
					</Column>
					<Heading level={4}>
						{t("protect:certificate.why")}
					</Heading>
					<Text secondary>
						{t("protect:certificate.whyContent")}
					</Text>
				</Column>
			</Column>
		</Row >
	)
})

export default CertificatePage