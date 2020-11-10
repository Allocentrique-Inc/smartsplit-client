import React, { useState, useEffect } from "react"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
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
import { observer } from "mobx-react"
import { useRightsSplits } from "../context"
import { useSplitsPagesState } from "../../../mobX/hooks"
import { initData } from "../../../mobX/models/workpieces/rights-splits/RecordingSplitModel"
import Slider from "../../../widgets/slider"
import { PercentageInput } from "../../../forms/percentage"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { runInAction } from "mobx"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/UIStates/RightsSplitsPages/SplitPageState"

const RecordingForm = observer(() => {
	const recordingSplit = useRightsSplits("recording")
	const pageState = useSplitsPagesState("copyright")
	const { sharesData, sharesTotal } = pageState
	const { t } = useTranslation("rightsSplits")
	const [styles, setStyles] = useState({})

	useEffect(() => {
		setStyles(pageState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	function addShareHolder(id) {
		if (id && !recordingSplit.shareHolders.has(id)) {
			recordingSplit.addRightHolder(id, initData)
		}
	}

	//FOR TESTING PURPOSE
	// React.useEffect(() => {
	// 	addShareHolder("235556b5-3bbb-4c90-9411-4468d873969b")
	// 	addShareHolder("c84d5b32-25ee-48df-9651-4584b4b78f28")
	// }, [])

	function renderShareCards() {
		return sharesData.map((share, i) => (
			<ShareCard
				key={share.id}
				shareHolderId={share.id}
				color={pageState.colorByIndex(i)}
				sharePercent={share.percent}
				onClose={() => recordingSplit.removeRightHolder(share.id)}
				manual={recordingSplit.mode === "manual"}
			>
				<CheckBoxGroup
					selection={share.roles}
					onChange={(roles) =>
						recordingSplit.updateShareField(share.id, "roles", roles)
					}
				>
					<Row>
						<Column flex={1} of="component">
							<CheckBoxGroupButton
								value="author"
								label={t("roles.author")}
								disabled={recordingSplit.mode === "equal"}
							/>
							<CheckBoxGroupButton value="adapter" label={t("roles.adapter")} />
						</Column>
						<Column flex={1} of="component">
							<CheckBoxGroupButton
								value="composer"
								label={t("roles.composer")}
								disabled={recordingSplit.mode === "equal"}
							/>
							<CheckBoxGroupButton value="mixer" label={t("roles.mixer")} />
						</Column>
					</Row>
				</CheckBoxGroup>
				<Row of="component" valign="center">
					{recordingSplit.mode === "manual" && (
						<>
							<Slider
								min={0}
								max={sharesTotal}
								color={pageState.colorByIndex(i)}
								step={0.01}
								value={share.shares}
								onChange={(value) =>
									recordingSplit.updateShare(share.id, value)
								}
							/>
							<PercentageInput
								value={share.percent}
								digits={2}
								onChange={(percentage) =>
									recordingSplit.updateShare(
										share.id,
										(percentage * sharesTotal) / 100
									)
								}
							/>
						</>
					)}
					{recordingSplit.mode !== "manual" && (
						<>
							<ProgressBar
								progress={share.percent}
								size="xsmall"
								style={{ flex: 1 }}
								color={pageState.colorByIndex(i)}
							/>
							<Text bold>{formatPercentage(share.percent)}</Text>
						</>
					)}
				</Row>
			</ShareCard>
		))
	}

	return (
		<Row
			onLayout={(e) =>
				(pageState.chartSize = e.nativeEvent.layout.width * CHART_WINDOW_RATIO)
			}
		>
			<Column of="section" flex={1}>
				<Column of="group">
					<Row of="component">
						<CircledP size={Metrics.size.small} color={Colors.action} />
						<Text action bold>
							{t("recording.title").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>{t("recording.header")}</Heading>
						<Paragraph>{t("recording.description")()}</Paragraph>
					</Column>
				</Column>
				<Column of="group">
					<RadioGroup
						value={recordingSplit.mode}
						onChange={(mode) => runInAction(() => (recordingSplit.mode = mode))}
					>
						<Column of="component">
							<RadioGroupButton value="equal" label={t("radios.equal")} />
							<RadioGroupButton value="manual" label={t("radios.manual")} />
						</Column>
					</RadioGroup>
					<Column of="component">
						{renderShareCards()}
						<AddCollaboratorDropdown
							onSelect={addShareHolder}
							placeholder={t("addCollab")}
						/>
					</Column>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				<View style={styles.chart}>
					<SplitChart {...pageState.genChartProps()} />
				</View>
			</Column>
		</Row>
	)
})

export default RecordingForm
