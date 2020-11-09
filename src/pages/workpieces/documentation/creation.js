import React, { useState, useMemo } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
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

	//console.log(authorSearchResults)
	const composerSearchResults = searchResults.filter(
		(contributor) => !model.composers.value[contributor.id]
	)
	const editorSearchResults = searchResults.filter(
		(contributor) => !model.editors.value[contributor.id]
	)
	const [selected, setSelected] = useState(["Inscience", "Quest Love"])

	return (
		<Row>
			<Column of="group" flex={5}>
				<Column of="group">
					<Text action bold style={Styles.category}>
						<CopyrightIcon color={Colors.action} style={Styles.logo} />
						{t("document:creation.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:creation.title")}</Heading>
					<Paragraph>{t("document:creation.paragraph")}</Paragraph>
				</Column>
				<Spacer of="group" />
				<Column of="group">
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

					<AddContributorDropdown
						label={t("document:creation.roles.authors")}
						subLabel={t("document:creation.roles.authorsWho")}
						searchResults={authorSearchResults}
						search={search}
						onSearchChange={setSearch}
						onSelect={(selection) => {
							console.dir(toJS(selection))
							//console.log(`the selection from add contributor dropdown was ^^`)
							model.authors.setItem(selection.user_id, selection)
							setSearch("")
						}}
						placeholder={t("document:creation.roles.addAuthor")}
					/>

					{Object.values(model.authors.value).map((item) => (
						<Row
							padding="component"
							of="component"
							style={frameStyle}
							key={item.id || item.user_id}
						>
							<Column valign="spread" align="center">
								<UserAvatar size="small" user={item} />
							</Column>
							<Column flex={1} of="component">
								<Text bold>
									{item.name ? item.name : item.firstName + " " + item.lastName}
								</Text>
							</Column>
							<Column>
								<TouchableWithoutFeedback
									onPress={() => model.authors.removeItem(item.id)}
								>
									<View>
										<XIcon />
									</View>
								</TouchableWithoutFeedback>
							</Column>
						</Row>
					))}

					<AddContributorDropdown
						label={t("document:creation.roles.composers")}
						subLabel={t("document:creation.roles.composersWho")}
						searchResults={composerSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => {
							console.dir(toJS(selection))
							//console.log(`the selection from add contributor dropdown was ^^`)
							model.composers.setItem(selection.id, selection)
							setSearch("")
						}}
						placeholder={t("document:creation.roles.addComposer")}
					/>
					{Object.values(model.composers.value).map((item) => (
						<Row wrap style={Styles.list}>
							<Tag
								dismissible
								key={item.id}
								onClick={() => model.composers.removeItem(item.id)}
							>
								<Text>{item.name}</Text>
							</Tag>
						</Row>
					))}
					<AddContributorDropdown
						label={t("document:creation.roles.editors")}
						subLabel={t("document:creation.roles.editorsWho")}
						searchResults={editorSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => {
							console.dir(toJS(selection))
							//console.log(`the selection from add contributor dropdown was ^^`)
							model.editors.setItem(selection.id, selection)
							setSearch("")
						}}
						placeholder={t("document:creation.roles.addEditor")}
					/>
					{Object.values(model.editors.value).map((item) => (
						<Row wrap style={Styles.list}>
							<Tag
								dismissible
								key={item.id}
								onClick={() => model.editors.removeItem(item.id)}
							>
								<Text>{item.name}</Text>
							</Tag>
						</Row>
					))}
					<TextField
						field={model.ISWC}
						label_hint={t("forms:labels.optional")}
						tooltip=""
					/>
				</Column>
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
