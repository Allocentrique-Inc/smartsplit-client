import React from "react"
import { View, Image } from "react-native"
import UserStyles from "./styles"
import { Text } from "../../text"

export default function UserAvatar({ size, user, picture, initials }) {
	const sizeStyle =
		size in UserStyles.avatar_size
			? UserStyles.avatar_size[size]
			: UserStyles.avatar_size.medium

	const small = ["small", "xsmall", "tiny"].includes(size)

	if (user) {
		if (!picture) {
			picture = { uri: user.avatarUrl }
		} else if (!initials && user) {
			initials =
				user.firstName.value.toUpperCase().charAt(0) +
				user.lastName.value.toUpperCase().charAt(0)
		}
	}

	return (
		<View style={[UserStyles.avatar_container, sizeStyle]}>
			{picture ? (
				<Image source={picture} style={sizeStyle} />
			) : (
				<Text small={small} bold secondary>
					{initials}
				</Text>
			)}
		</View>
	)
}
