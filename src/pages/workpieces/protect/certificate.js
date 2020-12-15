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
	const { modalVisible, closeModal } = props
	return (
		<>
			<CertificatePage workpiece={workpiece} model={model}></CertificatePage>
			<PublishModal
				workpiece={workpiece}
				model={model}
				visible={modalVisible}
				onRequestClose={closeModal}
			></PublishModal>
		</>
	)
})

export function PublishModal(props) {
	const { t } = useTranslation()
	const model: CertificateModel = props.model
	const workpiece = props.workpiece
	const history = useHistory()
	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}
	const [selection, setSelection] = useState([])
	const [isEnoughSelect, setIsEnoughSelect] = useState(false)
	const [showVerify, setShowVerify] = useState(true)
	const [showWaiting, setShowWaiting] = useState(false)
	const [showFinal, setShowFinal] = useState(false)
	const verifyCallback = (val) => {
		setSelection(val)
		if (val.length === 3) setIsEnoughSelect(true)
		else setIsEnoughSelect(false)
	}

	const handleClickPublish = (val) => {
		if (showVerify) {
			setShowVerify(false)
			setShowWaiting(true)
			setShowFinal(false)
		} else if (showWaiting) {
			setShowVerify(false)
			setShowWaiting(false)
			setShowFinal(true)
		} else {
			navigateToSummary()
		}
	}
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("protect:beforePosting")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={props.onRequestClose}
					></Button>
					<Button
						disabled={!isEnoughSelect}
						text={t("protect:publishOnBlockchain")}
						onClick={handleClickPublish}
					/>
				</>
			}
		>
			<Group of="group" style={{ maxWidth: 560 }}>
				{showVerify && (
					<Row>
						<VerifyModal
							selection={selection}
							parentCallback={verifyCallback}
							model={model}
						/>
					</Row>
				)}
				{showWaiting && (
					<Row>
						<WaitingModal workpiece={workpiece} />
					</Row>
				)}
				{showFinal && <FinalModal workpiece={workpiece} />}
			</Group>
		</DialogModal>
	)
}
