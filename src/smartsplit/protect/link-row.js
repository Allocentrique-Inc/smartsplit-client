import { useTranslation } from "react-i18next"
import ExpoClipboard from "expo-clipboard"

import { Column, Row } from "../../layout"
import React, { createRef, useEffect, useRef, useState } from "react"
import LinkIcon from "../../svg/link-icon"
import { Heading, Text } from "../../text"
import {
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import Button from "../../widgets/button"
import ChevronDown from "../../svg/chevron-down"
import ChevronRight from "../../svg/chevron-right"
import ChevronUp from "../../svg/chevron-up"
import QRCode from "react-native-qrcode-svg"
import UserAvatar from "../user/avatar"
import QuestionMark from "../../svg/question-mark"
import { Tooltip } from "../../widgets/tooltip"
// import Tooltip from "react-native-walkthrough-tooltip"

const Styles = StyleSheet.create({
	LinkRowTitle: {
		color: "#176D25",
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		backgroundColor: "#DFF8E3",
		marginLeft: 20,
	},
	hairline: {
		marginTop: 4,
		height: "calc(100% - 0px)",
		width: 1,
		backgroundColor: "rgb(220, 223, 225)",
	},
	rowField: { paddingTop: 10 },
	transactionLinks: {
		textDecorationLine: "underline",
		borderStyle: "solid",
		borderWidth: 1,
		padding: 8,
		borderColor: "#DCDFE1",
	},
	copyLink: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#DCDFE1",
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16,
		paddingRight: 16,
	},
	questinMark: {
		marginLeft: 5,
		marginTop: 5,
	},
})

export function LinkRow(props) {
	const { t } = useTranslation()
	const { data, last, user } = props
	const versionFlag = data.versionFlag
	const [isExpand1, setIsExpand1] = useState(false)
	const [isExpand2, setIsExpand2] = useState(false)
	const tooltipAnchorRef = createRef(null)
	const [toolTipVisible, setToolTipVisible] = useState(false)
	const [showtt1, setShowtt1] = useState(false)
	const [showTooltip, setShowTooltip] = useState(true)
	const [arrowMode, setArrowMode] = useState(0)

	const getWorkingVersion = (numFlag) => {
		return numFlag == 1
			? t("protect:master")
			: numFlag == 2
			? t("protect:mix")
			: t("protect:idea")
	}
	const handleCopy = () => {
		ExpoClipboard.setString(data.transactionLinks)
	}
	const handleExpand2 = () => {
		if (isExpand2) {
			setIsExpand2(false)
		} else {
			setIsExpand2(true)
		}
	}

	const MODES = [
		"bottom-center",
		"bottom-left",
		"left-bottom",
		"left-center",
		"left-top",
		"top-left",
		"top-center",
		"top-right",
		"right-top",
		"right-center",
		"right-bottom",
		"bottom-right",
	]

	useEffect(() => {
		if (!showTooltip) return
		const timer = setTimeout(() => setArrowMode(arrowMode + 1), 1000)
		return () => clearTimeout(timer)
	}, [showTooltip, arrowMode])

	return (
		<Row {...props}>
			<Column flex={2} style={{ alignItems: "center" }}>
				<View>
					<LinkIcon />
				</View>
				{!last && <View style={Styles.hairline} />}
			</Column>
			<Column flex={10}>
				<Row>
					<Column flex={10}>
						<Row>
							<Heading level={3}>{data.title}</Heading>
							<Text style={Styles.LinkRowTitle} bold>
								{getWorkingVersion(versionFlag)}
							</Text>
						</Row>
						<Row>
							<Text secondary>
								{t("protect:certificate.by", {
									people: data.postBy,
								})}
							</Text>
						</Row>
						<Row>
							<Column flex={10}>
								<View style={{ paddingTop: 20 }}>
									<TouchableWithoutFeedback
										onPress={() => {
											if (isExpand1) {
												setIsExpand1(false)
											} else {
												setIsExpand1(true)
											}
										}}
									>
										<Row>
											<Text action bold style={{ paddingRight: 10 }}>
												{t("protect:certificate.seePermalink")}
											</Text>
											{isExpand1 && <ChevronDown color={"rgb(45, 168, 79)"} />}
											{!isExpand1 && (
												<ChevronRight color={"rgb(45, 168, 79)"} />
											)}
										</Row>
									</TouchableWithoutFeedback>
									{isExpand1 && data.transactionLinks && (
										<Row style={Styles.rowField}>
											<Column flex={7}>
												<Text small secondary>
													{t("protect:certificate.descLink")}
												</Text>
											</Column>
											<Column flex={3} style={{ alignItems: "flex-end" }}>
												<QRCode value={data.transactionLinks} />
											</Column>
										</Row>
									)}
									{isExpand1 && data.transactionLinks && (
										<Row style={Styles.rowField}>
											<Column flex={7}>
												<Text style={Styles.transactionLinks}>
													{data.transactionLinks}
												</Text>
											</Column>
											<Column flex={3} style={{ marginLeft: 16 }}>
												<View>
													<TouchableWithoutFeedback onPress={handleCopy}>
														<Text
															style={Styles.copyLink}
															action
															bold
															align="center"
														>
															{t("protect:certificate.copyLink")}
														</Text>
													</TouchableWithoutFeedback>
												</View>
											</Column>
										</Row>
									)}
									{isExpand1 && (
										<Row style={{ paddingTop: 25 }}>
											<Column flex={10}>
												<Row>
													<Column flex={3}>
														<Text bold>
															{t("protect:certificate.sourceFile")}
														</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>{data.sourceFile}</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>{t("protect:certificate.format")}</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>{data.format}</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>
															{t("protect:certificate.workingVersion")}
														</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>
															{getWorkingVersion(versionFlag)}
														</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>
															{t("protect:certificate.listedBy")}
														</Text>
													</Column>
													<Column flex={7}>
														<Row>
															<Column>
																<UserAvatar user={user} size="small" />
															</Column>
															<Column
																style={{
																	justifyContent: "center",
																	paddingLeft: 5,
																}}
															>
																<Text secondary>
																	{" "}
																	{`${user.firstName} ${user.lastName}`}
																</Text>
															</Column>
														</Row>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>
															{t("protect:certificate.registrationDate")}
														</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>{data.registrationDate}</Text>
													</Column>
												</Row>
											</Column>
										</Row>
									)}
									{!isExpand2 && (
										<View style={{ paddingTop: 25 }}>
											<TouchableWithoutFeedback onPress={handleExpand2}>
												<Row>
													<Text action bold style={{ paddingRight: 10 }}>
														{t("protect:certificate.viewFingerprints")}
													</Text>
													{isExpand2 && (
														<ChevronDown color={"rgb(45, 168, 79)"} />
													)}
													{!isExpand2 && (
														<ChevronRight color={"rgb(45, 168, 79)"} />
													)}
												</Row>
											</TouchableWithoutFeedback>
										</View>
									)}
									{isExpand2 && (
										<Row style={{ paddingTop: 25 }}>
											<Column flex={10}>
												<Row>
													<Column flex={3}>
														<Row>
															<Text bold>
																{t("protect:certificate.sha512")}
															</Text>
															{/* <View>
																<Tooltip
																	isVisible={toolTipVisible}
																	content={<Text>kjhfkjds</Text>}
																	placement="top"
																	onClose={() => setToolTipVisible(false)}
																	accessible={false}
																	ref={tooltipRef}
																>
																	<TouchableHighlight
																		onPress={() => setToolTipVisible(true)}
																	>
																		<QuestionMark />
																	</TouchableHighlight>
																</Tooltip>
															</View> */}
															<View style={Styles.questinMark}>
																<QuestionMark />
																{/* <Button
																	text="Tooltip"
																	onClick={() => setToolTipVisible(true)}
																	viewRef={tooltipAnchorRef}
																/> */}
																{/* <TouchableWithoutFeedback
																onPress={() => setToolTipVisible(true)}
															>
																<View viewRef={tooltipAnchorRef}>
																	<QuestionMark />
																</View>
															</TouchableWithoutFeedback> */}

																{/* <Tooltip
																	arrow={"top-center"}
																	width={300}
																	relativeTo={tooltipAnchorRef}
																	visible={toolTipVisible}
																	onDismiss={setToolTipVisible}
																	text="Cette page a pour but de démontrer les différentes composantes de
																	formulaire et mise en page utilisées dans les formulaires à travers le
																	site"
																/> */}
															</View>
														</Row>
													</Column>
													<Column flex={7}>
														<Text secondary>{data.sha512}</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Row>
															<Text bold>{t("protect:certificate.md5")}</Text>
															<View style={Styles.questinMark}>
																<QuestionMark />
															</View>
														</Row>
													</Column>
													<Column flex={7}>
														<Text secondary>{data.md5}</Text>
													</Column>
												</Row>
											</Column>
										</Row>
									)}
									{isExpand2 && (
										<View style={{ paddingTop: 25 }}>
											<TouchableWithoutFeedback onPress={handleExpand2}>
												<Row>
													<Text action bold style={{ paddingRight: 10 }}>
														Cacher
													</Text>
													{isExpand2 && (
														<ChevronUp
															style={{ marginTop: 8 }}
															color={"rgb(45, 168, 79)"}
														/>
													)}
													{!isExpand2 && (
														<ChevronRight color={"rgb(45, 168, 79)"} />
													)}
												</Row>
											</TouchableWithoutFeedback>
										</View>
									)}
								</View>
							</Column>
						</Row>
					</Column>
				</Row>
			</Column>
		</Row>
	)
}
