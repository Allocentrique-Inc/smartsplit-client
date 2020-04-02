import React, { useState } from "react"
import { Platform, View, Text, ScrollView } from "react-native"
import { Provider } from "react-redux"
import { createStore, applyMiddleware  } from "redux"
import thunk from 'redux-thunk'
import rootReducer from "./redux/rootReducer"
import { MemoryRouter } from "react-router"
import { BrowserRouter } from "react-router-dom"
import * as Font from "expo-font"

import Main from "./src"

const store = createStore(rootReducer,applyMiddleware(thunk));

const RouterImpl = Platform.select({
	android: MemoryRouter,
	ios:     MemoryRouter,
	web:     BrowserRouter
})

const fontMap = {
	"IBMPlexSans-Regular": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Regular.ttf"),
	"IBMPlexSans-Medium":  require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Medium.ttf"),
	"IBMPlexSans-Bold":    require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Bold.ttf"),
}

export default function App(props) {
	const [appReady, setAppReady] = useState(Platform.OS === "web")

	Font.loadAsync(fontMap)
		.then(o => setAppReady(true))
		.catch(e => console.error(e))

	if(!appReady)
		return null

	return <Provider store={ store }>
			<View style={{
				position: "absolute", // absolute nécessaire pour forcer la taille
				top: 0,               // maximale, sinon les ScrollView ne fonctionnent pas
				left: 0,
				right: 0,
				bottom: 0,
				overflow: "hidden"
			}}>
				<RouterImpl>
					<Main />
				</RouterImpl>
			</View>
	</Provider>
}
