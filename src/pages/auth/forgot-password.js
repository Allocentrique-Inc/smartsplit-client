import React, { useState, useEffect } from "react"
import { Platform, TouchableWithoutFeedback } from "react-native"
import { Link, useHistory } from "react-router-dom"
import { Group, Column, Row, Flex } from "../../layout"
import { Heading, Text, Paragraph } from "../../text"
import TextField from "../../forms/text"
import Button from "../../widgets/button"
import { Metrics, Links, Colors } from "../../theme"
import PublicNavBarWeb from "../../smartsplit/public/navbar-web"
import Scrollable from "../../widgets/scrollable"
import { notEmptyValidator } from "../../../helpers/validators"

export default function GetPassword({ users, forgotPassword }) {
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [canSubmit, setCanSubmit] = useState(false)
	const [hasSubmitted, setHasSubmitted] = useState(false)

	const handleRequestPassword = () => {
		if (canSubmit) {
			forgotPassword({ email })
			setHasSubmitted(true)
		}
	}

	function navitateToRegister() {
		history.push("/auth/register")
	}

	useEffect(() => {
		let emailValid = notEmptyValidator(email)

		if (emailValid && !users.forgotPassword.isLoading) {
			setCanSubmit(true)
		} else {
			setCanSubmit(false)
		}
	}, [email, users.forgotPassword.isLoading])

	useEffect(() => {
		if (!users.forgotPassword.isLoading && users.forgotPassword.data) {
			history.push("/auth/forgot-password-sent")
		}
	}, [users.forgotPassword.data, users.forgotPassword.isLoading])

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const submitButton = (
		<Button
			text="Envoyer"
			onClick={handleRequestPassword}
			disabled={!canSubmit}
			size={buttonSize}
		/>
	)

	const noAccountLink = (
		<TouchableWithoutFeedback onPress={navitateToRegister}>
			<Text link style={{ flex: 1 }}>
				Je n'ai pas de compte
			</Text>
		</TouchableWithoutFeedback>
	)

	const noAccountButton = (
		<Button
			tertiary
			text="Je n'ai pas de compte"
			onClick={navitateToRegister}
			size={buttonSize}
		/>
	)

	const openSessionButton = (
		<Button
			tertiary
			text="Ouvrir une session"
			onClick={() => history.push("/auth/login")}
			size={buttonSize}
		/>
	)

	const forgotPasswordAndSubmitButton =
		Platform.OS === "web" ? (
			<Row style={{ alignItems: "center" }}>
				{noAccountLink}
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
		<>
				{Platform.OS === "web" && (
					<PublicNavBarWeb>
						<Text secondary>Déjà Membre ?</Text>
						{openSessionButton}
						<Button secondary text="English" />
					</PublicNavBarWeb>
				)}

			<Scrollable>
				<Group of="group" style={
						Platform.OS === "web" && { maxWidth: 464, alignSelf: "center" }
					}>
					<Column of="group">
						<Heading level="1">Réinitialise ton mot de passe.</Heading>
						<Paragraph>
							Saisis l'adresse courriel lié à ton compte pour obtenir le
							lien de réinitialisation.
						</Paragraph>

					{!users.forgotPassword.isLoading &&
						hasSubmitted &&
						users.forgotPassword.error && (
							<Text style={{ color: Colors.progressBar.orangered }}>
								{users.forgotPassword.error.error}
							</Text>
						)}

					<TextField
						label="Courriel"
						label_hint=""
						undertext=""
						onChangeText={setEmail}
						value={email}
						placeholder=""
					/>

					{forgotPasswordAndSubmitButton}
					</Column>
				</Group>
			</Scrollable>
		</>
	)
}
