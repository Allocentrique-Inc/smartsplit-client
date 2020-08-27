import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useStorePath } from "../../appstate/react"
import { useStores, useStorePath as useMobXStorePath } from "../../mobX"
import { useHistory, useRouteMatch } from "react-router"
import AuthLayout from "./layout"
import Button from "../../widgets/button"
import ProgressBar from "../../widgets/progress-bar"
import {
	passwordBarColor,
	passwordProgress,
	passwordStrengthIndicator,
} from "../auth/register"
import { Column, Row, Flex } from "../../layout"
import { Heading, Text } from "../../text"
import { PasswordField } from "../../forms"
import { Platform } from "../../platform"
import { notEmptyValidator, sameValidator } from "../../../helpers/validators"
import zxcvbn from "zxcvbn"

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

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [errorPassword, setErrorPassword] = useState(null)
	const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(null)

	const score = zxcvbn(password).score

	const canSubmit =
		!isLoading &&
		notEmptyValidator(password) &&
		notEmptyValidator(passwordRepeat)

	const buttonSize = Platform.web ? "medium" : "large"

	const errorMessage = !isLoading && error && getErrorDisplay(t, error)

	const handleSubmit = () => {
		const validPassword = score > 1
		const validPasswordRepeat = sameValidator(password, passwordRepeat)

		setErrorPassword(validPassword ? null : t("errors:strengthPassword"))
		setErrorPasswordRepeat(
			validPasswordRepeat ? null : t("errors:samePasswords")
		)
		setError(null)

		if (validPassword && validPasswordRepeat) {
			setIsLoading(true)
			auth
				.resetPasswordAndLogin(token, password)
				.then(() => history.push("/"))
				.catch((e) => setError(e))
				.finally(() => setIsLoading(false))
		}
	}

	return (
		<Column of="group">
			<Heading level="1">{t("passwordIssues:reset")}</Heading>

			<Column of="inside">
				<PasswordField
					value={password}
					onChangeText={setPassword}
					label={t("passwordIssues:reset")}
					placeholder={t("forms:placeholders.noCharacters")}
					error={errorPassword}
				/>

				<Row>
					<Text secondary small style={{ flex: 3 }}>
						{t(passwordStrengthIndicator(score))}
					</Text>
					<Flex />
					<ProgressBar
						size="tiny"
						style={{ flex: 1 }}
						color={passwordBarColor(score)}
						progress={passwordProgress(score)}
					/>
				</Row>
			</Column>

			<PasswordField
				value={passwordRepeat}
				onChangeText={setPasswordRepeat}
				label={t("forms:labels.confirmNewPassword")}
				error={errorPasswordRepeat}
			/>

			{errorMessage && <Text error>{errorMessage}</Text>}

			<Platform web={Row} native={Column}>
				{Platform.web && <Flex />}
				<Button
					text={t("general:buttons.reset")}
					disabled={!canSubmit}
					size={buttonSize}
					onClick={handleSubmit}
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
