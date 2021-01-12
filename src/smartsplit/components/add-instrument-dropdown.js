import React, { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import Autocomplete from "../../forms/autocomplete"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row, Column, Layer, Spacer } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import PlusCircle from "../../svg/plus-circle"
import InstrumentList from "../../data/instruments-smartsplit"
import { searchEntities } from "../../../api/entities"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

export default function AddInstrumentDropdown({
	selection,
	hideEmpty,
	onUnselect,
	onSelectionChange,
	onSelect,
	searchText,
	...nextProps
}) {
	const { t } = useTranslation()
	const [search, setSearch] = useState(selection ? selection.name : "")
	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState([])
	/*let searchResults = [
		...InstrumentList.filter((instr) =>
			new RegExp(instrument, "i").test(instr.name)
		).splice(0, 10),
	]*/

	async function getSearchResults(search) {
		setLoading(true)
		let list = await searchEntities("instruments", search)
		setResults(list)
		setLoading(false)
	}
	//if (selection) setResults([{ name: "remove instrument", id: "" }, ...results])
	if (!selection && hideEmpty) return null
	else
		return (
			<Column>
				<Autocomplete
					leftIcon={false}
					search={search}
					loading={loading}
					onSearchChange={(text) => {
						setSearch(text)
						getSearchResults(text)
					}}
					onSelect={(selection) => {
						if (selection.id === "") onUnselect()
						else onSelect(selection)
					}}
					searchResults={results}
					{...nextProps}
				>
					{search.length && (
						<TouchableWithoutFeedback
							onPress={() => {
								onSelect(nextProps.search)
							}}
						>
							<Row
								of="component"
								padding="component"
								style={Styles.actionFrame}
							>
								<PlusCircle />
								<Text bold action>
									{/* clé de traduction : document:performance.addInstrumentDropdown */}
									Ajouter <Text bold>{nextProps.search}</Text> comme instrument
								</Text>
							</Row>
						</TouchableWithoutFeedback>
					)}
				</Autocomplete>
				<Spacer of="inside" />
			</Column>
		)
}
