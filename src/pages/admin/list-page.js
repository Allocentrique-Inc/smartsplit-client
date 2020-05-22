import React, { useState, useRef, forwardRef } from "react"
import { Column, Group, Row, Section } from "../../layout"
import { Heading, Text } from "../../text"
import Button from "../../widgets/button"
import { List, ListItem } from "../../widgets/list"
import { useTranslation } from "react-i18next"
import { Metrics } from "../../theme"
import { useEntity, useEntityList } from "../../../redux/entities/hooks"
import { AdminList, AdminListItem } from "../../smartsplit/components/admin-list"
import { SimpleMenu } from "../../smartsplit/components/admin-list-menus"
import { DialogModal } from "../../widgets/modal"
import { Form, TextField, useForm, useFormField } from "../../forms"
import objdiff from "object-diff"
import { useSelector } from "react-redux"
import EditEntityModal from "./edit-entity-modal"

export default function ListPage(props) {
	const { t, i18n } = useTranslation()
	const entityList = useEntityList(props.match.params.id)
	const [selectedEntity, setSelectedEntity] = useState(null)
	console.log("Store state", useSelector(state => state))
	return (
		<Column of="group" style={{
			paddingTop: Metrics.spacing.large,
			paddingBottom: Metrics.spacing.large,
		}}>
			{entityList.data && <>
				<Row align="spread">
					<Heading level={2}>{t(`adminLists:${entityList.type}`)}</Heading>
					<Button text={t("general:buttons.add")}/>
				</Row>
				<AdminList>
					{entityList.data.map((entity, index) =>
						<AdminListItem key={index}
						               content={entity.name[i18n.language] ? entity.name[i18n.language] : entity.name.en}>
							<SimpleMenu onModify={() => setSelectedEntity(entity.entity_id)} onDelete={() => {
								entity.delete()//ne fonctionne pas
							}}/>
						</AdminListItem>,
					)}
				</AdminList>
				{selectedEntity &&
				<EditEntityModal
					entityId={selectedEntity}
					visible={selectedEntity}
					onSubmit={() => setSelectedEntity(null)}
					onClose={() => setSelectedEntity(null)}
				/>
				}
			</>
			}
		</Column>
	)
}

