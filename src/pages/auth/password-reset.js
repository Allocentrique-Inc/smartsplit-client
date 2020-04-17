import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import { resetPassword } from "../../../redux/Users/Actions"
import { useHistory } from "react-router"
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

export const PasswordResetErrors = {
	user_invalid_reset_token:
		"Le jeton de réinitialisation n'est plus valide, ou a expiré. Veuillez effectuer une nouvelle demande de réinitialisation de mot de passe.",
}

export const ChangePasswordForm = connect(
	({ users }) => ({ state: users.passwordReset }),
	(dispatch) => ({
		resetPassword: function (token) {
			dispatch(resetPassword(token))
		},
	})
)(function ({ state, resetPassword, match }) {
	const t = useTranslation()

	const history = useHistory()
	const token = match.params.token

	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [errorPassword, setErrorPassword] = useState(null)
	const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(null)
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const score = zxcvbn(password).score

	const canSubmit =
		!state.isLoading &&
		notEmptyValidator(password) &&
		notEmptyValidator(passwordRepeat)

	const buttonSize = Platform.web ? "medium" : "large"

	const errorMessage =
		!state.isLoading &&
		state.error &&
		(PasswordResetErrors[state.error.code] || state.error.message)

	const handleSubmit = () => {
		const validPassword = score > 1
		const validPasswordRepeat = sameValidator(password, passwordRepeat)

		setErrorPassword(validPassword ? null : t("errors:strengthEmail"))
		setErrorPasswordRepeat(validPasswordRepeat ? null : t("errors:sameEmails"))

		if (validPassword && validPasswordRepeat) {
			resetPassword({ token, password })
			setHasSubmitted(true)
		}
	}

	useEffect(() => {
		if (hasSubmitted && !state.isLoading && state.data) {
			history.push("/")
			setPassword("")
			setPasswordRepeat("")
			setHasSubmitted(false)
		}
	}, [hasSubmitted, state.isLoading, state.data])

	return (
		<Column of="group">
			<Heading level="1">Réinitialise ton mot de passe.</Heading>

			<Column of="inside">
				<PasswordField
					value={password}
					onChangeText={setPassword}
					label={t("passwordIssues:reset")}
					placeholder={t("forms:placeholders.noChars")}
					error={errorPassword}
				/>

				<Row>
					<Text secondary small style={{ flex: 3 }}>
						{passwordStrengthIndicator(score)}
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
})

export default function ChangePasswordPage(props) {
	const history = useHistory()
	const navigateToLogin = () => history.push("/auth/login")

	return (
		<AuthLayout>
			<ChangePasswordForm {...props} />
		</AuthLayout>
	)
}
