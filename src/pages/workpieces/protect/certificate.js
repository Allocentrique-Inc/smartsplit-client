import React, { useState, useMemo } from "react"
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
			<Column of="group" flex={5}></Column>
			<Flex />
			<Column of="group" flex={4}>
				<Column of="component" padding="component" layer="underground">
					<Column of="inside">
						<Text small bold tertiary>
							{t("protect:help")}
						</Text>
						<Hairline />
					</Column>

					<Heading level={4}>{t("protect:selection.why")}</Heading>

					<Text secondary>{t("protect:certificate.whyContent")}</Text>
				</Column>
			</Column>
		</Row>
	)
})

export default CertificatePage
