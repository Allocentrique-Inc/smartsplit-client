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
import { observer } from "mobx-react"
import { useRightsSplits } from "../context"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/WorkpieceStates/RightSplitStates/UIStates/SplitUIState"

const PerformanceForm = observer(() => {
	const { domainState, UIState } = useRightsSplits().performance
	const { t } = useTranslation("rightsSplits")
	const [styles, setStyles] = useState({})

	useEffect(() => {
		setStyles(UIState.getStyles(window.outerWidth))
	}, [window.outerWidth])

	//FOR TESTING PURPOSE
	// React.useEffect(() => {
	// 	domainState.addShareholder("4f4950de-e5cd-41ea-84cb-997fc8f9183f")
	// 	domainState.addShareholder("4154a7d5-578a-4fd9-b43b-98b1330c0fd1")
	// }, [])

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
	function renderShareCards() {
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
					{renderShareCards()}
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
