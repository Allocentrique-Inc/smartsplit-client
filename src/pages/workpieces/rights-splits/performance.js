import React from "react"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import CircledStar from "../../../svg/circled-star"
import { CheckBoxGroup, CheckBoxGroupButton, Select } from "../../../forms"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import { View } from "react-native"
import SplitChart from "../../../smartsplit/components/split-chart"
import { observer } from "mobx-react"
import { useRightsSplits } from "../context"
import { useSplitsPagesState } from "../../../mobX/hooks"
import { initData } from "../../../mobX/models/workpieces/rights-splits/PerformanceSplitModel"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { StyleSheet } from "react-native"
import { runInAction } from "mobx"

const Styles = StyleSheet.create({
	checkboxesContainer: {
		borderLeftWidth: 2,
		borderLeftColor: Colors.stroke,
		paddingLeft: Metrics.spacing.component,
	},
	selectFrame: {
		backgroundColor: Colors.primary_reversed,
	},
})

const PerformanceForm = observer(() => {
	const performanceSplit = useRightsSplits("performance")
	const pageState = useSplitsPagesState().performance
	const { t } = useTranslation("rightsSplits")

	function addShareHolder(id) {
		if (id && !performanceSplit.shareHolders.has(id)) {
			performanceSplit.addRightHolder(id, initData)
		}
	}

	//FOR TESTING PURPOSE
	// React.useEffect(() => {
	// 	addShareHolder("235556b5-3bbb-4c90-9411-4468d873969b")
	// 	addShareHolder("c84d5b32-25ee-48df-9651-4584b4b78f28")
	// }, [])
	function genSelectOptions() {
		return performanceSplit.statusValues.map((status) => {
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
		return pageState.sharesData.map((share, i) => (
			<ShareCard
				key={share.id}
				shareHolderId={share.id}
				color={pageState.colorByIndex(i)}
				sharePercent={share.percent}
				onClose={() => performanceSplit.removeRightHolder(share.id)}
			>
				<Select
					placeholder={t("status")}
					options={genSelectOptions()}
					value={share.status}
					onChange={(value) => performanceSplit.setShareStatus(share.id, value)}
					style={Styles.selectFrame}
				/>
				<CheckBoxGroup
					selection={share.roles}
					onChange={(roles) =>
						performanceSplit.updateShareField(share.id, "roles", roles)
					}
				>
					<Row style={Styles.checkboxesContainer}>
						<Column of="component">
							<CheckBoxGroupButton value="singer" label={t("roles.singer")} />
							<CheckBoxGroupButton
								value="musician"
								label={t("roles.musician")}
							/>
						</Column>
					</Row>
				</CheckBoxGroup>
				<Row of="component" valign="center">
					<ProgressBar
						progress={share.percent}
						size="xsmall"
						style={{ flex: 1 }}
						color={pageState.colorByIndex(i)}
					/>
					<Text bold>{formatPercentage(share.percent)}</Text>
				</Row>
			</ShareCard>
		))
	}

	return (
		<Row>
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
						onSelect={addShareHolder}
						placeholder={t("addCollab")}
					/>
				</Column>
			</Column>
			<View
				style={{
					width: 3 * Metrics.spacing.group,
					height: 3 * Metrics.spacing.group,
				}}
			/>
			<Column
				flex={1}
				align="center"
				onLayout={(e) =>
					runInAction(() => (pageState.chartSize = e.nativeEvent.layout.width))
				}
			>
				{performanceSplit.mode && <SplitChart {...pageState.genChartProps()} />}
			</Column>
		</Row>
	)
})

export default PerformanceForm
