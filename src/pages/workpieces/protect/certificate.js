import React, { useState } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Button from "../../../widgets/button"
import { Row, Group } from "../../../layout"
import { observer } from "mobx-react"
import CertificateModel from "../../../mobX/models/workpieces/protect/CertificateModel"
import { useProtectModel } from "../../../mobX/hooks"
import { DialogModal } from "../../../widgets/modal"
import VerifyModal from "./verifyModal"
import WaitingModal from "./waitingModal"
import FinalModal from "./finalModal"
import CertificatePage from "./certificatePage"

export default observer(function Certificate(props) {
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: CertificateModel = useProtectModel(workpieceId, "certificate")
	const history = useHistory()
	function navigateToSummary() {
		history.push(`/workpieces/${workpieceId}/protect-certificate-final/1`)
	}
	const { modalVisible, closeModal } = props
	const handleModalPublishClose = () => {
		closeModal()
		navigateToSummary()
	}

	return (
		<>
			<CertificatePage workpiece={workpiece} model={model} />
			<PublishModal
				workpieceId={workpieceId}
				model={model}
				visible={modalVisible}
				onRequestClose={handleModalPublishClose}
			/>
		</>
	)
})

export function PublishModal(props) {
	const { t } = useTranslation()
	const model: CertificateModel = props.model
	const workpieceId = props.workpieceId

	const [selection, setSelection] = useState([])
	const [isEnoughSelect, setIsEnoughSelect] = useState(false)

	const [orderShow, setOrderShow] = useState(1)
	const [textPublishBtn, setTextPublishBtn] = useState(
		t("protect:publishOnBlockchain").toString()
	)

	const verifyCallback = (val) => {
		setSelection(val)
		if (val.length === 3) setIsEnoughSelect(true)
		else setIsEnoughSelect(false)
	}

	const waitingPublish = () => {
		setTimeout(
			function () {
				setOrderShow(3)
			}.bind(this),
			2000
		)
	}

	const handleClickPublish = (e) => {
		if (orderShow === 1) {
			setOrderShow(2)
			waitingPublish()
			setTextPublishBtn(t("protect:btnPublishFinal").toString())
		} else if (orderShow === 3) {
			props.onRequestClose()
		}
	}

	const clearOnCloseDialog = () => {
		setSelection([])
		setOrderShow(1)
		props.onRequestClose()
	}

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={clearOnCloseDialog}
			title={t("protect:beforePosting")}
			buttons={
				<>
					{orderShow != 3 && (
						<Button
							tertiary
							text={t("general:buttons.cancel")}
							onClick={clearOnCloseDialog}
						></Button>
					)}
					{orderShow != 2 && (
						<Button
							disabled={!isEnoughSelect}
							text={textPublishBtn}
							onClick={handleClickPublish}
						/>
					)}
				</>
			}
		>
			<Group of="group" style={{ maxWidth: 560 }}>
				{orderShow === 1 && (
					<Row>
						<VerifyModal
							selection={selection}
							parentCallback={verifyCallback}
							model={model}
						/>
					</Row>
				)}
				{orderShow === 2 && (
					<Row>
						<WaitingModal />
					</Row>
				)}
				{orderShow === 3 && (
					<Row>
						<FinalModal />
					</Row>
				)}
			</Group>
		</DialogModal>
	)
}
