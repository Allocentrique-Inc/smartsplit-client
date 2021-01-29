import React, { useState } from "react"
import { observer } from "mobx-react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Flex, Hairline, Row } from "../../../../layout"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { Text } from "../../../../text"
import Button from "../../../../widgets/button"
import { useTranslation } from "react-i18next"

export const getStatusString = (status) => {
	const { t } = useTranslation()
	return status === 1
		? t("shareYourRights:collaboratorModal.approved")
		: status === 2
		? t("shareYourRights:tabBar.dragDrop.waitingToSend")
		: status === 3
		? t("shareYourRights:collaboratorModal.refuse")
		: ""
}

const Styles = StyleSheet.create({})

const ItemVersionDetail = observer((props) => {
	const { showButton, boldPercent, data, ...nextProps } = props
	const [status, setStatus] = useState(
		data ? (data.status ? getStatusString(data.status) : "") : ""
	)
	const { t } = useTranslation()
	return (
		<Row {...nextProps}>
			<Flex>
				<Column>
					<Hairline />
					<Row style={{ paddingTop: 16 }}>
						<Column flex={2}>
							<UserAvatar picture={data ? (data.uri ? data.uri : "") : ""} />
						</Column>
						<Column flex={7}>
							<Row>
								<Text>{data ? (data.name ? data.name : "") : ""}</Text>
							</Row>
							{data && data.role && (
								<Row>
									<Text small secondary>
										{data ? (data.role ? data.role : "") : ""}
									</Text>
								</Row>
							)}
						</Column>
						<Column flex={3} style={{ alignItems: "flex-end" }}>
							{data && data.percent && (
								<Row>
									<Text bold={boldPercent}>
										{data ? (data.percent ? data.percent : "") : ""}%
									</Text>
								</Row>
							)}
							<Row>
								<Text
									small
									action={data && data.status && data.status === 1}
									bold={data && data.status && data.status === 1}
									secondary={data && data.status && data.status === 2}
								>
									{status}
								</Text>
							</Row>
						</Column>
					</Row>
					{showButton && (
						<Row style={{ paddingTop: 16 }}>
							<Column flex={2}></Column>
							<Column flex={5} style={{ paddingRight: 8 }}>
								<View>
									<Button
										bold
										danger
										text={t("shareYourRights:collaboratorModal.refuse")}
									/>
								</View>
							</Column>
							<Column flex={5} style={{ paddingLeft: 8 }}>
								<View>
									<Button
										bold
										secondary
										text={t("shareYourRights:collaboratorModal.accept")}
									/>
								</View>
							</Column>
						</Row>
					)}
				</Column>
			</Flex>
		</Row>
	)
})

function ItemVersionDetailOnTouch(props) {
	const { isModal, status, ...nextProps } = props
	const [showButton, setShowButton] = useState(false)
	return (
		<>
			{status === 2 && !isModal && (
				<TouchableWithoutFeedback onPress={() => setShowButton(!showButton)}>
					<ItemVersionDetail {...nextProps} showButton={showButton} />
				</TouchableWithoutFeedback>
			)}
			{(status !== 2 || isModal) && <ItemVersionDetail {...nextProps} />}
		</>
	)
}

export default ItemVersionDetailOnTouch
