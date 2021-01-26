import React, { useState } from "react"
import { View, ScrollView, TouchableWithoutFeedback } from "react-native"
import Dropdown from "./dropdown"
import { Column, Hairline, Row, Spacer } from "../layout"
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
	const [open, setOpen] = useState(false)
	return (
		<Dropdown
			{...nextProps}
			placeholder={placeholder}
			onFocus={() => setOpen(true)}
			onBlur={() => setOpen(false)}
			open={open}
		>
			<ScrollView style={FormStyles.select_scroll}>
				<IconDescriptionSelectMenu
					options={options}
					onChange={(v) => {
						onChange(v)
						setOpen(false)
					}}
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
		title,
	} = props
	const { t } = useTranslation()
	function handleSelect() {
		onChange && onChange(itemKey)
	}

	return (
		<TouchableWithoutFeedback onPress={handleSelect}>
			<View
				style={[
					FormStyles.select_item_complex,
					selected && FormStyles.select_item_selected,
				]}
			>
				<Row>
					<Column valign="center">{icon}</Column>
					<Column>
						<Spacer of={"small"} />
					</Column>
					<Column flex={1}>
						<Row>
							<Text>{`${name}${title ? " - " + title : ""}`}</Text>
						</Row>
						<Row>
							<Text tertiary small>
								{description}
							</Text>
						</Row>
					</Column>
				</Row>
			</View>
		</TouchableWithoutFeedback>
	)
}

export function IconDescriptionItem(props) {
	const { icon, name, description, title } = props
	//console.log(typeof title)
	return (
		<Row flex={1} style={{ padding: Metrics.spacing.inside }}>
			<Column valign="center">{icon}</Column>
			<Column>
				<Spacer of={"small"} />
			</Column>
			<Column flex={1}>
				<Row>
					<Text>{`${name}${title ? " - " + title : ""}`}</Text>
				</Row>
				<Row>
					<Text tertiary small>
						{description}
					</Text>
				</Row>
			</Column>
		</Row>
	)
}
