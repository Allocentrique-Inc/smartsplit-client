import React            	from "react"
import { View }	            from 'react-native'
import { Text }             from "../../text"
import { DialogModal } 		from "../../widgets/modal"
import Button				from "../../widgets/button"
import HighFive 		    from "../../svg/high-five"
import { Group } 			from "../../layout"

export default function CheckEmailModal(props) {

    return  <DialogModal
    visible={props.visible}
    onRequestClose={props.onRequestClose}
    title="Vérifie tes courriels"
    buttons={<Button text="J'ai compris" 
            onClick={props.onRequestClose} />}
            >
    <Group of="group" style={{ width: 560 }}>
        <View style={{alignItems: "center"}}>
            <HighFive />
        </View>
        <Text>Un message incluant un lien de validation de ton compte
            t'a été envoyé par courriel.{"\n"}
            Vérifie tes spams. On ne sait jamais !
        </Text>
        
    </Group>
</DialogModal>
}

