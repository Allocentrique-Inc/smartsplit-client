import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { Group } from "../../layout"
import { DialogModal } from "../../widgets/modal"
import { Button } from "../../widgets/button"
import React, { useState } from "react"
import CertificateModel from "../../mobX/models/workpieces/protect/CertificateModel"
import TextField from "../../forms/text"
import { Text } from "../../text"

export default observer(function AddBirthModal(props) {
	const { onRequestClose } = props
	const model: CertificateModel = props.model
	const [rs, setRs] = useState("")
	const { t } = useTranslation()
	const user = model.listedBy.initialValue
	const handleChangeText = (val) => {
		setRs(val)
	}

	return (
		<DialogModal
			key="add-birth"
			size="medium"
			visible={props.visible}
			onRequestClose={onRequestClose}
			noScroll={true}
			title={t("protect:certificate:addBirth")}
			buttons={
				<>
					<Button
						text={t("general:buttons.add")}
						onClick={() => {
							model.addBirth = rs
							onRequestClose()
						}}
					/>
				</>
			}
		>
			<Group of="group">
				<TextField
					label={t("protect:certificate:addBirthFieldTitle", {
						name: `${user.firstName} ${user.lastName}`,
					})}
					onChangeText={handleChangeText}
					undertext={t("protect:certificate:addBirthUnderText")}
					placeholder={"YYYY-MM-DD"}
				/>
				{model.saveError && <Text error>{model.saveError}</Text>}
			</Group>
		</DialogModal>
	)
})
