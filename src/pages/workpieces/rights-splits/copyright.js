import React from "react"
import { View } from "react-native"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import SplitChart, {
	DualSplitChart,
} from "../../../smartsplit/components/split-chart"
import CircledC from "../../../svg/circled-c"
import {
	CheckBoxGroup,
	CheckBoxGroupButton,
	RadioGroup,
	RadioGroupButton,
} from "../../../forms"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { useRightSplit } from "../context"
import { initData } from "../../../mobX/models/workpieces/rights-splits/SplitCopyrightModel"
import { useSplitsPagesState } from "../../../mobX/hooks"
import { colorByIndex } from "../../../mobX/states/SplitsPagesState"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import Slider from "../../../widgets/slider"
import { runInAction } from "mobx"
import PercentageInput from "../../../forms/percentage"
import { percentageValidator } from "../../../../helpers/validators"
const CopyrightForm = observer(() => {
	const copyrightSplit = useRightSplit("copyright")
	const pageState = useSplitsPagesState().copyright
	const { sharesData, sharesTotal } = pageState
	const { t } = useTranslation()

	function addShareHolder(id) {
		if (id && !copyrightSplit.shareHolders.has(id)) {
			copyrightSplit.addRightHolder(id, initData)
		}
	}

	//FOR TESTING PURPOSE
	React.useEffect(() => {
		addShareHolder("235556b5-3bbb-4c90-9411-4468d873969b")
		addShareHolder("c84d5b32-25ee-48df-9651-4584b4b78f28")
	}, [])

	function renderShareCards() {
		return sharesData.map((share, i) => (
			<ShareCard
				key={share.id}
				shareHolderId={share.id}
				color={colorByIndex(i)}
				sharePercent={share.percent}
				onClose={() => copyrightSplit.removeRightHolder(share.id)}
				manual={copyrightSplit.mode === "manual"}
			>
				<CheckBoxGroup
					selection={share.roles}
					onChange={(roles) =>
						copyrightSplit.updateShareField(share.id, "roles", roles)
					}
				>
					<Row>
						<Column flex={1} of="component">
							<CheckBoxGroupButton
								value="author"
								label={t("roles:author")}
								disabled={copyrightSplit.mode === "equal"}
							/>
							<CheckBoxGroupButton value="adapter" label={t("roles:adapter")} />
						</Column>
						<Column flex={1} of="component">
							<CheckBoxGroupButton
								value="composer"
								label={t("roles:composer")}
								disabled={copyrightSplit.mode === "equal"}
							/>
							<CheckBoxGroupButton value="mixer" label={t("roles:mixer")} />
						</Column>
					</Row>
				</CheckBoxGroup>
				<Row of="component" valign="center">
					{copyrightSplit.mode === "manual" && (
						<>
							<Slider
								min={0}
								max={sharesTotal}
								color={colorByIndex(i)}
								step={0.01}
								value={share.shares}
								onChange={(value) =>
									copyrightSplit.updateShare(share.id, value)
								}
							/>
							<PercentageInput
								value={share.percent}
								digits={2}
								onChange={(percentage) =>
									copyrightSplit.updateShare(
										share.id,
										(percentage * sharesTotal) / 100
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
								color={colorByIndex(i)}
							/>
							<Text bold>{formatPercentage(share.percent)}</Text>
						</>
					)}
				</Row>
			</ShareCard>
		))
	}

	return (
		<Row>
			<Column of="section" flex={1}>
				<Column of="group">
					<Row of="component">
						<CircledC size={Metrics.size.small} color={Colors.action} />
						<Text action bold>
							{t("rightSplits:titles.copyright").toUpperCase()}
						</Text>
					</Row>
					<Column of="component">
						<Heading level={1}>{t("rightSplits:headers.copyright")}</Heading>
						<Paragraph>{t("rightSplits:paragraphs.copyright")()}</Paragraph>
					</Column>
				</Column>
				<Column of="group">
					<RadioGroup
						value={copyrightSplit.mode}
						onChange={(mode) => runInAction(() => (copyrightSplit.mode = mode))}
					>
						<Column of="component">
							<RadioGroupButton
								value="equal"
								label={t("rightSplits:radios.equal")}
							/>
							<RadioGroupButton
								value="roles"
								label={t("rightSplits:radios.roles")}
							/>
							<RadioGroupButton
								value="manual"
								label={t("rightSplits:radios.manual")}
							/>
						</Column>
					</RadioGroup>
					<Column of="component">
						{renderShareCards()}
						<AddCollaboratorDropdown
							onSelect={addShareHolder}
							label={t("document:creation.roles.authors")}
							subLabel={t("document:creation.roles.authorsWho")}
							placeholder={t("document:creation.roles.addAuthor")}
						/>
					</Column>
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
				{sharesData.length > 0 && copyrightSplit.mode === "roles" && (
					<DualSplitChart {...pageState.genChartProps(copyrightSplit.mode)} />
				)}
				{sharesData.length > 0 && copyrightSplit.mode !== "roles" && (
					<SplitChart {...pageState.genChartProps(copyrightSplit.mode)} />
				)}
			</Column>
		</Row>
	)
})
export default CopyrightForm
