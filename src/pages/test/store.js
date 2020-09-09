import React, { useState, useReducer, useMemo, useEffect } from "react"
import { useStore, useStorePath } from "../../appstate/react"
import { Column, Row, Flex, Spacer, NoSpacer } from "../../layout"
import { Text, Heading } from "../../text"
import { TextField } from "../../forms"
import Button from "../../widgets/button"

import { useRightHolderSearch } from "../../appstate/react/right-holders"
import { useStores } from "../../mobX"
import { toJS } from "mobx"


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
	const stores = useStores()
	const [version, refresh] = useReducer((n) => n + 1, 0)
	console.log(toJS(stores.users))
	console.log(stores.auth.tokenChanged)
	// useEffect(() => {
	// 	const timeout = setTimeout(() => refresh(), 1500)
	// 	return function () {
	// 		clearTimeout(timeout)
	// 	}
	// }, [version])

	function dumpToConsole() {
		console.log("State Store:", stores)
		window.stores = stores
	}

	function debug() {
		const debugStore = stores
		debugger
	}

	return (
		<Column of="component">
			<Heading level={3}>Déboguage du stores</Heading>
			<Row of="component">
				<Button text="Rafraichir" onClick={refresh} />
				<Flex />
				<Button text="Dump dans console" onClick={dumpToConsole} />
				<Button text="Debugger" onClick={debug} />
			</Row>

			<Text style={{ fontFamily: "monospace" }}>
				{toJS(stores.workpieces).toString()}
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
