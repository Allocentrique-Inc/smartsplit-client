import React, { useState } from "react"
import Button from "../../widgets/button"
import { Divider, TextDivider, Section, Column } from "../../layout"
import { TextField, PasswordField } from "../../forms"
import { Heading, Text } from "../../text"
import PublicNavBar from '../../smartsplit/public/navbar'
import { SocialButton } from "../../widgets/button"
import ProgressBar from "../../widgets/progress-bar"
import FacebookIcon from "../../svg/facebook"
import GoogleIcon from "../../svg/google"
import { Metrics, Colors } from "../../theme"
import zxcvbn from "zxcvbn"

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
			<PublicNavBar>
				<Text secondary> Déjà Membre ?</Text>
				<Button tertiary text="Ouvrir une session" />
				<Button secondary text="English" />
			</PublicNavBar>

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
				
				<Button text="Créer mon compte" />
				<Button secondary text="J'ai déjà un compte" />
			</Column>
		</Section>
		</>
}
