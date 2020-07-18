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
		continue: "Continuer",
		back: "Retour",
		saveClose: "Sauvegarder et continuer",
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
		groupSearch: "Research among groups...",
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
		artistName: "Si non applicable, nous affichons son nom complet.",
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
	shared: "Mes ajouts",
	added: "Partagées avec moi",
}

export const settings = {
	settings: "Paramètres",
	account: "Compte",
	preferences: "Préférences",
	profile: "Profil",
	identity: "Identité professionnelle",
	accountInfo: "Informations du compte",
	proIdentity: "Professionnal identity",
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
	confirmEntityDeletion: "Attention, l'entité suivante va être supprimée.",

	entityAttributes: {
		name: "Nom",
	},
}

export const rightSplits = {
	navbar: {
		rightSplits: "Partage des droits",
		page: "Nom de la page",
	},
	titles: {
		copyright: () => (
			<>
				<b>DROITS D'AUTEUR</b>
			</>
		),
		performance: () => (
			<>
				<b>INTERPRÉTATION</b>
			</>
		),
		record: () => (
			<>
				<b>ENREGISTREMENT SONORE</b>
			</>
		),
	},
	headers: {
		whoInvent: "Qui a inventé cette pièce musicale ?",
		whoPlay: "Qui a joué sur l'enregistrement sonore ?",
		whoOwn: "Qui possède l'enregistrement sonore ?",
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
		body: () => (
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

	checkboxes: {
		equal: "Partager de façon égale",
		roles: "Partager selon les rôles",
		manual: "Gérer manuellement",
		email: "Par courriel",
		txt: "Par texto",
	},

	dropdown: {
		addCollab: "Ajouter un collaborateur...",
		addLabel: "Ajouter un label...",
		removeCollab: "Retirer ce collaborateur",
		status: "Sélectionner un status",
		function: "Sélectionner une fonction...",
		agreement: "Durée de l'entente...",
		remove: "Retirer ce partage",
		collaboratorsPerformance: {
			artist: "Artiste principal",
			artistDefinition: "Aussi appelé  « Artiste vedette ou  « Artiste solo ».",
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

	toi: "(toi)",
	more: "En savoir plus",
	notify: "Me notifier un mois avant l'échéance...",

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
