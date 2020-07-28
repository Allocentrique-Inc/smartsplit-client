import React from "react"
import { useTranslation } from "react-i18next"
import { SheetNavbar } from "./workpiece-sheet-layout"

export default function WorkpieceSheet() {
	const [t] = useTranslation()
	return (
		<>
			<SheetNavbar />
		</>
	)
}
