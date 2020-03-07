import React from "react"
import { View, StyleSheet } from "react-native"
import { Row, Column, Section }   from "../../views/layout"
import { Heading, Text } from "../../views/text"
import { TabBar, Tab }  from "../../components/tabs"
import moment from "moment"

import { Colors, Metrics } from "../../theme"
import ImageIcon from "../../components/svg/image"

const Styles = StyleSheet.create({
	row: {
		borderBottomWidth: 1, // TODO: of="none" spacer=<Hairline />
		borderColor: Colors.stroke,
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
	}
})

function MediaWorkRow(props) {
	const dateRel = moment(props.creationDate).fromNow()
	
	return <View style={Styles.row}>
		<View style={Styles.row_cover}>
			<ImageIcon color={Colors.stroke}/>
		</View>
		
		<Column>
			<Row of="tiny" style={{alignItems: "center"}}>
				<Text heavy>{props.title}</Text>
				<Text small>par {props.artist}</Text>
			</Row>
			<Text secondary small>Modifié {dateRel} - Partagée avec ( ) ( ) ( )</Text>
		</Column>
	</View>
}

export default function MyWorksPage() {
	return <Section of="group">
		<Heading level="2">Mes pièces musicales </Heading>
		<TabBar>
			<Tab key="tab1" title="Mes ajouts" default>
				<MediaWorkRow title="Fantôme" artist="Debbie Tebbs" />
				<MediaWorkRow title="Ma première chanson" artist="Valaire" />
				<MediaWorkRow title="Sandbox Memories" artist="Inscience, Ghostnaut" />
				<MediaWorkRow title="Votre première chanson" artist="Valaire" />
				<MediaWorkRow title="Sandbox Memories" artist="Inscience, Ghostnaut" />
				<MediaWorkRow title="Votre première chanson" artist="Valaire" />
			</Tab>
			<Tab key="tab2" title="Partagées avec moi">
				<MediaWorkRow title="Votre première chanson" artist="Valaire" />
				<MediaWorkRow title="Sandbox Memories" artist="Inscience, Ghostnaut" />
				<MediaWorkRow title="Votre première chanson" artist="Valaire" />
			</Tab>
			<Tab key="tab3" title="Onglet 3">
				<MediaWorkRow title="Votre première chanson" artist="Valaire" />
				<MediaWorkRow title="Votre première chanson" artist="Valaire" />
				<MediaWorkRow title="Votre première chanson" artist="Valaire" />
			</Tab>
		</TabBar>
	</Section>
}
