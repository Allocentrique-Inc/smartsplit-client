import React from "react"
import { Group, Hairline, Flex, Row } from "../../layout"
import { Heading } from "../../text"
import TypographyStyles from "../../styles/typography"
import { Colors } from "../../theme"
import { Text } from "../../text"
import { TextField } from "../../forms"
import Button from "../../widgets/button"

export default function MyProfilePage() {
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
		</Group>
	)
}
