import React, { useRef, useLayoutEffect } from "react"
import { View } from "react-native"
import { Column, Row, Spacer, Flex, Hairline } from "../../layout"
import Scrollable from "../../widgets/scrollable"
import { Text } from "../../text"
import ProgressBar from "../../widgets/progress-bar"
import AlbumArt from "../../smartsplit/media/albumArt"
import UserAvatar from "../../smartsplit/user/avatar"
import ArrowRight from "../../svg/arrow-right"
import ChevronDown from "../../svg/chevron-down"
import { Metrics } from "../../theme"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"

export default function WorkpieceLayout({
	workpiece,
	path = [],
	actions,
	progress = 0,
	formNav,
	children,
}) {
	return (
		<Column flex={1}>
			<Row of="component" padding="component" valign="center">
				<AlbumArt />
				<Text bold>{workpiece.data.title}</Text>
				<Spacer size="section" />
				{React.createElement(
					Row,
					{ of: "component", spacer: PathSpacer, valign: "center" },
					...path.map((segment) => <Text>{segment}</Text>)
				)}
				<Flex />
				{actions}
				<UserIcon />
				<ChevronDown />
			</Row>
			<ProgressBar
				size="xtiny"
				progress={progress}
				style={{ alignSelf: "stretch" }}
			/>

			<Scrollable autoScrollToTop>
				<Column
					of="group"
					margin="section"
					style={{ maxWidth: 944, alignSelf: "center" }}
				>
					{children}
				</Column>
			</Scrollable>
			<Hairline />
			<Row padding="component" align="center">
				<Row style={{ maxWidth: 944, flex: 1 }}>{formNav}</Row>
			</Row>
		</Column>
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

const UserIcon = observer(() => {
	const user = useStorePath("auth", "user")
	return <UserAvatar size="small" user={user.data} />
})
