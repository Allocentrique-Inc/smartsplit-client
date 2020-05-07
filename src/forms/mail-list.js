import React from "react"
import {View} from "react-native"
import { Column, Flex, Row, Spacer } from "../layout"
import CheckMark from "../../assets/svg/green-check-mark.svg"
import MoreHorizontal from "../../assets/svg/more-horizontal.svg"
import { Status } from "../utils/enums"
import { Paragraph, Text } from "../text"
import { TouchableWithoutFeedback } from "react-native-web"
import Label from "./label"
import Button from "../widgets/button"
import { useTranslation } from "react-i18next"
export function MailList(props) {
	const {t} = useTranslation()
	const { emails, description } = props
	function isMailChecked(email) {
		return email.status === Status.active || email.status === Status.main
	}

	function renderList() {
		return <Column of="none">
			{emails.map((email, index) =>
				<Row padding="small" of="component" valign="center" key={index}>
					{isMailChecked(email) && <CheckMark/>}
					{email.status === Status.pending && <MoreHorizontal/>}
					<View>
						<Text>{email.email}</Text>

						{email.status === Status.active &&
						<TouchableWithoutFeedback onPress={() => {}}>
							<Text small action>{t("forms:undertexts.setAsMain")}</Text>
						</TouchableWithoutFeedback>}

						{email.status === Status.pending &&
						<TouchableWithoutFeedback onPress={() => {}}>
							<Text small action>{t("forms:undertexts.resendConfirmEmail")}</Text>
						</TouchableWithoutFeedback>}

						{email.status === Status.main &&
						<Text small>{t("forms:undertexts.mainEmail")}</Text>
						}
					</View>
				</Row>
			)}
		</Column>
	}

	return (
		<Label {...props}>
				{description && <Paragraph>{description}</Paragraph>}
				{renderList()}
				<Button secondary bold text={t("general:buttons.addEmail")}/>
		</Label>
	)
}