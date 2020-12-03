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
import ReleasetIcon from "../../../svg/release"
import {
	CheckBox,
	CheckBoxGroup,
	Dropdown,
	DateField,
	TextField,
	Select,
} from "../../../forms"
import { toJS } from "mobx"
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
import DocReleaseModel from "../../../mobX/models/workpieces/documentation/DocReleaseModel"
import Field from "../../../mobX/BaseModel/Field"

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
				<Text action bold style={Styles.category}>
					<ReleasetIcon style={Styles.logo} />
					{t("document:release.category")}
					<Row padding="tiny" />
				</Text>
				<Heading level={1}>{t("document:release.title")}</Heading>
				<Paragraph>{t("document:release.paragraph")}</Paragraph>

				<Spacer of="group" />
				{/* ToDo: Undertext does not appear */}
				<DateField
					label={t("document:release.date")}
					undertext={t("document:release.dateHint")}
					value={date}
					onChangeText={setDate}
					placeholder={t("forms:placeholders.date")}
					tooltip=""
				/>
				<Dropdown
					label="Label"
					placeholder={t("document:release.addLabel")}
					noFocusToggle
					tooltip=""
				/>
				<Select
					label={t("document:release.format")}
					placeholder=""
					tooltip=""
					options={[{ key: "EP", value: "EP" }]}
					onChange={setShowEP}
					checked={showEP}
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

export function DigitalOptions() {
	const { t } = useTranslation()
	return (
		<Column of="component" style={Styles.dropdown}>
			<Dropdown
				label={t("document:release.supports.distribution")}
				placeholder={t("document:release.supports.addDistribution")}
				noFocusToggle
				tooltip=""
				style={{ flex: 1 }}
			/>
			<Dropdown
				label={t("document:release.supports.upc")}
				noFocusToggle
				tooltip=""
				style={{ flex: 1 }}
			/>
		</Column>
	)
}
