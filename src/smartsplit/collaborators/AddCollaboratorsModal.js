import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useStorePath, useStores } from "../../mobX"
import { Column, Group, Row } from "../../layout"
import TextField from "../../forms/text"
import { CheckBoxGroup, CheckBoxGroupButton, SearchAndTag } from "../../forms"
import { DialogModal } from "../../widgets/modal"
import { Button } from "../../widgets/button"
import React from "react"
import { Text } from "../../text"

/**
 * Collaborator Form
 * TODO: REFACTOR TO REUSE CONTRIBUTOR FORM WITH ADDITIONAL EMAIL FIELD
 * @type {function(): *}
 */
export const CollaboratorForm = observer(() => {
	const { t } = useTranslation()
	const model = useStorePath("collaborators", "model")
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
				label={t("forms:labels.defaultRoles")}
				undertext={t("forms:undertexts.defaultRoles")}
			>
				{t("forms:options.defaultRoles").map((role) => (
					<CheckBoxGroupButton
						value={role.value}
						key={role.value}
						label={role.label}
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
				{model.saveError && (
					<Row>
						<Text error>{model.saveError}</Text>
					</Row>
				)}
			</Group>
		</DialogModal>
	)
}
