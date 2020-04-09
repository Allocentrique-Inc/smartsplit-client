import React, {useState} from "react"
import {View, Text, Button, StyleSheet} from "react-native"
import AccessControl from "../../widgets/AccessControl"

const testUserBaseProfile = {
	email: "autpmzzh@sharklasers.com",
	password: "correct horse battery staple",
	locale: "fr"
}

const testLoginDetails = {
	"email": "autpmzzh@sharklasers.com",
	"password": "correct horse battery staple"
}

function TestLogin({auth, login, logout}) {
	return <View>
		<Button title="Login" onPress={ ()=>{ login(testLoginDetails) } }  />
		<Button title="Logout" onPress={ ()=>{ logout() } }  />
		
		{auth && !auth.isLoggedIn && (
			<Text>NOT LOGGED IN</Text>
		)}
		{auth && auth.isLoading && (
			<Text>Login loading</Text>
		)}
		{auth && !auth.isLoading && auth.data && (
			<Text>Logged in - Token received { JSON.stringify(auth.data) }</Text>
		)}
		{auth && !auth.isLoading && auth.error && (
			<Text>Login failed - {JSON.stringify(auth.error.message)} </Text>
		)}
		<AccessControl redirectToLogin>
			<Text>Secret code only for logged in user!</Text>
		</AccessControl>
	</View>
}

function TestUsers({users, registerUser}) {
	return <View>
		<Button title="Register user" onPress={() => registerUser(testUserBaseProfile)}  />
		{users && users.isLoading && (
			<Text>Register loading</Text>
		)}
		{users && !users.isLoading && users.data && (
			<Text>User registered - {users.data.firstName} {users.data.lastName}</Text>
		)}
		{users && !users.isLoading && users.error && (
			<Text>User registration failed - {JSON.stringify(users.error.message)} </Text>
		)}
	</View>
}

function TestRightHolders({rightHolders, getRightHolders}) {
	return <View>
		<Button title="Get rightholders" onPress={() => getRightHolders()}></Button>
		{rightHolders && rightHolders.isLoading && (
			<Text>ITS LOADING</Text>
		)}
		{rightHolders && rightHolders.items.length <=0 && (
			<Text>Its empty</Text>
		)}
		{rightHolders && !rightHolders.isLoading && rightHolders.items.length > 0 && <>
			<Text>{JSON.stringify(rightHolders.items)}</Text>
			{rightHolders.items && rightHolders.items.map((item,index)=>{
				return <Text key={item.email}>{item.email}</Text>
			})}
		</>}
	</View>
}

export default function TestRedux({
	rightHolders,
	getRightHolders,
	users,
	registerUser,
	auth,
	login,
	logout
}) {
	const [selectedTab, setSelectedTab] = useState('users')

	return <View>
		<Button title="Test Rightholders" onPress={() => setSelectedTab('rightholders')} />
		<Button title="Test Users"        onPress={() => setSelectedTab('users')} />
		<Button title="Test Auth"         onPress={() => setSelectedTab('auth')} />
		<Text></Text>
		{selectedTab === 'users' && (
			<TestUsers users={users} registerUser={registerUser} />
		)}
		{selectedTab === 'rightholders' && (
			<TestRightHolders rightHolders={rightHolders} getRightHolders={getRightHolders}  />
		)}
		{selectedTab === 'auth' && (
			<TestLogin auth={auth} login={login} logout={logout} />
		)}
	</View>
}
