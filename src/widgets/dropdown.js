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
import { ModalImpl as Modal } from "./modal"
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
		children,
		onOpenClose,
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
	
	const Arrow = dropdownOpen ? ArrowUp : ArrowDown
	const frame = React.createRef()
	
	if(dropdownControl)
		dropdownControl(setDropdownOpen)
	
	function toggleMenu() {
		if(!dropdownOpen)
			getAbsolutePosition(frame.current, function(pos) {
				setMenuPosition({
					x:      pos.x      + positionAdjust.x,
					y:      pos.y      + positionAdjust.y + dropdownHeight - 1,
					width:  pos.width  + positionAdjust.width,
					height: pos.height + positionAdjust.height,
				})
			})
		
		setDropdownOpen(!dropdownOpen)
		onOpenClose && onOpenClose(!dropdownOpen)
	}
	
	function onLayout(event) {
		setDropdownHeight(event.nativeEvent.layout.height)
	}
	
	return <TouchableWithoutFeedback onPress={toggleMenu}>
		<View ref={frame} onLayout={onLayout} style={{flex: 1}}>
			<Row of="inside">
				{placeholder}
				<Arrow />
			</Row>
			
			<DropdownModal
				visible={dropdownOpen}
				onClose={toggleMenu}
				position={menuPosition}
			>{children}</DropdownModal>
		</View>
	</TouchableWithoutFeedback>
}

function DropdownModal(props) {
	const positionStyle = {
		position: "absolute",
		left: props.position.x,
		top: props.position.y,
		width: props.position.width,
	}
		
	return <Modal
		visible={props.visible}
		onRequestClose={props.onClose}
		transparent
	>
		<View style={positionStyle}>
			{props.children}
		</View>
	</Modal>
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
