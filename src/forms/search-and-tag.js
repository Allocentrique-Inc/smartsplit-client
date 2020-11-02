/* import React, { useState } from "react"
import { Column, Row } from "../layout"
import { View, StyleSheet } from "react-native"
import { Text } from "../text"
import { Metrics, Colors, Typography } from "../theme"
import { Tag } from "../widgets/tag"
import Autocomplete from "./autocomplete"
import Search from "../../assets/svg/search.svg"
import { Field, FieldType } from "../mobX/BaseModel"
import { action } from "mobx"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"

const Styles = StyleSheet.create({
	tag: {
		marginRight: Metrics.spacing.small,
		marginBottom: Metrics.spacing.small,
		color: Colors.action,
		fontWeight: Typography.Weight.bold,
	},
	tagContainer: {
		marginRight: -Metrics.spacing.small,
		marginBottom: -Metrics.spacing.small,
	},
})

<<<<<<< HEAD
const SearchAndTag = observer((props) => {
	const { t } = useTranslation()
	let {
		selection,
		onUnselect,
		onSelect,
		field,
		label,
		error,
		...nextProps
	} = props
	if (field) {
		if (field.type !== FieldType.collection)
			throw new Error(
				"Search and tag must be mapped to a field of type collection"
			)
		label = t(field.label)
		error = t(field.error)
		selection = field.value
		onSelect = action((item) => {
			field.add(item)
		})
		onUnselect = action((item) => {
			let index = field.value.indexOf(item)
			field.value.splice(index, 1)
			//field.setValue([...field.value])
		})
	}
=======
export default function SearchAndTag({
	selection,
	onUnselect,
	hideIcon,
	...nextProps
}) {
>>>>>>> feature/844-documente-ton-oeuvre-/infos-generales
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
<<<<<<< HEAD
				label={label}
				error={error}
				icon={Search}
=======
				icon={hideIcon ? null : Search}
>>>>>>> feature/844-documente-ton-oeuvre-/infos-generales
				search={search}
				onSelect={onSelect}
				onSearchChange={setSearch}
				{...nextProps}
			/>
			{selection && selection.length > 0 && renderSelectedItems()}
		</Column>
	)
})
export default SearchAndTag */
