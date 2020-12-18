import React, { useState, useEffect } from "react"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import { RadioGroup, RadioGroupButton, Select } from "../../../forms"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/AddCollaboratorDropdown"
import { View, TouchableWithoutFeedback } from "react-native"
import SplitChart from "../../../smartsplit/components/split-chart"
import CircledP from "../../../svg/circled-p"
import Lock from "../../../svg/lock"
import Unlock from "../../../svg/unlock"
import { observer } from "mobx-react"
import { useRightsSplits } from "../context"
import Slider from "../../../widgets/slider"
import { PercentageInput } from "../../../forms/percentage"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { runInAction } from "mobx"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/WorkpieceStates/RightSplitStates/UIStates/SplitUIState"

const RecordingForm = observer(() => {
	const { domainState, UIState } = useRightsSplits().recording
	const { sharesData, shareTotal } = UIState
	const { t } = useTranslation("rightsSplits")
	const [styles, setStyles] = useState({})

	useEffect(() => {
		setStyles(UIState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	//FOR TESTING PURPOSE
	// React.useEffect(() => {
	// 	domainState.addShareholder("b549ebd3-5c3b-4184-a3dd-bc5b8895073a")
	// 	domainState.addShareholder("7e7984ac-1d9e-4ed3-b150-0560062caee0")
	// }, [])

	console.log(UIState.sharesData)

	function genSelectOptions() {
		return domainState.functionValues.map((value) => {
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
		<TouchableWithoutFeedback onPress={() => domainState.toggleShareLock(id)}>
			<View>{locked ? <Lock /> : <Unlock />}</View>
		</TouchableWithoutFeedback>
	)

	function renderShareCards() {
		return sharesData.map((share) => (
			<ShareCard
				key={share.id}
				shareholderId={share.id}
				color={UIState.shareholderColors.get(share.id)}
				sharePercent={share.percent}
				onClose={() => domainState.removeShareholder(share.id)}
				bottomAction={
					domainState.mode === "manual" ? (
						<LockButton id={share.id} locked={share.locked} />
					) : null
				}
			>
				<Select
					placeholder={t("function")}
					options={genSelectOptions()}
					value={share.function}
					onChange={(value) => domainState.setShareFunction(share.id, value)}
					style={styles.selectFrame}
				/>
				<Row of="component" valign="center">
					{domainState.mode === "manual" && (
						<>
							<Slider
								min={0}
								max={shareTotal}
								color={UIState.shareholderColors.get(share.id)}
								step={0.01}
								value={share.shares}
								disabled={share.locked}
								onChange={(value) =>
									domainState.updateSharesProRata(share.id, value)
								}
							/>
							<PercentageInput
								value={share.percent}
								digits={2}
								onChange={(percentage) =>
									domainState.updateSharesProRata(
										share.id,
										(percentage * shareTotal) / 100
									)
								}
							/>
						</>
					)}
					{domainState.mode !== "manual" && (
						<>
							<ProgressBar
								progress={share.percent}
								size="xsmall"
								style={{ flex: 1 }}
								color={UIState.shareholderColors.get(share.id)}
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
				(UIState.chartSize = e.nativeEvent.layout.width * CHART_WINDOW_RATIO)
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
						value={domainState.mode}
						onChange={(mode) => runInAction(() => (domainState.mode = mode))}
					>
						<Column of="component">
							<RadioGroupButton value="equal" label={t("radios.equal")} />
							<RadioGroupButton value="manual" label={t("radios.manual")} />
						</Column>
					</RadioGroup>
					<Column of="component">
						{renderShareCards()}
						<AddCollaboratorDropdown
							onSelect={(id) => domainState.addShareholder(id)}
							placeholder={t("addCollab")}
						/>
					</Column>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				{shareTotal > 0 && (
					<View style={styles.chart}>
						<SplitChart {...UIState.genChartProps()} />
					</View>
				)}
			</Column>
		</Row>
	)
})

export default RecordingForm
