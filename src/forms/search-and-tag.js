import React from "react"
import { Column, Row } from "../layout"
import { View, StyleSheet } from "react-native"
import { Text } from "../text"
import { Metrics } from "../theme"
import { Tag } from "../widgets/tag"
import Autocomplete from "./autocomplete"
import Search from "../../assets/svg/search.svg"

const SearchAndTagStyle = StyleSheet.create({
	tag_container: {
		paddingRight: -Metrics.size.small,
		paddingBottom: -Metrics.size.small,
	},
})

export function SearchAndTag({ selectedItems, onUnselect, ...nextProps }) {
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
			<Autocomplete icon={Search} {...nextProps} />
			{selectedItems && selectedItems.length > 0 && renderSelectedItems()}
		</Column>
	)
}
