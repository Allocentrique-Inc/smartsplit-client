import React from "react"
import { Platform, View, Modal as NativeModal, StyleSheet } from "react-native"
import WebModal from "modal-react-native-web"
import LayoutStyles from "../styles/layout"
import LayerStyles from "../styles/layers"

export const ModalImpl = Platform.select({
	web: WebModal,
	ios: NativeModal,
	android: NativeModal
})

export default function Modal(props) {
	const { layer, visible, ...nextProps } = props

	if(!visible)
		return null

	return <ModalImpl
		isVisible={visible}
		visible={visible}
		animationType="fade"
		transparent
		{...nextProps}
	>
		<View style={[
			LayoutStyles.centerContent,
			LayerStyles.modal_background
		]}>
			<View style={LayerStyles[layer || "modal"]}>
				{props.children}
			</View>
		</View>
	</ModalImpl>
}
