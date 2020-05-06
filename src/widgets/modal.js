import React from "react"
import { Platform, View, StyleSheet } from "react-native"

import { Overlay } from "../portals"
import { Row, Column, Flex } from "../layout"
import { Heading } from "../text"
import Button from "./button"
import Scrollable from "./scrollable"
import LayoutStyles from "../styles/layout"
import LayerStyles from "../styles/layers"
import MetricsStyles from "../styles/metrics"
import { Metrics } from "../theme"
import XIcon from "../../assets/svg/x"

export const ModalStyles = StyleSheet.create({
	background: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	},

	container: {
		maxWidth: "90%",
		maxHeight: "90%",
	},

	forceScroll: {
		maxHeight: "100%",
		maxWidth: "100%",
	},

	medium: {
		maxWidth: 624,
		minWidth: 280,
		borderRadius: Metrics.borderRadius.modals,
		maxHeight: "100%",
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

		return (
			<Overlay {...nextProps}>
				<View
					style={[
						LayoutStyles.centerContent,
						LayerStyles.modal_background,
						ModalStyles.background,
					]}
				>
					<View
						style={[
							LayerStyles[layer || "modal"],
							MetricsStyles.components.group,
							ModalStyles.container,
						]}
					>
						{children}
					</View>
				</View>
			</Overlay>
		)
	}
}

export function DialogModal(props) {
	const { title, buttons, size, children, ...nextProps } = props

	return (
		<Modal {...nextProps}>
			<Column style={[ModalStyles[size || "medium"], ModalStyles.sizeLimits]}>
				<Row
					of="component"
					layer="overground_moderate"
					style={ModalStyles.header}
				>
					<Flex>
						{typeof title === "string" ? (
							<Heading level="4">{title}</Heading>
						) : (
							title
						)}
					</Flex>
					<Button
						small
						icon={<XIcon />}
						onClick={props.onRequestClose}
						style={ModalStyles.header_button}
					/>
				</Row>

				<Scrollable>{children}</Scrollable>

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
	)
}

export default Modal
