import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import TextField from "../../../forms/text"
import { Column, NoSpacer, Row, Section } from "../../../layout"
import IconFile from "../../../svg/icon-file"
import XIcon from "../../../svg/x"
import { Text } from "../../../text"

const Styles = StyleSheet.create({
	background: {
		backgroundColor: "#FAF8F9",
		borderRadius: 2,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	section: {
		margin: 0,
		paddingLeft: 20,
		marginTop: 20,
		boxShadow: "inset 2px 0px 0px #DCDFE1",
	},
})

export function AddFileInfo(props) {
	const { t } = useTranslation()
	const { file, onClearFile, ...nextProps } = props
	const [fileName, setFileName] = useState(file.name)
	const handleClickClear = () => {
		setFileName("")
		onClearFile()
	}

	return (
		<Column {...nextProps}>
			<Row flex={12} style={Styles.background}>
				<Column flex={1}>
					<IconFile />
				</Column>
				<Column flex={10}>
					<NoSpacer>
						<Text>{fileName}</Text>
					</NoSpacer>
				</Column>
				<Column flex={1} style={{ justifyContent: "flex-end" }}>
					<TouchableWithoutFeedback onPress={handleClickClear}>
						<View>
							<XIcon />
						</View>
					</TouchableWithoutFeedback>
				</Column>
			</Row>
			<Section style={Styles.section}>
				<Row>
					<Column flex={12}>
						<TextField label={t("protect:selection.customName")} />
					</Column>
				</Row>
				<Row>
					<Column flex={12}>
						<TextField
							label={t("protect:selection.fileCategory")}
							undertext={t("protect:selection.examplesCategories")}
						/>
					</Column>
				</Row>
				<Row>
					<Column flex={12}>
						<TextField
							label={t("protect:selection.heading3")}
							undertext={t("protect:selection.workingVersionDesc")}
						/>
					</Column>
				</Row>
			</Section>
		</Column>
	)
}
