import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { View, ScrollView } from "react-native"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import { SearchAndTag } from "../../../forms/search-and-tag"
import DashboardNavbarWeb from "../../../layout/dashboard-navbar-web"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"
import UserAvatar from "../../../smartsplit/user/avatar"
import PenIcon from "../../../svg/pen"

export default function MyProfile() {
	const [t] = useTranslation()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	return (
		<ScrollView>
			{Platform.native && (
				<DashboardNavbarNative header={t("settings:profile")} />
			)}
			<Platform web={Group} of="group" native={Column} of="component">
				{Platform.web && <Heading level="2">{t("settings:profile")}</Heading>}
				<Column of="section">
					<Row>
						<UserAvatar size="huge" />
						<View style={{ margin: 50 }}>
							<PenIcon />
						</View>
					</Row>

					<Row of="component">
						<TextField
							label={t("forms:labels.usualFirstName")}
							placeholder=""
						/>
						<TextField label={t("forms:labels.usualLastName")} placeholder="" />
					</Row>
				</Column>
				<TextField
					//label={t("forms:labels.artistName") + t("forms:labels.optional")}
					label={t("forms:labels.artistName")}
					label_hint={<Text secondary>{t("forms:labels.optional")}</Text>}
					placeholder=""
					undertext={
						<>
							<Text small>{t("forms:undertexts.artistNameExample")}</Text>
							<Text italic small>
								{" "}
								Jay-Z
							</Text>
							<Text small> {t("forms:undertexts.artistNameExample3")}</Text>
							<Text italic small>
								{" "}
								Shawn Corey Carter
							</Text>
							.
						</>
					}
				/>
				<Column of="section">
					{/* 	<SearchAndTag
				label={t("forms:labels.participation")}
				placeholder={t("forms:placeholders.search")}
			/> */}
					{Platform.OS === "web" && <Hairline />}
				</Column>
			</Platform>
		</ScrollView>
	)
}
