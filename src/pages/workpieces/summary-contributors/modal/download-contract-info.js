import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { StyleSheet, View } from "react-native"
import { Column, Hairline, Row } from "../../../../layout"
import TextField from "../../../../forms/text"
import DatePickers from "../../../../smartsplit/components/DatePickers"
import { Text } from "../../../../text"
import SearchAndTag from "../../../../forms/search-and-tag"
import { Metrics } from "../../../../theme"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { defaultPicture } from "./item-version-detail"

const Styles = StyleSheet.create({
	rowTextInput: {
		paddingTop: Metrics.spacing.large,
	},
	fieldColumn: {
		paddingRight: Metrics.spacing.medium,
	},
})

const DownloadContractInfo = observer((props) => {
	const { data, isLast, ...nextProps } = props
	const { t } = useTranslation()

	let nameOfWork = data && data.nameOfWork ? data.nameOfWork : ""

	let role = data && data.roles ? data.roles : ""
	const [dateOfBirth, setDateOfBirth] = useState(
		data && data.dateOfBirth ? data.dateOfBirth : ""
	)
	const [usualFirstNames, setUsualFirstNames] = useState(
		data && data.usualFirstNames ? data.usualFirstNames : ""
	)
	const [usualName, setUsualName] = useState(
		data && data.usualName ? data.usualName : ""
	)
	const [ipi, setIPI] = useState(data && data.ipi ? data.ipi : "")
	const [streetAddress, setStreetAddress] = useState(
		data && data.streetAddress ? data.streetAddress : ""
	)
	const [email, setEmail] = useState(data && data.email ? data.email : "")

	const handleChangeDate = (value) => {
		setDateOfBirth(value)
	}

	return (
		<View {...nextProps}>
			<Row style={{ paddingTop: Metrics.spacing.group }}>
				<Column style={{ justifyContent: "center" }} flex={1}>
					<UserAvatar picture={defaultPicture} />
				</Column>
				<Column flex={11}>
					<Row>
						<Text bold>{nameOfWork}</Text>
					</Row>
					<Row>
						<Text secondary small>
							{role}
						</Text>
					</Row>
				</Column>
			</Row>
			<Row>
				<Column flex={1} />
				<Column flex={11}>
					<Row style={Styles.rowTextInput}>
						<Column flex={1} style={Styles.fieldColumn}>
							<TextField
								label={t("shareYourRights:sensitiveInfoModal.usualFirstNames")}
								value={usualFirstNames}
							/>
						</Column>
						<Column flex={1}>
							<TextField
								label={t("shareYourRights:sensitiveInfoModal.usualName")}
								value={usualName}
							/>
						</Column>
					</Row>
					<Row style={Styles.rowTextInput}>
						<Column flex={1} style={Styles.fieldColumn}>
							<DatePickers
								value={dateOfBirth}
								label={t("shareYourRights:sensitiveInfoModal.dateOfBirth")}
								icon={"calendar outline"}
								format="DD/MM/YYYY"
								maxWidth
								onChange={handleChangeDate}
							/>
						</Column>
						<Column flex={1}>
							<TextField
								tooltip={
									<Text>
										{t("shareYourRights:sensitiveInfoModal.ipiTooltip")}
									</Text>
								}
								label="IPI"
								label_hint={t("shareYourRights:sensitiveInfoModal.optional")}
								value={ipi}
							/>
						</Column>
					</Row>
					<Row style={Styles.rowTextInput}>
						<Column flex={1}>
							<SearchAndTag
								label={t("shareYourRights:sensitiveInfoModal.streetAddress")}
								search={streetAddress}
							/>
						</Column>
					</Row>
					<Row
						style={[
							Styles.rowTextInput,
							{ paddingBottom: Metrics.spacing.large },
						]}
					>
						<Column flex={1} style={Styles.fieldColumn}>
							<TextField
								label={t("shareYourRights:sensitiveInfoModal.email")}
								value={email}
							/>
						</Column>
					</Row>
				</Column>
			</Row>
			{!isLast && <Hairline />}
		</View>
	)
})
export default DownloadContractInfo
