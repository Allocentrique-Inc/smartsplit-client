import React from "react"
import { useTranslation } from "react-i18next"
import { View, StyleSheet } from "react-native"
import { useSubpath } from "../../../appstate/react"
import { useStorePath } from "../../../appstate/react"
import { Row, Flex, Hairline, Spacer, Column } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Button from "../../../widgets/button"
import Cover from "../../../smartsplit/media/cover"
import LogoSmartSplit from "../../../svg/logo-smartsplit"
import UserAvatar from "../../../smartsplit/user/avatar"
import ChevronDown from "../../../svg/chevron-down"
import ArrowRight from "../../../svg/arrow-right"
import PenIcon from "../../../svg/pen"
import Scrollable from "../../../widgets/scrollable"
import { Metrics, Colors } from "../../../theme"
import MetricsStyles from "../../../styles/metrics"

export function SheetNavbar() {
	return (
		<Row
			valign="center"
			layer="underground"
			of="group"
			padding="component"
			style={{ alignItems: "center" }}
		>
			<LogoSmartSplit />
			<Flex />
			<Row of="inside" valign="center">
				<UserAvatar size="small" />
				<ChevronDown />
			</Row>
		</Row>
	)
}

const TagStyle = StyleSheet.create({
	frame: {
		marginRight: 0,
		backgroundColor: Colors.background.hell,
		padding: Metrics.spacing.tiny,
		marginRight: Metrics.spacing.small,
		borderRadius: Metrics.borderRadius.forms,
	},
})

function PathSpacer({ of }) {
	return (
		<View
			style={{
				paddingLeft: Metrics.spacing[of],
				paddingRight: Metrics.spacing[of],
			}}
		>
			<ArrowRight />
		</View>
	)
}

export function SheetHeader(props) {
	const [t] = useTranslation()
	const {
		songTitle,
		artistName,
		featuredArtist,
		albumTitle,
		workpiece,
		path = [],
		tag,
	} = props

	return (
		<Column
			of="component"
			padding="component"
			valign="center"
			style={{ width: 944, maxWidth: "100%" }}
		>
			<Row of="component" spacer={PathSpacer} valign="center">
				<Text bold>{artistName}</Text>
				<Text bold>{albumTitle}</Text>
				<Text secondary bold>
					{songTitle} ({tag})
				</Text>
			</Row>

			<Row valign="center">
				<Column>
					<Cover style={MetricsStyles.spacing["huge"]} />
				</Column>

				<Column of="component" flex={1}>
					<Heading level={1}>
						{songTitle} ({tag})
					</Heading>
					<Row valign="center">
						<Text small style={TagStyle.frame}>
							{tag}
						</Text>
						<Text normal secondary padding="small">
							{t("workpieceSheet:by")}
						</Text>
						<Text action bold>
							{artistName}{" "}
						</Text>
						<Text normal secondary>
							feat.{" "}
						</Text>

						<Text action bold>
							{featuredArtist}
						</Text>
						<Flex />

						<Button
							small
							secondaryWithIcon
							bold
							icon={
								<PenIcon
									color={Colors.action}
									style={MetricsStyles.spacing["xtiny"]}
								/>
							}
							text={t("general:buttons.access")}
						/>
					</Row>
					<Hairline />
					<Row>
						<Text secondary small>
							{t("general:update")}
						</Text>
					</Row>
				</Column>
			</Row>
		</Column>
	)
}
export function WorkpieceSheetSections(props) {
	const {
		categoryLine,
		creationDateLine,
		creationDate,
		authorsLine,
		authors,
		composersLine,
		composers,
		mixersLine,
		mixers,
		editorsLine,
		editors,
	} = props
	return (
		<Row>
			<Column of="group" flex={1} padding="group">
				<Heading level={3}>{categoryLine}</Heading>
				<Row>
					<Text secondary>{creationDateLine}</Text>
					<Text normal>{creationDate}</Text>
				</Row>
				<Row>
					<Text secondary>{authorsLine}</Text>
					<Text action bold>
						{authors}
					</Text>
				</Row>
				<Row>
					<Text secondary>{composersLine}</Text>
					<Text action bold>
						{composers}
					</Text>
				</Row>
				<Row>
					<Text secondary>{mixersLine}</Text>
					<Text action bold>
						{mixers}
					</Text>
				</Row>
				<Row>
					<Text secondary>{editorsLine}</Text>
					<Text action bold>
						{editors}
					</Text>
				</Row>
			</Column>
		</Row>
	)
}
