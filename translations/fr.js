import React from "react"

export const general = {
	forgotPassword: "Mot de passe oublié ?",
	noAccount: "Je n'ai pas de compte",
	or: "ou",
	auth: "Authentification à deux facteurs",
	more: "En savoir plus",
	addFile: "Choisir un fichier",
	dropFile: "ou glissez votre fichier ici",

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
		singer: "Chanteur",
		musician: "Musicien",
	},

	radioButton: {
		singer: "Singer",
		musician: "Musician",
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
		continue: "Continuer",
		back: "Retour",
		saveClose: "Sauvegarder et fermer",
		toConsult: "Consulter",
		toBegin: "Commencer",
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
	count: "Le total",
	squared: "Le total au carré",
	addOne: "Ajouter 1",
	subOne: "Soustraire 1",
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
	emailTaken: "Ce courriel est déjà utilisé. ",
	forgotEmail: "As-tu oublié ton mot de passe ?",
	invalidCurrentPassword: "Mot de passe actuel incorrect. Veuillez réessayer.",
	listNotFound: "Liste introuvable",
	entityNotFound: "Élement de la liste introuvable",
	entityConflict: "ID déjà utilisé",
	acceptTerms: "Vous devez accepter les conditions",
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
			addCollaborator: "Ajouter un collaborateur",
			createCollaborator: "Créer un nouveau collaborateur",
			createContributor: "Créer un nouveau contributeur",
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
	addCollabArtist: "Ajouter un artiste collaborateur",
	addContributor: "Ajouter un artiste contributeur",
	options: {
		defaultRoles: [
			{
				displayValue: "Auteur",
				value: "author",
			},
			{
				displayValue: "Compositeur",
				value: "compooer",
			},
			{
				displayValue: "Arrangeur",
				value: "arranger",
			},
			{
				displayValue: "Interprète",
				value: "performer",
			},
			{
				displayValue: "Mixeur",
				value: "mixer",
			},
			{
				displayValue: "Interprète",
				value: "performer",
			},
			{
				displayValue: "Chanteur",
				value: "singer",
			},
			{
				displayValue: "Musicien",
				value: "musician",
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
	entityAttributes: {
		name: "Nom",
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

export const rightSplits = {
	navbar: {
		rightSplits: "Partage des droits",
		page: "Nom de la page",
	},
	titles: {
		copyright: "Droits d'auteur",
		performance: "Interprétation",
		recording: "Enregistrement sonore",
	},
	headers: {
		copyright: "Qui a inventé cette pièce musicale ?",
		performance: "Qui a joué sur l'enregistrement sonore ?",
		recording: "Qui possède l'enregistrement sonore ?",
	},

	paragraphs: {
		copyright: () => (
			<>
				Sépare ici le droit d’auteur entre les créateurs, c’est à dire les
				auteurs des <b>paroles</b>, les compositeurs et les arrangeurs de la{" "}
				<b>musique</b>. Il est d’usage de partager le droit d’auteur
				équitablement. Mais tu peux faire autrement.
			</>
		),
		performance: () => (
			<>
				On sépare ici le <b>droit</b> voisin entre les <b>interprètes</b>,
				autant les musiciens que les chanteurs. Les membres d'un <i>groupe</i>{" "}
				se partagent ce droit à parts égales. Les <i>artistes principaux</i> et{" "}
				<i>artistes invités</i> se partagent 30%, tantdis que les 20% restant
				est partagé parmi les <i>artistes accompagnateurts</i>, le cas échéant.
			</>
		),
		recording: () => (
			<>
				<>
					On sépare ici le <b>droit voisin</b> des <b>producteurs</b>, c'est à
					dire ceux qui ont investi leur temps et/ou leur argent pour
					enregistrer et finaliser le produit afin d'être commercialisé.
				</>
				<>
					Il est d'usage de partager ce droit en parts égales ou au prorata de
					l'investissement.
				</>
			</>
		),
	},

	radios: {
		equal: "Partager de façon égale",
		roles: "Partager selon les rôles",
		manual: "Gérer manuellement",
		email: "Par courriel",
		txt: "Par texto",
	},

	dropdowns: {
		addCollab: "Ajouter un collaborateur...",
		addLabel: "Ajouter un label...",
		removeCollab: "Retirer ce collaborateur",
		status: "Sélectionner un status...",
		function: "Sélectionner une fonction...",
		agreement: "Durée de l'entente...",
		remove: "Retirer ce partage",
		artist: {
			artist: "Artiste principal",
			artistDefinition:
				"Aussi appelé  « Artiste vedette » ou  « Artiste solo ».",
			artistInvited: () => (
				<>
					Artiste invité (<i>featuring</i>)
				</>
			),
			artistInvitedDefinition:
				"Artiste ou membre d'un groupe invité à collaborer sur une pièce musicale.",
			artistMember: "Membre du groupe",
			artistMemberDefinition:
				"Musicien ou chanteur prenant part à l'entité artistique.",
			artistExtra: "Artiste accompagnateur",
			artistExtraDefinition:
				"Interprète engagé pendant les sessions d'enregistrement studio.",
		},
		collaboratorsRecording: {
			producer: "Producteur",
			producerDefinition:
				"Investisseur externe (n'étant pas l'artiste ni membre du groupe).",
			autoProducer: "Auto-producteur",
			autoProducerDefinition:
				"Artiste ou membre du groupe s'investissant dans l'enregistrement de la pièce.",
			directorProducer: "Réalisateur-producteur",
			directorProducerDefinition:
				"Artisan s'investissant dans la réalisation et la production de la pièce.",
			techProducer: "Technicien-producteur",
			techProducerDefinition:
				"Technicien s'investissant dans la production de la pièce (mixeur, preneur de son).",
			studio: "Studio d'enregistrement",
			studioDefinition:
				"Entité investissant ses ressources afin d'enregistrer la pièce, contre pourcentage.",
			illustratorDesigner: "Illustrateur / Graphiste",
			illustratorDesignerDefinition:
				"Personne s'investissant dans la création de matériel visuel lié à la pièce (pochette, vidéo).",
		},
		duration: {
			oneYear: "1 an, puis renouvelable d'année en année",
			twoYears: "2 ans, puis renouvelable d'année en année",
			threeYears: "3 ans, puis renouvelable d'année en année",
			fourYears: "4 ans, puis renouvelable d'année en année",
			fiveYears: "5 ans, puis renouvelable d'année en année",
			renew:
				"Se renouvelle automatiquement, sauf avis signifié 60 jours avant.",
		},
	},

	yourself: "(toi)",
	more: "En savoir plus",
	notify: "Me notifier un mois avant l'échéance...",
	music: "Musique",
	lyrics: "Paroles",

	errors: {
		status: "Tu dois sélectionner un status pour cet ayant droits.",
		role: "Tu dois sélectionner au moins un rôle pour cet ayant droits.",
		function: "Tu dois sélectionner une fonction pour cet ayant droits.",
		option: "Tu dois sélectionner une option pour cet ayant droits.",
	},

	tooltips: {
		equal:
			"Divise le droit d'auteur par le nombre de personnes et attribue le rôle  « Auteur-Compositeur » par défaut à tous. Cette manière de partager le droit d'auteur évite beaucoup de chicanes entre les créateurs, particulièrement lorsque les revenus se mettent à rentrer. ;)",
		role:
			"Divise le droit d'auteur en deux : 50% va à ceux qui ont composé la musique. Cette dernière partie « musique » est à son tour divisé par le nombre de rôles sélectionnés et les collaborateurs obtiennent un pourcentage selon leur implication. Par exemple: Alice compose uniquement la musique, tandis que Bob compose ET arrange la musique. Ainsi, Alice a 1/3 et Bob a 2/3 de la musique.",
		manual:
			"Te laisse déterminer le pourcentage et les rôles pour chaque collaborateurs. Pour figer un pourcentage à un collaborateur, tu peux utiliser le cadenas.",
		label:
			"Règle générale, un label prend rarement plus de 50% des droits et revenus en lien avec la propriété de l'enregistrement sonore.",
	},
}

export const roles = {
	author: "Auteur",
	composer: "Compositeur",
	adapter: "Adaptateur",
	mixer: "Arrangeur",
	singer: "Chanteur",
	musician: "Musicien",
}

export const newUserInvite = {
	title: "[Ajouter/Modifier] un artiste collaborateur",
	checkbox: "Default Role(s)",
	checkboxUndertext: "Ces rôles pourront toujours être modifiés plus tard.",
}

export const document = {
	navbar: {
		document: "Documenter mon œuvre",
		pages: {
			creation: "Création",
			performance: "Interprétation",
			infos: "Informations générales",
			lyrics: "Paroles",
			recording: "Enregistrement",
			files: "Fichiers",
			release: "Sortie",
		},
	},
	help: "Aide",
	why: "Pourquoi partager ces informations ?",
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
			artist: "Artiste",
			singer: "Chanteur",
			musician: "Musicien",
			performer: "Ajouter un interprète...",
			release: "Sortie",
			addPerformer: "Ajouter un interprète...",
		},
		what: "C'est quoi un interprète ?",
		whichPerformance: "Quel type d'interprétation ?",
		whichRole: "Quel rôle dans la pièce musicale ?",
		addInstrument: "Ajouter un instrument...",
	},
	recording: {
		category: "ENREGISTREMENT",
		title: "Qui a enregistré la pièce musicale ?",
		paragraph:
			"Ici, tu indiques qui a contribué à l'enregistrement sonore de cette pièce.",
		roles: {
			direction: "Réalisation",
			addDirector: "Ajouter un réalisateur...",
			soundEngineer: "Preneur de son",
			addSoundEngineer: "Ajouter un preneur de son...",
			mix: "Mixage",
			addMix: "Ajouter un ingénieur de mixage...",
			master: "Mastering",
			addMaster: "Ajouter un ingénieur de mastering...",
			production: "Production",
			addProduction: "Ajouter un producteur",
		},
		date: "Date d'enregistrement",
		studio: "Studio d'enregistrement",
		searchStudio: "Rechercher un studio d'enregistrement...",
		isrc: "Code ISRC",
		tooltips: {
			isrc:
				"L'international Standard Work Code est un code unique d'identification des œuvres musicales.",
		},
	},
	release: {
		category: "SORTIE",
		title: "Cette pièce est-elle sortie ?",
		paragraph:
			"Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.",
		date: "Date  de sortie",
		dateHint: "Laisse vide si non déterminée",
		label: "Label",
		addLabel: "Ajouter une étiquette",
		format: "Format du produit",
		ep: "Titre de l'EP",
		supports: {
			support: "Support",
			digital: "Numérique",
			distribution: "Distribution",
			addDistribution: "Ajouter un distributeur...",
			upc: "Code UPC/EAN",
			physical: "Physique",
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
			access: "Accès",
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
			undertext:
				"Paroles seulement. Ne pas inclure les auteurs, compositeurs, année de création, etc.",
			language: "Langue(s)",
			addLanguage: "Ajouter unbe langue...",
		},
	},
}

export const collaborators = {
	email: "L'adresse courriel du collaborateur",
}
export const contributors = {
	add: "Ajouter un contributeur",
}
export const copyrightOrgs = {
	names: {
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
	actions: {
		socan: "Performance rights of musical works",
		socandr: "Reproduction rights of musical works",
		spacq: "Nomenclature",
		apem: "Sectoral representation of publishers",
		soproq: "Neighboring rights of producers",
		adisq: "Sectoral representation of producers",
		artisti: "Neighboring rights of performers",
		uda: "Union of singers and choristers",
		gmmq: "Union of musicians and instrumentalists",
		cmrra: "Droits d'exécution des oeuvres musicales",
		sac: "Association sectorielle des créateurs",
		cmpa: "Association sectorielle des éditeurs",
		re_sound: "Droits de voisinage des propriétaires d'enregistrement sonore",
		connect: "Droits de voisinage des propriétaires d'enregistrement sonore",
		cima: "Association sectorielle des propriétaires d'enregistrements sonores",
		actraracs: "Droits de voisinage des artistes interprètes ou exécutants",
		mroc: "Droits de voisinage des artistes interprètes ou exécutants",
		actra: "Syndicat professionnel des chanteurs",
		cfm: "Syndicat professionnel des musiciens",
	},
}
