import axios from 'axios'
import Configuration from './configuration'
import Journalisation from './journalisation'

const config = Configuration.getInstance()
const journal = Journalisation.getInstance()

const NOM = "AideEntites"

export default class AideEntites {

    constructor() {
        this.rafraichirListe()
    }

    async chargement() {
        let rep = await axios.get(`${config.API_URL}entities`)
        this.entites = rep.data
    }

    static getInstance = () => {
        if(!AideEntites.instance) {
            AideEntites.instance = new AideEntites()
            journal.silly(NOM, "Entités chargées")
        }
        return AideEntites.instance
    }

    /**
     * Recharger la liste et exécuter une fonction de rappel au besoin
     */
    rafraichirListe(fn) {
        this.chargement()
        if(fn) { fn() }
    }

}