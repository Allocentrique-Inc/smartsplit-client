import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { mapFragment } from "../../../utils/react"
import { Column, Row, Flex, Hairline } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Layout from "../layout"
import Button from "../../../widgets/button"
import ProgressBar from "../../../widgets/progress-bar"
import { CheckBox, TextField, Dropdown } from "../../../forms"
import UserAvatar from "../../../smartsplit/user/avatar"
import RecordIcon from "../../../svg/record.js"
import ChevronDown from "../../../svg/chevron-down.js"
import PlusCircle from "../../../svg/plus-circle.js"
import LockIcon from "../../../svg/lock.js"
import UnlockIcon from "../../../svg/unlock.js"
import HistoryIcon from "../../../svg/history.js"
import { Colors, Metrics } from "../../../theme"
import { getExampleNumber } from "libphonenumber-js"
import { ProIdList } from "../../../smartsplit/components/pro-id-list"
import DropdownList from "../../../smartsplit/components/dropdown-list"

export default function RecordingPagePart2({ workpiece }) {
	const [t] = useTranslation()
	return (
		<Layout
			workpiece={workpiece}
			path={[t("rightSplits:navbar.rightSplits"), t("rightSplits:navbar.page")]}
			progress={50}
			actions={<Button tertiary text={t("general:buttons.saveClose")} />}
			formNav={
				<>
					<Row flex={1}>
						<Button secondary text={t("general:buttons.back")} />
						<Flex />
						<Button primary text={t("general:buttons.continue")} />
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<RecordingFormPart2 />
		</Layout>
	)
}

export function RecordingFormPart2() {
	const [t] = useTranslation()

	return (
		<Row>
			<Column of="group" flex={1}>
				<Text action>
					<RecordIcon color={Colors.action} />

					<Row padding="tiny" />
					{t("rightSplits:titles.record")}
				</Text>
				<Heading level={1}>{t("rightSplits:headers.whoOwn")}</Heading>

				{mapFragment(t("rightSplits:paragraphs.body")(), (p) => (
					<Text>{p}</Text>
				))}
				<Row padding="group" />

				<Card />
				<Hairline />
				<Card2 />
				<Card2 />
				<TextField
					placeholder={t("rightSplits:dropdown.addCollab")}
					before={
						<>
							<PlusCircle />
							<Row padding="tiny" />
						</>
					}
					after={<ChevronDown />}
				/>
			</Column>
			<Column flex={1} align="center">
				<Pie />
			</Column>
		</Row>
	)
}

export function Card() {
	const [t] = useTranslation()
	const hasError = t("rightSplits:errors.option")
	const renew = t("rightSplits:dropdown.duration.renew")
	return (
		<Row layer="underground" of="component" padding="component">
			<Column>
				<UserAvatar initials="XX" size="small" />
				<Flex />
				<LockIcon />
			</Column>
			<Column of="component" flex={1}>
				<Text bold>
					Inscience <b>{t("rightSplits:toi")}</b>
				</Text>
				<Hairline />
				<Dropdown
					placeholder={
						<DropdownList title={t("rightSplits:dropdowns.agreement")} />
					}
					style={{ flex: 1 }}
					noFocusToggle
					error={hasError}
				>
					<Column of="inside" layer="overground_moderate" padding="component">
						<DropdownList
							icon={<HistoryIcon />}
							duration={t("rightSplits:dropdown.duration.oneYear")}
							renew={renew}
						/>
						<DropdownList
							icon={<HistoryIcon />}
							duration={t("rightSplits:dropdown.duration.twoYears")}
							renew={renew}
						/>
						<DropdownList
							icon={<HistoryIcon />}
							duration={t("rightSplits:dropdown.duration.threeYears")}
							renew={renew}
						/>
						<DropdownList
							icon={<HistoryIcon />}
							duration={t("rightSplits:dropdown.duration.fourYears")}
							renew={renew}
						/>
						<DropdownList
							icon={<HistoryIcon />}
							duration={t("rightSplits:dropdown.duration.fiveYears")}
							renew={renew}
						/>
					</Column>
				</Dropdown>
				<Text bold>{t("rightSplits:notify")}</Text>
				<Row>
					<Flex flex={1}>
						<CheckBox label={t("rightSplits:checkboxes.email")} />
					</Flex>
					<Flex flex={1}>
						<CheckBox label={t("rightSplits:checkboxes.txt")} />
					</Flex>
				</Row>
				<Row />

				<Row valign="center" of="component">
					<ProgressBar size="xsmall" progress={33} style={{ flex: 1 }} />
					<Text bold>33%</Text>
				</Row>
			</Column>
		</Row>
	)
}

export function Card2(props) {
	const [t] = useTranslation()
	const hasError = t("rightSplits:errors.function")
	const [role, setRole] = useState(null)
	const [roleDefinition, setRoleDefinition] = useState(null)

	return (
		<Row layer="underground" of="component" padding="component">
			<Column>
				<UserAvatar initials="XX" size="small" />
				<Flex />
				<UnlockIcon />
			</Column>
			<Column of="component" flex={1}>
				<Text bold>
					Inscience <b>{t("rightSplits:toi")}</b>
				</Text>
				<Hairline />
				<Dropdown
					placeholder={
						<DropdownList title={t("rightSplits:dropdown.function")} />
					}
					style={{ flex: 1 }}
					noFocusToggle
					error={hasError}
				>
					<Column of="inside" layer="overground_moderate" padding="component">
						<DropdownList
							role={t("rightSplits:dropdown.collaboratorsRecording.producer")}
							roleDefinition={t(
								"rightSplits:dropdown.collaboratorsRecording.producerDefinition"
							)}
						/>
						<DropdownList
							role={t(
								"rightSplits:dropdown.collaboratorsRecording.autoProducer"
							)}
							roleDefinition={t(
								"rightSplits:dropdown.collaboratorsRecording.autoProducerDefinition"
							)}
						/>
						<DropdownList
							role={t(
								"rightSplits:dropdown.collaboratorsRecording.directorProducer"
							)}
							roleDefinition={t(
								"rightSplits:dropdown.collaboratorsRecording.directorProducerDefinition"
							)}
						/>
						<DropdownList
							role={t(
								"rightSplits:dropdown.collaboratorsRecording.techProducer"
							)}
							roleDefinition={t(
								"rightSplits:dropdown.collaboratorsRecording.techProducerDefinition"
							)}
						/>
						<DropdownList
							role={t("rightSplits:dropdown.collaboratorsRecording.studio")}
							roleDefinition={t(
								"rightSplits:dropdown.collaboratorsRecording.studioDefinition"
							)}
						/>
						<DropdownList
							role={t(
								"rightSplits:dropdown.collaboratorsRecording.illustratorDesigner"
							)}
							roleDefinition={t(
								"rightSplits:dropdown.collaboratorsRecording.illustratorDesignerDefinition"
							)}
						/>
					</Column>
				</Dropdown>
				<Row />

				<Row valign="center" of="component">
					<ProgressBar size="xsmall" progress={33} style={{ flex: 1 }} />
					<Text bold>33%</Text>
				</Row>
			</Column>
		</Row>
	)
}

function Pie() {
	return (
		<svg
			width="384"
			height="384"
			viewBox="0 0 384 384"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask
				id="mask0"
				mask-type="alpha"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="384"
				height="384"
			>
				<circle cx="192" cy="192" r="192" fill="#C4C4C4" />
			</mask>
			<g mask="url(#mask0)">
				<path
					d="M-25 -9H409V362.5L193 192H-25V-9Z"
					fill="#93E9E4"
					stroke="white"
					stroke-width="2"
				/>
				<path
					d="M-16 -8.5H192V187.75L-16 384V-8.5Z"
					fill="#C6F3B6"
					stroke="white"
					stroke-width="2"
				/>
				<path
					d="M192 192L400 350V390.5H-33.5L192 192Z"
					fill="#F8EBA3"
					stroke="white"
					stroke-width="2"
				/>
			</g>
			<circle cx="192" cy="192" r="96" fill="white" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M143.999 192C143.999 165.49 165.49 144 191.999 144C218.509 144 239.999 165.49 239.999 192C239.999 218.51 218.509 240 191.999 240C165.49 240 143.999 218.51 143.999 192ZM191.999 133.333C159.599 133.333 133.333 159.599 133.333 192C133.333 224.401 159.599 250.667 191.999 250.667C224.4 250.667 250.666 224.401 250.666 192C250.666 159.599 224.4 133.333 191.999 133.333ZM179.77 204.228C173.017 197.475 173.017 186.525 179.77 179.771C186.524 173.017 197.474 173.017 204.228 179.771C206.311 181.854 209.688 181.854 211.771 179.771C213.853 177.688 213.853 174.311 211.771 172.228C200.851 161.309 183.147 161.309 172.228 172.228C161.309 183.148 161.309 200.852 172.228 211.771C183.147 222.69 200.851 222.69 211.771 211.771C213.853 209.688 213.853 206.311 211.771 204.228C209.688 202.146 206.311 202.146 204.228 204.228C197.474 210.982 186.524 210.982 179.77 204.228Z"
				fill="#DCDFE1"
			/>
		</svg>
	)
}
