import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph, Link } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import {
	RadioGroupButton,
	RadioButton,
	RadioGroup,
	CheckBox,
	CheckBoxGroup,
	Dropdown,
	FileField,
} from "../../../forms"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import FilesIcon from "../../../svg/files"
import Unlock from "../../../svg/unlock"
import Download from "../../../svg/download"

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

export default function Files() {
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
		history.push(`/workpieces/${workpiece.id}/documentation/general-infos`)
	}

	return (
		<Layout
			workpiece={workpiece}
			path={[
				t("document:navbar.document"),
				t("document:navbar.pages.performance"),
			]}
			progress={62.5}
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
			<FilesForm />
		</Layout>
	)
}

export function FilesForm(props) {
	const { t } = useTranslation()

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold style={Styles.category}>
						<FilesIcon style={Styles.logo} />
						{t("document:files.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:files.title")}</Heading>
					<Paragraph>{t("document:files.paragraph")}</Paragraph>

					<Spacer of="component" />

					<Heading level={3}>{t("document:files.visual.title")}</Heading>
					<Column of="inside">
						<Paragraph>{t("document:files.visual.paragraph")}</Paragraph>
						<Link>{t("general:more")}</Link>
					</Column>
					<Column of="component">
						<Row of="component">
							<FileField
								name="file_upload"
								label={t("document:files.visual.format")}
								undertext={t("document:files.visual.undertext")}
								style={{ flex: 4 }}
							/>
							<Dropdown
								label={t("document:access")}
								placeholder={
									<>
										<Download />
										<Flex />
									</>
								}
								noFocusToggle
								tooltip=""
							/>
						</Row>
					</Column>

					<Spacer of="component" />
					<Hairline />
					<Spacer of="component" />

					<Column of="component">
						<Heading level={3}>{t("document:files.audio.title")}</Heading>
						<Paragraph>{t("document:files.audio.paragraph")}</Paragraph>
						<Row of="component">
							<FileField
								name="file_upload"
								label={t("document:files.audio.format")}
								undertext={t("document:files.audio.undertext")}
								style={{ flex: 4 }}
							/>
							<Dropdown
								label={t("document:access")}
								placeholder={
									<>
										<Unlock />
										<Flex />
									</>
								}
								noFocusToggle
								tooltip=""
							/>
						</Row>
					</Column>

					<Spacer of="component" />
					<Hairline />
					<Spacer of="component" />

					<Heading level={3}>{t("document:files.other.title")}</Heading>
					<Paragraph>{t("document:files.other.paragraph")}</Paragraph>
					<Row of="component">
						<FileField
							name="file_upload"
							label={t("document:files.other.formatTablature")}
							undertext={t("document:files.other.undertext")}
							style={{ flex: 4 }}
						/>
						<Dropdown
							label={t("document:access")}
							placeholder={
								<>
									<Unlock />
									<Flex />
								</>
							}
							noFocusToggle
							tooltip=""
						/>
					</Row>
					<Row of="component">
						<FileField
							name="file_upload"
							label={t("document:files.other.formatMidi")}
							undertext={t("document:files.other.undertext")}
							style={{ flex: 4 }}
						/>
						<Dropdown
							label={t("document:access")}
							placeholder={
								<>
									<Unlock />
									<Flex />
								</>
							}
							noFocusToggle
							tooltip=""
						/>
					</Row>
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

export function PerformanceOptions(props) {
	const { t } = useTranslation()
	const [showInstruments, setShowInstruments] = useState()
	const { singer, musician } = props

	return (
		<Column>
			<Row>
				<Column padding="component" layer="left_overground" />
				<Column of="group" flex={5}>
					<RadioGroup label={t("document:performance.whichPerformance")}>
						<RadioGroupButton
							value="singer"
							label={t("general:radioButton.singer")}
						/>
						<RadioGroupButton
							value="musician"
							label={t("general:radioButton.musician")}
						/>
					</RadioGroup>
					<CheckBoxGroup label={t("document:performance.whichRole")}>
						<CheckBox value={singer} label={t("general:checkbox.singer")} />
						<CheckBox
							onChange={setShowInstruments}
							checked={showInstruments}
							value={musician}
							label={t("general:checkbox.musician")}
						/>
					</CheckBoxGroup>

					{musician && (
						<Column style={Styles.dropdown}>
							<Dropdown
								style={{ flex: 1 }}
								placeholder={t("document:performance.addInstrument")}
								noFocusToggle
							/>
						</Column>
					)}

					<Column style={Styles.dropdown}>
						<Dropdown
							style={{ flex: 1 }}
							placeholder={t("document:performance.addInstrument")}
							noFocusToggle
						/>
					</Column>
				</Column>
			</Row>

			<Spacer of="section" />

			<Column of="section">
				<Hairline />
				<AddCollaboratorDropdown
					searchResults={props.searchResults}
					searchInput={props.search}
					onSearchChange={props.setSearch}
					onSelect={(selection) => console.log(selection)}
					placeholder={t("forms:labels.dropdowns.addCollaborator")}
				/>
			</Column>
		</Column>
	)
}
