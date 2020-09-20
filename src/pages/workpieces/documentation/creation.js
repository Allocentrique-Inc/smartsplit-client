import React, { useState } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import CopyrightIcon from "../../../svg/copyright"
import { DateField, TextField } from "../../../forms"
import AddContributorDropdown from "../../../smartsplit/components/AddContributorDropdown"
import { observer } from "mobx-react"
import { useDocsModel } from "../../../mobX/hooks"
import { useStores } from "../../../mobX"
import ContributorsState from "../../../mobX/states/ContributorsState"
import ContributorModel from "../../../mobX/models/user/ContributorModel"
import DocCreationModel from "../../../mobX/models/workpieces/documentation/DocCreationModel"
import { Tag } from "../../../widgets/tag"
import { toJS } from "mobx"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
})

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
	console.log(toJS(contributors.list))
	// get an array of the contributors and filter out those that do not match
	const searchResults = Object.values(toJS(contributors.list)).filter(
		(contributor) => {
			if (!search) return true
			else return contributor.name.indexOf(search) > -1
		}
	)
	console.log(searchResults)

	// filter them further so that ones already selected in each case
	// do not appear again

	const authorSearchResults = searchResults.filter((contributor) => {
		console.log(typeof toJS(model.authors.value))
		if (model.authors.value[contributor.id]) {
			console.log(`${contributor.id} is already in model.author`)
			return false
		} else {
			console.log(`no ${contributor.id} is not in model.author`)
			return true
		}
	})

	console.log(authorSearchResults)
	const composerSearchResults = searchResults.filter(
		(contributor) => !!model.composers.value[contributor.id]
	)
	const editorSearchResults = searchResults.filter(
		(contributor) => !!model.composers.value[contributor.id]
	)

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
					{console.log(Object.values(model.authors.value))}
					{/*<AddContributorDropdown
						label={t("document:creation.roles.authors")}
						subLabel={t("document:creation.roles.authorsWho")}
						searchResults={authorSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) =>
							model.authors.setItem(selection.id, selection)
						}
						placeholder={t("document:creation.roles.addAuthor")}
					/>

					<Row wrap style={Styles.tagContainer}>
						{Object.values(model.authors.value).map((item) => (
							<Tag
								dismissible
								key={item.id}
								onClick={() => model.authors.removeItem(item.id)}
								style={Styles.tag}
							>
								<Text>{item.name}</Text>
							</Tag>
						))}
					</Row>
					<AddContributorDropdown
						label={t("document:creation.roles.composers")}
						subLabel={t("document:creation.roles.composersWho")}
						searchResults={composerSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:creation.roles.addComposer")}
					/>
					<AddContributorDropdown
						label={t("document:creation.roles.editors")}
						subLabel={t("document:creation.roles.editorsWho")}
						searchResults={editorSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:creation.roles.addEditor")}
					/>*/}
					<AddContributorDropdown
						label={t("document:creation.roles.authors")}
						subLabel={t("document:creation.roles.authorsWho")}
						searchResults={authorSearchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => {
							console.dir(toJS(selection))
							console.log(`the selection from add contributor dropdown was ^^`)
							model.authors.setItem(selection.id, selection)
						}}
						placeholder={t("document:creation.roles.addAuthor")}
					/>
					<Row wrap style={Styles.tagContainer}>
						{Object.values(model.authors.value).map((item) => (
							<Tag
								dismissible
								key={item.id}
								onClick={() => model.authors.removeItem(item.id)}
								style={Styles.tag}
							>
								<Text>{item.name}</Text>
							</Tag>
						))}
					</Row>
					<TextField
						name="iswc"
						label={t("document:creation.iswc")}
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
