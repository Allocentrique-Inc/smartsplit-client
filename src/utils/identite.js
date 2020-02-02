// AWS - Amplify + Auth
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify"
import Configuration from './configuration'
import Journalisation from './journalisation'
import axios from 'axios'

const journal = Journalisation.getInstance()
const config = Configuration.getInstance()

const NOM = "AideIdentites"

export default class AideIdentites {

    constructor() {
        Amplify.configure({
        Auth: {
            mandatorySignIn: true,
            region: config.AWS_REGION,
            userPoolId: config.AWS_USERPOOLID,
            userPoolWebClientId: config.AWS_USERPOOLWEBID
        }
        })
        this.bienvenue = async (fn) => {
            try {
                let usager = await Auth.currentAuthenticatedUser()
                journal.info(NOM, `Bienvenue, ${usager.attributes.given_name} ${usager.attributes.family_name} (${usager.username})`)
                this.usager = usager
                if(fn) {fn()}
            } catch(err) {
                journal.warn(NOM, err)
            }
        }
        this.rafraichir()        
    }

    async enregistrement(params, fn) {        
        let utilisateur = params.utilisateur,
            secret = params.secret,
            attributs = params.attributs            
        try {
            let _d = {username: utilisateur, password: secret, attributes: attributs}            
            let usager = await Auth.signUp(_d)            
            if(fn){fn(usager.userSub)}
        } catch(err) {
            journal.error(NOM, err)
        }
    }

    async connexion(params, fn) {
        try {            
            await Auth.signIn(params.utilisateur, params.secret)
            delete params.secret
            this.bienvenue(fn)
        } catch(err) {
            journal.warn(NOM, err)
            fn(false)
        }
    }

    async deconnexion(fn) {
        await Auth.signOut()        
        if(fn){fn()}
    }

    async nouveauMotDePasse(params) {
        let courriel = params.courriel, 
            code = params.code, 
            mdp = params.nouveauMdp
        try {
            await Auth.forgotPasswordSubmit(courriel, code, mdp)
            delete params.nouveauMdp
            delete params.code
            this.props.history.push("/accueil")
        } catch (error) {
            journal.error(NOM, error)
        }
    }

    async oubliMotDePasse(params) {
        let courriel = params.courriel
        axios
        .post(`${config.API_URL}rightHolders/emailToRightHolderId`,{email: courriel})
        .then(res => {
            let rightHolderId = res.data
            let source = window.location.href.includes("pochette") ? "pochette" : "smartsplit"
            axios.patch(`${config.API_URL}rightHolders/${rightHolderId}/requestSource`, {requestSource: source})                                    
            .then( async () => {
                try {
                    await Auth.forgotPassword(courriel)
                } catch (err) {
                    journal.error(NOM, err)
                }                
            })
            .catch(err=>journal.error(NOM, err))
        })
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