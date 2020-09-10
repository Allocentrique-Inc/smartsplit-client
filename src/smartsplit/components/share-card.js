import React from "react"
import { Column, Hairline, Row, Spacer } from "../../layout"
import { Colors } from "../../theme"
import HelpCircleFull from "../../svg/help-circle-full"
import UserAvatar from "../user/avatar"
import { Text } from "../../text"
import ProgressBar from "../../widgets/progress-bar"
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native"
import { formatPercentage, getFullName } from "../../utils/utils"
import { CardStyles } from "../../widgets/card"
import { useTranslation } from "react-i18next"
import XIcon from "../../svg/x"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"
import { useAuthUser, useEntity } from "../../mobX/hooks"
import { toJS } from "mobx"

const styles = StyleSheet.create({
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
const ShareCard = observer(
	({
		rightHolderId,
		sharePercent,
		tip,
		children,
		actions,
		color,
		error,
		onClose,
		...nextProps
	}) => {
		const { t } = useTranslation()
		const user = useEntity(["users"], rightHolderId)
		const userData = toJS(user.data) || {}
		const authUserData = toJS(useAuthUser().data)
		const frameStyle = [CardStyles.frame, styles.frame]
		const addStyle = (key) => frameStyle.push(styles[key])
		const isAuthUser = userData.user_id === authUserData.user_id

		isAuthUser && addStyle("frame_yourself")
		error && addStyle("frame_error")
		color = color || Colors.action
		return (
			<>
				<Row
					padding="component"
					of="component"
					style={frameStyle}
					{...nextProps}
				>
					<Column valign="spread" align="center">
						<UserAvatar size="small" user={userData} />
						<TouchableWithoutFeedback>
							<View>
								<HelpCircleFull />
							</View>
						</TouchableWithoutFeedback>
					</Column>
					<Column flex={1} of="component">
						<Row align="spread">
							<Text bold>{`${getFullName(userData)}${
								isAuthUser ? ` ${t("rightSplits:yourself")}` : ""
							}`}</Text>

							<Row of="inside">
								{actions}
								{onClose && (
									<TouchableWithoutFeedback onPress={onClose}>
										<View>
											<XIcon />
										</View>
									</TouchableWithoutFeedback>
								)}
							</Row>
						</Row>
						<Hairline />
						{children}
						<Row of="component" valign="center">
							<ProgressBar
								progress={sharePercent}
								size="xsmall"
								style={{ flex: 1 }}
								color={color}
							/>
							<Text bold>{formatPercentage(sharePercent, 1)}</Text>
						</Row>
					</Column>
				</Row>
				<Spacer of="inside" />
				{error && (
					<Text error small>
						{error}
					</Text>
				)}
			</>
		)
	}
)

export default ShareCard
