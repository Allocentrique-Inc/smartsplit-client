import React, { useReducer, useMemo, useEffect } from "react"
import { useStore, useStorePath } from "../../appstate/react"
import { Column, Row, Flex, Spacer, NoSpacer } from "../../layout"
import { Text, Heading } from "../../text"
import Button from "../../widgets/button"

export default function StoreTestPage() {
	return (
		<Column of="section" margin="section">
			<NoSpacer>
				<Heading>Test du nouveau State Store</Heading>
				<Spacer of="group" />
			</NoSpacer>

			<Incrementor />
			<StoreDump />
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
