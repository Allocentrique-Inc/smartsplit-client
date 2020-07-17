import React, { useState } from "react"
import Autocomplete from "../../forms/autocomplete"
import PlusCircle from "../../svg/plus-circle"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { useTranslation } from "react-i18next"
import InviteModal from "../rightholders/invite-modal"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

export default function AddCollaboratorDropdown(props) {
	const { t } = useTranslation()
	const [inviteModal, setInviteModal] = useState(false)
	return (
		<>
			<Autocomplete icon={PlusCircle} {...props}>
				<TouchableWithoutFeedback onPress={() => setInviteModal(true)}>
					<Row of="component" padding="component" style={Styles.actionFrame}>
						<PlusCircle />
						<Text bold action>
							{t("forms:createCollaborator")}
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			</Autocomplete>
			<InviteModal
				visible={inviteModal}
				onRequestClose={() => setInviteModal(false)}
			/>
		</>
	)
}
