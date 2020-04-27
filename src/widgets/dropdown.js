import React from "react"
import {
	Platform,
	findNodeHandle,
	View,
	TextInput,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native"

import { Row } from "../layout"
import { Text } from "../text"
import { Overlay } from "./scrollable"
import { Colors, Metrics } from "../theme"

import ArrowDown from "../../assets/svg/arrow-down"
import ArrowUp from "../../assets/svg/arrow-up"
import Search from "../../assets/svg/search.svg"

/**
 * Un menu dropdown simple: un placeholder, une flèche. Lorsqu'on clique dessus, son contenu (children) est alors affiché dans un dropdown en dessous de l'élément.
 *
 * Ce dropdown ne fait *pas* de sélection: voir `../forms/select` pour ça.
 */
export class Dropdown extends React.Component {
	static contextType = Overlay.Context

	constructor(props) {
		super(props)
		this.state = {
			managed: typeof props.open !== "undefined",
			open: props.open || false,
			menuPosition: {},
		}

		this.frame = React.createRef()
		this.layout = {}
	}

	static getDerivedStateFromProps(props, state) {
		if (typeof props.open !== "undefined" && props.open !== state.open)
			return { open: props.open }

		return null
	}

	componentDidUpdate(nextProps, nextState) {
		this.updateMenuPosition()
	}

	handleOnFocus = () => {
		if (this.props.onFocus) this.props.onFocus()

		if (!this.state.managed) this.setState({ open: true })
	}

	handleOnBlur = () => {
		if (this.props.onBlur) this.props.onBlur()

		if (!this.state.managed) this.setState({ open: false })
	}

	onLayout = (event) => {
		const newLayout = event.nativeEvent.layout

		for (let key in newLayout) {
			if (newLayout[key] !== this.layout[key]) {
				this.layout = newLayout
				this.updateMenuPosition()
				break
			}
		}
	}

	getIcon = () => {
		if (this.props.search) {
			return Search
		} else return this.state.open ? ArrowUp : ArrowDown
	}

	updateMenuPosition() {
		if (!this.state.open) return

		getAbsolutePosition(this.frame, this.context.containerRef, (pos) => {
			const positionAdjust = {
				...ZeroPosition,
				...this.props.positionAdjust,
			}

			const newPosition = {
				x: pos.x + positionAdjust.x,
				y: pos.y + positionAdjust.y + this.layout.height - 1,
				width: pos.width + positionAdjust.width,
				height: pos.height + positionAdjust.height,
			}

			for (let key in newPosition) {
				if (newPosition[key] !== this.state.menuPosition[key]) {
					this.setState({ menuPosition: newPosition })
					break
				}
			}
		})
	}

	render() {
		const { placeholder, children, onFocus, onBlur } = {
			...this.props,
			placeholder:
				typeof this.props.placeholder === "string" ? (
					<Text secondary style={{ flex: 1 }}>
						{this.props.placeholder}
					</Text>
				) : (
					this.props.placeholder
				),
		}

		return (
			<View ref={this.frame} onLayout={this.onLayout} style={{ flex: 1 }}>
				<DropdownRow
					noFocusToggle={this.props.noFocusToggle}
					noPressToggle={this.props.noPressToggle}
					onFocus={this.handleOnFocus}
					onBlur={this.handleOnBlur}
					focused={this.state.open}
					placeholder={placeholder}
					icon={this.getIcon()}
				/>

				<DropdownModal
					visible={this.state.open}
					position={this.state.menuPosition}
				>
					{children}
				</DropdownModal>
			</View>
		)
	}
}

class DropdownRow extends React.PureComponent {
	constructor(props) {
		super(props)
		this.pressInFocus = null
		this.pressOutFocus = null
	}

	handleOnPressIn = () => {
		this.pressInFocus = this.props.focused
	}

	handleOnPressOut = () => {
		this.pressOutFocus = this.props.focused
	}

	handleOnPress = () => {
		// si le focus a changé pendant le "press", alors autre chose a géré le focus pour nous et on ne toggle pas
		if (this.pressOutFocus !== this.pressInFocus) return

		if (this.props.focused) {
			if (this.props.onBlur) this.props.onBlur()
		} else {
			if (this.props.onFocus) this.props.onFocus()
		}
	}

	render() {
		const Icon = this.props.icon

		const focusToggle = this.props.noFocusToggle
			? {}
			: {
					onFocus: this.props.onFocus,
					onBlur: this.props.onBlur,
			  }

		const pressToggle = this.props.noPressToggle
			? undefined
			: this.handleOnPress

		return (
			<TouchableWithoutFeedback
				onPressIn={this.handleOnPressIn}
				onPressOut={this.handleOnPressOut}
				onPress={pressToggle}
				{...focusToggle}
			>
				<Row of="inside">
					{this.props.placeholder}
					<Icon />
				</Row>
			</TouchableWithoutFeedback>
		)
	}
}

function DropdownModal(props) {
	const positionStyle = {
		position: "absolute",
		left: props.position.x,
		top: props.position.y,
		width: props.position.width,
	}

	return (
		<Overlay visible={props.visible}>
			<View style={positionStyle}>{props.children}</View>
		</Overlay>
	)
}

function getAbsolutePositionWeb(frameRef, containerRef, cb) {
	const frame = findNodeHandle(frameRef.current)
	const container = findNodeHandle(containerRef.current)

	const position = {
		x: 0,
		y: 0,
		width: frame.offsetWidth,
		height: frame.offsetHeight,
	}

	let node = frame

	while (node && node !== container) {
		position.x += node.offsetLeft
		position.y += node.offsetTop
		node = node.offsetParent
	}

	cb(position)
}

function getAbsolutePositionNative(frameRef, containerRef, cb) {
	const frame = findNodeHandle(frameRef.current)
	const container = findNodeHandle(containerRef.current)

	if (!frame || !container) return

	frameRef.current.measureLayout(container, (x, y, width, height) => {
		cb({ x, y, width, height })
	})
}

const getAbsolutePosition = Platform.select({
	web: getAbsolutePositionWeb,
	android: getAbsolutePositionNative,
	ios: getAbsolutePositionNative,
})

const ZeroPosition = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
}

export default Dropdown
