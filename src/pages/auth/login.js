import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import * as AuthActions from "../../../redux/Auth/Actions"
import { Redirect, useHistory } from "react-router"
import Button from "../../widgets/button"
import { Group, Row, Column, Flex } from "../../layout"
import { Heading, Paragraph, Text, Link } from "../../text"
import { TextField, PasswordField } from "../../forms"
import AuthLayout from "./layout"
import { CheckBox } from "../../forms"
import { Platform } from "../../platform"

import { notEmptyValidator } from "../../../helpers/validators"

export const LoginErrorCodes = {
	auth_invalid_credentials:
		"erros:invalidLogin",
	auth_account_inactive:
		"errors:inactiveAccount",
}

export const LoginForm = connect(
	function ({ auth }) {
		return { auth }
	},
	function (dispatch) {
		return {
			login: function (details, rememberMe) {
				dispatch(AuthActions.loginUser(details, rememberMe))
			},
		}
	}
)(function (props) {
	const {
		auth,
		login,
		stayLoggedIn,
		showForgotPassword,
		setFormState,
		children,
		onSuccess,
	} = props

	const [t] = useTranslation()

	if (!auth.isLoading && auth.data && auth.data.accessToken) {
		onSuccess && onSuccess(auth.data.user)
	}

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const validEmail = notEmptyValidator(email)
	const validPassword = notEmptyValidator(password)

	const canSubmit = !auth.isLoading && validEmail && validPassword

	const error = !auth.isLoading && auth.error
	const errorCode = error && error.code
	const errorMessage =
		(errorCode &&
			LoginErrorCodes[errorCode] &&
			t(LoginErrorCodes[errorCode])) ||
		(error && error.message)

	useEffect(() => {
		setEmail("")
		setPassword("")
	}, [auth.isLoggedIn])

	const handleLogin = () => login({ email, password }, stayLoggedIn)

	setFormState &&
		useEffect(() => {
			setFormState({ canSubmit, submit: handleLogin })
		}, [setFormState, canSubmit, email, password])

	return (
		<Column of="group">
			<TextField
				label={t("forms:labels.myEmail")}
				placeholder={t("forms:placeholders.emailExample")}
				onChangeText={setEmail}
				value={email}
			/>

			<Column of="inside">
				<PasswordField
					label={t("forms:labels.password")}
					onChangeText={setPassword}
					value={password}
				/>

				<Link link small onClick={showForgotPassword}>
					{t("general:forgotPassword")}
				</Link>
			</Column>

			{errorMessage && <Text error>{errorMessage}</Text>}

			{children}
		</Column>
	)
})

export default function LoginPage({ showRegister }) {
	const [t] = useTranslation()
	const history = useHistory()

	const [stayLoggedIn, setStayLoggedIn] = useState(false)
	const [formState, setFormState] = useState({})

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const onSuccess = () => history.push("/")

	const stayLoggedInCheckbox = (
		<CheckBox
			onChange={setStayLoggedIn}
			checked={stayLoggedIn}
			label={t("general:checkbox")}
		/>
	)

	return (
		<AuthLayout>
			{(layoutProps) => (
				<Column of="group">
					<Column of="component">
						<Heading level="1">{t("login:title")}</Heading>
						<Paragraph>{t("login:subTitle")}</Paragraph>
					</Column>

					<LoginForm
						stayLoggedIn={stayLoggedIn}
						setFormState={setFormState}
						onSuccess={onSuccess}
						{...layoutProps}
					/>

					<Platform web={Row} native={Column} of="group">
						{Platform.web && stayLoggedInCheckbox}

						{Platform.web && <Flex />}

						<Button
							text={t("general:buttons.connect")}
							onClick={formState.submit}
							disabled={!formState.canSubmit}
							style={Platform.native && { flex: 1 }}
							size={buttonSize}
						/>

						{Platform.native && (
							<Button
								tertiary
								text={t("general:buttons.createAccount")}
								onClick={showRegister}
								size={buttonSize}
							/>
						)}
					</Platform>
				</Column>
			)}
		</AuthLayout>
	)
}
