import React, { useState, useEffect } from "react"
import { View, Platform } from "react-native"
import { useHistory } from "react-router-dom"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { DialogModal } from "../../widgets/modal"
import { TextDivider, Section, Column, Row, Group, Flex } from "../../layout"
import { TextField, PasswordField, CheckBox } from "../../forms"
import { Heading, Text } from "../../text"
import PublicNavBar from "../../smartsplit/public/navbar"
import ProgressBar from "../../widgets/progress-bar"
import CheckEmailModal from "./check-email"
//import { Tooltip } 						from 'react-native-elements'
import FacebookIcon from "../../svg/facebook"
import GoogleIcon from "../../svg/google"
import { Metrics, Colors } from "../../theme"
import zxcvbn from "zxcvbn"
import { notEmptyValidator, sameValidator } from "../../../helpers/validators"

export const WebComponentRegisterTitle = () => (
	<Heading level="1">En route vers la professionnalisation</Heading>
)

export const NativeComponentRegisterTitle = () => (
	<Heading level="3">En route vers la professionnalisation</Heading>
)

export function WebComponentNavbarRegister() {
	let history = useHistory()
	const handleClick = () => history.push("/auth/login")

	return (
		<PublicNavBar>
			<Text secondary>Déjà Membre ?</Text>
			<Button tertiary text="Ouvrir une session" onClick={handleClick} />
			<Button secondary text="English" />
		</PublicNavBar>
	)
}

export function WebComponentButtonsRegister(props) {
	const [modalOpen, setModal] = useState(false)
	const [modalOpenEmail, setModalEmail] = useState(false)

	useEffect(() => {
		if (!props.registerUser.isLoading && props.registerUser.data) {
			setModalEmail(true)
		}
	}, [props.registerUser.isLoading])

	return (
		<>
			<TermsConditionsModal
				visible={modalOpen}
				onRequestClose={() => setModal(false)}
			/>

			<CheckBox>
				<Text>
					J'ai lu et j'accepte les
					<Text link onClick={() => setModal(true)}>
						{" "}
						Termes et conditions d'utilisation{" "}
					</Text>
					et la
					<Text link onClick={() => setModal(true)}>
						{" "}
						Politique sur la vie privée{" "}
					</Text>
					de Smartsplit.
				</Text>
			</CheckBox>

			<Row style={{ marginTop: Metrics.spacing.component }}>
				<CheckBox>
					<Text primary regular>
						Rester connecté
					</Text>
					{/* <Tooltip 
			popover={<Text>
				Ceci installe un cookie spécifique dans ton 
				navigateur afin de te permettre de revenir 
				avec cet appareil sans avoir à te reconnecter.
			</Text>} 
			icon={<TooltipIcon />}
			/> */}
				</CheckBox>
				<Flex />
				<Button
					text="Créer mon compte"
					onClick={() => {
						if (!props.disabled) {
							props.onClick()
						}
					}}
					disabled={props.disabled}
				/>
				<CheckEmailModal
					visible={modalOpenEmail}
					onRequestClose={() => setModalEmail(false)}
				/>
			</Row>
		</>
	)
}

export function TermsConditionsModal(props) {
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title="Termes et conditions"
			buttons={
				<>
					<Button tertiary text="Annuler" onClick={props.onRequestClose} />
					<Button text="J'accepte !" />
				</>
			}
		>
			<Group
				of="group"
				style={{ width: 375, maxWidth: 560, alignSelf: "center" }}
			></Group>
		</DialogModal>
	)
}
export function NativeComponentButtonsRegister(props) {
	let history = useHistory()
	const handleClick = () => history.push("/auth/login")
	return (
		<>
			<Button
				text="Créer mon compte"
				style={{ marginBottom: Metrics.spacing.component }}
				onClick={props.onClick}
				disabled={props.disabled}
			/>
			<Button
				tertiary
				text="J'ai déjà un compte"
				onClick={() => handleClick()}
			/>
		</>
	)
}

export function WebComponentVerifyEmail(props) {
	const [modalOpen, setModal] = useState(false)
	return (
		<CheckEmailModal
			visible={modalOpen}
			onRequestClose={() => setModal(false)}
			buttons={
				<>
					<Button text="Créer mon compte" onClick={() => setModal(true)} />
				</>
			}
		/>
	)
}

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
			return <Text secondary>Mot de passe faible</Text>
		case 1:
			return <Text secondary>Mot de passe faible</Text>
		case 2:
			return <Text secondary>Mot de passe moyen</Text>
		case 3:
			return <Text secondary>Mot de passe moyen</Text>
		case 4:
			return <Text secondary>Mot de passe acceptable</Text>
		default:
			return <Text secondary>Mot de passe acceptable</Text>
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

export default function Register({ users, registerUser }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [agreeTerms, setAgreeTerms] = useState(true) // demo temp
	const score = zxcvbn(password)
		.score /* passer le mot de passe dans zxcvbn, valeur */
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

		if (emailValid && passwordsValid && !users.registerUser.isLoading) {
			setCanSubmit(true)
		} else {
			setCanSubmit(false)
		}
	}, [email, password, passwordRepeat, users.registerUser.isLoading])

	return (
		<>
			{Platform.select({
				web: <WebComponentNavbarRegister />,
			})}

			<Scrollable>
				<Section
					of="group"
					style={{ width: 375, maxWidth: 560, alignSelf: "center" }}
				>
					<Column of="group">
						{Platform.select({
							web: <WebComponentRegisterTitle />,
							android: <NativeComponentRegisterTitle />,
							ios: <NativeComponentRegisterTitle />,
						})}
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

						<TextField
							label="Entre ton courriel"
							placeholder="nom@example.com"
							onChangeText={setEmail}
						/>

						<PasswordField
							value={password} //pour avoir toujours valeur mot de passe, reçoit valeur password
							onChangeText={setPassword} // quand changement mot de passe modifie valeur mise à jour
							label="Choisis ton mot de passe"
							placeholder=""
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

						<PasswordField
							label="Répète ton mot de passe"
							placeholder=""
							onChangeText={setPasswordRepeat}
						/>

						{Platform.select({
							web: (
								<WebComponentButtonsRegister
									onClick={handleRegister}
									disabled={!canSubmit}
									registerUser={users.registerUser}
								/>
							),
							android: (
								<NativeComponentButtonsRegister
									onClick={handleRegister}
									disabled={!canSubmit}
									registerUser={users.registerUser}
								/>
							),
							ios: (
								<NativeComponentButtonsRegister
									onClick={handleRegister}
									disabled={!canSubmit}
									registerUser={users.registerUser}
								/>
							),
						})}
					</Column>
				</Section>
			</Scrollable>
		</>
	)
}
