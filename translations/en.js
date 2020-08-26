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
		toRefuse: "Refuse",
		toConsult: "Consult",
		toBegin: "Begin",
		continue: "Continue",
		back: "Back",
		saveClose: "Save and Close",
		pass: "Pass for now",
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
			addCollaborator: "Add a collaborator",
			createCollaborator: "Create a new collaborator",
		},
		defaultRoles: "Default Role(s)",
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
		defaultRoles: "These roles can always be changed later.",
	},
	addCollabArtist: "[Add/Modify] a collaborating artist",
	options: {
		defaultRoles: [
			{
				displayValue: "Author",
				value: "author",
			},
			{
				displayValue: "Compositor",
				value: "compositor",
			},
			{
				displayValue: "Arranger",
				value: "arranger",
			},
			{
				displayValue: "Interpreter",
				value: "interpreter",
			},
		],
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
	Iaccept: (workPiece) => (
		<>
			<b>I accept this right splits</b> intervened between myself and any
			collaborator. This represents the desired agreement. I understand that
			these percentages will now apply to any revenue split related to
			{workPiece}.
		</>
	),
}

export const document = {
	navbar: {
		document: "Document my work",
		pages: {
			creation: "Creation",
			performance: "Performance",
		},
	},
	help: "Help",
	creation: {
		category: "CREATION",
		title: (workPiece) => <>Who participated in the creation of {workPiece}?</>,
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
			editors: "Editors",
			editorsWho: "Who represent these authors and/or composers?",
			addEditor: "Add an editor...",
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
		what: "What's a performer?",
		whichPerformance: "Which type of performance?",
		whichRole: "Which role in the musical piece?",
		addInstrument: "Add an instrument...",
	},
}
