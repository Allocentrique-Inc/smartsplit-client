import React from "react"
import { useTranslation } from "react-i18next"
import Label from "../../forms/label"
import { Paragraph } from "../../text"
import { Row } from "../../layout"
import Button from "../../widgets/button"
import AddIcon from "../../../assets/svg/green-plus-circle.svg"
import { Metrics } from "../../theme"

export function ProIdList(props) {
	const { t } = useTranslation()
	const { proIds, description } = props

	return (
		<Label {...props}>
			{description && <Paragraph>{description}</Paragraph>}
			<Row>
				<Button
					secondaryWithIcon
					bold
					icon={<AddIcon />}
					text={t("general:buttons.addProId")}
				/>
			</Row>
		</Label>
	)
}
