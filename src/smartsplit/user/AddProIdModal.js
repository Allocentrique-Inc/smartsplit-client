import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useStorePath, useStores } from "../../mobX"
import { emailValidator, notEmptyValidator } from "../../../helpers/validators"
import { inviteNewUser } from "../../../api/users"
import { Column, Group, Row } from "../../layout"
import TextField from "../../forms/text"
import { CheckBoxGroup, CheckBoxGroupButton, SearchAndTag } from "../../forms"
import { DialogModal } from "../../widgets/modal"
import { Button } from "../../widgets/button"
import React from "react"
import IconDescriptionSelect from "../../forms/IconDescriptionSelect"
import {
	ProIds,
	ProIdIcons,
} from "../../mobX/models/settings/ProfessionalIdentityModel"
import CircledC from "../../svg/circled-c"
import CircledP from "../../svg/circled-p"
import CircledStar from "../../svg/circled-star"
import { Metrics } from "../../theme"

/**
 * Modal to select Professional Id from a list.
 */
export default observer(function AddProIdModal(props) {
	const model = useStorePath("settings", "profile", "identifiers")
	const { t } = useTranslation()
	const icons = {
		c: <CircledC size={Metrics.size.medium} />,
		p: <CircledP size={Metrics.size.medium} />,
		star: <CircledStar size={Metrics.size.medium} />,
	}
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("forms:addContributor")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={props.onRequestClose}
					/>
					<Button
						text={t("general:buttons.add")}
						onClick={props.onRequestClose}
					/>
				</>
			}
		>
			<Group>
				<IconDescriptionSelect
					options={ProIds.map((org) => ({
						name: t(`copyrightOrgs:name.${org}`),
						key: org,
						description: t(`copyrightOrgs:description.${org}`),
						title: t(`copyrightOrgs:action.${org}`),
						icon: icons[ProIdIcons[org]],
					}))}
				/>
			</Group>
		</DialogModal>
	)
})
