import React, { useState } from "react"
import Autocomplete from "../../forms/autocomplete"
import PlusCircle from "../../svg/plus-circle"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { useTranslation } from "react-i18next"
import EditModal from "../rightholders/edit-modal"

import { useRightHolderSearch } from "../../appstate/react/right-holders"
import { AddContributorModal } from "../contributors/AddContributorModal"
import { AddCollaboratorModal } from "../collaborators/AddCollaboratorsModal"
import { observer } from "mobx-react"
import { useStores } from "../../mobX"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

function AddContributorDropdown(props) {
	const { t } = useTranslation()
	const { contributors } = useStores()
	//const [inviteModal, setInviteModal] = useState(false)
	//const [terms, setTerms] = useState("")
	//const results = useRightHolderSearch(terms)

	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				placeholder={t("contributor:add")}
				{...props}
			>
				<TouchableWithoutFeedback onPress={() => contributors.new()}>
					<Row of="component" padding="component" style={Styles.actionFrame}>
						<PlusCircle />
						<Text bold action>
							{t("forms:labels.dropdowns.createContributor")}
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			</Autocomplete>
			<AddContributorModal
				visible={contributors.editing}
				onRequestClose={() => contributors.cancel()}
				onAdded={(contributor) => {
					props.onSelect(contributor)
				}}
			/>
		</>
	)
}
export default observer(AddContributorDropdown)
