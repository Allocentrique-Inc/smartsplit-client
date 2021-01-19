import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"
import { useCurrentWorkpiece } from "../context"
import { Column, Row, Flex, Hairline } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import { observer } from "mobx-react"
import { RadioGroup, RadioGroupButton, FileField } from "../../../forms"
import TextField from "../../../forms/text"
import SelectionModel from "../../../mobX/models/workpieces/protect/SelectionModel"
import { useProtectModel } from "../../../mobX/hooks"
import { AddFileInfo } from "./addFileInfo"

const LimitFileSize = 262144000
const AcceptTypeUpLoad = ["pdf", "jpeg", "png", "wav", "mp3"]

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
	frame: {
		backgroundColor: Colors.background.underground,
	},
	frame_error: {
		borderWidth: 1,
		borderColor: Colors.error,
		borderStyle: "solid",
	},
	frame_yourself: {
		borderWidth: 1,
		borderColor: Colors.secondaries.teal,
	},
	option_text: {
		marginLeft: "8%",
	},
})

//Pour info genre dropdown use this

const SelectionPage = observer(() => {
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: SelectionModel = useProtectModel(workpieceId, "selection")
	const files = model.files.array // useCurrentWorkpiece("files", "$all")
	const [fileName, setFileName] = useState("")

	const onChangeRadioFile = (val) => {
		model.fileSelectedId.setValue(val)
		if (val != "0") {
			setFileName("")
		}
	}

	const onChangeFile = (val) => {
		let re = /(?:\.([^.]+))?$/
		let ext = re.exec(val.name)[1]
		if (AcceptTypeUpLoad.includes(ext) && parseInt(val.size) <= LimitFileSize) {
			model.fileSelectedId.setValue("0")
			setFileName(val)
		} else {
			alert(t("protect:selection.alertNoSuportFile").toString())
		}
	}
	return (
		<Row>
			<Column of="group" flex={5}>
				<Column of="section" flex={6}>
					<Column of="component">
						<Heading level={1}>{t("protect:selection:heading1")}</Heading>
						<Paragraph>{t("protect:selection:para1")}</Paragraph>
						<Paragraph>
							{t("protect:selection:para2")} <i>hash</i>.
						</Paragraph>
					</Column>

					<Column of="component">
						<Heading level={3}>{t("protect:selection:heading2")}</Heading>

						<RadioGroup
							name="file_id"
							value={model.fileSelectedId.value}
							onChange={onChangeRadioFile}
						>
							<Column of="inside">
								{files.map((file) => (
									<RadioGroupButton
										key={file.fileId}
										value={file.fileId}
										label={file.name}
									/>
								))}

								<RadioGroupButton value="0">
									<Flex>
										<FileField
											name="file_upload"
											label={t("protect:selection:addFileLabel")}
											undertext={t("protect:selection:underText")}
											onFileChange={onChangeFile}
											file={fileName}
										/>
										{fileName !== "" && (
											<AddFileInfo
												style={{ marginTop: 20 }}
												onClearFile={() => {
													setFileName("")
													model.fileSelectedId.setValue("")
												}}
												file={fileName}
												workpieceId={workpieceId}
											/>
										)}
									</Flex>
								</RadioGroupButton>
							</Column>
						</RadioGroup>
					</Column>
				</Column>
			</Column>
			<Flex />
			<Column of="group" flex={5}>
				<Column of="component" padding="component" layer="underground">
					<Column of="inside">
						<Text small bold tertiary>
							{t("protect:selection:help")}
						</Text>
						<Hairline />
					</Column>
					<Heading level={4}>{t("protect:selection:heading4")}</Heading>
					<Text
						secondary
						dangerouslySetInnerHTML={{ __html: t("protect:selection:desc") }}
					/>
				</Column>
			</Column>
		</Row>
	)
})
export default SelectionPage
