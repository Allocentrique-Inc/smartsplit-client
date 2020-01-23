/**
 * Démarrage applicatif
 * 
 * - Création de la configuration
 * - Création des objets d'aide-métier
 *  o Chargement des ayants-droit
 */

import Configuration from './configuration'
import AideAyantDroit from './ayantdroit'
import Journalisation from './journalisation'

class Application {

    constructor() {
        this.config = Configuration.getInstance()
        this.aideAyantDroit = AideAyantDroit.getInstance()
        this.journal = Journalisation.getInstance()
    }

    static getInstance() { // Prévient la modification
        if(!Application.instance) {
            Application.instance = new Application()
            Object.freeze(Application.instance)
        }       
        return Application.instance
    }
}

const i = Application.getInstance()

const config = i.config
const aideAyantDroit = i.aideAyantDroit
const journal = i.journal

export { config, aideAyantDroit, journal }