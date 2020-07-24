import React from "react"
import { useHistory } from "react-router"
import { useCurrentWorkpiece } from "../context"
import { Column, Row, Flex, Hairline } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Layout from "../layout"
import Button from "../../../widgets/button"
import ProgressBar from "../../../widgets/progress-bar"
import { CheckBox, RadioGroup, RadioGroupButton } from "../../../forms"
import UserAvatar from "../../../smartsplit/user/avatar"
import Help from "../../../svg/help-circle-full"

export default function CopyrightPage() {
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()

	function saveAndQuit() {
		history.push("/dashboard/")
	}

	return (
		<Layout
			workpiece={workpiece}
			path={["Partage de droits", "Droits d'auteur"]}
			actions={
				<Button tertiary text="Sauvegarder et fermer" onClick={saveAndQuit} />
			}
			formNav={
				<>
					<Row flex={1}>
						<Button secondary text="Retour" />
						<Flex />
						<Button primary text="Continuer" />
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<CopyrightForm />
		</Layout>
	)
}

export function CopyrightForm() {
	return (
		<Row>
			<Column of="group" flex={1}>
				<Column of="component">
					<Text action>(c) DROITS D'AUTEUR</Text>
					<Heading level={1}>Qui a inventé cette pièce musicale</Heading>
					<Paragraph>
						Sépare ici le droit d’auteur entre les créateurs, c’est à dire les
						auteurs des <b>paroles</b>, les compositeurs et les arrangeurs de la{" "}
						<b>musique</b>. Il est d’usage de partager le droit d’auteur
						équitablement. Mais tu peux faire autrement.
					</Paragraph>
				</Column>

				<RadioGroup>
					<Column of="component">
						<RadioGroupButton value="equal" label="Partager de façon égale" />
						<RadioGroupButton
							value="by-roles"
							label="Partager selon les rôles"
						/>
						<RadioGroupButton value="manual" label="Gérer manuellement" />
					</Column>
				</RadioGroup>

				<Column of="component">
					<Card />
					<Card />
					<Card />
				</Column>
			</Column>
			<Column flex={1} align="center">
				<Pie />
			</Column>
		</Row>
	)
}

export function Card() {
	return (
		<Row layer="underground" of="component" padding="component">
			<Column>
				<UserAvatar initials="XX" size="small" />
				<Flex />
				<Help />
			</Column>
			<Column of="component" flex={1}>
				<Text bold>
					Inscience <b>(toi)</b>
				</Text>
				<Hairline />
				<Row>
					<Flex flex={1}>
						<CheckBox label="Auteur" />
					</Flex>
					<Flex flex={1}>
						<CheckBox label="Compositeur" />
					</Flex>
				</Row>
				<Row>
					<Flex flex={1}>
						<CheckBox label="Adaptateur" />
					</Flex>
					<Flex flex={1}>
						<CheckBox label="Arrangeur" />
					</Flex>
				</Row>
				<Row valign="center" of="component">
					<ProgressBar size="xsmall" progress={33} style={{ flex: 1 }} />
					<Text bold>33%</Text>
				</Row>
			</Column>
		</Row>
	)
}

function Pie() {
	return (
		<svg
			width="384"
			height="384"
			viewBox="0 0 384 384"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask
				id="mask0"
				mask-type="alpha"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="384"
				height="384"
			>
				<circle cx="192" cy="192" r="192" fill="#C4C4C4" />
			</mask>
			<g mask="url(#mask0)">
				<path
					d="M-25 -9H409V362.5L193 192H-25V-9Z"
					fill="#93E9E4"
					stroke="white"
					stroke-width="2"
				/>
				<path
					d="M-16 -8.5H192V187.75L-16 384V-8.5Z"
					fill="#C6F3B6"
					stroke="white"
					stroke-width="2"
				/>
				<path
					d="M192 192L400 350V390.5H-33.5L192 192Z"
					fill="#F8EBA3"
					stroke="white"
					stroke-width="2"
				/>
			</g>
			<circle cx="192" cy="192" r="96" fill="white" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M143.999 192C143.999 165.49 165.49 144 191.999 144C218.509 144 239.999 165.49 239.999 192C239.999 218.51 218.509 240 191.999 240C165.49 240 143.999 218.51 143.999 192ZM191.999 133.333C159.599 133.333 133.333 159.599 133.333 192C133.333 224.401 159.599 250.667 191.999 250.667C224.4 250.667 250.666 224.401 250.666 192C250.666 159.599 224.4 133.333 191.999 133.333ZM179.77 204.228C173.017 197.475 173.017 186.525 179.77 179.771C186.524 173.017 197.474 173.017 204.228 179.771C206.311 181.854 209.688 181.854 211.771 179.771C213.853 177.688 213.853 174.311 211.771 172.228C200.851 161.309 183.147 161.309 172.228 172.228C161.309 183.148 161.309 200.852 172.228 211.771C183.147 222.69 200.851 222.69 211.771 211.771C213.853 209.688 213.853 206.311 211.771 204.228C209.688 202.146 206.311 202.146 204.228 204.228C197.474 210.982 186.524 210.982 179.77 204.228Z"
				fill="#DCDFE1"
			/>
		</svg>
	)
}
