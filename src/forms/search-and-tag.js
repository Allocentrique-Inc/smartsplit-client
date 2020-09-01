import React, { useState } from "react"
import { Column, Row } from "../layout"
import { View, StyleSheet } from "react-native"
import { Text } from "../text"
import { Metrics } from "../theme"
import { Tag } from "../widgets/tag"
import Autocomplete from "./autocomplete"
import Search from "../../assets/svg/search.svg"

const Styles = StyleSheet.create({
	tag: {
		marginRight: Metrics.spacing.small,
		marginBottom: Metrics.spacing.small,
	},
	tagContainer: {
		marginRight: -Metrics.spacing.small,
		marginBottom: -Metrics.spacing.small,
	},
})

export default function SearchAndTag({
	selection,
	onUnselect,
	hideIcon,
	...nextProps
}) {
	const [search, setSearch] = useState("")
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
	return (
		<Column of="component">
			<Autocomplete
				icon={hideIcon ? null : Search}
				search={search}
				onSearchChange={setSearch}
				{...nextProps}
			/>
			{selection && selection.length > 0 && renderSelectedItems()}
		</Column>
	)
}
