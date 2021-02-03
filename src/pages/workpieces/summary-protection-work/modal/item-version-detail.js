import React, { useState } from "react"
import { observer } from "mobx-react"
import {
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import { Column, Flex, Hairline, Row } from "../../../../layout"
import { Text } from "../../../../text"
import Button from "../../../../widgets/button"
import { useTranslation } from "react-i18next"
import AvatarProgress from "../circular-progress"
import { getArtistName } from "../../workpiece-summary/workpiece-sheet"

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

const Styles = StyleSheet.create({
	textAreaContainer: {
		borderColor: "#DCDFE1",
		borderWidth: 1,
		padding: 8,
		borderRadius: 2,
		borderStyle: "solid",
	},
	textArea: {
		height: 72,
		justifyContent: "flex-start",
	},
	title: {
		fontSize: 24,
		margin: 10,
	},
})

export const defaultPicture =
	"https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png"

const ItemVersionDetail = observer((props) => {
	const { isModal, data, ...nextProps } = props

	const { t } = useTranslation()
	const [showButton, setShowButton] = useState(false)
	return (
		<Row {...nextProps}>
			<Flex>
				<Column>
					<Hairline />
					<Row style={{ paddingTop: 16 }}>
						<Column flex={1}>
							{!isModal && data && data.status === 2 && (
								<TouchableWithoutFeedback
									onPress={() => setShowButton(!showButton)}
								>
									<View>
										<RowViewItem
											isModal={isModal}
											secondaryPercent={!showButton}
											data={data}
										/>
									</View>
								</TouchableWithoutFeedback>
							)}
							{(isModal || (data && data.status !== 2)) && (
								<RowViewItem
									isModal={isModal}
									secondaryPercent={!showButton}
									data={data}
								/>
							)}
						</Column>
					</Row>
					{showButton && (
						<Row style={{ paddingTop: 16 }}>
							<Flex>
								<Row>
									<Column flex={2} />
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
								<Row style={{ paddingTop: 16 }}>
									<Column flex={2} />
									<Column flex={10}>
										<View style={Styles.textAreaContainer}>
											<TextInput
												style={Styles.textArea}
												underlineColorAndroid="transparent"
												placeholder={t(
													"shareYourRights:votingPage.explainReason"
												)}
												placeholderTextColor="#8DA0B2"
												numberOfLines={10}
												multiline={true}
											/>
										</View>
									</Column>
								</Row>
							</Flex>
						</Row>
					)}
				</Column>
			</Flex>
		</Row>
	)
})

function RowViewItem(props) {
	const { secondaryPercent, isModal, data } = props
	const [status, setStatus] = useState(
		data ? (data.status ? getStatusString(data.status) : "") : ""
	)
	return (
		<Row>
			<Column flex={2} style={{ justifyContent: "center" }}>
				<AvatarProgress
					percent={80}
					size={40}
					borderWidth={4}
					borderBgColor="#F5F2F3"
					percentColor="#D9ACF7"
					picture={defaultPicture}
				/>
			</Column>
			<Column flex={7}>
				<Row>
					<Text>{data ? getArtistName(data.user) : ""}</Text>
				</Row>
				{data && (
					<Row>
						<Text small secondary>
							{data
								? data.roles
									? data.roles.join(", ")
									: data.function
									? data.function
									: ""
								: ""}
						</Text>
					</Row>
				)}
			</Column>
			<Column flex={3} style={{ alignItems: "flex-end" }}>
				{data && data.percent && (
					<Row>
						<Text bold secondary={secondaryPercent && !isModal}>
							{data ? (data.percent ? data.percent.toFixed(1) : "") : ""}%
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
	)
}

function ItemVersionDetailOnTouch(props) {
	const { isModal, status, ...nextProps } = props
	return (
		<>
			{status === 2 && !isModal && (
				// <TouchableWithoutFeedback
				// 	onPress={() => {
				// 		setShowButton(!showButton)
				// 	}}
				// >
				<ItemVersionDetail isModal={isModal} {...nextProps} />
				// </TouchableWithoutFeedback>
			)}
			{(status !== 2 || isModal) && (
				<ItemVersionDetail isModal={isModal} {...nextProps} />
			)}
		</>
	)
}

export default ItemVersionDetailOnTouch
