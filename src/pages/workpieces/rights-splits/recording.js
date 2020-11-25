import React, { useState, useEffect } from "react"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import { RadioGroup, RadioGroupButton, Select } from "../../../forms"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import { View, TouchableWithoutFeedback } from "react-native"
import SplitChart from "../../../smartsplit/components/split-chart"
import CircledP from "../../../svg/circled-p"
import Lock from "../../../svg/lock"
import Unlock from "../../../svg/unlock"
import { observer } from "mobx-react"
import { useRightsSplits } from "../context"
import { useSplitsPagesState } from "../../../mobX/hooks"
import Slider from "../../../widgets/slider"
import { PercentageInput } from "../../../forms/percentage"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { runInAction } from "mobx"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/UIStates/RightsSplitsPages/SplitPageState"

const RecordingForm = observer(() => {
	const recordingSplit = useRightsSplits("recording")
	const pageState = useSplitsPagesState("recording")
	const { sharesData, shareTotal } = pageState
	const { t } = useTranslation("rightsSplits")
	const [styles, setStyles] = useState({})

	useEffect(() => {
		setStyles(pageState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	//FOR TESTING PURPOSE
	React.useEffect(() => {
		recordingSplit.addShareholder("235556b5-3bbb-4c90-9411-4468d873969b")
		recordingSplit.addShareholder("c84d5b32-25ee-48df-9651-4584b4b78f28")
	}, [])

	function genSelectOptions() {
		return recordingSplit.functionValues.map((value) => {
			return {
				key: value,
				value: (
					<>
						<Text>{t(`recording.functions.${value}`)}</Text>
						<Text secondary>{t(`recording.functionDefs.${value}`)}</Text>
					</>
				),
				displayValue: t(`recording.functions.${value}`),
			}
		})
	}

	const LockButton = ({ id, locked }) => (
		<TouchableWithoutFeedback
			onPress={() => recordingSplit.toggleShareLock(id)}
		>
			<View>{locked ? <Lock /> : <Unlock />}</View>
		</TouchableWithoutFeedback>
	)

	function renderShareCards() {
		return sharesData.map((share, i) => (
			<ShareCard
				key={share.id}
				shareholderId={share.id}
				color={pageState.colorByIndex(i)}
				sharePercent={share.percent}
				onClose={() => recordingSplit.removeShareholder(share.id)}
				bottomAction={
					recordingSplit.mode === "manual" ? (
						<LockButton id={share.id} locked={share.locked} />
					) : null
				}
			>
				<Select
					placeholder={t("function")}
					options={genSelectOptions()}
					value={share.function}
					onChange={(value) => recordingSplit.setShareFunction(share.id, value)}
					style={styles.selectFrame}
				/>
				<Row of="component" valign="center">
					{recordingSplit.mode === "manual" && (
						<>
							<Slider
								min={0}
								max={shareTotal}
								color={pageState.colorByIndex(i)}
								step={0.01}
								value={share.shares}
								disabled={share.locked}
								onChange={(value) =>
									recordingSplit.updateSharesProRata(share.id, value)
								}
							/>
							<PercentageInput
								value={share.percent}
								digits={2}
								onChange={(percentage) =>
									recordingSplit.updateSharesProRata(
										share.id,
										(percentage * shareTotal) / 100
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
							onSelect={recordingSplit.addShareholder}
							placeholder={t("addCollab")}
						/>
					</Column>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				{shareTotal > 0 && (
					<View style={styles.chart}>
						<SplitChart {...pageState.genChartProps()} />
					</View>
				)}
			</Column>
		</Row>
	)
})

export default RecordingForm
