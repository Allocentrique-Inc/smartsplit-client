import React from "react"
import { View, Image } from "react-native"
import UserStyles from "./styles"
import { Text } from "../../text"

export default function UserAvatar(props) {
	const sizeStyle =
		props.size in UserStyles.avatar_size
			? UserStyles.avatar_size[props.size]
			: UserStyles.avatar_size.medium

	const small = ["small", "xsmall", "tiny"].includes(props.size)

	return (
		<View style={[UserStyles.avatar_container, sizeStyle]}>
			{props.picture ? (
				<Image source={props.picture} style={sizeStyle} />
			) : (
				<Text small={small} bold secondary>
					{props.initials}
				</Text>
			)}
		</View>
	)
}
