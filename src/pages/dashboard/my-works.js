import React from "react"
import { View, StyleSheet } from "react-native"
import { Row, Column, Section, Hairline }   from "../../views/layout"
import { Heading, Text } from "../../views/text"
import { TabBar, Tab }   from "../../components/tabs"
import Button            from "../../components/button"
import ProgressBar       from "../../components/progress-bar"
import moment from "moment"

import { Colors, Metrics } from "../../theme"
import ImageIcon from "../../components/svg/image"
import OverflowMenuIcon from "../../components/svg/overflow-menu"


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

		<Button secondary text="Continuer" />
		<Button tertiary icon={<OverflowMenuIcon />} />
	</View>
}

export default function MyWorksPage() {
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

	return <Section of="group">
		<Heading level="2">Mes pièces musicales </Heading>
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
	</Section>
}
