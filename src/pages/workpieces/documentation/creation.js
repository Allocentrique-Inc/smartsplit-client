import React, { useState, useMemo } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { TouchableWithoutFeedback, View } from "react-native"
import UserTag from "../../../smartsplit/user/UserTag"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import List, { ListItem } from "../../../widgets/list"
import { Colors, Metrics } from "../../../theme"
import CopyrightIcon from "../../../svg/copyright"
import { DateField, TextField, SearchAndTag } from "../../../forms"
import AddContributorDropdown from "../../../smartsplit/components/AddContributorDropdown"
import { observer } from "mobx-react"
import {
	useArtistAutocomplete,
	useAuthUser,
	useDocsModel,
	ResultsOrder,
} from "../../../mobX/hooks"
import { useStores } from "../../../mobX"
import ContributorsState from "../../../mobX/states/ContributorsState"
import ContributorModel from "../../../mobX/models/user/ContributorModel"
import DocCreationModel from "../../../mobX/models/workpieces/documentation/DocCreationModel"
import { Tag } from "../../../widgets/tag"
import { toJS } from "mobx"
//import { CardStyles } from "../../../widgets/card"
import UserAvatar from "../../../smartsplit/user/avatar"
import HelpCircleFull from "../../../svg/help-circle-full"
import XIcon from "../../../svg/x"
import Field from "../../../mobX/BaseModel/Field"
import DatePickers from "../../../smartsplit/components/DatePickers"
import { FormStyles } from "./FormStyles"

//const frameStyle = [CardStyles.frame, Styles.frame]

/*	<Tag
	dismissible
	key={item.id}
	onClick={() => model.authors.removeItem(item.id)}
	>
	<Text>
	{item.name ? item.name : item.firstName + " " + item.lastName}
	</Text>
	</Tag>*/
const CreationForm = observer(() => {
	const [date, setDate] = useState("")

	// whichever AddContributorDropDown is Active
	const [search, setSearch] = useState("")

	const { t } = useTranslation()

	//Pour info genre dropdown use this
	const workpiece = useCurrentWorkpiece()
	//console.log(workpiece)
	const workpieceId = workpiece.id
	//const workpieceName = workpiece.data.title
	//console.log(workpieceName)
	// grab the contributors
	const { contributors } = useStores()
	//Also this with "infos"
	const model: DocCreationModel = useDocsModel(workpieceId, "creation")
	//To debug:
	//window.creationModel = model
	//console.log(toJS(contributors.list))

	const getResults = useArtistAutocomplete()

	//console.log(search)
	const searchResults = getResults(search, 10, ResultsOrder.contributorsFirst)
	//console.log(searchResults)

	// filter them further so that ones already selected in each case
	// do not appear again

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

	const results = searchResults.concat(fakeSearchResults).splice(0, 10)

	/**
	 * TEMPORARY CODE WHILE USING fakeSearchResults
	 * We won't need it once we grab the collabs of collabs and then matching users in general
	 */

	/**
	 * This is a filtering function to be used with the results.filter()
	 * It filters out those entries that do not match the search term
	 *
	 * @param user
	 * @return {boolean}
	 */
	const searchFilter = (user) => {
		let name =
			user.firstName +
			" " +
			user.lastName +
			(user.artistName ? ` (${user.artistName})` : "")
		return name.indexOf(search) > -1
	}

	const searchFilteredResults = results.filter(searchFilter)

	/**
	 * this is a filtering function that removes entries in the array that already exist by
	 * returning false in the filter function on a match on the user_id
	 *
	 * @param v the value being checked
	 * @param field the model's field (of type collection)
	 * @return {boolean}
	 */
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

	/**
	 * here we are filtering the results for each of the fields in rhe model
	 * TODO: creation model should probably be refactored to use map field type but submit an array of user_ids which would greatly improve the code
	 */
	const authorSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.authors)
	)
	const composerSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.composers)
	)
	const publisherSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.composers)
	)

	//console.log(authorSearchResults)
	/* 	const composerSearchResults = searchResults.filter(
		(contributor) => !model.composers.value[contributor.id]
	)
	const publisherSearchResults = searchResults.filter(
		(contributor) => !model.publishers.value[contributor.id]
	) */
	//const [selected, setSelected] = useState(["Inscience", "Quest Love"])

	return (
		<Row>
			<Column of="group" flex={5}>
				<Text action bold style={FormStyles.category}>
					<CopyrightIcon color={Colors.action} style={FormStyles.logo} />
					{t("document:creation.category")}
					<Row padding="tiny" />
				</Text>
				<Heading level={1}>
					{t("document:creation.title", { workpiece: workpiece.data.title })}
				</Heading>
				<Paragraph>{t("document:creation.paragraph")}</Paragraph>

				<Spacer of="group" />

				<Column of="component">
					<Text bold>{t("document:creation.date")}</Text>
					<DatePickers field={model.creationDate} />
				</Column>
				{/* <DateField
					label={t("document:creation.date")}
					value={model.creationDate.value}
					onChangeText={(v) => {
						model.creationDate.setValue(v)
					}}
					placeholder={t("forms:placeholders.date")}
				/> */}
				{/* {console.log(Object.values(model.authors.value))} */}

				<Column of="tiny">
					<AddContributorDropdown
						label={t("document:creation.roles.authors")}
						subLabel={t("document:creation.roles.authorsWho")}
						searchResults={authorSearchResults}
						search={search}
						onSearchChange={setSearch}
						alwaysShowAdd
						onSelect={(selection) => {
							//console.dir(toJS(selection))
							//console.log(`the selection from add contributor dropdown was ^^`)
							if (
								!model.authors.array.filter(
									(v) => v.user_id === selection.user_id
								).length
							)
								model.authors.add(selection)
							setSearch("")
						}}
						placeholder={t("document:creation.roles.addAuthor")}
					/>

					{model.authors.array.map((user) => (
						<UserTag user={user} field={model.authors} key={user.user_id} />
					))}
				</Column>

				<Column of="tiny">
					<AddContributorDropdown
						label={t("document:creation.roles.composers")}
						subLabel={t("document:creation.roles.composersWho")}
						searchResults={composerSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						alwaysShowAdd
						onSelect={(selection) => {
							//console.dir(toJS(selection))
							//console.log(`the selection from add contributor dropdown was ^^`)
							if (
								!model.composers.array.filter(
									(v) => v.user_id === selection.user_id
								).length
							)
								model.composers.add(selection)
							setSearch("")
						}}
						placeholder={t("document:creation.roles.addComposer")}
					/>
					{model.composers.array.map((user) => (
						<UserTag user={user} field={model.composers} key={user.user_id} />
					))}
				</Column>

				<Column of="tiny">
					<AddContributorDropdown
						label={t("document:creation.roles.publishers")}
						subLabel={t("document:creation.roles.publishersWho")}
						searchResults={publisherSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						alwaysShowAdd
						onSelect={(selection) => {
							console.dir(toJS(selection))
							console.log(
								`the selection from add contributor dropdown or modal was ^^`
							)
							if (
								!model.publishers.array.filter(
									(v) => v.user_id === selection.user_id
								).length
							)
								model.publishers.add(selection)
							setSearch("")
						}}
						placeholder={t("document:creation.roles.addPublisher")}
					/>
					{model.publishers.array.map((user) => (
						<UserTag user={user} field={model.publishers} key={user.user_id} />
					))}
				</Column>
				<TextField
					field={model.iswc}
					label_hint={t("forms:labels.optional")}
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

					<Heading level={4}>{t("document:creation.what")}</Heading>

					<Text secondary>
						Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
						dolor sit amet.
					</Text>
				</Column>
			</Column>
		</Row>
	)
})

export default CreationForm
