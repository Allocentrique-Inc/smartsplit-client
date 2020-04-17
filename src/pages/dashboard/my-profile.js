import React, { useState, useEffect } from "react"
import { Platform } from "react-native"
import { Group, Hairline, Flex, Row } from "../../layout"
import { Heading } from "../../text"
import TypographyStyles from "../../styles/typography"
import { Colors } from "../../theme"
import { Text } from "../../text"
import { TextField } from "../../forms"
import Button from "../../widgets/button"
import ChangePasswordModal from "./ChangePasswordContainer"

export default function MyProfilePage() {
	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	return (
		<Group of="component">
			<Row of="component">
				<Flex>
					<Heading level="2">Mon profil</Heading>
				</Flex>
				<Button tertiary text="Sauvegarder" />
			</Row>

			<Hairline />

			<TextField label="Prénom légal" placeholder="Prénom" />

			<TextField
				label="Second prénom légal"
				label_hint={<Text secondary>Optionnel</Text>}
				placeholder="Second prénom"
			/>

			<TextField label="Nom légal" placeholder="Nom" />

			<TextField
				label="Nom d'artiste"
				label_hint={<Text secondary>Optionnel</Text>}
				placeholder="Nom d'artiste"
				undertext={
					<>
						<Text small>Par exemple,</Text>
						<Text italic small>
							{" "}
							Jay-Z
						</Text>
						<Text small> est le nom d’artiste de</Text>
						<Text italic small>
							{" "}
							Shawn Corey Carter
						</Text>
						.
					</>
				}
			/>

			<Row of="component">
				<Flex>
					<Heading level="2">Sécurité</Heading>
				</Flex>
			</Row>

			<Hairline />
			<Heading level="4">Mot de passe</Heading>
			<Row of="component">
				<Button
					secondary
					text="Changer le mot de passe"
					onClick={() => {
						setChangePasswordModalOpened(true)
					}}
					size={buttonSize}
					style={Platform.OS !== "web" && { flex: 1 }}
				/>
				{Platform.OS === "web" && <Flex />}
			</Row>

			{changePasswordModalOpened && (
				<ChangePasswordModal
					onRequestClose={() => setChangePasswordModalOpened(false)}
				/>
			)}
		</Group>
	)
}
