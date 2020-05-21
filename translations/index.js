import { Platform } from "react-native"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import BrowserLanguageDetector from "i18next-browser-languagedetector"
import NativeLanguageDetector from "i18next-react-native-language-detector"
import moment from "moment"

import * as english from "./en"
import * as french from "./fr"

const translations = i18n
	.use(
		Platform.select({
			web: BrowserLanguageDetector,
			ios: NativeLanguageDetector,
			android: NativeLanguageDetector,
		})
	)
	.use(initReactI18next)
	.on("languageChanged", function (language) {
		moment.locale(language)
	})
	.init({
		fallbackLng: "fr",
		whitelist: ["en", "fr"],
		resources: {
			en: english,
			fr: french,
		},
		debug: true,
		ns: "general",
		defaultNS: "general",
		interpolation: {
			escapeValue: false,
		},
		returnObjects: true, // pour traductions qui retournent un Fragment
	})

export default translations
