import React, { useState, useEffect } from "react"
import { useStorePath } from "../../appstate/react"
import { useHistory, useRouteMatch } from "react-router"
import PublicPageLayout from "../../layout/public-page"
import { Group, Column } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"

export default function ActivateAccount() {
	const match = useRouteMatch()
	const history = useHistory()

	const token = match.params.token
	const auth = useStorePath("auth")

	const [error, setError] = useState(null)

	useEffect(() => {
		auth
			.activateAccountAndLogin(token)
			.then(() => history.push("/auth/new-user"))
			.catch((e) => setError(e))
	}, [token, auth])

	return (
		<PublicPageLayout>
			<Group of="group">
				<Heading level={1}>Activation de votre compte...</Heading>
				{error === null ? (
					<Paragraph>
						Veuillez patienter pendant que nous activons votre compte...
					</Paragraph>
				) : (
					<Column of="component">
						<Paragraph>
							Une erreur est survenue lors de l'activation de votre compte.
						</Paragraph>
						<Text error>{error.message}</Text>
					</Column>
				)}
			</Group>
		</PublicPageLayout>
	)
}
