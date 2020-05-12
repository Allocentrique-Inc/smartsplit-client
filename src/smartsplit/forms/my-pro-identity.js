import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Group, Hairline, Flex, Row, Column, Spacer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import { TextField, Dropdown, CheckBox } from "../../forms"
import { SearchAndTag } from "../../forms/search-and-tag"
import Button from "../../widgets/button"
import Label from "../../forms/label"
import { ProIdList } from "../components/pro-id-list"
import { DateField } from "../../forms/date"

export default function MyProIdentity() {
	const [t] = useTranslation()
	return (
		<Column of="group">
			{Platform.web && <Heading level="2">{t("settings:identity")}</Heading>}
			<SearchAndTag
				label={t("forms:labels.participation")}
				placeholder={t("forms:placeholders.search")}
				onSearchChange={() => {}}
			/>
			<ProIdList
				label={t("forms:labels.myProIds")}
				description={t("forms:descriptions.myProIds")}
			/>
			<DateField
				label={t("forms:labels.myBirthday")}
				placeholder={t("forms:placeholders.date")}
			/>
			<TextField
				label={t("forms:labels.isniNO")}
				placeholder="1234 1234 1234 1234"
			/>
			<TextField
				label={t("forms:labels.myUri")}
				placeholder={t("forms:placeholders.myUri")}
			/>
		</Column>
	)
}
