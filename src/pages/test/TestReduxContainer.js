import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import TestRedux from "./TestRedux"
import { connect } from "react-redux"
import * as RightHoldersActions from "../../../redux/RightHolders/Actions"
import * as UsersActions from "../../../redux/Users/Actions"
import * as AuthActions from "../../../redux/Auth/Actions"

function mapStateToProps({ rightHolders, users, auth }) {
	return {
		rightHolders,
		users,
		auth,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getRightHolders: function () {
			dispatch(RightHoldersActions.getRightHolders())
		},
		registerUser: function (user) {
			dispatch(UsersActions.registerUser(user))
		},
		forgotPassword: function (details) {
			dispatch(UsersActions.forgotPassword(details))
		},
		login: function (details) {
			dispatch(AuthActions.loginUser(details, true))
		},
		logout: function () {
			dispatch(AuthActions.logoutUser())
		},
		resetPassword: function (passwordDetails) {
			dispatch(UsersActions.resetPassword(passwordDetails))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux)
