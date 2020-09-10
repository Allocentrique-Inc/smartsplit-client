import React, { useState } from "react"
import Autocomplete from "../../forms/autocomplete"
import PlusCircle from "../../svg/plus-circle"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { useTranslation } from "react-i18next"
import EditModal from "../rightholders/edit-modal"
import { AddCollaboratorModal } from "../../pages/dashboard/collaborators"

import { useRightHolderSearch } from "../../appstate/react/right-holders"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

export default function AddCollaboratorDropdown(props) {
	const { t } = useTranslation()
	const [inviteModal, setInviteModal] = useState(false)
	const [terms, setTerms] = useState("")
	const results = useRightHolderSearch(terms)

	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				placeholder={t("rightSplits:dropdowns.addCollab")}
				{...props}
				onSearchChange={setTerms}
				searchResults={results.map((rh) => (
					<Row key={rh.rightHolder_id}>
						<Text>
							{rh.firstName} {rh.lastName}
						</Text>
					</Row>
				))}
				onSelect={(result) => props.onSelect(result.key)}
			>
				<TouchableWithoutFeedback onPress={() => setInviteModal(true)}>
					<Row of="component" padding="component" style={Styles.actionFrame}>
						<PlusCircle />
						<Text bold action>
							{t("forms:labels.dropdowns.createCollaborator")}
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			</Autocomplete>
			<AddCollaboratorModal
				visible={inviteModal}
				onRequestClose={() => setInviteModal(false)}
			/>
		</>
	)
}
