import { StyleSheet } from "react-native"
import { Colors, Metrics } from "../../theme"

const UserStyles = StyleSheet.create({
	avatar_container: {
		backgroundColor: Colors.stroke,
		alignItems: "center",
		justifyContent: "center"
	},
})

UserStyles.avatar_size = {}

for(let size in Metrics.size) {
	UserStyles.avatar_size[size] = {
		width:  Metrics.size[size],
		height: Metrics.size[size],
		borderRadius: Metrics.size[size] /2,
	}
}

UserStyles.avatar_size = StyleSheet.create(UserStyles.avatar_size)

export default UserStyles
