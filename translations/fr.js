import React from "react"

export const general = {
	forgotPassword: "Mot de passe oublié ?",
	noAccount: "Je n'ai pas de compte",
	or: "ou",
	auth: "Authentification à deux facteurs",

	alerts: {
		connected: "Connecté !",
		subscribed: "Inscrit !",
	},

	checkbox: {
		stayConnected: "Rester connecté",
		makePublic:
			"Rendre publics mes identifiants professionnels énumérés ci-dessus",
		author: "Auteur",
		composer: "Compositeur",
		mixer: "Arrangeur",
		performer: "Interprète",
	},

	languages: {
		fr: "Français",
		en: "Anglais",
	},

	buttons: {
		connect: "Me connecter",
		cancel: "Annuler",
		connectVote: "Me connecter et voter",
		registerVote: "Créer mon compte et voter",
		facebook: "Connexion avec Facebook",
		google: "Connexion avec Google",
		accept: "J'accepte",
		comprendo: "J'ai compris",
		createAccount: "Créer mon compte",
		haveAccount: "J'ai déjà un compte",
		reset: "Réinitialiser",
		backHome: "Retourner à la page d'accueil",
		save: "Sauvegarder",
		send: "Envoyer",
		nextStep: "Passer cette étape",
		go: "C'est parti !",
		add: "Ajouter",
		passwordChange: "Changer le mot de passe",
		validNo: "Valider ce numéro",
		checkPhone: "Valider le numéro",
		confirm: "Confirmer",
		addEmail: "Ajouter un courriel",
		addProId: "Ajouter un identifiant",
		deleteAccount: "Détruire ce compte",
		addUsername: "Ajouter un identifiant",
		delete: "Détruire ce compte",
		toAccept: "Accepter",
		toRefuse: "Refuser",
		toConsult: "Consulter",
		toBegin: "Commencer",
		continue: "Continuer",
		back: "Retour",
		saveClose: "Sauvegarder et fermer",
		pass: "Passer pour l'instant",
	},
}

export const menu = {
	menu: "Menu",
	works: "Mes pièces musicales",
	profile: "Mon profil",
	account: "Mon compte",
	collaborators: "Mes collaborateurs",
	testsForms: "Tests Formulaires",
	testsFormsPage: "Formulaires pleine page",
	tests: "Tests",
	dashboard: "Tableau de bord",
	logout: "Déconnexion",
}

export const test = {
	title: "Test des formulaires",
}

export const errors = {
	enterEmail: "Vous devez entrer votre adresse courriel",
	strengthPassword: "Le mot de passe doit comporter au moins 8 caractères",
	samePasswords: "Les deux mots de passe doivent être identiques",
	invalidToken:
		"Le jeton de réinitialisation n'est plus valide, ou a expiré. Veuillez effectuer une nouvelle demande de réinitialisation de mot de passe.",
	invalidLogin:
		"Adresse courriel ou mot de passe invalide. Veuillez réessayer.",
	inactiveAccount:
		"Ce compte n'a pas encore été activé. Vérifie tes courriels, ou essaie de t'inscrire à nouveau !",
	noUser:
		"Aucun utilisateur n'a été trouvé avec cette adresse courriel. Peut-être avez-vous utilisé une autre addresse ?",
	invalidDate: "Date invalide",
	invalidPhoneNumber: "Numéro de téléphone invalide",
	password: {
		weak: "Mot de passe faible",
		average: "Mot de passe moyen",
		acceptable: "Mot de passe acceptable",
		emailTaken: "Ce courriel est déjà utilisé. ",
		forgotEmail: "As-tu oublié ton mot de passe ?",
	},
	invalidCurrentPassword: "Mot de passe actuel incorrect. Veuillez réessayer.",
	listNotFound: "Liste introuvable",
	entityNotFound: "Élement de la liste introuvable",
	entityConflict: "ID déjà utilisé",
}

export const publicNavbarWeb = {
	noAccount: "Pas de compte ?",
	createAccount: "Créer un compte",
	yesAccount: "Déjà membre ?",
	openAccount: "Ouvrir une session",
	language: "English",
	noMember: "Pas encore membre ?",
	createMyAccount: "Créer mon compte",
}

export const forms = {
	labels: {
		myEmail: "Mon courriel",
		myEmails: "Mes courriels liés à ce compte",
		password: "Mot de passe",
		enterEmail: "Entre ton courriel",
		choosePassword: "Choisis ton mot de passe",
		chooseNewPassword: "Choisis ton nouveau mot de pasee",
		confirmNewPassword: "Confirme ton nouveau ton mot de passe",
		currentPassword: "Mot de passe actuel",
		newPassword: "Nouveau mot de passe",
		repeatPassword: "Répète ton mot de passe",
		email: "Email",
		myLegalFirstName: "Mon prénom légal",
		myLegalLastName: "Mon nom légal",
		artistName: "Nom d'artiste",
		optional: "Optionnel",
		legalFirstName: "Prénom légal",
		legalMiddleName: "Second prénom légal",
		legalLastName: "Nom légal",
		usualFirstName: "Prénom usuel",
		usualLastName: "Nom usuel",
		civicAddress: "Adresse civique",
		socanNO: "Membre SOCAN",
		ipiNO: "Mon IPI",
		artistiNO: "Membre ARTISTI",
		ipnNO: "Mon IPN",
		udaNO: "Membre UDA",
		gmmqNO: "Membre GMMQ",
		soproqNO: "Membre SOPROQ",
		isniNO: "Mon ISNI",
		myBirthday: "Ma date de naissance",
		uri: "URI",
		myUri: "Mon URI",
		participation: "Mes participations à des entités",
		myProIds: "Mes identifiants professionels",
		phone: "Téléphone mobile",
		organisations: "Mes sociétés",
		groups: "Groupes",
		dropdowns: {
			language: "Langue",
			phone: "Téléphone mobile",
			juridiction: "Juridiction",
		},
		defaultRoles: "Rôle(s) par défaut",
	},

	descriptions: {
		myEmails:
			"Centralise ici les différents courriels avec lesquels tes collaborateurs seraient susceptibles de t’inviter.",
		myProIds:
			"Ici, tu peux ajouter tes identifiants professionnels en lien avec les Sociétés de gestion collectives, les Syndicats et les Associations sectorielles pour lesquelles tu es membre.",
	},

	placeholders: {
		emailExample: "nom@example.com",
		noCharacters: "8 caractères minimum",
		confirmPassword: "Confirm your password",
		usualFirstName: "Prénom(s) usuel(s)",
		usualLastName: "Nom de famille usuel",
		firstName: "Prénom",
		middleName: "Second prénom",
		lastName: "Nom",
		artistName: "Nom d'artiste",
		search: "Recherche parmi les groupes, artistes ou sociétés...",
		organisations:
			"Rechercher parmi les entités corporatives, entreprises, sociétés...",
		delete: "détruire, Détruire ou detruire",
		date: "JJ-MM-AAAA",
		myUri: "https://www.mon-site-web.exemple",
		groupSearch: "Rechercher parmi les groupes...",
	},

	undertexts: {
		firstName: () => (
			<>
				Exemple: <i>Madonna Louise</i>
			</>
		),
		lastName: () => (
			<>
				Exemple: <i>Ciccone</i>
			</>
		),
		artistName: () => (
			<>
				Par exemple, <i>Madonna</i> est le nom d'artiste de{" "}
				<i>Madonna Louise Ciccone</i>.
			</>
		),
		mainEmail: "Courriel principal",
		setAsMain: "Définir comme principal",
		resendConfirmEmail: "Renvoyer le courriel de confirmation",
		defaultRoles: "Ces rôles pourront toujours être modifiés plus tard.",
	},
	addCollabArtist: "[Ajouter/Modifier] un artiste collaborateur",
	options: {
		defaultRoles: [
			{
				displayValue: "Auteur",
				value: "author",
			},
			{
				displayValue: "Compositeur",
				value: "compositor",
			},
			{
				displayValue: "Arrangeur",
				value: "arranger",
			},
			{
				displayValue: "Interprète",
				value: "interpreter",
			},
		],
	},
}

export const login = {
	title: "Connecte-toi à ton compte Smartsplit.",
	subTitle: "Entre tes informations ci-dessous.",

	toVote: {
		title: "connecte-toi pour confirmer ta décision.",
		subTitle:
			"Tu es sur le point de signer un contrat important avec tes collaborateurs, nous avons donc besoin de confirmer ton identité.",
	},
}

export const register = {
	title: "En route vers la professionnalisation",
	subTitle:
		"Tu es à un clic de pouvoir documenter ta musique et de partager tes droits avec tes contributeurs.",

	toVote: {
		title: "créer un compte pour confirmer ta décision.",
		subTitle:
			"Tu es sur le point de signer un contrat important avec tes collaborateurs, nous avons donc besoin de confirmer ton identité.",
	},

	conditions: {
		title: "Termes et conditions",
		paragraph: (showTerms, showPrivacy) => (
			<>
				J'ai lu et j'accepte les
				<link onClick={showTerms}> Termes et conditions d'utilisation </link>
				et la
				<link onClick={showPrivacy}> Politique sur la vie privée </link>
				de Smartsplit
			</>
		),
	},
}

export const passwordIssues = {
	checkEmail: "Check your emails",
	validate:
		"Un message incluant un lien de validation de ton compte t'a été envoyé par courriel.\nVérifie tes spams. On ne sait jamais !",
	reset: "Réinitialise ton mot de passe.",
	emailSent: "Courriel envoyé.",
	resetParagraph:
		"Un courriel a été envoyé ou sera envoyé sous peu. Il contient un lien de réinitialisation de ton mot de passe.",
	change: "Changer le mot de passe",
	enterEmail:
		"Saisis l'adresse courriel lié à ton compte pour obtenir le lien de réinitialisation.",
	changePassword: "Changer le mot de passe",
}

export const newUser = {
	title: "Bienvenue !\nParle-nous un peu de toi.",
	subTitle: "Commence à créer ton profil.",
}

export const dashboard = {
	title: "Mes pièces musicales",
	shared: "Partagées avec moi",
	added: "Mes ajouts",
}

export const settings = {
	settings: "Paramètres",
	account: "Compte",
	preferences: "Préférences",
	profile: "Profil",
	identity: "Identité professionnelle",
	accountInfo: "Informations du compte",
	proIdentity: "Identité professionelle",
	notifications: "Notifications",
	security: "Sécurité",
	deconnect: "Déconnecté",
	password: "Mot de passe",
	associateEmails: "Courriels associés à ce compte",
	delete: "Résiliation",

	subTitles: {
		documentEmails:
			"Documente ici les différents courriels avec lesquels tes collaborateurs seraient susceptibles de t'inviter.",
	},

	tab: {
		type: "Type",
		email: "Courriel",
		byEmail: "Par courriel",
		mobile: "Mobile",
		push: "Push",
		sms: "Texto",
		bySms: "Par texto",

		interactions: {
			title: "Interactions générales",
			subTitle: "Propositions et suivis d'avants droit",
		},

		administration: {
			title: "Messages administratifs",
			subTitle: "Mises à jour, reçus, paiements",
		},

		connexion: {
			title: "Connexion au compte",
			subTitle: "Alerte envoyée à chaque connexion",
		},

		blog: {
			title: "Blog de Smartsplit",
			subTitle: "Articles informatifs et éducatifs",
		},

		promos: {
			title: "Promotions Smartsplit",
			subTitle: "Recevoir nos offres spéciales",
		},

		promoPartner: {
			title: "Promotions partenaires",
			subTitle: "Recevoir les offres de nos partenaires",
		},
	},

	emailVerificationModal: {
		title: "Associe un nouveau courriel à ton compte",
		body: (email) => (
			<>
				<>
					Une demande de validation afin d'associer ton courriel <b>{email}</b>{" "}
					à ton compte <i>Smartsplit</i> t'a été envoyée par courriel.
				</>
				<>Vérifie tes spams. On ne sait jamais !</>
			</>
		),
	},
}

export const deletion = {
	destroy: "Détruire le compte",
	warningTitle: "Attention, cette opération est irréversible.",
	warningSubTitle:
		"Afin de détruire ce compte, tu dois confirmer ton intention.",
	writeDelete:
		"Écris le mot « détruire » ci-dessous, afin de confirmer ton intention :",
	confirm:
		"En cliquant sur « confirmer » plus bas, ton compte sera supprimé et tu seras éjecté du système.",
	deleteWord: "detruire",
}

export const confirmNO = {
	title: "Valider ton numéro de téléphone",
	codeSent: "Un code t'a été envoyé par message texte.",
	enterNO: "Entre le code de vérification",
	invalidCode:
		"Le code entré est invalide ou a expiré. Assure toi d'utiliser le dernier code qui t'as été envoyé!",
}

export const widgets = {
	pictureCrop: {
		title: "Recadre ta photo",
	},
}

export const admin = {
	menu: {
		listManagement: "Gestion des listes",
		businessSettings: "Paramètres d'affaires",
		adminManagement: "Gestion des administrateurs",
		myIncomes: "Mes revenus",
	},
	entityTypes: {
		"content-languages": "Langues du contenu",
		"digital-distributors": "Distributeurs numériques",
	},
	entityCreation: "Création d'une entité",
	delete: "Supprimer",
	edit: "Modifier",
	confirmEntityDeletion: "Attention, l'entité va être supprimée.",
}

export const workpieces = {
	original: "Pièce originale",
	remake: "Reprise",
	addedBy: "Ajoutée par",
	updated: (time) => `Mis à jour il y a ${time}`,
	tasks: "Tâches",
	files: "Fichiers",
	cards: {
		shareYourCopyright: {
			title: "Partage tes droits",
			desc:
				"Crée les partages sur tes droits à l’aide de notre guide. Tu vas voir, c’est beaucoup plus simple que tu ne le crois :)",
		},
		protectYourWork: {
			title: "Protège ton oeuvre",
			desc:
				"Associe dès aujourd’hui ton enregistrement sonore à ses ayant droits et laisse des traces indélébiles de ça sur une blockchain.",
		},
	},
}

export const split = {
	send: {
		title: "Envoyer le partage de droits",
		paragraph:
			"Pour finaliser ce partage, tu dois inviter tes collaborateurs à valider le tout. Indique les adresses courriels auxquels envoyer ta proposition de partage.",
		email: "Entrer l'adresse courriel",
	},
}

export const identity = {
	title: "Déclaration d'identité",
	Ideclare: (firstName, lastName) => (
		<>
			<b>
				Je déclare être réellement {firstName} {lastName}
			</b>
			. Je comprends que le fait de me faire passer pour quelqu'un d'autre
			constituerait une faute grave passible de poursuites judiciaires.
		</>
	),
	Iaccept: (workPiece) => (
		<>
			<b>J'accepte ces partages de droits</b> intervenus entre moi-même et tout
			collaborateur. Cela représente l'entente souhaitées. Je comprends que ces
			pourcentages s'appliqueront désormais à tout partage de revenus en lien
			avec {workPiece}.
		</>
	),
}

export const document = {
	navbar: {
		document: "Documenter mon œuvre",
		pages: {
			creation: "Création",
			performance: "Interprétation",
			infos: "Informations générales",
			lyrics: "Paroles",
			links: "Liens  d'écoute",
		},
	},
	help: "Help",
	why: "Pourquoi partage ces information ?",
	access: "Accès",
	creation: {
		category: "CRÉATION",
		title: (workPiece) => <>Qui a participé à la création de {workPiece} ?</>,
		paragraph:
			"C'est ici que tu indiques qui a contribué à la création de cette pièce.",
		date: "Date de création",
		roles: {
			authors: "Auteurs",
			authorsWho: "Qui a écrit les paroles de cette pièce musicale ?",
			addAuthor: "Ajouter un auteur...",
			composers: "Compositeurs",
			composersWho: "Qui a composé la musique de cette pièce musicale ?",
			addComposer: "Ajouter un auteur...",
			editors: "Éditeurs",
			editorsWho: "Qui représente ces auteurs et/ou compositeurs ?",
			addEditor: "Ajouter un éditeur...",
		},
		iswc: "Code ISWC",
		what: "C'est quoi un créateur ?",
	},
	performance: {
		category: "INTERPRÉTATION",
		title: "Qui a interprété la pièce musicale sur cet enregistrement sonore ?",
		paragraph: "C'est ici que tu indiques qui a joué quel intrument.",
		roles: {
			addPerformer: "Ajouter un interprète...",
		},
		what: "C'est quoi un interprète ?",
		whichPerformance: "Quel type d'interprétation ?",
		whichRole: "Quel rôle dans la pièce musicale ?",
		addInstrument: "Ajouter un instrument...",
	},

	files: {
		category: "FILES",
		title: "Quels fichiers veux-tu rendre accessible ?",
		paragraph:
			"Ici, tu peux ajouter les fichiers relatifs à cette pièce musicale.",
		visual: {
			title: "Visuel de l'œuvre",
			paragraph:
				"Comme l'album a sa pochette, une chanson ou une pièce instrumentale doit aussi avoir un visuel pour la représenter.",
			format: "Téléverser en format JPEG ou PNG",
			undertext:
				"Recommandé : 16000 x 1600 pixels d'une résolution de 300 dpi.",
		},
		audio: {
			title: "Fichier audio",
			paragraph: "Ici, tu peux télécharger ta pièce en format WAV ou MP3.",
			format: "Téléverser le fichier de l'œuvre enregistrée",
			undertext: "MP3 ou WAV acceptés.",
		},
		other: {
			title: "Autres fichiers sur l'œuvre",
			paragraph:
				"Ici, tu peux ajouter des documents permettant l'interprétation de l'œuvre, comme la partition ou le fichier MIDI.",
			formatTablature: "Partition ou tablature",
			formatMidi: "Fichiers MIDI",
			undertext: "Lorem Ipsum",
		},
		dropdown: {
			public: "Publique - Téléchargeable par tous",
			publicUndertext:
				"Tous les utilisateurs pourront télécharger le fichier original.",
			invitation: "Sur invitation - Téléchargeable par certains",
			invitationUndertext:
				"Les utilisateurs disposant du lien de partage unique pourront télécharger le fichier original. Pratique pour les journalistes et les professionnels !",
			private: "Privé - Empêcher le téléchargement",
			privateUndertext:
				"Personne ne pourra télécharger l'image originale, sauf vous.",
		},
		tooltip: {
			listItem:
				"Si le fichier a déjà été ajouté, mettre un list item avec le fichier correspondant plutôt qu'un form-upload",
		},
		copy: "Lien de partage unique copié.",
	},
	infos: {
		category: "INFORMATIONS GÉNÉRALES",
		title: "Dis-nous en plus sur la pièce musicale.",
		length: "Durée",
		bpm: "BPM",
		mainGenre: "Genre principal",
		addGenre: "Ajouter un genre...",
		secondaryGenre: "Genres secondaires",
		genreExample: "Exemple : Les Beatles, Dr Dre, Mozart, Brel, Stromae.",
	},
	lyrics: {
		category: "PAROLES",
		title: (workPiece) => <>{workPiece} contient des paroles ?</>,
		paragraph:
			"Les mots dans une chanson sont d'excellentes données descriptives sur l'œuvre qui augmentent sa découvrabilité et les chances d'élargir ton auditoire.",
		lyrics: "Paroles",
		undertext:
			"Paroles seulement. Ne pas inclure les auteurs, compositeurs, année de création, etc.",
		language: "Langue(s)",
		addLanguage: "Ajouter unbe langue...",
		selected: (language) => <>Ajouter « {language} »</>,
		french: "Français",
		frenchCanadian: "Français (canadien)",
		public: "Publique - Rendre l'information publique",
	},
	links: {
		category: "LIENS D'ÉCOUTE",
		title: "La pièce musicale est-elle déjà diffusée ?",
		paragraph:
			"Pour augmenter les chances que ta pièce soit découverte et écoutée, documente ses liens d'écoute et de vente en ligne.",
		addLink: "Coller un lien...",
	},
}
