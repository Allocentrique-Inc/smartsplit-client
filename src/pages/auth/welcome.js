import React, { useState } from "react"

import { Heading, UnderText, ItalicUnderText } from "../../text"
import { Group, Hairline, Row } from "../../layout"
import { Text } from "../../text"
import { TextField } from "../../forms"
import Button from "../../widgets/button"

export default function Welcome(props) {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const initials = (firstName[0] || "") + (lastName[0] || "")

	return <Group of="group">
		<Heading level="2">Bienvenue ! Parle-nous un peu de toi.</Heading>
		
		<Hairline />
		
		<TextField
			label="Mon prénom légal"
			placeholder="Prénom"
			value={firstName}
			onChangeText={setFirstName}
		/>
		
		<TextField
			label="Mon nom légal"
			placeholder="Nom"
			value={lastName}
			onChangeText={setLastName}
		/>
		
		<TextField
			label="Nom d'artiste"
			label_hint={<Text secondary>Optionnel</Text>}
			placeholder="Nom d'artiste"
			undertext={<>
				<Text small>Par exemple,</Text>
				<Text italic small> Jay-Z</Text>
				<Text small> est le nom d’artiste de</Text>
				<Text italic small> Shawn Corey Carter</Text>.
			</>}
		/>
		
		<Button	text="C'est parti !" />
		<Button tertiary text="Passer cette étape" />
	</Group>
}
