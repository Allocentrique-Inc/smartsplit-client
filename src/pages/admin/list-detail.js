import React from "react"
import Scrollable from "../../widgets/scrollable"
import { Column, Row } from "../../layout"
import { Heading } from "../../text"
import Button from "../../widgets/button"
import { List, ListItem } from "../../widgets/list"
import { TestAdminList } from "../test/forms"
import { useTranslation } from "react-i18next"
import { Metrics } from "../../theme"

export function ListDetail(props) {
	const {t} = useTranslation()
	const listName = "Rôles d'interprètes"
	return (
			<Column of="group" style={{
				paddingTop: Metrics.spacing.large,
				paddingBottom: Metrics.spacing.large
			}}>
				<Row align="spread">
					<Heading level={2}>{listName}</Heading>
					<Button text={t("general:buttons.add")}/>
				</Row>
				<List>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>
					<ListItem list>
						<TestAdminList/>
					</ListItem>

				</List>
			</Column>
	)
}