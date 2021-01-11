import { observer } from "mobx-react"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import moment from "moment"
import TextField from "../../../forms/text"
import { Column, Group, NoSpacer, Row } from "../../../layout"
import Button from "../../../widgets/button"
import { DialogModal } from "../../../widgets/modal"
import DatePickers from "../../../smartsplit/components/DatePickers"
import { Text } from "../../../text"
import { useProtectModel } from "../../../mobX/hooks"
import CertificateModel from "../../../mobX/models/workpieces/protect/CertificateModel"
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native"
import ChevronRight from "../../../svg/chevron-right"
import ChevronDown from "../../../svg/chevron-down"

const displayFormat = "DD-MM-YYYY"

const Styles = StyleSheet.create({
	viewEncryption: {
		alignItems: "center",
		flexDirection: "row",
	},
})

export default observer(function CompleteIdentityModal(props) {
	const { visible, onRequestClose, workpieceId } = props
	const { t } = useTranslation()
	const model: CertificateModel = useProtectModel(workpieceId, "certificate")
	let user = model.listedBy.value
	const [startDate, setStartDate] = useState("")
	const [email, setEmail] = useState("")
	const [showEncryption, setShowEncryption] = useState(false)

	const handleChangeDate = (e, { value }) => {
		setStartDate(value)
	}

	const handleClickSave = () => {
		model.listedBy.value.birth = startDate
		model.listedBy.value.email = email
		if (model.listedBy.value.birth && model.listedBy.value.email) {
			setContentEncryption(
				t("protect:certificate:encryption", {
					birth: user.birth,
					email: user.email,
				}).toString()
			)
			onRequestClose(true)
		} else onRequestClose(false)
	}

	const handleShowEncryption = () => {
		if (showEncryption) setShowEncryption(false)
		else setShowEncryption(true)
	}

	const clearOnCloseDialog = () => {
		setShowEncryption(false)
		onRequestClose()
	}

	const [contentEncryption, setContentEncryption] = useState(
		user.birth && user.email
			? t("protect:certificate:encryption", {
					birth: user.birth,
					email: user.email,
			  }).toString()
			: t("protect:certificate:notEnoughInfo").toString()
	)

	useEffect(() => {
		if (visible) {
			const listedBy = model.listedBy.value
			setEmail(listedBy.email || "")
			setStartDate(listedBy.birth || "")
		}
	}, [visible])

	return (
		<DialogModal
			key="complete-identity"
			size="medium"
			visible={visible}
			onRequestClose={clearOnCloseDialog}
			noScroll={true}
			title={t("protect:certificate:completeIdentity")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={clearOnCloseDialog}
					></Button>
					<Button
						onClick={handleClickSave}
						text={t("protect:certificate:save")}
					/>
				</>
			}
		>
			<Group of="group">
				<NoSpacer>
					<Text style={{ paddingBottom: 12 }} bold>
						{t("protect:certificate:addBirthFieldTitle", {
							name: `${user.firstName} ${user.lastName}`,
						})}
					</Text>
					<DatePickers
						value={startDate}
						icon={"calendar outline"}
						onChange={handleChangeDate}
						dateFormat={displayFormat}
						style={{ width: "100%" }}
					/>
				</NoSpacer>
				<NoSpacer>
					<Text style={{ paddingBottom: 12, paddingTop: 12 }} bold>
						{t("protect:certificate:addEmailModal", {
							name: `${user.firstName} ${user.lastName}`,
						})}
					</Text>
					<TextField
						value={email}
						placeholder="debbietebbs@gmail.com"
						onChangeText={(v) => {
							setEmail(v)
						}}
						error={!email}
					/>
				</NoSpacer>
				{model.saveError && <Text error>{model.saveError}</Text>}
				<Text secondary style={{ paddingTop: 12 }}>
					{t("protect:certificate:completeIdDesc", {
						name: `${user.firstName} ${user.lastName}`,
					})}
				</Text>
				<TouchableWithoutFeedback onPress={handleShowEncryption}>
					<View>
						<Row>
							<Column flex={5} style={Styles.viewEncryption}>
								<Text action bold>
									{t("protect:certificate:viewEncryption")}
								</Text>
								{!showEncryption && <ChevronRight color="#2da84f" />}
								{showEncryption && <ChevronDown color="#2da84f" />}
							</Column>
						</Row>
					</View>
				</TouchableWithoutFeedback>
				{showEncryption && (
					<Text
						secondary
						small
						dangerouslySetInnerHTML={{
							__html: contentEncryption,
						}}
						align="center"
					/>
				)}
			</Group>
		</DialogModal>
	)
})
