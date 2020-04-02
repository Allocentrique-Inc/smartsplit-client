import React                        from "react"
import { Platform}                  from 'react-native';
import Button                       from "../../widgets/button"
import Scrollable                   from "../../widgets/scrollable"
import { Section, Row, Column, Flex }       from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import PublicNavBar                 from '../../smartsplit/public/navbar'
import { CheckBox }                 from "../../forms"
import { Metrics }                  from "../../theme"

export const WebComponentNavbarLogin = () => (
    <PublicNavBar>
        <Text secondary> Pas de compte ?</Text>
        <Button tertiary text="Crée un compte" />
        <Button secondary text="English" />
    </PublicNavBar>    
);

export const WebComponentButtonsLogin = () => (
    <Row>
        <CheckBox>
            <Text primary regular>Rester connecté</Text>
        </CheckBox>
        <Flex />
            <Button text="Me connecter" />
    </Row>
  );

  export const NativeComponentButtonsLogin = () => (
    <Column>
    <Button 
        style={{marginBottom: Metrics.spacing.component}} 
        text="Me connecter" 
        />
    <Button tertiary text="Créer mon compte" />
    </Column>
  );

export default function Login() {
      
    return <>
        {Platform.select({
            web: <WebComponentNavbarLogin />
        })}
    <Scrollable>
        <Section of="group" style={{maxWidth: 465, alignSelf: "center"}}>
            <Heading level="1">Connecte-toi à ton compte SmartSplit</Heading>
            <Paragraph>Entre tes informations ci-dessous.</Paragraph>
            
            <TextField
                label="Mon courriel"
                placeholder="nom@example.com"
            />
            <PasswordField
                label="Mot de passe"
                placeholder=""
            />
            
            <Text bold small action>Mot de passe oublié ?</Text>
         
        {Platform.select({
            web: <WebComponentButtonsLogin />,
            android: <NativeComponentButtonsLogin />,
            ios: <NativeComponentButtonsLogin />,
        })}
        </Section>
    </Scrollable>
            </>
}

