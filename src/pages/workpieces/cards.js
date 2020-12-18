import React from "react"
import { StyleSheet } from "react-native"
import { useHistory } from "react-router"
import { Column, Row } from "../../layout"
import SplitLogo from "../../../assets/svg/split.svg"
import ProtectionLogo from "../../../assets/svg/protection.svg"
import DocumentLogo from "../../../assets/svg/document.svg"
import { Heading, Text } from "../../text"
import { useTranslation } from "react-i18next"
import { Metrics } from "../../theme"
import Card from "../../widgets/card"
import Button from "../../widgets/button"
import { useCurrentWorkpiece } from "./context"
import { observer } from "mobx-react"

const styles = StyleSheet.create({
	card: {
		width: 304,
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

function useNavigation(workpieceId, path) {
	const history = useHistory()
	return () => {
		history.push(`/workpieces/${workpieceId}/${path}`)
	}
}

export const ShareYourCopyright = observer(() => {
	const { t } = useTranslation()
	const workpieceId = useCurrentWorkpiece().id
	const toNextPage = useNavigation(workpieceId, "rights-splits")

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
						onClick={toNextPage}
					/>
				</Row>
			</Column>
		</Card>
	)
})

export function ProtectYourWork() {
	const { t } = useTranslation()
	const workpieceId = useCurrentWorkpiece().id
	const toNextPage = useNavigation(workpieceId, "protect")

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
					<Button
						secondary
						bold
						text={t("general:buttons.toBegin")}
						onClick={toNextPage}
					/>
				</Row>
			</Column>
		</Card>
	)
}

export function DocumentYourWork() {
	const { t } = useTranslation()
	const workpieceId = useCurrentWorkpiece().id
	const toNextPage = useNavigation(workpieceId, "documentation")

	return (
		<Card style={styles.card}>
			<Column of="group" style={styles.innerContainer}>
				<DocumentLogo />
				<Column of="inside">
					<Heading level={4}>
						{t("workpieces:cards.documentYourWork.title")}
					</Heading>
					<Text tertiary>{t("workpieces:cards.documentYourWork.desc")}</Text>
				</Column>
				<Row style={styles.buttonContainer}>
					<Button
						secondary
						bold
						text={t("general:buttons.toBegin")}
						onClick={toNextPage}
					/>
				</Row>
			</Column>
		</Card>
	)
}
