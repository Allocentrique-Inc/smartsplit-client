import React, {useState}                from "react"
import { Platform, 
        TouchableWithoutFeedback }      from 'react-native'
import { Link, useHistory }             from "react-router-dom";
import { Section, Column, Row, Flex } 	from "../../layout"
import { Heading, Text } 	            from "../../text"
import TextField                        from '../../forms/text'
import Button                           from "../../widgets/button"
import { Metrics, Links }               from "../../theme"
import PublicNavBar 		            from '../../smartsplit/public/navbar'
import Scrollable                       from "../../widgets/scrollable"


export function WebComponentNavbar() {
    let history = useHistory();
    const handleClick = () => (history.push('/auth/login'))

    return <>
        <PublicNavBar>
            <Text secondary>Déjà Membre ?</Text>
            <Button tertiary 
            text="Ouvrir une session" 
            onClick={handleClick}
            />
        </PublicNavBar>
            </> 
}

export function NativeComponentNavbar() {
    let history = useHistory();
    const handleClick = () => (history.push('/auth/login'))

    return <Row>
           <Flex /><Flex />
           <Button tertiary
                style={{flex: 1.5}}
                onClick={() => handleClick()}
                text="Ouvrir une session" />
            </Row>
}

export const WebComponentGetPassword = () => (
    <>
    <Heading level="1">Réinitialise ton mot de passe.</Heading>
    </>
)

export const NativeComponentGetPassword = () => (
    <Heading level="3">Réinitialise ton mot de passe</Heading>
)

export function WebComponentGetPasswordButtons({onClick, disabled}) {
    return <Row>
                <Link style={{textDecoration: "none"}} to="./register">
                <Text link small>Je n'ai pas de compte</Text>
                </Link> 
                <Flex />
                <Button text="Envoyer" onClick={onClick} disabled={disabled} />
            </Row>
}

export function NativeComponentGetPasswordButtons({onClick, disabled}) {
    let history = useHistory();
    const handleClick = () => (history.push('/auth/register'))

     return <>
            <TouchableWithoutFeedback onPress={handleClick}>
                <Text link small
                      style={{marginBottom: Metrics.spacing.component}} >
                      Je n'ai pas de compte</Text>
            </TouchableWithoutFeedback>
        
            <Button text="Envoyer" onClick={onClick} disabled={disabled} />
            </>
 }

export default function GetPassword({users, forgotPassword}) {
	const [email, setEmail] = useState("")
	const history = useHistory()
	
	const handleRequestPassword = () => {
		forgotPassword({email})
		history.push("/auth/forgot-password-sent")
	}

    return <> 

        <Scrollable>
        {Platform.select({
            web: <WebComponentNavbar />,
        })}
        <Section of="group" style={{width: 375, maxWidth: 560, alignSelf: "center"}}>

        {Platform.select({
            android: <NativeComponentNavbar />,
            ios: <NativeComponentNavbar />,
        })}

        {Platform.select({
            web: < NativeComponentGetPassword/>,
            android: <NativeComponentGetPassword />,
            ios: <NativeComponentGetPassword />,
        })}

            <Text>Saisis l'adresse courriel lié à ton compte pour obtenir
                le lien de réinitialisation.
            </Text>

            <TextField
                label="Courriel"
                label_hint=""
                undertext=""
                onChangeText={setEmail}
                value={email}
                placeholder=""
		    /> 

            {Platform.select({
            	web: <WebComponentGetPasswordButtons onClick={handleRequestPassword} disabled={users.forgotPassword.isLoading} />,
                ios: <NativeComponentGetPasswordButtons onClick={handleRequestPassword} disabled={users.forgotPassword.isLoading} />,
                android: <NativeComponentGetPasswordButtons onClick={handleRequestPassword} disabled={users.forgotPassword.isLoading} />
        	})}

            </Section>
            </Scrollable>
            </>
}
