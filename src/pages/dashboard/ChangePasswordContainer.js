import React from "react"
import { connect } from "react-redux"
import * as UserActions from "../../redux/Users/Actions"
import { ChangePasswordModal } from "./change-password"

function mapStateToProps({ users }) {
	return {
		state: users.passwordReset,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changePassword: (details) => {
			dispatch(UserActions.resetPassword(details))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal)
