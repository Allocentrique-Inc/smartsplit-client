import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TestRedux from "./TestRedux"
import { connect } from 'react-redux'
import * as CarActions from "./CarActions"

const mapStateToProps = ({cars}) => {
  return {
    cars
  }
}

const mapDispatchToProps = dispatch => {

  return {

    addCar: (car)=>{
      dispatch(CarActions.addCar(car))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);