import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useStores } from "../../mobX"
import { useHistory, useRouteMatch } from "react-router"
import AuthLayout from "./layout"
import Button from "../../widgets/button"
import { Column, Row, Flex } from "../../layout"
import { Heading, Text } from "../../text"
import { PasswordField } from "../../forms"
import { Platform } from "../../platform"
import PasswordFieldWithScoreBar from "../../forms/PasswordFieldWithScoreBar"

export function ChangePasswordForm() {
	const { t } = useTranslation()
	const match = useRouteMatch()
	const history = useHistory()
	const token = match.params.token
	const { auth } = useStores()
	const model = auth.resetModel
	const buttonSize = Platform.web ? "medium" : "large"
	return (
		<Column of="group">
			<Heading level="1">{t("passwordIssues:reset")}</Heading>
			<PasswordFieldWithScoreBar
				field={model.password}
				placeholder={t("forms:placeholders.noCharacters")}
				autoCompleteType="off"
			/>
			<PasswordField
				field={model.password2}
				placeholder={t("forms:labels.repeatPassword")}
			/>
			{model.saveError && !model.busy && (
				<Text error>{t(model.saveError)}</Text>
			)}
			<Platform web={Row} native={Column}>
				{Platform.web && <Flex />}
				<Button
					text={t("general:buttons.reset")}
					disabled={!model.isValid}
					size={buttonSize}
					onClick={async () => {
						await auth.doPasswordResetAndRedirect(token, history)
					}}
					style={Platform.native && { flex: 1 }}
				/>
			</Platform>
		</Column>
	)
}

export default function ChangePasswordPage(props) {
	return (
		<AuthLayout>
			<ChangePasswordForm {...props} />
		</AuthLayout>
	)
}
