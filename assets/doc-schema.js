/**
 *
 * it's important to note that the Schema here concerns mostly the act of a
 * POST or a PATCH HTTP request.
 *
 * when a user is posted we only have to submit the user_id.
 *
 * however when we fetch the documentation data, the full user,
 * with name, artist name, whether it is a collaborator or a contributor
 * will be returned to avoid having to "hydrate" the data with additional
 * API calls to the /user section
 *
 * note also that "guid" stands for a "generated unique id"
 */
const schema = {
	creation: {
		date: date,
		authors: [{ user_id: "guid" }],
		composers: [{ user_id: "guid" }],
		publishers: [{ user_id: "guid" }],
		iswc: "string",
	},
	/**
	 * instruments are entities in our system that have unique ids, again this data refers to the
	 * POSTing or PATCHing of data, when we GET the data, the entity is hydrated with a name.
	 * It's also very important to note that the name of an instrument is not hard coded as EN or FR
	 * in the DB -- this would be absurd -- how can we add languages ?
	 *
	 * the entities name need not be unique: its entity id serves as a translation key
	 */
	performance: {
		principle: [{ user_id: "guid", instruments: [{ id: "guid" }] }],
		accompanying: [{ user_id: "guid", instruments: [{ id: "guid" }] }],
	},
	recording: {
		director: [{ user_id: "guid" }],

		/**
		 * this is an  array of objects. each one represents a session with a single date.
		 * multiple dates should then have a session for each.
		 * for now the details of what and who was recorded is in notes
		 */
		recording: [
			{
				studio: { name: "string", id: "guid" },
				engineers: [{ user_id: "guid" }],
				date: { from: date, to: date },
				notes: ["string", ""],
			},
		],
		/**
		 * same structure as recording
		 */
		mixing: [
			{
				studio: { name: "string", id: "guid" },
				engineers: [{ user_id: "guid" }],
				date: { from: date, to: date },
				notes: ["string", ""],
			},
		],
		/**
		 * same structure as recording
		 */
		mastering: [
			{
				studio: { name: "string", id: "guid" },
				engineers: [{ user_id: "guid" }],
				date: { from: date, to: date },
				notes: ["string", ""],
			},
		],
	},
	/**
	 * this should be reflected upon. i think the assumption is that an album is either an LP (or multiple LPS) or an EP
	 * might be worthwhile to have more than just support = "physical" or "digital". physical could be CD or Vinyl or Cassette
	 */
	release: {
		date: date,
		label: "string",
		format: "string",
		support: "string",
	},
	/**
	 * when files are uploaded an entry is created, when we submit we will send only the file Id.
	 * we should be able to alter the access from here
	 */
	files: {
		art: [{ id: "guid", visible: "private | hidden | public" }],
		audio: [{ id: "guid", visible: "private | hidden | public" }],
		scores: [{ id: "guid", visible: "private | hidden | public" }],
		midi: [{ id: "guid", visible: "private | hidden | public" }],
	},
	/**
	 * having main genre and secondary genres as separate will improve searches
	 */
	info: {
		length: "string",
		BPM: number,
		mainGenre: { name: "string", id: "guid" },
		secondaryGenres: [{ name: "string", id: "guid" }],
		influences: ["string"],
	},
	/**
	 * note that the text property of the lyrics is an array of lines of text, including blank lines for spacing.
	 */
	lyrics: {
		text: ["string"],
		languages: ["string"],
		public: boolean,
	},
	/**
	 * platforms are constantly evolving so they are not hard coded, but they may utimately have an ID
	 */
	streaming: {
		links: [{ platform: "string", url: "string" }],
	},
}
