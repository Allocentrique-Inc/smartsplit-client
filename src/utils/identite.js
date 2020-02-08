// Version maison - MongoDB et JWT
import Configuration from './configuration'
import Journalisation from './journalisation'
import axios from 'axios'

const journal = Journalisation.getInstance()
const config = Configuration.getInstance()

const NOM = "AideIdentitesLocal"

async function convertirLocalVersCognito(utilisateur, ayantDroit) {
    if(!ayantDroit) {
        const idAyantDroit = utilisateur.rightHolders[0]
        ayantDroit = await axios.get(`${config.API_URL}rightHolders/${idAyantDroit}`)
        ayantDroit = ayantDroit.data
    }

    return {
        username: ayantDroit.rightHolderId,
        userSub: ayantDroit.rightHolderId,
        attributes: {
            sub: ayantDroit.rightHolderId,
            "custom:requestSource": ayantDroit.requestSource,
            email_verified: true,
            gender: ayantDroit.accountCreationType,
            locale: ayantDroit.locale === "en" ? "en-US" : "fr-FR",
            given_name: ayantDroit.firstName,
            "custom:artistName": ayantDroit.artistName,
            "custom:groups": JSON.stringify(ayantDroit.groups),
            "custom:instruments": JSON.stringify(ayantDroit.instruments),
            "custom:avatarImage": ayantDroit.avatarImage,
            "custom:defaultRoles": JSON.stringify(ayantDroit.defaultRoles),
            family_name: ayantDroit.lastName,
            email: ayantDroit.email
        }
    }
}

function convertirCognitoVersLocal(données, éditeur) {
	const nomComplet = données.attributs.given_name + " " + données.attributs.family_name
	
    return {
        email: données.utilisateur,
        requestSource: données.attributs["custom:requestSource"],
        firstName: données.attributs.given_name,
        lastName: données.attributs.family_name,
        accountCreationType: données.attributs.gender,
        locale: données.attributs.locale,
        password: données.secret,
        rightHolder: {
            firstName: données.attributs.given_name,
            lastName: données.attributs.family_name,
            email: données.utilisateur,
            requestSource: données.attributs["custom:requestSource"],
            avatarImage: données.attributs["custom:avatarImage"],
            artistName: données.attributs["custom:artistName"] || nomComplet,
            groups: JSON.parse(données.attributs["custom:groups"] || "[]"),
            defaultRoles: JSON.parse(données.attributs["custom:defaultRoles"] || "[]"),
            accountCreationType: données.attributs.gender,
            locale: données.attributs.locale,
            editeur: éditeur || false
        }
    }
}

export default class AideIdentites {
    constructor() {
        const jetonInitial = window.localStorage.getItem("jeton-api")
        if(jetonInitial)
            axios.defaults.headers.common['Authorization'] = jetonInitial

        const cacheUsagerInitial = window.localStorage.getItem("cache-usager")
        if(cacheUsagerInitial)
            this.usager = JSON.parse(cacheUsagerInitial)

        this.bienvenue = async (fn) => {
            try {
                if(!window.localStorage.getItem("jeton-api"))
                    throw new Error("Utilisateur non connecté")

                const majJeton = await axios.get(`${config.API_URL}refreshToken`)

                const jeton = majJeton.data.accessToken
                window.localStorage.setItem("jeton-api", jeton)
                axios.defaults.headers.common['Authorization'] = jeton

                let usager = await convertirLocalVersCognito(majJeton.data.user)
                journal.info(NOM, `Bienvenue, ${usager.attributes.given_name} ${usager.attributes.family_name} (${usager.username})`)
                this.usager = usager
                window.localStorage.setItem("cache-usager", JSON.stringify(usager))
                if(fn) {fn()}
            } catch(err) {
                journal.warn(NOM, err)
            }
        }
        this.rafraichir()        
    }

    async enregistrement(params, editeur, fn) {
        try {
            const utilisateur = await axios.post(
                `${config.API_URL}user`,
                convertirCognitoVersLocal(params, editeur)
            )

            // await this.connexion(params)

            if(fn)
                fn(utilisateur.id)
        } catch(err) {
            journal.error(NOM, err)
        }
    }

    async connexion(params, fn) {
        try {            
            const connexion = await axios.post(
                `${config.API_URL}auth`,
                {username: params.utilisateur, password: params.secret}
            )

            const jeton = connexion.data.accessToken

            window.localStorage.setItem("jeton-api", jeton)
            axios.defaults.headers.common['Authorization'] = jeton
            delete params.secret
            await this.bienvenue(fn)
        } catch(err) {
            journal.warn(NOM, err)
            fn(false)
        }
    }

    async deconnexion(fn) {
        window.localStorage.removeItem("jeton-api")
        window.localStorage.removeItem("cache-usager")
        if(fn){fn()}
    }

    async nouveauMotDePasse(params) {
        debugger
        // let courriel = params.courriel, 
        //     code = params.code, 
        //     mdp = params.nouveauMdp
        // try {
        //     await Auth.forgotPasswordSubmit(courriel, code, mdp)
        //     delete params.nouveauMdp
        //     delete params.code
        //     this.props.history.push("/accueil")
        // } catch (error) {
        //     journal.error(NOM, error)
        // }
    }

    async oubliMotDePasse(courriel) {
        try {
            await axios.post(`${config.API_URL}user/password-reset`, {
                email: courriel,
                requestSource: window.location.href.includes("pochette") ? "pochette" : "smartsplit"
            })
        } catch(err) {
            journal.error(NOM, err)
        }
    }

    async chargement() {
        try {
            this.bienvenue()
        } catch (err) {
            journal.warn(NOM, err)
        }
    }

    static getInstance = () => {
        if(!AideIdentites.instance) {
            AideIdentites.instance = new AideIdentites()
            Object.freeze(AideIdentites)            
        }
        return AideIdentites.instance
    }

    /**
     * Recharger la liste et exécuter une fonction de rappel au besoin
     */
    async rafraichir(fn) {
        await this.chargement()
        if(fn) { fn() }
    }

}
