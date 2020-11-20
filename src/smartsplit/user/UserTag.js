import { observer } from "mobx-react"
import React from "react"
import { useTranslation } from "react-i18next"
import { useStorePath, useStores } from "../../mobX"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Row, Flex, Hairline, Spacer } from "../../layout"
import { Text, Heading, Paragraph } from "../../text"
import XIcon from "../../svg/x"
import UserAvatar from "./avatar"
import { CardStyles } from "../../widgets/card"
import { Colors, Metrics } from "../../theme"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
	frame: {
		backgroundColor: Colors.background.underground,
	},
	frame_error: {
		borderWidth: 1,
		borderColor: Colors.error,
		borderStyle: "solid",
	},
	frame_yourself: {
		borderWidth: 1,
		borderColor: Colors.secondaries.teal,
	},
})

const frameStyle = [CardStyles.frame, Styles.frame]

const UserTag = observer((props) => {
	const { user, field } = props
	return (
		<Row
			of="component"
			padding="tiny"
			style={frameStyle}
			key={user.id || user.user_id}
		>
			<Column valign="spread" align="center" padding="tiny">
				<UserAvatar size="small" user={user} />
			</Column>
			<Column flex={1} padding="tiny">
				<Text bold size="tiny">
					{`${user.firstName} ${user.lastName} ${
						user.artistName ? ` (${user.artistName})` : ""
					}`}
				</Text>
			</Column>
			<Column padding="tiny">
				<TouchableWithoutFeedback onPress={() => field.remove(user)}>
					<View>
						<XIcon />
					</View>
				</TouchableWithoutFeedback>
			</Column>
		</Row>
	)
})

export default UserTag
