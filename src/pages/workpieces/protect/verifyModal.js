import React, { useState } from "react"
import { Metrics } from "../../../theme"
import { StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { Column, Row } from "../../../layout"
import { CheckBoxGroup, CheckBoxGroupButton } from "../../../forms/checkbox"
import { Text } from "../../../text"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	textCheckbox: {
		paddingLeft: Metrics.spacing.small,
	},
	fieldContent: {
		fontWeight: "bold",
		flex: 7,
	},
})

export function VerifyModal(props) {
	const { t } = useTranslation()
	const [selection, setSelection] = useState(props.selection)
	const model = props.model
	console.log("model", model)
	const sendDataSelection = (val) => {
		setSelection(val)
		props.parentCallback(selection)
	}

	return (
		<CheckBoxGroup flex={12} selection={selection} onChange={sendDataSelection}>
			<Row>
				<Column flex={1}>
					<CheckBoxGroupButton value="1" />
				</Column>
				<Column flex={11}>
					<Text
						style={Styles.textCheckbox}
						dangerouslySetInnerHTML={{
							__html: t("protect:verify1", {
								firstName: `${model.listedBy.initialValue.firstName} ${model.listedBy.initialValue.lastName}`,
							}),
						}}
					/>
				</Column>
			</Row>

			<Row>
				<Column flex={1}>
					<CheckBoxGroupButton value="2" />
				</Column>
				<Column flex={11}>
					<Text
						style={Styles.textCheckbox}
						dangerouslySetInnerHTML={{
							__html: t("protect:verify2", {
								file: model.sourceFile.initialValue,
							}),
						}}
					/>
				</Column>
			</Row>

			<Row>
				<Column flex={1}>
					<CheckBoxGroupButton value="3" />
				</Column>
				<Column flex={11}>
					<Text
						style={Styles.textCheckbox}
						dangerouslySetInnerHTML={{
							__html: t("protect:verify3", {
								song: model.sourceFile.initialValue,
							}),
						}}
					/>
				</Column>
			</Row>
		</CheckBoxGroup>
	)
}
export default VerifyModal
