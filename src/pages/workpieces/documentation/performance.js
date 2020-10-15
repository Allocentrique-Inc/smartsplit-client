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
import PerformanceIcon from "../../../svg/performance"
import {
	RadioGroupButton,
	RadioGroup,
	CheckBox,
	CheckBoxGroup,
} from "../../../forms"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import AddInstrumentDropdown from "../../../smartsplit/components/add-instrument-dropdown"

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

export function PerformanceForm(props) {
	const searchResults = ["Inie", "Manie", "Moe"]
	const [search, setSearch] = useState("")
	const { t } = useTranslation()

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold style={Styles.category}>
						<PerformanceIcon style={Styles.logo} />
						{t("document:performance.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:performance.title")}</Heading>
					<Paragraph>{t("document:performance.paragraph")}</Paragraph>

					<Spacer of="group" />

					<AddCollaboratorDropdown
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:performance.roles.addPerformer")}
					/>

					<PerformanceOptions />
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
						<Heading level={4}>{t("document:performance.what")}</Heading>
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

export function PerformanceOptions(props) {
	const { t } = useTranslation()
	const [showInstruments, setShowInstruments] = useState()
	const searchResults = ["Guitare électrique", "Guitare basse", "Guitare jazz"]
	const [selected, setSelected] = useState("")
	const [search, setSearch] = useState("")

	return (
		<Column>
			<Row>
				<Column padding="component" layer="left_overground" />
				<Column of="group" flex={5}>
					<RadioGroup label={t("document:performance.whichPerformance")}>
						<RadioGroupButton
							value="singer"
							label={t("general:radioButton.singer")}
						/>
						<RadioGroupButton
							value="musician"
							label={t("general:radioButton.musician")}
						/>
					</RadioGroup>
					<CheckBoxGroup label={t("document:performance.whichRole")}>
						<CheckBox label={t("general:checkbox.singer")} />
						<CheckBox
							onChange={setShowInstruments}
							checked={showInstruments}
							label={t("general:checkbox.musician")}
						/>
					</CheckBoxGroup>

					{showInstruments && (
						<Column style={Styles.dropdown}>
							<AddInstrumentDropdown
								style={{ flex: 1 }}
								placeholder={t("document:performance.addInstrument")}
								//To Do: charactères tapés dans le field qui match sur la liste apparaissent en gras dynamiquement
								searchResults={searchResults.filter((v) =>
									v ? v.toLowerCase().indexOf(search.toLowerCase()) > -1 : true
								)}
								search={search}
								onSearchChange={setSearch}
								selection={selected}
								onSelect={(selection) => setSelected([...selected, selection])}
								onUnselect={(selection) =>
									setSelected(selected.filter((i) => i !== selection))
								}
							/>
						</Column>
					)}
				</Column>
			</Row>

			<Spacer of="section" />

			<Column of="section">
				<Hairline />
				<AddCollaboratorDropdown
					searchResults={props.searchResults}
					searchInput={props.search}
					onSearchChange={props.setSearch}
					onSelect={(selection) => console.log(selection)}
					placeholder={t("forms:labels.dropdowns.addCollaborator")}
				/>
			</Column>
		</Column>
	)
}