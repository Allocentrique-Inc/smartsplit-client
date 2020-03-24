import React from "react"
import {
	Platform,
	findNodeHandle,
	View,
	TextInput,
	StyleSheet,
	TouchableWithoutFeedback
} from "react-native"

import { Row }  from "../layout"
import { Text } from "../text"
import { Overlay } from "./scrollable"
import { Colors, Metrics } from "../theme"

import ArrowDown from "../svg/arrow-down"
import ArrowUp   from "../svg/arrow-up"


/**
 * Un menu dropdown simple: un placeholder, une flèche. Lorsqu'on clique dessus, son contenu (children) est alors affiché dans un dropdown en dessous de l'élément.
 * 
 * Ce dropdown ne fait *pas* de sélection: voir `../forms/select` pour ça.
 */
export class Dropdown extends React.PureComponent {
	static contextType = Overlay.Context
	
	constructor(props) {
		super(props)
		this.state = {
			managed: typeof props.open !== "undefined",
			open: props.open || false,
			menuPosition: {},
		}
		
		this.frame = React.createRef()
		this.frameHeight = 0
	}
	
	static getDerivedStateFromProps(props, state) {
		if(typeof props.open !== "undefined" && props.open !== state.open)
			return {open: props.open}
		
		return null
	}
	
	componentDidMount() {
		this.updateMenuPosition()
	}
	
	componentDidUpdate() {
		this.updateMenuPosition()
	}
	
	handleOnFocus = () => {
		if(this.props.onFocus)
			this.props.onFocus()
		
		if(!this.state.managed)
			this.setState({open: true})
	}
	
	handleOnBlur = () => {
		if(this.props.onBlur)
			this.props.onBlur()
		
		if(!this.state.managed)
			this.setState({open: false})
	} 
	
	onLayout = (event) => {
		this.frameHeight = event.nativeEvent.layout.height
		this.updateMenuPosition()
	}
	
	updateMenuPosition() {
		getAbsolutePosition(this.frame, this.context.containerRef, pos => {
			const positionAdjust = {
				...ZeroPosition,
				...this.props.positionAdjust
			}
			
			const newPosition = {
				x:      pos.x      + positionAdjust.x,
				y:      pos.y      + positionAdjust.y + this.frameHeight - 1,
				width:  pos.width  + positionAdjust.width,
				height: pos.height + positionAdjust.height,
			}
			
			for(let key in newPosition) {
				if(newPosition[key] !== this.state.menuPosition[key]) {
					this.setState({menuPosition: newPosition})
					break
				}
			}
		})
	}
	
	render() {
		const {
			placeholder,
			children,
			onFocus,
			onBlur,
			...nextProps
		} = {
			...this.props,
			placeholder: typeof this.props.placeholder === "string"
				? <Text secondary style={{flex: 1}}>{this.props.placeholder}</Text>
				: this.props.placeholder
			,
		}
		
		return <View ref={this.frame} onLayout={this.onLayout} style={{flex: 1}}>
			<DropdownRow
				noFocusToggle={this.props.noFocusToggle}
				onFocus={this.handleOnFocus}
				onBlur={this.handleOnBlur}
				focused={this.state.open}
				placeholder={placeholder}
				arrow={this.state.open ? ArrowUp : ArrowDown}
			/>
			
			<DropdownModal
				visible={this.state.open}
				position={this.state.menuPosition}
			>{children}</DropdownModal>
		</View>
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
	
	handleOnPress =  () => {
		// si le focus a changé pendant le "press", alors autre chose a géré le focus pour nous et on ne toggle pas
		if(this.pressOutFocus !== this.pressInFocus)
			return
		
		if(this.props.focused) {
			if(this.props.onBlur)
				this.props.onBlur()
		} else {
			if(this.props.onFocus)
				this.props.onFocus()
		}
	}
	
	render() {
		const Arrow = this.props.arrow
		
		const focusToggle = this.props.noFocusToggle ? {} : {
			onFocus: this.props.onFocus,
			onBlur:  this.props.onBlur,
		}
		
		return <TouchableWithoutFeedback
			onPressIn={this.handleOnPressIn}
			onPressOut={this.handleOnPressOut}
			onPress={this.handleOnPress}
			{...focusToggle}
		>
			<Row of="inside">
				{this.props.placeholder}
				<Arrow />
			</Row>
		</TouchableWithoutFeedback>
	}
}

function DropdownModal(props) {
	const positionStyle = {
		position: "absolute",
		left: props.position.x,
		top: props.position.y,
		width: props.position.width,
	}
		
	return <Overlay visible={props.visible}>
		<View style={positionStyle}>
			{props.children}
		</View>
	</Overlay>
}

function getAbsolutePositionWeb(frameRef, containerRef, cb) {
	const frame = findNodeHandle(frameRef.current)
	const container = findNodeHandle(containerRef.current)
	
	const position = {
		x: 0, y: 0,
		width: frame.offsetWidth,
		height: frame.offsetHeight
	}
	
	let node = frame
	
	while(node && node !== container) {
		position.x += node.offsetLeft
		position.y += node.offsetTop
		node = node.offsetParent
	}
	
	cb(position)
}

function getAbsolutePositionNative(ref, cb) {
	ref.measureInWindow(function(x, y, width, height) {
		cb({x, y, width, height})
	})
}

const getAbsolutePosition = Platform.select({
	web: getAbsolutePositionWeb,
	android: getAbsolutePositionNative,
	ios: getAbsolutePositionNative
})

const ZeroPosition = {
	x: 0, y: 0,
	width: 0, height: 0,
}

export default Dropdown
