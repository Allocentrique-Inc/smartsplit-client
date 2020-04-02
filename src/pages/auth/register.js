import React, { useState }	from "react"
import { View, Platform }	from 'react-native'
import Button				from "../../widgets/button"
import Scrollable           from "../../widgets/scrollable"
import { DialogModal } 		from "../../widgets/modal"
import { TextDivider, 
		Section, 
		Column,
		Row, 
		Group,
		Flex } 				from "../../layout"
import { TextField, 
		PasswordField,
		CheckBox } 			from "../../forms"
import { Heading, Text } 	from "../../text"
import PublicNavBar 		from '../../smartsplit/public/navbar'
import ProgressBar 			from "../../widgets/progress-bar"
import CheckEmailModal 		from './check-email'
//import { Tooltip } 			from 'react-native-elements'
import FacebookIcon 		from "../../svg/facebook"
import GoogleIcon 			from "../../svg/google"
import { Metrics, Colors } 	from "../../theme"
import zxcvbn 				from "zxcvbn"

export const WebComponentNavbarRegister = () => (
    <PublicNavBar>
		<Text secondary> Déjà Membre ?</Text>
		<Button tertiary text="Ouvrir une session" />
		<Button secondary text="English" />
	</PublicNavBar>   
);

export function WebComponentButtonsRegister(props) {
	const [modalOpen, setModal] = useState(false)
	const [modalOpenEmail, setModalEmail] = useState(false)
	
	return <>
	<TermsConditionsModal
		visible={modalOpen}
		onRequestClose={() => setModal(false)}
	/>
	
	<CheckBox>
	<Text>J'ai lu et j'accepte les 
		<Text 
			link 
			onClick={() => setModal(true)}
		> Termes et conditions d'utilisation </Text>
		et la
		<Text 
			link 
			onClick={() => setModal(true)}
		> Politique sur la vie privée </Text>
		de Smartsplit.
	</Text>
	</CheckBox>

	<Row style={{marginTop: Metrics.spacing.component}}>
		<CheckBox>
			<Text primary regular>Rester connecté</Text>
			{/* <Tooltip 
			popover={<Text>On a besoin d'installer des cookies 
			spécifiques dans ton navigateur afin de te permettre 
			de revenir avec cet appareil, sans avoir à te connecter.
			</Text>} 
			icon={<TooltipIcon />}
			/> */}
		</CheckBox>
		<Flex />
		<Button 
			text="Créer mon compte"
			onClick={() => setModalEmail(true)} />
		<CheckEmailModal
			visible={modalOpenEmail}
			onRequestClose={() => setModalEmail(false)}
			/>
	</Row>
</>
}

export function TermsConditionsModal(props) {
	return <DialogModal
		visible={props.visible}
		onRequestClose={props.onRequestClose}
		title="Termes et conditions"
		buttons={<>
			<Button tertiary text="Annuler" onClick={props.onRequestClose} />
			<Button text="J'accepte !" />
		</>}
	>
		<Group of="group" style={{ width: 560 }}>
		</Group>
	</DialogModal>
}

export const NativeComponentButtonsRegister = () => (
	<>
		<Button text="Créer mon compte"
		style={{marginBottom: Metrics.spacing.component}}  
		/>
		<Button tertiary text="J'ai déjà un compte" />
	</>
);

export function WebComponentVerifyEmail(props) {
	const [modalOpen, setModal] = useState(false)
	return <CheckEmailModal
	visible={modalOpen}
	onRequestClose={() => setModal(false)}
	buttons={<>
		<Button 
		text="Créer mon compte"
		onClick={() => setModal(true)} />
		</>
		}/>
}

function passwordBarColor(score) {
	switch(score) {
		case 0:  return Colors.progressBar.darkred
		case 1:  return Colors.progressBar.orangered
		case 2:  return Colors.progressBar.orange
		case 3:  return Colors.progressBar.yellowgreen
		case 4:  return Colors.progressBar.green
		default: return Colors.progressBar.darkred
	}
}

function passwordProgress(score) {
	switch(score) {
		case 4:  return 100
		case 3:  return 80
		case 2:  return 50
		case 1:  return 30
		case 0:  return 10
		default: return 10
	}
}

export default function Register(props) {
	const [password, setPassword] = useState("")
	const score = zxcvbn(password).score /* passer le mot de passe dans zxcvbn, valeur */
	
	return <>

			{Platform.select({
            	web: <WebComponentNavbarRegister />
        	})}

		<Scrollable>
			<Section of="group">
			<Column of="component" style={{maxWidth: 464, alignSelf: "center"}}>
				<Heading level="1">En route vers la professionnalisation</Heading>

				<Button
					style={{ backgroundColor: "#4267B2" }}
					icon={<FacebookIcon />}
					text="Connexion avec Facebook"
				/>

				<Button
					style={{ backgroundColor: "#4285F4" }}
					icon={<GoogleIcon />}
					text="Connnexion avec Google"
				/>
				
				<TextDivider text="ou" />
				
				<TextField
					label="Entre ton courriel"
					placeholder="nom@example.com"
				/>
				
				<PasswordField
					value={password} //pour avoir toujours valeur mot de passe, reçoit valeur password
					onChangeText={setPassword} // quand changement mot de passe modifie valeur mise à jour
					label="Choisis ton mot de passe"
					placeholder=""
				/>
				
				<ProgressBar
					size="tiny"
					color={passwordBarColor(score)}
					progress={passwordProgress(score)}
				/>

				<PasswordField
					label="Répète ton mot de passe"
					placeholder=""
				/>

			{Platform.select({
				web: <WebComponentButtonsRegister />,
				android: <NativeComponentButtonsRegister />,
				ios: <NativeComponentButtonsRegister />,
        	})} 
			</Column>
			</Section>
		</Scrollable>
		</>
}
