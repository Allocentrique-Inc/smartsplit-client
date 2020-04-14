import React, { useState } from "react"
import {
	View,
	Platform,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native"
import Button from "../../widgets/button"
import ProgressBar from "../../widgets/progress-bar"
import { passwordBarColor, passwordProgress } from "./register"
import { Section, Column, Row, Group, Flex } from "../../layout"
import { Heading, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import zxcvbn from "zxcvbn"

export const WebComponentHeading = () => (
	<>
		<Heading level="1">Réinitialise ton mot de passe.</Heading>
	</>
)

export const NativeComponentHeading = () => (
	<Heading level="3">Réinitialise ton mot de passe.</Heading>
)

export default function PasswordReset() {
	const [Password, setPassword] = useState("")
	const [NewPassword, setNewPassword] = useState("")
	const [ConfirmNewPassword, setConfirmNewPassword] = useState("")
	const score = zxcvbn(Password)
		.score /* passer le mot de passe dans zxcvbn, valeur */
	const handleForgotPassword = () => history.push("/auth/forgot-password")

	return (
		<>
			<Section
				of="group"
				style={{
					width: 375,
					maxWidth: 560,
					alignSelf: "center",
					height: 350,
				}}
			>
				<Column of="group">
					{Platform.select({
						web: <WebComponentHeading />,
						android: <NativeComponentHeading />,
						ios: <NativeComponentHeading />,
					})}

					<PasswordField
						value={Password} //pour avoir toujours valeur mot de passe, reçoit valeur password
						onChangeText={setPassword} // quand changement mot de passe modifie valeur mise à jour
						label="Choisis ton nouveau mot de passe"
						placeholder=""
					/>

					<Row>
						<TouchableWithoutFeedback onPress={handleForgotPassword}>
							<Text link small>
								Mot de passe oublié ?
							</Text>
						</TouchableWithoutFeedback>
						<Flex />
						<ProgressBar
							value={NewPassword}
							onChangeText={setNewPassword}
							size="tiny"
							style={{ width: 150 }}
							color={passwordBarColor(score)}
							progress={passwordProgress(score)}
						/>
					</Row>
					<PasswordField
						value={ConfirmNewPassword}
						onChangeText={setConfirmNewPassword}
						label="Confirme ton nouveau  ton mot de passe"
						placeholder=""
					/>

					<Row>
						<Flex />
						<TouchableOpacity>
							{NewPassword !== ConfirmNewPassword ||
							NewPassword.length === 0 ||
							ConfirmNewPassword.length === 0 ? (
								<Button text="Réinitialiser" disabled={true} />
							) : (
								<Button text="Réinitialiser" />
							)}
						</TouchableOpacity>
					</Row>
				</Column>
			</Section>
		</>
	)
}
