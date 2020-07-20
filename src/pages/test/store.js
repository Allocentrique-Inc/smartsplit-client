import React, { useState, useReducer, useMemo, useEffect } from "react"
import { useStore, useStorePath } from "../../appstate/react"
import { Column, Row, Flex, Spacer, NoSpacer } from "../../layout"
import { Text, Heading } from "../../text"
import { TextField } from "../../forms"
import Button from "../../widgets/button"

import { useRightHolderSearch } from "../../appstate/react/right-holders"

export default function StoreTestPage() {
	return (
		<Column of="section" margin="section">
			<NoSpacer>
				<Heading>Test du nouveau State Store</Heading>
				<Spacer of="group" />
			</NoSpacer>

			<StoreDump />
			<RightHolders />
			<Incrementor />
		</Column>
	)
}

function StoreDump() {
	const store = useStore()
	const [version, refresh] = useReducer((n) => n + 1, 0)

	useEffect(() => {
		const timeout = setTimeout(() => refresh(), 1500)
		return function () {
			clearTimeout(timeout)
		}
	}, [version])

	function dumpToConsole() {
		console.log("State Store:", store)
		window.store = store
	}

	function debug() {
		const debugStore = store
		debugger
	}

	return (
		<Column of="component">
			<Heading level={3}>Déboguage du store</Heading>
			<Row of="component">
				<Button text="Rafraichir" onClick={refresh} />
				<Flex />
				<Button text="Dump dans console" onClick={dumpToConsole} />
				<Button text="Debugger" onClick={debug} />
			</Row>

			<Text style={{ fontFamily: "monospace" }}>
				{JSON.stringify(store, null, 4)}
			</Text>
		</Column>
	)
}

function RightHolders() {
	const [terms, setTerms] = useState("")
	const results = useRightHolderSearch(terms)

	return (
		<Column of="component">
			<Heading level={3}>Recherche des ayant-droits</Heading>
			<TextField value={terms} onChangeText={setTerms} />
			{results.map((rh) => (
				<Text key={rh.rightHolder_id}>
					{rh.firstName} {rh.lastName} ({rh.artistName})
				</Text>
			))}
		</Column>
	)
}

function Incrementor() {
	const counter = useStorePath("test")

	return (
		<Column of="component">
			<Heading level={3}>Test incrémentation</Heading>

			<Row of="component">
				<Text>Value: {counter.value}</Text>
				<Flex />
				<Button text="Incrémenter" onClick={counter.increment} />
			</Row>
		</Column>
	)
}
