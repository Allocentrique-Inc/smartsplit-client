import React, { useState, useEffect } from "react"
import { Platform, View, ScrollView } from "react-native"
import { Text, Heading, Paragraph } from "../../text"
import { useHistory } from "react-router-dom"
import { Group, Row, Column, Flex, Section } from "../../layout"
import { TextField } from "../../forms"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import PublicNavBarWeb from "../../smartsplit/public/navbar-web"
import { Metrics, Colors } from "../../theme"
import UserAvatar from "../../smartsplit/user/avatar"
import PenIcon from "../../svg/pen"
import { Redirect } from "react-router"

import { notEmptyValidator } from "../../../helpers/validators"

export default function NewUser({ state, updateUser, user, ...props }) {
	let history = useHistory()

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const initials = (firstName[0] || "") + (lastName[0] || "")

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const NameFields = Platform.OS === "web" ? Row : Column

	const [hasSubmitted, setHasSubmitted] = useState(false)
	const submitSuccess = !state.isLoading && !state.error && state.data
	const canSubmit =
		notEmptyValidator(firstName) &&
		notEmptyValidator(lastName) &&
		!state.isLoading

	const handleSubmit = () => {
		if (!canSubmit) return false
		updateUser({
			user_id: user.user_id,
			firstName,
			lastName,
			locale: user.locale,
		})
	}

	if (submitSuccess) return <Redirect to="/" />

	return (
		<>
			<ScrollView>
				{Platform.OS === "web" && (
					<PublicNavBarWeb>
						{Platform.OS === "web" && (
							<>
								<Button
									tertiary
									text="Passer cette étape"
									onClick={() => history.push("/")}
								/>
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
							disabled={!canSubmit}
							onClick={handleSubmit}
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
