import React from "react"
import { Group }   from "../../views/layout"
import { Heading } from "../../views/text"
import { TabBar, Tab }  from "../../components/tabs"

// TMP
import { TextField, PasswordField } from "../../views/form"
import { Section, Row } from "../../views/layout"
import { Paragraph } from "../../views/text"

export default function MyWorksPage() {
	return <>
		<Group>
			<Heading level="2">Mes pièces musicales </Heading>
		</Group>
		<Group>
			<TabBar>
				<Tab key="tab1" title="Mes ajouts" default>
					<Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit et tortor consequat dignissim vehicula id tortor. Praesent tincidunt elementum tellus, quis tristique felis mollis at. Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non. Mauris convallis ultricies placerat.</Paragraph>
				</Tab>
				<Tab key="tab2" title="Partagées avec moi">
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
				</Tab>
				<Tab key="tab3" title="Onglet 3">
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
				</Tab>
			</TabBar>
		</Group>
	</>
}
