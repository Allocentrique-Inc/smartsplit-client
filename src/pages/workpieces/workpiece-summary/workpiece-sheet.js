import React from "react"
import { useTranslation } from "react-i18next"
import { Row, Flex, Hairline, Spacer, Column } from "../../../layout"
import { SheetNavbar, SheetHeader } from "./workpiece-sheet-layout"
import { useCurrentWorkpiece } from "../context"

export default function WorkpieceSheet(props) {
	const [t] = useTranslation()
	const workpiece = useCurrentWorkpiece()
	return (
		<>
			<SheetNavbar />
			<Hairline />
			<Row layer="underground">
				<Column of="group" flex={1}>
					<Column of="component">
						<SheetHeader
							artistName="Inscience"
							albumTitle="Album Name"
							songTitle="Love You Baby"
							//path={["Inscience", "Album Name", "Love You Baby"]}
						/>
					</Column>
				</Column>
			</Row>
		</>
	)
}
