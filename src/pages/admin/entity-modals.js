import { useTranslation } from "react-i18next"
import React, { useRef } from "react"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Column, Group } from "../../layout"
import { useSelector } from "react-redux"
import { FormMode } from "../../utils/enums"
import { useEntity } from "../../../redux/entities/hooks"
import { Text } from "../../text"
import { EntityForm } from "../../smartsplit/forms/entities"
import { Metrics } from "../../theme"

export function FormModal(props) {
	const { t } = useTranslation()
	const { visible, onClose, entityId, mode, ...formProps } = props
	const formRef = useRef()
	const entityType = useSelector((state) => state.entities.entityList.type)
	function getTitle() {
		return mode === FormMode.creation
			? t("admin:entityCreation")
			: `${t("admin:edit")} ${entityId}`
	}
	return (
		<DialogModal
			visible={visible}
			onRequestClose={onClose}
			title={getTitle()}
			buttons={[
				<Button
					primary
					text={t("general:buttons.save")}
					onClick={() => formRef.current.submit()}
					key="save"
				/>,
				<Button
					tertiary
					text={t("general:buttons.cancel")}
					onClick={onClose}
					key="cancel"
				/>,
			]}
		>
			<Column
				style={{
					paddingLeft: Metrics.spacing.large,
					paddingRight: Metrics.spacing.large,
				}}
			>
				<EntityForm
					entityId={entityId}
					entityType={entityType}
					ref={formRef}
					mode={mode}
					{...formProps}
				/>
			</Column>
		</DialogModal>
	)
}

export function DeleteModal(props) {
	const { t } = useTranslation()
	const { visible, onClose, onDelete, entityId } = props
	const entity = useEntity(entityId)
	async function handleDelete() {
		const response = await entity.destroy()
		onDelete(response.status === 204)
	}

	return (
		<DialogModal
			visible={visible}
			onRequestClose={onClose}
			title={`${t("admin:delete")} ${entityId}`}
			buttons={[
				<Button
					primary
					text={t("general:buttons.confirm")}
					onClick={handleDelete}
					key="confirm"
				/>,
				<Button
					tertiary
					text={t("general:buttons.cancel")}
					onClick={onClose}
					key="cancel"
				/>,
			]}
		>
			<Group>
				<Text bold>{t("admin:confirmEntityDeletion")}</Text>
			</Group>
		</DialogModal>
	)
}
