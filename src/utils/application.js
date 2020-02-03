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
import AideEntites from './entites'
import AideIdentites from './identite'
import AideDroits from './droits'
//import AideMedias from './medias'
import Utilitaires from './utilitaires'

class Application {

    constructor() {
        this.journal = Journalisation.getInstance()
        this.config = Configuration.getInstance()
        this.aideAyantDroit = AideAyantDroit.getInstance()
        this.aideEntites = AideEntites.getInstance()
        this.aideIdentites = AideIdentites.getInstance()
        //this.aideMedias = AideMedias.getInstance()
        this.utilitaires = new Utilitaires(this.config.CONTEXTE)
        this.aideDroits = new AideDroits()
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
const AyantsDroit = i.aideAyantDroit
const journal = i.journal
const Entites = i.aideEntites
const Identite = i.aideIdentites
const utils = i.utilitaires
const Droits = i.aideDroits
//const Media = i.aideMedias

export { config, journal, utils, AyantsDroit, Entites, Identite, Droits }