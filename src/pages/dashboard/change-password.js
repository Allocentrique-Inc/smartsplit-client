import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "react-native"
import { observer } from "mobx-react"
import { useStores } from "../../mobX"
import { useStorePath } from "../../appstate/react"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Column, Group, Flex } from "../../layout"
import { Form, FormSubmit, PasswordField } from "../../forms"
import { PasswordFieldWithScoreBar } from "../auth/register" // FIXME: mettre ça à une place qui fait plus de sens
import { Text } from "../../text"
import ProgressBar from "../../widgets/progress-bar"
import {
	passwordBarColor,
	passwordProgress,
	passwordStrengthIndicator,
} from "../auth/register"
import zxcvbn from "zxcvbn"
import { notEmptyValidator, sameValidator } from "../../../helpers/validators"

export default observer(function ChangePasswordModal({
	visible,
	onRequestClose,
}) {
	const { t } = useTranslation()

	const form = useRef()
	//const auth = useStorePath("auth")
	const { auth } = useStores()
	const [isLoading, setIsLoading] = useState(false)
	const [isValid, setIsValid] = useState(false)
	const [error, setError] = useState(null)

	const canSubmit = !isLoading && isValid

	/*const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [newPasswordRepeat, setNewPasswordRepeat] = useState("")
	const [newPasswordRepeatError, setNewPasswordRepeatError] = useState(null)

	const score = zxcvbn(newPassword).score

	const canSubmit = !isLoading && isValid
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
	const errorMessage = error && !currentPasswordError && error.message*/

	function close() {
		form.current.reset()
		onRequestClose()
	}

	function handleFormChange({
		currentPassword,
		newPassword,
		newPasswordRepeat,
	}) {
		setIsValid(
			notEmptyValidator(currentPassword) &&
				notEmptyValidator(newPassword) &&
				notEmptyValidator(newPasswordRepeat)
		)
	}

	function handleFormSubmit() {
		const fields = form.current.getFields()
		form.current.clearErrors()
		setError(null)

		if (
			!sameValidator(fields.newPassword.value, fields.newPasswordRepeat.value)
		) {
			fields.newPasswordRepeat.error = t("errors:samePasswords")
			return
		}

		setIsLoading(true)

		auth
			.changePassword(fields.currentPassword.value, fields.newPassword.value)
			.then(() => {
				form.current.reset()
				close()
			})
			.catch((e) => {
				if (e.code === "user_invalid_current_password") {
					fields.currentPassword.error = t("errors:invalidCurrentPassword")
				} else {
					setError(e)
				}
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<DialogModal
			visible={visible}
			onRequestClose={close}
			title={t("passwordIssues:changePassword")}
			buttons={
				<>
					<Button text={t("general:buttons.cancel")} tertiary onClick={close} />
					<Button
						text={t("general:buttons.save")}
						disabled={!canSubmit}
						onClick={() => form.current.submit()}
					/>
				</>
			}
		>
			<Form
				ref={form}
				values={{
					currentPassword: "",
					newPassword: "",
					newPasswordRepeat: "",
				}}
				onChange={handleFormChange}
				onSubmit={handleFormSubmit}
			>
				<Group
					of="group"
					style={
						Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }
					}
				>
					<PasswordField
						name="currentPassword"
						label={t("forms:labels.currentPassword")}
					/>

					<PasswordFieldWithScoreBar
						name="newPassword"
						label={t("forms:labels.newPassword")}
					/>

					<PasswordField
						name="newPasswordRepeat"
						label={t("forms:labels.repeatPassword")}
					/>

					{error && <Text error>{error.error || error.message}</Text>}
				</Group>
			</Form>
		</DialogModal>
	)
})
