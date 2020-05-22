import { Form, TextField } from "../../forms"
import React, {forwardRef} from "react"
import { useSelector } from "react-redux"
import { useEntity } from "../../../redux/entities/hooks"
import objdiff from "object-diff"
import { Column } from "../../layout"
import init from "expo-cli/build/commands/init"

export const Modes = {
	creation: 0,
	edition: 1,
}


export const formFields = {
	"content-languages": mode => [
		<TextField
			name="entityId"
			label="ID"
			key="entityId"
			disabled={mode === Modes.edition}
			/>,
		<TextField
			name="nameFr"
			label={"Nom FR"}
			key="nameFr"
		/>,
		<TextField
			name="nameEn"
			label={"Name EN"}
			key="nameEn"
		/>
	]
}

export function extractFormValues(entity, entityType) {
	switch (entityType) {
		case "content-languages":
			return {
				entityId: (entity && entity.state === "ready") ? entity.id: "",
				nameFr: (entity && entity.state === "ready") ? entity.data.name.fr : "",
				nameEn: (entity && entity.state === "ready") ? entity.data.name.en : "",
			}
		default:
			return {}
	}
}

export const form = forwardRef((props, ref) => {
	const { entity, entityType, onSubmit, children } = props
	const initValues = extractFormValues(entity, entityType)
	return (
		entity.state === "ready" &&
		<Form values={initValues} onSubmit={(values) => onSubmit(objdiff(initValues, values))} ref={ref}>
			<Column of="group">
				{children}
			</Column>
		</Form>
	)
})

