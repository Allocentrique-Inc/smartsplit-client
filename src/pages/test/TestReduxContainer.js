import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TestRedux from "./TestRedux"
import { connect } from 'react-redux'
import * as RightHoldersActions from "../../../redux/RightHolders/Actions"
import * as UsersActions from "../../../redux/Users/Actions"

const mapStateToProps = ({rightHolders, users}) => {
  return {
    rightHolders,
    users
  }
}

const mapDispatchToProps = dispatch => {

  return {
    getRightHolders: ()=>{
      dispatch( RightHoldersActions.getRightHolders() );
    },
    registerUser: (user)=>{
      dispatch( UsersActions.registerUser(user) );
    },
    forgotPassword: (details)=>{
      dispatch( UsersActions.forgotPassword(details) );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);