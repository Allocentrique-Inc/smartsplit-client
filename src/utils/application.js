/**
 * Démarrage applicatif
 * 
 * - Création de la configuration
 * - Création des objets d'aide-métier
 *  o Chargement des ayants-droit
 * 
 * C'est aussi un React.Component pour être inclus 
 */

import Configuration from './configuration'
import AideAyantDroit from './ayantdroit'
import Journalisation from './journalisation'

class Application {

    constructor() {
        this.journal = Journalisation.getInstance()
        this.config = Configuration.getInstance()
        this.aideAyantDroit = AideAyantDroit.getInstance()
    }    

    static getInstance() { // Prévient la modification
        if(!Application.instance) {
            Application.instance = new Application()            
        }
        return Application.instance
    }
}

const i = Application.getInstance()

const config = i.config
const aideAyantDroit = i.aideAyantDroit
const journal = i.journal

export { config, aideAyantDroit, journal }