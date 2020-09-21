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

export const CollaboratorForm = observer(() => {
	const { t } = useTranslation()
	const model = useStorePath("collaborators", "model")
	//const form = formRef || useRef()
	const searchResults = ["Aut", "Chose", "Comme", "Resultat"]
	return (
		<Column of="group">
			<Row of="component">
				<TextField field={model.firstName} />
				<TextField field={model.lastName} />
			</Row>
			<TextField
				field={model.artistName}
				label_hint={t("forms:labels.optional")}
				undertext={t("forms:undertexts.artistName")}
				undertext_lines={1}
			/>
			<TextField
				field={model.email}
				placeholder={t("forms:placeholders.emailExample")}
			/>
			<SearchAndTag field={model.groups} searchResults={searchResults} />
			<CheckBoxGroup
				field={model.defaultRoles}
				name="roles"
				label={t("forms:labels.defaultRoles")}
				undertext={t("forms:undertexts.defaultRoles")}
			>
				{t("forms:options.defaultRoles").map((role) => (
					<CheckBoxGroupButton
						value={role.value}
						key={role.value}
						label={role.displayValue}
					/>
				))}
			</CheckBoxGroup>
		</Column>
	)
})

export function AddCollaboratorModal(props) {
	const model = useStorePath("collaborators", "model")
	const { collaborators } = useStores()
	const { t } = useTranslation()
	//const form = useRef()
	//const submit = () => form.current.submit()
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("forms:addCollabArtist")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={props.onRequestClose}
					/>
					<Button
						text={t("general:buttons.save")}
						onClick={async () => {
							let result = await collaborators.submit()
							if (result) {
								props.onAdded(result)
								props.onRequestClose()
							}
						}}
					/>
				</>
			}
		>
			<Group>
				<CollaboratorForm />
			</Group>
		</DialogModal>
	)
}
