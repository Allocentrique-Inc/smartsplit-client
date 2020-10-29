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
import XIcon from "../svg/x"
import { MODAL_WIDTH } from "../pages/auth/modals"
import { observer } from "mobx-react"
import UnScrollable from "./unscrollable"

export const ModalStyles = StyleSheet.create({
	background: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		flexDirection: "row",
	},

	container: {
		maxWidth: "90%",
		maxHeight: "90%",
		flex: 1,
	},

	forceScroll: {
		maxHeight: "100%",
		maxWidth: "100%",
	},

	medium: {
		maxWidth: 624,
		minWidth: 280,
		borderRadius: Metrics.borderRadius.modals,
		maxHeight: "90%",
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

@observer
export class Modal extends React.PureComponent {
	render() {
		const { layer, children, size, ...nextProps } = this.props

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
							ModalStyles[size || "medium"],
						]}
					>
						{children}
					</View>
				</View>
			</Overlay>
		)
	}
}

export const DialogModal = observer((props) => {
	const { title, buttons, children, noScroll, ...nextProps } = props

	return (
		<Modal {...nextProps}>
			<Column style={{ maxWidth: MODAL_WIDTH, flex: 1 }}>
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

				{noScroll ? (
					<UnScrollable>{children}</UnScrollable>
				) : (
					<Scrollable>{children}</Scrollable>
				)}

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
})

export default Modal
