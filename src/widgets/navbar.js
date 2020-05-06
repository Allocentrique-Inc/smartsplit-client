import React from "react"
import { Column, Row } from "../layout"
import ArrowLeft from "../../assets/svg/arrow-left"
import { View } from "react-native"

export function Navbar() {
	const {
		title,
		onBack,
		actions
	} = props
	return (

		<Row of="none">
			<View>
				<ArrowLeft/>
			</View>
			<Row of="component">

			</Row>
		</Row>
	)
}