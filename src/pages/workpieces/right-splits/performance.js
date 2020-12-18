import React, { useState, useEffect } from "react"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import CircledStar from "../../../svg/circled-star"
import { CheckBoxGroup, CheckBoxGroupButton, Select } from "../../../forms"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/AddCollaboratorDropdown"
import { View } from "react-native"
import SplitChart from "../../../smartsplit/components/split-chart"
import { Observer, observer } from "mobx-react"
import { useRightSplits } from "../context"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/workpiece-state/right-splits/RightSplitState"

const PerformanceForm = observer(() => {
	const UIState = useRightSplits("performance")
	const domainState = UIState.domainState

	const { t } = useTranslation("rightSplits")
	const [styles, setStyles] = useState({})

	useEffect(() => {
		setStyles(UIState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	function genSelectOptions() {
		return domainState.statusValues.map((status) => {
			return {
				key: status,
				value: (
					<>
						<Text>{t(`performance.artistStatuses.${status}`)}</Text>
						<Text secondary>{t(`performance.artistStatusDef.${status}`)}</Text>
					</>
				),
				displayValue: t(`performance.artistStatuses.${status}`),
			}
		})
	}
	const ShareCards = observer(() => {
		return UIState.sharesData.map((share) => (
			<ShareCard
				key={share.id}
				shareholderId={share.id}
				color={UIState.shareholderColors.get(share.id)}
				sharePercent={share.percent}
				onClose={() => domainState.removeShareholder(share.id)}
			>
				<Select
					placeholder={t("status")}
					options={genSelectOptions()}
					value={share.status}
					onChange={(value) => domainState.setShareStatus(share.id, value)}
					style={styles.selectFrame}
				/>
				<Observer>
					{() => (
						<CheckBoxGroup
							selection={share.roles}
							onChange={(roles) =>
								domainState.updateShareField(share.id, "roles", roles)
							}
						>
							<Row style={styles.checkboxesContainer}>
								<Column of="component">
									<CheckBoxGroupButton
										value="singer"
										label={t("roles.singer")}
										style={styles.checkbox}
									/>
									<CheckBoxGroupButton
										value="musician"
										label={t("roles.musician")}
										style={styles.checkbox}
									/>
								</Column>
							</Row>
						</CheckBoxGroup>
					)}
				</Observer>
				<Row of="component" valign="center">
					<ProgressBar
						progress={share.percent}
						size="xsmall"
						style={{ flex: 1 }}
						color={UIState.shareholderColors.get(share.id)}
					/>
					<Text bold>{formatPercentage(share.percent)}</Text>
				</Row>
			</ShareCard>
		))
	})

	return (
		<Row
			onLayout={(e) =>
				(UIState.chartSize = e.nativeEvent.layout.width * CHART_WINDOW_RATIO)
			}
		>
			<Column of="section" flex={1}>
				<Column of="group">
					<Row of="component">
						<CircledStar size={Metrics.size.small} color={Colors.action} />
						<Text action bold>
							{t("performance.title").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>{t("performance.header")}</Heading>
						<Paragraph>{t("performance.description")()}</Paragraph>
					</Column>
				</Column>
				<Column of="component">
					<ShareCards />
					<AddCollaboratorDropdown
						onSelect={(id) => domainState.addShareholder(id)}
						placeholder={t("addCollab")}
					/>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				{domainState.mode && (
					<View style={styles.chart}>
						<SplitChart {...UIState.genChartProps()} />
					</View>
				)}
			</Column>
		</Row>
	)
})

export default PerformanceForm
