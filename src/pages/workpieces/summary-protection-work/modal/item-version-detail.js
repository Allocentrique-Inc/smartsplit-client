import React, { useState } from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Column, Row } from "../../../../layout"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { Text } from "../../../../text"

const getStatusString = (status) => {
	return status === 1 ? "Approuvé" : status === 2 ? "En attente d’envoi" : ""
}

const ItemVersionDetail = observer((props) => {
	const { boldPercent, data } = props
	const [status, setStatus] = useState(
		data ? (data.status ? getStatusString(data.status) : "") : ""
	)
	return (
		<View>
			<Row>
				<Column flex={2}>
					<UserAvatar picture={data ? (data.uri ? data.uri : "") : ""} />
				</Column>
				<Column flex={7}>
					<Row>
						<Text>{data ? (data.name ? data.name : "") : ""}</Text>
					</Row>
					<Row>
						<Text>{data ? (data.role ? data.role : "") : ""}</Text>
					</Row>
				</Column>
				<Column style={{ alignItems: "flex-end" }}>
					<Row>
						<Text bold={boldPercent}>
							{data ? (data.percent ? data.percent : "") : ""}%
						</Text>
					</Row>
					<Row>
						<Text
							action={data && data.status && data.status === 1}
							bold={data && data.status && data.status === 1}
							secondary={data && data.status && data.status === 2}
						>
							{status}
						</Text>
					</Row>
				</Column>
			</Row>
		</View>
	)
})
export default ItemVersionDetail
