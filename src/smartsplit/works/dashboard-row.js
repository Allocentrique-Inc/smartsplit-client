import React from "react"
import moment from "moment"
import { View } from "react-native"
import { Column, Row } from "../../layout"
import { Text } from "../../text"
import { Button } from "../../widgets/button"
import ProgressBar from "../../widgets/progress-bar"
import Cover from "../media/cover"
import WorkStyles from "./styles"

import OverflowMenuIcon from "../../../assets/svg/overflow-menu"

export default function MediaWorkRow(props) {
	const dateRel = moment(props.creationDate).fromNow()

	return (
		<View style={[WorkStyles.dashboard_row, props.style]}>
			<Cover style={WorkStyles.dashboard_row_cover} />

			<Column style={WorkStyles.dashboard_row_title}>
				<Row of="tiny" style={{ alignItems: "center" }}>
					<Text heavy>{props.title}</Text>
					<Text small>par {props.artist}</Text>
				</Row>
				<Text secondary small>
					Modifié {dateRel} - Partagée avec ( ) ( ) ( )
				</Text>
			</Column>

			<Column of="inside" style={WorkStyles.dashboard_row_progress}>
				<Row of="tiny">
					<Text small heavy>
						Étape {props.step} de {props.steps}
					</Text>
					<Text small secondary>
						{props.stepName} - complété à {props.progress}%
					</Text>
				</Row>
				<ProgressBar size="tiny" progress={props.progress} />
			</Column>

			<Button secondary text="Continuer" onClick={() => Alert.alert("Test!")} />
			<Button icon={<OverflowMenuIcon />} />
		</View>
	)
}
