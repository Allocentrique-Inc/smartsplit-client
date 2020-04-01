import React from "react"
import {View, Text, Button, StyleSheet} from "react-native"

const TestRedux = ({rightHolders, getRightHolders})=>{

	return <View>
		<Button title="Get rightholders" onPress={ ()=>{getRightHolders()} }></Button>
		{rightHolders && rightHolders.isLoading && (
			<Text>ITS LOADING</Text>
		)}
		{rightHolders && rightHolders.items.length <=0 && (
			<Text>Its empty</Text>
		)}
		{rightHolders && !rightHolders.isLoading && rightHolders.items.length > 0 && (
			<>
			<Text>{JSON.stringify(rightHolders.items)}</Text>
			{rightHolders.items && rightHolders.items.map((item,index)=>{
				return <Text key={item.email}>{item.email}</Text>
			})}
			</>
		)}
	</View>
}

const styles = StyleSheet.create({});

export default TestRedux;