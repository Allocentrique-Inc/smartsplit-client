import React, { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Platform } from "../../platform"
import { Row, Column } from "../../layout"
import { Heading, Text } from "../../text"
import { TextField, useImagePicker, useFormField } from "../../forms"
import SearchAndTag from "../../forms/search-and-tag"
import UserAvatar from "../user/avatar"
import PenIcon from "../../svg/pen"
import Button from "../../widgets/button"
import { PictureCropModal } from "../../widgets/picture-crop"

export default function MyProfile({ title }) {
	const { t } = useTranslation()

	const avatar = useFormField("avatar")
	const avatarUrl = useFormField("avatarUrl")

	const avatarImg = useMemo(() => {
		if (avatar.value) {
			return { uri: "data:image/jpeg;base64," + avatar.value }
		} else if (avatarUrl.value) {
			return { uri: avatarUrl.value }
		} else {
			return null
		}
	}, [avatarUrl.value, avatar.value])

	const [newPicture, selectNewPicture, newPictureError] = useImagePicker()
	const firstName = useFormField("firstName")
	const lastName = useFormField("lastName")
	const initials =
		firstName.value.toUpperCase().charAt(0) +
		lastName.value.toUpperCase().charAt(0)

	const [showPictureCrop, setShowPictureCrop] = useState(false)

	function setAvatar(image) {
		avatar.value = image.split(",", 2)[1]
	}

	Platform.native &&
		useEffect(() => {
			if (newPicture) setAvatar(newPicture)
		}, [newPicture])

	return (
		<Column of="group">
			{title && <Heading level="2">{title}</Heading>}
			<Row of="component" align="left" valign="center">
				<UserAvatar size="huge" picture={avatarImg} initials={initials} />
				<Button icon={<PenIcon />} onClick={selectNewPicture} />
				<PictureCropModal
					visible={!!newPicture}
					image={newPicture}
					onRequestClose={() => selectNewPicture(null)}
					onSaveImage={(image) => {
						setAvatar(image)
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
