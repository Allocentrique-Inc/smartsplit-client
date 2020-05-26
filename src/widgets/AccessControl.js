import React from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Text } from "../text"
import { connect } from "react-redux"
import { Redirect } from "react-router"

function AccessControl({
	isAuthenticated,
	isReturning,
	children,
	redirectToLogin,
}) {
	if (isAuthenticated) return children
	if (redirectToLogin) {
		if (isReturning) {
			return <Redirect to="/auth/login" push={true} />
		} else {
			return <Redirect to="/auth/register" push={true} />
		}
	} else return <Text>Not authorized</Text>
}

export default connect(function (state) {
	return {
		isAuthenticated: state.auth.isLoggedIn,
		isReturning: state.auth.isReturning,
	}
})(AccessControl)
