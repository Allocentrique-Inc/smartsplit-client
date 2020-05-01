import React from "react"
import { View } from "react-native"
import AccessControl from "../../../components/AccessControl"

export default function Logout() {
	return (
		<View>
			<AccessControl redirectToLogin>
				<></>
			</AccessControl>
		</View>
	)
}
