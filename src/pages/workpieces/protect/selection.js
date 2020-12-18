import React from "react"
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

	const handleChangeVersionType = (val) => {
		model.versionType.value = val
	}

	const onChangeRadioFile = (val) => {
		model.fileSelectedId.value = val
	}

	const onChangeFile = (val) => {
		model.fileSelectedId.value = "0"
		model.fileAdd = val
	}
	const onChangeDemoName = (val) => {
		if (model.versionType.value === "demo") {
			model.demoName.value = val
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
										/>
									</Flex>
								</RadioGroupButton>
							</Column>
						</RadioGroup>
					</Column>

					<Hairline />

					<Column of="component">
						<Heading level={3}>{t("protect:selection:heading3")}</Heading>
						<RadioGroup
							name="versionType"
							value={model.versionType.value}
							onChange={handleChangeVersionType}
						>
							<Column of="inside">
								<RadioGroupButton
									value="idea"
									label={t("protect:selection:idea")}
								/>
								<RadioGroupButton
									value="demo"
									label={t("protect:selection:demo")}
								/>
								{model.versionType.value === "demo" && (
									<Column style={Styles.option_text}>
										<Heading level={5}>
											{t("protect:selection:heading5")}
										</Heading>
										<Flex>
											<TextField
												value={model.demoName.value}
												onChange={onChangeDemoName}
											/>
										</Flex>
									</Column>
								)}
								<RadioGroupButton
									value="rough-mix"
									label={t("protect:selection:roughMix")}
								/>
								<RadioGroupButton
									value="final-master"
									label={t("protect:selection:finalMaster")}
								/>
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
