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
import RecordingIcon from "../../../svg/recording"
import {
	RadioGroupButton,
	RadioButton,
	RadioGroup,
	CheckBox,
	CheckBoxGroup,
	Dropdown,
	DateField,
	TextField,
} from "../../../forms"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.medium,
	},
})

export function RecordingForm(props) {
	const searchResults = ["Inie", "Manie", "Moe"]
	const [search, setSearch] = useState("")
	const [date, setDate] = useState("")
	const { t } = useTranslation()

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold style={Styles.category}>
						<RecordingIcon style={Styles.logo} />
						{t("document:recording.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:recording.title")}</Heading>
					<Paragraph>{t("document:recording.paragraph")}</Paragraph>

					<Spacer of="group" />

					<AddCollaboratorDropdown
						label={t("document:recording.roles.direction")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:recording.roles.addDirector")}
						tooltip=""
					/>
					<AddCollaboratorDropdown
						label={t("document:recording.roles.soundEngineer")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:recording.roles.addSoundEngineer")}
						tooltip=""
					/>
					<AddCollaboratorDropdown
						label={t("document:recording.roles.mix")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:recording.roles.addMix")}
						tooltip=""
					/>
					<AddCollaboratorDropdown
						label={t("document:recording.roles.master")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:recording.roles.addMaster")}
						tooltip=""
					/>
					<DateField
						label={t("document:recording.date")}
						value={date}
						onChangeText={setDate}
						placeholder={t("forms:placeholders.date")}
						tooltip=""
					/>
					<TextField
						name="studio"
						label={t("document:recording.studio")}
						placeholder={t("document:recording.searchStudio")}
						tooltip=""
					/>
					<AddCollaboratorDropdown
						label={t("document:recording.roles.production")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:recording.roles.addProduction")}
						tooltip=""
					/>
					<TextField
						name="isrc"
						label={t("document:recording.isrc")}
						tooltip={t("document:recording.tooltips.isrc")}
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
