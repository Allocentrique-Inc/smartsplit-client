import React, { useEffect, useState } from "react"
import { View, TouchableWithoutFeedback } from "react-native"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/AddCollaboratorDropdown"
import SplitChart, {
	DualSplitChart,
} from "../../../smartsplit/components/split-chart"
import CircledC from "../../../svg/circled-c"
import Lock from "../../../svg/lock"
import Unlock from "../../../svg/unlock"
import {
	CheckBoxGroupButton,
	RadioGroup,
	RadioGroupButton,
} from "../../../forms"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { useRightsSplits } from "../context"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import Slider from "../../../widgets/slider"
import { runInAction } from "mobx"
import PercentageInput from "../../../forms/percentage"
import { CheckBoxGroup } from "../../../forms/checkbox"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/WorkpieceStates/RightSplitStates/UIStates/SplitUIState"

const CopyrightForm = observer(() => {
	const { domainState, UIState } = useRightsSplits().copyright
	const { sharesData, shareTotal } = UIState
	const { t } = useTranslation("rightsSplits")
	const [styles, setStyles] = useState({})
	useEffect(() => {
		setStyles(UIState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	//FOR TESTING PURPOSE
	// React.useEffect(() => {
	// 	domainState.addShareholder("235556b5-3bbb-4c90-9411-4468d873969b")
	// 	domainState.addShareholder("c84d5b32-25ee-48df-9651-4584b4b78f28")
	// }, [])

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
				<CheckBoxGroup
					selection={share.roles}
					onChange={(roles) => domainState.setRoles(share.id, roles)}
				>
					<Row>
						<Column flex={1} of="component">
							<CheckBoxGroupButton value="author" label={t("roles.author")} />
							<CheckBoxGroupButton
								value="adapter"
								label={t("roles.adapter")}
								disabled={UIState.isAdapterDisabled(share.roles)}
							/>
						</Column>
						<Column flex={1} of="component">
							<CheckBoxGroupButton
								value="composer"
								label={t("roles.composer")}
							/>
							<CheckBoxGroupButton
								value="mixer"
								label={t("roles.mixer")}
								disabled={UIState.isMixerDisabled(share.roles)}
							/>
						</Column>
					</Row>
				</CheckBoxGroup>
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
						<CircledC size={Metrics.size.small} color={Colors.action} />
						<Text action bold>
							{t("copyright.title").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>{t("copyright.header")}</Heading>
						<Paragraph>{t("copyright.description")()}</Paragraph>
					</Column>
				</Column>
				<Column of="group">
					<RadioGroup
						value={domainState.mode}
						onChange={(mode) => runInAction(() => (domainState.mode = mode))}
					>
						<Column of="component">
							<RadioGroupButton value="equal" label={t("radios.equal")} />
							<RadioGroupButton value="roles" label={t("radios.roles")} />
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
				{sharesData.length > 0 && (
					<View style={styles.chart}>
						{domainState.mode === "roles" && (
							<DualSplitChart {...UIState.genChartProps(domainState.mode)} />
						)}
						{domainState.mode !== "roles" && (
							<SplitChart {...UIState.genChartProps(domainState.mode)} />
						)}
					</View>
				)}
			</Column>
		</Row>
	)
})
export default CopyrightForm
