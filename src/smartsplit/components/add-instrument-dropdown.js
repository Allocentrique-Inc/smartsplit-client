import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { SearchAndTag } from "../../forms"
import Autocomplete from "../../forms/autocomplete"
import { Tag } from "../../widgets/tag"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row, Column, Layer } from "../../layout"
import { Text } from "../../text"
import { Colors, Metrics } from "../../theme"
import PlusCircle from "../../svg/plus-circle"

export default function AddInstrumentDropdown({
	selection,
	onUnselect,
	onSelectionChange,
	onSelect,
	searchText,
	searchResults,
	...nextProps
}) {
	const { t } = useTranslation()
	const [instrument, setInstrument] = useState("")
	console.log(nextProps)
	return (
		<Column of="component">
			<Autocomplete
				noIcon={true}
				search={instrument}
				onSearcheChange={setInstrument}
				onSelect={onSelect}
				searchResults={searchResults}
				{...nextProps}
			/>
			{!searchResults.length && (
				<TouchableWithoutFeedback
					onPress={() => {
						onSelect(nextProps.search)
					}}
				>
					<Row of="component" padding="inside">
						<PlusCircle />
						<Text bold action>
							Ajouter <Text bold>{nextProps.search}</Text> comme instrument
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			)}
			{selection && selection.length > 0 && renderSelectedItems()}
		</Column>
	)
}
