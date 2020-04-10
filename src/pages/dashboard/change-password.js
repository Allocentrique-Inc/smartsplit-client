import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Section, Column, Row, Group, Flex } from "../../layout"
import { TextField, PasswordField, CheckBox } from "../../forms"
import { Text } from "../../text"
import ProgressBar from "../../widgets/progress-bar"
import {
	passwordBarColor,
	passwordProgress,
	passwordStrengthIndicator,
} from "../auth/register"
import zxcvbn from "zxcvbn"

export default function ChangePasswordModal() {
	const [modalOpen, setModal] = useState(true)
	const [Password, setPassword] = useState("")
	const [NewPassword, setNewPassword] = useState("")
	const [ConfirmNewPassword, setConfirmNewPassword] = useState("")
	const score = zxcvbn(Password)
		.score /* passer le mot de passe dans zxcvbn, valeur */

	return (
		<DialogModal
			visible={modalOpen}
			onRequestClose={() => setModal(false)}
			title="Changer le mot de passe"
			buttons={
				<>
					<TouchableOpacity>
						{NewPassword !== ConfirmNewPassword ||
						NewPassword.length === 0 ||
						ConfirmNewPassword.length === 0 ? (
							<Button
								style={{ width: 130 }}
								text="Enregister"
								disabled={true}
							/>
						) : (
							<Button text="Enregistrer" />
						)}
					</TouchableOpacity>
				</>
			}
		>
			<Group
				of="group"
				style={{ width: 375, maxWidth: 560, alignSelf: "center" }}
			>
				<Column of="group">
					<PasswordField
						value={Password} //pour avoir toujours valeur mot de passe, reçoit valeur password
						onChangeText={setPassword} // quand changement mot de passe modifie valeur mise à jour
						label="Mot de passe actuel"
						placeholder=""
					/>

					<PasswordField
						value={NewPassword}
						onChangeText={setNewPassword}
						label="Nouveau mot de passe"
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
						value={ConfirmNewPassword} //pour avoir toujours valeur mot de passe, reçoit valeur password
						onChangeText={setConfirmNewPassword} // quand changement mot de passe modifie valeur mise à jour
						label="Répète ton nouveau mot de passe"
						placeholder=""
					/>
				</Column>
			</Group>
		</DialogModal>
	)
}
