import React, { useState } from "react"
import { View, TouchableWithoutFeedback } from "react-native"
import moment from "moment"
import { Row, Column, Section, Group, Flex, Hairline } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { DialogModal } from "../../widgets/modal"
import { TabBar, Tab } from "../../widgets/tabs"
import { Button, RoundButton } from "../../widgets/button"
import LogoAddRound from "../../../assets/svg/add-round"

export default function MyCollaboratorsPage() {
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

export function AddCollaboratorModal(props) {
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title="Ajouter un collaborateur"
			buttons={
				<>
					<Button tertiary text="Annuler" onClick={props.onRequestClose} />
					<Button text="C'est parti !" />
				</>
			}
		>
			<Group
				of="group"
				style={{ width: 375, maxWidth: 560, alignSelf: "center" }}
			></Group>
		</DialogModal>
	)
}
