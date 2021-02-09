import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { Column, Hairline, Row, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import EyeIcon from "../../../svg/eye"
import ArrowIcon from "../../../svg/arrow-right"
import { RadioGroup, RadioGroupButton } from "../../../forms"
import { Card } from "semantic-ui-react"
import { useRightSplits } from "../../../mobX/hooks"
import { useCurrentWorkpieceId } from "../context"
import { Button } from "../../../widgets/button"

export default function PrivacyPage() {
	const { t } = useTranslation("rightSplits")
	const splitState = useRightSplits(useCurrentWorkpieceId(), "copyright")
	const [styles, setStyles] = useState({})
	useEffect(() => {
		setStyles(splitState.getStyles(window.outerWidth))
	}, [window.outerWidth])
	const [privacy, setPrivacy] = useState()
	return (
		<Row>
			<Column of="section" flex={1}>
				<Column of="group">
					<Row of="component">
						<EyeIcon size={Metrics.size.small} color={Colors.action} />
						<Text action bold>
							{t("privacy.title").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>{t("privacy.header")}</Heading>
						<Paragraph>{t("privacy.description")}</Paragraph>
					</Column>
					<RadioGroup
						label={t("privacy.radiosLabel")}
						value={privacy}
						onChange={setPrivacy}
					>
						<Column of="component">
							<RadioGroupButton value="private" label={t("privacy.private")} />
							<RadioGroupButton value="public" label={t("privacy.public")} />
						</Column>
					</RadioGroup>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Card
				style={{
					backgroundColor: Colors.background.underground,
					padding: Metrics.spacing.medium,
				}}
				grounded
			>
				<Text tertiary small bold>
					{t("privacy.helpCard.title").toUpperCase()}
				</Text>
				<Spacer of="inside" />
				<Hairline />
				<Spacer of="component" />
				<Column of="inside">
					<Heading level={4}>{t("privacy.helpCard.header")}</Heading>
					<Text secondary>{t("privacy.helpCard.content")}</Text>
					<Button
						tertiary
						style={{ paddingLeft: 0 }}
						styleText={{ marginLeft: -Metrics.size.small }}
						text={() => (
							<Row valign="center" of="inside">
								<Text action bold>
									{t("privacy.helpCard.example")}
								</Text>
								<ArrowIcon
									withTail
									size={Metrics.size.small}
									color={Colors.action}
								/>
							</Row>
						)}
					/>
				</Column>
			</Card>
		</Row>
	)
}
