import React, {useState, useEffect} from "react"
import Button from "../../widgets/button"
import { Divider, TextDivider, Section, Column, Row } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import { Colors } from "../../theme"
import {  Redirect } from "react-router"

import { useHistory } from "react-router"

export default function Login({auth, login}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const history = useHistory()

    useEffect(() => {
        if (auth.isLoggedIn) {
            setEmail('');
            setPassword('');
            setHasSubmitted(false);
        }
    }, [auth.isLoggedIn]);


    return <Section of="group" style={{maxWidth: 465, alignSelf: "center"}}>
        <Heading level="1">Connecte-toi à ton compte SmartSplit</Heading>
        <Paragraph>Entre tes informations ci-dessous.</Paragraph>

        {!auth.isLoading && hasSubmitted && auth.error && (
            <Text style={{color: Colors.progressBar.orangered}}>{auth.error.response.data.message}</Text>
        )}

        {!auth.isLoading && auth.data && auth.data.accessToken && (
            <Redirect to="/dashboard/" />
        )}
        
        <TextField
            label="Mon courriel"
            placeholder="nom@example.com"
            onChangeText={(val)=>setEmail(val) }
            value={email}
        />
        <PasswordField
            label="Mot de passe"
            placeholder=""
            onChangeText={(val)=>setPassword(val) }
            value={password}
        />
        
        <Text bold style={{ color: Colors.action }}>Mot de passe oublié ?</Text>
        
        <Button text="Me connecter" onClick={ ()=>{ login( {email,password} ); setHasSubmitted(true); } } disabled={auth.isLoading} />
        <Button secondary text="Créer mon compte" onClick={ ()=>{history.push('/auth/register')} } disabled={auth.isLoading} />
    </Section>
}
