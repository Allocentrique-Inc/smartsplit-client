const genres = [
	{
		id: 1,
		name: "acid house",
	},
	{
		id: 2,
		name: "acid jazz",
	},
	{
		id: 3,
		name: "acid rock",
	},
	{
		id: 4,
		name: "acid techno",
	},
	{
		id: 5,
		name: "acoustic blues",
	},
	{
		id: 6,
		name: "acoustic rock",
	},
	{
		id: 7,
		name: "afoxê",
	},
	{
		id: 8,
		name: "afrobeat",
	},
	{
		id: 9,
		name: "alternative country",
	},
	{
		id: 10,
		name: "alternative dance",
	},
	{
		id: 11,
		name: "alternative folk",
	},
	{
		id: 12,
		name: "alternative hip hop",
	},
	{
		id: 13,
		name: "alternative metal",
	},
	{
		id: 14,
		name: "alternative pop",
	},
	{
		id: 15,
		name: "alternative punk",
	},
	{
		id: 16,
		name: "alternative rock",
	},
	{
		id: 17,
		name: "ambient",
	},
	{
		id: 18,
		name: "ambient dub",
	},
	{
		id: 19,
		name: "ambient house",
	},
	{
		id: 20,
		name: "ambient techno",
	},
	{
		id: 21,
		name: "americana",
	},
	{
		id: 22,
		name: "anarcho-punk",
	},
	{
		id: 23,
		name: "aor",
	},
	{
		id: 24,
		name: "arena rock",
	},
	{
		id: 25,
		name: "art pop",
	},
	{
		id: 26,
		name: "art punk",
	},
	{
		id: 27,
		name: "art rock",
	},
	{
		id: 28,
		name: "atmospheric black metal",
	},
	{
		id: 29,
		name: "audiobook",
	},
	{
		id: 30,
		name: "avant-garde",
	},
	{
		id: 31,
		name: "avant-garde jazz",
	},
	{
		id: 32,
		name: "avant-garde metal",
	},
	{
		id: 33,
		name: "avant-garde pop",
	},
	{
		id: 34,
		name: "avant-prog",
	},
	{
		id: 35,
		name: "bachata",
	},
	{
		id: 36,
		name: "ballad",
	},
	{
		id: 37,
		name: "barbershop",
	},
	{
		id: 38,
		name: "baroque",
	},
	{
		id: 39,
		name: "bass house",
	},
	{
		id: 40,
		name: "beat music",
	},
	{
		id: 41,
		name: "bebop",
	},
	{
		id: 42,
		name: "bhangra",
	},
	{
		id: 43,
		name: "big band",
	},
	{
		id: 44,
		name: "big beat",
	},
	{
		id: 45,
		name: "black metal",
	},
	{
		id: 46,
		name: "blackened death metal",
	},
	{
		id: 47,
		name: "blackgaze",
	},
	{
		id: 48,
		name: "blue-eyed soul",
	},
	{
		id: 49,
		name: "bluegrass",
	},
	{
		id: 50,
		name: "blues",
	},
	{
		id: 51,
		name: "blues rock",
	},
	{
		id: 52,
		name: "bolero",
	},
	{
		id: 53,
		name: "bolero son",
	},
	{
		id: 54,
		name: "bongo flava",
	},
	{
		id: 55,
		name: "boogie rock",
	},
	{
		id: 56,
		name: "boogie-woogie",
	},
	{
		id: 57,
		name: "boom bap",
	},
	{
		id: 58,
		name: "bossa nova",
	},
	{
		id: 59,
		name: "bounce",
	},
	{
		id: 60,
		name: "breakbeat",
	},
	{
		id: 61,
		name: "breakbeat hardcore",
	},
	{
		id: 62,
		name: "breakcore",
	},
	{
		id: 63,
		name: "breaks",
	},
	{
		id: 64,
		name: "britpop",
	},
	{
		id: 65,
		name: "broken beat",
	},
	{
		id: 66,
		name: "brostep",
	},
	{
		id: 67,
		name: "brutal death metal",
	},
	{
		id: 68,
		name: "bubblegum pop",
	},
	{
		id: 69,
		name: "cajun",
	},
	{
		id: 70,
		name: "calypso",
	},
	{
		id: 71,
		name: "candombe",
	},
	{
		id: 72,
		name: "canterbury scene",
	},
	{
		id: 73,
		name: "cantopop",
	},
	{
		id: 74,
		name: "carnatic classical",
	},
	{
		id: 75,
		name: "celtic",
	},
	{
		id: 76,
		name: "celtic punk",
	},
	{
		id: 77,
		name: "chachachá",
	},
	{
		id: 78,
		name: "chamber pop",
	},
	{
		id: 79,
		name: "champeta",
	},
	{
		id: 80,
		name: "changüí",
	},
	{
		id: 81,
		name: "chanson",
	},
	{
		id: 82,
		name: "chicago blues",
	},
	{
		id: 83,
		name: "chillout",
	},
	{
		id: 84,
		name: "chiptune",
	},
	{
		id: 85,
		name: "chopped and screwed",
	},
	{
		id: 86,
		name: "christian rock",
	},
	{
		id: 87,
		name: "christmas music",
	},
	{
		id: 88,
		name: "chutney",
	},
	{
		id: 89,
		name: "city pop",
	},
	{
		id: 90,
		name: "classic blues",
	},
	{
		id: 91,
		name: "classic country",
	},
	{
		id: 92,
		name: "classic jazz",
	},
	{
		id: 93,
		name: "classic rock",
	},
	{
		id: 94,
		name: "classical",
	},
	{
		id: 95,
		name: "classical crossover",
	},
	{
		id: 96,
		name: "club",
	},
	{
		id: 97,
		name: "comedy",
	},
	{
		id: 98,
		name: "comedy rock",
	},
	{
		id: 99,
		name: "compas",
	},
	{
		id: 100,
		name: "complextro",
	},
	{
		id: 101,
		name: "conscious hip hop",
	},
	{
		id: 102,
		name: "contemporary christian",
	},
	{
		id: 103,
		name: "contemporary classical",
	},
	{
		id: 104,
		name: "contemporary folk",
	},
	{
		id: 105,
		name: "contemporary gospel",
	},
	{
		id: 106,
		name: "contemporary jazz",
	},
	{
		id: 107,
		name: "contemporary r&b",
	},
	{
		id: 108,
		name: "contra",
	},
	{
		id: 109,
		name: "cool jazz",
	},
	{
		id: 110,
		name: "country",
	},
	{
		id: 111,
		name: "country blues",
	},
	{
		id: 112,
		name: "country folk",
	},
	{
		id: 113,
		name: "country pop",
	},
	{
		id: 114,
		name: "country rock",
	},
	{
		id: 115,
		name: "coupé-décalé",
	},
	{
		id: 116,
		name: "cowpunk",
	},
	{
		id: 117,
		name: "crossover prog",
	},
	{
		id: 118,
		name: "crust punk",
	},
	{
		id: 119,
		name: "cumbia",
	},
	{
		id: 120,
		name: "cumbia villera",
	},
	{
		id: 121,
		name: "cyberpunk",
	},
	{
		id: 122,
		name: "d-beat",
	},
	{
		id: 123,
		name: "dance",
	},
	{
		id: 124,
		name: "dance-pop",
	},
	{
		id: 125,
		name: "dance-punk",
	},
	{
		id: 126,
		name: "dancehall",
	},
	{
		id: 127,
		name: "dansband",
	},
	{
		id: 128,
		name: "dark ambient",
	},
	{
		id: 129,
		name: "dark electro",
	},
	{
		id: 130,
		name: "dark folk",
	},
	{
		id: 131,
		name: "dark wave",
	},
	{
		id: 132,
		name: "death metal",
	},
	{
		id: 133,
		name: "death-doom metal",
	},
	{
		id: 134,
		name: "deathcore",
	},
	{
		id: 135,
		name: "deathgrind",
	},
	{
		id: 136,
		name: "deathrock",
	},
	{
		id: 137,
		name: "deep house",
	},
	{
		id: 138,
		name: "delta blues",
	},
	{
		id: 139,
		name: "descarga",
	},
	{
		id: 140,
		name: "desert rock",
	},
	{
		id: 141,
		name: "detroit techno",
	},
	{
		id: 142,
		name: "digital hardcore",
	},
	{
		id: 143,
		name: "disco",
	},
	{
		id: 144,
		name: "doo-wop",
	},
	{
		id: 145,
		name: "doom metal",
	},
	{
		id: 146,
		name: "downtempo",
	},
	{
		id: 147,
		name: "dream pop",
	},
	{
		id: 148,
		name: "drill",
	},
	{
		id: 149,
		name: "drill and bass",
	},
	{
		id: 150,
		name: "drone",
	},
	{
		id: 151,
		name: "drum and bass",
	},
	{
		id: 152,
		name: "dub",
	},
	{
		id: 153,
		name: "dub techno",
	},
	{
		id: 154,
		name: "dubstep",
	},
	{
		id: 155,
		name: "dungeon synth",
	},
	{
		id: 156,
		name: "east coast hip hop",
	},
	{
		id: 157,
		name: "ebm",
	},
	{
		id: 158,
		name: "edm",
	},
	{
		id: 159,
		name: "electric blues",
	},
	{
		id: 160,
		name: "electro",
	},
	{
		id: 161,
		name: "electro house",
	},
	{
		id: 162,
		name: "electro swing",
	},
	{
		id: 163,
		name: "electro-funk",
	},
	{
		id: 164,
		name: "electro-industrial",
	},
	{
		id: 165,
		name: "electroclash",
	},
	{
		id: 166,
		name: "electronic",
	},
	{
		id: 167,
		name: "electronic rock",
	},
	{
		id: 168,
		name: "electronica",
	},
	{
		id: 169,
		name: "electronicore",
	},
	{
		id: 170,
		name: "electropop",
	},
	{
		id: 171,
		name: "electropunk",
	},
	{
		id: 172,
		name: "emo",
	},
	{
		id: 173,
		name: "emo pop",
	},
	{
		id: 174,
		name: "emocore",
	},
	{
		id: 175,
		name: "enka",
	},
	{
		id: 176,
		name: "ethereal",
	},
	{
		id: 177,
		name: "euro house",
	},
	{
		id: 178,
		name: "eurobeat",
	},
	{
		id: 179,
		name: "eurodance",
	},
	{
		id: 180,
		name: "europop",
	},
	{
		id: 181,
		name: "exotica",
	},
	{
		id: 182,
		name: "experimental",
	},
	{
		id: 183,
		name: "experimental rock",
	},
	{
		id: 184,
		name: "fado",
	},
	{
		id: 185,
		name: "filk",
	},
	{
		id: 186,
		name: "flamenco",
	},
	{
		id: 187,
		name: "folk",
	},
	{
		id: 188,
		name: "folk metal",
	},
	{
		id: 189,
		name: "folk pop",
	},
	{
		id: 190,
		name: "folk punk",
	},
	{
		id: 191,
		name: "folk rock",
	},
	{
		id: 192,
		name: "folktronica",
	},
	{
		id: 193,
		name: "freak folk",
	},
	{
		id: 194,
		name: "free improvisation",
	},
	{
		id: 195,
		name: "free jazz",
	},
	{
		id: 196,
		name: "funk",
	},
	{
		id: 197,
		name: "funk carioca",
	},
	{
		id: 198,
		name: "funk metal",
	},
	{
		id: 199,
		name: "funk rock",
	},
	{
		id: 200,
		name: "funk soul",
	},
	{
		id: 201,
		name: "funky house",
	},
	{
		id: 202,
		name: "fusion",
	},
	{
		id: 203,
		name: "future bass",
	},
	{
		id: 204,
		name: "future garage",
	},
	{
		id: 205,
		name: "future jazz",
	},
	{
		id: 206,
		name: "futurepop",
	},
	{
		id: 207,
		name: "g-funk",
	},
	{
		id: 208,
		name: "gabber",
	},
	{
		id: 209,
		name: "gangsta rap",
	},
	{
		id: 210,
		name: "garage",
	},
	{
		id: 211,
		name: "garage house",
	},
	{
		id: 212,
		name: "garage punk",
	},
	{
		id: 213,
		name: "garage rock",
	},
	{
		id: 214,
		name: "glam",
	},
	{
		id: 215,
		name: "glam metal",
	},
	{
		id: 216,
		name: "glam rock",
	},
	{
		id: 217,
		name: "glitch",
	},
	{
		id: 218,
		name: "goa trance",
	},
	{
		id: 219,
		name: "goregrind",
	},
	{
		id: 220,
		name: "gospel",
	},
	{
		id: 221,
		name: "gothic",
	},
	{
		id: 222,
		name: "gothic metal",
	},
	{
		id: 223,
		name: "gothic rock",
	},
	{
		id: 224,
		name: "grebo",
	},
	{
		id: 225,
		name: "grime",
	},
	{
		id: 226,
		name: "grindcore",
	},
	{
		id: 227,
		name: "groove metal",
	},
	{
		id: 228,
		name: "group sounds",
	},
	{
		id: 229,
		name: "grunge",
	},
	{
		id: 230,
		name: "guaguancó",
	},
	{
		id: 231,
		name: "guajira",
	},
	{
		id: 232,
		name: "guaracha",
	},
	{
		id: 233,
		name: "happy hardcore",
	},
	{
		id: 234,
		name: "hard bop",
	},
	{
		id: 235,
		name: "hard house",
	},
	{
		id: 236,
		name: "hard rock",
	},
	{
		id: 237,
		name: "hard trance",
	},
	{
		id: 238,
		name: "hardcore hip hop",
	},
	{
		id: 239,
		name: "hardcore punk",
	},
	{
		id: 240,
		name: "hardcore techno",
	},
	{
		id: 241,
		name: "hardstyle",
	},
	{
		id: 242,
		name: "harsh noise",
	},
	{
		id: 243,
		name: "harsh noise wall",
	},
	{
		id: 244,
		name: "hauntology",
	},
	{
		id: 245,
		name: "heavy metal",
	},
	{
		id: 246,
		name: "heavy psych",
	},
	{
		id: 247,
		name: "heavy rock",
	},
	{
		id: 248,
		name: "hi-nrg",
	},
	{
		id: 249,
		name: "hindustani classical",
	},
	{
		id: 250,
		name: "hip hop",
	},
	{
		id: 251,
		name: "hip house",
	},
	{
		id: 252,
		name: "honky tonk",
	},
	{
		id: 253,
		name: "hopepunk",
	},
	{
		id: 254,
		name: "horror punk",
	},
	{
		id: 255,
		name: "horrorcore",
	},
	{
		id: 256,
		name: "house",
	},
	{
		id: 257,
		name: "idm",
	},
	{
		id: 258,
		name: "illbient",
	},
	{
		id: 259,
		name: "indie",
	},
	{
		id: 260,
		name: "indie folk",
	},
	{
		id: 261,
		name: "indie pop",
	},
	{
		id: 262,
		name: "indie rock",
	},
	{
		id: 263,
		name: "indietronica",
	},
	{
		id: 264,
		name: "indorock",
	},
	{
		id: 265,
		name: "industrial",
	},
	{
		id: 266,
		name: "industrial metal",
	},
	{
		id: 267,
		name: "industrial musical",
	},
	{
		id: 268,
		name: "industrial rock",
	},
	{
		id: 269,
		name: "industrial techno",
	},
	{
		id: 270,
		name: "instrumental",
	},
	{
		id: 271,
		name: "instrumental jazz",
	},
	{
		id: 272,
		name: "instrumental rock",
	},
	{
		id: 273,
		name: "irish folk",
	},
	{
		id: 274,
		name: "italo-disco",
	},
	{
		id: 275,
		name: "j-pop",
	},
	{
		id: 276,
		name: "j-rock",
	},
	{
		id: 277,
		name: "jazz",
	},
	{
		id: 278,
		name: "jazz blues",
	},
	{
		id: 279,
		name: "jazz fusion",
	},
	{
		id: 280,
		name: "jazz rap",
	},
	{
		id: 281,
		name: "jazz rock",
	},
	{
		id: 282,
		name: "jazz-funk",
	},
	{
		id: 283,
		name: "joik",
	},
	{
		id: 284,
		name: "jungle",
	},
	{
		id: 285,
		name: "k-pop",
	},
	{
		id: 286,
		name: "kawaii metal",
	},
	{
		id: 287,
		name: "kayōkyoku",
	},
	{
		id: 288,
		name: "kizomba",
	},
	{
		id: 289,
		name: "klezmer",
	},
	{
		id: 290,
		name: "krautrock",
	},
	{
		id: 291,
		name: "latin",
	},
	{
		id: 292,
		name: "latin jazz",
	},
	{
		id: 293,
		name: "latin pop",
	},
	{
		id: 294,
		name: "latin rock",
	},
	{
		id: 295,
		name: "leftfield",
	},
	{
		id: 296,
		name: "line dance",
	},
	{
		id: 297,
		name: "lo-fi",
	},
	{
		id: 298,
		name: "lo-fi hip hop",
	},
	{
		id: 299,
		name: "lounge",
	},
	{
		id: 300,
		name: "lovers rock",
	},
	{
		id: 301,
		name: "luk krung",
	},
	{
		id: 302,
		name: "luk thung",
	},
	{
		id: 303,
		name: "madchester",
	},
	{
		id: 304,
		name: "mainstream rock",
	},
	{
		id: 305,
		name: "maloya",
	},
	{
		id: 306,
		name: "mambo",
	},
	{
		id: 307,
		name: "mandopop",
	},
	{
		id: 308,
		name: "martial industrial",
	},
	{
		id: 309,
		name: "maskanda",
	},
	{
		id: 310,
		name: "math rock",
	},
	{
		id: 311,
		name: "mathcore",
	},
	{
		id: 312,
		name: "medieval",
	},
	{
		id: 313,
		name: "melodic black metal",
	},
	{
		id: 314,
		name: "melodic death metal",
	},
	{
		id: 315,
		name: "melodic metalcore",
	},
	{
		id: 316,
		name: "melodic rock",
	},
	{
		id: 317,
		name: "melodic trance",
	},
	{
		id: 318,
		name: "mento",
	},
	{
		id: 319,
		name: "merengue",
	},
	{
		id: 320,
		name: "metal",
	},
	{
		id: 321,
		name: "metalcore",
	},
	{
		id: 322,
		name: "miami bass",
	},
	{
		id: 323,
		name: "microhouse",
	},
	{
		id: 324,
		name: "milonga",
	},
	{
		id: 325,
		name: "min'yō",
	},
	{
		id: 326,
		name: "mincecore",
	},
	{
		id: 327,
		name: "minimal",
	},
	{
		id: 328,
		name: "minimal techno",
	},
	{
		id: 329,
		name: "minimal wave",
	},
	{
		id: 330,
		name: "modern blues",
	},
	{
		id: 331,
		name: "modern classical",
	},
	{
		id: 332,
		name: "modern country",
	},
	{
		id: 333,
		name: "motown",
	},
	{
		id: 334,
		name: "mpb",
	},
	{
		id: 335,
		name: "musical",
	},
	{
		id: 336,
		name: "neo soul",
	},
	{
		id: 337,
		name: "neo-progressive rock",
	},
	{
		id: 338,
		name: "neo-rockabilly",
	},
	{
		id: 339,
		name: "neo-traditional country",
	},
	{
		id: 340,
		name: "neofolk",
	},
	{
		id: 341,
		name: "nerdcore",
	},
	{
		id: 342,
		name: "neurofunk",
	},
	{
		id: 343,
		name: "new age",
	},
	{
		id: 344,
		name: "new jack swing",
	},
	{
		id: 345,
		name: "new romantic",
	},
	{
		id: 346,
		name: "new wave",
	},
	{
		id: 347,
		name: "nightcore",
	},
	{
		id: 348,
		name: "no wave",
	},
	{
		id: 349,
		name: "noise",
	},
	{
		id: 350,
		name: "noise pop",
	},
	{
		id: 351,
		name: "noise rock",
	},
	{
		id: 352,
		name: "noisecore",
	},
	{
		id: 353,
		name: "non-music",
	},
	{
		id: 354,
		name: "norteño",
	},
	{
		id: 355,
		name: "northern soul",
	},
	{
		id: 356,
		name: "nu disco",
	},
	{
		id: 357,
		name: "nu jazz",
	},
	{
		id: 358,
		name: "nu metal",
	},
	{
		id: 359,
		name: "nueva canción",
	},
	{
		id: 360,
		name: "occult rock",
	},
	{
		id: 361,
		name: "oi",
	},
	{
		id: 362,
		name: "old school death metal",
	},
	{
		id: 363,
		name: "old-time",
	},
	{
		id: 364,
		name: "opera",
	},
	{
		id: 365,
		name: "orchestral",
	},
	{
		id: 366,
		name: "outlaw country",
	},
	{
		id: 367,
		name: "p-funk",
	},
	{
		id: 368,
		name: "pachanga",
	},
	{
		id: 369,
		name: "pagode",
	},
	{
		id: 370,
		name: "phonk",
	},
	{
		id: 371,
		name: "polka",
	},
	{
		id: 372,
		name: "pop",
	},
	{
		id: 373,
		name: "pop metal",
	},
	{
		id: 374,
		name: "pop punk",
	},
	{
		id: 375,
		name: "pop rap",
	},
	{
		id: 376,
		name: "pop rock",
	},
	{
		id: 377,
		name: "pop soul",
	},
	{
		id: 378,
		name: "pornogrind",
	},
	{
		id: 379,
		name: "post-bop",
	},
	{
		id: 380,
		name: "post-classical",
	},
	{
		id: 381,
		name: "post-grunge",
	},
	{
		id: 382,
		name: "post-hardcore",
	},
	{
		id: 383,
		name: "post-metal",
	},
	{
		id: 384,
		name: "post-punk",
	},
	{
		id: 385,
		name: "post-rock",
	},
	{
		id: 386,
		name: "power electronics",
	},
	{
		id: 387,
		name: "power metal",
	},
	{
		id: 388,
		name: "power pop",
	},
	{
		id: 389,
		name: "powerviolence",
	},
	{
		id: 390,
		name: "production music",
	},
	{
		id: 391,
		name: "progressive",
	},
	{
		id: 392,
		name: "progressive folk",
	},
	{
		id: 393,
		name: "progressive house",
	},
	{
		id: 394,
		name: "progressive metal",
	},
	{
		id: 395,
		name: "progressive rock",
	},
	{
		id: 396,
		name: "progressive trance",
	},
	{
		id: 397,
		name: "psy-trance",
	},
	{
		id: 398,
		name: "psychedelic",
	},
	{
		id: 399,
		name: "psychedelic folk",
	},
	{
		id: 400,
		name: "psychedelic pop",
	},
	{
		id: 401,
		name: "psychedelic rock",
	},
	{
		id: 402,
		name: "psychobilly",
	},
	{
		id: 403,
		name: "psytrance",
	},
	{
		id: 404,
		name: "punk",
	},
	{
		id: 405,
		name: "punk rock",
	},
	{
		id: 406,
		name: "qawwali",
	},
	{
		id: 407,
		name: "queercore",
	},
	{
		id: 408,
		name: "r&b",
	},
	{
		id: 409,
		name: "ragga",
	},
	{
		id: 410,
		name: "ragga hip-hop",
	},
	{
		id: 411,
		name: "ragga jungle",
	},
	{
		id: 412,
		name: "ragtime",
	},
	{
		id: 414,
		name: "ranchera",
	},
	{
		id: 415,
		name: "rap rock",
	},
	{
		id: 416,
		name: "rapcore",
	},
	{
		id: 417,
		name: "rave",
	},
	{
		id: 413,
		name: "raï",
	},
	{
		id: 418,
		name: "red song",
	},
	{
		id: 419,
		name: "reggae",
	},
	{
		id: 420,
		name: "reggaeton",
	},
	{
		id: 421,
		name: "rhythmic noise",
	},
	{
		id: 422,
		name: "ritual ambient",
	},
	{
		id: 423,
		name: "rock",
	},
	{
		id: 424,
		name: "rock and roll",
	},
	{
		id: 425,
		name: "rockabilly",
	},
	{
		id: 426,
		name: "rocksteady",
	},
	{
		id: 427,
		name: "romantic classical",
	},
	{
		id: 428,
		name: "roots reggae",
	},
	{
		id: 429,
		name: "rumba",
	},
	{
		id: 430,
		name: "ryūkōka",
	},
	{
		id: 431,
		name: "salsa",
	},
	{
		id: 432,
		name: "samba",
	},
	{
		id: 433,
		name: "schlager",
	},
	{
		id: 434,
		name: "screamo",
	},
	{
		id: 435,
		name: "shibuya-kei",
	},
	{
		id: 436,
		name: "shoegaze",
	},
	{
		id: 437,
		name: "singer-songwriter",
	},
	{
		id: 438,
		name: "ska",
	},
	{
		id: 439,
		name: "ska punk",
	},
	{
		id: 440,
		name: "skacore",
	},
	{
		id: 441,
		name: "slow waltz",
	},
	{
		id: 442,
		name: "sludge metal",
	},
	{
		id: 443,
		name: "smooth jazz",
	},
	{
		id: 444,
		name: "smooth soul",
	},
	{
		id: 445,
		name: "soca",
	},
	{
		id: 446,
		name: "soft rock",
	},
	{
		id: 447,
		name: "son cubano",
	},
	{
		id: 448,
		name: "son montuno",
	},
	{
		id: 449,
		name: "soul",
	},
	{
		id: 450,
		name: "soul jazz",
	},
	{
		id: 451,
		name: "southern rock",
	},
	{
		id: 452,
		name: "southern soul",
	},
	{
		id: 453,
		name: "space age pop",
	},
	{
		id: 454,
		name: "space rock",
	},
	{
		id: 455,
		name: "speed garage",
	},
	{
		id: 456,
		name: "speed metal",
	},
	{
		id: 457,
		name: "spoken word",
	},
	{
		id: 458,
		name: "steampunk",
	},
	{
		id: 459,
		name: "stoner metal",
	},
	{
		id: 460,
		name: "stoner rock",
	},
	{
		id: 461,
		name: "street punk",
	},
	{
		id: 462,
		name: "surf rock",
	},
	{
		id: 463,
		name: "swamp pop",
	},
	{
		id: 464,
		name: "swamp rock",
	},
	{
		id: 465,
		name: "swing",
	},
	{
		id: 466,
		name: "symphonic black metal",
	},
	{
		id: 467,
		name: "symphonic metal",
	},
	{
		id: 468,
		name: "symphonic prog",
	},
	{
		id: 469,
		name: "symphonic rock",
	},
	{
		id: 470,
		name: "symphony",
	},
	{
		id: 471,
		name: "synth-pop",
	},
	{
		id: 472,
		name: "synthwave",
	},
	{
		id: 473,
		name: "tango",
	},
	{
		id: 474,
		name: "tech house",
	},
	{
		id: 475,
		name: "technical death metal",
	},
	{
		id: 476,
		name: "techno",
	},
	{
		id: 477,
		name: "teen pop",
	},
	{
		id: 478,
		name: "thrash metal",
	},
	{
		id: 479,
		name: "thrashcore",
	},
	{
		id: 480,
		name: "timba",
	},
	{
		id: 481,
		name: "traditional country",
	},
	{
		id: 482,
		name: "trance",
	},
	{
		id: 483,
		name: "trap",
	},
	{
		id: 484,
		name: "trap edm",
	},
	{
		id: 485,
		name: "tribal ambient",
	},
	{
		id: 486,
		name: "tribal house",
	},
	{
		id: 487,
		name: "trip hop",
	},
	{
		id: 488,
		name: "turntablism",
	},
	{
		id: 489,
		name: "uk drill",
	},
	{
		id: 490,
		name: "uk funky",
	},
	{
		id: 491,
		name: "uk garage",
	},
	{
		id: 492,
		name: "underground hip hop",
	},
	{
		id: 493,
		name: "vallenato",
	},
	{
		id: 494,
		name: "vaporwave",
	},
	{
		id: 495,
		name: "viking metal",
	},
	{
		id: 496,
		name: "visual kei",
	},
	{
		id: 497,
		name: "vocal house",
	},
	{
		id: 498,
		name: "vocal jazz",
	},
	{
		id: 499,
		name: "vocal trance",
	},
	{
		id: 500,
		name: "waltz",
	},
	{
		id: 501,
		name: "west coast hip hop",
	},
	{
		id: 502,
		name: "west coast swing",
	},
	{
		id: 503,
		name: "western swing",
	},
	{
		id: 504,
		name: "yacht rock",
	},
	{
		id: 505,
		name: "yé-yé",
	},
	{
		id: 506,
		name: "zamrock",
	},
	{
		id: 507,
		name: "zeuhl",
	},
	{
		id: 508,
		name: "zouk",
	},
	{
		id: 509,
		name: "zydeco",
	},
]
export default genres
