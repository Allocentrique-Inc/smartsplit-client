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
		login: function (details) {
			dispatch(AuthActions.loginUser(details))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
