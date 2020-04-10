import React, { useState, useEffect } from "react"
import { Platform, View, TouchableWithoutFeedback } from "react-native"
import { Redirect, useHistory } from "react-router"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Section, Row, Column, Flex } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import PublicNavBar from "../../smartsplit/public/navbar"
import { CheckBox } from "../../forms"
import { Metrics, Links, Colors } from "../../theme"

import { notEmptyValidator } from "../../../helpers/validators"

export function WebComponentNavbarLogin() {
	let history = useHistory()
	const handleClick = () => history.push("/auth/register")

	return (
		<PublicNavBar>
			<Text secondary> Pas de compte ?</Text>
			<View>
				<Button tertiary text="Crée un compte" onClick={handleClick} />
			</View>
			<Button secondary text="English" />
		</PublicNavBar>
	)
}

export const WebComponentButtonsLogin = () => (
	<>
		<Row>
			<Flex />
			<Button text="Me connecter" />
		</Row>
	</>
)

export const WebComponentHeading = () => (
	<Heading level="1">Connecte-toi à ton compte SmartSplit</Heading>
)

export const NativeComponentHeading = () => (
	<Heading level="3">Connecte-toi à ton compte SmartSplit</Heading>
)

export function NativeComponentButtonsLogin() {
	let history = useHistory()
	const handleClick = () => history.push("/auth/register")

	return (
		<Column>
			<Button
				style={{ marginBottom: Metrics.spacing.component }}
				text="Me connecter"
			/>
			<Button tertiary text="Créer mon compte" onClick={handleClick} />
		</Column>
	)
}

export default function Login({ auth, login }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [canSubmit, setCanSubmit] = useState(false)

	const history = useHistory()

	useEffect(() => {
		if (auth.isLoggedIn) {
			setEmail("")
			setPassword("")
			setHasSubmitted(false)
		}
	}, [auth.isLoggedIn])

	useEffect(() => {
		let emailValid = notEmptyValidator(email)
		let passwordValid = notEmptyValidator(password)

		if (emailValid && passwordValid && !auth.isLoading) {
			setCanSubmit(true)
		} else {
			setCanSubmit(false)
		}
	}, [email, password, auth.isLoading])

	const handleForgotPassword = () => history.push("/auth/forgot-password")
	const handleSignUp = () => history.push("/auth/register")
	const handleLogin = () => {
		if (canSubmit) {
			login({ email, password })
			setHasSubmitted(true)
		}
	}

	return (
		<>
			{Platform.select({
				web: <WebComponentNavbarLogin />,
			})}
			<Scrollable>
				<Section of="group" style={{ maxWidth: 464, alignSelf: "center" }}>
					{Platform.select({
						web: <WebComponentHeading />,
						android: <NativeComponentHeading />,
						ios: <NativeComponentHeading />,
					})}

					<Paragraph>Entre tes informations ci-dessous.</Paragraph>

					{!auth.isLoading && hasSubmitted && auth.error && (
						<Text style={{ color: Colors.progressBar.orangered }}>
							{auth.error.response.data.message}
						</Text>
					)}

					{!auth.isLoading && auth.data && auth.data.accessToken && (
						<Redirect to="/dashboard/" />
					)}

					<TextField
						label="Mon courriel"
						placeholder="nom@example.com"
						onChangeText={setEmail}
						value={email}
					/>
					<PasswordField
						label="Mot de passe"
						onChangeText={setPassword}
						value={password}
					/>

					<TouchableWithoutFeedback onPress={handleForgotPassword}>
						<Text link small>
							Mot de passe oublié ?
						</Text>
					</TouchableWithoutFeedback>

					<Row>
						{Platform.OS === "web" && <Flex />}
						<Button
							text="Me connecter"
							onClick={handleLogin}
							disabled={!canSubmit}
						/>
					</Row>

					{Platform.OS !== "web" && (
						<Button tertiary text="Créer mon compte" onClick={handleSignUp} />
					)}
				</Section>
			</Scrollable>
		</>
	)
}
