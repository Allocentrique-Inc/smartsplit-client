import React from "react"
import { Row, Column, Group } from "../../layout"
import Button from "../../widgets/button"

export default function LilaTest() {
	return (
		<Group>
			<Row of="component">
				<Button text="Test Modale 1" />
				<Button text="Test Modale 2" />
				<Button text="Test Modale 3" />
			</Row>
		</Group>
	)
}
