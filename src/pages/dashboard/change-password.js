import React, { useState, useEffect } from "react"
import { TouchableOpacity, Platform } from "react-native"
import { DialogModal } from "../../widgets/modal"
import { Modal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Section, Column, Row, Group, Flex } from "../../layout"
import { TextField, PasswordField, CheckBox } from "../../forms"
import { Text } from "../../text"
import ProgressBar from "../../widgets/progress-bar"
import Scrollable from "../../widgets/scrollable"
import {
	passwordBarColor,
	passwordProgress,
	passwordStrengthIndicator,
} from "../auth/register"
import zxcvbn from "zxcvbn"
import { notEmptyValidator, sameValidator } from "../../../helpers/validators"

export function ChangePasswordModal({ state, changePassword, ...props }) {
	const [Password, setPassword] = useState("")
	const [NewPassword, setNewPassword] = useState("")
	const [ConfirmNewPassword, setConfirmNewPassword] = useState("")
	const [canSubmit, setCanSubmit] = useState(false)
	const score = zxcvbn(Password)
		.score /* passer le mot de passe dans zxcvbn, valeur */

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const handleSubmit = () => {
		if (!canSubmit) return false
		changePassword({ password: NewPassword })
	}

	useEffect(() => {
		let currentPasswordValid = notEmptyValidator(Password)
		let newPasswordsValid =
			notEmptyValidator(NewPassword) &&
			notEmptyValidator(ConfirmNewPassword) &&
			sameValidator(NewPassword, ConfirmNewPassword)

		if (currentPasswordValid && newPasswordsValid && !state.isLoading) {
			setCanSubmit(true)
		} else {
			setCanSubmit(false)
		}
	}, [Password, NewPassword, ConfirmNewPassword, state.isLoading])

	useEffect(() => {
		if (state.data && !state.isLoading) {
			props.onRequestClose()
		}
	}, [state.data])

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title="Changer le mot de passe"
			buttons={
				<>
					<Button
						text="Annuler"
						tertiary
						onClick={props.onRequestClose}
						size={buttonSize}
						style={Platform.OS !== "web" && { flex: 1 }}
					/>
					<Button
						text="Sauvegarder"
						disabled={!canSubmit}
						onClick={handleSubmit}
						size={buttonSize}
						style={Platform.OS !== "web" && { flex: 1 }}
					/>
				</>
			}
		>
			<Group
				of="group"
				style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
			>
				<PasswordField
					value={Password} //pour avoir toujours valeur mot de passe, reçoit valeur password
					onChangeText={setPassword} // quand changement mot de passe modifie valeur mise à jour
					label="Mot de passe actuel"
					placeholder=""
				/>

				<Column of="inside">
					<PasswordField
						value={NewPassword}
						onChangeText={setNewPassword}
						label="Nouveau mot de passe"
						placeholder=""
					/>

					<Row>
						<Text secondary small>
							{passwordStrengthIndicator(score)}
						</Text>
						<Flex />
						<ProgressBar
							size="tiny"
							color={passwordBarColor(score)}
							progress={passwordProgress(score)}
						/>
					</Row>
				</Column>

				<PasswordField
					value={ConfirmNewPassword} //pour avoir toujours valeur mot de passe, reçoit valeur password
					onChangeText={setConfirmNewPassword} // quand changement mot de passe modifie valeur mise à jour
					label="Répète ton nouveau mot de passe"
					placeholder=""
				/>
			</Group>
		</DialogModal>
	)
}

export function ChangePasswordPage(props) {
	const [showModal, setModal] = useState(false)
	return (
		<>
			<Scrollable>
				<Button text="Test" onClick={() => setModal(true)} />
				<ChangePasswordModal
					visible={showModal}
					onRequestClose={() => setModal(false)}
					{...props}
				/>
			</Scrollable>
		</>
	)
}
