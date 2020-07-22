import React from "react"
import { Column, Row } from "../../layout"
import SplitLogo from "../../../assets/svg/split.svg"
import { Heading, Text } from "../../text"
import { useTranslation } from "react-i18next"
import { Metrics } from "../../theme"
import Card from "../../widgets/card"
import Button from "../../widgets/button"

const cardStyle = {
	marginRight: Metrics.spacing.medium,
	marginBottom: Metrics.spacing.medium,
	paddingTop: Metrics.spacing.large,
	paddingLeft: Metrics.spacing.medium,
	paddingRight: Metrics.spacing.medium,
	paddingBottom: Metrics.spacing.medium,
}

export function ShareYourCopyright() {
	const { t } = useTranslation()
	return (
		<Card style={cardStyle}>
			<Column of="group">
				<SplitLogo />
				<Column of="inside">
					<Heading level={4}>
						{t("workpieces:cards.shareYourCopyright.title")}
					</Heading>
					<Text tertiary>{t("workpieces:cards.shareYourCopyright.desc")}</Text>
				</Column>
				<Row>
					<Button secondary bold text={t("general:buttons.toConsult")} />
				</Row>
			</Column>
		</Card>
	)
}
