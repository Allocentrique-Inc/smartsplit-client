import React, { useState } from "react"
import {
	TextField,
	PasswordField,
	CheckBox,
	RadioButton,
	RadioGroup,
	RadioGroupButton,
} from "../../forms"
import { Section, Group, Column, Row } from "../../layout"
import { Heading, Paragraph }          from "../../text"

export default function FormsTest() {
	const [ testCheckBox1, setTestCheckBox1 ] = useState(false)

	return <Section of="group">
		<Column of="component">
			<Heading level="1">Test des formulaires</Heading>

			<Paragraph>Cette page a pour but de démontrer les différentes composantes de formulaire et mise en page utilisées dans les formulaires à travers le site</Paragraph>

			<Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit et tortor consequat dignissim vehicula id tortor. Praesent tincidunt elementum tellus, quis tristique felis mollis at. Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non. Mauris convallis ultricies placerat.</Paragraph>
		</Column>

		<Column of="component">
			<Row of="component">
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
		</Column>

		<Column of="component">
			<CheckBox
				label="Cochez moi, cochez moi!"
				onChange={setTestCheckBox1}
				checked={testCheckBox1}
			/>
			 
			<CheckBox
				label="Cochez moi aussi!"
				disabled={!testCheckBox1}
			/>
			
			<RadioButton
				label="Sélectionnez moi!"
			/>
			
			<RadioButton
				label="Sélectionnez moi à la place!"
				disabled={!testCheckBox1}
			/>
			
			<RadioGroup label="Choisis une des options suivantes:">
				<RadioGroupButton value="A" label="Option A" />
				<RadioGroupButton value="B" label="Option B" onChange={(c, v) => console.log("RADIOBTN", c, v)} />
				<RadioGroupButton value="C" label="Option C" />
			</RadioGroup>
		</Column>

		<Row of="component">
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
	</Section>
}
