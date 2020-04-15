import React, { useState } from "react"
import { Platform } from "react-native"
import { useHistory } from "react-router-dom"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Section, Column, Row, Group } from "../../layout"
import PublicNavBarWeb from "../../smartsplit/public/navbar-web"

export default function PasswordSent(props) {
	let history = useHistory()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	return (
		<>
			{Platform.OS === "web" && (
				<PublicNavBarWeb>
					<Text secondary>Déjà Membre ?</Text>
					<Button
						tertiary
						text="Ouvrir une session"
						onClick={() => history.push("/auth/login")}
					/>
					<Button secondary text="English" />
				</PublicNavBarWeb>
			)}

			<Scrollable>
				<Group
					of="section"
					style={
						Platform.OS === "web" && { maxWidth: 464, alignSelf: "center" }
					}
				>
					<Column of="group">
						<Heading level="1">Courriel envoyé.</Heading>
						<Paragraph>
							Un courriel a été envoyé ou sera envoyé sous peu. Il contient un
							lien de réinitialisation de ton mot de passe.
						</Paragraph>
					</Column>

					<Button
						secondary
						style={{ borderColor: Colors.secondary }}
						text={
							<Text link heavy>
								Retourner à la page d'accueil
							</Text>
						}
						onClick={() => history.push("/auth/login")}
						size={buttonSize}
					/>
				</Group>
			</Scrollable>
		</>
	)
}
