import React, {useState} from "react"
import { View, StyleSheet } from "react-native"
import moment from "moment"

import { Row, Column, Section, Group, Flex, Hairline }   from "../../layout"
import { Heading, Paragraph, Text }   from "../../text"
import { TabBar, Tab }     from "../../widgets/tabs"
import Button              from "../../widgets/button"
import ProgressBar         from "../../widgets/progress-bar"
import { DialogModal }     from "../../widgets/modal"
import { TextField }       from "../../forms"

import { Colors, Metrics } from "../../theme"
import ImageIcon           from "../../svg/image"
import OverflowMenuIcon    from "../../svg/overflow-menu"


const Styles = StyleSheet.create({
	row: {
		height: Metrics.size.xlarge,
		flexDirection: "row",
		alignItems: "center",
	},
	
	row_cover: {
		width: Metrics.size.medium,
		height: Metrics.size.medium,
		backgroundColor: Colors.background.hell,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: Metrics.borderRadius.forms,
		margin: Metrics.spacing.component,
	},

	row_title: {
		flex: 1,
	},

	row_progress: {
		width: 300,
		marginRight: Metrics.spacing.group,
	},
})

function MediaWorkRow(props) {
	const dateRel = moment(props.creationDate).fromNow()
	
	return <View style={[Styles.row, props.style]}>
		<View style={Styles.row_cover}>
			<ImageIcon color={Colors.stroke}/>
		</View>
		
		<Column style={Styles.row_title}>
			<Row of="tiny" style={{alignItems: "center"}}>
				<Text heavy>{props.title}</Text>
				<Text small>par {props.artist}</Text>
			</Row>
			<Text secondary small>Modifié {dateRel} - Partagée avec ( ) ( ) ( )</Text>
		</Column>

		<Column of="inside" style={Styles.row_progress}>
			<Row of="tiny">
				<Text small heavy>Étape {props.step} de {props.steps}</Text>
				<Text small secondary>{props.stepName} - complété à {props.progress}%</Text>
			</Row>
			<ProgressBar size="tiny" progress={props.progress} />
		</Column>

		<Button secondary text="Continuer" onClick={() => Alert.alert("Test!")} />
		<Button icon={<OverflowMenuIcon />} />
	</View>
}

export function CreateWorkModal(props) {
	return <DialogModal
		visible={props.visible}
		onRequestClose={props.onRequestClose}
		title="Créer une pièce musicale"
		buttons={<>
			<Button tertiary text="Annuler" onClick={props.onRequestClose} />
			<Button text="C'est parti!" />
		</>}
	>
		<Group of="component">
			<Paragraph>Ceci est un example de boîte de dialogue (modale) pour permettre l'ajout d'une oeuvre au système. Je manque déjà d'inspiration pour ce texte inutile mais je dois continuer car je veux au moins quelques lignes pour que ma modale air l'air de quelque chose.</Paragraph>
			<TextField
				label="Titre de la pièce musicale"
				undertext="Ne pas include de « featuring » dans le titre"
			/>
		</Group>
	</DialogModal>
}

export default function MyWorksPage() {
	const [modalOpen, setModal] = useState(false)

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
				<Tab key="tab1" title="Mes ajouts" default>
					<Column of="none" spacer={Hairline}>
						{demo1}
						{demo2}
						{demo3}
						{demo1}
						{demo2}
						{demo3}
					</Column>
				</Tab>
				<Tab key="tab2" title="Partagées avec moi">
					<Column of="none" spacer={Hairline}>
						{demo1}
						{demo2}
						{demo3}
					</Column>
				</Tab>
			</TabBar>
		</Group>
	</>
}
