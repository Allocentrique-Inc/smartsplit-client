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
import { connect } from "react-redux"
import * as UserActions from "../../../redux/Users/Actions"

export const ChangePasswordModal = connect(
	function mapStateToProps({ users }) {
		return {
			users,
		}
	},
	function mapDispatchToProps(dispatch) {
		return {
			passwordReset: function (details) {
				dispatch(UserActions.resetPassword(details))
			},
		}
	}
)
( props => {
	const {
		passwordReset
	} = props
	const [t] = useTranslation()

	const [currentPassword, setCurrentPassword] = useState("")
	const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)

	const [newPassword, setNewPassword] = useState("")
	const [errorNewPassword, setErrorNewPassword] = useState(null)

	const [newPasswordRepeat, setNewPasswordRepeat] = useState("")
	const [errorNewPasswordRepeat, setErrorNewPasswordRepeat] = useState(null)

	const score = zxcvbn(newPassword)
		.score /* passer le mot de passe dans zxcvbn, valeur */

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [canSubmit, setCanSubmit] = useState(false)

	useEffect(() => {
		setCanSubmit(!passwordReset.isLoading &&
			notEmptyValidator(currentPassword) &&
			notEmptyValidator(newPassword) &&
			sameValidator(newPassword, newPasswordRepeat)
		)
	}, [currentPassword, newPassword, newPasswordRepeat])

	const handleSubmit = () => {
		if (!canSubmit) return false
		passwordReset({ password: newPassword })
	}
/* 
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
	}, [state.data])  */

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t('passwordIssues:changePassword')}
			buttons={
				<>
					<Button
						text={t('general:buttons.cancel')}
						tertiary
						onClick={props.onRequestClose}
						size={buttonSize}
						style={Platform.OS !== "web" && { flex: 1 }}
					/>
					<Button
						text={t('general:buttons.save')}
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
					value={currentPassword} //pour avoir toujours valeur mot de passe, reçoit valeur password
					onChangeText={setCurrentPassword} // quand changement mot de passe modifie valeur mise à jour
					label={t('forms:labels.currentPassword')}
					placeholder=""
				/>

				<Column of="inside">
					<PasswordField
						value={newPassword}
						onChangeText={setNewPassword}
						label={t('forms:labels.newPassword')}
						placeholder=""
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
					label={t('forms:labels.repeatPassword')}
					placeholder=""
				/>
			</Group>
		</DialogModal>
	)
})

export default function ChangePasswordPage() {
	const [showModal, setModal] = useState(false)

	return (
		<>
			<Scrollable>
				<Button text="Test" 
						onClick={() => setModal(true)} 
					/>
				<ChangePasswordModal
					visible={showModal}
					onRequestClose={() => setModal(false)}
					// {...props}
				/>
			</Scrollable>
		</>
	)
}
