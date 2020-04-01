import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TestRedux from "./TestRedux"
import { connect } from 'react-redux'
import * as RightHoldersActions from "../../../redux/RightHolders/Actions"

const mapStateToProps = ({rightHolders}) => {
  return {
    rightHolders: rightHolders
  }
}

const mapDispatchToProps = dispatch => {

  return {
    getRightHolders: ()=>{
      dispatch( RightHoldersActions.getRightHolders() );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);