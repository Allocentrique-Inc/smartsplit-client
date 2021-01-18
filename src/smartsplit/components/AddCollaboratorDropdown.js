import React, { useState, useEffect } from "react"
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
	const [results, setResults] = useState([])
	const getResults = useArtistAutocomplete()
	const handleSearchChange = async (text) => {
		setSearch(text)
		let response = await getResults(text, 10)
		setResults(response)
	}
	//console.log(search)
	// const searchResults = getResults(search, 10, ResultsOrder.collaboratorsFirst)
	// first we'll grab the in-house data we already have
	// as we do with the add Contributor dropdown

	// hack to unify entries from rightsholder api endpoint
	// @depredated
	// const rightsResults = useRightHolderSearch(search).map((result) => ({
	// 	...result,
	// 	user_id: result.rightHolder_id,
	// }))

	// const results = searchResults.concat(rightsResults).splice(0, 10)

	const fakeResults = [
		{
			rightHolder_id: "2d3f2a65-b3d5-48b1-845d-928bb4604700",
			firstName: "smarty",
			lastName: "pants",
			artistName: "smarties",
			user_id: "2d3f2a65-b3d5-48b1-845d-928bb4604700",
		},
		{
			rightHolder_id: "235556b5-3bbb-4c90-9411-4468d873969b",
			firstName: "Maxime",
			lastName: "Poulin",
			artistName: "Maximum Testing",
			user_id: "235556b5-3bbb-4c90-9411-4468d873969b",
		},
		{
			rightHolder_id: "3806034b-bd2a-4adb-b1e8-c9da0fcaf149",
			firstName: "marky",
			lastName: "mark",
			user_id: "3806034b-bd2a-4adb-b1e8-c9da0fcaf149",
		},
		{
			rightHolder_id: "a8481014-c1eb-4ddd-bd6a-32037e8b2c61",
			firstName: "My",
			lastName: "Sharona",
			artistName: "mama my",
			user_id: "a8481014-c1eb-4ddd-bd6a-32037e8b2c61",
		},
		{
			rightHolder_id: "a02cd7ec-4e3b-4302-ad8a-cc55805aa794",
			firstName: "Maxime",
			lastName: "Poulin",
			artistName: "Johnny",
			user_id: "a02cd7ec-4e3b-4302-ad8a-cc55805aa794",
		},
		{
			rightHolder_id: "7ebd0763-5519-4466-b74e-8b4c2492463a",
			firstName: "Mario",
			lastName: "Perron",
			user_id: "7ebd0763-5519-4466-b74e-8b4c2492463a",
		},
		{
			rightHolder_id: "58c917ee-30a3-407f-bb0e-80e8bd9c84a2",
			firstName: "mario",
			user_id: "58c917ee-30a3-407f-bb0e-80e8bd9c84a2",
		},
		{
			rightHolder_id: "13ac36c3-e2c2-41ec-ad07-34c4eed122ab",
			firstName: "marie-odile",
			user_id: "13ac36c3-e2c2-41ec-ad07-34c4eed122ab",
		},
		{
			rightHolder_id: "5a3db92e-af50-4b3a-961e-c3c3e247e8d0",
			firstName: "master",
			lastName: "mills",
			user_id: "5a3db92e-af50-4b3a-961e-c3c3e247e8d0",
		},
		{
			rightHolder_id: "1a23cb22-0728-48c4-8ec8-1ef0efa8893a",
			firstName: "mic",
			lastName: "mac",
			user_id: "1a23cb22-0728-48c4-8ec8-1ef0efa8893a",
		},
	]
	//useEffect(()=>{setResults()},[])
	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				placeholder={t("forms:labels.dropdowns.addCollaborator")}
				search={search}
				onSearchChange={handleSearchChange}
				{...nextProps}
				searchResults={results}
				onSelect={(result) => {
					onSelect(result)
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
