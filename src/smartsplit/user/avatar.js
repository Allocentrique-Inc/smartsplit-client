import React from "react"
import { useStorePath } from "../../appstate/react"
import { View, Image } from "react-native"
import UserStyles from "./styles"
import { Text } from "../../text"
import { toJS } from "mobx"
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
		if (!picture && user.avatarUrl) {
			picture = { uri: user.avatarUrl }
		} else if (!initials && user) {
			//console.dir(toJS(user))
			initials =
				(user.firstName ? user.firstName.toUpperCase().charAt(0) : "") +
				(user.lastName ? user.lastName.toUpperCase().charAt(0) : "")
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
