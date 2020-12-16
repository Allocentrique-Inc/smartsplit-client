import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useStorePath } from "../../mobX"
import { Group } from "../../layout"
import { DialogModal } from "../../widgets/modal"
import { Button } from "../../widgets/button"
import React, { useState } from "react"
import IconDescriptionSelect, {
	IconDescriptionItem,
} from "../../forms/IconDescriptionSelect"
import {
	ProIds,
	ProIdIcons,
} from "../../mobX/models/settings/ProfessionalIdentityModel"
import CircledC from "../../svg/circled-c"
import CircledP from "../../svg/circled-p"
import CircledStar from "../../svg/circled-star"
import { Metrics } from "../../theme"
import { observe, toJS, values } from "mobx"
import CertificateModel from "../../mobX/models/workpieces/protect/CertificateModel"
import { useProtectModel } from "../../mobX/hooks"
import { useCurrentWorkpiece } from "../../pages/workpieces/context"
import TextField from "../../forms/text"
import { Heading, Text } from "../../text"
import { DateField } from "../../forms"

export default observer(function AddPlaceBirthModal(props) {
	const { onRequestClose } = props
	const workpiece = props.workpiece
	const workpiece_id = workpiece.id
	const model: CertificateModel = useProtectModel(workpiece_id, "certificate")
	console.log("model", model)
	//console.dir(toJS(model.ids.value).find)
	const [rs, setRs] = useState("")
	const { t } = useTranslation()
	const icons = {
		c: <CircledC size={Metrics.size.small} />,
		p: <CircledP size={Metrics.size.small} />,
		star: <CircledStar size={Metrics.size.small} />,
	}

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
