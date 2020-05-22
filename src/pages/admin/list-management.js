import React from "react"
import { Column, Row } from "../../layout"
import { Heading, Text } from "../../text"
import { useTranslation } from "react-i18next"
import { List, ListItem } from "../../widgets/list"
import File from "../../svg/file"
import { TouchableWithoutFeedback } from "react-native"
import Scrollable from "../../widgets/scrollable"
import { useHistory } from "react-router"

export default function ListManagement() {
	const history = useHistory()
	function handlePress(id) {
		history.push(`/admin/lists/${id}`)
	}
	const listIds = [
		"content-languages",
		"digital-distributors"
	]

	const { t } = useTranslation()
	return (
		<Scrollable>
			<Column of="group" padding="large">
				<Heading level={2}>{t("adminMenu:listManagement")}</Heading>
				<List>
					{listIds.map(id => (
						<TouchableWithoutFeedback onPress={() => handlePress(id)} key={id}>
							<ListItem>
								<Column>
									<Row of="component" valign="center">
										<File/>
										<Text>{t(`adminLists:${id}`)}</Text>
									</Row>
								</Column>
							</ListItem>
						</TouchableWithoutFeedback>
					))}
				</List>
			</Column>
		</Scrollable>

	)
}
