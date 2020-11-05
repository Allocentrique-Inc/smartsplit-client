import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Autocomplete from "../../forms/autocomplete"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row, Column, Layer } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import PlusCircle from "../../svg/plus-circle"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

export default function AddGenreDropdown({
	selection,
	onUnselect,
	onSelectionChange,
	onSelect,
	searchText,
	searchResults,
	...nextProps
}) {
	const { t } = useTranslation()
	const [genre, setGenre] = useState("")

	return (
		<Column of="component">
			<Autocomplete
				leftIcon={false}
				search={genre}
				onSearcheChange={setGenre}
				onSelect={onSelect}
				searchResults={searchResults}
				{...nextProps}
			>
				{!searchResults.length && (
					<TouchableWithoutFeedback
						onPress={() => {
							onSelect(nextProps.search)
						}}
					>
						<Row of="component" padding="component" style={Styles.actionFrame}>
							<PlusCircle />
							<Text bold action>
								{/* To Do: Voir comment placer la traduction avec props entre guillemets */}
								Ajouter <Text bold>{nextProps.search}</Text>
							</Text>
						</Row>
					</TouchableWithoutFeedback>
				)}
			</Autocomplete>
		</Column>
	)
}
