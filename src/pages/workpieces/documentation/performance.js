import React, { useState } from "react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import TextField from "../../../forms/text"
import { Colors, Metrics } from "../../../theme"
import PerformanceIcon from "../../../svg/performance"
import {
	RadioGroupButton,
	RadioGroup,
	CheckBox,
	CheckBoxGroup,
	Dropdown,
} from "../../../forms"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import AddInstrumentDropdown from "../../../smartsplit/components/add-instrument-dropdown"
import AddContributorDropdown from "../../../smartsplit/components/AddContributorDropdown"
import IconDescriptionDropdown from "../../../forms/IconDescriptionSelect"
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
import DocPerformanceModel from "../../../mobX/models/workpieces/documentation/DocPerformanceModel"
import { Tag } from "../../../widgets/tag"
import { toJS } from "mobx"
import { CardStyles } from "../../../widgets/card"
import UserAvatar from "../../../smartsplit/user/avatar"
import HelpCircleFull from "../../../svg/help-circle-full"
import XIcon from "../../../svg/x"
import Field from "../../../mobX/BaseModel/Field"
import InstrumentList from "../../../../assets/data/instruments-smartsplit"

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

const Styles2 = StyleSheet.create({
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

const frameStyle = [CardStyles.frame, Styles2.frame]

const PerformanceForm = observer((props) => {
	const [search, setSearch] = useState("")
	const { t } = useTranslation()

	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const { contributors } = useStores()
	const model: DocPerformanceModel = useDocsModel(workpieceId, "performance")
	const getResults = useArtistAutocomplete()
	const searchResults = getResults(search, 10, ResultsOrder.contributorsFirst)

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

	const searchFilter = (user) => {
		let name =
			user.firstName +
			" " +
			user.lastName +
			(user.artistName ? ` (${user.artistName})` : "")
		return name.indexOf(search) > -1
	}

	const searchFilteredResults = results.filter(searchFilter)

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

	const performerSearchResults = searchFilteredResults.filter((result) =>
		modelValueFilter(result, model.performers)
	)

	return (
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

				{model.performers.array.map((model, index) => (
					<Column style={Styles.dropdown} key={"u" + model.user.user_id}>
						<PerformanceOptions
							model={model}
							index={index}
							field={model.performers}
						/>
					</Column>
				))}
				<AddContributorDropdown
					searchResults={performerSearchResults}
					searchInput={search}
					onSearchChange={setSearch}
					alwaysShowAdd
					onSelect={(selection) => {
						if (
							!model.performers.array.filter(
								(v) => v.user.user_id === selection.user_id
							).length
						)
							model.performers.add({ user: selection })
						setSearch("")
					}}
					placeholder={t("document:performance.roles.addPerformer")}
				/>

				{/*
					  ////////////////
					  j'ai commenté-out cette section maintenant tu peux choisir un user et faire apparaite
					  les options  tu kes retrouvera à partir de la ligne #154
					  ///////////////
					  
					  {setSearch && (
						<Column style={Styles.dropdown}>
							<PerformanceOptions />
						</Column>
					)}*/}

				{/* 
					<AddCollaboratorDropdown
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:performance.roles.addPerformer")}
					/> */}
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
	)
})

export default PerformanceForm

export const PerformanceOptions = observer((props) => {
	/**
	 *
	 *  model passed to props looks like this :
	 *  each of these properties is a field
	 *
	 *
	 *  {
	 *    user:{user_id:"" ....},
	 *    type:"string" 'principle' | 'featured' | 'bandMember' | 'accompanying'
	 *    isSinger:boolean,
	 *    isMusician:boolean,
	 *    instruments : [{
	 *        instrument:{id:"",name:""}
	 *       role:{id:"",name:""}
	 *     }]
	 * }
	 */
	const { model, field, index } = props
	const { t } = useTranslation()
	const [showInstruments, setShowInstruments] = useState()

	const [selected, setSelected] = useState("")
	const [search, setSearch] = useState("")

	const searchResults = InstrumentList.filter((instr) =>
		new RegExp(search, "i").test(instr.name)
	)

	return (
		<Column>
			<Row
				of="component"
				padding="tiny"
				style={frameStyle}
				key={model.user.value.user_id}
			>
				<Column valign="spread" align="center" padding="tiny">
					<UserAvatar size="small" user={model.user.value} />
				</Column>
				<Column flex={1} padding="tiny">
					<Text bold size="tiny">
						{`${model.user.value.firstName} ${model.user.value.lastName} ${
							model.user.value.artistName
								? ` (${model.user.value.artistName})`
								: ""
						}`}
					</Text>
				</Column>
				<Column padding="tiny">
					<TouchableWithoutFeedback onPress={() => field.remove(index)}>
						<View>
							<XIcon />
						</View>
					</TouchableWithoutFeedback>
				</Column>
			</Row>
			<Row>
				<Column padding="component" layer="left_overground" />
				<Column of="group" flex={5}>
					<IconDescriptionDropdown />
					{/* <Dropdown
						label={t("document:performance.whichPerformance")}
						noFocusToggle
						tooltip=""
					>
						<Column layer="overground_moderate">
							<Row of="component">
								<Column padding="tiny">
									<Row>
										<Text>{t("document:performance.dropdown.mainArtist")}</Text>
									</Row>
									<Row>
										<Text secondary small>
											{t("document:performance.dropdown.mainArtistUndertext")}
										</Text>
									</Row>
								</Column>
							</Row>
							<Row of="component">
								<Column padding="tiny">
									<Row>
										<Text>
											{t("document:performance.dropdown.guestArtist")}
										</Text>
									</Row>
									<Row>
										<Text secondary small>
											{t("document:performance.dropdown.guestArtistUndertext")}
										</Text>
									</Row>
								</Column>
							</Row>
							<Row of="component">
								<Column padding="tiny">
									<Row>
										<Text>
											{t("document:performance.dropdown.groupMember")}
										</Text>
									</Row>
									<Row>
										<Text secondary small>
											{t("document:performance.dropdown.groupMemberUndertext")}
										</Text>
									</Row>
								</Column>
							</Row>
							<Row of="component">
								<Column padding="tiny">
									<Row>
										<Text>
											{t("document:performance.dropdown.backupArtist")}
										</Text>
									</Row>
									<Row>
										<Text secondary small>
											{t("document:performance.dropdown.backupArtistUndertext")}
										</Text>
									</Row>
								</Column>
							</Row>
						</Column>
					</Dropdown> */}

					<CheckBoxGroup label={t("document:performance.whichRole")}>
						<CheckBox field={model.isSinger} />
						<CheckBox field={model.isMusician} onChange={setShowInstruments} />
					</CheckBoxGroup>

					{showInstruments && (
						<Column style={Styles.dropdown}>
							<AddInstrumentDropdown
								style={{ flex: 1 }}
								placeholder={t("document:performance.addInstrument")}
								searchResults={searchResults}
								search={search}
								onSearchChange={setSearch}
								selection={model.instruments}
								onSelect={(selection) => setSelected([...selected, selection])}
							/>
						</Column>
					)}
				</Column>
			</Row>
			<Spacer of="section" />
			<Hairline />
		</Column>
	)
})
