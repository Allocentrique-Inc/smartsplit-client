import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useStorePath, useStores } from "../../mobX"
import { Column, Group, Row } from "../../layout"
import { DialogModal } from "../../widgets/modal"
import { Button } from "../../widgets/button"
import React, { useState } from "react"
import IconDescriptionSelect from "../../forms/IconDescriptionSelect"
import {
	ProIds,
	ProIdIcons,
} from "../../mobX/models/settings/ProfessionalIdentityModel"
import CircledC from "../../svg/circled-c"
import CircledP from "../../svg/circled-p"
import CircledStar from "../../svg/circled-star"
import { Metrics } from "../../theme"
import { toJS } from "mobx"
/**
 * Modal to select Professional Id from a list.
 */
export default observer(function AddProIdModal(props) {
	const { onRequestClose } = props
	const model = useStorePath("settings", "profile", "identifiers")
	console.dir(toJS(model.ids.value).find)
	const [selected, setSelected] = useState()
	const { t } = useTranslation()
	const icons = {
		c: <CircledC size={Metrics.size.small} />,
		p: <CircledP size={Metrics.size.small} />,
		star: <CircledStar size={Metrics.size.small} />,
	}
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={onRequestClose}
			noScroll={true}
			title={t("forms:addContributor")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={onRequestClose}
					/>
					<Button
						text={t("general:buttons.add")}
						onClick={() => {
							//check to see if it has already been added and if not add it
							// value is an array of {name:"org", value:"id"} check and see if selected
							if (!toJS(model.ids.value).find((v) => v.name === selected)) {
								model.ids.add({ name: selected, value: "" })
							}
							onRequestClose()
						}}
					/>
				</>
			}
		>
			<Group>
				{/**
				 * Below we filter options to exclude those already in our list
				 * model.ids.value is an array of {name:"org", value:"id"}
				 */}
				<IconDescriptionSelect
					options={ProIds.map((org) => ({
						name: t(`copyrightOrgs:name.${org}`),
						key: org,
						description: t(`copyrightOrgs:description.${org}`),
						title: t(`copyrightOrgs:action.${org}`),
						icon: icons[ProIdIcons[org]],
					}))}
					value={selected}
					onChange={(v) => {
						setSelected(v)
					}}
				/>
			</Group>
		</DialogModal>
	)
})
