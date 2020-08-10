const artists = [
	{
		name: "Inscience",
		tag: "Artiste vedette",
		roles: [
			{
				title: "Musicien",
				properties: "Samples",
			},
		],
	},
	{
		name: "Quest Love",
		tag: "Artiste vedette",
		roles: [
			{
				title: "Chanteur",
				properties: "Soliste",
			},
			{
				title: "Musicien",
				properties: "Guitare électrique, flûte à bec, basse électrique",
			},
		],
	},
	{
		name: "Sonny  Williams",
		tag: "Artiste vedette",
		roles: [
			{
				title: "Musicien",
				properties: "Guitare électrique, flûte à bec, basse électrique",
			},
		],
	},
]

export const sections = {
	performance: {
		category: "Interprétation",
		artists,
	},
	header: {
		name: "Inscience",
		albumTitle: "Album Title",
		songTitle: "Love You Baby",
		tag: "Remix",
		featuredArtist: "Featured Artist",
	},
	creation: {
		category: "Création",
		creationDate: "8 juillet 2019",
		authors: ["Inscience", "Lores", "Quest Love", "Jean-Pierre Cool"],
		composers: [
			"Inscience",
			"Stéphane Lebrou",
			"Jocelyn Therious",
			"Jean-Pierre Cool",
		],
		mixers: [
			"Inscience",
			"Stéphane Lebrou",
			"Jocelyn Therioux",
			"Jean-Pierre Cool",
		],
		editors: ["Sync.mu", "Lepdup"],
	},
	general: {
		category: "Général",
		length: "3:12",
		bmp: "120",
		genres: "Rock",
		styles: "Rockabilly, Dubtrap, British Rock, Black Metal",
		influences:
			"The Rolling Stones, Ivy and the Pearls, Frankie and the Lights, Kanye West, Apollo Brown",
	},

	recording: {
		category: "Enregistrement sonore",
		track: "Love You Baby",
		isrc: "CAA509711403",
		director: "Carl Bastien",
		tech: "Claude Bernard, Sébastien Longchamps",
		mix: "Sylvain Médrion",
		master: "Ryebread Mastering",
		production: "Paul Leinette, Steve Roquefort, Joanie Flan",
		studio: "Studio Piccolo",
		address: "1234 rue du Rock, Montréal (QC) H2J 2K9",
	},

	release: {
		category: "Sortie",
		releaseDate: "19 Mai 2019",
		format: "EP",
		productTitle: "The Things We Love",
	},
}
