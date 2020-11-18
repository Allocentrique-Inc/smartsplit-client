import React from "react"
import TextDropdown from "./text-dropdown"
import { Column, Layer, Row } from "../layout"
import { ScrollView, TouchableWithoutFeedback, StyleSheet } from "react-native"
import FormStyles from "../styles/forms"
import { Text } from "../text"
import { highlightMatchedStrings } from "../utils/utils"
import { mapFragmentChildren } from "../utils/react"
import PlusCircle from "../svg/plus-circle"
import { Colors } from "../theme"
import UserAvatar from "../smartsplit/user/avatar"
const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})
/**
 * Autocomplete is a versatile component that works with object patterns
 * with either a user_id with user fields
 * or a object with an id and a name
 * or a custom object for the list
 *
 * Props:
 *
 * @param onSelect {function} called when a selection is made
 * @param search {string} the search string
 * @param alwaysShowAdd {boolean} always show that add button
 * @param onSearchChange {function} a function to execute when the search changes
 * @param searchResults {Array<{user_id:string,firstName:string,lastName:string,artistName:string}>}
 * @param children {component | Array<component>} for custom add button
 * @param withAvatar {boolean} for user autocomplete. displays the avatar or initials
 * @return {*}
 * @constructor
 */
export default function Autocomplete({
	onSelect,
	search,
	alwaysShowAdd,
	onSearchChange = () => {},
	searchResults,
	children,
	withAvatar,
	...nextProps
}) {
	const renderSearchResults = () => {
		return (
			<>
				<ScrollView style={FormStyles.select_scroll}>
					{searchResults.length
						? searchResults.map((result, index) => (
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
										) : withAvatar ? (
											<Row key={result.id || result.user_id} padding={"none"}>
												<Column valign="center" align="center" padding={"tiny"}>
													<UserAvatar size="small" user={result} />
												</Column>
												<Column flex={1} padding="tiny">
													<Text bold>
														{highlightMatchedStrings(
															`${result.firstName} ${result.lastName} ${
																result.artistName
																	? ` (${result.artistName})`
																	: ""
															}`,
															search
														)}
													</Text>
												</Column>
											</Row>
										) : result.name ? (
											<Text>
												{mapFragmentChildren(
													highlightMatchedStrings(result.name, search),
													(child) => child
												)}
											</Text>
										) : result.firstName ? (
											<Text>
												{mapFragmentChildren(
													highlightMatchedStrings(
														`${result.firstName} ${result.lastName} ${
															result.artistName ? ` (${result.artistName})` : ""
														}`,
														search
													),
													(child) => child
												)}
											</Text>
										) : (
											result
										)}
									</Layer>
								</TouchableWithoutFeedback>
						  ))
						: null}
				</ScrollView>
				{(alwaysShowAdd || !searchResults.length) && children}
				{!children && (alwaysShowAdd || !searchResults.length) && (
					<TouchableWithoutFeedback
						onPress={() => {
							onSelect(search)
						}}
					>
						<Row of="component" padding="component" style={Styles.actionFrame}>
							<PlusCircle />
							<Text bold action>
								{/* To Do: Voir comment placer la traduction avec props entre guillemets */}
								Ajouter <Text bold>{search}</Text>
							</Text>
						</Row>
					</TouchableWithoutFeedback>
				)}
			</>
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
				<Layer layer="overground_moderate">{renderSearchResults()}</Layer>
			)}
		</TextDropdown>
	)
}
