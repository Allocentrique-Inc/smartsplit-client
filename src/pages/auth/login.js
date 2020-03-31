import React from "react"
import Button from "../../widgets/button"
import { Divider, TextDivider, Section, Column, Row } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import { Colors } from "../../theme"
import PublicNavBar from '../../smartsplit/public/navbar'

export default function Login() {
    return <>
            <PublicNavBar>
                <Text secondary> Pas de compte ?</Text>
                <Button tertiary text="Crée un compte" />
                <Button secondary text="English" />
            </PublicNavBar>
    
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
            
            <Text bold style={{ color: Colors.action }}>Mot de passe oublié ?</Text>
            
            <Button text="Me connecter" />
            <Button secondary text="Créer mon compte" />
        </Section>
    </>
}
