import React from "react"
import { StyleSheet } from "react-native"
import { useHistory } from "react-router"
import { Column, Row } from "../../layout"
import SplitLogo from "../../../assets/svg/split.svg"
import ProtectionLogo from "../../../assets/svg/protection.svg"
import { Heading, Text } from "../../text"
import { useTranslation } from "react-i18next"
import { Metrics } from "../../theme"
import Card from "../../widgets/card"
import Button from "../../widgets/button"
import { useCurrentWorkpiece } from "./context"

const styles = StyleSheet.create({
	card: {
		marginRight: Metrics.spacing.medium,
		marginBottom: Metrics.spacing.medium,
		paddingTop: Metrics.spacing.large,
		paddingLeft: Metrics.spacing.medium,
		paddingRight: Metrics.spacing.medium,
		paddingBottom: Metrics.spacing.medium,
	},
	innerContainer: {
		height: "100%",
	},
	buttonContainer: {
		marginTop: "auto",
	},
})

export function ShareYourCopyright() {
	const { t } = useTranslation()
	const history = useHistory()

	const workpiece_id = useCurrentWorkpiece("id")

	function navigateToRightSplits() {
		history.push(`/workpieces/${workpiece_id}/rights-splits`)
	}

	return (
		<Card style={styles.card}>
			<Column of="group" style={styles.innerContainer}>
				<SplitLogo />
				<Column of="inside">
					<Heading level={4}>
						{t("workpieces:cards.shareYourCopyright.title")}
					</Heading>
					<Text tertiary>{t("workpieces:cards.shareYourCopyright.desc")}</Text>
				</Column>
				<Row style={styles.buttonContainer}>
					<Button
						secondary
						bold
						text={t("general:buttons.toConsult")}
						onClick={navigateToRightSplits}
					/>
				</Row>
			</Column>
		</Card>
	)
}

export function ProtectYourWork() {
	const { t } = useTranslation()

	return (
		<Card style={styles.card}>
			<Column of="group" style={styles.innerContainer}>
				<ProtectionLogo />
				<Column of="inside">
					<Heading level={4}>
						{t("workpieces:cards.protectYourWork.title")}
					</Heading>
					<Text tertiary>{t("workpieces:cards.protectYourWork.desc")}</Text>
				</Column>
				<Row style={styles.buttonContainer}>
					<Button secondary bold text={t("general:buttons.toBegin")} />
				</Row>
			</Column>
		</Card>
	)
}
