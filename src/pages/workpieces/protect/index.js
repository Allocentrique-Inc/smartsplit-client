import React, { useRef, useState } from "react"
import { Redirect, useHistory, useParams } from "react-router"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useStorePath, useStores } from "../../../mobX"
import { useSubpath } from "../../../appstate/react"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"

import { Row, Column, Flex, Hairline } from "../../../layout"
import { Form, RadioGroup, RadioGroupButton, FileField } from "../../../forms"
import { Heading, Paragraph, Text } from "../../../text"
import Button from "../../../widgets/button"

import Selection from "./selection"

const ProtectWork = observer(() => {
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const history = useHistory()
	const form = useRef()
	const { workpiece_id, type } = useParams()
	const { workpieces } = useStores()
	const [endModal, setEndModal] = useState(false)

	if (!workpiece_id) navigateToSummary()
	else if (!type)
		return <Redirect to={`/workpieces/${workpiece_id}/protect/selection`} />

	const protectPage = {
		selection: {
			form: Selection,
			progress: 25,
			title: t("protect:navbar.pages.selection"),
		},
		certificate: {
			form: null,
			progress: 87.5,
			title: t("protect:navbar.pages.certificate"),
		},
	}

	const goToHome = () => {
		history.push("/workpieces/" + workpiece.id)
	}

	const navigateToSummary = () => {
		history.push(`/workpieces/${workpiece.id}/protect`)
	}

	const toPreviousPage = () => {
		model.save(type)
		type === "selection" && navigateToSummary()
		type === "certificate" &&
			history.push(`/workpieces/${workpiece.id}/protect/certificate`)
	}

	const toNextPage = () => {
		model.save(type)
	}

	return (
		<Layout
			workpiece={workpiece}
			progress={protectPage[type].progress}
			path={[t("protect:navbar.protect"), protectPage[type].title]}
			actions={<Button tertiary text="Abandonner" onClick={goToHome} />}
			formNav={
				<Row style={{ maxWidth: 464 }} flex={1}>
					<Button
						secondary
						text={t("general:buttons.back")}
						onClick={toPreviousPage}
					/>
					<Flex />
					<Button
						primary
						text={
							(type === "links"
								? t("general:buttons.end")
								: t("general:buttons.continue"),
							type === "files"
								? t("general:buttons.pass")
								: t("general:buttons.continue"))
						}
						onClick={toNextPage}
					/>
				</Row>
			}
		>
			{!workpieces.isLoading &&
				React.createElement(protectPage[type].form, {
					modalVisible: endModal,
					closeModal: () => {
						setEndModal(false)
					},
				})}
		</Layout>
	)
})

export default ProtectWork

// export function ProtectWorkForm({ workpiece }) {
// 	const files = useCurrentWorkpiece("files", "$all")

// 	console.log("files", files)

// 	return (
// 		<Column of="section" flex={6}>
// 			<Column of="component">
// 				<Heading level={1}>
// 					Quelle version de l'oeuvre aimerais-tu protéger?
// 				</Heading>
// 				<Paragraph>
// 					Ici, tu envoies ton oeuvre dans un encodeur informatique.
// 				</Paragraph>
// 				<Paragraph>
// 					L'algorithme derrière cette page prendra ton oeuvre et créera à partir
// 					d'elle une empreinte numérique unique que l'on nomme un <i>hash</i>.
// 				</Paragraph>
// 			</Column>

// 			<Column of="component">
// 				<Heading level={3}>Fichier à protéger</Heading>

// 				<RadioGroup name="file_id">
// 					<Column of="inside">
// 						{files.map((file) => (
// 							<FileRadioButton key={file.data.file_id} file={file} />
// 						))}

// 						<RadioGroupButton>
// 							<Flex>
// 								<FileField
// 									name="file_upload"
// 									label="Ajouter un fichier"
// 									undertext="Tous formats acceptés, 2 Mo maximum."
// 								/>
// 							</Flex>
// 						</RadioGroupButton>
// 					</Column>
// 				</RadioGroup>
// 			</Column>

// 			<Hairline />

// 			<Column of="component">
// 				<Heading level={3}>Version de travail</Heading>
// 				<RadioGroup name="versionType">
// 					<Column of="inside">
// 						<RadioGroupButton value="idea" label="Idée" />
// 						<RadioGroupButton value="demo" label="Démo" />
// 						<RadioGroupButton value="rough-mix" label="Rough Mix" />
// 						<RadioGroupButton
// 							value="final-master"
// 							label="Version finale (masterisée)"
// 						/>
// 					</Column>
// 				</RadioGroup>
// 			</Column>
// 		</Column>
// 	)
// }

// function FileRadioButton({ file }) {
// 	const data = useSubpath(file, "data")
// 	return <RadioGroupButton value={data.file_id} label={data.name} />
// }

// export function ProtectWorkHelp() {
// 	return (
// 		<Column of="group" flex={5}>
// 			<Column of="component" padding="component" layer="underground">
// 				<Column of="inside">
// 					<Text small bold tertiary>
// 						AIDE
// 					</Text>
// 					<Hairline />
// 				</Column>

// 				<Heading level={4}>Pourquoi protéger mon oeuvre?</Heading>

// 				<Text secondary>
// 					Enregistrer son oeuvre sur la blockchain avec <i>Smartsplit</i> est
// 					équivalent à se l'envoyer par courrier recommandé à soi-même afin de
// 					pouvoir démontrer au besoin sa paternité
// 				</Text>
// 			</Column>
// 		</Column>
// 	)
// }
