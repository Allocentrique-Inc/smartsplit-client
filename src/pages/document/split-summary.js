import React from "react"
import { useTranslation } from "react-i18next"

export default function SplitSummary({ workpiece }) {
	const [t] = useTranslation()
	return (
		<Section>
			<h2>Valider le split de {workpiece}</h2>
		</Section>
	)
}
