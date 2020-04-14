import React, { useState, useEffect } from "react"
import { Platform, View, TouchableWithoutFeedback } from "react-native"
import { Redirect, useHistory } from "react-router"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Group, Row, Column, Flex } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import PublicNavBar from "../../smartsplit/public/navbar"
import { CheckBox } from "../../forms"
import { Metrics, Links, Colors } from "../../theme"
import { Modal } from "../../widgets/modal"

import { notEmptyValidator } from "../../../helpers/validators"

export function LoginForm({ auth, login }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [canSubmit, setCanSubmit] = useState(false)
	const [stayConnected, setStayConnected] = useState(false)

	const history = useHistory()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"
	const LoginButtonContainer = Platform.OS === "web" ? Row : Column

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
			login({ email, password }, stayConnected)
			setHasSubmitted(true)
		}
	}

	return (
		<Column
			style={Platform.OS === "web" && { maxWidth: 464, alignSelf: "center" }}
		>
			<Group of="component">
				<Heading level="1">Connecte-toi à ton compte Smartsplit</Heading>

				<Paragraph>Entre tes informations ci-dessous</Paragraph>
			</Group>

			<Group of="group">
				{!auth.isLoading && hasSubmitted && auth.error && (
					<Text style={{ color: Colors.progressBar.orangered }}>
						{auth.error.message}
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

				<Column of="inside">
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
				</Column>

				<LoginButtonContainer of="group">

					<CheckBox onChange={setStayConnected} checked={stayConnected}>
						<Text primary regular>
							Rester connecté
						</Text>
					</CheckBox>
					< Flex />

					<Button
						text="Me connecter"
						onClick={handleLogin}
						disabled={!canSubmit}
						style={Platform.OS !== "web" && { flex: 1 }}
						size={buttonSize}
					/>
				</LoginButtonContainer>

				{Platform.OS !== "web" && (
					<Button
						tertiary
						text="Créer mon compte"
						onClick={handleSignUp}
						size={buttonSize}
					/>
				)}
			</Group>
		</Column>
	)
}

export function LoginModal(props) {
	return (
		<Modal visible={props.showModal}>
			<LoginForm {...props} />
		</Modal>
	)
}

export default function LoginPage(props) {
	const history = useHistory()
	const handleSignUp = () => history.push("/auth/register")
	const [showModal, setModal] = useState(false)

	return (
		<>
			<LoginModal visible={showModal} {...props} />

			{Platform.OS === "web" && (
				<PublicNavBar>
					<Text secondary>Pas de compte ?</Text>
					<View>
						<Button tertiary text="Crée un compte" onClick={handleSignUp} />
					</View>
					<Button secondary text="English" />
				</PublicNavBar>
			)}

			<Scrollable>
				<Button text="Test" onClick={() => setModal(true)} />
				<LoginForm {...props} />
			</Scrollable>
		</>
	)
}
