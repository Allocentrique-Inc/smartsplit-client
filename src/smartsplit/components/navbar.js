import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Column, Row } from "../../layout"
import ArrowLeft from "../../svg/arrow-left"
import { View } from "react-native"
import { Text } from "react-native-web"

const defaultStyle = {
	maxWidth: 944,
	width: "100%",
	flex: 1,
}

const getCenteredStyle = (width) => {
	return {
		maxWidth: 944,
		width: "100%",
		flex: 1,
		position: "absolute",
		left: "50%",
		marginLeft: -width / 2,
	}
}

export function Navbar(props) {
	const [style, setStyle] = useState(defaultStyle)
	const { title, onBack, actions } = props

	function handleOnLayout(e) {
		const layout = e.nativeEvent.layout
		if (layout.width === 944) {
			setStyle(getCenteredStyle(layout.width))
		} else {
			setStyle(defaultStyle)
		}
	}

	return (
		<Row
			of="component"
			padding="medium"
			layer="overground_moderate"
			valign="center"
		>
			<TouchableWithoutFeedback onPress={onBack}>
				<View>
					<ArrowLeft />
				</View>
			</TouchableWithoutFeedback>
			<Row
				of="component"
				valign="center"
				onLayout={handleOnLayout}
				style={style}
			>
				{title}
			</Row>

			<View style={{ marginLeft: "auto" }}>{actions}</View>
		</Row>
	)
}
