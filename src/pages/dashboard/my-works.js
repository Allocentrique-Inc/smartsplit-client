import React, {useState}    from "react"
import { useHistory }       from "react-router"
import { View, StyleSheet } from "react-native"

import { Row, Column, Group, Flex, Hairline } from "../../layout"
import { Heading  } from "../../text"
import { TabBar, Tab }         from "../../widgets/tabs"
import { Button } from "../../widgets/button"

import MediaWorkRow    from "../../smartsplit/works/dashboard-row"
import CreateWorkModal         from "../../smartsplit/works/create-work-modal"


export default function MyWorksPage() {
	const [modalOpen, setModal] = useState(false)

	return <>
		<CreateWorkModal
			visible={modalOpen}
			onRequestClose={() => setModal(false)}
		/>
		
		<Group of="group">
			<Row of="component">
				<Flex>
					<Heading level="2">Mes pièces musicales</Heading>
				</Flex>
				<Button primary text="Ajouter" onClick={() => setModal(true)} />
			</Row>

			<TabBar>
				<Tab key="my-works" title="Mes ajouts" default>
					<MyWorksTab />
				</Tab>
				
				<Tab key="shared-with-me" title="Partagées avec moi">
					<SharedWithMeTab />
				</Tab>
			</TabBar>
		</Group>
	</>
}

export function MyWorksTab(props) {
	return <Column of="none" spacer={Hairline}>
		{demo1}
		{demo2}
		{demo3}
		{demo1}
		{demo2}
		{demo3}
	</Column>
}

export function SharedWithMeTab(props) {
	return <Column of="none" spacer={Hairline}>
		{demo1}
		{demo2}
		{demo3}
	</Column>
}


const demo1 =
	<MediaWorkRow
		title="Fantôme"
		artist="Debbie Tebbs"
		creationDate="2019-11-04"
		step="2"
		steps="5"
		stepName="Partage des droits"
		progress="35"
	 />

const demo2 =
	<MediaWorkRow
		title="Sandbox Memories"
		artist="Inscience, Ghostnaut"
		creationDate="2018-05-18"
		step="4"
		steps="5"
		stepName="Protège ton oeuvre"
		progress="85"
	/>

const demo3 =
	<MediaWorkRow
		title="Votre première chanson"
		artist="Inscience, Ghostnaut"
		creationDate="2020-03-01"
		step="1"
		steps="5"
		stepName="Documente ton oeuvre"
		progress="0"
	/>
