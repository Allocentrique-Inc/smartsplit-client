import { observer } from "mobx-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import moment from "moment"
import TextField from "../../../forms/text"
import { Group, NoSpacer } from "../../../layout"
import Button from "../../../widgets/button"
import { DialogModal } from "../../../widgets/modal"
import UnionIcon from "../../../svg/user"
import { TouchableWithoutFeedback } from "react-native"
import { View } from "react-native-web"
import DatePickers from "../../../smartsplit/components/DatePickers"
import { DateIcon } from "../../../../assets/union.png"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Label from "../../../forms/label"
import { Header } from "semantic-ui-react"
import { Text } from "../../../text"
import { useProtectModel } from "../../../mobX/hooks"
import CertificateModel from "../../../mobX/models/workpieces/protect/CertificateModel"

const displayFormat = "DD-MM-YYYY"

export default observer(function CompleteIdentityModal(props) {
	const { visible, onRequestClose, workpieceId } = props
	const { t } = useTranslation()
	const model: CertificateModel = useProtectModel(workpieceId, "certificate")
	const user = model.listedBy.initialValue
	const [startDate, setStartDate] = useState(moment().format(displayFormat))
	const handleChangeDate = (e, { value }) => {
		setStartDate(value)
	}
	const [email, setEmail] = useState(user.email)
	return (
		<DialogModal
			key="complete-identity"
			size="medium"
			visible={visible}
			onRequestClose={onRequestClose}
			noScroll={true}
			title={t("protect:certificate:conpleteIdentity")}
			buttons={
				<>
					<Button text={t("general:buttons.add")} />
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
						value={
							// user.birth
							// 	? moment(user.birth).format(displayFormat)
							// 	: moment().format(displayFormat)
							startDate
						}
						icon={"calendar outline"}
						onChange={handleChangeDate}
						dateFormat={displayFormat}
						style={{ width: "100%" }}
					/>
				</NoSpacer>
				{model.saveError && <Text error>{model.saveError}</Text>}
				<NoSpacer>
					<Text style={{ paddingBottom: 12, paddingTop: 12 }} bold>
						{t("protect:certificate:addPlaceBirthModal", {
							name: `${model.listedBy.initialValue.firstName} ${model.listedBy.initialValue.lastName}`,
						})}
					</Text>
					<TextField
						placeholder="debbietebbs@gmail.com"
						onChange={(v) => {
							setEmail(v)
						}}
					/>
				</NoSpacer>
				{model.saveError && <Text error>{model.saveError}</Text>}
			</Group>
		</DialogModal>
	)
})
