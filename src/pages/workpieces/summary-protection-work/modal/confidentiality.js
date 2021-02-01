import React, { useState } from "react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Flex, Row } from "../../../../layout"
import { useTranslation } from "react-i18next"
import { Heading, Text } from "../../../../text"
import ModifierSVG from "../../../../svg/modify-svg"
import EyeIcon from "../../../../svg/eye"
import QuestionMark from "../../../../svg/question-mark"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { getStatusString } from "./item-version-detail"
import Button from "../../../../widgets/button"

const Styles = StyleSheet.create({
	part: {
		paddingBottom: 16,
	},
	modifyBtn: {
		borderWidth: 1,
		borderColor: "#DCDFE1",
		borderStyle: "solid",
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
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
})

const getAccessString = (accessNum) => {
	return accessNum === 1 ? "public" : ""
}

function Confidentiality(props) {
	const { canModify, data, isModal, ...nextProp } = props
	const { t } = useTranslation()

	const userAccess = Array.from(data.userAccess || [])
	const [tooltip1, setTooltip1] = useState(false)
	return (
		<Row {...nextProp}>
			<Column flex={1}>
				<Row style={Styles.part}>
					<Column flex={10}>
						<Heading level={5}>
							{t("shareYourRights:collaboratorModal.confidentiality")}
						</Heading>
					</Column>
					{canModify && (
						<Column flex={2}>
							<View>
								<TouchableWithoutFeedback>
									<View style={Styles.modifyBtn}>
										<Row>
											<Column
												flex={1}
												style={{
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<ModifierSVG />
											</Column>
											<Column flex={3} style={{ alignItems: "center" }}>
												<Text small bold action>
													{t("shareYourRights:collaboratorModal.edit")}
												</Text>
											</Column>
										</Row>
									</View>
								</TouchableWithoutFeedback>
							</View>
						</Column>
					)}
				</Row>
				<Row>
					<Column flex={1}>
						<EyeIcon />
					</Column>
					<Column flex={11}>
						<Row>
							<Column>
								<Text
									dangerouslySetInnerHTML={{
										__html: t("shareYourRights:collaboratorModal.access", {
											access: getAccessString(data.access),
										}),
									}}
								/>
							</Column>
							<Column
								style={{
									alignItems: "center",
									justifyContent: "center",
									marginLeft: 6,
								}}
							>
								<View>
									<TouchableWithoutFeedback>
										<View>
											<QuestionMark />
										</View>
									</TouchableWithoutFeedback>
								</View>
							</Column>
						</Row>
					</Column>
				</Row>
				{!isModal && (
					<Row style={{ paddingTop: 16 }}>
						<Column flex={1} />
						<Column flex={11}>
							<Text
								small
								dangerouslySetInnerHTML={{
									__html: t(
										"shareYourRights:collaboratorModal.permissionPublicDesc",
										{
											name: getAccessString(data.access),
										}
									),
								}}
							/>
						</Column>
					</Row>
				)}
				{userAccess.map((item, index) => (
					<ConfidentialityItemOnTouch
						key={index}
						data={item}
						style={{ paddingTop: 24 }}
						status={item.status}
						isModal={isModal}
					/>
				))}
			</Column>
			<Column flex={1} />
		</Row>
	)
}

function ConfidentialityItem(props) {
	const { showButton, isModal, data, ...nextProp } = props
	const { t } = useTranslation()
	return (
		<Row {...nextProp}>
			<Column flex={1} />
			<Column flex={11}>
				<Row>
					<Column flex={1}>
						<UserAvatar
							size="small"
							picture={data && data.url ? data.url : ""}
						/>
					</Column>
					<Column
						flex={7}
						style={{ justifyContent: "center", paddingLeft: 16 }}
					>
						<Row>
							<Text>{data && data.name ? data.name : ""}</Text>

							{data && data.note && (
								<View style={{ justifyContent: "center", paddingLeft: 6 }}>
									<QuestionMark />
								</View>
							)}
						</Row>
					</Column>
					<Column
						flex={4}
						style={{ justifyContent: "center", alignItems: "flex-end" }}
					>
						<Text
							small
							secondary={data && data.status === 2}
							action={data && data.status === 1}
							error={data && data.status === 3}
							bold={(data && data.status === 1) || (data && data.status === 3)}
						>
							{data && data.status ? getStatusString(data.status) : ""}
						</Text>
					</Column>
				</Row>
				{showButton && (
					<Row style={{ paddingTop: 16 }}>
						<Column flex={1}></Column>
						<Column
							flex={11}
							style={{ justifyContent: "center", paddingLeft: 16 }}
						>
							<Row>
								<Column flex={1} style={{ paddingRight: 8 }}>
									<View>
										<Button
											bold
											megaError={isModal}
											danger={!isModal}
											text={t("shareYourRights:collaboratorModal.refuse")}
										/>
									</View>
								</Column>
								<Column flex={1} style={{ paddingLeft: 8 }}>
									<View>
										<Button
											bold
											secondary
											text={t("shareYourRights:collaboratorModal.accept")}
										/>
									</View>
								</Column>
							</Row>
						</Column>
					</Row>
				)}
			</Column>
		</Row>
	)
}

function ConfidentialityItemOnTouch(props) {
	const { status, isModal, ...nextProp } = props

	const [showButton, setShowButton] = useState(false)
	return (
		<>
			{status === 2 && !isModal && (
				<TouchableWithoutFeedback onPress={() => setShowButton(!showButton)}>
					<ConfidentialityItem showButton={showButton} {...nextProp} />
				</TouchableWithoutFeedback>
			)}
			{(status !== 2 || isModal) && <ConfidentialityItem {...nextProp} />}
		</>
	)
}

export default Confidentiality
