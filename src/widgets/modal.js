import React from "react"
import { Platform, View, StyleSheet } from "react-native"

import { Overlay } from "../portals"
import { Row, Column, Flex } from "../layout"
import { Heading, Text } from "../text"
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
	large: {
		maxWidth: 1024,
		minWidth: 624,
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
		zIndex: -1,
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
	const {
		title,
		size,
		underTitle,
		titleLevel,
		buttons,
		children,
		noScroll,
		text,
		...nextProps
	} = props

	return (
		<Modal size={size ? size : "medium"} {...nextProps}>
			<Column
				style={{
					maxWidth: ModalStyles[size ? size : "medium"].maxWidth,
					flex: 1,
				}}
			>
				<Row
					of="component"
					layer="overground_moderate"
					style={ModalStyles.header}
				>
					<Column flex={1}>
						<Row>
							<Flex>
								{typeof title === "string" ? (
									<Heading level={titleLevel ? titleLevel : 4}>{title}</Heading>
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
						{underTitle && (
							<Row>
								<Flex>
									{typeof underTitle === "string" ? (
										<Text small secondary>
											{underTitle}
										</Text>
									) : (
										underTitle
									)}
								</Flex>
							</Row>
						)}
					</Column>
				</Row>

				{noScroll ? (
					<UnScrollable>{children}</UnScrollable>
				) : (
					<Scrollable>{children}</Scrollable>
				)}

				<Row
					valign="center"
					of="component"
					layer="overground_moderate"
					padding="component"
					style={ModalStyles.buttonBar}
				>
					<Row valign="center">
						<Text align="left">{text}</Text>
					</Row>
					<Flex />
					<Row align="right">{buttons}</Row>
				</Row>
			</Column>
		</Modal>
	)
})

export default Modal
