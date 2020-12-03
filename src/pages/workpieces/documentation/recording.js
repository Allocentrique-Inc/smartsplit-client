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
import { Metrics } from "../../../theme"
import RecordingIcon from "../../../svg/recording"
import UserTag from "../../../smartsplit/user/UserTag"
import { Dropdown, DateField, TextField, SearchAndTag } from "../../../forms"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import AddContributorDropdown from "../../../smartsplit/components/AddContributorDropdown"
import { observer } from "mobx-react"
import {
	useArtistAutocomplete,
	useDocsModel,
	ResultsOrder,
} from "../../../mobX/hooks"
import { useStores } from "../../../mobX"
import ContributorsState from "../../../mobX/states/ContributorsState"
import ContributorModel from "../../../mobX/models/user/ContributorModel"
import DocRecordingModel from "../../../mobX/models/workpieces/documentation/DocRecordingModel"
import { toJS } from "mobx"
import Field from "../../../mobX/BaseModel/Field"
import searchResultsStudio from "../../../../assets/data/studios-smartsplit"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.medium,
	},
})

const RecordingForm = observer((props) => {
	//const searchResults = ["Inie", "Manie", "Moe"]
	const [search, setSearch] = useState("")
	const [date, setDate] = useState("")
	const { t } = useTranslation()

	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const { contributors } = useStores()
	const model: DocRecordingModel = useDocsModel(workpieceId, "recording")
	const getResults = useArtistAutocomplete()

	const searchFilter = (user) => {
		let name =
			user.firstName +
			" " +
			user.lastName +
			(user.artistName ? ` (${user.artistName})` : "")
		return name.indexOf(search) > -1
	}

	const modelValueFilter = (
		v: {
			firstName: string,
			lastName: string,
			artistName: string,
			user_id: string,
		},
		field: Field
	) => {
		let exists = false
		field.array.forEach((selected) => {
			if (v.user_id === selected.uid) exists = true
		})
		return !exists
	}

	const fakeSearchResults = [
		{
			user_id: "09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb",
			firstName: "Willy",
			lastName: "Nilly",
			artistName: "Willy the Poo",
			avatarUrl:
				"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
		},
		{
			user_id: "09a082f1-41a7-4e09-8ee3-e5e0fdad8bbc",
			firstName: "Will",
			lastName: "Nill",
			artistName: "Chill Bill",
		},
		{
			user_id: "09a082f1-41a7-4e09-8ee3-e5e0fdad8bbd",
			firstName: "Lila",
			lastName: "Ait",
			artistName: "Lady Lila",
		},
		{
			user_id: "09a082f1-41a7-4e09-8ee3-e5e0fdad8bbc",
			firstName: "Wes",
			lastName: "Johnson",
			artistName: "Fat-Fuck Frank",
		},
		{
			user_id: "09a082f1-41a7-4e09-8ee3-e5e0fdad8bbd",
			firstName: "Harris Glen",
			lastName: "Milstead",
			artistName: "Divine",
		},
	]

	const searchResults = getResults(search, 10, ResultsOrder.contributorsFirst)
	const results = searchResults.concat(fakeSearchResults).splice(0, 10)
	const searchFilteredResults = results.filter(searchFilter)

	const directorSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.director)
	)
	const soundEngeSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.recordedBy)
	)
	const mixEngeSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.mixedBy)
	)
	const masterEngeSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.masteredBy)
	)
	const producerSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.producedBy)
	)

	//const searchResultsStudio = ["Zut Records", "Flip Studio", "Flop Studio"]
	const [searchStudio, setSearchStudio] = useState("")
	const [selectedStudio, setSelectedStudio] = useState("")

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

					<Column of="tiny">
						<AddContributorDropdown
							label={t("document:recording.roles.direction")}
							searchResults={directorSearchResults}
							searchInput={search}
							onSearchChange={setSearch}
							alwaysShowAdd
							onSelect={(selection) => {
								if (
									!model.director.array.filter(
										(v) => v.user_id === selection.user_id
									).length
								)
									model.director.add(selection)
								setSearch("")
							}}
							placeholder={t("document:recording.roles.addDirector")}
						/>
						{model.director.array.map((user) => (
							<UserTag user={user} field={model.director} key={user.user_id} />
						))}
					</Column>

					<Column of="tiny">
						<AddContributorDropdown
							label={t("document:recording.roles.soundEngineer")}
							searchResults={soundEngeSearchResults}
							searchInput={search}
							onSearchChange={setSearch}
							alwaysShowAdd
							onSelect={(selection) => {
								if (
									!model.recordedBy.array.filter(
										(v) => v.user_id === selection.user_id
									).length
								)
									model.recordedBy.add(selection)
								setSearch("")
							}}
							placeholder={t("document:recording.roles.addSoundEngineer")}
						/>
						{model.recordedBy.array.map((user) => (
							<UserTag
								user={user}
								field={model.recordedBy}
								key={user.user_id}
							/>
						))}
					</Column>

					<Column of="tiny">
						<AddContributorDropdown
							label={t("document:recording.roles.soundEngineer")}
							searchResults={mixEngeSearchResults}
							searchInput={search}
							onSearchChange={setSearch}
							alwaysShowAdd
							onSelect={(selection) => {
								if (
									!model.mixedBy.array.filter(
										(v) => v.user_id === selection.user_id
									).length
								)
									model.mixedBy.add(selection)
								setSearch("")
							}}
							placeholder={t("document:recording.roles.addMix")}
						/>
						{model.mixedBy.array.map((user) => (
							<UserTag user={user} field={model.mixedBy} key={user.user_id} />
						))}
					</Column>

					<Column of="tiny">
						<AddContributorDropdown
							label={t("document:recording.roles.master")}
							searchResults={masterEngeSearchResults}
							searchInput={search}
							onSearchChange={setSearch}
							alwaysShowAdd
							onSelect={(selection) => {
								if (
									!model.masteredBy.array.filter(
										(v) => v.user_id === selection.user_id
									).length
								)
									model.masteredBy.add(selection)
								setSearch("")
							}}
							placeholder={t("document:recording.roles.addMaster")}
						/>
						{model.masteredBy.array.map((user) => (
							<UserTag
								user={user}
								field={model.masteredBy}
								key={user.user_id}
							/>
						))}
					</Column>

					{/* <AddCollaboratorDropdown
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
				/>*/}
					<DateField
						label={t("document:recording.date")}
						value={date}
						onChangeText={setDate}
						placeholder={t("forms:placeholders.date")}
						tooltip=""
					/>
					<SearchAndTag
						noIcon={true}
						label={t("document:recording.studio")}
						searchResults={searchResultsStudio
							.filter(
								(g) =>
									g.name.toLowerCase().indexOf(searchStudio.toLowerCase()) > -1
							)
							.splice(0, 10)}
						search={searchStudio}
						onSearchChange={setSearchStudio}
						selection={model.recordingStudio.array}
						onSelect={
							(selection) => {
								let exists =
									model.recordingStudio.array.filter(
										(g) => g.id === selection.id
									).length > 0
								if (!exists) model.recordingStudio.add(selection)
							}
							//setSelectedStudio([...selectedStudio, selection])
						}
						onUnselect={
							(selection) => model.recordingStudio.remove(selection)
							//setSelectedStudio(selectedStudio.filter((i) => i !== selection))
						}
						placeholder={t("document:recording.searchStudio")}
						tooltip=""
					/>
					{/* <TextField
					name="studio"
					label={t("document:recording.studio")}
					placeholder={t("document:recording.searchStudio")}
					tooltip=""
				/> */}
					<Column of="tiny">
						<AddContributorDropdown
							label={t("document:recording.roles.production")}
							searchResults={producerSearchResults}
							searchInput={search}
							onSearchChange={setSearch}
							alwaysShowAdd
							onSelect={(selection) => {
								if (
									!model.producedBy.array.filter(
										(v) => v.user_id === selection.user_id
									).length
								)
									model.producedBy.add(selection)
								setSearch("")
							}}
							placeholder={t("document:recording.roles.addProduction")}
						/>
						{model.producedBy.array.map((user) => (
							<UserTag
								user={user}
								field={model.producedBy}
								key={user.user_id}
							/>
						))}
					</Column>
					{/* <AddCollaboratorDropdown
					label={t("document:recording.roles.production")}
					searchResults={searchResults}
					searchInput={search}
					onSearchChange={setSearch}
					onSelect={(selection) => console.log(selection)}
					placeholder={t("document:recording.roles.addProduction")}
					tooltip=""
				/> */}
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
})
export default RecordingForm
