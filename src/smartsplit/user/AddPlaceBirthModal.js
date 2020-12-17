import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { Group } from "../../layout"
import { DialogModal } from "../../widgets/modal"
import { Button } from "../../widgets/button"
import React, { useState } from "react"
import CertificateModel from "../../mobX/models/workpieces/protect/CertificateModel"
import { useProtectModel } from "../../mobX/hooks"
import TextField from "../../forms/text"
import { Text } from "../../text"

export default observer(function AddPlaceBirthModal(props) {
	const { onRequestClose, workpieceId } = props
	const model: CertificateModel = useProtectModel(workpieceId, "certificate")
	console.log("model", model)
	const [rs, setRs] = useState("")
	const { t } = useTranslation()

	const handleChangeText = (val) => {
		setRs(val)
	}
	return (
		<DialogModal
			key="add-place-birth"
			size="medium"
			visible={props.visible}
			onRequestClose={onRequestClose}
			noScroll={true}
			title={t("protect:certificate:addPlaceBirth")}
			buttons={
				<>
					<Button
						text={t("general:buttons.add")}
						onClick={() => {
							model.addPlaceBirth = rs
							onRequestClose()
						}}
					/>
				</>
			}
		>
			<Group of="group">
				<TextField
					label={t("protect:certificate:addPlaceBirthModal", {
						name: `${model.listedBy.initialValue.firstName} ${model.listedBy.initialValue.lastName}`,
					})}
					onChangeText={handleChangeText}
					undertext={t("protect:certificate:addPlaceBirthUnderText")}
				/>
				{model.saveError && <Text error>{model.saveError}</Text>}
			</Group>
		</DialogModal>
	)
})
