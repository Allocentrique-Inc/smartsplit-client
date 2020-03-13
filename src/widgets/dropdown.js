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
	const { placeholder, children, ...nextProps } = props
	const [ dropdownOpen, setDropdownOpen ] = useState(false)
	const [ menuPosition, setMenuPosition ] = useState({})
	const [ dropdownHeight, setDropdownHeight ] = useState(0)
	const Arrow = dropdownOpen ? ArrowUp : ArrowDown
	const frame = React.createRef()
	
	function toggleMenu() {
		if(!dropdownOpen)
			getAbsolutePosition(frame.current, function(pos) {
				pos.y += dropdownHeight - 1
				setMenuPosition(pos)
			})
		
		setDropdownOpen(!dropdownOpen)
	}
	
	function onLayout(event) {
		setDropdownHeight(event.nativeEvent.layout.height)
	}
	
	return <TouchableWithoutFeedback onPress={toggleMenu}>
		<View ref={frame} onLayout={onLayout} style={{flex: 1}}>
			<Row of="inside">
				<Text secondary style={{flex: 1}}>{placeholder}</Text>
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
