import React from "react"
import { useTranslation } from "react-i18next"
import { Row } from "../../layout"
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native"
import Trash from "../../svg/trash"
import Pen from "../../svg/pen"
import PlusCircle from "../../svg/plus-circle"
import Button from "../../widgets/button"
import { Colors } from "../../theme"
import CheckMark from "../../svg/check-mark"

export const Styles = StyleSheet.create({
	menu_container: {
		flex: 1,
		justifyContent: "flex-end",
	},
})

export function AdminListMenu(props) {
	const { children, disabled, ...nextProps } = props
	return (
		<Row
			of="component"
			valign="center"
			wrap
			style={[
				Styles.menu_container,
				{
					opacity: disabled ? 0 : 1,
				},
			]}
			{...nextProps}
		>
			{children}
		</Row>
	)
}

export function SimpleMenu(props) {
	const { disabled, onModify, onDelete } = props
	return (
		<AdminListMenu disabled={disabled}>
			<TouchableWithoutFeedback onPress={onModify} disabled={disabled}>
				<View>
					<Pen />
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={onDelete} disabled={disabled}>
				<View>
					<Trash />
				</View>
			</TouchableWithoutFeedback>
		</AdminListMenu>
	)
}

export function DefaultMenu(props) {
	const { disabled, onAdd, onModify, onDelete } = props
	return (
		<AdminListMenu disabled={disabled}>
			<TouchableWithoutFeedback onPress={onDelete} disabled={disabled}>
				<View>
					<Trash />
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={onModify} disabled={disabled}>
				<View>
					<Pen />
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={onAdd} disabled={disabled}>
				<View>
					<PlusCircle />
				</View>
			</TouchableWithoutFeedback>
		</AdminListMenu>
	)
}

export function PendingMenu(props) {
	const { t } = useTranslation()
	const { disabled, onAccept, onModify, onRefuse } = props
	return (
		<AdminListMenu disabled={disabled}>
			<TouchableWithoutFeedback onPress={onModify} disabled={disabled}>
				<View>
					<Pen />
				</View>
			</TouchableWithoutFeedback>
			<Button
				deactivate={disabled}
				dangerWithIcon
				icon={<Trash color={Colors.error} />}
				text={t("general:buttons.toRefuse")}
				onClick={onRefuse}
			/>
			<Button
				deactivate={disabled}
				secondaryWithIcon
				bold
				icon={<CheckMark color={Colors.action} />}
				text={t("general:buttons.toAccept")}
				onClick={onAccept}
			/>
		</AdminListMenu>
	)
}
