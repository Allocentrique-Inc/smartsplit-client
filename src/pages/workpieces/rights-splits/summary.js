import React from "react"
import { useTranslation } from "react-i18next"
import {
	SummaryLayout,
	SplitRightHolderRow,
	ConfidentialityRow,
} from "../summary-layout"
import { Row, Column, Spacer } from "../../../layout"
import { Text, Heading } from "../../../text"
import Button from "../../../widgets/button"
import { DualSplitChart } from "../../../smartsplit/components/split-chart"
import { Colors } from "../../../theme"

const SummaryContainer = {
	borderColor: Colors.stroke,
	border: "1px solid",
	borderRadius: "4px",
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
							text={t("general:buttons.toRefuse")}
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
								text={t("general:buttons.toRefuse")}
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
			<ConfidentialityRow
				header={t("summary:sections.confidentiality")}
				text={t("summary:public")}
				buttons={
					<>
						<Button
							style={{ flex: 1 }}
							danger
							text={t("general:buttons.toRefuse")}
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
		</Column>
	)
}
