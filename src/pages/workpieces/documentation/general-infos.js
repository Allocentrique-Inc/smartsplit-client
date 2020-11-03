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
import AddGenreDropdown from "../../../smartsplit/components/add-genre-dropdown"
import AddInfluenceDropdown from "../../../smartsplit/components/add-influence-dropdown"

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
			progress={75}
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
	const { t } = useTranslation()

	/* const [showGenre, setShowGenre] = useState()
 	const searchResults = ["Electro Funk", "Future Funk", "Mega Funk"]
	const [selected, setSelected] = useState("")
	const [search, setSearch] = useState("") */

	const searchResultsGenres = ["Electrofunk", "Future Funk", "Mega Funk"]
	const [searchGenres, setSearchGenres] = useState("")
	const [selectedGenres, setSelectedGenres] = useState([
		"Electrofunk",
		"Future Funk",
		"Mega Funk",
	])

	const searchResultsInfluences = ["Stromae", "Apollo Brown", "Daft Punk"]
	const [searchInfluences, setSearchInfluences] = useState("")
	const [selectedInfluences, setSelectedInfluences] = useState([
		"Stromae",
		"Apollo Brown",
		"Daft Punk",
	])

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

					{/* <SearchAndTag
						noIcon={true}
						label={t("document:infos.secondaryGenre")}
						searchResults={searchResultsGenres}
						search={searchGenres}
						onSearchChange={setSearchGenres}
						selection={selectedGenres}
						onSelect={(selection) =>
							setSelectedGenres([...selectedGenres, selection])
						}
						onUnselect={(selection) =>
							setSelected(selectedGenres.filter((i) => i !== selection))
						}
						placeholder={t("document:infos.addGenre")}
					/> */}

					{/* <SearchAndTag
						noIcon={true}
						label={t("document:infos.influence")}
						undertext={t("document:infos.influenceExample")}
						searchResults={searchResultsInfluences}
						search={searchInfluences}
						onSearchChange={setSearchInfluences}
						selection={selectedInfluences}
						onSelect={(selection) =>
							setSelectedInfluences([...selectedInfluences, selection])
						}
						onUnselect={(selection) =>
							setSelected2(selectedInfluences.filter((i) => i !== selection))
						}
						placeholder={t("document:infos.addInfluence")}
					/> */}

					{/* ToDo: Tags missing + Make it one component */}
					<AddGenreDropdown
						style={{ flex: 1 }}
						noIcon={true}
						placeholder={t("document:infos.addGenre")}
						searchResults={searchResultsGenres.filter((v) =>
							v
								? v.toLowerCase().indexOf(searchGenres.toLowerCase()) > -1
								: true
						)}
						search={searchGenres}
						onSearchChange={setSearchGenres}
						selection={selectedGenres}
						onSelect={(selection) =>
							setSelectedGenres([...selectedGenres, selection])
						}
						onUnselect={(selection) =>
							setSelectedGenres(selectedGenres.filter((i) => i !== selection))
						}
					/>

					<AddInfluenceDropdown
						style={{ flex: 1 }}
						noIcon={true}
						placeholder={t("document:infos.addInfluence")}
						searchResults={searchResultsInfluences.filter((v) =>
							v
								? v.toLowerCase().indexOf(searchInfluences.toLowerCase()) > -1
								: true
						)}
						search={searchInfluences}
						onSearchChange={setSearchInfluences}
						selection={selectedInfluences}
						onSelect={(selection) =>
							setSelectedInfluenbces([...selectedInfluences, selection])
						}
						onUnselect={(selection) =>
							setSelectedInfluences(
								selectedInfluences.filter((i) => i !== selection)
							)
						}
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
