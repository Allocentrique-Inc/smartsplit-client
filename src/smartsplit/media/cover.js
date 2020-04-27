import React from "react"
import { View } from "react-native"
import ImageIcon from "../../../assets/svg/image"
import MediaStyles from "./styles"
import { Colors } from "../../theme"

export default function Cover(props) {
	return (
		<View style={[MediaStyles.cover, props.style]}>
			<ImageIcon color={Colors.stroke} />
		</View>
	)
}
