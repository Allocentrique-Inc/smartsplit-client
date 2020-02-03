import winston from 'winston'
import path from 'path'

var RACINE = path.join(__dirname, '..')

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
                format:"DD-MM-YYYY hh:mm:ss"
            }),
            winston.format.printf(
                info => `${info.timestamp} [${info.label}] ${info.level} : ${info.message}`
            )
        )
        
        this.moteur = winston.createLogger({
            level: process.env.REACT_APP_LOGLEVEL || "info",            
            transports: [
                new (winston.transports.Console)(
                    {
                        format: couleursEtHorodatage, 
                        prettyPrint: true,
                        handleExceptions: true,
                        json: true
                    })
            ],
            exitOnError: false
        })        

    }

    silly (nom, msg) {
        nom = this.formatLogArguments(arguments)
        this.moteur.silly(msg, {label: nom})
    }

    debug (nom, msg) {
        nom = this.formatLogArguments(arguments)
        this.moteur.debug(msg, {label: nom})
    }

    verbose (nom, msg) {
        nom = this.formatLogArguments(arguments)
        this.moteur.verbose(msg, {label: nom})
    }

    http (nom, msg) {
        nom = this.formatLogArguments(arguments)
        this.moteur.http(msg, {label: nom})
    }

    info (nom, msg) {
        nom = this.formatLogArguments(arguments)
        this.moteur.info(msg, {label: nom})
    }

    warn (nom, msg) {
        nom = this.formatLogArguments(arguments)
        this.moteur.warn(msg, {label: nom})
    }

    error (nom, msg) {            
        let nomDerive = this.formatLogArguments(arguments)
        this.moteur.error(msg, {label: nomDerive})
        if(msg && msg.stack)
            this.moteur.error(msg.stack, {label: `${nom}-trace`})
    }        

    /**
     * Tente d'ajouter le fichier et le numéro de ligne de l'événement     
     */
    formatLogArguments (args) {
        args = Array.prototype.slice.call(args)
        var stackInfo = this.getStackInfo(1)
        if (stackInfo) {
            // Chemin du fichier relatif au projet
            var calleeStr = stackInfo.relativePath + ':' + stackInfo.line
            args[0] = `${args[0]} ${calleeStr}`
        }
        return [args[0]]
    }

    /**
     * Parses and returns info about the call stack at the given index.
     */
    getStackInfo (stackIndex) {
        // Analyse de la pile d'exécution
        // Extraction du fichier, de la ligne et de la méthode
        var stacklist = (new Error()).stack.split('\n').slice(3)        
        // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
        // Attention à ne par modifier l'expression régulière (bogue NodeJS)
        var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
        var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi
        var s = stacklist[stackIndex] || stacklist[0]
        var sp = stackReg.exec(s) || stackReg2.exec(s)
        if (sp && sp.length === 5) {
            return {
            method: sp[1],
            relativePath: path.relative(RACINE, sp[2]),
            line: sp[3],
            pos: sp[4],
            file: path.basename(sp[2]),
            stack: stacklist.join('\n')
            }
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