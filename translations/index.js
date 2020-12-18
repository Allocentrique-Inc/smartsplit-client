import { Platform } from "react-native"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { locales } from "expo-localization"
import moment from "moment"

import * as english from "./en"
import * as french from "./fr"

export const validLanguages = ["en", "fr"]
export const defaultLocale = "fr"

export function getDeviceLocale() {
	let locale = defaultLocale
	const deviceLocales = locales.map((lang) => lang.replace(/[_-].*$/, ""))

	if (!deviceLocales.includes(locale)) {
		for (let lang of deviceLocales) {
			if (validLanguages.includes(lang)) {
				locale = lang
				break
			}
		}
	}

	return locale
}

const translations = i18n
	.use(initReactI18next)
	.on("languageChanged", function (language) {
		moment.locale(language)
	})
	.init({
		lng: getDeviceLocale(),
		fallbackLng: defaultLocale,
		whitelist: validLanguages,
		resources: {
			en: english,
			fr: french,
		},
		debug: true,
		ns: "general",
		defaultNS: "general",
		interpolation: {
			escapeValue: false,
			format: function (value, format, lng) {
				if (value instanceof Date) return moment(value).format(format)
				return value
			},
		},
		returnObjects: true, // pour traductions qui retournent un Fragment
	})

export default translations
