import React                            from "react"
import { Platform, 
        View,
        TouchableWithoutFeedback  }     from 'react-native';
import {Link, useHistory}               from "react-router-dom";
import Button                           from "../../widgets/button"
import Scrollable                       from "../../widgets/scrollable"
import { Section, Row, Column, Flex }   from "../../layout"
import { Heading, Paragraph, Text }     from "../../text"
import { TextField, PasswordField }     from "../../forms"
import PublicNavBar                     from '../../smartsplit/public/navbar'
import { CheckBox }                     from "../../forms"
import { Metrics, Links }               from "../../theme"

export function WebComponentNavbarLogin() {
    let history = useHistory();
    const handleClick = () => (history.push('/auth/register'))

    return <PublicNavBar>
            <Text secondary> Pas de compte ?</Text>
            <View>
            <Button tertiary 
                    text="Crée un compte"
                    onClick={handleClick} 
            />
            </View>
            <Button secondary text="English" />
            </PublicNavBar>    
}

export const WebComponentButtonsLogin = () => (
    <>
    <Row>
        <Flex />
            <Button text="Me connecter" />
    </Row>
    </>

  );

  export const WebComponentHeading = () => (
    <Heading level="1">Connecte-toi à ton compte SmartSplit</Heading>
  )

  export const NativeComponentHeading = () => (
    <Heading level="3">Connecte-toi à ton compte SmartSplit</Heading>
  )

  export function NativeComponentButtonsLogin() {
    let history = useHistory();
    const handleClick = () => (history.push('/auth/register'))

    return  <Column>
                <Button 
                    style={{marginBottom: Metrics.spacing.component}} 
                    text="Me connecter" 
                    />
                <Button tertiary 
                        text="Créer mon compte" 
                        onClick={handleClick}
                />
            </Column>
  }

  export function WebComponentLinkPassword() {
    let history = useHistory();
    const handleClick = () => (history.push('/auth/forgot-password'))

    return <Text link small
            onClick={handleClick}
            style={{cursor: "pointer"}}>
            Mot de passe oublié ?</Text>
  }
  export function NativeComponentLinkPassword() {
    let history = useHistory();
    const handleClick = () => (history.push('/auth/forgot-password'))

      return <TouchableWithoutFeedback onPress={handleClick}>
                <Text link small>Mot de passe oublié ?</Text>
             </TouchableWithoutFeedback>
  }

export default function Login() {
      
    return <>
        {Platform.select({
            web: <WebComponentNavbarLogin />
        })}
    <Scrollable>
        <Section of="group" style={{width: 375, maxWidth: 560, alignSelf: "center"}}>
            
            {Platform.select({
                web: <WebComponentHeading />,
                android: <NativeComponentHeading />,
                ios: <NativeComponentHeading />
            })}    

            <Paragraph>Entre tes informations ci-dessous.</Paragraph>
            
            <TextField
                label="Mon courriel"
                placeholder="nom@example.com"
            />
            <PasswordField
                label="Mot de passe"
                placeholder=""
            />
        {Platform.select({
            web: <WebComponentLinkPassword />,
            android: <NativeComponentLinkPassword />,
            ios: <NativeComponentLinkPassword />,
        })}
        
        {Platform.select({
            web: <WebComponentButtonsLogin />,
            android: <NativeComponentButtonsLogin />,
            ios: <NativeComponentButtonsLogin />,
        })}
        </Section>
    </Scrollable>
            </>
}

