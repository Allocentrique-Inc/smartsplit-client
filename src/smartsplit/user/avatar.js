import React from "react"
import { useStorePath } from "../../appstate/react"
import { View, Image } from "react-native"
import UserStyles from "./styles"
import { Text } from "../../text"

export default function UserAvatar({
	size,
	user,
	picture,
	border,
	initials,
	field,
}) {
	const sizeStyle =
		size in UserStyles.avatar_size
			? UserStyles.avatar_size[size]
			: UserStyles.avatar_size.medium

	const small = ["small", "xsmall", "tiny"].includes(size)
	if (field) {
		picture = { uri: field.value }
	} else if (user) {
		if (!picture) {
			picture = { uri: user.avatarUrl }
		} else if (!initials && user) {
			initials =
				user.firstName.value.toUpperCase().charAt(0) +
				user.lastName.value.toUpperCase().charAt(0)
		}
	}

	if (border) {
		border = [UserStyles.avatar_border, { borderColor: border }]
	}

	return (
		<View style={[UserStyles.avatar_container, border, sizeStyle]}>
			{picture ? (
				<Image source={picture} style={[border, sizeStyle]} />
			) : (
				<Text small={small} bold secondary>
					{initials}
				</Text>
			)}
		</View>
	)
}

export function CurrentUserAvatar(props) {
	const user = useStorePath("auth", "user", "data")
	return <UserAvatar user={user} {...props} />
}
