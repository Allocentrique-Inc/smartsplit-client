const schema = {
	creation: {
		date: date,
		authors: [{ user_id: "guid" }],
		composers: [{ user_id: "guid" }],
		publishers: [{ user_id: "guid" }],
		iswc: "string",
	},
	performance: {
		principle: [
			{ user_id: "guid", instruments: [{ name: "string", id: "guid" }] },
		],
		accompanying: [
			{ user_id: "guid", instruments: [{ name: "string", id: "guid" }] },
		],
	},
	recording: {
		director: [{ user_id: "guid" }],
		recording: [
			{
				studio: { name: "string", id: "guid" },
				engineers: [{ user_id: "guid" }],
				date: { from: date, to: date },
				notes: ["string", ""],
			},
		],
		mixing: [
			{
				studio: { name: "string", id: "guid" },
				engineers: [{ user_id: "guid" }],
				date: { from: date, to: date },
				notes: ["string", ""],
			},
		],
		mastering: [
			{
				studio: { name: "string", id: "guid" },
				engineers: [{ user_id: "guid" }],
				date: { from: date, to: date },
				notes: ["string", ""],
			},
		],
	},
	release: {
		date: date,
		label: "string",
		format: "string",
		support: "string",
	},
	files: {
		art: [{ id: "", url: "url", visible: "private | hidden | public" }],
		audio: [{ url: "url", public: boolean }],
		scores: [{ url: "url", public: boolean }],
		midi: [{ url: "url", public: boolean }],
	},
	info: {
		length: "string",
		BPM: number,
		mainGenre: { name: "string", id: "guid" },
		secondaryGenres: [{ name: "string", id: "guid" }],
		influences: ["string"],
	},
	lyrics: {
		text: ["string"],
		languages: ["string"],
		public: boolean,
	},
	streaming: {
		links: [{ platform: "string", url: "string" }],
	},
}
