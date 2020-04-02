import React, {useState} from "react"
import {View, Text, Button, StyleSheet} from "react-native"

const testUser = {
	"email": "autpmzzh@sharklasers.com",
	"requestSource": "pochette",
	"firstName": "Johns",
	"lastName": "Smither",
	"accountCreationType": "initiatorCreatedUser",
	"locale": "fr",
	"password": "correct horse battery staple",
	"rightHolder": {
	  "rightHolderId": "12345c60-7b1a-11e8-9c9c-2d42b21b1a4g",
	  "firstName": "John",
	  "lastName": "Smith",
	  "email": "john.smith@example.com",
	  "requestSource": "pochette",
	  "jurisdiction": "Canada",
	  "ipi": "00004576",
	  "wallet": "0xdd87ae15f4be97e2739c9069ddef674f907d27a8",
	  "avatarImage": "image.jpg",
	  "artistName": "Questlove",
	  "groups": [
		"Group 1",
		"Group 2"
	  ],
	  "defaultRoles": [
		"Songwriter",
		"Producer"
	  ],
	  "accountCreationType": "initiatorCreatedUser",
	  "locale": "en",
	  "editeur": true,
	  "socialMediaLinks": {
		"facebook": "https://facebook.com/ex",
		"twitter": "https://twitter.com/ex",
		"youtube": "https://youtube.com/ex"
	  }
	}
};

const TestUsers = ({users, registerUser})=>{
	return <View>
		<Button title="Register user" onPress={ ()=>{ registerUser(testUser) } }  />
		{users && users.isLoading && (
			<Text>Register loading</Text>
		)}
		{users && !users.isLoading && users.data && (
			<Text>User registered - {users.data.firstName} {users.data.lastName}</Text>
		)}
		{users && !users.isLoading && users.error && (
			<Text>User registration failed - {JSON.stringify(users.error.response.data.error)} </Text>
		)}
	</View>
};

const TestRightHolders = ({rightHolders, getRightHolders})=>{
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

const TestRedux = ({rightHolders, getRightHolders, users, registerUser })=>{

	const [selectedTab, setSelectedTab] = useState('users');

	return <View>
		<Button title="Test Rightholders" onPress={ ()=>{ setSelectedTab('rightholders') } } />
		<Button title="Test Users" onPress={ ()=>{ setSelectedTab('users') } } />
		<Text></Text>
		{selectedTab === 'users' && (
			<TestUsers users={users} registerUser={registerUser} />
		)}
		{selectedTab === 'rightholders' && (
			<TestRightHolders rightHolders={rightHolders} getRightHolders={getRightHolders}  />
		)}
	</View>
}

const styles = StyleSheet.create({});

export default TestRedux;