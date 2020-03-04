import React from "react"
import { TextField, PasswordField } from "../../views/form"
import { Section, Group, Row } from "../../views/layout"
import { Heading, Paragraph } from "../../views/text"

export default function FormsTest() {
	return <Section>
		<Group>
			<Heading level="1">Test des formulaires</Heading>
			
			<Paragraph>Cette page a pour but de démontrer les différentes composantes de formulaire et mise en page utilisées dans les formulaires à travers le site</Paragraph>
			
			<Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit et tortor consequat dignissim vehicula id tortor. Praesent tincidunt elementum tellus, quis tristique felis mollis at. Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non. Mauris convallis ultricies placerat.</Paragraph>
		</Group>
		
		<Group>
			<Row>
				<TextField
					label="Prénom"
					label_hint="Optionnel"
					defaultValue="Testing"
					placeholder="prénom"
				/>
				
				<TextField
					label="Nom"
					defaultValue="Test"
					placeholder="nom"
				/>
			</Row>

			<PasswordField
				label="Mot de passe"
				undertext="Lettres et caractères spéciaux"
				placeholder="correct horse battery staple"
			/>
	
			<TextField
				label="Adresse courriel"
				label_hint="Requis"
				undertext="Entrez votre adresse courriel ici."
				defaultValue="test@smartsplit.org"
				placeholder="courriel"
			/>
		</Group>
		
		<Group>
			<Row>
				<TextField
					label="Test avec un très long titre qui clairement n'entre pas"
					label_hint="Optionnel"
					undertext="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit et tortor consequat dignissim vehicula id tortor. Praesent tincidunt elementum tellus, quis tristique felis mollis at. Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non. Mauris convallis ultricies placerat."
					defaultValue="Testing"
					placeholder="prénom"
				/>
				
				<TextField
					label="Test avec un très long titre"
					undertext="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit et tortor consequat dignissim vehicula id tortor. Praesent tincidunt elementum tellus, quis tristique felis mollis at. Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non. Mauris convallis ultricies placerat."
					defaultValue="Test"
					placeholder="nom"
				/>
				
				<TextField
					label="Test avec un très long titre"
					undertext="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit et tortor consequat dignissim vehicula id tortor. Praesent tincidunt elementum tellus, quis tristique felis mollis at. Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non. Mauris convallis ultricies placerat."
					defaultValue="Test"
					placeholder="nom"
				/>
			</Row>
		</Group>
	</Section>
}
