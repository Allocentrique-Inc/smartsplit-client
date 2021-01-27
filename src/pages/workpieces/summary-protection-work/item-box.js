import React, { useEffect, useState } from "react"
import { Column, Hairline, Row } from "../../../layout"
import VerticalThreeDot from "../../../svg/vertical-threedot"
import { Text } from "../../../text"
import moment from "moment"
import Button from "../../../widgets/button"
import { useTranslation } from "react-i18next"
import UserAvatar from "../../../smartsplit/user/avatar"
import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import CopySVG from "../../../svg/copy-svg"
import RedTrash from "../../../svg/red-trash"

const Styles = StyleSheet.create({
	dropdownContent: {
		display: "none",
		position: "absolute",
		backgroundColor: "#FFFFFF",
		minWidth: 296,
		boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
		top: 30,
		right: 0,
		zIndex: 1,
	},
	threedotItems: {
		paddingTop: 16,
		paddingBottom: 16,
	},
})

function ItemBox(props) {
	const { dataItem } = props
	const { t } = useTranslation()
	const [showPopup, setShowPopup] = useState(false)

	return (
		<Column>
			<View style={[Styles.dropdownContent, showPopup && { display: "block" }]}>
				<View>
					<TouchableWithoutFeedback>
						<View style={Styles.threedotItems}>
							<Row>
								<Column flex={1} style={{ alignItems: "center" }}>
									<CopySVG />
								</Column>
								<Column flex={7}>
									<Text>
										{t("shareYourRights:tabBar.dragDrop.createNewversion")}
									</Text>
								</Column>
							</Row>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<Hairline />
				<View>
					<TouchableWithoutFeedback>
						<View style={Styles.threedotItems}>
							<Row>
								<Column flex={1} style={{ alignItems: "center" }}>
									<RedTrash />
								</Column>
								<Column flex={7}>
									<Text error>
										{t("shareYourRights:tabBar.dragDrop.deleteThisVersion")}
									</Text>
								</Column>
							</Row>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
			<Row>
				<Column flex={2}>
					<Text bold>
						{t("shareYourRights:tabBar.version", { num: dataItem.version })}
					</Text>
				</Column>
				<Column>
					<View>
						<TouchableWithoutFeedback
							onPress={() => {
								setShowPopup(!showPopup)
							}}
						>
							<View style={{ padding: 4 }}>
								<VerticalThreeDot />
							</View>
						</TouchableWithoutFeedback>
					</View>
				</Column>
			</Row>
			<Row>
				<Text
					secondary
					small
					dangerouslySetInnerHTML={{
						__html: t("shareYourRights:updateBy", {
							name: dataItem.updateBy,
							hour: moment(dataItem.lastUpdate).startOf("minute").fromNow(),
						}),
					}}
				/>
			</Row>
			<Row
				style={{
					marginBottom: 16,
					marginTop: 16,
				}}
			>
				{Array.from(dataItem.userUrls).map((item, index) => (
					<UserAvatar picture={item} key={index} size="small" />
				))}
			</Row>
			<Hairline />
			<Row style={{ marginTop: 16 }}>
				<Column flex={5}>
					<Button
						text={t(
							"shareYourRights:tabBar.myCollaborators.sendToCollaborators"
						)}
					/>
				</Column>
			</Row>
		</Column>
	)
}
export default ItemBox
