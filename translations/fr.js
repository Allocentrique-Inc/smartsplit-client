import { getInfoAsync } from "expo-file-system"
import React from "react"

export const general = {
	forgotPassword: "Mot de passe oublié ?",
	noAccount: "Je n'ai pas de compte",
	or: "ou",
	me: "Moi",
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
		end: "Terminer",
		seeSummary: "Voir le résumé",
		access: "Demander l'accès en écriture",
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
	invalidUrl: "l'URL n'est pas valide",
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
		firstName: "Prénom",
		middleName: "Second prénom",
		lastName: "Nom",
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
			addArtist: "Ajouter {{searchText}} comme nouvel artiste ou groupe",
			artistTypes: {
				principal: "Artiste principal",
				featured: () => (
					<>
						Artiste invité ((<i>featuring</i>))
					</>
				),
				bandMember: "Membre du groupe",
				session: "Artiste accompagnateur",
			},
			artistTypesDescription: {
				mainArtist: "Aussi appelé « Artiste vedette » ou « Artiste solo »",
				featured: "Artiste ou membre d'un groupe invité à collaborer", // sur une pièce musicale",
				bandMember: "Artiste prenant part à l'entité artistique",
				session: "Interprète engagé pendant l'enregistrement",
			},
		},
		defaultRoles: "Rôle(s) par défaut",
	},

	descriptions: {
		myEmails:
			"Centralise ici les différents courriels avec lesquels tes collaborateurs seraient susceptibles de t’inviter.",
		myProIds:
			"Ici, tu peux ajouter tes identifiants professionnels en lien avec les Sociétés de gestion collectives, les Syndicats et les Associations sectorielles pour lesquelles tu es membre.",
	},
	options: {
		defaultRoles: [
			{ label: "Auteur", value: "author" },
			{ label: "Compositeur", value: "composer" },
			{ label: "Arrangeur", value: "arranger" },
			{ label: "Mixeur", value: "mixer" },
			{ label: "Chanteur", value: "singer" },
			{ label: "Musicien", value: "musician" },
		],
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
		date: "AAAA-MM-JJ",
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
		shareYourRight: {
			title: "Partage tes droits",
			desc:
				"Crée les partages sur tes droits à l’aide de notre guide. Tu vas voir, c’est beaucoup plus simple que tu ne le crois :)",
		},
		protectYourWork: {
			title: "Protège ton œuvre",
			desc:
				"Associe dès aujourd’hui ton enregistrement sonore à ses ayant droits et laisse des traces indélébiles de ça sur une blockchain.",
		},
		documentYourWork: {
			title: "Documente ton œuvre",
			desc:
				"Rends totalement découvrable ton œuvre aux yeux des moteurs de recherche pour augmenter ton auditoire.",
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
	Iaccept: (workpiece) => (
		<>
			<b>J'accepte ces partages de droits</b> intervenus entre moi-même et tout
			collaborateur. Cela représente l'entente souhaitées. Je comprends que ces
			pourcentages s'appliqueront désormais à tout partage de revenus en lien
			avec {workpiece}.
		</>
	),
}

export const shareYourRights = {
	sharingRights: "Partage des droits",
	updateBy:
		"Créé par <span style='color:#2DA84F; font-weight: bold;'>{{name}}</span> · Mis à jour {{hour}}",
	summarySharing: "Résumé du partage",
	tabBar: {
		version: "Version {{num}}",
		sendToEditor: "Envoyer à l'éditeur",
		myManager: {
			title: "Mon manager",
		},
		myCollaborators: {
			title: "Mes collaborateurs",
			sendToCollaborators: "Envoyer aux collaborateurs",
		},
		myEditor: {
			title: "Mon éditeur",
			why: "Pourquoi faire affaire avec un éditeur?",
			whyContent: "Un éditeur sert à explication explication explication.",
			addEditor: "Ajouter un éditeur",
		},
		dragDrop: {
			waitingToSend: "En attente d’envoi",
			awaitingDecision: "En attente de décision",
			decided: "Décidées",
			createNewversion: "Créer une nouvelle version",
			deleteThisVersion: "Supprimer cette version",
		},
	},
	collaboratorModal: {
		underTitle:
			"Créée par <span style='color:#2DA84F; font-weight: bold;'>{{name}}</span> {{time}}",
		copyright: "Droits d'auteur",
		interpretation: "Interprétation",
		soundRecording: "Enregistrement sonore",
		edit: "Modifier",
		access:
			"Partage des droits <span style='font-weight: bold'>{{access}}</span>",
		permissionAccess: "{{name}} veut rendre ce partage des droits {{access}}",
		permissionPublicDesc:
			"{{name}} encourages the transparency of information on these rights sharing, so that the whole community can benefit from good examples.",
		confidentiality: "Confidentialité",
		refuse: "Refuser",
		accept: "Accepter",
		approved: "Approuvé",
	},
	sendCollaboratorModal: {
		title: "Envoyer le partage des droits",
		desc:
			"Pour finaliser ce partage, tu dois inviter ses collaborateurs à valider le tout. Indique les adresses courriels auxquelles envoyer ta proposition de partage.",
		enterEmailAddress: "Entrer l'adresse courriel...",
		toSend: "Envoyer",
		toCancel: "Annuler",
	},
	votingPage: {
		explainReason: "Explique ta raison ici... (optionnel)",
		validateSplit: "Valider le split de {{name}}",
		submitVote: "Soumettre mon vote",
		selectionsMade: "{num}/{total} sélections effectuées",
	},
	sensitiveInfoModal: {
		label: "Télécharger le contrat",
		desc:
			"Afin de préparer l’entente entre vous, Smartsplit a besoin d’information plus sensible au sujet de tous. Cette information est nécessaire afin de produire le document légal que vous pourrez imprimer et signer.",
		usualFirstNames: "Prénoms usuels",
		usualName: "Nom usuel",
		dateOfBirth: "Date de naissance",
		streetAddress: "Adresse civique",
		email: "Courriel",
		optional: "Optionnel",
		ipi: "IPI",
	},
}

export const rightSplits = {
	navbar: {
		rightSplits: "Partage des droits",
		page: "Nom de la page",
	},
	copyright: {
		title: "Droits d'auteur",
		header: "Qui a inventé cette pièce musicale ?",
		description: () => (
			<>
				Sépare ici le droit d’auteur entre les créateurs, c’est à dire les
				auteurs des <b>paroles</b>, les compositeurs et les arrangeurs de la{" "}
				<b>musique</b>. Il est d’usage de partager le droit d’auteur
				équitablement. Mais tu peux faire autrement.
			</>
		),
	},
	performance: {
		title: "Interprétation",
		header: "Qui a joué sur l'enregistrement sonore ?",
		description: () => (
			<>
				On sépare ici le <b>droit</b> voisin entre les <b>interprètes</b>,
				autant les musiciens que les chanteurs. Les membres d'un <i>groupe</i>{" "}
				se partagent ce droit à parts égales. Les <i>artistes principaux</i> et{" "}
				<i>artistes invités</i> se partagent 80%, tantdis que les 20% restant
				est partagé parmi les <i>artistes accompagnateurts</i>, le cas échéant.
			</>
		),

		artistTypes: {
			principal: {
				name: "Artiste principal",
				desc: "Aussi appelé « Artiste vedette » ou « Artiste solo »",
			},
			featured: {
				name: () => (
					<>
						Artiste invité ((<i>featuring</i>))
					</>
				),
				desc: "Artiste ou membre d'un groupe invité à collaborer",
			},
			bandMember: {
				name: "Membre du groupe",
				desc: "Artiste prenant part à l'entité artistique",
			},
			session: {
				name: "Artiste accompagnateur",
				desc: "Interprète engagé pendant l'enregistrement",
			},
		},
	},
	recording: {
		title: "Enregistrement sonore",
		header: "Qui possède l'enregistrement sonore ?",
		description: () => (
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
		functions: {
			producer: "Producteur",
			autoProducer: "Auto-producteur",
			directorProducer: "Réalisateur-producteur",
			techProducer: "Technicien-producteur",
			studio: "Studio d'enregistrement",
			illustratorDesigner: "Illustrateur / Graphiste",
		},
		functionDefs: {
			producer:
				"Investisseur externe (n'étant pas l'artiste ni membre du groupe).",
			autoProducer:
				"Artiste ou membre du groupe s'investissant dans l'enregistrement de la pièce.",
			directorProducer:
				"Artisan s'investissant dans la réalisation et la production de la pièce.",
			techProducer:
				"Technicien s'investissant dans la production de la pièce (mixeur, preneur de son).",
			studio:
				"Entité investissant ses ressources afin d'enregistrer la pièce, contre pourcentage.",
			illustratorDesigner:
				"Personne s'investissant dans la création de matériel visuel lié à la pièce (pochette, vidéo).",
		},
	},

	radios: {
		equal: "Partager de façon égale",
		roles: "Partager selon les rôles",
		manual: "Gérer manuellement",
		email: "Par courriel",
		txt: "Par texto",
	},
	yourself: "(toi)",
	more: "En savoir plus",
	notify: "Me notifier un mois avant l'échéance...",
	music: "Musique",
	lyrics: "Paroles",
	addCollab: "Ajouter un collaborateur...",
	addLabel: "Ajouter un label...",
	removeCollab: "Retirer ce collaborateur",
	status: "Sélectionner un status...",
	function: "Sélectionner une fonction...",
	agreement: "Durée de l'entente...",
	remove: "Retirer ce partage",
	roles: {
		author: "Auteur",
		composer: "Compositeur",
		adapter: "Adaptateur",
		mixer: "Arrangeur",
		singer: "Chanteur",
		musician: "Musicien",
	},
	dropdowns: {
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
			links: "Liens d'écoute",
		},
	},
	add: "Ajouter ",
	help: "Aide",
	why: "Pourquoi partager ces informations ?",
	access: "Accès",
	pieceType: {
		remix: "Remix",
		original: "Piece originale",
	},
	creation: {
		category: "CRÉATION",
		title: "Qui a participé à la création de {{workpiece}} ?",
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
			publishers: "Éditeurs",
			publishersWho: "Qui représente ces auteurs et/ou compositeurs ?",
			addPublisher: "Ajouter un éditeur...",
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
		vocals: {
			mainVocals: "chanteur principal",
			backupVocals: "chanteur backup",
		},
		what: "C'est quoi un interprète ?",
		whichPerformance: "Quel type d'interprétation ?",
		whichRole: "Quel rôle dans la pièce musicale ?",
		addInstrument: "Ajouter un instrument...",
		addInstrumentDropdown: "Add {{search}} as instrument",
		artistTypes: {
			mainArtist: "Artiste principal",
			featured: () => (
				<>
					Artiste invité ((<i>featuring</i>))
				</>
			),
			groupMember: "Membre du groupe",
			session: "Artiste accompagnateur",
		},
		artistTypesDescription: {
			mainArtist: "Aussi appelé « Artiste vedette » ou « Artiste solo »",
			featured: "Artiste ou membre d'un groupe invité à collaborer", // sur une pièce musicale",
			groupMember: "Artiste prenant part à l'entité artistique",
			session: "Interprète engagé pendant l'enregistrement",
		},
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
	},
	files: {
		category: "FICHIERS",
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
			subTitle: "Choisir un fichier à rendre accessible",
			paragraph:
				"Ici, tu peux rendre accessible ta pièce en format WAV ou MP3.",
			undertext: "MP3 ou WAV acceptés.",
			addFile: "Ajouter un fichier",
		},
		other: {
			title: "Autres fichiers sur l'œuvre",
			paragraph:
				"Ici, tu peux ajouter des documents permettant l'interprétation de l'œuvre, comme la partition ou le fichier MIDI.",
			formatTablature: "Partition ou tablature",
			formatMidi: "Fichiers MIDI",
			undertext: "Lorem Ipsum",
		},
		dropdownDownloads: {
			public: "Publique - Téléchargeable par tous",
			publicUndertext:
				"Tous les utilisateurs peuvent télécharger le fichier original.",
			invitation: "Sur invitation - Téléchargeable par certains",
			invitationUndertext:
				"Seuls les utilisateurs munis du lien de partage unique peuvent télécharger.",
			private: "Privé - Empêcher le téléchargement",
			privateUndertext:
				"Personne ne peut télécharger l'image originale, sauf vous.",
		},
		dropdownAccess: {
			public: "Publique - Rendre l'information visible de tous",
			publicUndertext:
				"Tous les utilisateurs pourront avoir accès à cette information",
			invitation: "Sur invitation - Visible par certains",
			invitationUndertext:
				"Seuls les  utilisateurs disposant du lien de partage unique auront accès à l'information. Pratique pour les journalistes !",
			private: "Privé - Rendre l'information privé",
			privateUndertext:
				"Personne, à part vous et les collaborateurs du projet, n'aura accès à l'information.",
		},
		tooltip: {
			listItem:
				"Si le fichier a déjà été ajouté, mettre un list item avec le fichier correspondant plutôt qu'un form-upload",
		},
		access: "Accès",
		copy: "Lien de partage unique copié.",
		note:
			"Si le fichier a déjà été ajouté, mettre un list item avec le fichier correspondant plutôt qu'un form-upload. Sinon simplement mettre le formulaire.",
	},
	infos: {
		category: "INFORMATIONS GÉNÉRALES",
		title: "Dis-nous en plus sur la pièce musicale.",
		length: "Durée",
		bpm: "BPM",
		mainGenre: "Genre principal",
		addGenre: "Ajouter un genre...",
		secondaryGenre: "Genres secondaires",
		influence: "Influences",
		addInfluence: "Ajouter une influence...",
		influenceExample: "Exemple : Les Beatles, Dr Dre, Mozart, Brel, Stromae.",
	},
	lyrics: {
		category: "PAROLES",
		title: "{{workpiece}} contient des paroles ?",
		paragraph:
			"Les mots dans une chanson sont d'excellentes données descriptives sur l'œuvre qui augmentent sa découvrabilité et les chances d'élargir ton auditoire.",
		undertext:
			"Paroles seulement. Ne pas inclure les auteurs, compositeurs, année de création, etc.",
		language: "Langue(s)",
		addLanguage: "Ajouter une langue...",
		dropdown: {
			public: "Public - Rendre l'information publique",
		},
	},
	links: {
		category: "LIENS D'ÉCOUTE",
		title: "La pièce musicale est-elle déjà diffusée ?",
		paragraph:
			"Pour augmenter les chances que ta pièce soit découverte et écoutée, documente ses liens d'écoute et de vente en ligne.",
		addLink: "Coller un lien...",
		createPlatform: "Add a platform",
		addPlatform: "Ajouter une plateforme...",
	},
	finalModal: {
		header: "Documentation créee !",
		title: "{{workpiece}} est maintenant documentée !",
		paragraph:
			"Tu es à un clic de pouvoir publier les crédits de cette pièce sur une page web et ainsi d’augmenter ta découvrabilité dans le web des données.",
	},
}

export const protect = {
	completed: "Complétée",
	navbar: {
		protect: "Protège ton oeuvre",
		pages: {
			selection: "Sélectionner",
			certificate: "Réviser le certificat",
		},
	},
	help: "Aide",
	promo: {
		heading: "Protège ton oeuvre",
		title: "Encrypte chaque fichier de ta création pour conserver ta paternité",
		description:
			"Description de la feature. Description de la feature ici encore. Description de la feature.",
		codeTitle: "As-tu reçu un code promo?",
		codePlaceHolder: "Entre ton code promo",
		buy: "Acheter     {{price}}$",
		validCode: "code valide",
		codeValueContent:
			"La chance te sourit ! <br /><br />Grâce à la Guilde des Musiciennes et Musiciennes du Québec, ce code te permets une utilisation gratuite de toutes les fonctionnalités pour encore <b>{{hoursRemaining}} jours</b>, soit jusqu’au {{expire}}",
		applyThisCredit: "Appliquer ce crédit",
		amountRemaining: "Il te reste {{amount}} $ en banque",
		creditApplied: "Crédit appliqué !",
		dollarOfCredit: "-{{price}}$ de vos crédits",
		findOutMore: "En savoir plus",
	},
	selection: {
		heading1: "Quelle version de l'oeuvre aimerais-tu protéger?",
		para1: "Ici, tu envoies ton oeuvre dans un encodeur informatique.",
		para2:
			"L'algorithme derrière cette page prendra ton oeuvre et créera à partird'elle une empreinte numérique unique que l'on nomme un",
		heading2: "Fichier à protéger",
		addFileLabel: "Ajouter un fichier",
		underText:
			"Formats .pdf, jpeg, .png, .wav ou .mp3 acceptés. 250 Mo maximum.",
		customName: "Nom personnalisé",
		fileCategory: "Catégorie du fichier",
		examplesCategories:
			"Exemples de catégories : Pièce musicale, Partition, Tablatures, Fichier MIDI, ertc.",
		heading3: "Version de travail",
		workingVersionDesc:
			"Pour une chanson, les versions de travail sont par exemple : Idée, Démo, Mix, Master.",
		idea: "Idée",
		demo: "Démo",
		roughMix: "Rough Mix",
		finalMaster: "Version finale (masterisée)",
		help: "AIDE",
		heading4: "Pourquoi protéger mon oeuvre?",
		desc:
			"Enregistrer son oeuvre sur la blockchain avec <i>Smartsplit</i> est équivalent à se l'envoyer par courrier recommandé à soi-même afin de pouvoir démontrer au besoin sa paternité",
		heading5: "Choisis un nom personnalisé",
		why: "Pourquoi protéger mon oeuvre?",
		whyContent:
			"Enregistrer son oeuvre sur la blockchain avec Smartsplit est équivalent de se l’envoyer par courrier recommandé à soi-même afin de pouvoir démontrer au besoin sa parternité.",
		alertNoSuportFile:
			"Le type de fichier n'est pas pris en charge ou la taille du fichier est supérieure à celle autorisée.",
	},
	certificate: {
		heading1: "Révise ton certificat",
		para1:
			"Tu es sur le point d’envoyer de façon irréversible sur la blockchain la preuve que tu es bel et bien lié à ce fichier.",
		musicalPiece: "Pièce musicale",
		sourceFile: "Fichier source",
		why: "L’importance de bien réviser",
		whyContent:
			"Il est important de bien réviser l’information sur cette page.<br>Les données sur la personne déposant le fichier  seront associées au fichier de manière indélébile et irreversible.",
		format: "Format",
		versionName: "Nom de la version",
		workingVersion: "Version de travail",
		listedBy: "Déposée par",
		identity: "Identité",
		completeIdDesc:
			"Ces informations servent à préciser ton identité afin de bien l’associer à ton fichier. Celles-ci seront encryptées afin de protéger ta vie privée.",
		completeIdentity: "Compléter mon identité",
		encryption:
			'"{{birth}}","{{email}}" <br> = <br> fcb95c345bc2bdfe8de22b8759a747afeb17ef07e7dd379b82f61e81c3c1b903',
		fileDigitalFingerprints: "Empreintes numériques du fichier",
		viewEncryption: "Voir l’encryptage numérique",
		notEnoughInfo: "Pas encore de date de naissance ni de courriel.",
		sha256: "SHA256",
		md5: "MD5",
		addiction: "Dépendance",
		addBirth: "Ajouter une date de naissance",
		addBirthFieldTitle: "Date de naissance de {{name}}",
		addBirthUnderText:
			"Cette information sert à vous identifier en tant qu’individu unique et restera privée.",
		save: "Sauvegarder",
		await: "En attente de publication",
		post: "Publiée le {{publishedDate, LL}} par {{author}} · ",
		viewCertificate: "Voir le certificat",
		addPlaceBirth: "Ajouter un lieu de naissance",
		addEmailModal: "Courriel de {{name}}",
		addPlaceBirthUnderText:
			"Cette information sert à associer votre identité au fichier et restera confidentielle.",
		edit: "Éditer",
		category: "Catégorie",
	},
	verify1:
		"<b>Je déclare être réellement {{firstName}}</b>. Je comprends que le fait me faire passer pour quelqu’un d’autre constituerait une faute grave passible de poursuites judiciaires.",
	verify2:
		"<b>Je prends la pleine responsabilité</b> de conserver le fichier suivant dans mes archives personnelles :<br> {{file}}",
	verify3:
		"<b>Je comprends</b> que ce fichier est la seule et unique clée permettant de démontrer la parternité et l’antériorité de la pièce musicale {{song}}.",
	publishOnBlockchain: "Publier sur la blockchain",
	beforePosting: "Avant de publier le tout...",
	contentProgress: "En cours de publication...",
	finalHeading:
		"Ton empreinte sonore est correctement publiée sur la blockchain !",
	finalContent:
		"Cette empreinte est aussi liée à l'empreinte des métadonnées descriptives portant sur cet enregistrement sonore. Tu peux maintenant prendre possession de ton certificat !",
	btnPublishFinal: "Voir le certificat",
}

export const collaborators = {
	email: "L'adresse courriel du collaborateur",
}
export const contributors = {
	add: "Ajouter un contributeur",
}
export const copyrightOrgs = {
	select: "Sélectionnez un organisme",
	public: "Rendre publique mes identifiants énumérés ci-dessus",
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

export const workpieceSheet = {
	by: "par",
	creation: {
		header: "Création",
		date: "Date de création",
		authors: "Auteurs (paroles)",
		composers: "Compositeurs (Musique)",
		arrangers: "Arrangeurs (Musique)",
		publishers: "Éditeurs",
	},
	performance: {
		header: "Interprétation",
		star: "Artiste vedette",
		musician: {
			musician: "Musicien",
			solo: "Soliste",
		},
		singer: "Chanteur",
	},
	recording: {
		header: "Enregistrement sonore",
		title: "Titre de la piste",
		director: "Réalisateurs",
		tech: "Techniciens en enreg.",
		mix: "Mixage",
		mastering: "Mastering",
		production: "Production",
		studio: "Studio d'enregistrement",
	},
	release: {
		header: "Sortie",
		date: "Date de sortie",
		format: "Format du produit",
		title: "Title du produit",
	},
	info: {
		header: "Informations générales",
		length: "Durée",
	},
	stream: {
		header: "Écouter",
	},
	download: {
		header: "Téléchargements",
		visual: "Visuel de l'œuvre",
		audio: "Fichier audio",
		partition: "Partition/Tablature",
		midi: "Fichier MIDI",
		download: "Télécharger",
		copy: "Copier le lien",
		copied: "Copié",
		access: "Demander l'accès",
	},
	lyrics: {
		header: "Paroles",
		check: "Voir les paroles",
	},
}
