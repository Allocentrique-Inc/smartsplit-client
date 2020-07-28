import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { SummaryLayout } from "../layout"
import { Hairline, Flex, Row, Column, Spacer } from "../../../layout"
import { Text, Heading } from "../../../text"
import Button from "../../../widgets/button"
import { DualSplitChart } from "../../../smartsplit/components/split-chart"
import UserAvatar from "../../../smartsplit/user/avatar"
import EyeIcon from "../../../svg/eye"
import Help from "../../../svg/help-circle-full"
import { Colors } from "../../../theme"

const SummaryContainer = {
	borderColor: Colors.stroke,
	border: "1px solid",
	borderRadius: "4px",
	width: "auto",
	display: "block",
	width: "944px",
}

export default function SplitSummary({ workpiece }) {
	const [t] = useTranslation()
	return (
		<SummaryLayout
			vote={
				<Text secondary normal>
					3/3 {t("summary:requiredVote")}
				</Text>
			}
			buttons={
				<>
					<Button primary text={t("general:buttons.send")} />
				</>
			}
		>
			<Column of="tiny">
				<Heading level="2">
					{t("summary:validate")} {workpiece}
				</Heading>
				<Text secondary normal>
					{t("summary:create")} · {t("summary:update")}
				</Text>
				<Spacer of="section" />

				<Heading level="5">Version 1</Heading>
				<Text secondary normal>
					{t("summary:pieceCreate")}
				</Text>
				<Spacer of="group" />

				<Column style={SummaryContainer}>
					<Row flex={1}>
						<Column>
							<CopyrightSection />
							<PerformanceSection />
							<RecordingSection />
							<ConfidentialitySection />
						</Column>
						<Column>{/* <DualSplitChart /> */}</Column>
					</Row>
				</Column>
			</Column>
		</SummaryLayout>
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
		<>
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
		</>
	)
}

export function CopyrightSection() {
	const [t] = useTranslation()

	return (
		<Column padding="group">
			<SplitRightHolderRow
				header={t("summary:sections.copyright")}
				rightHolder={{
					avatarUrl: "#",
					artistName: "Quest Love",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				showVoting={true}
				voteStatus="pending"
				splitPercent={88.8}
				buttons={
					<>
						<Button
							style={{ flex: 1 }}
							danger
							text={t("general:buttons.toDecline")}
							onVoteReject={() => alert("reject")}
						/>

						<Button
							style={{ flex: 1 }}
							primary
							bold
							text={t("general:buttons.toAccept")}
							onVoteAccept={() => alert("accept")}
						/>
					</>
				}
			/>

			<SplitRightHolderRow
				rightHolder={{
					avatarUrl: "#",
					artistName: "Inscience",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				voteStatus="approved"
				splitPercent={88.8}
			/>

			<SplitRightHolderRow
				rightHolder={{
					avatarUrl: "#",
					artistName: "Erykah Badu",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				voteStatus="onGoing"
				splitPercent={88.8}
			/>

			<SplitRightHolderRow
				rightHolder={{
					avatarUrl: "#",
					artistName: "J-Zone",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				voteStatus="onGoing"
				splitPercent={88.8}
			/>

			<SplitRightHolderRow
				rightHolder={{
					avatarUrl: "#",
					artistName: "Ringo Starr",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				voteStatus="onGoing"
				splitPercent={88.8}
			/>
		</Column>
	)
}

export function PerformanceSection() {
	const [t] = useTranslation()
	return (
		<Column padding="group">
			<SplitRightHolderRow
				header={t("summary:sections.performance")}
				rightHolder={{
					avatarUrl: "#",
					artistName: "Inscience",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				voteStatus="approved"
				splitPercent={88.8}
			/>

			<SplitRightHolderRow
				rightHolder={{
					avatarUrl: "#",
					artistName: "Erykah Badu",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				voteStatus="onGoing"
				splitPercent={88.8}
			/>

			<SplitRightHolderRow
				rightHolder={{
					avatarUrl: "#",
					artistName: "J-Zone",
				}}
				roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
				vote="accepted"
				voteStatus="onGoing"
				splitPercent={88.8}
			/>
		</Column>
	)
}

export function RecordingSection() {
	const [t] = useTranslation()
	return (
		<>
			<Column padding="group">
				<SplitRightHolderRow
					header={t("summary:sections.recording")}
					rightHolder={{
						avatarUrl: "#",
						artistName: "Quest Love",
					}}
					roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
					vote="accepted"
					showVoting={true}
					voteStatus="pending"
					splitPercent={88.8}
					buttons={
						<>
							<Button
								style={{ flex: 1 }}
								danger
								text={t("general:buttons.toDecline")}
								onVoteReject={() => alert("reject")}
							/>

							<Button
								style={{ flex: 1 }}
								primary
								bold
								text={t("general:buttons.toAccept")}
								onVoteAccept={() => alert("accept")}
							/>
						</>
					}
				/>

				<SplitRightHolderRow
					rightHolder={{
						avatarUrl: "#",
						artistName: "Inscience",
					}}
					roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
					vote="accepted"
					voteStatus="approved"
					splitPercent={88.8}
				/>

				<SplitRightHolderRow
					rightHolder={{
						avatarUrl: "#",
						artistName: "Sunday Sauuce Records",
					}}
					roles={[t("roles:author"), t("roles:composer"), t("roles:mixer")]}
					vote="accepted"
					voteStatus="onGoing"
					splitPercent={88.8}
				/>
			</Column>
		</>
	)
}

export function ConfidentialitySection() {
	const [t] = useTranslation()
	return (
		<Column of="component" padding="group">
			<Heading level="5">{t("summary:sections.confidentiality")}</Heading>
			<Hairline />
			<Row of="component">
				<Column>
					<EyeIcon />
				</Column>
				<Column of="component" flex={1}>
					<Row valign="center">
						<Text normal>{t("summary:public")}</Text>
						<Help size="xsmall" />
					</Row>
					<Row of="component">
						<Button
							style={{ flex: 1 }}
							danger
							text={t("general:buttons.toDecline")}
						/>
						<Button
							style={{ flex: 1 }}
							primary
							bold
							text={t("general:buttons.toAccept")}
						/>
					</Row>
				</Column>
			</Row>
		</Column>
	)
}
