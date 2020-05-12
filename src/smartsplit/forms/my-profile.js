import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Platform } from "../../platform"
import { Row, Column } from "../../layout"
import { Heading, Text } from "../../text"
import { TextField } from "../../forms"
import { SearchAndTag } from "../../forms/search-and-tag"
import UserAvatar from "../user/avatar"
import PenIcon from "../../svg/pen"

export default function MyProfile() {
	const { t } = useTranslation()

	return (
		<Column of="group">
			{Platform.web && <Heading level="2">{t("settings:profile")}</Heading>}

			<Row align="left">
				<UserAvatar size="huge" />
				<View style={{ alignSelf: "center", marginLeft: 19 }}>
					<PenIcon />
				</View>
			</Row>

			<Row of="component">
				<TextField
					name="firstName"
					label={t("forms:labels.usualFirstName")}
					undertext={t("forms:undertexts.firstName")}
				/>

				<TextField
					name="lastName"
					label={t("forms:labels.usualLastName")}
					undertext={t("forms:undertexts.lastName")}
				/>
			</Row>

			<TextField
				name="artistName"
				label={t("forms:labels.artistName")}
				label_hint={t("forms:labels.optional")}
				undertext={t("forms:undertexts.artistName")}
			/>

			<SearchAndTag
				label={t("forms:labels.participation")}
				placeholder={t("forms:placeholders.search")}
				onSearchChange={() => {}}
			/>
		</Column>
	)
}
