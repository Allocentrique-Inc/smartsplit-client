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
	},

	languages: {
		fr: "Français",
		en: "Anglais"
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
	reduxTests: "Redux Test",
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
		paragraph: "J'ai lu et j'accepte les ",
		paragraph2: "Termes et conditions d'utilisation ",
		paragraph3: "et la ",
		paragraph4: "Politique sur la vie privée ",
		paragraph5: "de Smartsplit",
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
	menu : {
		listManagement: "Gestion des listes",
		businessSettings: "Paramètres d'affaires",
		adminManagement: "Gestion des administrateurs",
		myIncomes: "Mes revenus",
	},

	entityTypes : {
		"content-languages": "Langues du contenu",
		"digital-distributors": "Distributeurs numériques"
	},

	entityCreation: "Création d'une entité",
	delete: "Supprimer",
	edit: "Modifier",
	confirmEntityDeletion: "Attention, l'entité suivante va être supprimée.",

	entityAttributes: {
		name: "Nom"
	}
}
