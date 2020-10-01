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

const CopyrightForm = observer(() => {
	const split = useRightSplit("copyright")
	const { copyright } = useSplitsPagesState()
	const { shares, mode, sharesPercents, chartProps } = copyright
	const { t } = useTranslation()
	function addShareHolder(id) {
		if (id && !split.shareHolders.has(id)) {
			split.addRightHolder(id, initData)
		}
	}

	function renderShareCards() {
		return shares.map((share, i) => (
			<ShareCard
				key={share.shareHolderId}
				shareHolderId={share.shareHolderId}
				color={colorByIndex(i)}
				sharePercent={sharesPercents.get(share.shareHolderId)}
				onClose={() => split.removeRightHolder(share.shareHolderId)}
				manual={mode === "manual"}
			>
				<CheckBoxGroup
					selection={share.roles.value}
					onChange={(roles) => shares[i].setValue("roles", roles)}
				>
					<Row>
						<Column flex={1} of="component">
							<CheckBoxGroupButton
								value="author"
								label={t("roles:author")}
								disabled={mode === "equal"}
							/>
							<CheckBoxGroupButton value="adapter" label={t("roles:adapter")} />
						</Column>
						<Column flex={1} of="component">
							<CheckBoxGroupButton
								value="composer"
								label={t("roles:composer")}
								disabled={mode === "equal"}
							/>
							<CheckBoxGroupButton value="mixer" label={t("roles:mixer")} />
						</Column>
					</Row>
				</CheckBoxGroup>
				<Row of="component" valign="center">
					{mode === "manual" && (
						<>
							<Slider
								min={0}
								max={100}
								color={colorByIndex(i)}
								step={0.01}
								value={sharesPercents.get(share.shareHolderId)}
								onChange={(value) => share.setValue("shares", value)}
							/>
							<Text bold>
								{formatPercentage(sharesPercents.get(share.shareHolderId), 2)}
							</Text>
						</>
					)}
					{mode !== "manual" && (
						<>
							<ProgressBar
								progress={sharesPercents.get(share.shareHolderId)}
								size="xsmall"
								style={{ flex: 1 }}
								color={colorByIndex(i)}
							/>
							<Text bold>
								{formatPercentage(sharesPercents.get(share.shareHolderId), 2)}
							</Text>
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
						value={mode}
						onChange={(mode) => copyright.setValue("mode", mode)}
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
					copyright.setValue("chartSize", e.nativeEvent.layout.width)
				}
			>
				{shares.length > 0 && mode === "roles" && (
					<DualSplitChart {...chartProps} />
				)}
				{shares.length > 0 && mode !== "roles" && (
					<SplitChart {...chartProps} />
				)}
			</Column>
		</Row>
	)
})
export default CopyrightForm
