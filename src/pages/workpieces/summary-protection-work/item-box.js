import React, { useState } from "react"
import { Column, Hairline, Row } from "../../../layout"
import VerticalThreeDot from "../../../svg/vertical-threedot"
import { Text } from "../../../text"
import moment from "moment"
import Button from "../../../widgets/button"
import { useTranslation } from "react-i18next"
import UserAvatar from "../../../smartsplit/user/avatar"
import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
// import {
// 	MenuContext,
// 	Menu,
// 	MenuOptions,
// 	MenuOption,
// 	MenuTrigger,
// } from "react-native-popup-menu"

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		paddingTop: 50,
// 		backgroundColor: "#ecf0f1",
// 	},
// 	dropbtn: {
// 		backgroundColor: "#4CAF50",
// 		color: "white",
// 		padding: 16,
// 		fontSize: 16,
// 		border: "none",
// 		cursor: "pointer",
// 	},
// 	dropdown: {
// 		position: "relative",
// 		display: "inline-block",
// 		":hover":{

// 		}
// 	},
// 	dropdownContent: {
// 		display: "none",
// 		position: "absolute",
// 		right: 0,
// 		backgroundColor: "#f9f9f9",
// 		minWidth: 160,
// 		boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
// 		zIndex: 1,
// 	},
// 	dropdownContent: {
// 		color: "black",
// 		paddingTop: 12,
// 		paddingBottom: 12,
// 		paddingLeft: 16,
// 		paddingRight: 16,
// 		textDecoration: "none",
// 		display: "block",
// 		":hover": { backgroundColor: "#f1f1f1" },

// 	},
// })

function ItemBox(props) {
	const { dataItem } = props
	const { t } = useTranslation()

	return (
		<Column>
			<Row>
				<Column flex={2}>
					<Text bold>
						{t("shareYourRights:tabBar.version", { num: dataItem.version })}
					</Text>
				</Column>
				<Column>
					<View>
						<TouchableWithoutFeedback>
							<View>
								<VerticalThreeDot />
							</View>
						</TouchableWithoutFeedback>
					</View>
				</Column>
			</Row>
			<Row>
				<Text small secondary>
					{t("shareYourRights:updateBy")}
				</Text>
				<Text small action bold>
					{" "}
					{dataItem.updateBy}{" "}
				</Text>
				<Text small secondary>
					{t("shareYourRights:ago", {
						hour: moment(dataItem.lastUpdate).startOf("hour").fromNow(),
					})}
				</Text>
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
					<Button text={t("shareYourRights:tabBar.sendToEditor")} />
				</Column>
			</Row>
		</Column>
	)
}
export default ItemBox
