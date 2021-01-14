import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
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
import PlusCircle from "../../../svg/plus-circle"
import { SearchAndTag, Dropdown, TextField } from "../../../forms"
import AddGenreDropdown from "../../../smartsplit/components/AddGenreDropdown"
import { useDocsModel } from "../../../mobX/hooks"
import { toJS } from "mobx"
import { observer } from "mobx-react"
import genres from "../../../data/genres-smartsplit"
import bands from "../../../data/bands"
import { titleCase } from "../../../utils/utils"
//import LayoutStyles from "../../../styles/layout"
import { FormStyles } from "./FormStyles"
import { searchEntities } from "../../../../api/entities"

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

export const GeneralInfosForm = observer((props) => {
	const { t, i18n } = useTranslation()

	/* const [showGenre, setShowGenre] = useState()
 	const searchResults = ["Electro Funk", "Future Funk", "Mega Funk"]
	const [selected, setSelected] = useState("")
	const [search, setSearch] = useState("") */

	const [selectedGenres, setSelectedGenres] = useState("")
	const [searchGenres, setSearchGenres] = useState("")
	const [genreResults, setGenreResults] = useState([])
	const [loading, setLoading] = useState(false)
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model = useDocsModel(workpieceId, "info")

	async function onSearchChange(search) {
		setSearchGenres(search)
		setLoading(true)
		let results = await searchEntities("musical-genres", search)
		setGenreResults(results)
		setLoading(false)
	}
	//console.log(model.toJS()) importer puis loger dans console pour vérifier valeurs puis comment out sinon trop

	// const searchResultsGenres = ["Electrofunk", "Future Funk", "Mega Funk"]

	/*const searchResultsGenres = genres.map((genre) => {
		return {
			id: genre.id,
			name: titleCase(genre.name),
		}
	})*/

	/* 	const fakeSearchResults = [
		{
			id: "123",
			name: "Electrofunk",
		},
		{
			id: "1234",
			name: "Future Funk",
		},
		{
			id: "12345",
			name: "Mega Funk",
		},
	]

	const genreResults = fakeSearchResults */

	const searchResultsInfluences = [...bands]
	const [searchInfluences, setSearchInfluences] = useState("")
	const [selectedInfluences, setSelectedInfluences] = useState("")
	//console.log(model.toJS())

	const quotation = i18n.language === "en" ? '"' : "« "
	const quotationEnd = i18n.language === "en" ? '"' : " »"

	return (
		<Row>
			<Column of="group" flex={5}>
				<Text action bold style={FormStyles.category}>
					<MusicNoteIcon color={Colors.action} style={FormStyles.logo} />
					{t("document:infos.category")}
					<Row padding="tiny" />
				</Text>
				<Heading level={1}>{t("document:infos.title")}</Heading>

				<Spacer of="group" />

				<Row of="component">
					<TextField field={model.length} />
					<TextField field={model.BPM} />
				</Row>

				{/* <AddGenreDropdown
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
					/> */}

				{/* Main Genres */}
				<AddGenreDropdown
					hideIcon={false}
					field={model.primaryGenre}
					noFocusToggle
					tooltip=""
				/>
				{/* console.log(searchGenres) */}
				{/* console.log(searchResultsGenres) */}

				{/* Secondary Genres */}

				<SearchAndTag
					noIcon={true}
					label={t("document:infos.secondaryGenre")}
					searchResults={genreResults}
					search={searchGenres}
					onSearchChange={onSearchChange}
					selection={model.secondaryGenres.array}
					onSelect={(selection) => {
						let exists =
							model.secondaryGenres.array.filter(
								(g) => g.entity_id === selection.entity_id
							).length > 0
						if (!exists) model.secondaryGenres.add(selection)
					}}
					onUnselect={(selection) => model.secondaryGenres.remove(selection)}
					placeholder={t("document:infos.addGenre")}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							model.addNewSecondaryGenre(searchGenres)
						}}
					>
						<Row
							of="component"
							padding="component"
							//style={FormStyles.actionFrame}
						>
							<PlusCircle />
							<Text bold action>
								{t("document:add")}
								{searchGenres ? quotation : null}
								{searchGenres}
								{searchGenres ? quotationEnd : null}
							</Text>
						</Row>
					</TouchableWithoutFeedback>
				</SearchAndTag>

				<SearchAndTag
					noIcon={true}
					label={t("document:infos.influence")}
					undertext={t("document:infos.influenceExample")}
					searchResults={searchResultsInfluences
						.filter(
							(i) =>
								i.toLowerCase().indexOf(searchInfluences.toLowerCase()) > -1
						)
						.splice(0, 10)}
					search={searchInfluences}
					onSearchChange={setSearchInfluences}
					selection={model.influences.value}
					onSelect={(selection) => model.influences.add(selection)}
					onUnselect={(selection) => model.influences.remove(selection)}
					placeholder={t("document:infos.addInfluence")}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							model.influences.add(searchInfluences)
						}}
					>
						<Row
							of="component"
							padding="component"
							//style={FormStyles.actionFrame}
						>
							<PlusCircle />
							<Text bold action>
								{t("document:add")}
								{searchInfluences ? quotation : null}
								{searchInfluences}
								{searchInfluences ? quotationEnd : null}
							</Text>
						</Row>
					</TouchableWithoutFeedback>
				</SearchAndTag>
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
	)
})
