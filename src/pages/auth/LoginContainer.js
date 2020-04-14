import React from "react"
import { connect } from "react-redux"
import * as AuthActions from "../../../redux/Auth/Actions"
import Login from "./login"

function mapStateToProps({ auth }) {
	return {
		auth,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		login: function (details, rememberMe) {
			dispatch(AuthActions.loginUser(details, rememberMe))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
