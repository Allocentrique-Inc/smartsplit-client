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
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { useRightSplits } from "../../../mobX/hooks"
import { useCurrentWorkpieceId } from "../context"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/right-splits/RightSplitState"

const PerformanceForm = observer(() => {
	const splitState = useRightSplits(useCurrentWorkpieceId(), "performance")
	const domainState = splitState.domainState

	const { t } = useTranslation("rightSplits")
	const [styles, setStyles] = useState({})
	useEffect(() => {
		setStyles(splitState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	function genSelectOptions() {
		return domainState.statusValues.map((status) => {
			return {
				key: status,
				value: (
					<>
						<Text>{t(`forms:labels.dropdowns.artistTypes.${status}`)}</Text>
						<Text secondary>
							{t(`forms:labels.dropdowns.artistTypesDescription.${status}`)}
						</Text>
					</>
				),
				displayValue: t(`forms:labels.dropdowns.artistTypes.${status}`),
			}
		})
	}
	const ShareCards = observer(() => {
		return splitState.shareholdersData.map((share) => (
			<ShareCard
				key={share.id}
				shareholderId={share.id}
				color={splitState.shareholderColors.get(share.id)}
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
						color={splitState.shareholderColors.get(share.id)}
					/>
					<Text bold>{formatPercentage(share.percent)}</Text>
				</Row>
			</ShareCard>
		))
	})

	return (
		<Row
			onLayout={(e) =>
				(splitState.chartSize = e.nativeEvent.layout.width * CHART_WINDOW_RATIO)
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
						onSelect={(user) => domainState.addShareholder(user.user_id)}
						placeholder={t("addCollab")}
					/>
				</Column>
			</Column>
			<View style={styles.spacer} />
			<Column>
				{domainState.mode && (
					<View style={styles.chart}>
						<SplitChart {...splitState.genChartProps()} />
					</View>
				)}
			</Column>
		</Row>
	)
})

export default PerformanceForm
