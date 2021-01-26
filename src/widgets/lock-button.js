import React from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Lock from "../svg/lock"
import Unlock from "../svg/unlock"

export default function LockButton({ id, locked, disabled, onClick }) {
	const styles = StyleSheet.create({
		iconContainer: {
			cursor: disabled ? "not-allowed" : "pointer",
		},
	})
	return (
		<TouchableWithoutFeedback onPress={() => !disabled && onClick && onClick()}>
			<View style={styles.iconContainer}>{locked ? <Lock /> : <Unlock />}</View>
		</TouchableWithoutFeedback>
	)
}
