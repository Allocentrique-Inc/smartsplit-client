import React, { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native"
import { Column, Row, NoSpacer } from "../../layout"
import { Text, Heading, Paragraph } from "../../text"
import { observer } from "mobx-react"
import ThreeDots from "../../svg/dot-dot-dot"
import HalfLink from "../../svg/half-link"
import CheckMark from "../../svg/check-mark"
import { Colors, Metrics } from "../../theme"
import { Tag } from "../../widgets/tag"

const Styles = StyleSheet.create({
	wrapper: {
		height: 104,
	},
	timeline_header: {
		flexDirection: "column",
		alignItems: "center",
		cursor: "pointer",
	},

	timeline_row_cover: {
		margin: Metrics.spacing.component,
	},

	timeline_row_title: {
		flex: 1,
		justifyContent: "center",
	},

	timeline_row_progress: {
		width: 300,
		marginRight: Metrics.spacing.group,
	},
	status_icon: {
		alignItems: "center",
		justifyContent: "center",
		width: Metrics.size.medium,
		height: Metrics.size.medium,
		borderRadius: Metrics.size.medium / 2,
		margin: Metrics.size.xtiny,
	},
	verticalLine: {
		flexGrow: 1,
		width: 2,
		backgroundColor: Colors.stroke,
		alignSelf: "center",
	},
	verticalLine_top: {
		marginBottom: Metrics.size.xtiny,
	},
	verticalLine_bottom: {
		marginTop: Metrics.size.xtiny,
	},
	rotate180: {
		transform: "rotate(180deg)",
	},
	line: {
		height: 28,
	},
	linkIcon: {
		position: "absolute",
		bottom: -4,
		right: -11,
	},
	halfLinkIcon: {},
	tag: {
		backgroundColor: Colors.background.hell,
	},
})

const DependanceRow = observer((props) => {
	const { t } = useTranslation()
	const { data, first, last, oneItem } = props

	return (
		<Row
			style={[
				Styles.wrapper,
				first ? { backgroundColor: Colors.background.underground } : {},
			]}
		>
			<Column
				of="component"
				flex={2}
				flexDirection="column"
				style={Styles.timeline_header}
			>
				<NoSpacer>
					<View style={Styles.line}>
						{!first && !oneItem && (
							<View style={[Styles.halfLinkIcon, Styles.verticalLine_top]}>
								<HalfLink color={Colors.tertiary} style={Styles.rotate180} />
							</View>
						)}
						{!first && !oneItem && <View style={Styles.verticalLine} />}
					</View>
				</NoSpacer>

				<NoSpacer>
					{data.status === 0 && (
						<View
							style={[Styles.status_icon, { backgroundColor: Colors.stroke }]}
						>
							<ThreeDots />
						</View>
					)}
					{data.status !== 0 && (
						<View
							style={[
								Styles.status_icon,
								{ backgroundColor: Colors.alert_positive },
							]}
						>
							<CheckMark color="#176D25" />
						</View>
					)}
				</NoSpacer>

				<NoSpacer>
					<View style={Styles.line}>
						{!last && !oneItem && <View style={Styles.verticalLine} />}
						{!last && !oneItem && (
							<View style={[Styles.halfLinkIcon, Styles.verticalLine_bottom]}>
								<HalfLink color={Colors.tertiary} />
							</View>
						)}
					</View>
				</NoSpacer>
			</Column>

			<Column of="inside" flex={10} style={Styles.timeline_row_title}>
				<Row of="tiny">
					<Tag small style={Styles.tag}>
						<Text small>{data.tag}</Text>
					</Tag>
				</Row>
				<Row of="tiny" style={{ alignItems: "center" }}>
					<Text bold heavy>
						{data.name}
					</Text>
				</Row>
				<Row>
					{data.status === 0 ? (
						<Text secondary small>
							{t("protect:certificate.await")}
						</Text>
					) : (
						<Text secondary small>
							{t("protect:certificate.post", {
								publishedDate: data.time,
								author: data.author,
							})}
							<TouchableWithoutFeedback>
								<Text small action bold>
									{t("protect:certificate.viewCertificate")}
								</Text>
							</TouchableWithoutFeedback>
						</Text>
					)}
				</Row>
			</Column>
		</Row>
	)
})

export default DependanceRow
