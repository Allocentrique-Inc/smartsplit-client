import { useTranslation } from "react-i18next"
import React from "react"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Column, Group } from "../../layout"
import { FormMode } from "../../utils/enums"
import { Text } from "../../text"
import { EntityForm } from "../../smartsplit/forms/entities"
import { Metrics } from "../../theme"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"

/**
 * an observer mobx version of the FormModal
 * @type {IReactComponent}
 */
export const FormModal = observer((props) => {
	const { t } = useTranslation()
	const { type, visible, onClose, entityId, mode, model, ...formProps } = props
	const entityStore = useStorePath("admin", "entities", type)
	function getTitle() {
		return mode === FormMode.creation
			? t("admin:entityCreation")
			: `${t("admin:edit")} ${entityId}`
	}
	return (
		<DialogModal
			visible={visible}
			onRequestClose={() => {
				entityStore.clearSelected()
			}}
			title={getTitle()}
			buttons={[
				<Button
					primary
					text={t("general:buttons.save")}
					onClick={() => {
						entityStore.submit()
					}}
					key="save"
				/>,
				<Button
					tertiary
					text={t("general:buttons.cancel")}
					onClick={() => {
						entityStore.clearSelected()
					}}
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
					entityType={type}
					mode={mode}
					{...formProps}
				/>
			</Column>
		</DialogModal>
	)
})

/**
 * a mobx observing component for the delete modal
 * @type {IReactComponent}
 */
export const DeleteModal = observer((props) => {
	const { t } = useTranslation()
	const { visible, onClose, onDelete, entityId } = props
	return (
		<DialogModal
			visible={visible}
			onRequestClose={onClose}
			title={`${t("admin:delete")} ${entityId}`}
			buttons={[
				<Button
					primary
					text={t("general:buttons.confirm")}
					onClick={onDelete}
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
})
