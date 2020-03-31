import React from "react"
import {View, Text, Button, StyleSheet} from "react-native"

const TestRedux = ({cars, addCar})=>{

	return <View>
		<Button title="Add car" onPress={ ()=>{addCar('Lambo123')} }></Button>
		<Text>{JSON.stringify(cars)}</Text>
		{cars && cars.myCollection && cars.myCollection.map((car,index)=>{
			return <Text key={car}>{car}</Text>
		})}
	</View>
}

const styles = StyleSheet.create({});

export default TestRedux;