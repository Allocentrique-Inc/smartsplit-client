import React, { useState } from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import AccessControl from "../../widgets/AccessControl"

const testUserBaseProfile = {
	email: "autpmzzh@sharklasers.com",
	password: "correct horse battery staple",
	locale: "fr",
}

const testLoginDetails = {
	email: "example@smartsplit.org",
	password: "Biquette#1!",
}

const testForgotPasswordDetails = {
	email: "autpmzzh@sharklasers.com",
}

const testResetPassword = {
	token: "123456",
	password: "12345678",
}

function TestLogin({ auth, login, logout }) {
	return (
		<View>
			<Button
				title="Login"
				onPress={() => {
					login(testLoginDetails)
				}}
			/>
			<Button
				title="Logout"
				onPress={() => {
					logout()
				}}
			/>

			{auth && !auth.isLoggedIn && <Text>NOT LOGGED IN</Text>}
			{auth && auth.isLoading && <Text>Login loading</Text>}
			{auth && !auth.isLoading && auth.data && (
				<Text>Logged in - Token received {JSON.stringify(auth.data)}</Text>
			)}
			{auth && !auth.isLoading && auth.error && (
				<Text>Login failed - {JSON.stringify(auth.error.message)} </Text>
			)}
			<AccessControl>
				<Text>Secret code only for logged in user!</Text>
			</AccessControl>
		</View>
	)
}

function TestUsers({ users, registerUser }) {
	return (
		<View>
			<Button
				title="Register user"
				onPress={() => registerUser(testUserBaseProfile)}
			/>
			{users && users.registerUser.isLoading && <Text>Register loading</Text>}
			{users && !users.registerUser.isLoading && users.registerUser.data && (
				<Text>
					User registered - {users.registerUser.data.firstName}{" "}
					{users.registerUser.data.lastName}
				</Text>
			)}
			{users && !users.registerUser.isLoading && users.registerUser.error && (
				<Text>
					User registration failed - {JSON.stringify(users.registerUser.error)}{" "}
				</Text>
			)}
		</View>
	)
}

function TestResetPassword({ users, resetPassword }) {
	return (
		<View>
			<Button
				title="Reset password"
				onPress={() => resetPassword(testResetPassword)}
			/>
			{users && users.passwordReset.isLoading && (
				<Text>Reset password loading</Text>
			)}
			{users && !users.passwordReset.isLoading && users.passwordReset.data && (
				<Text>
					Reset password successful - {JSON.stringify(users.passwordReset.data)}
				</Text>
			)}
			{users && !users.passwordReset.isLoading && users.passwordReset.error && (
				<Text>
					Reset password failed - {JSON.stringify(users.passwordReset.error)}{" "}
				</Text>
			)}
		</View>
	)
}

function TestForgotPassword({ users, forgotPassword }) {
	return (
		<View>
			<Button
				title="Forgot password"
				onPress={() => forgotPassword(testForgotPasswordDetails)}
			/>
			{users && users.forgotPassword.isLoading && (
				<Text>Forgot password loading</Text>
			)}
			{users &&
				!users.forgotPassword.isLoading &&
				users.forgotPassword.data && (
					<Text>
						Forgot password successful -{" "}
						{JSON.stringify(users.forgotPassword.data)}
					</Text>
				)}
			{users &&
				!users.forgotPassword.isLoading &&
				users.forgotPassword.error && (
					<Text>
						Forgot password failed -{" "}
						{JSON.stringify(users.forgotPassword.error)}{" "}
					</Text>
				)}
		</View>
	)
}

function TestRightHolders({ rightHolders, getRightHolders }) {
	return (
		<View>
			<Button
				title="Get rightholders"
				onPress={() => getRightHolders()}
			></Button>
			{rightHolders && rightHolders.isLoading && <Text>ITS LOADING</Text>}
			{rightHolders && rightHolders.items.length <= 0 && <Text>Its empty</Text>}
			{rightHolders &&
				!rightHolders.isLoading &&
				rightHolders.items.length > 0 && (
					<>
						<Text>{JSON.stringify(rightHolders.items)}</Text>
						{rightHolders.items &&
							rightHolders.items.map((item, index) => {
								return <Text key={item.email}>{item.email}</Text>
							})}
					</>
				)}
		</View>
	)
}

export default function TestRedux({
	rightHolders,
	getRightHolders,
	users,
	registerUser,
	forgotPassword,
	resetPassword,
	auth,
	login,
	logout,
}) {
	const [selectedTab, setSelectedTab] = useState("users")

	return (
		<View>
			<Button
				title="Test Rightholders"
				onPress={() => setSelectedTab("rightholders")}
			/>
			<Button title="Test Users" onPress={() => setSelectedTab("users")} />
			<Button
				title="Test Forgot password"
				onPress={() => setSelectedTab("forgotPassword")}
			/>
			<Button
				title="Test Reset password"
				onPress={() => setSelectedTab("resetPassword")}
			/>
			<Button title="Test Auth" onPress={() => setSelectedTab("auth")} />
			<Text></Text>
			{selectedTab === "users" && (
				<TestUsers users={users} registerUser={registerUser} />
			)}
			{selectedTab === "rightholders" && (
				<TestRightHolders
					rightHolders={rightHolders}
					getRightHolders={getRightHolders}
				/>
			)}
			{selectedTab === "auth" && (
				<TestLogin auth={auth} login={login} logout={logout} />
			)}
			{selectedTab === "forgotPassword" && (
				<TestForgotPassword users={users} forgotPassword={forgotPassword} />
			)}
			{selectedTab === "resetPassword" && (
				<TestResetPassword users={users} resetPassword={resetPassword} />
			)}
		</View>
	)
}
