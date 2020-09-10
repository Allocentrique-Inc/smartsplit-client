import React, { useState } from "react"
import { getDocumentAsync } from "expo-document-picker"
import { useTranslation } from "react-i18next"

import { Row } from "../layout"
import Button from "../widgets/button"
import { Text } from "../text"

import Label from "./label"
import Frame from "./frame"

export default function FileField({ children, ...nextProps }) {
	return (
		<Label {...nextProps}>
			<FramedFileField {...nextProps}>{children}</FramedFileField>
		</Label>
	)
}

export function FramedFileField({ error, children, ...nextProps }) {
	return (
		<Frame error={error}>
			<BasicFileField {...nextProps}>{children}</BasicFileField>
		</Frame>
	)
}

export function BasicFileField({ file, onFileChange }) {
	const [selectedFile, setSelectedFile] = onFileChange
		? [file, onFileChange]
		: useState(null)

	async function selectFile() {
		const file = await getDocumentAsync({ copyToCacheDirectory: false })

		if (file.type === "success") {
			setSelectedFile(file)
		}
	}

	const [t] = useTranslation()

	return (
		<Row of="inside" valign="center">
			<Button small text={t("general:addFile")} onClick={selectFile} />

			{selectedFile ? (
				<Text small secondary>
					{selectedFile.name}
				</Text>
			) : (
				<Text small tertiary>
					{t("general:dropFile")}
				</Text>
			)}
		</Row>
	)
}
