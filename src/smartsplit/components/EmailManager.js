import React, { useState } from "react"
import { Column, Flex, Row, Spacer } from "../../layout"
import MoreHorizontal from "../../../assets/svg/more-horizontal.svg"
import CheckMark from "../../svg/check-mark"
import { Status } from "../../utils/enums"
import { Link, Paragraph, Text } from "../../text"
import Label from "../../forms/label"
import Button from "../../widgets/button"
import { useTranslation } from "react-i18next"
import { Colors } from "../../theme"
import NewEmailModal from "../../pages/dashboard/new-email"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"
import EmailState from "../../mobX/states/settingsStates/EmailState"

export const EmailManager = observer(() => {
	const { t } = useTranslation()
	const emails: EmailState = useStorePath("settings", "emails")
	function isMailChecked(email) {
		return email.status === Status.active || email.status === Status.main
	}

	return (
		<Label label={t("forms:labels.myEmails")}>
			<Paragraph>{t("forms:descriptions.myEmails")}</Paragraph>
			{!!emails && (
				<Column of="none">
					{emails.list.map((email) => (
						<Row
							padding="small"
							of="component"
							valign="center"
							key={email.email}
						>
							{isMailChecked(email) ? (
								<CheckMark color={Colors.action} />
							) : (
								<MoreHorizontal />
							)}
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
			)}
			<Row>
				<Button
					secondary
					bold
					text={t("general:buttons.addEmail")}
					onClick={() => emails.new()}
				/>
				<NewEmailModal />
			</Row>
		</Label>
	)
})
