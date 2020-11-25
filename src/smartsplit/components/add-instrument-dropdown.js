import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Autocomplete from "../../forms/autocomplete"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row, Column, Layer } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import PlusCircle from "../../svg/plus-circle"
import InstrumentList from "../../../assets/data/instruments-smartsplit"
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
	const [instrument, setInstrument] = useState(selection ? selection.name : "")
	let searchResults = [
		...InstrumentList.filter((instr) =>
			new RegExp(instrument, "i").test(instr.name)
		).splice(0, 10),
	]
	if (selection)
		searchResults = [{ name: "remove instrument", id: "" }, ...searchResults]
	if (!selection && hideEmpty) return null
	else
		return (
			<Column of="component">
				<Autocomplete
					leftIcon={false}
					search={instrument}
					onSearchChange={setInstrument}
					onSelect={(selection) => {
						if (selection.id === "") onUnselect()
						else onSelect(selection)
					}}
					searchResults={searchResults}
					{...nextProps}
				>
					{!searchResults.length && (
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
			</Column>
		)
}
