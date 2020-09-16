import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import SplitChart, {
	DualSplitChart,
} from "../../../smartsplit/components/split-chart"
import CircledC from "../../../svg/circled-c"
import {
	CheckBoxGroup,
	CheckBoxGroupButton,
	RadioGroup,
	RadioGroupButton,
} from "../../../forms"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { useRightSplit } from "../context"

const CopyrightForm = observer(() => {
	const split = useRightSplit("copyright")
	const [chartSize, setChartSize] = useState(0)
	const shares = split.allShares
	const [mode, setMode] = useState("equal")
	const { t } = useTranslation()
	const shareColors = Object.values(Colors.secondaries)

	function colorByIndex(index) {
		return shareColors[index % shareColors.length]
	}

	function sharesToData(shares) {
		return shares.map((share, i) => ({
			key: share.rightHolder,
			name: share.rightHolder,
			share: share.shares,
			color: colorByIndex(i),
		}))
	}

	function addShareHolder(id) {
		if (split.hasOwnProperty(id)) return
		split.addRightHolder(id, {
			shares: 1,
		})
	}

	let chartProps = {
		size: chartSize,
		logo: CircledC,
	}

	function generateChartData() {
		switch (mode) {
			case "equal":
				split.updateShares(
					shares.map((share) => {
						!share.roles.includes("author") && share.roles.push("author")
						!share.roles.includes("composer") &&
							share.roles.push("composer")
						return share
					})
				)
				chartProps.data = sharesToData(shares)

				break
			case "roles":
				chartProps.dataRight = sharesToData(
					shares.filter(
						(share) =>
							share.roles.includes("composer") ||
							share.roles.includes("mixer") ||
							share.roles.includes("adapter")
					)
				)
				chartProps.dataLeft = sharesToData(
					shares.filter((share) => share.roles.includes("author"))
				)
				chartProps.titleLeft = t("rightSplits:lyrics")
				chartProps.titleRight = t("rightSplits:music")
				break
			case "manual":
				chartProps.data = sharesToData(shares)
		}
	}

	generateChartData()

	useEffect(() => generateChartData(), [mode])

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
							{t("rightSplits:titles.copyright").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>{t("rightSplits:headers.copyright")}</Heading>
						<Paragraph>{t("rightSplits:paragraphs.copyright")()}</Paragraph>
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
								value="roles"
								label={t("rightSplits:radios.roles")}
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
								<CheckBoxGroup
									selection={share.roles}
									onChange={(roles) => share.setData("roles", roles)}
								>
									<Row>
										<Column flex={1} of="component">
											<CheckBoxGroupButton
												value="author"
												label={t("roles:author")}
												disabled={mode === "equal"}
											/>
											<CheckBoxGroupButton
												value="adapter"
												label={t("roles:adapter")}
											/>
										</Column>
										<Column flex={1} of="component">
											<CheckBoxGroupButton
												value="composer"
												label={t("roles:composer")}
												disabled={mode === "equal"}
											/>
											<CheckBoxGroupButton
												value="mixer"
												label={t("roles:mixer")}
											/>
										</Column>
									</Row>
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
				{mode === "roles" && <DualSplitChart {...chartProps} />}
				{mode !== "roles" && <SplitChart {...chartProps} />}
			</Column>
		</Row>
	)
})
export default CopyrightForm
