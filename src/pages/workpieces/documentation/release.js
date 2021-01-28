import React, { useState } from "react"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import ReleasetIcon from "../../../svg/release"
import {
	CheckBox,
	CheckBoxGroup,
	Dropdown,
	DateField,
	TextField,
	Select,
	TextDropdown,
} from "../../../forms"
import { toJS } from "mobx"
import { observer } from "mobx-react"
import { useDocsModel, ResultsOrder } from "../../../mobX/hooks"
import { useStores } from "../../../mobX"
import ContributorsState from "../../../mobX/states/ContributorsState"
import ContributorModel from "../../../mobX/models/user/ContributorModel"
import DocReleaseModel from "../../../mobX/models/workpieces/documentation/DocReleaseModel"
import Field from "../../../mobX/BaseModel/Field"
import AddDistributorDropdown from "../../../smartsplit/components/AddDistributorDropdown"
import { FormStyles } from "./FormStyles"
import DatePickers from "../../../smartsplit/components/DatePickers"

const ReleaseForm = observer((props) => {
	const [date, setDate] = useState("")
	const { t } = useTranslation()
	const [showDigitalOptions, setShowDigitalOptions] = useState()
	const [showEP, setShowEP] = useState()
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: DocReleaseModel = useDocsModel(workpieceId, "release")

	return (
		<Row>
			<Column of="group" flex={5}>
				<Text action bold style={FormStyles.category}>
					<ReleasetIcon style={FormStyles.logo} />
					{t("document:release.category")}
					<Row padding="tiny" />
				</Text>
				<Heading level={1}>{t("document:release.title")}</Heading>
				<Paragraph>{t("document:release.paragraph")}</Paragraph>

				<Spacer of="group" />

				{/* <DateField
					label={t("document:release.date")}
					undertext={t("document:release.dateHint")}
					value={date}
					onChangeText={setDate}
					placeholder={t("forms:placeholders.date")}
					tooltip=""
				/> */}

				{/* ToDo: Undertext does not appear */}
				<DatePickers
					field={model.date}
					label={t("document:release.date")}
					undertext={t("document:release.dateHint")}
				/>
				{/*<Dropdown
					label="Label"
					placeholder={t("document:release.addLabel")}
					noFocusToggle
					tooltip=""
				/>*/}
				<TextField
					label="Label"
					placeholder={t("document:release.addLabel")}
					field={model.label}
				/>
				<Select
					label={t("document:release.format")}
					placeholder=""
					tooltip=""
					options={[
						{ key: "EP", value: "EP" },
						{ key: "LP", value: "LP" },
						{ key: "Double Album", value: "Double" },
						{ key: "Single", value: "Single" },
					]}
					onChange={(v) => {
						model.format.setValue(v)
					}}
					value={model.format.value}
				/>
				{showEP && <EP />}
				<CheckBoxGroup label={t("document:release.supports.support")}>
					<CheckBox
						onChange={setShowDigitalOptions}
						checked={showDigitalOptions}
						label={t("document:release.supports.digital")}
					/>
				</CheckBoxGroup>
				{showDigitalOptions && <DigitalOptions />}

				<CheckBox label={t("document:release.supports.physical")} />
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

export default ReleaseForm

export function EP(props) {
	const { t } = useTranslation()

	return (
		<Column>
			<Row>
				<Column padding="component" layer="left_overground" />
				<Column of="group" flex={5}>
					<TextField label={t("document:release.ep")} name="ep" />
				</Column>
			</Row>
		</Column>
	)
}
export const DigitalOptions = observer((props) => {
	const { t } = useTranslation()

	//const [search, setSearch] = useState("")
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: DocReleaseModel = useDocsModel(workpieceId, "release")
	//const [selectedDistributor, setSelectedDistributor] = useState("")
	//const [searchDistributor, setSearchDistributor] = useState("")
	/*const distributorsList = [
		{
			id: 1,
			name: "Distributor 1",
		},
		{
			id: 2,
			name: "Distributor 2",
		},
		{
			id: 3,
			name: "Distributor 3",
		},
	]
	const searchResultsDistributors = distributorsList.map((distributor) => {
		return {
			id: distributor.id,
			name: distributor.name,
		}
	})*/

	return (
		<Column of="component" style={FormStyles.dropdown}>
			{/*<AddDistributorDropdown
				distributors={searchResultsDistributors.filter((d) =>
					d.name.toLowerCase().indexOf(searchDistributor.toLowerCase() > -1)
				)}
				noFocusToggle
				tooltip=""
				style={{ flex: 1 }}
				onSelect={(distributor) => {
					model.distributors.setValue(distributor)
				}}
				onSearchChange={setSearchDistributor}
			/>*/}
			<TextField
				label={t("document:release.supports.distribution")}
				placeholder={t("document:release.supports.addDistribution")}
				field={model.distributor}
			/>
			<TextField
				label={t("document:release.supports.upc")}
				tooltip=""
				style={{ flex: 1 }}
				field={model.upc}
			/>
		</Column>
	)
})
