import React from "react"

export const general = {
	forgotPassword: "Forgot password?",
	noAccount: "I don't have an account",
	or: "or",
	me: "Me",
	auth: "Two factor authentification",
	more: "Know more",
	addFile: "Choose a file",
	dropFile: "or drop your file here",

	alerts: {
		connected: "Connected!",
		subscribed: "Subscribed!",
	},

	checkbox: {
		stayConnected: "Rester connecté",
		makePublic: "Make public my professional identifiers listed above",
		author: "Author",
		composer: "Composer",
		mixer: "Mixer",
		performer: "Performer",
		singer: "Singer",
		musician: "Musician",
	},

	languages: {
		fr: "French",
		en: "English",
	},

	buttons: {
		connect: "Connect",
		cancel: "Cancel",
		connectVote: "Connect and vote",
		registerVote: "Create my account and vote",
		facebook: "Connect with Facebook",
		google: "Connect with Google",
		accept: "I accept",
		comprendo: "Understood",
		createAccount: "Create my account",
		haveAccount: "I already have an account",
		reset: "Reset",
		backHome: "Go back to the homepage",
		save: "Save",
		send: "Send",
		nextStep: "Skip this step",
		go: "Let's go!",
		add: "Add",
		passwordChange: "Change the password",
		validNo: "Validate this number",
		confirm: "Confirm",
		checkPhone: "Validate phone number",
		addEmail: "Add an Email",
		addProId: "Add a professional identifier",
		deleteAccount: "Delete this account",
		addUsername: "Add a username",
		delete: "Delete this account",
		toAccept: "Accept",
		toRefuse: "Refuse",
		continue: "Continue",
		back: "Back",
		saveClose: "Save and Close",
		toConsult: "Consult",
		toBegin: "Begin",
		pass: "Pass for now",
		end: "Finish",
		seeSummary: "See the Summary",
		access: "Ask writing access",
	},
}
export const menu = {
	menu: "Menu",
	works: "My Musical Works",
	profile: "My Profile",
	account: "My Account",
	collaborators: "My Collaborators",
	testsForms: "Tests Forms",
	testsFormsPage: "Full Page Forms",
	tests: "Tests",
	dashboard: "Dashboard",
	logout: "Log out",
}

export const test = {
	title: "Forms Testing",
	count: "Count",
	squared: "Squared",
	addOne: "Add 1",
	subOne: "Subtract 1",
}

export const errors = {
	enterEmail: "Please enter your email address",
	invalidEmail: "Email address is invalid",
	emailAlreadyYours: "Email is already yours",
	strengthPassword: "The password must include at least 8 characters",
	samePasswords: "Both passwords must be identical",
	invalidToken:
		"The reset token is no longer valid or has expired. Please make a new password request.",
	invalidLogin: "Invalid email or password. Please try again.",
	inactiveAccount:
		"This account has yet not being activated. Please check your emails, or try to subscribe again!",
	noUser:
		"No user was found with this email address. You might have used another address ?",
	invalidDate: "Date is invalid",
	invalidPhoneNumber: "Phone number is invalid",
	password: {
		weak: "Weak password",
		average: "Average password",
		acceptable: "Acceptable password",
		emailTaken: "This email is already used. ",
		forgotEmail: "Did you forget your password?",
	},
	emailTaken: "This email is already used. ",
	forgotEmail: "Did you forget your password?",
	invalidCurrentPassword: "Current password is incorrect. Please try again.",
	listNotFound: "List not found",
	entityNotFound: "List entity not found",
	entityConflict: "A list entity with this ID already exists",
	requiredField: "Required Field",
	invalidName: "must contain only letters and numbers",
	acceptTerms: "You must accept the terms",
	invalidUrl: "Url is invalid",
}

export const publicNavbarWeb = {
	noAccount: "No account?",
	createAccount: "Create an account",
	yesAccount: "Already a member?",
	openAccount: "Open a session",
	language: "Français",
	noMember: "Not yet a member?",
	createMyAccount: "Create my account",
}

export const forms = {
	labels: {
		firstName: "First Name",
		middleName: "Middle Name",
		lastName: "Last Name",
		myEmail: "My email",
		myEmails: "My emails linked to this account",
		password: "Password",
		enterEmail: "Enter your email",
		choosePassword: "Choose your password",
		chooseNewPassword: "Choose your new password",
		confirmNewPassword: "Confirm your new password",
		currentPassword: "Current password",
		newPassword: "New password",
		repeatPassword: "Repeat your password",
		email: "Email",
		myLegalFirstName: "My Legal First Name",
		myLegalLastName: "My Legal Last Name",
		artistName: "Artist Name",
		optional: "Optional",
		legalFirstName: "Legal First Name",
		legalMiddleName: "Legal Middle Name",
		legalLastName: "Legal Last Name",
		usualFirstName: "Usual First Name",
		usualLastName: "Usual Last Name",
		civicAddress: "Civic Address",
		socanNO: "SOCAN Member #",
		ipiNO: "IPI #",
		artistiNO: "ARTISTI #",
		ipnNO: "IPN #",
		udaNO: "UDA Member #",
		gmmqNO: "GMMQ Member #",
		soproqNO: "SOPROQ Member #",
		isniNO: "My ISNI",
		myBirthday: "My birthday",
		uri: "URI",
		myUri: "My URI",
		participation: "My participation to entities",
		myProIds: "My professional identifiers",
		phone: "mobile phone",
		organisations: "My organizations",
		groups: "Groups",
		dropdowns: {
			language: "Language",
			phone: "Mobile Phone",
			juridiction: "Jurisdiction",
			addCollaborator: "Add a collaborator",
			createCollaborator: "Create a new collaborator",
			createContributor: "Create a new contributor",
			addArtist: "Add {{searchText}} as a new artist or group",
			artistTypes: {
				principal: "Main Artist",
				featured: "Guest Artist",
				bandMember: "Group Member",
				session: "Backup Artist",
			},
			artistTypesDescription: {
				principal: 'Also called "Featured Artist " or "Solo Artist"',
				featured:
					"Artist or group member invited to collaborate on a musical piece",
				bandMember: "Musician or singer taking part in the artistic entity",
				session: "Performer hired during studio recording sessions",
			},
		},
		defaultRoles: "Default Role(s)",
	},

	descriptions: {
		myEmails:
			"Gather here your mail addresses with which your collaborators might invite you..",
		myProIds:
			"Here, you can add your professional identifiers in connection with the collective management companies, the Unions and the sectoral Associations for which you are a member.",
	},
	options: {
		defaultRoles: [
			{ label: "Author", value: "author" },
			{ label: "Composer", value: "composer" },
			{ label: "Arranger", value: "arranger" },
			{ label: "Mixer", value: "mixer" },
			{ label: "Singer", value: "singer" },
			{ label: "Musician", value: "musician" },
		],
	},
	placeholders: {
		emailExample: "name@example.com",
		noCharacters: "8 characters minimum",
		confirmPassword: "Confirm your password",
		usualFirstName: "Usual First Name(s)",
		usualLastName: "Usual Last Name",
		firstName: "First Name",
		middleName: "Middle Name",
		lastName: "Last Name",
		artistName: "Artist Name",
		search: "Search among groups, artists or organisations...",
		organisations:
			"Search among the corporate entities, compagnies, societies...",
		delete: "delete or Delete",
		date: "YYYY-MM-DD",
		myUri: "https://www.my-website.example",
		groupSearch: "Search among groups...",
	},

	undertexts: {
		firstName: () => (
			<>
				Example: <i>Madonna Louise</i>
			</>
		),
		lastName: () => (
			<>
				Example: <i>Ciccone</i>
			</>
		),
		artistName: () => (
			<>
				For example, <i>Madonna</i> is the artist name of{" "}
				<i>Madonna Louise Ciccone</i>.
			</>
		),
		mainEmail: "Main email",
		setAsMain: "Set as main",
		resendConfirmEmail: "Resend confirmation email",
		defaultRoles: "These roles can always be changed later.",
	},
	addCollabArtist: "Add a collaborating artist",
	addContributor: "Add a contributing artist",
}

export const login = {
	title: "Login to your Smartsplit account.",
	subTitle: "Enter your information below.",

	toVote: {
		title: "[artistName], connect to confirm your decision.",
		subTitle:
			"You are about to sign an important contract with your collaborators, so we need you to confirm your indentity.",
	},
}

export const register = {
	title: "On the way to professionalization",
	subTitle:
		"You  are one click away from documenting your music and share your rights with your contributors.",

	toVote: {
		title: "create an account to confirm your decision.",
		subTitle:
			"You are about to sign an important contract with your collaborators, so we need you to confirm your indentity.",
	},

	conditions: {
		title: "Terms and conditions",
		paragraph: (showTerms, showPrivacy) => (
			<>
				I have read and accept the
				<link onClick={showTerms}> Terms and Conditions of use </link>
				as well as Smartsplit's
				<link onClick={showPrivacy}> Private Life Policy </link>
			</>
		),
	},
}

export const passwordIssues = {
	checkEmail: "Check your emails",
	validate:
		"A message including a validation link was emailed to you. Double check your spam. We never know!",
	reset: "Reset your password.",
	emailSent: "Email sent.",
	resetParagraph:
		"An email was sent or will be sent shortly. It includes a link to reset your password.",
	change: "Change the password",
	enterEmail:
		"Enter the email address associated to your account to get the reset link.",
	changePassword: "Change the password",
}

export const newUser = {
	title: "Welcome!\nTell us a bit about you.",
	subTitle: "Start by creating your profile.",
}

export const dashboard = {
	title: "My musical works",
	shared: "Shared with me",
	added: "My Additions",
}

export const settings = {
	settings: "Settings",
	account: "Account",
	preferences: "Preferences",
	profile: "Public Profile",
	identity: "Identité professionnelle",
	accountInfo: "Account Information",
	proIdentity: "Professionnal identity",
	notifications: "Notifications",
	security: "Security",
	deconnect: "Disconnect",
	password: "Password",
	associateEmails: "Emails associated to this account",
	delete: "Cancellation",

	subTitles: {
		documentEmails:
			"Document here different emails with which your collaborators would be susceptible to invite you.",
	},

	tab: {
		type: "Type",
		email: "Email",
		byEmail: "By e-mail",
		mobile: "Mobile",
		push: "Push",
		sms: "Text",
		bySms: "By text",

		interactions: {
			title: "General interactions",
			subTitle: "Proposals and follow-ups",
		},

		administration: {
			title: "Administrative messages",
			subTitle: "Updates, receipts, payments",
		},

		connexion: {
			title: "Account Connexion",
			subTitle: "Alerts sent at each connexion",
		},

		blog: {
			title: "Smartsplit's Blog",
			subTitle: "Educational and Informative Articles",
		},

		promos: {
			title: "Smartsplit Promotions",
			subTitle: "Get our special offers",
		},

		promoPartner: {
			title: "Partners' promotions",
			subTitle: "Get our partners' offers",
		},
	},
	emailVerificationModal: {
		title: "Add a new email address to your account",
		sent:
			"We've sent you an email to validate the address. Please check your inbox.",
	},

	emailVerificationSent: (email) => (
		<>
			<>
				Une demande de validation afin d'associer ton courriel <b>{email}</b> à
				ton compte <i>Smartsplit</i> t'a été envoyée par courriel.
			</>
			<>Vérifie tes spams. On ne sait jamais !</>
		</>
	),
}

export const deletion = {
	destroy: "Delete the account",
	warningTitle: "Please note, this operation is irreversible.",
	warningSubTitle:
		"In order to delete this account, you need to confirm your intention.",
	writeDelete:
		'Write the word "delete" below, in order to confirm your intention:',
	confirm:
		'By clicking on "confirm" below, your account will be deleted and you will be ejected from the system.',
	deleteWord: "delete",
}

export const confirmNO = {
	title: "Confirm your phone number",
	codeSent: "A code was sent to you my text message.",
	enterNO: "Enter the verification code",
	invalidCode:
		"The entered code is not valid. Make sure you are using the last one received!",
}

export const widgets = {
	pictureCrop: {
		title: "Crop Picture",
	},
}

export const admin = {
	menu: {
		listManagement: "List management",
		businessSettings: "Business settings",
		adminManagement: "Administrator management",
		myIncomes: "My incomes",
	},

	entityTypes: {
		"content-languages": "Content languages",
		"digital-distributors": "Digital distributors",
	},

	entityAttributes: {
		name: "Name",
	},

	entityCreation: "Entity creation",
	delete: "Delete",
	edit: "Edit",
	confirmEntityDeletion: "Beware, the entity will be deleted.",
}

export const workpieces = {
	original: "Original piece",
	remake: "Remake",
	addedBy: "Added by",
	updated: (time) => `Updated ${time} ago`,
	tasks: "Tasks",
	files: "Files",
	cards: {
		shareYourCopyright: {
			title: "Share your copyright",
			desc:
				"Create the shares on your rights using our guide. You'll see, it's much easier than you think :)",
		},
		protectYourWork: {
			title: "Protect your work",
			desc:
				"Associate your sound recording with its rights holders today and leave indelible traces of that on a blockchain.",
		},
		documentYourWork: {
			title: "Document your work",
			desc:
				"Make your work totally discoverable to the eyes of search engines for an increased audience.",
		},
	},
}

export const split = {
	send: "Send the rights split",
	paragraph:
		"To finalize this split, you need to invite your collaborator to validate the whole thing. Mention the email addresses to whom send your split proposition.",
	email: "Enter the email address",
}

export const identity = {
	title: "Identity Declaration",
	Ideclare: (firstName, lastName) => (
		<>
			<b>
				I declare to be truly {firstName} {lastName}
			</b>
			. I understand that pretending to be someone else would constitute a
			serious violation liable to prosecution.
		</>
	),
	Iaccept: (workpiece) => (
		<>
			<b>I accept this right splits</b> intervened between myself and any
			collaborator. This represents the desired agreement. I understand that
			these percentages will now apply to any revenue split related to
			{workpiece}.
		</>
	),
}

export const rightSplits = {
	navbar: {
		rightSplits: "Right Split",
		page: "Page Name",
	},
	copyright: {
		title: "Copyright",
		header: "Who invented this musical piece ?",
		description: () => (
			<>
				Seperate here the copyright between creators, i.e. the authors of{" "}
				<b>lyrics</b>, the composers and the mixers of <b>music</b>. It is
				common to share the copyright fairly. But you can do otherwise.
			</>
		),
	},
	performance: {
		title: "Performance",
		header: "Who played on the audio recording?",
		description: () => (
			<>
				Seperate here the <b>neighbor right</b> between <b>performers</b>,
				whether musicians or singers. <i>Group</i> members share this right with
				equal splits. <i>Main artists</i> and <i>guest artists</i> share 80%,
				while the remaining 20% is split among <i>featured artists</i>, if
				applicable.
			</>
		),
		artistTypes: {
			principal: {
				name: "Main Artist",
				desc: 'Also called "Featured Artist " or "Solo Artist"',
			},
			featured: {
				name: "Guest Artist",
				desc:
					"Artist or group member invited to collaborate on a musical piece",
			},
			bandMember: {
				name: "Group Member",
				desc: "Musician or singer taking part in the artistic entity",
			},
			session: {
				name: "Backup Artist",
				desc: "Performer hired during studio recording sessions",
			},
		},
	},
	recording: {
		title: "Sound recording",
		header: "Who owns the audio recording ?",
		description: () => (
			<>
				Seperate here the <b>neighbor right</b> of <b>producers</b>, i.e. those
				who invested their time and/or their money to record and finalize the
				product to be commercialized.
				{"\n"}
				{"\n"}
				It is common pratice to share this right in equal parts or in pro bono
				of the investment.
			</>
		),

		functions: {
			producer: "Producer",
			autoProducer: "Auto-producer",
			directorProducer: "Director-Producer",
			techProducer: "Technician-Producer",
			studio: "Recording Studio",
			illustratorDesigner: "Illustrator / Graphic Designer",
		},
		functionDefs: {
			producer:
				"External investor (not being the artist or member of the group).",
			autoProducer: "Artist or group member investing in the work's recording.",
			directorProducer:
				"Craftsman's investment in the direction and production of the work.",
			techProducer:
				"Technician investing in the production of the work (mixer, sound engineer).",
			studio:
				"Entity investing its ressources in order to record the work, for pourcentage.",
			illustratorDesigner:
				"Person investing in the creation of visual material related to the work (cover, vidéo).",
		},
	},
	radios: {
		equal: "Split evenly",
		roles: "Split according to roles",
		manual: "Manage manually",
		email: "By email",
		txt: "By SMS",
	},
	yourself: "(you)",
	more: "Learn more",
	notify: "Notify me one month before the deadline...",
	music: "Music",
	lyrics: "Lyrics",
	addCollab: "Add a collaborator...",
	addLabel: "Add a label...",
	removeCollab: "Remove this collaborator",
	status: "Select a status...",
	function: "Select a function...",
	agreement: "Duration of the agreement...",
	remove: "Remove this split",
	roles: {
		author: "Author",
		composer: "Composer",
		adapter: "Adapter",
		mixer: "Mixer",
		singer: "Singer",
		musician: "Musician",
	},
	dropdowns: {
		duration: {
			oneYear: "1 year, renewable year after year",
			twoYears: "2 years, renewable year after year",
			threeYears: "3 years, renewable year after year",
			fourYears: "4 years, renewable year after year",
			fiveYears: "5 years, renewable year after year",
			renew: "Automatically renews, unless notified 60 days prior.",
		},
	},

	errors: {
		status: "You need to select a status for this right holder.",
		role: "You need to select at least one role for this rightholder.",
		function: "You need select a function for this rightholder.",
		option: "You need to select an option for this rightholder.",
	},

	tooltips: {
		equal:
			'Divide the copyright by the number of people and assigns the role "Author-Composer" by default to everyone. This way of spliting copyright avoids many arguments between creators, particularly when money starts to come in. ;)',
		role:
			'Divide the copyright by two: 50% goes to those who composed music. This last "music" part is then divided by the number of selected roles and the collaborators get a pourcentage according to their implication. For exemple: Alice only composes, whereas Bob composes AND arranges music. So Alice has 1/3 and Bob 2/3 of music.',
		manual:
			"Lets you determine the pourcentage and the roles for every collaborators. To fix a pourcentage to a collaborator, you can use the lock.",
		label:
			"A general rule is that a label rarely takes more than 50% of rights and incomes on audio recording proprety.",
	},
}

export const newUserInvite = {
	title: "[Add/Modify] a Collaborating Artist",
	checkboxTitle: "Rôle(s) par défaut",
	checkboxUndertext: "These roles can always be modified later.",
}

export const document = {
	navbar: {
		document: "Document my work",
		pages: {
			creation: "Creation",
			performance: "Performance",
			release: "Release",
			infos: "General Information",
			lyrics: "Lyrics",
			recording: "Recording",
			files: "Files",
			links: "Listening links",
		},
	},
	add: "Add ",
	help: "Help",
	why: "Why share these informations?",
	access: "Access",
	pieceType: {
		remix: "Remix",
		original: "Original",
	},
	creation: {
		category: "CREATION",
		title: "Who participated in the creation of {{workpiece}}?",
		paragraph:
			"Here you mention who contributed to the creation of this piece.",
		date: "Creation Date",
		roles: {
			authors: "Authors",
			authorsWho: "Who write the lyrics of this musical piece?",
			addAuthor: "Add an author...",
			composers: "Composers",
			composersWho: "Who composed the music of this musical piece ?",
			addComposer: "Add a composer...",
			publishers: "Publishers",
			publishersWho: "Who represent these authors and/or composers?",
			addPublisher: "Add a publisher...",
		},
		iswc: "ISWC Code",
		what: "What's a creator?",
	},
	performance: {
		category: "PERFORMANCE",
		title: "Who performed the musical piece on this audio recording?",
		paragraph: "Here you mention who played which instrument.",
		roles: {
			artist: "Artist",
			singer: "Singer",
			musician: "Musician",
			addPerformer: "Add a performer...",
		},
		vocals: {
			mainVocals: "main vocals",
			backupVocals: "backup vocals",
		},
		what: "What's a performer?",
		whichPerformance: "Which type of performance?",
		whichRole: "Which role in the musical piece?",
		addInstrument: "Add an instrument...",
		addInstrumentDropdown: "Ajouter {{search}} comme instrument",
		artistTypes: {
			mainArtist: "Main Artist",
			featured: "Guest Artist",
			groupMember: "Group Member",
			session: "Session Artist",
		},
		artistTypesDescription: {
			mainArtist: 'Also called "Featured Artist " or "Solo Artist"',
			featured:
				"Artist or group member invited to collaborate on a musical piece",
			groupMember: "Musician or singer taking part in the artistic entity",
			session: "Performer hired during studio recording sessions",
		},
	},

	recording: {
		category: "RECORDING",
		title: "Who recorded the musical piece?",
		paragraph:
			"Here you mention who contributed to the audio recording of this piece.",
		roles: {
			direction: "Direction",
			addDirector: "Add a Director...",
			soundEngineer: "Sound Engineer",
			addSoundEngineer: "Add a Sound Engineer...",
			mix: "Mix",
			addMix: "Add a Mix Engineer...",
			master: "Mastering",
			addMaster: "Add a Mastering Engineer...",
			production: "Production",
			addProduction: "Add a Producer",
		},
		date: "Recording  Date",
		studio: "Recording Studio",
		searchStudio: "Search a recording studio...",
		isrc: "ISRC Code",
		tooltips: {
			isrc:
				"The International Standard Work Code is a unique identification of musical works.",
		},
	},

	release: {
		category: "RELEASE",
		title: "Was this piece released?",
		paragraph:
			"Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.",
		date: "Release Date",
		dateHint: "Leave blank if undetermined",
		label: "Label",
		addLabel: "Add a label",
		format: "Product Format",
		ep: "EP Title",
		supports: {
			support: "Support",
			digital: "Digital",
			distribution: "Distribution",
			addDistribution: "Add a distributor...",
			upc: "UPC/EAN Code",
			physical: "Physical",
		},
	},
	files: {
		category: "FILES",
		title: "Which version of the work would you like to protect?",
		paragraph: "Here you can add the files related to this musical piece.",
		visual: {
			title: "Work Visual",
			paragraph:
				"Just like an album has its cover, a song or a instrumental piece must also have a visual to represent it.",
			format: "Upload in JPEG or PNG format",
			undertext: "Recommended: 16000 x 1600 pixels of a resolution of 300 dpi.",
		},
		audio: {
			title: "Audio File",
			subTitle: "Choose a file to make accessible",
			paragraph:
				"Here, you can make your piece accessibile in WAV ou MP3 format.",
			undertext: "MP3 or WAV accepted.",
			addFile: "Add a file",
		},
		other: {
			title: "Other files on the work",
			paragraph:
				"Here you can add documents allowing the performance of the work, like the partition or the MIDI file.",
			formatTablature: "Partition or Tablature",

			formatMidi: "MIDI Files",
			undertext: "Lorem Ipsum",
		},
		dropdownDownloads: {
			public: "Public - Downloadable by all",
			publicUndertext: "All users are able to download the original file.",
			invitation: "On invitation - Downloadable by some",
			invitationUndertext:
				"Only users with the unique sharable link can download.",
			private: "Private - Prevent the download",
			privateUndertext: "No one except you can download the original image.",
		},
		dropdownAccess: {
			public: "Public - Make the information visible for all",
			publicUndertext: "All users can have access to this information",
			invitation: "On invitation - Visible for some",
			invitationUndertext:
				"Only users with the unique sharable link will have access to the information. Practical for reporters!",
			private: "Private -  Make the information private",
			privateUndertext:
				"No one, except you and the project's collaborators will have access to the information.",
		},
		tooltip: {
			listItem:
				"If the file was already added, put a list item with the corresponding file rather than a form-upload.",
		},
		access: "Access",
		copy: "Unique sharable link copied.",
		note:
			"Si le fichier a déjà été ajouté, mettre un list item avec le fichier correspondant plutôt qu'un form-upload. Sinon simplement mettre le formulaire.",
	},
	infos: {
		category: "GENERAL INFORMATIONS",
		title: "Tells us more about the musical piece.",
		length: "Length",
		bpm: "BPM",
		mainGenre: "Main Genre",
		addGenre: "Add a genre...",
		secondaryGenre: "Secondary Genres",
		influence: "Influences",
		addInfluence: "Add an influence...",
		influenceExample: "Example: The Beatles, Dr Dre, Mozart, Brel, Stromae.",
	},
	lyrics: {
		category: "LYRICS",
		title: "{{workpiece}} contains lyrics?",
		paragraph:
			"Words in a song are excellent descriptive data on the work that increases its discoverability and the chances to expand your audience.",
		undertext:
			"Lyrics only. Do not include authors, composers, year of creation, etc.",
		language: "Language(s)",
		addLanguage: "Add a language...",
		dropdown: {
			public: "Public - Make the information public",
		},
	},
	links: {
		category: "LISTENING LINKS",
		title: "Was the musical piece already broadcasted?",
		paragraph:
			"To increase the chances for your piece to be  discovered  and listened to, document listening links and  online purchase.",
		addLink: "Paste a link...",
		createPlatform: "Add a platform",
		addPlatform: "Add a platform...",
	},
	finalModal: {
		header: "Documentation created!",
		title: "{{workpiece}} is now documented!",
		paragraph:
			"You are one click away being able to publish the credits of this piece on a webpage and therefore increase your discoverability in data web.",
	},
}
export const protect = {
	completed: "Completed",
	navbar: {
		protect: "Protect your work",
		pages: {
			selection: "Select",
			certificate: "Review the certificate",
		},
	},
	help: "Help",
	promo: {
		heading: "Protect your work",
		title: "Encrypted each file of your creation to preserve its authorship",
		description:
			"Description of the feature. Feature description here again. Description of the feature.",
		codeTitle: "Did you receive a promo code?",
		codePlaceHolder: "Enter your promo code",
		buy: "Buy     {{price}} $",
		validCode: "valid code",
		codeValueContent:
			"Luck smiles at you! <br /> <br /> Thanks to the Guilde des Musiciennes et Musiciennes du Québec, this code allows you to use all the features free of charge for another <b> {{hoursRemaining}} days </b>, that is until {{expired}}",
		applyThisCredit: "Apply this credit",
		amountRemaining: "You have $ {{amount}} left in the bank",
		creditApplied: "Credit applied!",
		dollarOfCredit: "-{{price}} $ of your credits",
		findOutMore: "Find out more",
	},
	selection: {
		heading1: "Which version of the work would you like to protect?",
		para1: "Here, you send your work to a computer encoder.",
		para2:
			"The algorithm behind this page will take your artwork and create a unique digital fingerprint from it called a",
		heading2: "File to protect",
		addFileLabel: "Add a file",
		underText:
			".Pdf, jpeg, .png, .wav or .mp3 formats accepted. 250 MB maximum.",
		customName: "Custom Name",
		fileCategory: "File Category",
		examplesCategories:
			"Examples of categories: Musical piece, Score, Tabs, MIDI file, ertc.",
		heading3: "Working version",
		workingVersionDesc:
			"For a song, the working versions are for example: Idea, Demo, Mix, Master.",
		idea: "Idea",
		demo: "Demo",
		roughMix: "Rough Mix",
		finalMaster: "Final version (mastered)",
		help: "HELP",
		heading4: "Why protect my work?",
		desc:
			"Registering your work on the blockchain with <i> Smartsplit </i> is equivalent to sending it by registered mail to yourself in order to be able to demonstrate your authorship if necessary",
		heading5: "Choose a custom name",
		why: "Why protect my work?",
		whyContent:
			"Registering your work on the blockchain with Smartsplit is equivalent to sending it by registered mail to yourself in order to be able to demonstrate your parternity if necessary.",
		alertNoSuportFile:
			"The file type is not supported or the file size is larger than allowed.",
	},
	certificate: {
		heading1: "Review your certificate",
		para1:
			"Tu es sur le point d’envoyer de façon irréversible sur la blockchain la preuve que tu es bel et bien lié à ce fichier.",
		musicalPiece: "Musical piece",
		sourceFile: "Source file",
		why: "The importance of studying well",
		whyContent:
			"It is important to carefully review the information on this page.<br>Data on the person submitting the file will be associated with the file in an indelible and irreversible manner.",
		format: "Format",
		versionName: "Version name",
		workingVersion: "Working version",
		listedBy: "Filed by",
		identity: "Identity",
		completeIdentity: "Complete my identity",
		completeIdDesc:
			"This information is used to specify your identity in order to correctly associate it with your file. These will be encrypted to protect your privacy.",
		fileDigitalFingerprints: "File digital fingerprints",
		viewEncryption: "View digital encryption",
		notEnoughInfo: "No date of birth or email yet.",
		sha256: "SHA256",
		md5: "MD5",
		addiction: "Addiction",
		addBirth: "Add date of birth",
		addBirthFieldTitle: "{{name}} Date of Birth",
		addBirthUnderText:
			"This information is to identify you as a unique individual and will remain private.",
		save: "Save",
		await: "Awaiting publication",
		post: "Posted on {{publishedDate, LL}} by {{author}} · ",
		viewCertificate: "View certificate",
		addPlaceBirth: "Add a place of birth",
		addEmailModal: "Email of {{name}}",
		addPlaceBirthUnderText:
			"This information is used to associate your identity with the file and will remain confidential.",
		edit: "Edit",
		category: "Category",
	},
	verify1:
		"<b> I declare that I am actually {{firstName}} </b>. I understand that impersonating someone else would constitute serious misconduct liable to prosecution.",
	verify2:
		"<b> I take full responsibility </b> to keep the following file in my personal archives: <br> {{file}}",
	verify3:
		"<b> I understand </b> that this file is the one and only key to demonstrate the parternity and the anteriority of the musical piece {{song}}.",
	publishOnBlockchain: "Publish on the blockchain",
	beforePosting: "Before publishing it all ...",
	btnPublishFinal: "View certificate",
}
export const collaborators = {
	email: "Collaborator's email address",
}
export const contributors = {
	add: "Add a Contributor",
}
export const copyrightOrgs = {
	public: "Make public my professional identifiers",
	select: "Select A Professional Organisation",
	name: {
		socan: "Socan",
		socandr: "Socan DR",
		spacq: "SPACQ",
		apem: "APEM",
		soproq: "SOPROQ",
		adisq: "ADISQ",
		artisti: "Artisti",
		uda: "UDA",
		gmmq: "GMMQ",
		cmrra: "CMRRA",
		sac: "SAC",
		cmpa: "CMPA",
		re_sound: "Re:Sound",
		connect: "Connect",
		cima: "CIMA",
		actraracs: "ACTRA RACS",
		mroc: "MROC",
		actra: "ACTRA",
		cfm: "CFM",
	},
	description: {
		socan: "Society of Composers, Authors and Music Publishers of Canada",
		socandr: "Society of Composers, Authors and Music Publishers of Canada",
		spacq: "Société professionnelle des auteurs et des compositeurs du Québec",
		apem: "Association des professionnels de l'édition musicale",
		soproq:
			"Société de gestion collective des droits des producteurs de phonogrammes et vidéogrammes du Québec",
		adisq:
			"Association québécoise de l'industrie du disque, du spectacle et de la vidéo",
		artisti:
			"Société de gestion collective de l'Union des artistes (UDA) pour la rémunération des droits voisins des artistes interprètes (chanteurs et musiciens)",
		uda: "Union des artistes",
		gmmq: "Guilde des musiciens et des musiciennes du Québec",
		cmrra: "Canadian Musical Reproduction Rights Agency",
		sac: "Songwriters Association of Canada",
		cmpa: "Music Publisher Canada",
		re_sound:
			"Music Licensing Company (formerly known as Neighbouring Rights Collective of Canada)",
		connect: "Connect Music Licensing (formerly known as the AVLA)",
		cima: "Canadian Independent Music Association",
		actraracs: "ACTRA Recording Artists' Collecting Society",
		mroc: "Musicians' Rights Organization Canada",
		actra: "Alliance of Canadian Cinema, Television and Radio Artists",
		cfm:
			"Canadian Federation of Musicians (formerly referred to as AFM Canada)",
	},
	action: {
		socan: "Performance rights of musical works",
		socandr: "Reproduction rights of musical works",
		spacq: "Nomenclature",
		apem: "Sectoral representation of publishers",
		soproq: "Neighboring rights of producers",
		adisq: "Sectoral representation of producers",
		artisti: "Neighboring rights of performers",
		uda: "Union of singers and choristers",
		gmmq: "Union of musicians and instrumentalists",
		cmrra: "Reproduction rights of musical works",
		sac: "Creators' sectoral association",
		cmpa: "Publishers' sectoral association",
		re_sound: "Sound recording owners' neighbour rights",
		connect: "Sound recording owners' neighbour rights",
		cima: "Sound recording owners' sectoral association",
		actraracs: "Performers' neighbour rights",
		mroc: "Performers' neighbour rights",
		actra: "Vocalists' professional union",
		cfm: "Musicians' professional union",
	},
}

export const workpieceSheet = {
	by: "by",
	creation: {
		header: "Creation",
		date: "Creation Date",
		authors: "Auteurs",
		composers: "Composers (Music)",
		arrangers: "Arrangers (Music)",
		publishers: "Publishers",
	},
	performance: {
		header: "Performance",
		star: "Starring Artist",
		musician: {
			musician: "Musicien",
			solo: "Solist",
		},
		singer: "Singer",
	},
	recording: {
		header: "Audio Recording",
		title: "Title of the track",
		director: "Directors",
		tech: "Recording Technicians",
		mix: "Mixing",
		mastering: "Mastering",
		production: "Production",
		studio: "Recording Studio",
	},
	release: {
		header: "Release",
		date: "Release Date",
		format: "Product Format",
		title: "Product Title",
	},
	info: {
		header: "General Information",
		length: "Length",
	},
	stream: {
		header: "Listen",
	},
	download: {
		header: "Downloads",
		visual: "Work Visual",
		audio: "Audio File",
		partition: "Partition/Tablature",
		midi: "MIDI Files",
		download: "Download",
		copy: "Copy the link",
		copied: "Copied",
		access: "Ask for access",
	},
	lyrics: {
		header: "Lyrics",
		check: "See the lyrics",
	},
}
