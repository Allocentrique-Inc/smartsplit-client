import winston from 'winston'

/**
 * Journalisation applicative.
 * 
 * Le niveau de journalisation est défini dans la variable d'environnement REACT_APP_LOGLEVEL.
 * Si c'est indéfini, le niveau par défaut est 'info'.
 */

const NOM = "Journalisation"

export default class Journalisation {

    constructor() {

        let couleursEtHorodatage = winston.format.combine(
            winston.format.colorize({
                all:true
            }),
            winston.format.timestamp({
                format:"DD-MM-YYYY HH:MM:SS"
            }),
            winston.format.printf(
                info => `${info.timestamp} [${info.label}] ${info.level} : ${info.message}`
            )
        )
        
        this.moteur = winston.createLogger({
            level: process.env.REACT_APP_LOGLEVEL || "info",
            prettyPrint: true,
            transports: [
                new (winston.transports.Console)({format: couleursEtHorodatage})
            ]
        })

        this.silly = (nom, msg) => {
            this.moteur.silly(msg, {label: nom})
        }

        this.debug = (nom, msg) => {
            this.moteur.debug(msg, {label: nom})
        }

        this.verbose = (nom, msg) => {
            this.moteur.verbose(msg, {label: nom})
        }

        this.http = (nom, msg) => {
            this.moteur.http(msg, {label: nom})
        }

        this.info = (nom, msg) => {
            this.moteur.info(msg, {label: nom})
        }
    
        this.warn = (nom, msg) => {
            this.moteur.warn(msg, {label: nom})
        }
    
        this.error = (nom, msg) => {
            this.moteur.error(msg, {label: nom})
        }        

    }

    static getInstance() {
        if(!Journalisation.instance) {
            Journalisation.instance = new Journalisation()
            Object.freeze(Journalisation.instance)
            // Test de la journalisation
            Journalisation.instance.silly(NOM, "🎼")
            Journalisation.instance.debug(NOM, "🎼")
            Journalisation.instance.verbose(NOM, "🎼")
            Journalisation.instance.http(NOM, "🎼")
            Journalisation.instance.info(NOM, "🎼")            
            Journalisation.instance.warn(NOM, "🎼")
            Journalisation.instance.error(NOM, "🎼")            
        }        
        return Journalisation.instance
    }    

}