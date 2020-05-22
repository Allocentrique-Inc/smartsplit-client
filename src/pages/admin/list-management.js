import React from "react"
import { Column, Row } from "../../layout"
import { Heading, Text } from "../../text"
import { useTranslation } from "react-i18next"
import Button from "../../widgets/button"
import { List, ListItem } from "../../widgets/list"
import File from "../../svg/file"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import Badge from "../../svg/badge"
import Scrollable from "../../widgets/scrollable"
import { useHistory } from "react-router"

export default function ListManagement() {
	const history = useHistory()
	function handlePress(id) {
		history.push(`/admin/list-detail/${id}`)
	}
	const listTitles = [
		{ name: "Entités corporatives" },
		{
			name: "Collèges de droits",
			changes: 2,
		},
		{ name: "Champs d'action des entités" },
		{
			name: "Entités corporatives",
			changes: 3,
		},
		{ name: "Collèges de droits" },
		{
			name: "Champs d'action des entités",
			changes: 5,
		},
		{
			name: "Entités corporatives",
			changes: 8,
		},
		{ name: "Collèges de droits" },
		{ name: "Champs d'action des entités" },
		{ name: "Entités corporatives" },
		{
			name: "Collèges de droits",
			changes: 2,
		},
		{ name: "Champs d'action des entités" },
	]

	const { t } = useTranslation()
	return (
		<Scrollable>
			<Column of="group" padding="large">
				<Row align="spread">
					<Heading level={2}>{t("adminMenu:listManagement")}</Heading>
					<Button text={t("general:buttons.add")}/>
				</Row>
				<List>
					{listTitles.map((title, index) => (
						<TouchableWithoutFeedback onPress={() => handlePress(index)}>
							<ListItem key={index}>
								<Column>
									<Row of="component" valign="center">
										{title.changes ? <Badge value={title.changes}/> : <File/>}

										<Text>{title.name}</Text>
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
