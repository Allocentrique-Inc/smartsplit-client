import React, { useState, useEffect } from "react"
import { Redirect, useHistory } from "react-router"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Group, Row, Column, Flex } from "../../layout"
import { Heading, Paragraph, Text, Link } from "../../text"
import { TextField, PasswordField } from "../../forms"
import PublicPageLayout from "../../layout/public-page"
import { CheckBox } from "../../forms"
import { Metrics, Links, Colors } from "../../theme"
import { Modal } from "../../widgets/modal"
import { Platform } from "../../platform"

import { notEmptyValidator } from "../../../helpers/validators"

export const LoginErrorCodes = {
	auth_invalid_credentials:
		"Adresse courriel ou mot de passe invalide. Veuillez réessayer.",
	auth_account_inactive:
		"Ce compte n'a pas encore été activé. Vérifie tes courriels, ou essaie de t'inscrire à nouveau!",
}

export function LoginForm({ auth, login }) {
	const history = useHistory()

	if (!auth.isLoading && auth.data && auth.data.accessToken) {
		history.push("/")
		return null
	}

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [stayLoggedIn, setStayLoggedIn] = useState(false)

	const validEmail = notEmptyValidator(email)
	const validPassword = notEmptyValidator(password)

	const canSubmit = !auth.isLoading && validEmail && validPassword
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const error = !auth.isLoading && auth.error
	const errorCode = error && error.code
	const errorMessage =
		(errorCode && LoginErrorCodes[errorCode]) || (error && error.message)

	useEffect(() => {
		setEmail("")
		setPassword("")
	}, [auth.isLoggedIn])

	const handleForgotPassword = () => history.push("/auth/forgot-password")
	const handleSignUp = () => history.push("/auth/register")
	const handleLogin = () => login({ email, password }, stayLoggedIn)

	const stayLoggedInCheckbox = (
		<CheckBox
			onChange={setStayLoggedIn}
			checked={stayLoggedIn}
			label="Rester connecté"
		/>
	)

	return (
		<Column of="group">
			<Column of="component">
				<Heading level="1">Connecte-toi à ton compte Smartsplit</Heading>

				<Paragraph>Entre tes informations ci-dessous</Paragraph>
			</Column>

			<Column of="group">
				<TextField
					label="Mon courriel"
					placeholder="nom@example.com"
					onChangeText={setEmail}
					value={email}
				/>

				<Column of="inside">
					<PasswordField
						label="Mot de passe"
						onChangeText={setPassword}
						value={password}
					/>

					<Link link small onClick={handleForgotPassword}>
						Mot de passe oublié ?
					</Link>
				</Column>

				{errorMessage && <Text error>{errorMessage}</Text>}

				<Platform web={Row} native={Column} of="group">
					{Platform.web && stayLoggedInCheckbox}

					{Platform.web && <Flex />}

					<Button
						text="Me connecter"
						onClick={handleLogin}
						disabled={!canSubmit}
						style={Platform.OS !== "web" && { flex: 1 }}
						size={buttonSize}
					/>

					{Platform.native && (
						<Button
							tertiary
							text="Créer mon compte"
							onClick={handleSignUp}
							size={buttonSize}
						/>
					)}
				</Platform>
			</Column>
		</Column>
	)
}

export function LoginModal(props) {
	return (
		<Modal visible={props.visible}>
			<LoginForm {...props} />
		</Modal>
	)
}

export default function LoginPage(props) {
	const history = useHistory()
	const handleSignUp = () => history.push("/auth/register")
	const [showModal, setModal] = useState(false)

	return (
		<PublicPageLayout
			navigation={
				<>
					<Button text="Test" onClick={() => setModal(true)} />
					<Text secondary>Pas de compte ?</Text>
					<Button tertiary text="Crée un compte" onClick={handleSignUp} />
					<Button secondary text="English" />
				</>
			}
		>
			<LoginModal visible={showModal} {...props} />
			<LoginForm {...props} />
		</PublicPageLayout>
	)
}
