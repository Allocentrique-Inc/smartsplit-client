import React from "react"
import { useHistory } from "react-router-dom"
import { Column } from "../../layout"
import { Heading, Paragraph } from "../../text"
import Button from "../../widgets/button"
import { Colors } from "../../theme"
import PublicPageLayout from "../../layout/public-page"

export default function PasswordSent(props) {
	let history = useHistory()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"
	const navigateToLogin = () => history.push("/auth/login")

	return (
		<PublicPageLayout
			navigation={
				<>
					<Text secondary>Déjà Membre ?</Text>
					<Button
						tertiary
						text="Ouvrir une session"
						onClick={navigateToLogin}
					/>
					<Button secondary text="English" />
				</>
			}
			of="group"
		>
			<Column of="component">
				<Heading level="1">Courriel envoyé.</Heading>
				<Paragraph>
					Un courriel a été envoyé ou sera envoyé sous peu. Il contient un lien
					de réinitialisation de ton mot de passe.
				</Paragraph>
			</Column>

			<Button
				secondary
				style={{ borderColor: Colors.stroke }}
				text={
					<Text link heavy>
						Retourner à la page d'accueil
					</Text>
				}
				onClick={navigateToLogin}
				size={buttonSize}
			/>
		</PublicPageLayout>
	)
}
