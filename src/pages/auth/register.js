import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { useHistory } from "react-router-dom"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Platform, Web, Native } from "../../platform"
import { DialogModal } from "../../widgets/modal"
import { TextDivider, Section, Column, Row, Group, Flex } from "../../layout"
import { TextField, PasswordField, CheckBox } from "../../forms"
import { Heading, Paragraph, Text, Link } from "../../text"
import PublicPageLayout from "../../layout/public-page"
import PublicNavBarWeb from "../../smartsplit/public/navbar-web"
import ProgressBar from "../../widgets/progress-bar"
import FacebookIcon from "../../svg/facebook"
import GoogleIcon from "../../svg/google"
import { Metrics, Colors } from "../../theme"
import zxcvbn from "zxcvbn"
import { notEmptyValidator, sameValidator } from "../../../helpers/validators"
import { CheckEmailModal } from "./check-email"

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

export function RegisterForm({ users, registerUser }) {
	const history = useHistory()
	const registration = users.registerUser

	const [showTerms, setShowTerms] = useState(false)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [agreeTerms, setAgreeTerms] = useState(false)

	const [errorEmail, setErrorEmail] = useState(null)
	const [errorPassword, setErrorPassword] = useState(null)
	const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(null)

	const score = zxcvbn(password).score
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const handleFinished = () => history.push("/auth/login")
	const handleForgotPassword = () => history.push("/auth/forgot-password")

	const validEmail = notEmptyValidator(email)
	const validPassword = notEmptyValidator(password) && score > 1
	const validPasswordRepeat = sameValidator(password, passwordRepeat)

	const canSubmit =
		!registration.isLoading &&
		notEmptyValidator(email) &&
		notEmptyValidator(password) &&
		notEmptyValidator(passwordRepeat) &&
		agreeTerms

	const error = !registration.isLoading && registration.error
	const errorCode = error && error.code

	const errorEmailUsed = errorCode === "user_conflict" && (
		<Text small error>
			Ce courriel est déjà utilisé.{" "}
			<Link small error bold onClick={handleForgotPassword}>
				As-tu oublié ton mot de passe
			</Link>
			?
		</Text>
	)

	const errorMessage = !errorEmailUsed && error && error.message

	const handleRegister = () => {
		setErrorEmail(
			validEmail ? null : "Vous devez entrer votre adresse courriel"
		)
		setErrorPassword(
			validPassword
				? null
				: "Le mot de passe doit comporter au moins 8 caractères"
		)
		setErrorPasswordRepeat(
			validPasswordRepeat
				? null
				: "Les deux mots de passe doivent être identiques"
		)

		if (canSubmit && validEmail && validPassword && validPasswordRepeat) {
			registerUser({ email, password, locale: "fr" })
		}
	}

	return (
		<>
			<CheckEmailModal
				visible={!!registration.data}
				onRequestClose={handleFinished}
			/>

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

			<Column as={Group} of={Platform.OS === "web" ? "group" : "component"}>
				<Column of="component">
					<Heading level="1">En route vers la professionnalisation</Heading>
					<Paragraph>
						Tu es à un clic de pouvoir documenter ta musique et de partager tes
						droits avec tes contributeurs.
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

				<Column of="group">
					<TextField
						label="Entre ton courriel"
						placeholder="nom@example.com"
						onChangeText={setEmail}
						error={errorEmailUsed}
					/>

					<Column of="inside">
						<PasswordField
							value={password}
							onChangeText={setPassword}
							label="Choisis ton mot de passe"
							placeholder="8 caractères minimum"
							error={errorPassword}
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
						placeholder="Confirme ton mot de passe"
						onChangeText={setPasswordRepeat}
						error={errorPasswordRepeat}
					/>

					<CheckBox onChange={setAgreeTerms} checked={agreeTerms}>
						<Text>
							J'ai lu et j'accepte les
							<Link link onClick={() => setShowTerms(true)}>
								{" "}
								Termes et conditions d'utilisation{" "}
							</Link>
							et la
							<Link link onClick={() => setShowTerms(true)}>
								{" "}
								Politique sur la vie privée{" "}
							</Link>
							de Smartsplit.
						</Text>
					</CheckBox>

					<CheckBox>
						<Text primary regular>
							Rester connecté
						</Text>
					</CheckBox>

					{errorMessage && <Text error>{errorMessage}</Text>}

					<Platform web={Row} native={Column} of="group">
						{Platform.web && <Flex />}

						<Button
							text="Créer mon compte"
							onClick={handleRegister}
							disabled={!agreeTerms || !canSubmit}
							size={buttonSize}
						/>

						{Platform.native && (
							<Button
								tertiary
								text="J'ai déjà un compte"
								onClick={() => history.push("/auth/login")}
								size={buttonSize}
							/>
						)}
					</Platform>
				</Column>
			</Column>
		</>
	)
}

export default function RegisterPage(props) {
	const history = useHistory()

	return (
		<PublicPageLayout
			navigation={
				<>
					<Text secondary>Déjà Membre ?</Text>
					<Button
						tertiary
						text="Ouvrir une session"
						onClick={() => history.push("/auth/login")}
					/>
					<Button secondary text="English" />
				</>
			}
		>
			<RegisterForm {...props} />
		</PublicPageLayout>
	)
}
