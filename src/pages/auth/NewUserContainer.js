import React from "react"
import { connect } from "react-redux"
import * as UserActions from "../../../redux/Users/Actions"
import NewUser from "./new-user"

function mapStateToProps({ users, auth, ...rest }) {
	return {
		state: users.updateUser,
		user: auth.data.user,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateUser: function (details) {
			dispatch(UserActions.updateUser(details))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
