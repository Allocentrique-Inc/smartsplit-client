import React from "react"
import { connect } from "react-redux"
import * as UserActions from "../../../redux/Users/Actions"
import Register from "./register"

function mapStateToProps({ users }) {
	return {
		users,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		registerUser: function (details) {
			dispatch(UserActions.registerUser(details))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
