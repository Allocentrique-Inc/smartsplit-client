import React from "react"
import { View, ScrollView, TouchableWithoutFeedback } from "react-native"
import Dropdown from "./dropdown"
import { Column, Hairline, Row } from "../layout"
import { Text } from "../text"
import FormStyles from "../styles/forms"
import { observer } from "mobx-react"
import { Colors, Metrics } from "../theme"
import { CollapsableList } from "../widgets/list"
import { useTranslation } from "react-i18next"
export default observer(function IconDescriptionDropdown(props) {
	const {
		placeholder,
		value,
		initialValue,
		options,
		onChange,
		children,
		...nextProps
	} = props
	return (
		<Dropdown {...nextProps} placeholder={placeholder}>
			<ScrollView style={FormStyles.select_scroll}>
				<IconDescriptionSelectMenu
					options={options}
					onChange={onChange}
					value={value}
				/>
			</ScrollView>
		</Dropdown>
	)
})
export function IconDescriptionSelectMenu(props) {
	return (
		<Column style={FormStyles.select_menu}>
			{props.options.map((option) => (
				<IconDescriptionSelectItem
					{...option}
					onChange={props.onChange}
					selected={option.key === props.value}
					itemKey={option.key}
				/>
			))}
		</Column>
	)
}

export function IconDescriptionSelectItem(props) {
	const {
		itemKey,
		value,
		selected,
		onChange,
		icon,
		name,
		description,
		action,
	} = props
	const { t } = useTranslation()
	function handleSelect() {
		onChange && onChange(itemKey)
	}

	return (
		<TouchableWithoutFeedback onPress={handleSelect}>
			<View
				style={[
					FormStyles.select_item,
					selected && FormStyles.select_item_selected,
				]}
			>
				<Row>
					<Column>{icon}</Column>
					<Column flex={1}>
						<Row>
							<Text>{`${name} - ${action}`}</Text>
						</Row>
						<Row>
							<Text secondary>{description}</Text>
						</Row>
					</Column>
				</Row>
			</View>
		</TouchableWithoutFeedback>
	)
}
