import React, { useState } from "react"
import { useHistory } from "react-router"
import { useCurrentWorkpiece } from "../context"
import { Column, Row, Flex, Hairline } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { useRightSplit } from "../../../appstate/react/workpieces"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import CircledC from "../../../svg/circled-c"
import {
	CheckBoxGroup,
	CheckBoxGroupButton,
	RadioGroup,
	RadioGroupButton,
} from "../../../forms"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import { View } from "react-native"
import SplitChart from "../../../smartsplit/components/split-chart"
import CircledP from "../../../svg/circled-p"
import CircledStar from "../../../svg/circled-star"

export function InterpretationPage() {
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()
	const { t } = useTranslation()

	function saveAndQuit() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function navigateToCopyright() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/copyright`)
	}

	function navigateToRecording() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/recording`)
	}

	return (
		<Layout
			workpiece={workpiece}
			path={[
				t("rightSplits:navbar.rightSplits"),
				t("rightSplits:titles.interpretation"),
			]}
			progress={(2 / 3) * 100}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveAndClose")}
					onClick={saveAndQuit}
				/>
			}
			formNav={
				<>
					<Row flex={1}>
						<Button
							secondary
							text={t("general:buttons.back")}
							onClick={navigateToCopyright}
						/>
						<Flex />
						<Button
							primary
							text={t("general:buttons.continue")}
							onClick={navigateToRecording}
						/>
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<InterpretationForm />
		</Layout>
	)
}

export default function InterpretationForm() {
	const [chartSize, setChartSize] = useState(0)
	const [splits, shares, addShareHolder] = useRightSplit("interpretation")
	const [mode, setMode] = useState("equal")
	const { t } = useTranslation()
	const shareColors = Object.values(Colors.secondaries)

	function colorByIndex(index) {
		return shareColors[index % shareColors.length]
	}

	let chartData = shares.map((share, i) => ({
		key: share.rightHolder,
		name: share.rightHolder,
		share: share.shares,
		color: colorByIndex(i),
	}))

	const totalShares = shares
		.map((share) => share.shares)
		.reduce((a, n) => a + n, 0)

	const [selection, setSelection] = useState([])
	return (
		<Row>
			<Column of="section" flex={1}>
				<Column of="group">
					<Row of="component">
						<CircledC size={Metrics.size.small} color={Colors.action} />
						<Text action bold>
							{t("rightSplits:titles.interpretation").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>
							{t("rightSplits:headers.interpretation")}
						</Heading>
						<Paragraph>
							{t("rightSplits:paragraphs.interpretation")()}
						</Paragraph>
					</Column>
				</Column>
				<Column of="group">
					<RadioGroup value={mode} onChange={setMode}>
						<Column of="component">
							<RadioGroupButton
								value="equal"
								label={t("rightSplits:radios.equal")}
							/>
							<RadioGroupButton
								value="manual"
								label={t("rightSplits:radios.manual")}
							/>
						</Column>
					</RadioGroup>
					<Column of="component">
						{shares.map((share, i) => (
							<ShareCard
								key={share.rightHolder}
								rightHolderId={share.rightHolder}
								color={colorByIndex(i)}
								sharePercent={
									share.shares > 0 ? (100 * share.shares) / totalShares : 0
								}
								onClose={() => splits.removeRightHolder(share.rightHolder)}
							>
								<CheckBoxGroup selection={selection} onChange={setSelection}>
									<CheckBoxGroupButton
										value="author"
										label={t("roles:singer")}
									/>
									<CheckBoxGroupButton
										value="adapter"
										label={t("roles:musician")}
									/>
								</CheckBoxGroup>
							</ShareCard>
						))}
						<AddCollaboratorDropdown onSelect={addShareHolder} />
					</Column>
				</Column>
			</Column>
			<View
				style={{
					width: 3 * Metrics.spacing.group,
					height: 3 * Metrics.spacing.group,
				}}
			/>
			<Column
				flex={1}
				align="center"
				onLayout={(e) => setChartSize(e.nativeEvent.layout.width)}
			>
				<SplitChart data={chartData} logo={CircledStar} size={chartSize} />
			</Column>
		</Row>
	)
}
