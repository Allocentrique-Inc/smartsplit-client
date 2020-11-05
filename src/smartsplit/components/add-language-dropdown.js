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

const Styles = StyleSheet.create({
	tag: {
		marginRight: Metrics.spacing.small,
		marginBottom: Metrics.spacing.small,
	},
	tagContainer: {
		marginRight: -Metrics.spacing.small,
		marginBottom: -Metrics.spacing.small,
	},
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

export default function AddLanguageDropdown({
	selection,
	onUnselect,
	onSelectionChange,
	onSelect,
	searchText,
	searchResults,
	...nextProps
}) {
	const { t } = useTranslation()
	const [language, setLanguage] = useState("")

	const renderSelectedItems = () => {
		return (
			<Row wrap style={Styles.tagContainer}>
				{selection.map((item) => (
					<Tag
						dismissible
						key={item}
						onClick={() => onUnselect(item)}
						style={Styles.tag}
					>
						{typeof item === "string" ? (
							<Text>{item}</Text>
						) : (
							<View>{item}</View>
						)}
					</Tag>
				))}
			</Row>
		)
	}
	console.log(nextProps)
	return (
		<Column of="component">
			<Autocomplete
				search={language}
				onSearcheChange={setLanguage}
				onSelect={onSelect}
				searchResults={searchResults}
				{...nextProps}
			/>
			{searchResults.length === 0 && (
				<TouchableWithoutFeedback
					onPress={() => {
						onSelect(nextProps.search)
					}}
				>
					<Row of="component" padding="inside">
						<PlusCircle />
						<Text bold action>
							Ajouter <Text bold>{nextProps.search}</Text>
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			)}
			{selection && selection.length > 0 && renderSelectedItems()}
		</Column>
	)
}
