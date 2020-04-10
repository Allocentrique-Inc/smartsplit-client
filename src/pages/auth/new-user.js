import React, { useState } from "react"
import { Platform, 
		View, 
		ScrollView }  	   from "react-native"
import { Heading, 
		Paragraph } 	   from "../../text"
import { Group, 
		Row, 
		Column, 
		Flex, 
		Section } 		   from "../../layout"
import { Text } 		   from "../../text"
import { TextField } 	   from "../../forms"
import Button 			   from "../../widgets/button"
import PublicNavBar 	   from '../../smartsplit/public/navbar'
import { Metrics, Colors } from "../../theme"
import UserAvatar 		   from "../../smartsplit/user/avatar"
import PenIcon			   from "../../svg/pen"


export const WebComponentNewUserNavbar = () => (
	<PublicNavBar>
        <Button tertiary text="Passer cette étape" />
        <Button secondary text="English" />
    </PublicNavBar>
)

export function WebComponentNewUser() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const initials = (firstName[0] || "") + (lastName[0] || "")
	return <>

		<Section of="group" style={{width: 560, alignSelf: "center"}}>
			<Heading level="1">Bienvenue ! Parle-nous un peu de toi.</Heading>
			<Paragraph>Commence à créer ton profil.</Paragraph>
	<Row>
			<UserAvatar size="huge" />
			<View style={{margin: 50}}>
				<PenIcon />
			</View>
	</Row>
		
			<Column of="component">
			<Row of="component">
				<TextField
					label="Mon prénom légal"
					placeholder="Prénom(s) usuel(s)"
					undertext={<Text italic small>Madonna Louise</Text>}
					value={firstName}
					onChangeText={setFirstName}
				/>

				<TextField
					label="Mon nom légal"
					placeholder="Nom de famille usuel"
					undertext={<Text italic small>Ciccone</Text>}
					value={lastName}
					onChangeText={setLastName}
				/>
			</Row>
			</Column>

			<TextField
				label="Mon nom d'artiste"
				placeholder=""
				undertext={<>
					<Text small>Par exemple,</Text>
					<Text italic small> Madonna</Text>
					<Text small> est le nom d’artiste de</Text>
					<Text italic small> Madonna Louise Ciccone</Text>.
				</>}
			/>
	
		</Section>
		</>

}

export function NativeComponentNewUser() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const initials = (firstName[0] || "") + (lastName[0] || "")
	
	return <>
	
		<Section of="group" style={{width: 375, alignSelf: "center"}}>
			<Column of="group">
				
			<Heading level="3">Bienvenue ! Parle-nous un peu de toi.</Heading>
			<Paragraph>Commence à créer ton profil d'artiste.</Paragraph>

		<Row>
			<UserAvatar size="huge" />
			<View style={{margin: 50}}>
				<PenIcon />
			</View>
		</Row>
		
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
			</Column>
		</Section>

		</>
}

export default function NewUser(props) {

	return <>
	<ScrollView>
			{Platform.select({
				web: <WebComponentNewUserNavbar />,
        	})} 
			
			<Column >

		{Platform.select({
				web: <WebComponentNewUser />,
				android: <NativeComponentNewUser />,
				ios: <NativeComponentNewUser />
        	})} 
			</Column>
	</ScrollView>
			</>
}
