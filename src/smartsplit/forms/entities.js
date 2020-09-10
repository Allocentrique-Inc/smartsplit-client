import TextField from "../../forms/text"
import React from "react"
import { Column, Spacer } from "../../layout"
import { FormMode } from "../../utils/enums"
import { Text } from "../../text"
import { useTranslation } from "react-i18next"
import { Tab, TabBar } from "../../widgets/tabs"
import { Metrics } from "../../theme"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"

export const EntitiesErrors = {
	list_not_found: "errors:listNotFound",
	list_entity_not_found: "error:entityNotFound",
	conflicting_list_entity: "errors:entityConflict",
}
/**
 * this is an example of a form which is built around an observable model (derived from BaseModel)
 * it is much simplified. In this case we are passed the model, but we could also just use
 * useStorePath.
 *
 * Note how the fields are bound to the model's field objects using the prop "field"
 *
 * @type {IReactComponent}
 */
export const EntityFields = /*observer(*/ (props) => {
	const { t } = useTranslation()
	const { entityType, mode, model } = props
	const { entity_id, name_en, name_fr } = model
	switch (entityType) {
		case "content-languages":
			return (
				<Column of="component">
					{mode === FormMode.creation && <TextField field={entity_id} />}
					<TabBar style={{ paddingTop: Metrics.spacing.medium }}>
						<Tab key="french" title={t("general:languages.fr")} default>
							<Spacer of="component" />
							<TextField field={name_fr} />
						</Tab>
						<Tab key="english" title={t("general:languages.en")}>
							<Spacer of="component" />
							<TextField field={name_en} />
						</Tab>
					</TabBar>
				</Column>
			)

		default:
			return null
	}
} /*)*/

/**
 * look how clean this code has become -- there is only model that is pulled from the mobx store
 * there is no need for a form, or any form ref, forward refs, etc. just clean clean clean
 * @type {IReactComponent}
 */
export const EntityForm = observer((props) => {
	const { entityType, mode } = props
	const model = useStorePath("admin", "entities", entityType, "model")
	const { t } = useTranslation()
	return (
		<Column
			of="component"
			style={{
				paddingTop: Metrics.spacing.medium,
				paddingBottom: Metrics.spacing.medium,
			}}
		>
			{model && model.error && <Text error>{t(model.error)}</Text>}
			{model ? (
				<EntityFields entityType={entityType} mode={mode} model={model} />
			) : null}
		</Column>
	)
})
