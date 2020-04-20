import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { Column } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import Button from "../../widgets/button"
import { Colors } from "../../theme"
import AuthLayout from "./layout"
import { Platform } from "../../platform"

export function ForgotPasswordSentContents(props) {
	return (
		<Column of="component">
			<Heading level="1">{t("passwordIssues:emailSent")}</Heading>
			<Paragraph>{t("passwordIssues:resetParagraph")}</Paragraph>
		</Column>
	)
}

export default function ForgotPasswordSent(props) {
	const [t] = useTranslation()
	let history = useHistory()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"
	const navigateToLogin = () => history.push("/auth/login")

	return (
		<AuthLayout>
			{(layoutProps) => (
				<Column of="group">
					<ForgotPasswordSentContents />
					<Button
						secondary
						style={{ borderColor: Colors.stroke }}
						text={
							<Text link heavy>
								{t("general:buttons.backHome")}
							</Text>
						}
						onClick={layoutProps.showLogin}
						size={buttonSize}
					/>
				</Column>
			)}
		</AuthLayout>
	)
}
