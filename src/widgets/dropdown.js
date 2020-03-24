import React, { useState } from "react"
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
import { Overlay } from "../portals"
import { Colors, Metrics } from "../theme"

import ArrowDown from "../svg/arrow-down"
import ArrowUp   from "../svg/arrow-up"


/**
 * Un menu dropdown simple: un placeholder, une flèche. Lorsqu'on clique dessus, son contenu (children) est alors affiché dans un dropdown en dessous de l'élément.
 * 
 * Ce dropdown ne fait *pas* de sélection: voir `../forms/select` pour ça.
 */
export function Dropdown(props) {
	const {
		placeholder,
		noPlaceholderPress,
		children,
		open,
		onFocus,
		onBlur,
		positionAdjust,
		dropdownControl,
		...nextProps
	} = {
		...props,
		positionAdjust: {
			x: 0, y: 0,
			width: 0, height: 0,
			...props.positionAdjust
		},
		placeholder: typeof props.placeholder === "string"
			? <Text secondary style={{flex: 1}}>{props.placeholder}</Text>
			: props.placeholder
		,
	}
	
	const [ dropdownOpen,   setDropdownOpen ]   = useState(false)
	const [ menuPosition,   setMenuPosition ]   = useState({})
	const [ dropdownHeight, setDropdownHeight ] = useState(0)
	const actualDropdownOpen = open !== undefined ? open : dropdownOpen
	
	const frame = React.createRef()
	
	function toggleMenu() {
		if(!actualDropdownOpen)
			getAbsolutePosition(frame.current, function(pos) {
				setMenuPosition({
					x:      pos.x      + positionAdjust.x,
					y:      pos.y      + positionAdjust.y + dropdownHeight - 1,
					width:  pos.width  + positionAdjust.width,
					height: pos.height + positionAdjust.height,
				})
			})
		
		setDropdownOpen(!actualDropdownOpen)
		
		if(actualDropdownOpen && onBlur)
			onBlur()
		else if(onFocus)
			onFocus()
	}
	
	function onClose() {
		setDropdownOpen(false)
		
		if(onBlur)
			onBlur()
	}
	
	function onLayout(event) {
		setDropdownHeight(event.nativeEvent.layout.height)
	}
	
	return <View ref={frame} onLayout={onLayout} style={{flex: 1}}>
		<DropdownRow
			noPlaceholderPress={noPlaceholderPress}
			onPress={toggleMenu}
			placeholder={placeholder}
			arrow={actualDropdownOpen ? ArrowUp : ArrowDown}
		/>
		
		<DropdownModal
			visible={actualDropdownOpen}
			onClose={onClose}
			position={menuPosition}
		>{children}</DropdownModal>
	</View>
}

function DropdownRow(props) {
	const Arrow = props.arrow
	
	if(props.noPlaceholderPress)
		return <Row of="inside">
			{props.placeholder}
			
			<TouchableWithoutFeedback
				onPress={props.onPress}
				hitSlop={Metrics.hitSlop}
			>
				<View><Arrow /></View>
			</TouchableWithoutFeedback>
		</Row>
	else
		return <TouchableWithoutFeedback onPress={props.onPress}>
			<Row of="inside">
				{props.placeholder}
				<Arrow />
			</Row>
		</TouchableWithoutFeedback>
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

function getAbsolutePositionWeb(ref, cb) {
	const webPosition = findNodeHandle(ref).getBoundingClientRect()
	
	cb({
		x: webPosition.left,
		y: webPosition.top,
		width: webPosition.right - webPosition.left,
		height: webPosition.bottom - webPosition.top
	})
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

export default Dropdown
