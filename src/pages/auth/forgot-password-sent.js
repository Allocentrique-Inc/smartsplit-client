import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { Column } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import Button from "../../widgets/button"
import { Colors } from "../../theme"
import AuthLayout from "./layout"
import { Platform } from "../../platform"

export default function PasswordSent(props) {
	const [t] = useTranslation()
	let history = useHistory()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"
	const navigateToLogin = () => history.push("/auth/login")

	return (
		<AuthLayout>
			<Column of="group">
				<Column of="component">
					<Heading level="1">Courriel envoyé.</Heading>
					<Paragraph>{t("passwordIssues:resetParagraph")}</Paragraph>
				</Column>

				<Button
					secondary
					style={{ borderColor: Colors.stroke }}
					text={
						<Text link heavy>
							{t("general:buttons.backHome")}
						</Text>
					}
					onClick={navigateToLogin}
					size={buttonSize}
				/>
			</Column>
		</AuthLayout>
	)
}
