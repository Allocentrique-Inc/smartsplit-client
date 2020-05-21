import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Platform } from "../../platform"
import { Row, Column } from "../../layout"
import { Heading, Text } from "../../text"
import { TextField, useImagePicker, useFormField } from "../../forms"
import { SearchAndTag } from "../../forms/search-and-tag"
import UserAvatar from "../user/avatar"
import PenIcon from "../../svg/pen"
import Button from "../../widgets/button"
import { PictureCropModal } from "../../widgets/picture-crop"

export default function MyProfile() {
	const { t } = useTranslation()

	const avatarUrl = useFormField("avatarUrl")
	const [newPicture, selectNewPicture, newPictureError] = useImagePicker()
	const firstName = useFormField("firstName")
	const lastName = useFormField("lastName")
	const initials =
		firstName.value.toUpperCase().charAt(0) +
		lastName.value.toUpperCase().charAt(0)

	const [showPictureCrop, setShowPictureCrop] = useState(false)

	Platform.native &&
		useEffect(() => {
			if (newPicture) avatarUrl.value = newPicture
		}, [newPicture])

	return (
		<Column of="group">
			{Platform.web && <Heading level="2">{t("settings:profile")}</Heading>}

			<Row of="component" align="left" valign="center">
				<UserAvatar size="huge" picture={avatarUrl.value} initials={initials} />
				<Button icon={<PenIcon />} onClick={selectNewPicture} />
				<PictureCropModal
					visible={!!newPicture}
					image={newPicture}
					onRequestClose={() => selectNewPicture(null)}
					onSaveImage={(image) => {
						avatarUrl.value = image
						selectNewPicture(null)
					}}
				/>
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
