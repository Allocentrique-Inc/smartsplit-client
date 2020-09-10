import React from "react"
import TextDropdown from "./text-dropdown"
import { Layer, Row } from "../layout"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import FormStyles from "../styles/forms"
import { Text } from "../text"
import { highlightMatchedStrings } from "../utils/utils"
import { mapFragmentChildren } from "../utils/react"

export default function Autocomplete({
	onSelect,
	search,
	onSearchChange = () => {},
	searchResults,
	children,
	...nextProps
}) {
	const renderSearchResults = () => {
		return (
			<ScrollView style={FormStyles.select_scroll}>
				{searchResults.map((result, index) => (
					<TouchableWithoutFeedback
						key={index}
						onPress={() => onSelect(result)}
					>
						<Layer padding="inside">
							{typeof result === "string" ? (
								<Text>
									{mapFragmentChildren(
										highlightMatchedStrings(result, search),
										(child) => child
									)}
								</Text>
							) : (
								result
							)}
						</Layer>
					</TouchableWithoutFeedback>
				))}
			</ScrollView>
		)
	}

	return (
		<TextDropdown
			leftIcon
			onBlur={() => onSearchChange("")}
			value={search}
			onChangeText={onSearchChange}
			{...nextProps}
		>
			{searchResults && (
				<Layer layer="overground_moderate">
					{renderSearchResults()}
					{children}
				</Layer>
			)}
		</TextDropdown>
	)
}
