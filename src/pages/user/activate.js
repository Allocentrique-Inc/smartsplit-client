import React from "react"
import { connect } from "react-redux"
import { activateAccount } from "../../../redux/Users/Actions"
import { Redirect } from "react-router"
import PublicPageLayout from "../../layout/public-page"
import { Group } from "../../layout"
import { Heading, Paragraph } from "../../text"

export function ActivateAccount({ users, match, activateAccount }) {
	const token = match.params.token

	console.log(users.activation)

	if (
		!users.activation.isLoading &&
		!users.activation.data &&
		users.activation.error === null
	)
		activateAccount(token)

	if (users.activation.error === false) return <Redirect to="/" />

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
