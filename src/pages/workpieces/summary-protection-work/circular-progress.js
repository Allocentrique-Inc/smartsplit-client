import React from "react"
import { View, StyleSheet, Text } from "react-native"
import UserAvatar from "../../../smartsplit/user/avatar"
import { defaultPicture } from "./modal/item-version-detail"
/**
 * Override styles that get passed from props
 **/
const propStyle = (percent, base_degrees) => {
	const rotateBy = base_degrees + percent * 3.6
	return {
		transform: [{ rotateZ: `${rotateBy}deg` }],
	}
}

const renderThirdLayer = (
	percent,
	size,
	borderWidth,
	borderBgColor,
	percentColor
) => {
	if (percent > 50) {
		return (
			<View
				style={[
					styles.secondProgressLayer,
					{
						width: size,
						height: size,
						borderWidth: borderWidth,
						borderRightColor: percentColor,
						borderTopColor: percentColor,
					},
					propStyle(percent - 50, 45),
				]}
			></View>
		)
	} else {
		return (
			<View
				style={[
					styles.offsetLayer,
					{
						width: size,
						height: size,
						borderWidth: borderWidth,
						borderRightColor: borderBgColor,
						borderTopColor: borderBgColor,
					},
				]}
			></View>
		)
	}
}

const AvatarProgress = (props) => {
	const {
		percent,
		size,
		borderWidth,
		borderBgColor,
		percentColor,
		picture,
		...nextProps
	} = props

	const percentValue =
		typeof percent === "number" && percent >= 0 && percent <= 100 ? percent : 0
	const percentColorValue = percentColor || "#D9ACF7"
	const sizeValue = typeof size === "number" && size >= 40 ? size : 40
	const borderWidthValue =
		typeof borderWidth === "number" && borderWidth >= 1 ? borderWidth : 1
	const borderBgColorValue = borderBgColor || "#F5F2F3"

	let firstProgressLayerStyle
	if (percentValue > 50) {
		firstProgressLayerStyle = propStyle(50, -135)
	} else {
		firstProgressLayerStyle = propStyle(percentValue, -135)
	}

	return (
		<View {...nextProps}>
			<View
				style={[
					styles.container,
					{
						width: sizeValue,
						height: sizeValue,
						borderWidth: borderWidthValue,
						borderColor: borderBgColorValue,
					},
				]}
			>
				<View
					style={[
						styles.firstProgressLayer,
						firstProgressLayerStyle,
						{
							width: sizeValue,
							height: sizeValue,
							borderWidth: borderWidthValue,
							borderRightColor: percentColorValue,
							borderTopColor: percentColorValue,
						},
					]}
				></View>
				{renderThirdLayer(
					percentValue,
					sizeValue,
					borderWidthValue,
					borderBgColorValue,
					percentColorValue
				)}
				<UserAvatar size="small" picture={picture || defaultPicture} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	firstProgressLayer: {
		borderRadius: "100%",
		position: "absolute",
		borderLeftColor: "transparent",
		borderBottomColor: "transparent",
		transform: [{ rotateZ: "-135deg" }],
	},
	secondProgressLayer: {
		position: "absolute",
		borderRadius: "100%",
		borderLeftColor: "transparent",
		borderBottomColor: "transparent",
		transform: [{ rotateZ: "45deg" }],
	},
	offsetLayer: {
		position: "absolute",
		borderRadius: "100%",
		borderLeftColor: "transparent",
		borderBottomColor: "transparent",
		transform: [{ rotateZ: "-135deg" }],
	},
})

export default AvatarProgress
