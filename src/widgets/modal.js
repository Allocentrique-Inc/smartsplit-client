import React from "react"
import {
	Platform,
	View,
	ScrollView,
	Modal as NativeModal,
	StyleSheet
} from "react-native"
import WebModal from "modal-react-native-web"

import { Row, Column, Flex } from "../layout"
import { Heading }           from "../text"
import Button                from "./button"
import LayoutStyles          from "../styles/layout"
import LayerStyles           from "../styles/layers"
import MetricsStyles         from "../styles/metrics"
import { Metrics }           from "../theme"
import XIcon                 from "../svg/x"

export const ModalImpl = Platform.select({
	web: WebModal,
	ios: NativeModal,
	android: NativeModal
})

export const ModalStyles = StyleSheet.create({
	medium: {
		maxWidth: 624,
		minWidth: 280,
	},

	header: {
		height: Metrics.size.xlarge,
		paddingLeft: Metrics.spacing.group,
		paddingRight: Metrics.spacing.group,
		alignItems: "center",
	},

	header_button: {
		marginRight: -Metrics.spacing.medium,
	},
})

export function Modal(props) {
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
			<View style={[
				LayerStyles[layer || "modal"],
				MetricsStyles.components.group,
			]}>
				{props.children}
			</View>
		</View>
	</ModalImpl>
}

export function DialogModal(props) {
	const { title, buttons, size, children, ...nextProps } = props

	return <Modal {...nextProps}>
		<Column style={ModalStyles[size || "medium"]}>
			<Row
				of="component"
				layer="overground_moderate"
				style={ModalStyles.header}
			>
				<Flex>
					<Heading level="4">{title}</Heading>
				</Flex>
				<Button
					small icon={<XIcon />}
					onClick={props.onRequestClose}
					style={ModalStyles.header_button}
				/>
			</Row>

			<ScrollView>{children}</ScrollView>

			<Row
				align="right"
				of="component"
				layer="overground_moderate"
				padding="component"
			>
				{buttons}
			</Row>
		</Column>
	</Modal>
}

export default Modal
