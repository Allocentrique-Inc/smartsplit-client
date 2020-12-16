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

export default observer(function AddBirthModal(props) {
	const { onRequestClose } = props
	const workpiece = props.workpiece
	const workpiece_id = workpiece.id
	const model: CertificateModel = props.model
	//console.dir(toJS(model.ids.value).find)
	const [rs, setRs] = useState("")
	const { t } = useTranslation()
	const icons = {
		c: <CircledC size={Metrics.size.small} />,
		p: <CircledP size={Metrics.size.small} />,
		star: <CircledStar size={Metrics.size.small} />,
	}
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
				{/**
				 * Below we filter options to exclude those already in our list
				 * model.ids.value is an array of {name:"org", value:"id"}
				 */}
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
