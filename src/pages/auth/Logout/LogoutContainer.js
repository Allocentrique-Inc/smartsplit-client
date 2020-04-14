import React from "react"
import { connect } from "react-redux"
import * as AuthActions from "../../../../redux/Auth/Actions"
import Logout from "./Logout"

function mapStateToProps({ auth }) {
	return {
		auth,
	}
}

function mapDispatchToProps(dispatch) {
	dispatch(AuthActions.logoutUser())
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
