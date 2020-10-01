import React from "react"
import { Column, Hairline, Row, Spacer } from "../../layout"
import { Colors } from "../../theme"
import UserAvatar from "../user/avatar"
import { Text } from "../../text"
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native"
import { getFullName } from "../../utils/utils"
import { CardStyles } from "../../widgets/card"
import { useTranslation } from "react-i18next"
import XIcon from "../../svg/x"
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
		shareHolderId,
		children,
		actions,
		error,
		onClose,
		bottomAction,
		...nextProps
	}) => {
		const { t } = useTranslation()
		const user = useEntity(["users"], shareHolderId)
		const userData = toJS(user.data) || {}
		const authUserData = toJS(useAuthUser().data)
		const frameStyle = [CardStyles.frame, styles.frame]
		const addStyle = (key) => frameStyle.push(styles[key])
		const isAuthUser = userData.user_id === authUserData.user_id

		isAuthUser && addStyle("frame_yourself")
		error && addStyle("frame_error")
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
						{bottomAction}
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
