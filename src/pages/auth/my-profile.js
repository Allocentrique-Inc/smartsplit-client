import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { View, ScrollView } from "react-native"
import { Platform } from "../../platform"
import { Group, Hairline, Flex, Row, Column, Spacer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import { TextField, Dropdown, CheckBox } from "../../forms"
import Button from "../../widgets/button"
import ChangePasswordModal from "../dashboard/ChangePasswordContainer"
import { SearchAndTag } from "../../forms/search-and-tag"
import DashboardNavbar from "../../layout/dashboard-navbar"
import UserAvatar from "../../smartsplit/user/avatar"
import PenIcon from "../../svg/pen"

export default function MyProfile() {
	const [t] = useTranslation()
	const NameFields = Platform.OS === "web" ? Row : Column
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	return (
		<ScrollView>
			<Column of="group">
				{Platform.native && <DashboardNavbar header={t("settings:profile")} />}
				{Platform.web && <Heading level="2">{t("settings:profile")}</Heading>}

				<Row>
					<UserAvatar size="huge" />
					<View style={{ margin: 50 }}>
						<PenIcon />
					</View>
				</Row>

				<NameFields of="group">
					<TextField
						label={t("forms:labels.myFirstName")}
						placeholder={t("forms:placeholders.usualFirstName")}
						undertext={
							<>
								<Text small>{t("forms:undertexts.example")}</Text>
								<Text italic small>
									Madonna Louise
								</Text>
							</>
						}
					/>
					<TextField
						label={t("forms:labels.myLastName")}
						placeholder={t("forms:placeholders.usualLastName")}
						undertext={
							<>
								<Text small>{t("forms:undertexts.example")}</Text>
								<Text italic small>
									Ciccone
								</Text>
							</>
						}
					/>
				</NameFields>

				<TextField
					//label={t("forms:labels.artistName") + t("forms:labels.optional")}
					label={t("forms:labels.myArtistName")}
					label_hint={<Text secondary>{t("forms:labels.optional")}</Text>}
					placeholder=""
					undertext={
						<>
							<Text small>{t("forms:undertexts.artistNameExample")}</Text>
							<Text italic small>
								{" "}
								Madonna
							</Text>
							<Text small> {t("forms:undertexts.artistNameExample3")}</Text>
							<Text italic small>
								{" "}
								Madonna Louise Ciccone
							</Text>
							.
						</>
					}
				/>

				{/* 	<SearchAndTag
				label={t("forms:labels.participation")}
				placeholder={t("forms:placeholders.search")}
			/> */}
			</Column>
		</ScrollView>
	)
}
