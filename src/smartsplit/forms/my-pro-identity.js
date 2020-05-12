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

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false,
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	function renderNativeVersion() {
	}

	function renderWebVersion() {
		return (
			<>

			</>
		)
	}

	return (
		<Column of="group">
			{Platform.web && <Heading level="2">{t("settings:identity")}</Heading>}
			<SearchAndTag
				label={t("forms:labels.participation")}
				placeholder={t("forms:placeholders.search")}
				onSearchChange={() => {
				}}
			/>
			<ProIdList label={t("forms:labels.myProIds")} description={t("forms:descriptions.myProIds")}/>
			<DateField label={t("forms:labels.myBirthday")} placeholder={t("forms:placeholders.date")}/>
			<TextField label={t("forms:labels.isniNO")} placeholder="1234 1234 1234 1234"/>
			<TextField label={t("forms:labels.myUri")}  placeholder={t("forms:placeholders.myUri")}/>
			{/*{Platform.OS === "web" && (*/}
			{/*	<>*/}
			{/*		<Row of="component">*/}
			{/*			<Flex>*/}
			{/*				<Heading level="2">{t("settings:identity")}</Heading>*/}
			{/*			</Flex>*/}
			{/*		</Row>*/}
			{/*	</>*/}
			{/*)}*/}

			{/*<Dropdown*/}
			{/*	label={t("forms:labels.dropdowns.juridiction")}*/}
			{/*	placeholder=""*/}
			{/*	noFocusToggle*/}
			{/*/>*/}

			{/*<Row of="component" wrap>*/}

			{/*</Row>*/}


			{/*<Platform web={Row} of="component" native={{ flex: 1 }}>*/}
			{/*	<TextField label={t("forms:labels.udaNO")} placeholder="" />*/}
			{/*	<TextField label={t("forms:labels.gmmqNO")} placeholder="" />*/}
			{/*</Platform>*/}

			{/*<Platform web={Row} of="component" native={{ flex: 1 }}>*/}
			{/*	<TextField label={t("forms:labels.soproqNO")} placeholder="" />*/}
			{/*	<TextField label={t("forms:labels.isniNO")} placeholder="" />*/}
			{/*</Platform>*/}

			{/*<CheckBox*/}
			{/*	label={t("general:checkbox.makePublic")}*/}
			{/*	onChange={setCheckBox}*/}
			{/*	checked={checkBox}*/}
			{/*/>*/}

			{/*<Button*/}
			{/*	secondary*/}
			{/*	text={*/}
			{/*		<Text link bold>*/}
			{/*			{t("general:buttons.addUsername")}*/}
			{/*		</Text>*/}
			{/*	}*/}
			{/*	size={buttonSize}*/}
			{/*	style={({ borderColor: Colors.stroke }, Platform.web && { flex: 1 })}*/}
			{/*/>*/}
			{/*{Platform.web && <Flex />}*/}

			{/*<Row of="component">*/}
			{/*	<TextField*/}
			{/*		label={t("forms:labels.birthday")}*/}
			{/*		placeholder=""*/}
			{/*		style={Platform.web && { flex: 0.5 }}*/}
			{/*	/>*/}
			{/*</Row>*/}

			{/*/!* <SearchAndTag*/}
			{/*		label={t("forms:labels.organisations")}*/}
			{/*		placeholder={t("forms:placeholders.organisations")}*/}
			{/*/> *!/*/}

			{/*<Row of="component">*/}
			{/*	<TextField label="URI" placeholder="" />*/}
			{/*</Row>*/}

			{/*{Platform.OS === "web" && <Hairline />}*/}
		</Column>
	)
}
