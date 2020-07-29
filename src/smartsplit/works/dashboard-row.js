import React from "react"
import moment from "moment"
import { View } from "react-native"
import { useHistory } from "react-router"
import { useSubpath } from "../../appstate/react"
import { Column, Row } from "../../layout"
import { Text } from "../../text"
import { Button } from "../../widgets/button"
import ProgressBar from "../../widgets/progress-bar"
import AlbumArt from "../media/albumArt"
import WorkStyles from "./styles"

import OverflowMenuIcon from "../../svg/overflow-menu"

export default function MediaWorkRow(props) {
	const history = useHistory()
	const data = useSubpath(props.workpiece, "data")

	const dateRel = moment(data.creationDate).fromNow()
	function navigateToSummary() {
		history.push("/workpieces/" + data.workpiece_id)
	}

	return (
		<View style={[WorkStyles.dashboard_row, props.style]}>
			<AlbumArt style={WorkStyles.dashboard_row_cover} />

			<Column style={WorkStyles.dashboard_row_title}>
				<Row of="tiny" style={{ alignItems: "center" }}>
					<Text heavy>{data.title}</Text>
					<Text small>par {data.artist}</Text>
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

			<Button secondary text="Continuer" onClick={navigateToSummary} />
			<Button icon={<OverflowMenuIcon />} />
		</View>
	)
}
