import React, { useEffect, useState } from "react"
import { View, TouchableWithoutFeedback } from "react-native"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
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
import { useSplitsPagesState } from "../../../mobX/hooks"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/UIStates/RightsSplitsPages/SplitPageState"
import { CheckBoxGroup } from "../../../forms/checkbox"

const CopyrightForm = observer(() => {
	const copyrightSplit = useRightsSplits("copyright")
	const pageState = useSplitsPagesState("copyright")
	const { sharesData, shareTotal } = pageState
	const { t } = useTranslation("rightsSplits")
	const [styles, setStyles] = useState({})
	useEffect(() => {
		setStyles(pageState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	//FOR TESTING PURPOSE
	// React.useEffect(() => {
	// 	copyrightSplit.addShareholder("235556b5-3bbb-4c90-9411-4468d873969b")
	// 	copyrightSplit.addShareholder("c84d5b32-25ee-48df-9651-4584b4b78f28")
	// }, [])

	const LockButton = ({ id, locked }) => (
		<TouchableWithoutFeedback
			onPress={() => copyrightSplit.toggleShareLock(id)}
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
				onClose={() => copyrightSplit.removeShareholder(share.id)}
				bottomAction={
					copyrightSplit.mode === "manual" ? (
						<LockButton id={share.id} locked={share.locked} />
					) : null
				}
			>
				<CheckBoxGroup
					selection={share.roles}
					onChange={(roles) => copyrightSplit.setRoles(share.id, roles)}
				>
					<Row>
						<Column flex={1} of="component">
							<CheckBoxGroupButton value="author" label={t("roles.author")} />
							<CheckBoxGroupButton
								value="adapter"
								label={t("roles.adapter")}
								disabled={pageState.isAdapterDisabled(share.roles)}
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
								disabled={pageState.isMixerDisabled(share.roles)}
							/>
						</Column>
					</Row>
				</CheckBoxGroup>
				<Row of="component" valign="center">
					{copyrightSplit.mode === "manual" && (
						<>
							<Slider
								min={0}
								max={shareTotal}
								color={pageState.colorByIndex(i)}
								step={0.01}
								value={share.shares}
								disabled={share.locked}
								onChange={(value) =>
									copyrightSplit.updateSharesProRata(share.id, value)
								}
							/>
							<PercentageInput
								value={share.percent}
								digits={2}
								onChange={(percentage) =>
									copyrightSplit.updateSharesProRata(
										share.id,
										(percentage * shareTotal) / 100
									)
								}
							/>
						</>
					)}
					{copyrightSplit.mode !== "manual" && (
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
						value={copyrightSplit.mode}
						onChange={(mode) => runInAction(() => (copyrightSplit.mode = mode))}
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
							onSelect={(id) => copyrightSplit.addShareholder(id)}
							placeholder={t("addCollab")}
						/>
					</Column>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				{sharesData.length > 0 && (
					<View style={styles.chart}>
						{copyrightSplit.mode === "roles" && (
							<DualSplitChart
								{...pageState.genChartProps(copyrightSplit.mode)}
							/>
						)}
						{copyrightSplit.mode !== "roles" && (
							<SplitChart {...pageState.genChartProps(copyrightSplit.mode)} />
						)}
					</View>
				)}
			</Column>
		</Row>
	)
})
export default CopyrightForm
