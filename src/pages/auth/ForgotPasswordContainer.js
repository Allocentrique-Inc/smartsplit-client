import React from "react"
import { connect } from "react-redux"
import * as UserActions from "../../../redux/Users/Actions"
import ForgotPassword from "./forgot-password"

function mapStateToProps({ users }) {
	return {
		users,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		forgotPassword: function (details) {
			dispatch(UserActions.forgotPassword(details))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
