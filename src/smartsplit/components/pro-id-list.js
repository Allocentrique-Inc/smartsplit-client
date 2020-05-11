import React from "react"
import { useTranslation } from "react-i18next"
import Label from "../../forms/label"
import { Paragraph } from "../../text"
import { Column, Row, Spacer } from "../../layout"
import Button from "../../widgets/button"
import AddIcon from "../../../assets/svg/green-plus-circle.svg"
import { Metrics } from "../../theme"
import { TextField } from "../../forms"
import { Platform } from "../../platform"

export function ProIdList(props) {
	const { t } = useTranslation()
	const { proIds, description } = props

	function renderList() {
		const lastId = proIds.length % 2 === 1 ? proIds.pop() : null
		const rows = []
		for (let i = 0; i < proIds.length; i += 2) {
			rows.push(
				<Platform web={Row} native={Column} of="component" key={i}>
					<TextField label={proIds[i].name} value={proIds[i].value}/>
					<TextField label={proIds[i + 1].name} value={proIds[i + 1].value}/>
				</Platform>)
		}
		if (!!lastId) {
			rows.push(
				<Column
					of="component"
					style={Platform.web ? {width: "50%", paddingRight: Metrics.spacing.inside} : null}>
					<TextField
						label={lastId.name}
						value={lastId.value}/>
				</Column>
			)
		}
		return rows
	}

	return (
		<Label {...props}>
			<Column of="component">
				{description && <Paragraph>{description}</Paragraph>}
				<Row >
					<Column padding="component" layer="left_overground"/>
					<Column of="group">
						{proIds && renderList()}
						<Row>
							<Button
								secondaryWithIcon
								bold
								icon={<AddIcon/>}
								text={t("general:buttons.addProId")}
							/>
						</Row>
					</Column>
				</Row>
			</Column>
		</Label>
	)
}
