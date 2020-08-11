import React, { useEffect, useReducer } from "react"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useCurrentWorkpiece } from "../context"
import { Column, Row, Flex, Hairline } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Layout from "../layout"
import Button from "../../../widgets/button"
import ProgressBar from "../../../widgets/progress-bar"
import { CheckBox, RadioGroup, RadioGroupButton } from "../../../forms"
import UserAvatar from "../../../smartsplit/user/avatar"
import Help from "../../../svg/help-circle-full"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"
import SplitChart from "../../../smartsplit/components/split-chart"
import CircledC from "../../../svg/circled-c"
import { Colors } from "../../../theme"
import XIcon from "../../../svg/x"

export default function CopyrightPage() {
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()

	function saveAndQuit() {
		history.push("/dashboard/")
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function navigateToInterpretation() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
	}

	return (
		<Layout
			workpiece={workpiece}
			path={["Partage de droits", "Droits d'auteur"]}
			actions={
				<Button tertiary text="Sauvegarder et fermer" onClick={saveAndQuit} />
			}
			formNav={
				<>
					<Row flex={1}>
						<Button secondary text="Retour" onClick={navigateToSummary} />
						<Flex />
						<Button
							primary
							text="Continuer"
							onClick={navigateToInterpretation}
						/>
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<CopyrightForm />
		</Layout>
	)
}

export function CopyrightForm() {
	const [, rerender] = useReducer((n) => n + 1, 0)
	const splits = useCurrentWorkpiece("rightsSplits", "copyright")
	const shares = useCurrentWorkpiece("rightsSplits", "copyright", "allShares")

	function addCollaborator(rightHolder_id) {
		splits.addRightHolder(rightHolder_id, {
			shares: 1,
		})
	}

	const shareColors = Object.values(Colors.secondaries)

	function colorByIndex(index) {
		return shareColors[index % shareColors.length]
	}

	let chartData = shares.map((share, i) => ({
		key: share.rightHolder,
		name: share.rightHolder,
		share: share.shares,
		color: colorByIndex(i),
	}))

	console.log("chart", chartData)

	const totalShares = shares
		.map((share) => share.shares)
		.reduce((a, n) => a + n, 0)

	useEffect(() => {
		const unsubscribes = shares.map((share) => share.subscribe(rerender))
		return function () {
			unsubscribes.forEach((unsub) => unsub())
		}
	}, [shares])

	return (
		<Row>
			<Column of="group" flex={1}>
				<Column of="component">
					<Text action>(c) DROITS D'AUTEUR</Text>
					<Heading level={1}>Qui a inventé cette pièce musicale</Heading>
					<Paragraph>
						Sépare ici le droit d’auteur entre les créateurs, c’est à dire les
						auteurs des <b>paroles</b>, les compositeurs et les arrangeurs de la{" "}
						<b>musique</b>. Il est d’usage de partager le droit d’auteur
						équitablement. Mais tu peux faire autrement.
					</Paragraph>
				</Column>

				<RadioGroup>
					<Column of="component">
						<RadioGroupButton value="equal" label="Partager de façon égale" />
						<RadioGroupButton
							value="by-roles"
							label="Partager selon les rôles"
						/>
						<RadioGroupButton value="manual" label="Gérer manuellement" />
					</Column>
				</RadioGroup>

				<Column of="component">
					{shares.map((share, i) => (
						<Card
							key={share.rightHolder}
							share={share}
							color={colorByIndex(i)}
							removeSelf={() => splits.removeRightHolder(share.rightHolder)}
							sharePercent={
								share.shares > 0 ? (100 * share.shares) / totalShares : 0
							}
						/>
					))}

					<AddCollaboratorDropdown onSelect={addCollaborator} />
				</Column>
			</Column>
			<Column flex={1} align="center">
				<SplitChart data={chartData} logo={CircledC} />
			</Column>
		</Row>
	)
}

export function Card({ share, color, sharePercent, removeSelf }) {
	useStorePath("users").fetch(share.rightHolder)
	const user = useStorePath("users", share.rightHolder, "data") || {}
	const authUser = useStorePath("auth", "user")

	function addShareUnit() {
		share.set({ shares: share.shares + 1 })
	}

	function removeShareUnit() {
		const next = share.shares - 1
		share.set({ shares: next > 0 ? next : 0 })
	}

	return (
		<Row
			layer="underground"
			of="component"
			padding="component"
			style={{ borderWidth: 1, borderColor: color }}
		>
			<Column>
				<UserAvatar user={user} size="small" />
				<Flex />
				<Help />
			</Column>
			<Column of="component" flex={1}>
				<Row of="component">
					<Flex>
						<Text bold>
							{user.artistName || user.firstName + " " + user.lastName}
							{user.user_id === authUser.id && <b> (toi)</b>}
						</Text>
					</Flex>
					<Button icon={<XIcon />} small onClick={removeSelf} />
				</Row>
				<Hairline />
				<Row>
					<Flex flex={1}>
						<CheckBox label="Auteur" />
					</Flex>
					<Flex flex={1}>
						<CheckBox label="Compositeur" />
					</Flex>
				</Row>
				<Row>
					<Flex flex={1}>
						<CheckBox label="Adaptateur" />
					</Flex>
					<Flex flex={1}>
						<CheckBox label="Arrangeur" />
					</Flex>
				</Row>
				<Row valign="center" of="component">
					<Button small text="-" onClick={removeShareUnit} />
					<ProgressBar
						size="xsmall"
						progress={sharePercent}
						style={{ flex: 1 }}
					/>
					<Text bold>{Math.round(sharePercent)}%</Text>
					<Button small text="+" onClick={addShareUnit} />
				</Row>
			</Column>
		</Row>
	)
}
