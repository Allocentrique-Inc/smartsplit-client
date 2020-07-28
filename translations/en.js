import React from "react"

export const general = {
	forgotPassword: "Forgot password?",
	noAccount: "I don't have an account",
	or: "or",
	auth: "Two factor authentification",

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
		toDecline: "Decline",
		send: "Send my vote",
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
}

export const errors = {
	enterEmail: "Please enter your email address",
	strengthPassword: "The password must incluse at least 8 characters",
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
	invalidCurrentPassword: "Current password is incorrect. Please try again.",
	listNotFound: "List not found",
	entityNotFound: "List entity not found",
	entityConflict: "A list entity with this ID already exists",
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
		phone: "Téléphone mobile",
		organisations: "Mes sociétés",
		groups: "Groups",

		dropdowns: {
			language: "Langue",
			phone: "Téléphone mobile",
			juridiction: "Juridiction",
		},
	},

	descriptions: {
		myEmails:
			"Gather here your mail addresses with which your collaborators might invite you..",
		myProIds:
			"Here, you can add your professional identifiers in connection with the collective management companies, the Unions and the sectoral Associations for which you are a member.",
	},

	placeholders: {
		emailExample: "name@example.com",
		noCharacters: "8 characters minimum",
		confirmPassword: "Confirm your password",
		usualFirstName: "Usual First Name(s)",
		usualLastName: "Usual Last Name",
		firstName: "First Name",
		middleName: "Middle Name",
		lastName: "Name",
		artistName: "Artist Name",
		search: "Search among groups, artists or organisations...",
		organisations:
			"Search among the corporate entities, compagnies, societies...",
		delete: "delete or Delete",
		date: "DD-MM-YYYY",
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
		artistName: "If not applicable, we will desplay the full name.",
	},
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
		"A message including a validation link was emailed to you.\nDoucle check your spam. We never know!",
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

	entityCreation: "Entity creation",
	delete: "Delete",
	edit: "Edit",
	confirmEntityDeletion: "Beware, the entity will be deleted.",

	entities: {
		"content-languages": {
			name: "Content language",
		},
	},
}

export const rightSplits = {
	navbar: {
		rightSplits: "Right Splits",
		page: "Page Name",
	},
	titles: {
		copyright: () => (
			<>
				<b>COPYRIGHT</b>
			</>
		),
		performance: () => (
			<>
				<b>PERFORMANCE</b>
			</>
		),

		record: () => (
			<>
				<b>AUDIO RECORDING</b>
			</>
		),
	},
	headers: {
		whoInvent: "Who invented this musical piece?",
		whoPlay: "Who played on the audio recording?",
		whoOwn: "Who owns the audio recording?",
	},

	paragraphs: {
		copyright: () => (
			<>
				Seperate here the copyright between creators, i.e. the authors of{" "}
				<b>lyrics</b>, the composers and the mixers of <b>music</b>. It is
				common to share the copyright fairly. But you can do otherwise.
			</>
		),
		performance: () => (
			<>
				Seperate here the <b>neigbor right</b> between <b>performers</b>,
				whether musicians or singers. <i>Group</i> members share this right with
				equal splits. <i>Main artists</i> and <i>guest artists</i> share 30%,
				while the remaining 20% is split among <i>featured artists</i>, if
				applicable.
			</>
		),
		record: () => (
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
	},

	checkboxes: {
		equal: "Split evenly",
		roles: "Split according to roles",
		manual: "Manage manually",
		email: "By email",
		txt: "By SMS",
	},

	dropdowns: {
		addCollab: "Add a collaborator...",
		addLabel: "Add a label...",
		removeCollab: "Remove this collaborator",
		status: "Select a status",
		function: "Select a function...",
		agreement: "Duration of the agreement...",
		remove: "Remove this split",
		status: {
			artist: "Main artist",
			artistDefinition: 'Also called "Starred Artist" or "Solo Artist"',
			artistInvited: () => (
				<>
					Starred Artist (<i>featuring</i>)
				</>
			),
			artistInvitedDefinition:
				"Artist or group member invited to collaborate on a musical piece",
			artistMember: "Group Member",
			artistMemberDefinition:
				"Musician or singer taking part in the artistic entity.",
			artistExtra: "Accompanying Artist",
			artistExtraDefinition:
				"Engaged performer during studio recording sessions.",
		},
		collaborators: {
			producer: "Producer",
			producerDefinition:
				"External investor (not being the artist or member of the group).",
			autoProducer: "Auto-producer",
			autoProducerDefinition:
				"Artist or group member investing in the work's recording.",
			directorProducer: "Director-Producer",
			directorProducerDefinition:
				"Craftsman's investment in the direction and production of the work.",
			techProducer: "Technician-Producer",
			techProducerDefinition:
				"Technician investing in the production of the work (mixer, sound engineer).",
			studio: "Recording Studio",
			studioDefinition:
				"Entity investing its ressources in order to record the work, for pourcentage.",
			illustratorDesigner: "Illustrator / Graphic Designer",
			illustratorDesignerDefinition:
				"Person investing in the creation of visual material related to the work (cover, vidéo).",
		},
		duration: {
			oneYear: "1 year, renewable year after year",
			twoYears: "2 years, renewable year after year",
			threeYears: "3 years, renewable year after year",
			fourYears: "4 years, renewable year after year",
			fiveYears: "5 years, renewable year after year",
			renew: "Automatically renews, unless notified 60 days prior.",
		},
	},

	toi: "(you)",
	more: "Learn more",
	notify: "Notify me one month before the deadline...",

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

export const roles = {
	author: "Author",
	composer: "Composer",
	adapter: "Adapter",
	mixer: "Mixer",
	singer: "Singer",
	musician: "Musician",
}

export const summary = {
	validate: (workpiece) => <>Validate the {workpiece} split</>,
	create: (user) => <>Created by {user}</>,
	pieceCreate: "Created by",
	update: () => <>Updated ago</>,
	artistName: (artistName) => <>Created by {artistName}</>,
	version: "Version 1",

	sections: {
		copyright: "Copyright",
		performance: "Performance",
		recording: "Audio Recording",
		confidentiality: "Confidentiality",
	},

	voteStatus: {
		pending: "Waiting for decision",
		approved: "Approved",
		onGoing: "Waiting to be sent",
	},

	public: (artistName) => <>{artistName} wants to make this split public </>,
	requiredVote: "required vote",
}

export const newUserInvite = {
	title: "[Add/Modify] a Collaborating Artist",
	checkboxTitle: "Rôle(s) par défaut",
	checkboxUndertext: "These roles can always be modified later.",
}
