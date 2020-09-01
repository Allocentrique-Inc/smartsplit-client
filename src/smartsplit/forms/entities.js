import { Form, TextField } from "../../forms"
import React, { forwardRef } from "react"
import objdiff from "object-diff"
import { Column, Spacer } from "../../layout"
import { useEntity } from "../../../redux/entities/hooks"
import { FormMode } from "../../utils/enums"
import { createEntity } from "../../../redux/entities/actions"
import { useDispatch, useSelector } from "react-redux"
import { Text } from "../../text"
import { useTranslation } from "react-i18next"
import { Tab, TabBar } from "../../widgets/tabs"
import { Metrics } from "../../theme"

export const EntitiesErrors = {
	list_not_found: "errors:listNotFound",
	list_entity_not_found: "error:entityNotFound",
	conflicting_list_entity: "errors:entityConflict",
}

export function EntityFields(props) {
	const { t } = useTranslation()
	const { entityType, mode, model } = props
	switch (entityType) {
		case "content-languages":
			return (
				<Column of="component">
					{mode === FormMode.creation && (
						<TextField name="entityId" label="ID" key="entityId" />
					)}
					<TabBar style={{ paddingTop: Metrics.spacing.medium }}>
						<Tab key="french" title={t("general:languages.fr")} default>
							<Spacer of="component" />
							<TextField
								name="nameFr"
								label={t("admin:entityAttributes.name")}
								key="nameFr"
							/>
						</Tab>
						<Tab key="english" title={t("general:languages.en")}>
							<Spacer of="component" />
							<TextField
								name="nameEn"
								label={t("admin:entityAttributes.name")}
								key="nameEn"
							/>
						</Tab>
					</TabBar>
				</Column>
			)

		default:
			return null
	}
}

function getDefaultValues(entityType) {
	switch (entityType) {
		case "content-languages":
			return {
				entityId: "",
				nameFr: "",
				nameEn: "",
			}
	}
}

export function getEmptyEntity(entityType) {
	switch (entityType) {
		case "content-languages":
			return {
				entity_id: "",
				name: {
					fr: "",
					en: "",
				},
			}
	}
}

function toFormValues(entity, entityType) {
	switch (entityType) {
		case "content-languages":
			return entity.state === "ready"
				? {
						entityId: entity.id,
						nameFr: entity.data.name.fr,
						nameEn: entity.data.name.en,
				  }
				: getDefaultValues(entityType)
		default:
			return {}
	}
}

function toEntityData(initData, diff, entityType) {
	let data = initData
	switch (entityType) {
		case "content-languages":
			if (diff.entityId) {
				data.entity_id = diff.entityId
			}
			if (diff.nameFr) {
				data.name.fr = diff.nameFr
			}
			if (diff.nameEn) {
				data.name.en = diff.nameEn
			}
			break
		default:
			break
	}
	return data
}

export const EntityForm = forwardRef((props, ref) => {
	const { entityId, entityType, onSubmit, mode } = props
	const entity = useEntity(
		entityId,
		entityId ? null : getEmptyEntity(entityType)
	)
	const initValues = toFormValues(entity, entityType)
	const dispatch = useDispatch()
	const error = useSelector((state) => state.entities.entityList.error)
	const errorMessage = error && (EntitiesErrors[error.code] || error.message)
	const { t } = useTranslation()

	async function handleSubmit(values) {
		const diff = objdiff(initValues, values)
		if (Object.keys(diff).length > 0) {
			const response =
				mode === FormMode.creation
					? await dispatch(
							createEntity(
								toEntityData(getEmptyEntity(entityType), diff, entityType),
								entityType
							)
					  )
					: await entity.update(toEntityData(entity.data, diff, entityType))
			response && onSubmit(response.status === 200 || response.status === 201)
		} else {
			onSubmit(false)
		}
	}

	return (
		<Form values={initValues} onSubmit={handleSubmit} ref={ref}>
			<Column
				of="component"
				style={{
					paddingTop: Metrics.spacing.medium,
					paddingBottom: Metrics.spacing.medium,
				}}
			>
				{errorMessage && <Text error>{t(errorMessage)}</Text>}
				<EntityFields entityType={entityType} mode={mode} />
			</Column>
		</Form>
	)
})
