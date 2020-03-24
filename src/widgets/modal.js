import React from "react"
import {
	Platform,
	View,
	ScrollView,
	StyleSheet
} from "react-native"

import { Overlay }           from "../portals"
import { Row, Column, Flex } from "../layout"
import { Heading }           from "../text"
import Button                from "./button"
import LayoutStyles          from "../styles/layout"
import LayerStyles           from "../styles/layers"
import MetricsStyles         from "../styles/metrics"
import { Metrics }           from "../theme"
import XIcon                 from "../svg/x"

export const ModalStyles = StyleSheet.create({
	background: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	},
	
	medium: {
		maxWidth: 624,
		minWidth: 280,
		borderRadius: Metrics.borderRadius.modals,
	},

	header: {
		height: Metrics.size.xlarge,
		paddingLeft: Metrics.spacing.group,
		paddingRight: Metrics.spacing.group,
		alignItems: "center",
		borderTopLeftRadius: Metrics.borderRadius.modals,
		borderTopRightRadius: Metrics.borderRadius.modals,
	},

	header_button: {
		marginRight: -Metrics.spacing.medium,
	},
	
	buttonBar: {
		borderBottomLeftRadius: Metrics.borderRadius.modals,
		borderBottomRightRadius: Metrics.borderRadius.modals,
	},
})

export class Modal extends React.PureComponent {
	render() {
		const { layer, children, ...nextProps } = this.props
		
		return <Overlay {...nextProps}>
			<View style={[
				LayoutStyles.centerContent,
				LayerStyles.modal_background,
				ModalStyles.background,
			]}>
				<View style={[
					LayerStyles[layer || "modal"],
					MetricsStyles.components.group,
				]}>
					{children}
				</View>
			</View>
		</Overlay>
	}
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
				style={ModalStyles.buttonBar}
			>
				{buttons}
			</Row>
		</Column>
	</Modal>
}

export default Modal
