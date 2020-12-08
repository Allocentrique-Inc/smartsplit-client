import React, { useState } from "react"
import { Column, Row } from "../../layout"
import { View, StyleSheet } from "react-native"
import { Text } from "../../text"
import { Metrics } from "../../theme"
import { Tag } from "../../widgets/tag"
import { TextField, Dropdown } from "../../forms"
import Autocomplete from "../../forms/autocomplete"
import Search from "../../../assets/svg/search.svg"
import PlusCircle from "../../svg/plus-circle"
import ChevronDown from "../../svg/chevron-down"
import ArrowUp from "../../svg/chevron-up"
import { Field, FieldType } from "../../mobX/BaseModel"
import { action } from "mobx"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { useDocsModel } from "../../mobX/hooks"
import { useCurrentWorkpiece } from "../../pages/workpieces/context"
import TidalIcon from "../../svg/workpieces/tidal"
import LinkIcon from "../../svg/link"

const otherLinks = ["tidal"]

const otherIcons = {
	tidal: TidalIcon,
}

const AddPlatform = observer((props) => {
	const { t } = useTranslation()

	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id

	const model: DocStreamingModel = useDocsModel(workpieceId, "streaming")

	let { selection, onUnselect, onSelect, field, error, ...nextProps } = props
	if (field) {
		if (field.type !== FieldType.collection)
			throw new Error("Platform not on the list")
		label = t(field.label)
		error = t(field.error)
		selection = field.value
		onSelect = action((item) => {
			field.addItem(item.name, "")
		})
		onUnselect = action((item) => {
			let index = field.value.indexOf(item)
			field.value.splice(index, 1)
			//field.setValue([...field.value])
		})
	}
	const [search, setSearch] = useState("")

	return (
		<Column of="component">
			{otherLinks.map((name) => (
				<Autocomplete
					value={model.links[name]}
					onChangeText={(v) => {
						model.links.setItem(name, v)
					}}
					icon={PlusCircle}
					placeholder={t("document:links.addPlatform")}
					error={error}
					search={search}
					onSelect={onSelect}
					onSearchChange={setSearch}
					{...nextProps}
				/>
			))}
		</Column>
	)
})
export default AddPlatform

/* import React, { useState } from "react"
import Autocomplete from "../../forms/autocomplete"
import PlusCircle from "../../svg/plus-circle"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { useTranslation } from "react-i18next"
import EditModal from "../rightholders/edit-modal"
import { AddCollaboratorModal } from "../../pages/dashboard/collaborators"
import { useRightHolderSearch } from "../../appstate/react/right-holders"
import { TextDropdown } from "../../forms"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

export default function AddPlatformDropdown(props) {
	const { t } = useTranslation()
	const [terms, setTerms] = useState("")
	const results = useRightHolderSearch(terms)
	const { platform } = props
	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				{...props}
				searchResults={results.map(() => (
					<Row key={platform}>
						<Text>{platform}</Text>
					</Row>
				))}
				onSelect={(result) => props.onSelect(result.key)}
			>
				<TouchableWithoutFeedback>
					<Row of="component" padding="component" style={Styles.actionFrame}>
						<PlusCircle />
						<Text bold action>
							{t("document:links.createPlatform")}
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			</Autocomplete>
		</>
	)
}
 */
