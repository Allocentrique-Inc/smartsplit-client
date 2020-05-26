import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import * as UserActions from "../../../redux/users/actions"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { Group, Column, Row, Flex } from "../../layout"
import { Heading, Text, Paragraph, Link } from "../../text"
import TextField from "../../forms/text"
import Button from "../../widgets/button"
import { Metrics, Links, Colors } from "../../theme"
import AuthLayout from "./layout"
import { notEmptyValidator } from "../../../helpers/validators"
import { Platform } from "../../platform"

export const ForgotPasswordForm = connect(
	({ users }) => ({ users }),
	(dispatch) => ({
		forgotPassword: (details) => dispatch(UserActions.forgotPassword(details)),
	})
)(function ({ users, forgotPassword, setFormState, onSuccess }) {
	const [t] = useTranslation()
	const history = useHistory()
	const state = users.forgotPassword

	const [email, setEmail] = useState("")
	const [hasSubmitted, setHasSubmitted] = useState(false)

	const validEmail = notEmptyValidator(email)
	const canSubmit = !hasSubmitted && !state.isLoading && validEmail

	const errorMessage =
		state.error &&
		(state.error.code === "user_not_found"
			? t("errors:noUser")
			: state.error.message)

	const handleSubmit = () => {
		setHasSubmitted(true)
		forgotPassword({ email })
	}

	// Réinitialiser le formulaire après envoi, et rediriger l'utilisateur
	useEffect(() => {
		if (!state.isLoading && state.data && hasSubmitted) {
			setEmail("")
			onSuccess && onSuccess(state.data)
		}
	}, [state.isLoading, state.data, hasSubmitted])

	// Reset le `hasSubmitted` lorsque le chargement se termine
	useEffect(() => {
		if (!state.isLoading) setHasSubmitted(false)
	}, [state.isLoading])

	useEffect(() => {
		setFormState({ canSubmit, submit: handleSubmit })
	}, [canSubmit])

	return (
		<Column of="group">
			<TextField
				label={t("forms:labels.email")}
				label_hint=""
				undertext=""
				onChangeText={setEmail}
				value={email}
			/>

			{errorMessage && <Text error>{errorMessage}</Text>}
		</Column>
	)
})

export function ForgotPasswordPageContents(props) {
	const { showRegister, showLogin } = props

	const [t] = useTranslation()
	const [formState, setFormState] = useState({})

	const buttonSize = Platform.native ? "large" : "medium"

	const noAccountLink = (
		<Link action onClick={showRegister}>
			{t("general:noAccount")}
		</Link>
	)

	const noAccountButton = (
		<Button
			tertiary
			text={t("general:noAccount")}
			onClick={showRegister}
			size={buttonSize}
		/>
	)

	const submitButton = (
		<Button
			text={t("general:buttons.send")}
			onClick={formState.submit}
			disabled={!formState.canSubmit}
			size={buttonSize}
		/>
	)

	const openSessionButton = (
		<Button
			tertiary
			text={t("publicNavbarWeb:openAccount")}
			onClick={showLogin}
			size={buttonSize}
		/>
	)

	const forgotPasswordAndSubmitButton = Platform.web ? (
		<Row style={{ alignItems: "center" }}>
			{noAccountLink}
			<Flex />
			{submitButton}
		</Row>
	) : (
		<Column of="group">
			{submitButton}
			{noAccountButton}
			{openSessionButton}
		</Column>
	)

	return (
		<Column of="group">
			<Heading level="1">{t("passwordIssues:reset")}</Heading>
			<Paragraph>{t("passwordIssues:enterEmail")}</Paragraph>

			<ForgotPasswordForm {...props} setFormState={setFormState} />
			{forgotPasswordAndSubmitButton}
		</Column>
	)
}

export default function ForgotPasswordPage() {
	const history = useHistory()

	return (
		<AuthLayout>
			{(layoutProps) => (
				<ForgotPasswordPageContents
					{...layoutProps}
					onSuccess={() => history.push("/auth/forgot-password-sent")}
				/>
			)}
		</AuthLayout>
	)
}
