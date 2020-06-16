import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
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
import { resetPassword } from "../../../redux/users/actions"

export default function ChangePasswordModal(props) {
	const { isLoading, data, error } = {} // FIXME: without redux

	const [t] = useTranslation()
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [newPasswordRepeat, setNewPasswordRepeat] = useState("")
	const [newPasswordRepeatError, setNewPasswordRepeatError] = useState(null)

	const score = zxcvbn(newPassword).score

	const canSubmit =
		!isLoading && currentPassword && newPassword && newPasswordRepeat

	const handleSubmit = () => {
		if (newPassword !== newPasswordRepeat) {
			setNewPasswordRepeatError(t("errors:samePasswords"))
		} else {
			setNewPasswordRepeatError(null)

			dispatch(
				resetPassword({
					currentPassword: currentPassword,
					password: newPassword,
				})
			)
		}
	}

	const currentPasswordError =
		error &&
		error.code === "user_invalid_current_password" &&
		t("errors:invalidCurrentPassword")
	const errorMessage = error && !currentPasswordError && error.message

	useEffect(() => {
		if (data && props.onRequestClose) {
			props.onRequestClose()
		}
	}, [data, props.onRequestClose])

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("passwordIssues:changePassword")}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={props.onRequestClose}
					/>
					<Button
						text={t("general:buttons.save")}
						disabled={!canSubmit}
						onClick={handleSubmit}
					/>
				</>
			}
		>
			<Group
				of="group"
				style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
			>
				<PasswordField
					value={currentPassword} //pour avoir toujours valeur mot de passe, reçoit valeur password
					onChangeText={setCurrentPassword} // quand changement mot de passe modifie valeur mise à jour
					label={t("forms:labels.currentPassword")}
					error={currentPasswordError}
				/>

				<Column of="inside">
					<PasswordField
						value={newPassword}
						onChangeText={setNewPassword}
						label={t("forms:labels.newPassword")}
					/>

					<Row>
						<Text secondary small>
							{t(passwordStrengthIndicator(score))}
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
					value={newPasswordRepeat} //pour avoir toujours valeur mot de passe, reçoit valeur password
					onChangeText={setNewPasswordRepeat} // quand changement mot de passe modifie valeur mise à jour
					label={t("forms:labels.repeatPassword")}
					error={newPasswordRepeatError}
				/>

				{errorMessage && <Text error>{errorMessage}</Text>}
			</Group>
		</DialogModal>
	)
}
