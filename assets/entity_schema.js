export const entity = {
	id: "guid",
	name: string,
	type: "genre" | "instrument" | "band" | "label",
	parent: "id",
	links: [
		{ name: "wikidata", id: "", uri: "" },
		{ name: "musicbrainz", id: "", uri: "" },
	],
	tags: ["string"],
	lang: {
		en: "string",
		fr: "string",
	},
}
