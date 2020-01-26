import Journalisation from './journalisation'

const journal = Journalisation.getInstance()
const NOM = "Configuration"

export default class Configuration {

    constructor() {
        // Construit la configuration en se basant sur l'environnement d'exécution
        this.API_URL = process.env.REACT_APP_APIURL
        this.IMAGE_SRV_URL = process.env.REACT_APP_IMAGESRVURL
        this.IMAGE_SRV_ARTISTES_URL = process.env.REACT_APP_ARTIST_IMAGESRVURL
        this.AWS_REGION = process.env.REACT_APP_AWS_REGION
        this.AWS_USERPOOLID = process.env.REACT_APP_AWS_USERPOOLID
        this.AWS_USERPOOLWEBID = process.env.REACT_APP_AWS_USERPOOLWEBID
        this.AVATAR_PAR_DEFAUT = process.env.REACT_APP_AVATAR_PAR_DEFAUT
        this.FICHIERS_SRV_URL = process.env.REACT_APP_FICHIERSSRVURL
        this.CONTEXTE = process.env.REACT_APP_CONTEXTE
        this.BASE = process.env.REACT_APP_BASE
        this.BASE_POCHETTE = process.env.REACT_APP_BASE_POCHETTE
        journal.silly(NOM, "Construction de la configuration")
        journal.silly(NOM, `URL de l'API : ${this.API_URL}`)
        journal.silly(NOM, `Moteur d'identités (AWS) : ${this.AWS_REGION}, ${this.AWS_USERPOOLID} : ${this.AWS_USERPOOLWEBID}`)
        journal.silly(NOM, `Serveurs d'images (AWS) : ${this.IMAGE_SRV_URL} ${this.IMAGE_SRV_ARTISTES_URL}`)
        journal.silly(NOM, `Serveur de traitement de fichiers : ${this.FICHIERS_SRV_URL}`)
        journal.silly(NOM, `Contexte : ${this.CONTEXTE === "1" ? "Web" : "Natif"}, application : ${this.BASE}, documentation : ${this.BASE_POCHETTE}`)
    }

    static getInstance() {
        if(!Configuration.instance) {
            Configuration.instance = new Configuration()            
            Object.freeze(Configuration.instance)
            journal.silly(NOM, "Fin de la création de la configuration")
        }
        return Configuration.instance
    }

}