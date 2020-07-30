import React from "react"
import { useTranslation } from "react-i18next"
import { Row, Flex, Hairline, Spacer, Column } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import {
	SheetNavbar,
	SheetHeader,
	WorkpieceSheetSections,
} from "./workpiece-sheet-layout"
import { useCurrentWorkpiece } from "../context"

export default function WorkpieceSheet(props) {
	const [t] = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const creationDate = "Date de création"

	return (
		<>
			<SheetNavbar />
			<Hairline />
			<Row layer="underground">
				<Column of="group" flex={1}>
					<Row style={{ alignSelf: "center" }}>
						<SheetHeader
							artistName="Inscience"
							albumTitle="Album Name"
							songTitle="Love You Baby"
							//path={["Inscience", "Album Name", "Love You Baby"]}
							tag="Remix"
							featuredArtist="Featured Artist"
						/>
					</Row>
				</Column>
			</Row>
			<WorkpieceSheetSections
				categoryLine={props.date}
				creationDateLine={props.creationDate}
				authorsLine={props.authors}
				composersLine={props.composers}
				mixersLine={props.mixers}
				editorsLine={props.editors}
			/>
		</>
	)
}
