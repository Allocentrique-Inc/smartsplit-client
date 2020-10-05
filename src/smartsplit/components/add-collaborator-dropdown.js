import React, { useState } from "react"
import Autocomplete from "../../forms/autocomplete"
import PlusCircle from "../../svg/plus-circle"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { useTranslation } from "react-i18next"
import { useRightHolderSearch } from "../../appstate/react/right-holders"
import { AddCollaboratorModal } from "../collaborators/AddCollaboratorsModal"
import { useStores } from "../../mobX"
import { observer } from "mobx-react"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

const AddCollaboratorDropdown = observer(({ onSelect, ...nextProps }) => {
	// console.log(nextProps)
	const { t } = useTranslation()
	const { collaborators } = useStores()
	const [search, setSearch] = useState("")
	const results = useRightHolderSearch(search)
	// console.log(results)
	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				placeholder={t("rightSplits:dropdowns.addCollab")}
				search={search}
				onSearchChange={setSearch}
				{...nextProps}
				searchResults={results.map((rh) => (
					<Row key={rh.rightHolder_id}>
						<Text>
							{rh.firstName} {rh.lastName}
						</Text>
					</Row>
				))}
				onSelect={(result) => {
					onSelect(result.key)
				}}
			>
				<TouchableWithoutFeedback onPress={() => collaborators.new()}>
					<Row of="component" padding="component" style={Styles.actionFrame}>
						<PlusCircle />
						<Text bold action>
							{t("forms:labels.dropdowns.createCollaborator")}
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			</Autocomplete>
			<AddCollaboratorModal
				visible={collaborators.adding}
				onRequestClose={() => collaborators.cancel()}
				onAdded={(result) => {
					console.log(result)
					onSelect(result.user_id)
				}}
			/>
		</>
	)
})
export default AddCollaboratorDropdown
