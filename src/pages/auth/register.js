import React, { useState, useEffect } from "react"
import { View, Platform } from "react-native"
import { useHistory } from "react-router-dom"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { DialogModal } from "../../widgets/modal"
import { TextDivider, Section, Column, Row, Group, Flex } from "../../layout"
import { TextField, PasswordField, CheckBox } from "../../forms"
import { Heading, Paragraph, Text } from "../../text"
import PublicNavBarWeb from "../../smartsplit/public/navbar-web"
import ProgressBar from "../../widgets/progress-bar"
import FacebookIcon from "../../svg/facebook"
import GoogleIcon from "../../svg/google"
import { Metrics, Colors } from "../../theme"
import zxcvbn from "zxcvbn"
import { notEmptyValidator, sameValidator } from "../../../helpers/validators"

export function passwordBarColor(score) {
	switch (score) {
		case 0:
			return Colors.progressBar.darkred
		case 1:
			return Colors.progressBar.orangered
		case 2:
			return Colors.progressBar.orange
		case 3:
			return Colors.progressBar.yellowgreen
		case 4:
			return Colors.progressBar.green
		default:
			return Colors.progressBar.darkred
	}
}

export function passwordStrengthIndicator(score) {
	switch (score) {
		case 0:
		case 1:
			return "Mot de passe faible"
		case 2:
		case 3:
			return "Mot de passe moyen"
		case 4:
		default:
			return "Mot de passe acceptable"
			return "Mot de passe acceptable"
	}
}

export function passwordProgress(score) {
	switch (score) {
		case 4:
			return 100
		case 3:
			return 80
		case 2:
			return 50
		case 1:
			return 30
		case 0:
			return 10
		default:
			return 10
	}
}

export function TermsConditionsModal({ visible, onAgree, onCancel }) {
	return (
		<DialogModal
			visible={visible}
			onRequestClose={onCancel}
			title="Termes et conditions"
			buttons={
				<>
					<Button tertiary text="Annuler" onClick={onCancel} />
					<Button text="J'accepte !" onClick={onAgree} />
				</>
			}
		>
			<Group of="group" style={{ maxWidth: 560, alignSelf: "center" }}></Group>
		</DialogModal>
	)
}

export default function Register({ users, registerUser }) {
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [showTerms, setShowTerms] = useState(false)
	const [showCheckEmail, setShowCheckEmail] = useState(false)
	const [agreeTerms, setAgreeTerms] = useState(false)
	const score = zxcvbn(password).score
	const [canSubmit, setCanSubmit] = useState(false)
	const [hasSubmitted, setHasSubmitted] = useState(false)

	const handleRegister = () => {
		if (canSubmit) {
			registerUser({ email, password, locale: "fr" })
			setHasSubmitted(true)
		}
	}

	useEffect(() => {
		let emailValid = notEmptyValidator(email)
		let passwordsValid =
			notEmptyValidator(password) &&
			notEmptyValidator(passwordRepeat) &&
			sameValidator(password, passwordRepeat)

		if (
			emailValid &&
			passwordsValid &&
			!users.registerUser.isLoading &&
			agreeTerms
		) {
			setCanSubmit(true)
		} else {
			setCanSubmit(false)
		}
	}, [email, password, passwordRepeat, users.registerUser.isLoading, agreeTerms])

	const RegisterButtonContainer = Platform.OS === "web" ? Row : Column
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	return (
		<>
			<TermsConditionsModal
				visible={showTerms}
				onRequestClose={() => setShowTerms(false)}
				onAgree={() => {
					setAgreeTerms(true)
					setShowTerms(false)
				}}
				onCancel={() => {
					setAgreeTerms(false)
					setShowTerms(false)
				}}
			/>

			{Platform.OS === "web" && (
				<PublicNavBarWeb>
					<Text secondary>Déjà Membre ?</Text>
					<Button
						tertiary
						text="Ouvrir une session"
						onClick={() => history.push("/auth/login")}
					/>
					<Button secondary text="English" />
				</PublicNavBarWeb>
			)}

			<Scrollable>
				<Group
					of={Platform.OS === "web" ? "group" : "component"}
					style={
						Platform.OS === "web" && { maxWidth: 464, alignSelf: "center" }
					}
				>
					<Column of="component">
						<Heading level="1">En route vers la professionnalisation</Heading>
						<Paragraph>
							Tu es à un clic de pouvoir documenter ta musique et de partager
							tes droits avec tes contributeurs.
						</Paragraph>
						<View />
					</Column>

					<Column of="inside">
						<Button
							style={{ backgroundColor: "#4267B2" }}
							icon={<FacebookIcon />}
							text="Connexion avec Facebook"
						/>

						<Button
							style={{ backgroundColor: "#4285F4" }}
							icon={<GoogleIcon />}
							text="Connnexion avec Google"
						/>
					</Column>

					<TextDivider text="ou" />

					{!users.registerUser.isLoading &&
						hasSubmitted &&
						users.registerUser.error && (
							<Text
								style={{
									color: Colors.progressBar.orangered,
								}}
							>
								{users.registerUser.error.message}
							</Text>
						)}

					<Column of="group">
						<TextField
							label="Entre ton courriel"
							placeholder="nom@example.com"
							onChangeText={setEmail}
						/>

						<Column of="inside">
							<PasswordField
								value={password} //pour avoir toujours valeur mot de passe, reçoit valeur password
								onChangeText={setPassword} // quand changement mot de passe modifie valeur mise à jour
								label="Choisis ton mot de passe"
								placeholder=""
							/>

							<Row style={{ alignItems: "center" }}>
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
							label="Répète ton mot de passe"
							placeholder=""
							onChangeText={setPasswordRepeat}
						/>

						<CheckBox onChange={setAgreeTerms} checked={agreeTerms}>
							<Text>
								J'ai lu et j'accepte les
								<Text link onClick={() => setShowTerms(true)}>
									{" "}
									Termes et conditions d'utilisation{" "}
								</Text>
								et la
								<Text link onClick={() => setShowTerms(true)}>
									{" "}
									Politique sur la vie privée{" "}
								</Text>
								de Smartsplit.
							</Text>
						</CheckBox>

						<RegisterButtonContainer of="group">
							<CheckBox>
								<Text primary regular>
									Rester connecté
								</Text>
							</CheckBox>
							<Flex />
							<Button
								text="Créer mon compte"
								onClick={handleRegister}
								disabled={!canSubmit}
								size={buttonSize}
							/>
							{Platform.OS !== "web" && (
								<Button
									tertiary
									text="J'ai déjà un compte"
									onClick={() => history.push("/auth/login")}
									size={buttonSize}
								/>
							)}
						</RegisterButtonContainer>
					</Column>
				</Group>
			</Scrollable>
		</>
	)
}
