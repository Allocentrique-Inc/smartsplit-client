import React, {useState} from "react"
import { Column, Row } from "../../layout"
import ArrowLeft from "../../../assets/svg/arrow-left"
import { View } from "react-native"
import Button from "../../widgets/button"
import { Text } from "react-native-web"

const defaultStyle = {
	maxWidth: 944,
	width: "100%",
	flex: 1
}
const getCenteredStyle = (width) => { return {
	maxWidth: 944,
	width: "100%",
	flex: 1,
	position: "absolute",
	left: "50%",
	marginLeft: -width/2
}}
export function Navbar(props) {
	const [style, setStyle] = useState(defaultStyle)
	const {
		title,
		onBack,
		actions,
	} = props
	function handleOnLayout(e) {
		const layout = e.nativeEvent.layout
		if(layout.width === 944) {
			setStyle(getCenteredStyle(layout.width))
		} else {
			setStyle(defaultStyle)
		}
	}

	return (
		<Row of="component" padding="medium" layer="overground_moderate" valign="center">
			<View>
				<ArrowLeft/>
			</View>
			<Row of="component"
			     valign="center"
			     onLayout={handleOnLayout}
			     onMeasure={() => console.log("ONMEASURE")}
			     style={style}
			>{title}</Row>
			<Button tertiary text="Sauvegarder" style={{ marginLeft: "auto" }}/>
		</Row>
	)
}