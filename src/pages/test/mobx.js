import React from "react"
import { action, computed, observable, toJS } from "mobx"
import { observer } from "mobx-react"
import { Column, Row, Section, Spacer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { useTranslation } from "react-i18next"
import { useStores, useStorePath } from "../../mobX"
import Button from "../../widgets/button"
import BaseState from "../../mobX/BaseState"

export default observer(function mobx() {
	const { t } = useTranslation()
	const { counts, test } = useStores()
	const level1 = useStorePath("test", "deep", "level1")
	const { count, squared, increment, decrement } = useStorePath("counts")
	console.log(counts)
	return (
		<Section of="group">
			<Heading level="1">Tests de MobX</Heading>
			<Heading level="2">
				Tests de @observable et @computed de la class counts
			</Heading>
			<Text bold>
				COUNT: <b>{counts.count.toString()}</b>
			</Text>
			<Text bold>
				COUNT squared: <b>{counts.squared.toString()}</b>
			</Text>
			<Row of="group" wrap>
				<Button
					onClick={() => {
						counts.increment()
					}}
					text={"increment"}
				/>
				<Button
					onClick={() => {
						counts.decrement()
					}}
					text={"decrement"}
				/>
			</Row>
			<Heading level="2">Tests de @observable class TEST</Heading>
			<Text bold style={{ fontFamily: "monospace" }}>
				stuff: <b>{JSON.stringify(toJS(test.stuff), null, 4)}</b>
			</Text>
			<Row of="group" wrap>
				<Button
					onClick={() => {
						test.addStuff()
					}}
					text={"add stuff"}
				/>
			</Row>
			<Heading level="2">Tests de state profond</Heading>
			<Text bold style={{ fontFamily: "monospace" }}>
				level1: <b>{JSON.stringify(toJS(level1), null, 4)}</b>
			</Text>
			<Heading level="2">
				Test de @observables, @computed et @actions déstructurés
			</Heading>
			<Text bold>COUNT:{count.toString()}</Text>
			<Text bold>
				COUNT squared: <b>{counts.squared.toString()}</b>
			</Text>
			<Row of="group" wrap>
				<Button
					onClick={() => {
						increment()
					}}
					text={"increment"}
				/>
				<Button
					onClick={() => {
						decrement()
					}}
					text={"decrement"}
				/>
			</Row>
			<Text bold>
				Pour que les actions sur les boutons marchent quand ils sont
				déstructurées, ils doivent être décoré par <b>@action.bound</b> et pas
				juste <b>@action</b>. Sinon l'action perd son contexte &laquo;{" "}
				<i>this</i> &raquo;, sauf si ils sont des &laquo; arrow functions
				&raquo; comme on peut voir dans le code :
			</Text>
			<Text bold style={{ fontFamily: "monospace" }}>
				{`
export default class  TestCountState extends BaseState {
 @observable
 count = 0

 @action.bound
 increment() {
  this.count++
 }

 @action
 decrement = () => {
  this.count--
 }

 @computed
 get squared() {
  return this.count * this.count
 }
}
				`}
			</Text>
			<Text bold>
				Pour une raison que je ne comprend pas, la propriété @computed
				somethingElse marche très bien déstructuré. peux-etre que la
				transpilation de getters dans babel sont fait automatiquement de façon
				&laquo; <i>bound</i> &raquo;
			</Text>
			<Heading level={"2"}>
				Test de compatabilité de la module traduction avec mobX
			</Heading>
			<Text>
				vu que mobx-react modifie comment un component se met à jour. Je voulais
				juste verifier que un changement de langue déclenche le update....{" "}
			</Text>
			<Text bold>
				{t("test:count")}:{count.toString()}
			</Text>
			<Text bold>
				{t("test:squared")}: <b>{counts.squared.toString()}</b>
			</Text>
			<Row of="group" wrap>
				<Button
					onClick={() => {
						increment()
					}}
					text={t("test:addOne")}
				/>
				<Button
					onClick={() => {
						decrement()
					}}
					text={t("test:subOne")}
				/>
			</Row>
		</Section>
	)
})
