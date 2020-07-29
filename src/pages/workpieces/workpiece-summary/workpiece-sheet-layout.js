import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useSubpath } from "../../../appstate/react"
import { useStorePath } from "../../../appstate/react"
import { Row, Flex, Hairline, Spacer, Column } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Cover from "../../../smartsplit/media/cover"
import LogoSmartSplit from "../../../svg/logo-smartsplit"
import UserAvatar from "../../../smartsplit/user/avatar"
import ChevronDown from "../../../svg/chevron-down"
import ArrowRight from "../../../svg/arrow-right"
import Scrollable from "../../../widgets/scrollable"
import { Metrics } from "../../../theme"
import MetricsStyles from "../../../styles/metrics"

export function SheetNavbar(props) {
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
	const { songTitle, artistName, albumTitle, workpiece, path = [] } = props
	return (
		<Column flex={1}>
			<Row of="component" padding="component" valign="center">
				<Row>
					<Cover style={MetricsStyles.spacing["huge"]}>
						{" "}
						<Heading level={1}>{artistName} </Heading>{" "}
					</Cover>
				</Row>
				<Row of="component" spacer={PathSpacer} valign="center">
					<Text bold>{artistName}</Text>
					<Text bold>{albumTitle}</Text>
					<Text secondary bold>
						{songTitle}
					</Text>
				</Row>
			</Row>
		</Column>
	)
}
export default function WorkpieceSheetLayout() {
	return <></>
}
