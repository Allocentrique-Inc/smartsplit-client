import React from "react"
import { useTranslation } from "react-i18next"
import { Hairline, Flex, Row, Column, Spacer } from "../../layout"
import { Text, Heading } from "../../text"
import UserAvatar from "../../smartsplit/user/avatar"
import EyeIcon from "../../svg/eye"
import Help from "../../svg/help-circle-full"
import Scrollable from "../../widgets/scrollable"

export function SummaryLayout(props) {
	const { buttons, children, vote } = props
	return (
		<>
			<Scrollable flex={1}>
				<Column flex={1} of="group" margin="section">
					<Column style={{ maxWidth: 880, alignSelf: "center" }}>
						{children}
					</Column>
				</Column>
			</Scrollable>
			<Hairline />
			<Column>
				<Row padding="component" align="center">
					<Row style={{ maxWidth: 880, flex: 1 }}>
						{vote}
						<Flex />
						{buttons}
					</Row>
				</Row>
			</Column>
		</>
	)
}

export function SplitRightHolderRow(props) {
	const [t] = useTranslation()
	const { header, rightHolder, roles, splitPercent, showVoting } = props
	const voteStatusTranslation = {
		pending: t("summary:voteStatus.pending"),
		approved: t("summary:voteStatus.approved"),
		onGoing: t("summary:voteStatus.onGoing"),
	}

	return (
		<Column of="inside">
			<Heading level="5">{header}</Heading>
			<Hairline />

			<Row of="component" flex={1}>
				<Column>
					<UserAvatar size="small" user={rightHolder} />
					<Flex />
				</Column>
				<Column of="component" flex={1}>
					<Row of="component">
						{showVoting === true ? (
							<Text normal>{rightHolder.artistName}</Text>
						) : (
							<Text secondary normal>
								{rightHolder.artistName}
							</Text>
						)}
						<Flex />
						{showVoting === true ? (
							<Text bold>{splitPercent}%</Text>
						) : (
							<Text bold secondary>
								{splitPercent}%
							</Text>
						)}
						{/* <Text bold={showVoting}>{splitPercent}</Text> */}
					</Row>
					<Row of="component" flex={1}>
						<Text secondary normal>
							{roles.join(", ")}
						</Text>
						<Flex />

						{props.voteStatus === "approved" ? (
							<Text bold action>
								{voteStatusTranslation[props.voteStatus]}
							</Text>
						) : (
							<Text secondary normal>
								{voteStatusTranslation[props.voteStatus]}
							</Text>
						)}
					</Row>
					<Row of="component">{props.buttons}</Row>
				</Column>
			</Row>
		</Column>
	)
}

export function ConfidentialityRow(props) {
	const [t] = useTranslation()
	const { text } = props

	return (
		<Column of="inside">
			<Heading level="5">{props.header}</Heading>
			<Hairline />

			<Row of="component">
				<Column>
					<EyeIcon />
					<Flex />
				</Column>
				<Column of="component" flex={1}>
					<Row valign="center">
						<Text normal>{text}</Text>
						<Help size="xsmall" />
					</Row>
					<Row of="component">{props.buttons}</Row>
				</Column>
			</Row>
		</Column>
	)
}
