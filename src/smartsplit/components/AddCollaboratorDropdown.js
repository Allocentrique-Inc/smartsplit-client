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
import { ResultsOrder, useArtistAutocomplete } from "../../mobX/hooks"

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
	const getResults = useArtistAutocomplete()

	//console.log(search)
	const searchResults = getResults(search, 10, ResultsOrder.collaboratorsFirst)
	// first we'll grab the in-house data we already have
	// as we do with the add Contributor dropdown

	// hack to unify entries from rightsholder api endpoint
	// @depredated
	const rightsResults = useRightHolderSearch(search).map((result) => ({
		...result,
		user_id: result.rightHolder_id,
	}))

	const results = searchResults.concat(rightsResults).splice(0, 10)
	// console.log(results)

	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				placeholder={t("forms:labels.dropdowns.addCollaborator")}
				withAvatar
				search={search}
				onSearchChange={setSearch}
				{...nextProps}
				searchResults={results}
				onSelect={(result) => {
					onSelect(
						result.rightHolder_id ? result.rightHolder_id : result.user_id
					)
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
					//console.log(result)
					onSelect(result.user_id)
				}}
			/>
		</>
	)
})
export default AddCollaboratorDropdown
