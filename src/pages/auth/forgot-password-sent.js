import React, { useState } from "react"
import { Platform } from "react-native"
import { useHistory } from "react-router-dom"
import { Route, Redirect, Router } from "react-router"
import { WebComponentNavbarRegister } from "./register"
import { Heading, Text } from "../../text"
import Button from "../../widgets/button"
import { Section, Column, Row } from "../../layout"

export const WebComponentHeading = () => (
	<>
		<Heading level="1">Courriel envoyé.</Heading>
	</>
)

export const NativeComponentHeading = () => (
	<Heading level="3">Courriel envoyé.</Heading>
)

export default function PasswordSent(props) {
	let history = useHistory()
	const handleClick = () => history.push("/auth/login")

	return (
		<>
			{Platform.select({
				web: <WebComponentNavbarRegister />,
			})}

			<Section
				of="group"
				style={{ width: 375, maxWidth: 560, alignSelf: "center" }}
			>
				<Column of="section">
					{Platform.select({
						web: <WebComponentHeading />,
						android: <NativeComponentHeading />,
						ios: <NativeComponentHeading />,
					})}
					<Text>
						Un courriel a été envoyé ou sera envoyé sous peu. Il contient un
						lien de réinitialisation de ton mot de passe.
					</Text>

					<Button
						secondary
						text="Retourner à la page d'accueil"
						onClick={handleClick}
					/>
				</Column>
			</Section>
		</>
	)
}
