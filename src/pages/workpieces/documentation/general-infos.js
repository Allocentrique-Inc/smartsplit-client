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
import MusicNoteIcon from "../../../svg/music-note"
import { SearchAndTag, Dropdown, TextField } from "../../../forms"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.medium,
	},
})

export default function GeneralInfos() {
	const { t } = useTranslation()
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()

	function saveAndQuit() {
		history.push("/dashboard/")
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function navigateToInterpretation() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
	}

	return (
		<Layout
			workpiece={workpiece}
			title={workpiece}
			path={[t("document:navbar.document"), t("document:navbar.pages.infos")]}
			progress={62.5}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveClose")}
					onClick={saveAndQuit}
				/>
			}
			formNav={
				<>
					<Row flex={1}>
						<Button
							secondary
							text={t("general:buttons.back")}
							onClick={navigateToSummary}
						/>
						<Flex />
						<Button
							primary
							text={t("general:buttons.pass")}
							onClick={navigateToInterpretation}
						/>
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<GeneralInfosForm />
		</Layout>
	)
}

export function GeneralInfosForm(props) {
	const searchResults = ["Electrofunk", "Future Funk", "Mega Funk"]
	const [search, setSearch] = useState("")
	const [selected, setSelected] = useState([
		"Electrofunk",
		"Future Funk",
		"Mega Funk",
	])
	const [selected2, setSelected2] = useState([
		"Stromae",
		"Apollo Brown",
		"Daft Punk",
	])
	const { t } = useTranslation()

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold style={Styles.category}>
						<MusicNoteIcon color={Colors.action} style={Styles.logo} />
						{t("document:infos.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:infos.title")}</Heading>

					<Spacer of="group" />

					<Row of="component">
						<TextField
							name="length"
							label={t("document:infos.length")}
							placeholder=""
						/>

						<TextField name="bpm" label="BPM" placeholder="" />
					</Row>

					<Dropdown
						hideIcon={false}
						label={t("document:infos.mainGenre")}
						placeholder=""
						noFocusToggle
						tooltip=""
					/>
					<SearchAndTag
						hideIcon={true}
						label={t("document:infos.secondaryGenre")}
						searchResults={searchResults}
						search={search}
						onSearchChange={setSearch}
						selection={selected}
						onSelect={(selection) => setSelected([...selected, selection])}
						onUnselect={(selection) =>
							setSelected(selected.filter((i) => i !== selection))
						}
						placeholder={t("document:infos.addGenre")}
					/>
					<SearchAndTag
						hideIcon={true}
						label={t("document:infos.influence")}
						undertext={t("document:infos.influenceExample")}
						searchResults={searchResults}
						search={search}
						onSearchChange={setSearch}
						selection={selected2}
						onSelect={(selection) => setSelected2([...selected2, selection])}
						onUnselect={(selection) =>
							setSelected2(selected2.filter((i) => i !== selection))
						}
						placeholder={t("document:infos.addInfluence")}
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
