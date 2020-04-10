import React from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Text } from "../text"
import { connect } from "react-redux"
import { Redirect } from "react-router"

function AccessControl({ isAuthenticated, children, redirectToLogin }) {
	if (isAuthenticated) return children
	if (redirectToLogin) return <Redirect to="/auth/register" push={true} />
	else return <Text>Not authorized</Text>
}

export default connect(function (state) {
	return {
		isAuthenticated:
			state.auth.isLoggedIn && state.auth.data && state.auth.data.accessToken,
	}
})(AccessControl)
