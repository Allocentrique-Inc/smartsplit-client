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
import { observer } from "mobx-react"
import { useStores } from "../../mobX"

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

function AddLanguageDropdown({
	selection,
	onUnselect,
	onSelectionChange,
	onSelect,
	searchText,
	searchResults,
	...nextProps
}) {
	const { t, i18n } = useTranslation()
	const [language, setLanguage] = useState("")

	/* 	const firstStr = searchResults.indexOf()
	const lastStr = searchResults.lastIndexOf()

	const quotation =
		i18n.language == "en"
			? '"' + firstStr && lastStr + '"'
			: "« " + firstStr && lastStr + " »" */

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
	//console.log(nextProps)
	//console.log(i18n.language)
	return (
		<Column of="component">
			<Autocomplete
				alwaysShowAdd
				search={language}
				onSearcheChange={setLanguage}
				onSelect={onSelect}
				searchResults={searchResults}
				{...nextProps}
			>
				{nextProps.search.length && (
					<TouchableWithoutFeedback
						onPress={() => {
							onSelect(nextProps.search)
						}}
					>
						<Row of="component" padding="inside">
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
			{selection && selection.length > 0 && renderSelectedItems()}
		</Column>
	)
}

export default observer(AddLanguageDropdown)
