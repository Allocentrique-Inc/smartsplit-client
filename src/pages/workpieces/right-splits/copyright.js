import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/AddCollaboratorDropdown"
import SplitChart, {
	DualSplitChart,
} from "../../../smartsplit/components/split-chart"
import CircledC from "../../../svg/circled-c"
import {
	CheckBoxGroupButton,
	RadioGroup,
	RadioGroupButton,
} from "../../../forms"
import { useTranslation } from "react-i18next"
import { Observer, observer } from "mobx-react"
import { useCurrentWorkpieceId } from "../context"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import Slider from "../../../widgets/slider"
import LockButton from "../../../widgets/lock-button"

import { runInAction } from "mobx"
import PercentageInput from "../../../forms/percentage"
import { CheckBoxGroup } from "../../../forms/checkbox"
import { useRightSplits } from "../../../mobX/hooks"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/right-splits/RightSplitState"

const CopyrightForm = observer(() => {
	const splitState = useRightSplits(useCurrentWorkpieceId(), "copyright")
	const domainState = splitState.domainState
	const { shareholdersData, shareTotal } = splitState
	const { t } = useTranslation("rightSplits")
	const [styles, setStyles] = useState({})
	useEffect(() => {
		setStyles(splitState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	const ShareCardView = observer(({ shareholder }) => (
		<ShareCard
			shareholderId={shareholder.id}
			color={splitState.shareholderColors.get(shareholder.id)}
			sharePercent={shareholder.percent}
			onClose={() =>
				runInAction(() => domainState.removeShareholder(shareholder.id))
			}
			bottomAction={
				domainState.mode === "manual" ? (
					<LockButton
						id={shareholder.id}
						locked={shareholder.locked}
						onClick={() => domainState.toggleShareLock(shareholder.id)}
						disabled={splitState.disabledLockButton}
					/>
				) : null
			}
		>
			<Observer>
				{() => (
					<CheckBoxGroup
						selection={shareholder.roles}
						onChange={(roles) => domainState.setRoles(shareholder.id, roles)}
					>
						<Row>
							<Column flex={1} of="component">
								<CheckBoxGroupButton value="author" label={t("roles.author")} />
								<CheckBoxGroupButton
									value="adapter"
									label={t("roles.adapter")}
									disabled={splitState.isAdapterDisabled(shareholder.roles)}
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
									disabled={splitState.isMixerDisabled(shareholder.roles)}
								/>
							</Column>
						</Row>
					</CheckBoxGroup>
				)}
			</Observer>
			<Row of="component" valign="center">
				{domainState.mode === "manual" && (
					<Observer>
						{() => (
							<>
								<Slider
									min={0}
									max={shareTotal}
									color={splitState.shareholderColors.get(shareholder.id)}
									step={0.01}
									value={shareholder.shares}
									disabled={shareholder.locked}
									onChange={(value) =>
										domainState.updateSharesProRata(shareholder.id, value)
									}
								/>
								<PercentageInput
									value={shareholder.percent}
									digits={2}
									onChange={(percentage) =>
										domainState.updateSharesProRata(
											shareholder.id,
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
							progress={shareholder.percent}
							size="xsmall"
							style={{ flex: 1 }}
							color={splitState.shareholderColors.get(shareholder.id)}
						/>
						<Text bold>{formatPercentage(shareholder.percent)}</Text>
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
						{shareholdersData.map((shareholder) => (
							<ShareCardView shareholder={shareholder} key={shareholder.id} />
						))}
						<AddCollaboratorDropdown
							onSelect={(user) =>
								runInAction(() => domainState.addShareholder(user.user_id))
							}
							placeholder={t("addCollab")}
						/>
					</Column>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				{shareholdersData.length > 0 && (
					<View style={styles.chart}>
						{domainState.mode === "roles" && (
							<DualSplitChart {...splitState.genChartProps(domainState.mode)} />
						)}
						{domainState.mode !== "roles" && (
							<SplitChart {...splitState.genChartProps(domainState.mode)} />
						)}
					</View>
				)}
			</Column>
		</Row>
	)
})
export default CopyrightForm
