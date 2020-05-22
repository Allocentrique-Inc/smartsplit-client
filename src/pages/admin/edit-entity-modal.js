import { useTranslation } from "react-i18next"
import React, { forwardRef, useRef } from "react"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Group } from "../../layout"

import { useSelector } from "react-redux"
import * as Entities from "../../smartsplit/forms/entities"



export default function EditEntityModal(props) {
	const { t } = useTranslation()
	const { visible, onClose, entityId, ...formProps } = props
	const formRef = useRef()
	const entityType = useSelector(state => state.entities.entityList.type)

	return (
		<DialogModal
			visible={visible}
			onRequestClose={onClose}
			title={`${t("general:changeOf")} ${entityId}`}
			buttons={[
				<Button primary text={t("general:buttons.save")}
				        onClick={() => formRef.current.submit()}
				        key="save"/>,
				<Button tertiary text={t("general:buttons.cancel")}
				        onClick={onClose}
				        key="cancel"
				/>,
			]}
		>
			<Group>
					<Entities.form entityId={entityId} onSubmit={onClose} ref={formRef} {...formProps}>
						{Entities.formFields[entityType]}
					</Entities.form>
			</Group>
		</DialogModal>
	)
}




