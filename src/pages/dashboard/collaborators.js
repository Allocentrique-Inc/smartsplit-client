import React, { useState, useRef } from "react"
import { View, TouchableWithoutFeedback } from "react-native"
import { Row, Column, Section, Group, Flex, Hairline } from "../../layout"
import { Heading } from "../../text"
import { TabBar, Tab } from "../../widgets/tabs"
import LogoAddRound from "../../svg/add-round"

import { AddCollaboratorModal } from "../../smartsplit/collaborators/AddCollaboratorsModal"

export default function CollaboratorsPage() {
	const [modalOpen, setModal] = useState(false)

	return (
		<>
			<AddCollaboratorModal
				visible={modalOpen}
				onRequestClose={() => setModal(false)}
			/>

			<Group of="group">
				<Row of="component">
					<Heading level="2">Mes collaborateurs</Heading>
					<Flex />
					<TouchableWithoutFeedback
						onPress={() => setModal(true)}
						accessibilityRole="button"
					>
						<View>
							<LogoAddRound size="large" />
						</View>
					</TouchableWithoutFeedback>
				</Row>

				<TabBar>
					<Tab key="tab1" title="Atistes" default>
						<Column of="none" spacer={Hairline}></Column>
					</Tab>
					<Tab key="tab2" title="Groupes de musique">
						<Column of="none" spacer={Hairline}></Column>
					</Tab>
					<Tab key="tab3" title="Éditeurs">
						<Column of="none" spacer={Hairline}></Column>
					</Tab>
				</TabBar>
				<Row>
					<Flex />
					<TouchableWithoutFeedback
						onPress={() => setModal(true)}
						accessibilityRole="button"
					>
						<View>
							<LogoAddRound size="xlarge" />
						</View>
					</TouchableWithoutFeedback>
					{/* Aucune différence entre large et xlarge ? */}
				</Row>
			</Group>
		</>
	)
}
