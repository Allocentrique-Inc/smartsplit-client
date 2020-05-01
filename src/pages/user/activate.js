import React, { useState, useEffect } from "react"
import { AsyncStorage } from "react-native"
import { connect } from "react-redux"
import { activateAccount } from "../../redux/Users/Actions"
import { Redirect } from "react-router"
import PublicPageLayout from "../../layouts/public-page"
import { Group } from "../../layout"
import { Heading, Paragraph } from "../../text"

export function ActivateAccount({ users, match, activateAccount }) {
	const token = match.params.token
	const [stayLoggedIn, setStayLoggedIn] = useState(null)

	useEffect(function () {
		AsyncStorage.getItem("register:stayLoggedInNext")
			.then((flag) => setStayLoggedIn(!!flag))
			.catch((e) =>
				console.error(
					"Failed getting stay logged in status after activation",
					e
				)
			)
	}, [])

	if (
		stayLoggedIn !== null &&
		!users.activation.isLoading &&
		!users.activation.data &&
		users.activation.error === null
	) {
		activateAccount(token)
		AsyncStorage.removeItem("register:stayLoggedInNext")
	}

	if (users.activation.error === false) return <Redirect to="/auth/new-user" />

	return (
		<PublicPageLayout>
			<Group of="group">
				<Heading level={1}>Activation de votre compte...</Heading>
				{users.activation.isLoading && (
					<Paragraph>
						Veuillez patienter pendant que nous activons votre compte...
					</Paragraph>
				)}

				{users.activation.error && (
					<>
						<Paragraph>
							Une erreur est survenue lors de l'activation de votre compte.
						</Paragraph>
						<Paragraph>{users.activation.error.message}</Paragraph>
					</>
				)}
			</Group>
		</PublicPageLayout>
	)
}

export default connect(
	({ users }) => ({ users }),
	(dispatch) => ({
		activateAccount: function (token) {
			dispatch(activateAccount(token))
		},
	})
)(ActivateAccount)
