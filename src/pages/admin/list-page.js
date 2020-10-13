import React, { useState } from "react"
import { Column, Row } from "../../layout"
import { Heading } from "../../text"
import Button from "../../widgets/button"
import { useTranslation } from "react-i18next"
import { Metrics } from "../../theme"
import {
	AdminList,
	AdminListItem,
} from "../../smartsplit/components/admin-list"
import { SimpleMenu } from "../../smartsplit/components/admin-list-menus"
import { DeleteModal, FormModal } from "./entity-modals"
import { FormMode } from "../../utils/enums"
import Scrollable from "../../widgets/scrollable"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"

const ListPage = observer((props) => {
	const { t } = useTranslation()
	const entityState = useStorePath("admin", "entities", props.match.params.id)
	function submit() {
		entityState.submit()
	}
	function cancel() {
		entityState.clearSelected()
	}
	function doDelete() {
		entityState.doDelete()
	}
	return (
		<Scrollable>
			<Column of="group" padding="large">
				<Row align="spread">
					<Heading level={2}>
						{t(`admin:entityTypes.${entityState.type}`)}
					</Heading>
					<Button
						text={t("general:buttons.add")}
						onClick={() => {
							entityState.new()
						}}
					/>
				</Row>
				{entityState.count && (
					<>
						<AdminList>
							{Object.keys(entityState.list).map((key) => {
								let entity = entityState.list[key]
								return (
									<AdminListItem
										key={key}
										content={entity.entity_id}
										onModify={() => {
											entityState.edit(entity.entity_id)
										}}
										onDelete={() => {
											entityState.delete(entity.entity_id)
										}}
										contextualMenu="simple"
									/>
								)
							})}
						</AdminList>
						{entityState.mode === "create" && (
							<FormModal
								mode={FormMode.creation}
								model={entityState.model}
								type={entityState.type}
								visible={entityState.mode === "create"}
								onSubmit={submit}
								onClose={cancel}
							/>
						)}
						{entityState.mode === "edit" && (
							<FormModal
								mode={FormMode.edition}
								type={entityState.type}
								model={entityState.model}
								entityId={entityState.selected.entity_id}
								visible={entityState.mode === "edit"}
								onSubmit={submit}
								onClose={cancel}
							/>
						)}
						{entityState.mode === "delete" && (
							<DeleteModal
								entityId={entityState.selected.entity_id}
								type={entityState.type}
								visible={entityState.mode === "delete"}
								onDelete={doDelete}
								onClose={cancel}
							/>
						)}
					</>
				)}
			</Column>
		</Scrollable>
	)
})
export default ListPage
