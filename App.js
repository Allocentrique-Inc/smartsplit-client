import React, { useState } from "react"
import { Platform, View, Text, ScrollView } from "react-native"
import KeyboardSpacer from "react-native-keyboard-spacer"
import { MemoryRouter } from "react-router"
import { BrowserRouter } from "react-router-dom"
import * as Font from "expo-font"

import Main from "./src"

const RouterImpl = Platform.select({
	android: MemoryRouter,
	ios: MemoryRouter,
	web: BrowserRouter
})

const fontMap = {
	"IBMPlexSans-Light": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Light.ttf"),
	"IBMPlexSans-Regular": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Regular.ttf"),
	"IBMPlexSans-Bold": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Bold.ttf"),
}

export default function App(props) {
	const [appReady, setAppReady] = useState(Platform.OS === "web")

	Font.loadAsync(fontMap)
		.then(o => setAppReady(true))
		.catch(e => console.error(e))

	if(!appReady)
		return <View style={{flex: 1}}>
			<Text> Loading fonts... </Text>
		</View>

	return <View style={{flex: 1}}>
		{appReady && (
			<RouterImpl>
				<Main />
			</RouterImpl>
		)}
	</View>
}
