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
 *
 * These models are self contained view models which do validation, they contain the label, the value, error messages
 * You will note the following:
 * - the <Form> element is missing as is all the complex use of the state and context
 *   only the store and the model remains
 * - we no longer use the form ref or the need for forward refs at all
 * - the TextField we are using is no longer wrapped, this we can expose all the props that
 *   we use to respond to change, indicate error, and the field value. the result is that the
 *   form is much declarative -- you can clearly see how each UI form element is plugged into
 *   a specific field of the model
 *
 * If you go and examine the model, you will also see the extent to which the model is declarative
 * and contain information about the field, whether it's required, additional validators, formatters,
 * and presubmit transforms, as well as asyncValidation that allows for server side calls for uniqueness
 * and other checks
 *
 * In addition the models effect the transition back and forth from structured data to the flat
 * data the model uses
 *
 * @type {IReactComponent}
 */
export const EntityFields = observer((props) => {
	const { t } = useTranslation()
	const { entityType, mode, model } = props
	switch (entityType) {
		case "content-languages":
			return (
				<Column of="component">
					{mode === FormMode.creation && <TextField field={model.entity_id} />}
					<TabBar style={{ paddingTop: Metrics.spacing.medium }}>
						<Tab key="french" title={t("general:languages.fr")} default>
							<Spacer of="component" />
							<TextField field={model.name_fr} />
						</Tab>
						<Tab key="english" title={t("general:languages.en")}>
							<Spacer of="component" />
							<TextField field={model.name_en} />
						</Tab>
					</TabBar>
				</Column>
			)

		default:
			return null
	}
})

/**
 * look how clean this code has become -- there is only model that is pulled from the mobx store
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
