import React, { useState, useMemo } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
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
} from "../../../mobX/hooks"
import { useStores } from "../../../mobX"
import ContributorsState from "../../../mobX/states/ContributorsState"
import ContributorModel from "../../../mobX/models/user/ContributorModel"
import DocCreationModel from "../../../mobX/models/workpieces/documentation/DocCreationModel"
import { Tag } from "../../../widgets/tag"
import { toJS } from "mobx"
import { CardStyles } from "../../../widgets/card"
import UserAvatar from "../../../smartsplit/user/avatar"
import HelpCircleFull from "../../../svg/help-circle-full"
import XIcon from "../../../svg/x"
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
})
const frameStyle = [CardStyles.frame, Styles.frame]
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

	const workpieceId = useCurrentWorkpiece().id
	// grab the contributors
	const { contributors } = useStores()
	const model: DocCreationModel = useDocsModel(workpieceId, "creation")
	window.creationModel = model
	//console.log(toJS(contributors.list))

	const getResults = useArtistAutocomplete()

	//console.log(search)
	const searchResults = getResults(search, 10)
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
	/*	const authorSearchResults = searchResults.filter((contributor) => {
		//console.log(typeof toJS(model.authors.value))
		if (contributor.user_id)
			if (model.authors.value[contributor.user_id]) {
				//console.log(`${contributor.user_id} is already in model.author`)
				return false
			} else {
				//console.log(`no ${contributor.user_id} is not in model.author`)
				return true
			}
		if (contributor.id)
			if (model.authors.value[contributor.id]) {
				//console.log(`${contributor.id} is already in model.author`)
				return false
			} else {
				//console.log(`no ${contributor.id} is not in model.author`)
				return true
			}
	})*/
	const authorSearchResults = fakeSearchResults
	const composerSearchResults = fakeSearchResults
	const editorSearchResults = fakeSearchResults

	//console.log(authorSearchResults)
	/* 	const composerSearchResults = searchResults.filter(
		(contributor) => !model.composers.value[contributor.id]
	)
	const editorSearchResults = searchResults.filter(
		(contributor) => !model.editors.value[contributor.id]
	) */
	const [selected, setSelected] = useState(["Inscience", "Quest Love"])
	return (
		<Row>
			<Column of="group" flex={5}>
				<Text action bold style={Styles.category}>
					<CopyrightIcon color={Colors.action} style={Styles.logo} />
					{t("document:creation.category")}
					<Row padding="tiny" />
				</Text>
				<Heading level={1}>{t("document:creation.title")}</Heading>
				<Paragraph>{t("document:creation.paragraph")}</Paragraph>

				<Spacer of="group" />

				{/* To Do: À confirmer si plus court que les autres field */}
				<DateField
					label={t("document:creation.date")}
					value={model.creationDate.value}
					onChangeText={(v) => {
						model.creationDate.setValue(v)
					}}
					placeholder={t("forms:placeholders.date")}
				/>
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
							console.dir(toJS(selection))
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
						<UserTag user={user} field={model.authors} />
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
							console.dir(toJS(selection))
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
						<UserTag user={user} field={model.composers} />
					))}
				</Column>

				<Column of="tiny">
					<AddContributorDropdown
						label={t("document:creation.roles.editors")}
						subLabel={t("document:creation.roles.editorsWho")}
						searchResults={editorSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						alwaysShowAdd
						onSelect={(selection) => {
							console.dir(toJS(selection))
							//console.log(`the selection from add contributor dropdown was ^^`)
							if (
								!model.editors.array.filter(
									(v) => v.user_id === selection.user_id
								).length
							)
								model.editors.add(selection)
							setSearch("")
						}}
						placeholder={t("document:creation.roles.addEditor")}
					/>
					{model.publishers.array.map((item) => (
						<Row
							of="component"
							padding="tiny"
							style={frameStyle}
							key={item.id || item.user_id}
						>
							<Column valign="spread" align="center" padding="tiny">
								<UserAvatar size="small" user={item} />
							</Column>
							<Column flex={1} padding="tiny">
								<Text bold size="tiny">
									{item.name ? item.name : item.firstName + " " + item.lastName}
								</Text>
							</Column>
							<Column padding="tiny">
								<TouchableWithoutFeedback
									onPress={() => model.editors.remove(item)}
								>
									<View>
										<XIcon />
									</View>
								</TouchableWithoutFeedback>
							</Column>
						</Row>
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
