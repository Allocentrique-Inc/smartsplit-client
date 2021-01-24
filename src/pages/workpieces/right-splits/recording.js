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
import { Observer, observer } from "mobx-react"

import Slider from "../../../widgets/slider"
import { PercentageInput } from "../../../forms/percentage"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { runInAction } from "mobx"
import { useRightSplits } from "../../../mobX/hooks"
import { useCurrentWorkpieceId } from "../context"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/right-splits/RightSplitState"

const RecordingForm = observer(() => {
	const splitState = useRightSplits(useCurrentWorkpieceId(), "recording")
	const domainState = splitState.domainState
	const { shareholdersData, shareTotal } = splitState
	const { t } = useTranslation("rightSplits")
	const [styles, setStyles] = useState({})

	useEffect(() => {
		setStyles(splitState.getStyles(window.outerWidth))
	}, [window.outerWidth])

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

	const LockButton = observer(({ id, locked }) => (
		<TouchableWithoutFeedback onPress={() => domainState.toggleShareLock(id)}>
			<View>{locked ? <Lock /> : <Unlock />}</View>
		</TouchableWithoutFeedback>
	))

	const ShareCardView = observer(({ share }) => (
		<ShareCard
			shareholderId={share.id}
			color={splitState.shareholderColors.get(share.id)}
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
					<Observer>
						{() => (
							<>
								<Slider
									min={0}
									max={shareTotal}
									color={splitState.shareholderColors.get(share.id)}
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
					</Observer>
				)}
				{domainState.mode !== "manual" && (
					<>
						<ProgressBar
							progress={share.percent}
							size="xsmall"
							style={{ flex: 1 }}
							color={splitState.shareholderColors.get(share.id)}
						/>
						<Text bold>{formatPercentage(share.percent)}</Text>
					</>
				)}
			</Row>
		</ShareCard>
	))

	return (
		<Row
			onLayout={(e) =>
				(splitState.chartSize = e.nativeEvent.layout.width * CHART_WINDOW_RATIO)
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
						{shareholdersData.map((share) => (
							<ShareCardView share={share} key={share.id} />
						))}
						<AddCollaboratorDropdown
							onSelect={(user) => domainState.addShareholder(user.user_id)}
							placeholder={t("addCollab")}
						/>
					</Column>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				{shareTotal > 0 && (
					<View style={styles.chart}>
						<SplitChart {...splitState.genChartProps()} />
					</View>
				)}
			</Column>
		</Row>
	)
})

export default RecordingForm
