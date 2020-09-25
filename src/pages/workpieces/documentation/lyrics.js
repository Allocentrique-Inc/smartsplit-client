import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import LyricsIcon from "../../../svg/feather"
import { SearchAndTag, Dropdown, TextField } from "../../../forms"
import { TextInput } from "react-native"

const formStyle = StyleSheet.create({
	textAreaContainer: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: Colors.stroke,
		minHeight: 264,
	},
	textArea: {
		justifyContent: "flex-start",
	},
})

export function LyricsForm(props) {
	const searchResults = ["Electrofunk", "Future Funk", "Mega Funk"]
	const [search, setSearch] = useState("")
	const [selected, setSelected] = useState(["English", "Français"])
	const { t } = useTranslation()
	const [text, setText] = React.useState("")

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold valign="center">
						<LyricsIcon />
						{t("document:infos.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:infos.title")}</Heading>

					<Spacer of="group" />
					<TextInput
						label="Email"
						value={text}
						multiline={true}
						style={formStyle.textAreaContainer}
						onChangeText={(text) => setText(text)}
					/>

					<SearchAndTag
						hideIcon={true}
						label={t("document:lyrics.language")}
						searchResults={searchResults}
						search={search}
						onSearchChange={setSearch}
						selection={selected}
						onSelect={(selection) => setSelected([...selected, selection])}
						onUnselect={(selection) =>
							setSelected(selected.filter((i) => i !== selection))
						}
						placeholder={t("document:lyrics.addLanguage")}
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
}
