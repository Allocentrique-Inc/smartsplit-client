import React, { useState } from "react"
import {
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import { Column, Flex, Row } from "../../../../layout"
import { useTranslation } from "react-i18next"
import { Heading, Text } from "../../../../text"
import ModifierSVG from "../../../../svg/modify-svg"
import EyeIcon from "../../../../svg/eye"
import QuestionMark from "../../../../svg/question-mark"
import { defaultPicture, getStatusString } from "./item-version-detail"
import Button from "../../../../widgets/button"
import AvatarProgress from "../circular-progress"
import { TooltipIcon } from "../../../../widgets/tooltip"
import { useStores } from "../../../../mobX"
import { useRightSplits } from "../../../../mobX/hooks"
import { useCurrentWorkpieceId } from "../../context"

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
})

const getAccessString = (accessNum) => {
	return accessNum === 1 ? "public" : ""
}

function Confidentiality(props) {
	const { canModify, data, isModal, ...nextProp } = props
	const { t } = useTranslation()

	const userAccess = Array.from(data.userAccess || [])
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
								<Button
									icon={
										<View>
											<ModifierSVG />
										</View>
									}
									small
									secondary
									bold
									text={t("shareYourRights:collaboratorModal.edit")}
								/>
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
									<TooltipIcon text="Hello" />
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
											name: "Inscience",
										}
									),
								}}
							/>
						</Column>
					</Row>
				)}
				{userAccess.map((item, index) => (
					<ConfidentialityItem
						key={index}
						data={item}
						style={{ paddingTop: 24 }}
						isModal={isModal}
					/>
				))}
				<Row>
					<Flex></Flex>
				</Row>
			</Column>
			<Column flex={1} />
		</Row>
	)
}

function ConfidentialityItem(props) {
	const { isModal, data, ...nextProp } = props
	const { t } = useTranslation()
	const [showButton, setShowButton] = useState(false)
	return (
		<Row {...nextProp}>
			<Column flex={1} />
			<Column flex={11}>
				{data && data.status === 2 && !isModal && (
					<TouchableWithoutFeedback onPress={() => setShowButton(!showButton)}>
						<View>
							<RowConfidentialityItem data={data} />
						</View>
					</TouchableWithoutFeedback>
				)}
				{(isModal || (data && data.status !== 2)) && (
					<RowConfidentialityItem data={data} />
				)}
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
							<Row style={{ paddingTop: 16 }}>
								<Flex>
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
								</Flex>
							</Row>
						</Column>
					</Row>
				)}
			</Column>
		</Row>
	)
}

function RowConfidentialityItem(props) {
	const { data } = props
	return (
		<Row>
			<Column flex={1}>
				<AvatarProgress
					percent={data && data.percent ? data.percent : 0}
					size={40}
					borderWidth={4}
					borderBgColor={
						data && data.borderBgColor ? data.borderBgColor : "#F5F2F3"
					}
					percentColor={
						data && data.percentColor ? data.percentColor : "#D9ACF7"
					}
					picture={data && data.url ? data.url : defaultPicture}
				/>
			</Column>
			<Column flex={7} style={{ justifyContent: "center", paddingLeft: 16 }}>
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
	)
}

export default Confidentiality
