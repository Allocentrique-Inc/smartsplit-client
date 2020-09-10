import React from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "react-native"
import { observer } from "mobx-react"
import { useStores, useStorePath } from "../../mobX"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Group } from "../../layout"
import PasswordField from "../../forms/password"
import PasswordFieldWithScoreBar from "../../forms/PasswordFieldWithScoreBar"
import { Text } from "../../text"

const ChangePasswordModal = observer(({ visible, onRequestClose }) => {
	const { t } = useTranslation()
	const { auth } = useStores()
	const model = useStorePath("auth", "changePassModel")
	function close() {
		onRequestClose()
		model.init()
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
						disabled={model.busy}
						onClick={async () => {
							let result = await auth.doPasswordChange()
							if (result) close()
						}}
					/>
				</>
			}
		>
			<Group
				of="group"
				style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
			>
				<PasswordField field={model.currentPassword} />
				<PasswordFieldWithScoreBar field={model.password} />
				<PasswordField field={model.password2} />
				{model.saveError && (
					<Text error>
						{model.saveError?.error || model.saveError?.message}
					</Text>
				)}
			</Group>
		</DialogModal>
	)
})
export default ChangePasswordModal
