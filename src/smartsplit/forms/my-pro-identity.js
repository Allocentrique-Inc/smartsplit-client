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
		<Column of="group" flex={1}>
			{Platform.web && <Heading level="2">{t("settings:identity")}</Heading>}
			<Row flex={1}>
				<SearchAndTag
					label={t("forms:labels.organisations")}
					placeholder={t("forms:placeholders.organisations")}
					onSearchChange={() => {}}
				/>
			</Row>
			<Row>
				<ProIdList />
			</Row>
			<TextField field={model.birthDate} placeholder={"YYYY-MM-DD"} />
			<TextField field={model.isni} placeholder="1234 1234 1234 1234" />
			<TextField
				field={model.URI}
				placeholder={t("forms:placeholders.myUri")}
			/>
		</Column>
	)
}
