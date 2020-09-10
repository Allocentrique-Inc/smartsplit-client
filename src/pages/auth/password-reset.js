import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useStores } from "../../mobX"
import { useHistory, useRouteMatch } from "react-router"
import AuthLayout from "./layout"
import Button from "../../widgets/button"
import { Column, Row, Flex } from "../../layout"
import { Heading, Text } from "../../text"
import { PasswordField } from "../../forms"
import { Platform } from "../../platform"
import PasswordFieldWithScoreBar from "../../forms/PasswordFieldWithScoreBar"

function getErrorDisplay(t, error) {
	switch (error.code) {
		case "user_invalid_reset_token":
			return t("errors:invalidToken")
		default:
			return error.error || error.message
	}
}

export function ChangePasswordForm() {
	const { t } = useTranslation()

	const match = useRouteMatch()
	const history = useHistory()
	const token = match.params.token
	const { auth } = useStores()
	const model = auth.resetModel
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const buttonSize = Platform.web ? "medium" : "large"

	const errorMessage = !isLoading && error && getErrorDisplay(t, error)

	return (
		<Column of="group">
			<Heading level="1">{t("passwordIssues:reset")}</Heading>

			<PasswordFieldWithScoreBar
				field={model.password}
				placeholder={t("forms:placeholders.noCharacters")}
				autoCompleteType="off"
			/>

			<PasswordField
				field={model.password2}
				placeholder={t("forms:labels.repeatPassword")}
			/>

			{errorMessage && <Text error>{errorMessage}</Text>}

			<Platform web={Row} native={Column}>
				{Platform.web && <Flex />}
				<Button
					text={t("general:buttons.reset")}
					disabled={!model.isValid}
					size={buttonSize}
					onClick={async () => {
						setIsLoading(true)
						try {
							await auth.doPasswordResetAndRedirect(token, history)
						} catch (e) {
							setError(e)
						}
						setIsLoading(false)
					}}
					style={Platform.native && { flex: 1 }}
				/>
			</Platform>
		</Column>
	)
}

export default function ChangePasswordPage(props) {
	const history = useHistory()
	const navigateToLogin = () => history.push("/auth/login")

	return (
		<AuthLayout>
			<ChangePasswordForm {...props} />
		</AuthLayout>
	)
}
