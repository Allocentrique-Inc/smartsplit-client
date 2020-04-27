import React from "react"
import TextDropdown from "./text-dropdown"
import { Column, Layer, Row } from "../layout"
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native"
import FormStyles from "../styles/forms"
import { Text } from "../text"
import { Metrics } from "../theme"
import { Tag } from "../widgets/tag"

const SearchAndTagStyle = StyleSheet.create({
	tag_container: {
		paddingRight: -Metrics.size.small,
		paddingBottom: -Metrics.size.small,
	},
})

export function SearchAndTag(props) {
	const {
		onSelect,
		searchResults,
		selectedItems,
		onUnselect,
		searchInput,
		onSearchChange,
		...nextProps
	} = props

	function renderSearchResults() {
		return (
			<ScrollView style={FormStyles.select_scroll}>
				{searchResults.map((result) => (
					<TouchableWithoutFeedback
						key={result}
						onPress={() => onSelect(result)}
					>
						<Layer padding="inside">
							{typeof result === "string" ? <Text>{result}</Text> : result}
						</Layer>
					</TouchableWithoutFeedback>
				))}
			</ScrollView>
		)
	}

	function renderSelectedItems() {
		return (
			<Row of="none" wrap style={SearchAndTagStyle.tag_container}>
				{selectedItems.map((item) => (
					<Tag dismissible key={item} onClick={() => onUnselect(item)}>
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

	return (
		<Column of="component">
			<Row of="component">
				<TextDropdown
					search
					onBlur={() => onSearchChange("")}
					value={searchInput}
					onChangeText={(text) => onSearchChange(text)}
					{...nextProps}
				>
					{searchResults && (
						<Layer layer="overground_moderate">{renderSearchResults()}</Layer>
					)}
				</TextDropdown>
			</Row>
			{selectedItems && selectedItems.length > 0 && renderSelectedItems()}
		</Column>
	)
}
