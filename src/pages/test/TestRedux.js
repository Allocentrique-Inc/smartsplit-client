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

const testForgotPasswordDetails = {
	"email": "autpmzzh@sharklasers.com",
	"requestSource": "smartsplit"
}

const testResetPassword = {
	token: "123456",
	password: "12345678"
}

const TestUsers = ({users, registerUser})=>{
	return <View>
		<Button title="Register user" onPress={ ()=>{ registerUser(testUser) } }  />
		{users && users.registerUser.isLoading && (
			<Text>Register loading</Text>
		)}
		{users && !users.registerUser.isLoading && users.registerUser.data && (
			<Text>User registered - {users.registerUser.data.firstName} {users.registerUser.data.lastName}</Text>
		)}
		{users && !users.registerUser.isLoading && users.registerUser.error && (
			<Text>User registration failed - {JSON.stringify(users.registerUser.error.response.data.error)} </Text>
		)}
	</View>
};

const TestResetPassword = ({users, resetPassword})=>{
	return <View>
		<Button title="Reset password" onPress={ ()=>{ resetPassword(testResetPassword) } }  />
		{users && users.passwordReset.isLoading && (
			<Text>Reset password loading</Text>
		)}
		{users && !users.passwordReset.isLoading && users.passwordReset.data && (
			<Text>Reset password successful - {JSON.stringify(users.passwordReset.data)}</Text>
		)}
		{users && !users.passwordReset.isLoading && users.passwordReset.error && (
			<Text>Reset password failed - {JSON.stringify(users.passwordReset.error)} </Text>
		)}
	</View>
};

const TestForgotPassword = ({users, forgotPassword})=>{
	return <View>
		<Button title="Forgot password" onPress={ ()=>{ forgotPassword(testForgotPasswordDetails) } }  />
		{users && users.forgotPassword.isLoading && (
			<Text>Forgot password loading</Text>
		)}
		{users && !users.forgotPassword.isLoading && users.forgotPassword.data && (
			<Text>Forgot password successful - {JSON.stringify(users.forgotPassword.data)}</Text>
		)}
		{users && !users.forgotPassword.isLoading && users.forgotPassword.error && (
			<Text>Forgot password failed - {JSON.stringify(users.error.response.data.error)} </Text>
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

const TestRedux = ({rightHolders, getRightHolders, users, registerUser, forgotPassword, resetPassword })=>{

	const [selectedTab, setSelectedTab] = useState('users');

	return <View>
		<Button title="Test Rightholders" onPress={ ()=>{ setSelectedTab('rightholders') } } />
		<Button title="Test Users" onPress={ ()=>{ setSelectedTab('users') } } />
		<Button title="Test Forgot password" onPress={ ()=>{ setSelectedTab('forgotPassword') } } />
		<Button title="Test Reset password" onPress={ ()=>{ setSelectedTab('resetPassword') } } />
		<Text></Text>
		{selectedTab === 'users' && (
			<TestUsers users={users} registerUser={registerUser} />
		)}
		{selectedTab === 'rightholders' && (
			<TestRightHolders rightHolders={rightHolders} getRightHolders={getRightHolders}  />
		)}
		{selectedTab === 'forgotPassword' && (
			<TestForgotPassword users={users} forgotPassword={forgotPassword} />
		) }
		{selectedTab === 'resetPassword' && (
			<TestResetPassword users={users} resetPassword={resetPassword} />
		) }
	</View>
}

const styles = StyleSheet.create({});

export default TestRedux;