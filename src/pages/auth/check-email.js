import React, {useState} from "react"
import { View, Platform } from "react-native"
import { Text } from "../../text"
import { DialogModal } from "../../widgets/modal"
import { Modal } from "../../widgets/modal"
import Button from "../../widgets/button"
import HighFive from "../../svg/high-five"
import { Group } from "../../layout"
import Scrollable from "../../widgets/scrollable"

export function CheckEmailModal(props) {
	const buttonSize = Platform.OS === "web" ? "medium" : "large"
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title="Vérifie tes courriels"
			buttons={
				<Button
					text="J'ai compris"
					onClick={props.onRequestClose}
					style={Platform.OS !== "web" && { flex: 1 }}
					size={buttonSize}
				/>
			}
		>
			<Group
				of="group"
				style={{ maxWidth: 560, alignSelf: "center" }}
			>
				<View style={{ alignItems: "center" }}>
					<HighFive />
				</View>
				<Text>
					Un message incluant un lien de validation de ton compte t'a été envoyé
					par courriel.{"\n"}
					Vérifie tes spams. On ne sait jamais !
				</Text>
			</Group>
		</DialogModal>
	)
}

export default function CheckEmailPage(props) {
	const [modalOpen, setModal] = useState(false)
	
	return (
		<>

		<Scrollable>
		
			<Button 
			text="Test" 
			onClick={() => setModal(true)}
		/>
	
			<CheckEmailModal 
				visible={modalOpen}
				onRequestClose={() => setModal(false)}
				{...props}
			/>
		</Scrollable>
		</>
	)

}
