import Journalisation from './journalisation'

const NOM = "Configuration"

export default class Configuration {

    constructor() {
        // Construit la configuration en se basant sur l'environnement
        this.journal = Journalisation.getInstance()
        
        this.APIURL = process.env.REACT_APP_APIURL
        this.IMAGE_SRV_URL = process.env.REACT_APP_IMAGESRVURL
        this.AWS_REGION = process.env.REACT_APP_AWS_REGION
        this.AWS_USERPOOLID = process.env.REACT_APP_AWS_USERPOOLID
        this.AWS_USERPOOLWEBID = process.env.REACT_APP_AWS_USERPOOLWEBID
        this.AVATAR_PAR_DEFAUT = process.env.REACT_APP_AVATAR_PAR_DEFAUT

        this.journal.debug(NOM, "Construction de la configuration")
        this.journal.debug(NOM, JSON.stringify(process.env))
        this.journal.debug(NOM, `URL de l'API : ${this.APIURL}`)
        this.journal.debug(NOM, `Moteur d'identités (AWS) : ${this.AWS_REGION}, ${this.AWS_USERPOOLID} : ${this.AWS_USERPOOLWEBID}`)
        this.journal.debug(NOM, `Serveur d'images (AWS) : ${this.IMAGE_SRV_URL}`)
    }

    static getInstance() {
        if(!Configuration.instance) {
            Configuration.instance = new Configuration()
            Object.freeze(Configuration.instance)
        }
        return Configuration.instance
    }

}