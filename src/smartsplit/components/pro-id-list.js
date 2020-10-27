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
import ProfessionalIdentityModel from "../../mobX/models/settings/ProfessionalIdentityModel"
const IdFields = observer((props) => {
	const model: ProfessionalIdentityModel = props.model
	const ids = toJS(model.ids.value)
	const lastProId = ids.length % 2 === 1 ? ids.pop() : null
	const rows = []
	let i = 0
	for (; i < ids.length; i += 2) {
		rows.push(
			<Platform web={Row} native={Column} of="component" key={i} flex>
				<TextField
					label={ids[i].name}
					value={ids[i].value}
					onChange={(v) => {
						ids.setItem(i, { name: ids[i].name, value: v })
					}}
				/>
				<TextField
					label={ids[i + 1].name}
					value={ids[i + 1].value}
					onChange={(v) => {
						ids.setItem(i, { name: ids[i + 1].name, value: v })
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
})
export const ProIdList = observer((props) => {
	const { t } = useTranslation()
	const { description } = props
	const model = useStorePath("settings", "profile", "professional_identity")
	const [modalVisible, setModalVisible] = useState(false)
	const ids = model.ids
	const proIds = ids.value
	console.log(toJS(proIds))

	return (
		<Label {...props}>
			<Column of="component">
				{description && <Paragraph>{description}</Paragraph>}
				<Row>
					{/*<Column padding="component" layer="left_overground" />*/}
					<Column of="group">
						{proIds && <IdFields model={model} />}
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
