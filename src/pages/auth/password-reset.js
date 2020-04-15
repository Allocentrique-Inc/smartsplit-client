import React, { useState } from "react"
import {
	View,
	Platform,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import ProgressBar from "../../widgets/progress-bar"
import PublicNavBarWeb from "../../smartsplit/public/navbar-web"
import {
	passwordBarColor,
	passwordProgress,
	passwordStrengthIndicator,
} from "../auth/register"
import { Section, Column, Row, Group, Flex } from "../../layout"
import { Heading, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import zxcvbn from "zxcvbn"

export default function PasswordReset() {
	const [Password, setPassword] = useState("")
	const [NewPassword, setNewPassword] = useState("")
	const [ConfirmNewPassword, setConfirmNewPassword] = useState("")
	const score = zxcvbn(Password)
		.score /* passer le mot de passe dans zxcvbn, valeur */
	const handleForgotPassword = () => history.push("/auth/forgot-password")

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const openSessionButton = (
		<Button
			tertiary
			text="Ouvrir une session"
			onClick={() => history.push("/auth/login")}
		/>
	)

	return (
		<>
		<Scrollable>
			{Platform.OS === "web" && (
				<PublicNavBarWeb>
					<Text secondary>Déjà Membre ?</Text>
					{openSessionButton}
					<Button secondary text="English" />
				</PublicNavBarWeb>
					)}
		
		<Group
			of={Platform.OS === "web" ? "group" : "component"}
			style={
				Platform.OS === "web" && { maxWidth: 464, alignSelf: "center" }
				}
			>
			<Column of="section">
					<Heading level="1">Réinitialise ton mot de passe.</Heading>
			

					<Column of="inside">
						<PasswordField
							value={Password} //pour avoir toujours valeur mot de passe, reçoit valeur password
							onChangeText={setPassword} // quand changement mot de passe modifie valeur mise à jour
							label="Choisis ton nouveau mot de passe"
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
					</Column>
					</Column>	
						<PasswordField
							value={ConfirmNewPassword}
							onChangeText={setConfirmNewPassword}
							label="Confirme ton nouveau  ton mot de passe"
							placeholder=""
						/>
	
					<Row align="right">
						{NewPassword !== ConfirmNewPassword ||
						NewPassword.length === 0 ||
						ConfirmNewPassword.length === 0 ? (
							<Button 
								text="Réinitialiser" 
								disabled={true} 
								size={buttonSize}
								style={Platform.OS !== "web" && { flex: 1 }}
							/>
							) : (
							<Button 
								text="Réinitialiser" 
								size={buttonSize}
								style={Platform.OS !== "web" && { flex: 1 }}
						/>
							)}		
					</Row>
			
		</Group>
		</Scrollable>
		</>
	)
}
