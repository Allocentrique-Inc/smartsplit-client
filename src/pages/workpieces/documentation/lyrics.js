import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useTranslation } from "react-i18next"
import { TextInput } from "react-native"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import LyricsIcon from "../../../svg/feather"
import EyeIcon from "../../../svg/eye"
import { SearchAndTag, Dropdown, TextField } from "../../../forms"
import AddLanguageDropdown from "../../../smartsplit/components/AddLanguageDropdown"
import { useDocsModel } from "../../../mobX/hooks"
import DocLyricsModel from "../../../mobX/models/workpieces/documentation/DocLyricsModel"
import { observer } from "mobx-react"
const formStyle = StyleSheet.create({
	textAreaContainer: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: Colors.stroke,
		minHeight: 264,
		resize: "vertical",
		//To Do: Was not able to style the grabber of the text area:
		"&::-webkitResizer": {
			background: Colors.stroke,
			border: Colors.stroke,
			boxShadow: Colors.stroke,
			outline: Colors.stroke,
		},
	},
	textArea: {
		justifyContent: "flex-start",
	},
})

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.medium,
	},
	dropdown: {
		marginLeft: Metrics.spacing.large,
	},
})

export const LyricsForm = observer((props) => {
	const searchResults = ["English", "Français"]
	const [search, setSearch] = useState("")
	const [selected, setSelected] = useState(["English", "Français"])
	const { t } = useTranslation()
	const [text, setText] = React.useState("")
	const workpiece = useCurrentWorkpiece()

	const model: DocLyricsModel = useDocsModel(workpiece.id, "lyrics")
	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold style={Styles.category}>
						<LyricsIcon style={Styles.logo} />
						{t("document:lyrics.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>
						{t("document:lyrics.title", { workpiece: workpiece.data.title })}
					</Heading>
					<Paragraph>{t("document:lyrics.paragraph")}</Paragraph>

					<Spacer of="group" />

					{/* To Do? Was not able to style TextField:					
					<TextField
						label={t("document:lyrics.label")}
						value={text}
						multiline={true}
						style={formStyle.textAreaContainer}
						onChangeText={(text) => setText(text)}
						undertext={t("document:lyrics.undertext")}
					/> */}

					<Column of="tiny">
						<TextInput
							label={t("document:lyrics.label")}
							value={model.texts.value}
							multiline={true}
							style={formStyle.textAreaContainer}
							onChangeText={(text) => {
								model.texts.setValue(text)
							}}
						/>
						<Text secondary small>
							{t("document:lyrics.undertext")}
						</Text>
					</Column>

					{/* To Do: Voir comment placer searchResults entre guillemets */}
					<AddLanguageDropdown
						icon="none"
						hideIcon={true}
						label={t("document:lyrics.language")}
						searchResults={searchResults.filter(
							(g) => g.toLowerCase().indexOf(search.toLowerCase()) > -1
						)}
						search={search}
						onSearchChange={setSearch}
						selection={model.languages.array}
						onSelect={(selection) => model.languages.add(selection)}
						onUnselect={(selection) => model.languages.remove(selection)}
						placeholder={t("document:lyrics.addLanguage")}
					/>

					<Dropdown
						label={t("document:access")}
						placeholder={
							<>
								<EyeIcon />
								<Text>{t("document:lyrics.dropdown.public")}</Text>
								<Flex />
							</>
						}
						noFocusToggle
						tooltip=""
					/>
				</Column>
				<Flex />
				<Column of="group" flex={4}>
					<Column of="component" padding="component" layer="underground">
						<Column of="inside">
							<Text small bold tertiary>
								{t("document:help")}
							</Text>
							<Hairline />
						</Column>
						<Heading level={4}>{t("document:why")}</Heading>
						<Text secondary>
							Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
							dolor sit amet.
						</Text>
					</Column>
				</Column>
			</Row>
		</>
	)
})
