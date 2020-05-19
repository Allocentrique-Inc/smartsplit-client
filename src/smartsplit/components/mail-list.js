import React from "react"
import { View } from "react-native"
import { Column, Flex, Row, Spacer } from "../../layout"
import MoreHorizontal from "../../../assets/svg/more-horizontal.svg"
import CheckMark from "../../svg/check-mark"
import { Status } from "../../utils/enums"
import { Link, Paragraph, Text } from "../../text"
import Label from "../../forms/label"
import Button from "../../widgets/button"
import { useTranslation } from "react-i18next"
import { Colors } from "../../theme"

export function MailList(props) {
	const { t } = useTranslation()
	const { emails, description } = props

	function isMailChecked(email) {
		return email.status === Status.active || email.status === Status.main
	}

	function renderList() {
		return (
			<Column of="none">
				{emails.map((email, index) => (
					<Row padding="small" of="component" valign="center" key={index}>
						{isMailChecked(email) && <CheckMark color={Colors.action} />}
						{email.status === Status.pending && <MoreHorizontal />}
						<Column of="none">
							<Text>{email.email}</Text>

							{email.status === Status.active && (
								<Link small action onClick={() => {}}>
									{t("forms:undertexts.setAsMain")}
								</Link>
							)}

							{email.status === Status.pending && (
								<Link small action onClick={() => {}}>
									{t("forms:undertexts.resendConfirmEmail")}
								</Link>
							)}

							{email.status === Status.main && (
								<Text small>{t("forms:undertexts.mainEmail")}</Text>
							)}
						</Column>
					</Row>
				))}
			</Column>
		)
	}

	return (
		<Label {...props}>
			{description && <Paragraph>{description}</Paragraph>}
			{!!emails && renderList()}
			<Row>
				<Button secondary bold text={t("general:buttons.addEmail")} />
			</Row>
		</Label>
	)
}
