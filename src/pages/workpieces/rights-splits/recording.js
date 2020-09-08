import React, { useState } from "react"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useRightSplit } from "../../../appstate/react/workpieces"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import CircledC from "../../../svg/circled-c"
import {
	CheckBoxGroup, CheckBoxGroupButton,
	RadioGroup,
	RadioGroupButton,
} from "../../../forms"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import { View } from "react-native"
import SplitChart from "../../../smartsplit/components/split-chart"
import CircledP from "../../../svg/circled-p"
import { observer } from "mobx-react"

const RecordingForm  =  observer(({ split }) => {
	const [chartSize, setChartSize] = useState(0)
	const shares = split.allShares
	const [mode, setMode] = useState("equal")
	const { t } = useTranslation()
	const shareColors = Object.values(Colors.secondaries)

	function colorByIndex(index) {
		return shareColors[index % shareColors.length]
	}

	function addShareHolder(id) {
		if (split.hasOwnProperty(id)) return
		split.addRightHolder(id, {
			shares: 1,
		})
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

	return (
		<Row>
			<Column of="section" flex={1}>
				<Column of="group">
					<Row of="component">
						<CircledC size={Metrics.size.small} color={Colors.action} />
						<Text action bold>
							{t("rightSplits:titles.recording").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>{t("rightSplits:headers.recording")}</Heading>
						<Paragraph>{t("rightSplits:paragraphs.recording")()}</Paragraph>
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
								onClose={() => split.removeRightHolder(share.rightHolder)}
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
				<SplitChart data={chartData} logo={CircledP} size={chartSize} />
			</Column>
		</Row>
	)
})

export default RecordingForm