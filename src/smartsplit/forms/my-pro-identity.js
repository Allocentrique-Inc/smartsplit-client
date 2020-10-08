import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Group, Hairline, Flex, Row, Column, Spacer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import { TextField, Dropdown, CheckBox, DateField } from "../../forms"
import SearchAndTag from "../../forms/search-and-tag"
import { ProIdList } from "../components/pro-id-list"
import { useStorePath } from "../../mobX"

export default function MyProIdentity() {
	const [t] = useTranslation()
	const model = useStorePath("settings", "profile")
	return (
		<Column of="group">
			{Platform.web && <Heading level="2">{t("settings:identity")}</Heading>}
			<Row>
				<SearchAndTag
					label={t("forms:labels.participation")}
					placeholder={t("forms:placeholders.search")}
					onSearchChange={() => {}}
				/>
			</Row>
			<Row>
				<ProIdList
					label={t("forms:labels.myProIds")}
					description={t("forms:descriptions.myProIds")}
				/>
			</Row>
			<DateField
				field={model.birthDate}
				placeholder={t("forms:placeholders.date")}
			/>
			<TextField field={model.ISNI} placeholder="1234 1234 1234 1234" />
			<TextField
				field={model.URI}
				placeholder={t("forms:placeholders.myUri")}
			/>
		</Column>
	)
}
