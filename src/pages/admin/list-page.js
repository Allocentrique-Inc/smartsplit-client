import React, { useState } from "react"
import { Column, Row } from "../../layout"
import { Heading } from "../../text"
import Button from "../../widgets/button"
import { useTranslation } from "react-i18next"
import { Metrics } from "../../theme"
import { useEntityList } from "../../../redux/entities/hooks"
import {
	AdminList,
	AdminListItem,
} from "../../smartsplit/components/admin-list"
import { SimpleMenu } from "../../smartsplit/components/admin-list-menus"
import { DeleteModal, FormModal } from "./entity-modals"
import { FormMode } from "../../utils/enums"
import { useDispatch, useSelector } from "react-redux"
import { resetEntityList } from "../../../redux/entities/actions"
import Scrollable from "../../widgets/scrollable"

export default function ListPage(props) {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const entityList = useEntityList(props.match.params.id)
	const [selectedEntity, setSelectedEntity] = useState(null)
	const [createModal, setCreateModal] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)

	function handleSubmit(result, setter) {
		setSelectedEntity(null)
		setter(false)
		if (result) {
			dispatch(resetEntityList())
		}
	}

	function toggleCreateModal() {
		entityList.error && dispatch({ type: "CLEAR_ENTITY_LIST_ERROR" })
		setSelectedEntity(null)
		setCreateModal(!createModal)
	}

	function toggleModalWithId(entityId, setter) {
		entityList.error && dispatch({ type: "CLEAR_ENTITY_LIST_ERROR" })
		setSelectedEntity(entityId)
		setter(!!entityId)
	}

	return (
		<Scrollable>
			<Column of="group" padding="large">
				<Row align="spread">
					<Heading level={2}>
						{t(`admin:entityTypes.${entityList.type}`)}
					</Heading>
					<Button text={t("general:buttons.add")} onClick={toggleCreateModal} />
				</Row>
				{entityList.data && (
					<>
						<AdminList>
							{entityList.data.map((entity) => (
								<AdminListItem
									key={entity.entity_id}
									content={entity.entity_id}
									onModify={() =>
										toggleModalWithId(entity.entity_id, setEditModal)
									}
									onDelete={() =>
										toggleModalWithId(entity.entity_id, setDeleteModal)
									}
									contextualMenu="simple"
								/>
							))}
						</AdminList>
						{createModal && (
							<FormModal
								mode={FormMode.creation}
								visible={createModal}
								onSubmit={(result) => handleSubmit(result, setCreateModal)}
								onClose={toggleCreateModal}
							/>
						)}
						{editModal && (
							<FormModal
								mode={FormMode.edition}
								entityId={selectedEntity}
								visible={editModal}
								onSubmit={(result) => handleSubmit(result, setEditModal)}
								onClose={() => toggleModalWithId(null, setEditModal)}
							/>
						)}
						{deleteModal && (
							<DeleteModal
								entityId={selectedEntity}
								visible={deleteModal}
								onDelete={(result) => handleSubmit(result, setDeleteModal)}
								onClose={() => toggleModalWithId(null, setDeleteModal)}
							/>
						)}
					</>
				)}
			</Column>
		</Scrollable>
	)
}
