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

export default function AddSecondaryGenreDropdown({
	selection,
	onUnselect,
	onSelectionChange,
	onSelect,
	searchText,
	searchResults,
	...nextProps
}) {
	const { t, i18n } = useTranslation()
	const [secondaryGenre, setSecondaryGenre] = useState("")

	const quotation = i18n.language === "en" ? '"' : "« "
	const quotationEnd = i18n.language === "en" ? '"' : " »"

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
				alwaysShowAdd
				leftIcon={false}
				search={secondaryGenre}
				onSearcheChange={setSecondaryGenre}
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
								{t("document:add")}
								{nextProps.search ? quotation : null}
								{nextProps.search}
								{nextProps.search ? quotationEnd : null}
							</Text>
						</Row>
					</TouchableWithoutFeedback>
				)}
			</Autocomplete>
		</Column>
	)
}
