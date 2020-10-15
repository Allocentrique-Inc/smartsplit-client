import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Label from "../../forms/label"
import { Paragraph } from "../../text"
import { Column, Row } from "../../layout"
import Button from "../../widgets/button"
import { Colors, Metrics } from "../../theme"
import { TextField } from "../../forms"
import { Platform } from "../../platform"
import { CheckBox } from "../../forms"
import PlusCircle from "../../svg/plus-circle"
import { observer } from "mobx-react"
import { useStorePath } from "../../mobX"
import AddProIdModal from "../user/AddProIdModal"

export const ProIdList = observer((props) => {
	const { t } = useTranslation()
	const { description } = props
	const model = useStorePath("settings", "profile", "identifiers")
	const [modalVisible, setModalVisible] = useState(false)
	const ids = model.ids
	const proIds = ids.value
	console.log(toJS(proIds))
	function renderList() {
		const lastProId = proIds.length % 2 === 1 ? proIds.pop() : null
		const rows = []
		let i = 0
		for (; i < proIds.length; i += 2) {
			rows.push(
				<Platform web={Row} native={Column} of="component" key={i}>
					<TextField
						label={proIds[i].name}
						value={proIds[i].value}
						onChange={(v) => {
							ids.setItem(i, { name: proIds[i].name, value: v })
						}}
					/>
					<TextField
						label={proIds[i + 1].name}
						value={proIds[i + 1].value}
						onChange={(v) => {
							ids.setItem(i, { name: proIds[i + 1].name, value: v })
						}}
					/>
				</Platform>
			)
		}

		if (!!lastProId) {
			rows.push(
				<Column
					of="component"
					key={i + 1}
					style={
						Platform.web
							? { width: "50%", paddingRight: Metrics.spacing.inside }
							: null
					}
				>
					<TextField label={lastProId.name} value={lastProId.value} />
				</Column>
			)
		}

		return React.createElement(React.Fragment, {}, ...rows)
	}

	return (
		<Label {...props}>
			<Column of="component">
				{description && <Paragraph>{description}</Paragraph>}
				<Row>
					{/*<Column padding="component" layer="left_overground" />*/}
					<Column of="group">
						{proIds && renderList()}
						<Row>
							<Button
								secondaryWithIcon
								bold
								icon={<PlusCircle color={Colors.action} />}
								text={t("general:buttons.addProId")}
								onClick={() => setModalVisible(true)}
							/>
						</Row>
						<CheckBox
							label={t("general:checkbox.makePublic")}
							field={model.public}
						/>
					</Column>
				</Row>
			</Column>
			<AddProIdModal
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			/>
		</Label>
	)
})
