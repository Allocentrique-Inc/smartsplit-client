import React, { useState } from "react"
import { Platform, View, ScrollView } from "react-native"
import { Text, Heading, Paragraph } from "../../text"
import { Group, Row, Column, Flex, Section } from "../../layout"
import { TextField } from "../../forms"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import PublicNavBarWeb from "../../smartsplit/public/navbar-web"
import { Metrics, Colors } from "../../theme"
import UserAvatar from "../../smartsplit/user/avatar"
import PenIcon from "../../svg/pen"

export default function NewUser(props) {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const initials = (firstName[0] || "") + (lastName[0] || "")

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const NameFields = Platform.OS === "web" ? Row : Column

	return (
		<>
			<ScrollView>
				{Platform.OS === "web" && (
					<PublicNavBarWeb>
						{Platform.OS === "web" && (
							<>
								<Button tertiary text="Passer cette étape" />
								<Button secondary text="English" />
							</>
						)}
					</PublicNavBarWeb>
				)}

				<Group
					of={Platform.OS === "web" ? "group" : "component"}
					style={
						Platform.OS === "web" && { maxWidth: 464, alignSelf: "center" }
					}
				>
					<Heading level="1">
						Bienvenue ! {"\n"}
						Parle-nous un peu de toi.
					</Heading>
					<Column of="section">
						<Paragraph>Commence à créer ton profil.</Paragraph>

						<Row>
							<UserAvatar size="huge" />
							<View style={{ margin: 50 }}>
								<PenIcon />
							</View>
						</Row>
					</Column>

					<NameFields of="group">
						<TextField
							label="Mon prénom légal"
							placeholder="Prénom(s) usuel(s)"
							undertext={
								<Text italic small>
									Madonna Louise
								</Text>
							}
							value={firstName}
							onChangeText={setFirstName}
						/>

						<TextField
							label="Mon nom légal"
							placeholder="Nom de famille usuel"
							undertext={
								<Text italic small>
									Ciccone
								</Text>
							}
							value={lastName}
							onChangeText={setLastName}
						/>
					</NameFields>

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

					<Row align="right">
						<Button
							text="C'est parti !"
							style={Platform.OS !== "web" && { flex: 1 }}
							size={buttonSize}
						/>
					</Row>
					{Platform.OS !== "web" && (
						<Row>
							<Button tertiary text="Passer cette étape" />
						</Row>
					)}
				</Group>
			</ScrollView>
		</>
	)
}
